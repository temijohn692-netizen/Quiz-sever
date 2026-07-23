const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const { courses, surveyStatements, surveyScale, surveyOpenQuestion } = require('./quiz-data');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS results (
      id SERIAL PRIMARY KEY,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}
initDb().catch(err => console.error('DB init failed:', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// List of available courses (for the selection screen) — no answers included
app.get('/api/courses', (req, res) => {
  const list = Object.keys(courses).map(key => ({
    key,
    code: courses[key].code,
    title: courses[key].title
  }));
  res.json(list);
});

// Survey structure (statements + scale + open question) for dot-prefixed names
app.get('/api/survey', (req, res) => {
  res.json({ statements: surveyStatements, scale: surveyScale, openQuestion: surveyOpenQuestion });
});

// Questions for a specific course, without correct answers
app.get('/api/questions', (req, res) => {
  const key = req.query.course;
  const course = courses[key];
  if (!course) {
    return res.status(404).json({ error: 'Unknown course' });
  }
  const safeQuestions = course.questions.map((q, i) => ({
    index: i,
    text: q.text,
    options: q.options
  }));
  res.json(safeQuestions);
});

// Regular quiz submission
app.post('/api/submit', async (req, res) => {
  const { name, courseKey, answers, tabSwitches, pasteAttempts, timeTakenSeconds } = req.body;
  const course = courses[courseKey];

  if (!course || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid submission' });
  }

  let score = 0;
  const breakdown = course.questions.map((q, i) => {
    const given = answers[i];
    const correct = given === q.correctIndex;
    if (correct) score++;
    return {
      question: q.text,
      givenAnswer: given !== undefined && given !== null ? q.options[given] : null,
      correctAnswer: q.options[q.correctIndex],
      correct
    };
  });

  const result = {
    type: 'quiz',
    name: name || 'Anonymous',
    courseCode: course.code,
    courseTitle: course.title,
    score,
    total: course.questions.length,
    breakdown,
    tabSwitches: tabSwitches || 0,
    pasteAttempts: pasteAttempts || 0,
    timeTakenSeconds: timeTakenSeconds || null,
    submittedAt: new Date().toISOString()
  };

  try {
    await saveResult(result);
    console.log('\n=== New quiz submission ===');
    console.log(`Name: ${result.name} | Course: ${result.courseCode}`);
    console.log(`Score: ${result.score} / ${result.total} | Tab switches: ${result.tabSwitches}`);
    console.log('============================\n');
    res.json({ score: result.score, total: result.total });
  } catch (err) {
    console.error('Failed to save result:', err);
    res.status(500).json({ error: 'Could not save result' });
  }
});

// Survey submission (dot-prefixed names)
app.post('/api/submit-survey', async (req, res) => {
  const { name, ratings, openAnswer } = req.body;

  if (!Array.isArray(ratings) || ratings.length !== surveyStatements.length) {
    return res.status(400).json({ error: 'Invalid survey submission' });
  }

  // ratings are 0-4 (Strongly Disagree..Strongly Agree) -> score 1-5 each
  const total = ratings.reduce((sum, r) => sum + (r + 1), 0);
  const maxTotal = surveyStatements.length * 5;
  const percent = Math.round((total / maxTotal) * 100);

  const result = {
    type: 'survey',
    name: name || 'Anonymous',
    special: true,
    percent,
    ratings,
    openAnswer: openAnswer || '',
    submittedAt: new Date().toISOString()
  };

  try {
    await saveResult(result);
    console.log('\n=== New survey submission ===');
    console.log(`Name: ${result.name} | Score: ${percent}%`);
    console.log('==============================\n');
    res.json({ percent });
  } catch (err) {
    console.error('Failed to save survey result:', err);
    res.status(500).json({ error: 'Could not save result' });
  }
});

async function saveResult(result) {
  await pool.query('INSERT INTO results (data) VALUES ($1)', [JSON.stringify(result)]);
}

async function getAllResults() {
  const { rows } = await pool.query('SELECT data FROM results ORDER BY created_at DESC');
  return rows.map(r => r.data);
}

// Results page (yours to check privately)
app.get('/results', async (req, res) => {
  let all = [];
  try {
    all = await getAllResults();
  } catch (err) {
    console.error('Failed to load results:', err);
    return res.status(500).send('Could not load results.');
  }

  const rows = all.map(r => {
    if (r.type === 'survey') {
      return `
        <div style="background:#1c222c;border:1px solid #2a3040;border-radius:12px;padding:14px 18px;margin-bottom:12px;">
          <div style="font-weight:600;font-size:16px;">
            ${r.name}
            <span style="background:#a06bff;color:#1a0f2e;font-size:11px;font-weight:700;padding:2px 8px;border-radius:8px;margin-left:8px;vertical-align:middle;">SURVEY</span>
          </div>
          <div style="color:#ffb454;font-size:14px;">${r.percent}%</div>
          ${r.openAnswer ? `<div style="color:#c9c5d8;font-size:13px;margin-top:6px;font-style:italic;">"${r.openAnswer}"</div>` : ''}
          <div style="color:#6b7280;font-size:12px;margin-top:4px;">${new Date(r.submittedAt).toLocaleString()}</div>
        </div>`;
    }
    return `
      <div style="background:#1c222c;border:1px solid #2a3040;border-radius:12px;padding:14px 18px;margin-bottom:12px;">
        <div style="font-weight:600;font-size:16px;">
          ${r.name}
          <span style="background:#4ecdc4;color:#08302e;font-size:11px;font-weight:700;padding:2px 8px;border-radius:8px;margin-left:8px;vertical-align:middle;">${r.courseCode}</span>
        </div>
        <div style="color:#ffb454;font-size:14px;">${r.score} / ${r.total}</div>
        ${(r.tabSwitches > 0 || r.pasteAttempts > 0) ? `<div style="color:#ff8fa3;font-size:12px;margin-top:4px;">⚠ Tab switches: ${r.tabSwitches || 0} · Paste attempts: ${r.pasteAttempts || 0}</div>` : ''}
        <div style="color:#6b7280;font-size:12px;">${new Date(r.submittedAt).toLocaleString()}</div>
      </div>`;
  }).join('');

  res.send(`
    <!DOCTYPE html>
    <html><head><meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Results</title>
    <style>
      body { background:#12161f; color:#e8e6e1; font-family: sans-serif; padding: 20px; }
      h1 { font-size: 20px; }
    </style>
    </head><body>
      <h1>Results (${all.length} submissions)</h1>
      ${rows || '<p>No submissions yet.</p>'}
    </body></html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
