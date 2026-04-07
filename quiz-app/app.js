// app.js — Cisco DEVASC Quiz App Logic

'use strict';

// ============================================================
// State
// ============================================================
const state = {
  questions: [],
  current: 0,
  score: 0,
  missedIndices: [],  // indices into state.questions
  answeredThisQ: false,
  mode: 'all',  // 'all' | 'section' | 'missed'
  selectedSection: null,
};

// ============================================================
// DOM refs
// ============================================================
const screens = {
  home:    document.getElementById('screen-home'),
  quiz:    document.getElementById('screen-quiz'),
  results: document.getElementById('screen-results'),
};

// ============================================================
// Utility
// ============================================================
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo(0, 0);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getIncludedTypes() {
  const mc   = document.getElementById('chk-mc').checked;
  const fill = document.getElementById('chk-fill-blank').checked;
  if (mc && fill)  return null;   // both — no filter
  if (mc)          return 'mc';
  if (fill)        return 'fill';
  return null;
}

function filterQuestions(pool) {
  const type = getIncludedTypes();
  if (!type) return pool;
  return pool.filter(q => q.type === type);
}

// ============================================================
// Home screen — build section buttons
// ============================================================
const sections = [...new Set(QUESTIONS.map(q => q.section))];

const grid = document.getElementById('section-grid');
sections.forEach(sec => {
  const btn = document.createElement('button');
  btn.className = 'section-btn';
  btn.textContent = sec;
  btn.dataset.section = sec;
  btn.addEventListener('click', () => startQuiz('section', sec));
  grid.appendChild(btn);
});

document.getElementById('btn-all').addEventListener('click', () => startQuiz('all'));

// ============================================================
// Start quiz
// ============================================================
function startQuiz(mode, section = null, pool = null) {
  state.mode = mode;
  state.selectedSection = section;
  state.score = 0;
  state.current = 0;
  state.missedIndices = [];
  state.answeredThisQ = false;

  let base;
  if (pool) {
    base = pool;
  } else if (mode === 'section') {
    base = QUESTIONS.filter(q => q.section === section);
  } else {
    base = QUESTIONS;
  }

  const filtered = filterQuestions(base);
  if (!filtered.length) {
    alert('No questions available for the selected filters. Please enable at least one question type.');
    return;
  }
  state.questions = shuffle(filtered);

  showScreen('quiz');
  renderQuestion();
}

// ============================================================
// Render current question
// ============================================================
function renderQuestion() {
  const q = state.questions[state.current];
  state.answeredThisQ = false;

  // Header
  const total = state.questions.length;
  document.getElementById('progress-label').textContent = `Question ${state.current + 1} of ${total}`;
  document.getElementById('progress-fill').style.width = `${((state.current) / total) * 100}%`;
  document.getElementById('score-badge').textContent = `Score: ${state.score}`;

  // Meta
  document.getElementById('q-section').textContent = q.section;
  document.getElementById('q-topic').textContent = q.topic;
  document.getElementById('q-text').textContent = q.question;

  // Hide feedback & next
  document.getElementById('feedback').style.display = 'none';
  document.getElementById('btn-next').style.display = 'none';

  // Show correct pane
  if (q.type === 'mc') {
    document.getElementById('fill-area').style.display = 'none';
    renderMC(q);
  } else {
    document.getElementById('mc-options').innerHTML = '';
    renderFill(q);
  }
}

function renderMC(q) {
  const container = document.getElementById('mc-options');
  container.innerHTML = '';

  // Shuffle choices but remember mapping
  const indices = shuffle(q.choices.map((_, i) => i));

  indices.forEach(origIdx => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = q.choices[origIdx];
    btn.dataset.orig = origIdx;
    btn.addEventListener('click', () => handleMCAnswer(btn, q, indices));
    container.appendChild(btn);
  });
}

function handleMCAnswer(clicked, q, indices) {
  if (state.answeredThisQ) return;
  state.answeredThisQ = true;

  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => { b.disabled = true; });

  const isCorrect = parseInt(clicked.dataset.orig) === q.answer;

  if (isCorrect) {
    clicked.classList.add('correct');
    state.score++;
    showFeedback(true, q.explanation);
  } else {
    clicked.classList.add('wrong');
    // Reveal correct answer
    allBtns.forEach(b => {
      if (parseInt(b.dataset.orig) === q.answer) b.classList.add('reveal-correct');
    });
    state.missedIndices.push(state.current);
    showFeedback(false, q.explanation, q.choices[q.answer]);
  }

  document.getElementById('btn-next').style.display = 'block';
}

function renderFill(q) {
  const area = document.getElementById('fill-area');
  area.style.display = 'flex';

  const input = document.getElementById('fill-input');
  input.value = '';
  input.className = 'fill-input';
  input.disabled = false;
  input.focus();

  const btn = document.getElementById('btn-submit-fill');
  btn.onclick = null;

  const submit = () => handleFillAnswer(q, input.value.trim());
  btn.addEventListener('click', submit, { once: true });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !state.answeredThisQ) submit();
  }, { once: true });
}

function handleFillAnswer(q, userInput) {
  if (state.answeredThisQ) return;
  if (!userInput) return;
  state.answeredThisQ = true;

  const input = document.getElementById('fill-input');
  input.disabled = true;

  const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const isCorrect = normalize(userInput) === normalize(q.answer);

  if (isCorrect) {
    input.classList.add('correct');
    state.score++;
    showFeedback(true, q.explanation);
  } else {
    input.classList.add('wrong');
    state.missedIndices.push(state.current);
    showFeedback(false, q.explanation, q.answer);
  }

  document.getElementById('btn-next').style.display = 'block';
}

function showFeedback(correct, explanation, correctAnswer = null) {
  const box   = document.getElementById('feedback');
  const icon  = document.getElementById('feedback-icon');
  const title = document.getElementById('feedback-title');
  const expl  = document.getElementById('feedback-explanation');

  box.style.display = 'flex';
  box.className = `feedback ${correct ? 'correct-feedback' : 'wrong-feedback'}`;

  if (correct) {
    icon.textContent  = '✅';
    title.textContent = 'Correct!';
    title.className   = 'feedback-title correct';
  } else {
    icon.textContent  = '❌';
    title.textContent = `Incorrect — Correct answer: ${correctAnswer}`;
    title.className   = 'feedback-title wrong';
  }

  expl.textContent = explanation;
}

// ============================================================
// Next question
// ============================================================
document.getElementById('btn-next').addEventListener('click', () => {
  state.current++;
  if (state.current >= state.questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
});

// ============================================================
// Results screen
// ============================================================
function showResults() {
  const total    = state.questions.length;
  const correct  = state.score;
  const wrong    = total - correct;
  const pct      = Math.round((correct / total) * 100);

  document.getElementById('stat-correct').textContent = correct;
  document.getElementById('stat-wrong').textContent   = wrong;
  document.getElementById('stat-pct').textContent     = `${pct}%`;

  let graphic, title, subtitle;
  if (pct >= 90) {
    graphic  = '🏆'; title = 'Excellent!';
    subtitle = 'Outstanding performance — you are exam-ready!';
  } else if (pct >= 75) {
    graphic  = '🎯'; title = 'Great Job!';
    subtitle = 'Solid understanding — review the missed questions.';
  } else if (pct >= 60) {
    graphic  = '📚'; title = 'Keep Studying';
    subtitle = 'Good start — revisit the missed topics and try again.';
  } else {
    graphic  = '💪'; title = 'Keep Practicing';
    subtitle = 'Review the sections and try again — you can do it!';
  }

  document.getElementById('result-graphic').textContent = graphic;
  document.getElementById('result-title').textContent   = title;
  document.getElementById('result-subtitle').textContent = subtitle;

  // Missed questions
  const missedSection = document.getElementById('missed-section');
  const missedList    = document.getElementById('missed-list');
  const retryBtn      = document.getElementById('btn-retry-missed');
  missedList.innerHTML = '';

  if (state.missedIndices.length > 0) {
    missedSection.style.display = 'block';
    retryBtn.style.display = 'inline-block';

    state.missedIndices.forEach(idx => {
      const q = state.questions[idx];
      const item = document.createElement('div');
      item.className = 'missed-item';

      const correctAns = q.type === 'mc'
        ? q.choices[q.answer]
        : q.answer;

      item.innerHTML = `
        <p class="q-text"><strong>${q.topic}</strong><br>${q.question}</p>
        <p class="q-correct-ans">✔ Correct: ${correctAns}</p>
      `;
      missedList.appendChild(item);
    });
  } else {
    missedSection.style.display = 'none';
    retryBtn.style.display = 'none';
  }

  // Update progress bar to 100%
  document.getElementById('progress-fill').style.width = '100%';

  showScreen('results');
}

// ============================================================
// Results actions
// ============================================================
document.getElementById('btn-retry-missed').addEventListener('click', () => {
  const missedQs = state.missedIndices.map(i => state.questions[i]);
  startQuiz('missed', null, missedQs);
});

document.getElementById('btn-restart').addEventListener('click', () => {
  showScreen('home');
});

document.getElementById('btn-quit').addEventListener('click', () => {
  if (confirm('Quit this quiz? Your progress will be lost.')) {
    showScreen('home');
  }
});
