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
