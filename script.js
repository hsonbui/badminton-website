// ==========================================================================
// SmashPoint - Interactive Features & Logic
// ==========================================================================

// 1. Court Mode Toggle
const courtSvg = document.getElementById('badminton-court');
const btnSingles = document.getElementById('btn-singles');
const btnDoubles = document.getElementById('btn-doubles');
const modeTitle = document.getElementById('mode-title');
const modeDesc = document.getElementById('mode-desc');
const modeBullets = document.getElementById('mode-bullets');

// Set default court mode to Singles
setCourtMode('singles');

function setCourtMode(mode) {
  if (mode === 'singles') {
    courtSvg.className.baseVal = 'court-svg mode-singles';
    btnSingles.classList.add('active');
    btnDoubles.classList.remove('active');

    modeTitle.textContent = "Singles Play: Long & Narrow Court";
    modeDesc.innerHTML = "In singles, the court uses the <strong>inner sidelines</strong> and the <strong>back boundary line</strong>. The side alleys (highlighted in red) are out of bounds for both serving and rallies.";
    modeBullets.innerHTML = `
      <li><strong>Side Tramlines:</strong> Always OUT during serving and rallies.</li>
      <li><strong>Back Tramline:</strong> IN bounds for both service and general play.</li>
      <li><strong>Service Courts:</strong> Must cross the short service line and land in the diagonally opposite service box.</li>
      <li><strong>Serving Position:</strong> Serve from the Right box when your score is Even (0, 2, 4...), and from the Left box when your score is Odd (1, 3, 5...).</li>
    `;
  } else {
    courtSvg.className.baseVal = 'court-svg mode-doubles';
    btnDoubles.classList.add('active');
    btnSingles.classList.remove('active');

    modeTitle.textContent = "Doubles Play: Short & Wide Service, Full Court Rally";
    modeDesc.innerHTML = "In doubles, the court uses the <strong>outer sidelines</strong> for all rally play. However, on the serve, the <strong>rear tramline is OUT</strong> (making the service box short and wide).";
    modeBullets.innerHTML = `
      <li><strong>Service Bounds:</strong> Wide (outer sideline is IN) but Short (back tramline is OUT on serve).</li>
      <li><strong>Rally Bounds:</strong> Once the serve is returned, the entire full court including all tramlines is IN.</li>
      <li><strong>Service Rotation:</strong> The serving team only switches service courts when they score a point on their own serve.</li>
    `;
  }
}

// 2. Shot Data & Interactive Detail Box
const shotDetails = [
  {
    tag: "Offensive Stroke",
    title: "The Forehand Smash",
    body: "The primary attacking weapon in badminton. Hit from deep in the court with a steep downward trajectory, aiming to win the point immediately or force a weak lift. Key mechanics involve high-elbow preparation, rapid forearm pronation, and striking the shuttlecock slightly in front of the body.",
    tip: "Angle beats pure power. A steep smash placed precisely down the line or at the opponent's racket hip is far harder to return than a flat, high-speed smash."
  },
  {
    tag: "Tactical & Deceptive Stroke",
    title: "The Drop Shot",
    body: "Disguised with the exact same wind-up and body language as a high clear or smash, but struck with a decelerated or sliced racket face so the shuttle drops steeply just past the net on the opponent's side.",
    tip: "Keep your preparation identical to your smash until the last split second. The element of surprise forces opponents off-balance and opens up the backcourt."
  },
  {
    tag: "Defensive & Reset Stroke",
    title: "The Overhead Clear (Lob)",
    body: "A high and deep shot directed all the way to the opponent's rear baseline. Used defensively to recover court position and reset the tempo of a rally, or offensively to punch quickly over an opponent who has drifted too far forward.",
    tip: "Ensure your clear reaches the back tramlines. A half-court clear gives your opponent an easy smash opportunity."
  },
  {
    tag: "Aggressive Forecourt Finish",
    title: "The Net Kill (Brush / Push)",
    body: "Executed when an opponent's return tumbles high above the net tape. Instead of a full swing, use a sharp, compact wrist flick to drive the shuttle down steeply into the opponent's front floor.",
    tip: "Never touch the net with your racket or body (a fault). Keep the swing short like a quick brush rather than a full tennis volley."
  },
  {
    tag: "Fast Horizontal Exchange",
    title: "The Drive",
    body: "A flat, rapid shot hit mid-court to mid-court skimming horizontally over the net. Critical in doubles play to wrest attacking control without lifting the shuttlecock.",
    tip: "Stay low with a wide base, keep your racket head up in front of your chest, and utilize quick forearm push-blocks."
  }
];

const shotCards = document.querySelectorAll('.shot-card');
const detailTag = document.getElementById('detail-tag');
const detailTitle = document.getElementById('detail-title');
const detailBody = document.getElementById('detail-body');
const detailTips = document.querySelector('.detail-tips em');

function selectShot(index) {
  shotCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });

  const shot = shotDetails[index];
  detailTag.textContent = shot.tag;
  detailTitle.textContent = shot.title;
  detailBody.textContent = shot.body;
  detailTips.textContent = shot.tip;
}

// Default select first shot
selectShot(0);

// 3. Live Match Scoreboard & BWF Rule Logic
let scoreA = 0;
let scoreB = 0;
let currentServer = 'a'; // 'a' or 'b'
let matchOver = false;

const displayA = document.getElementById('score-a');
const displayB = document.getElementById('score-b');
const serveA = document.getElementById('serve-a');
const serveB = document.getElementById('serve-b');
const serviceHint = document.getElementById('service-hint');
const matchStatus = document.getElementById('match-status');
const nameA = document.getElementById('name-a');
const nameB = document.getElementById('name-b');

function updateScoreboard() {
  displayA.textContent = scoreA;
  displayB.textContent = scoreB;

  // Determine which side of court server uses (Even = Right, Odd = Left)
  const serverScore = currentServer === 'a' ? scoreA : scoreB;
  const courtSide = (serverScore % 2 === 0) ? 'Right' : 'Left';
  const serverName = currentServer === 'a' ? nameA.textContent : nameB.textContent;

  if (currentServer === 'a') {
    serveA.textContent = "🏸 Serving";
    serveB.textContent = "";
  } else {
    serveA.textContent = "";
    serveB.textContent = "🏸 Serving";
  }

  serviceHint.textContent = `Server: ${serverName} (${courtSide} court)`;

  // Check game-winning conditions (BWF standard: 21 points, must lead by 2, capped at 30)
  const diff = Math.abs(scoreA - scoreB);
  const maxScore = Math.max(scoreA, scoreB);

  if ((maxScore >= 21 && diff >= 2) || maxScore === 30) {
    matchOver = true;
    const winner = scoreA > scoreB ? nameA.textContent : nameB.textContent;
    matchStatus.innerHTML = `🏆 <strong>Game Over!</strong> ${winner} wins with ${scoreA} - ${scoreB}! Click Reset to play again.`;
    matchStatus.style.color = "#34d399";
  } else if (maxScore >= 20 && diff === 1) {
    matchStatus.innerHTML = `🔥 <strong>Game Point!</strong> Next point could decide the game.`;
    matchStatus.style.color = "#fbbf24";
  } else if (scoreA >= 20 && scoreB >= 20) {
    matchStatus.innerHTML = `⚔️ <strong>Deuce (${scoreA}-${scoreB})!</strong> Must lead by 2 points to win (max 30).`;
    matchStatus.style.color = "#f87171";
  } else {
    matchStatus.textContent = "First to 21 points (lead by 2, capped at 30). Every rally awards a point.";
    matchStatus.style.color = "var(--text-muted)";
  }
}

function addPoint(team, change) {
  if (matchOver && change > 0) return;

  if (team === 'a') {
    scoreA = Math.max(0, Math.min(30, scoreA + change));
    if (change > 0) currentServer = 'a'; // Rally winner serves next
  } else {
    scoreB = Math.max(0, Math.min(30, scoreB + change));
    if (change > 0) currentServer = 'b'; // Rally winner serves next
  }

  if (matchOver && change < 0) {
    matchOver = false;
  }

  updateScoreboard();
}

function resetScores() {
  scoreA = 0;
  scoreB = 0;
  currentServer = 'a';
  matchOver = false;
  updateScoreboard();
}

// Initial update
updateScoreboard();


// ==========================================================================
// 4. HOW TO PLAY QUIZ
// ==========================================================================

const QUIZ_QUESTIONS = [
  {
    category: "Scoring",
    question: "How many points does a player need to win a standard game in badminton?",
    options: ["15", "21", "25", "30"],
    answer: 1,
    explanation: "A game is won by the first side to reach 21 points, with a lead of at least 2 points (capped at 30-29)."
  },
  {
    category: "Scoring",
    question: "In a match tied at 20-20 (deuce), what is the maximum score a game can reach?",
    options: ["25", "27", "30", "No limit"],
    answer: 2,
    explanation: "At deuce (20-20), play continues until one side leads by 2. The game is capped at 30-29 — no further extension."
  },
  {
    category: "Rules",
    question: "In singles, when is the serve taken from the LEFT service court?",
    options: ["When your score is even (0, 2, 4...)", "When your score is odd (1, 3, 5...)", "Always after winning a rally", "Only in the third game"],
    answer: 1,
    explanation: "In singles, serve from the Right court when your score is even, and from the Left court when your score is odd."
  },
  {
    category: "Rules",
    question: "Which of these is NOT a fault (illegal action) in badminton?",
    options: ["Touching the net with your racket during a rally", "The shuttle landing on the boundary line", "Hitting the shuttle twice in one stroke", "The shuttle hitting the ceiling"],
    answer: 1,
    explanation: "In badminton, landing on the boundary line is IN bounds — the shuttle must land completely outside the line to be out."
  },
  {
    category: "Court",
    question: "In doubles play, are the side tramlines (alleys) in or out during a rally?",
    options: ["Out — same as singles", "In — full width is used", "In for serve, out for rally", "Only in if the shuttle bounced first"],
    answer: 1,
    explanation: "In doubles, the full court width (including side tramlines) is in bounds during a rally. Only the rear tramline is out during the serve."
  },
  {
    category: "Court",
    question: "What is the correct net height at the centre of a standard badminton court?",
    options: ["1.45 m", "1.52 m", "1.60 m", "1.80 m"],
    answer: 1,
    explanation: "The net is 1.524 m (5 ft) high at the centre, and 1.55 m at the posts on either side."
  },
  {
    category: "Shots",
    question: "What is the defining characteristic of a 'drop shot' in badminton?",
    options: ["A powerful downward smash from the backcourt", "A high defensive shot to the opponent's baseline", "A deceptive shot that falls steeply just over the net", "A flat fast exchange at mid-court height"],
    answer: 2,
    explanation: "A drop shot is disguised with a full smash wind-up but the shuttle is struck softly to drop just past the net on the opponent's side."
  },
  {
    category: "Shots",
    question: "Which shot is considered the primary attacking weapon in badminton?",
    options: ["The Clear (Lob)", "The Drive", "The Net Kill", "The Smash"],
    answer: 3,
    explanation: "The forehand smash is the main attacking shot — hit from deep with steep downward trajectory to win the point outright."
  },
  {
    category: "Equipment",
    question: "What does 'head-heavy' mean when describing a badminton racket?",
    options: ["The racket is heavier overall, good for defensive play", "More weight is at the top of the frame, adding smash power", "The handle is wider and heavier for better grip", "The strings are tighter for more control"],
    answer: 1,
    explanation: "A head-heavy racket has more mass in the head/frame area. This generates more power on smashes but can slow reaction time in defense."
  },
  {
    category: "History",
    question: "In which year did badminton make its debut as an Olympic sport?",
    options: ["1988 (Seoul)", "1992 (Barcelona)", "1996 (Atlanta)", "2000 (Sydney)"],
    answer: 1,
    explanation: "Badminton made its Olympic debut at the 1992 Barcelona Games. It has been a permanent Olympic sport ever since."
  }
];

let quizState = {
  current: 0,
  score: 0,
  answered: false,
  wrongAnswers: []
};

function quizInit() {
  quizState = { current: 0, score: 0, answered: false, wrongAnswers: [] };
  document.getElementById('quiz-results').style.display = 'none';
  document.getElementById('quiz-card').style.display = 'block';
  quizRender();
}

function quizRender() {
  const q = QUIZ_QUESTIONS[quizState.current];
  const total = QUIZ_QUESTIONS.length;

  // Progress bar
  document.getElementById('quiz-progress-bar').style.width =
    ((quizState.current / total) * 100) + '%';
  document.getElementById('quiz-counter').textContent =
    `Question ${quizState.current + 1} of ${total}`;
  document.getElementById('quiz-score-label').textContent =
    `Score: ${quizState.score}`;

  document.getElementById('quiz-category').textContent = q.category;
  document.getElementById('quiz-question').textContent = q.question;
  document.getElementById('quiz-feedback').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'none';
  quizState.answered = false;

  // Build option buttons
  const optionsEl = document.getElementById('quiz-options');
  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = () => quizAnswer(i);
    optionsEl.appendChild(btn);
  });
}

function quizAnswer(selectedIndex) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = QUIZ_QUESTIONS[quizState.current];
  const correct = selectedIndex === q.answer;
  const options = document.querySelectorAll('.quiz-option');

  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === selectedIndex && !correct) btn.classList.add('wrong');
  });

  if (correct) {
    quizState.score++;
  } else {
    quizState.wrongAnswers.push({ q: q.question, correct: q.options[q.answer] });
  }

  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = 'block';
  feedback.className = 'quiz-feedback ' + (correct ? 'feedback-correct' : 'feedback-wrong');
  feedback.innerHTML = (correct ? '✅ <strong>Correct!</strong> ' : '❌ <strong>Wrong!</strong> ') + q.explanation;

  // Update score label immediately
  document.getElementById('quiz-score-label').textContent = `Score: ${quizState.score}`;

  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.style.display = 'inline-block';
  const isLast = quizState.current === QUIZ_QUESTIONS.length - 1;
  nextBtn.textContent = isLast ? '🏁 See Results' : 'Next Question →';
}

function quizNext() {
  if (quizState.current < QUIZ_QUESTIONS.length - 1) {
    quizState.current++;
    quizRender();
  } else {
    quizShowResults();
  }
}

function quizShowResults() {
  document.getElementById('quiz-card').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'block';
  document.getElementById('quiz-progress-bar').style.width = '100%';

  const score = quizState.score;
  const total = QUIZ_QUESTIONS.length;

  document.getElementById('quiz-final-score').textContent = `${score} / ${total}`;

  let emoji, title, desc;
  if (score === total) {
    emoji = '🏆'; title = 'Perfect Score!'; desc = 'You\'re a true badminton expert. Incredible knowledge!';
  } else if (score >= total * 0.8) {
    emoji = '🥇'; title = 'Excellent!'; desc = 'You really know your badminton. Almost there!';
  } else if (score >= total * 0.6) {
    emoji = '🥈'; title = 'Good Job!'; desc = 'Solid knowledge — keep practicing and you\'ll ace it!';
  } else if (score >= total * 0.4) {
    emoji = '🥉'; title = 'Not Bad!'; desc = 'You know the basics. Read the Court & Shots sections to improve!';
  } else {
    emoji = '🏸'; title = 'Keep Learning!'; desc = 'Explore the guide above and try again — you\'ve got this!';
  }

  document.getElementById('quiz-result-emoji').textContent = emoji;
  document.getElementById('quiz-result-title').textContent = title;
  document.getElementById('quiz-result-desc').textContent = desc;

  const breakdown = document.getElementById('quiz-result-breakdown');
  if (quizState.wrongAnswers.length > 0) {
    breakdown.innerHTML = '<p class="breakdown-title">Review these answers:</p>' +
      quizState.wrongAnswers.map(w =>
        `<div class="breakdown-item">❌ ${w.q}<br><span class="breakdown-correct">✅ ${w.correct}</span></div>`
      ).join('');
  } else {
    breakdown.innerHTML = '<p class="breakdown-title">🎯 You got every single question right!</p>';
  }
}

function quizRestart() {
  quizInit();
}

// Start the quiz on page load
quizInit();
