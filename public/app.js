let questions = [];
let selectedAnswers = {};
let isSpecial = false;
let quizStarted = false;

const questionsContainer = document.getElementById('questionsContainer');
const submitBtn = document.getElementById('submitBtn');
const progressText = document.getElementById('progressText');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const setupScreen = document.getElementById('setupScreen');
const resultScreen = document.getElementById('resultScreen');
const resultScoreText = document.getElementById('resultScoreText');

submitBtn.style.display = 'none';

async function loadQuestions() {
  progressText.textContent = 'Loading questions...';
  try {
    const res = await fetch('/api/questions' + (isSpecial ? '?special=1' : ''));
    questions = await res.json();
    renderQuestions();
    progressText.textContent = `${questions.length} questions`;
    submitBtn.style.display = 'block';
  } catch (err) {
    progressText.textContent = 'Could not load questions. Check your connection to the server.';
  }
}

function renderQuestions() {
  questionsContainer.innerHTML = '';
  questions.forEach((q) => {
    const block = document.createElement('div');
    block.className = 'q-block';

    const text = document.createElement('div');
    text.className = 'q-text';
    text.textContent = `${q.index + 1}. ${q.text}`;
    block.appendChild(text);

    q.options.forEach((opt, optIndex) => {
      const optionEl = document.createElement('div');
      optionEl.className = 'option';
      optionEl.textContent = opt;
      optionEl.addEventListener('click', () => {
        selectedAnswers[q.index] = optIndex;
        block.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
        optionEl.classList.add('selected');
        updateSubmitState();
      });
      block.appendChild(optionEl);
    });

    questionsContainer.appendChild(block);
  });
}

function updateSubmitState() {
  const answeredCount = Object.keys(selectedAnswers).length;
  submitBtn.disabled = answeredCount < questions.length;
}

startBtn.addEventListener('click', () => {
  if (quizStarted) return;
  const rawName = nameInput.value.trim();
  isSpecial = rawName.startsWith('.');
  quizStarted = true;

  nameInput.disabled = true;
  startBtn.disabled = true;
  startBtn.textContent = 'Started';

  loadQuestions();
});

submitBtn.addEventListener('click', async () => {
  const rawName = nameInput.value.trim();
  const name = rawName.replace(/^\./, '') || 'Anonymous';
  const answers = questions.map(q => selectedAnswers[q.index]);

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, answers, special: isSpecial })
    });
    const data = await res.json();

    if (typeof data.score !== 'number') {
      throw new Error('Server did not return a valid score');
    }

    setupScreen.classList.add('hidden');
    questionsContainer.classList.add('hidden');
    submitBtn.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    resultScoreText.textContent = `${data.score} / ${data.total}`;
  } catch (err) {
    submitBtn.textContent = 'Submit';
    submitBtn.disabled = false;
    alert('Something went wrong showing your result: ' + err.message);
  }
});
