let questions = [];
let selectedAnswers = {};

const questionsContainer = document.getElementById('questionsContainer');
const submitBtn = document.getElementById('submitBtn');
const progressText = document.getElementById('progressText');
const nameInput = document.getElementById('nameInput');
const setupScreen = document.getElementById('setupScreen');
const resultScreen = document.getElementById('resultScreen');
const resultScoreText = document.getElementById('resultScoreText');

async function loadQuestions() {
  try {
    const res = await fetch('/api/questions');
    questions = await res.json();
    renderQuestions();
    progressText.textContent = `${questions.length} questions`;
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

submitBtn.addEventListener('click', async () => {
  const name = nameInput.value.trim() || 'Anonymous';
  const answers = questions.map(q => selectedAnswers[q.index]);

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, answers })
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

loadQuestions();
