// ---------- State ----------
let userName = '';
let isSpecial = false;
let courseKey = null;
let courseMeta = null;
let questions = [];
let selectedAnswers = {};
let currentIndex = 0;
let timerSeconds = 10 * 60;
let timerInterval = null;
let tabSwitches = 0;
let pasteAttempts = 0;
let quizStartTime = null;

document.addEventListener('visibilitychange', () => {
  if (document.hidden && quizScreen && !quizScreen.classList.contains('hidden')) {
    tabSwitches++;
  }
});
document.addEventListener('paste', (e) => {
  if (quizScreen && !quizScreen.classList.contains('hidden')) {
    e.preventDefault();
    pasteAttempts++;
  }
});
document.addEventListener('copy', (e) => {
  if (quizScreen && !quizScreen.classList.contains('hidden')) {
    e.preventDefault();
  }
});

// Survey state
let surveyData = null;
let surveyAnswers = {};

// ---------- Elements ----------
const progressText = document.getElementById('progressText');
const nameScreen = document.getElementById('nameScreen');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const courseScreen = document.getElementById('courseScreen');
const quizScreen = document.getElementById('quizScreen');
const surveyScreen = document.getElementById('surveyScreen');
const questionsContainer = document.getElementById('questionsContainer');
const qJump = document.getElementById('qJump');
const qCounter = document.getElementById('qCounter');
const timerText = document.getElementById('timerText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultScreen = document.getElementById('resultScreen');
const resultLabel = document.getElementById('resultLabel');
const resultScoreText = document.getElementById('resultScoreText');
const resultSub = document.getElementById('resultSub');

// ---------- Step 1: Name ----------
startBtn.addEventListener('click', async () => {
  const raw = nameInput.value.trim();
  if (!raw) return;
  isSpecial = raw.startsWith('.');
  userName = raw.replace(/^\./, '') || 'Anonymous';

  nameScreen.classList.add('hidden');

  if (isSpecial) {
    progressText.textContent = 'A few quick questions';
    await loadSurvey();
  } else {
    progressText.textContent = 'Choose a course';
    await loadCourses();
  }
});

// ---------- Step 2: Course selection ----------
async function loadCourses() {
  const res = await fetch('/api/courses');
  const list = await res.json();
  courseScreen.innerHTML = '';
  list.forEach(c => {
    const el = document.createElement('div');
    el.className = 'course-option';
    el.innerHTML = `<div class="code">${c.code}</div><div class="title">${c.title}</div>`;
    el.addEventListener('click', () => selectCourse(c.key, c));
    courseScreen.appendChild(el);
  });
  courseScreen.classList.remove('hidden');
}

async function selectCourse(key, meta) {
  courseKey = key;
  courseMeta = meta;
  courseScreen.classList.add('hidden');
  progressText.textContent = `${meta.code} — loading questions...`;

  const res = await fetch(`/api/questions?course=${key}`);
  questions = await res.json();
  currentIndex = 0;
  selectedAnswers = {};

  buildJumpButtons();
  renderCurrentQuestion();
  quizScreen.classList.remove('hidden');
  progressText.textContent = meta.code;
  quizStartTime = Date.now();
  tabSwitches = 0;
  pasteAttempts = 0;
  startTimer();
}

// ---------- Quiz navigation ----------
function buildJumpButtons() {
  qJump.innerHTML = '';
  questions.forEach((q, i) => {
    const b = document.createElement('button');
    b.className = 'q-jump-btn';
    b.textContent = i + 1;
    b.addEventListener('click', () => { currentIndex = i; renderCurrentQuestion(); });
    qJump.appendChild(b);
  });
}

function updateJumpButtons() {
  const btns = qJump.querySelectorAll('.q-jump-btn');
  btns.forEach((b, i) => {
    b.classList.toggle('answered', selectedAnswers[i] !== undefined);
    b.classList.toggle('current', i === currentIndex);
  });
}

function renderCurrentQuestion() {
  const q = questions[currentIndex];
  questionsContainer.innerHTML = '';

  const block = document.createElement('div');
  block.className = 'q-block';
  const text = document.createElement('div');
  text.className = 'q-text';
  text.textContent = `${currentIndex + 1}. ${q.text}`;
  block.appendChild(text);

  q.options.forEach((opt, optIndex) => {
    const optionEl = document.createElement('div');
    optionEl.className = 'option' + (selectedAnswers[currentIndex] === optIndex ? ' selected' : '');
    optionEl.textContent = opt;
    optionEl.addEventListener('click', () => {
      selectedAnswers[currentIndex] = optIndex;
      renderCurrentQuestion();
      updateJumpButtons();
      updateSubmitState();
    });
    block.appendChild(optionEl);
  });

  questionsContainer.appendChild(block);
  qCounter.textContent = `${currentIndex + 1} / ${questions.length}`;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === questions.length - 1;
  updateJumpButtons();
}

prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderCurrentQuestion(); } });
nextBtn.addEventListener('click', () => { if (currentIndex < questions.length - 1) { currentIndex++; renderCurrentQuestion(); } });

function updateSubmitState() {
  const answeredCount = Object.keys(selectedAnswers).length;
  submitBtn.disabled = answeredCount < questions.length;
}

// ---------- Timer ----------
function startTimer() {
  timerSeconds = 10 * 60;
  updateTimerText();
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerText();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}
function updateTimerText() {
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  timerText.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// ---------- Quiz submit ----------
submitBtn.addEventListener('click', submitQuiz);

async function submitQuiz() {
  if (timerInterval) clearInterval(timerInterval);
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  const answers = questions.map((q, i) => selectedAnswers[i]);
  const timeTakenSeconds = quizStartTime ? Math.round((Date.now() - quizStartTime) / 1000) : null;

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, courseKey, answers, tabSwitches, pasteAttempts, timeTakenSeconds })
    });
    const data = await res.json();
    if (typeof data.score !== 'number') throw new Error('No score returned');

    quizScreen.classList.add('hidden');
    resultLabel.textContent = 'Score';
    resultScoreText.textContent = `${data.score} / ${data.total}`;
    resultSub.textContent = 'Your result has been sent.';
    resultScreen.classList.remove('hidden');
    progressText.textContent = courseMeta ? courseMeta.code : '';
  } catch (err) {
    submitBtn.textContent = 'Submit';
    submitBtn.disabled = false;
    alert('Something went wrong: ' + err.message);
  }
}

// ---------- Survey (dot-prefixed names) ----------
async function loadSurvey() {
  const res = await fetch('/api/survey');
  surveyData = await res.json();
  renderSurvey();
  surveyScreen.classList.remove('hidden');
}

function renderSurvey() {
  surveyScreen.innerHTML = '';

  surveyData.statements.forEach((statement, i) => {
    const block = document.createElement('div');
    block.className = 'q-block';
    const text = document.createElement('div');
    text.className = 'q-text';
    text.textContent = `${i + 1}. ${statement}`;
    block.appendChild(text);

    surveyData.scale.forEach((label, scaleIndex) => {
      const optionEl = document.createElement('div');
      optionEl.className = 'option' + (surveyAnswers[i] === scaleIndex ? ' selected' : '');
      optionEl.textContent = label;
      optionEl.addEventListener('click', () => {
        surveyAnswers[i] = scaleIndex;
        renderSurvey();
      });
      block.appendChild(optionEl);
    });

    surveyScreen.appendChild(block);
  });

  const openBlock = document.createElement('div');
  openBlock.className = 'q-block';
  const openText = document.createElement('div');
  openText.className = 'q-text';
  openText.textContent = surveyData.openQuestion;
  openBlock.appendChild(openText);
  const textarea = document.createElement('textarea');
  textarea.id = 'surveyOpenInput';
  textarea.placeholder = 'Type your answer...';
  openBlock.appendChild(textarea);
  surveyScreen.appendChild(openBlock);

  const submitSurveyBtn = document.createElement('button');
  submitSurveyBtn.className = 'btn';
  submitSurveyBtn.textContent = 'Submit';
  const answeredCount = Object.keys(surveyAnswers).length;
  submitSurveyBtn.disabled = answeredCount < surveyData.statements.length;
  submitSurveyBtn.addEventListener('click', submitSurvey);
  surveyScreen.appendChild(submitSurveyBtn);
}

async function submitSurvey() {
  const openAnswer = document.getElementById('surveyOpenInput').value.trim();
  const ratings = surveyData.statements.map((s, i) => surveyAnswers[i]);

  try {
    const res = await fetch('/api/submit-survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, ratings, openAnswer })
    });
    const data = await res.json();
    if (typeof data.percent !== 'number') throw new Error('No result returned');

    surveyScreen.classList.add('hidden');
    resultLabel.textContent = '';
    resultScoreText.textContent = '';
    resultSub.textContent = data.percent >= 50
      ? 'Really appreciate your support!'
      : 'Thanks for your feedback.';
    resultScreen.classList.remove('hidden');
    progressText.textContent = '';
  } catch (err) {
    alert('Something went wrong: ' + err.message);
  }
               }
