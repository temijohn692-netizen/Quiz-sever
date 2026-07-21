const express = require('express');
const fs = require('fs');
const path = require('path');
const { questions, specialQuestion } = require('./quiz-data');

const app = express();
const PORT = process.env.PORT || 3000;
const RESULTS_FILE = path.join(__dirname, 'results.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function getQuestionSet(special) {
  return special ? [...questions, specialQuestion] : questions;
}

// Send the question list WITHOUT the correct answers (so test-takers can't cheat by viewing source)
app.get('/api/questions', (req, res) => {
  const special = req.query.special === '1';
  const set = getQuestionSet(special);
  const safeQuestions = set.map((q, i) => ({
    index: i,
    text: q.text,
    options: q.options
  }));
  res.json(safeQuestions);
});

// Receive a submitted quiz, score it server-side, save + log the result
app.post('/api/submit', (req, res) => {
  const { name, answers, special } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: 'answers must be an array' });
  }

  const set = getQuestionSet(!!special);

  let score = 0;
  const breakdown = set.map((q, i) => {
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
    name: name || 'Anonymous',
    special: !!special,
    score,
    total: set.length,
    breakdown,
    submittedAt: new Date().toISOString()
  };

  // Log to the terminal so you see it immediately on your phone
  console.log('\n=== New submission ===');
  console.log(`Name: ${result.name}`);
  console.log(`Score: ${result.score} / ${result.total}`);
  console.log('=======================\n');

  // Persist to a results file so you can review everyone's scores later
  let allResults = [];
  if (fs.existsSync(RESULTS_FILE)) {
    try {
      allResults = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
    } catch (e) {
      allResults = [];
    }
  }
  allResults.push(result);
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(allResults, null, 2));

  res.json({ score: result.score, total: result.total });
});

// View all past results (open this on your own phone's browser: /results)
app.get('/results', (req, res) => {
  let allResults = [];
  if (fs.existsSync(RESULTS_FILE)) {
    try {
      allResults = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
    } catch (e) {
      allResults = [];
    }
  }

  const rows = allResults.slice().reverse().map(r => `
    <div style="background:#1c222c;border:1px solid #2a3040;border-radius:12px;padding:14px 18px;margin-bottom:12px;">
      <div style="font-weight:600;font-size:16px;">
        ${r.name}
        ${r.special ? '<span style="background:#a06bff;color:#1a0f2e;font-size:11px;font-weight:700;padding:2px 8px;border-radius:8px;margin-left:8px;vertical-align:middle;">SPECIAL</span>' : ''}
      </div>
      <div style="color:#ffb454;font-size:14px;">${r.score} / ${r.total}</div>
      <div style="color:#6b7280;font-size:12px;">${new Date(r.submittedAt).toLocaleString()}</div>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html><head><meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Results</title>
    <style>
      body { background:#12161f; color:#e8e6e1; font-family: sans-serif; padding: 20px; }
      h1 { font-size: 20px; }
    </style>
    </head><body>
      <h1>Results (${allResults.length} submissions)</h1>
      ${rows || '<p>No submissions yet.</p>'}
    </body></html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Quiz server running.`);
  console.log(`On this phone: http://localhost:${PORT}`);
  console.log(`On the same WiFi, others can use your phone's local IP, e.g. http://<your-phone-ip>:${PORT}`);
  console.log(`View results anytime at /results`);
});
