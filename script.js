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
// 4. THE 50-QUESTION BADMINTON MASTER QUIZ
// ==========================================================================

const ALL_QUIZ_QUESTIONS = [
  // ── 1. KEY SHOTS & TECHNIQUES (10 Questions) ──────────────────────────────
  {
    category: "Shots",
    question: "Which shot is considered the primary attacking weapon in badminton, hit with steep downward trajectory and maximum power?",
    options: ["The Clear", "The Drive", "The Net Kill", "The Forehand Smash"],
    answer: 3,
    explanation: "The forehand smash is badminton's ultimate kill shot, struck steeply downward at speeds exceeding 400 km/h."
  },
  {
    category: "Shots",
    question: "What is the defining characteristic of a drop shot in badminton?",
    options: ["A powerful downward smash from the backcourt", "A high defensive lob to the baseline", "A deceptive shot that drops steeply just over the net", "A flat horizontal exchange at mid-court height"],
    answer: 2,
    explanation: "A drop shot is disguised with a full smash wind-up but decelerated at contact so it dips sharply right past the net."
  },
  {
    category: "Shots",
    question: "What is a 'net kill' (or net brush) in badminton?",
    options: ["Smashing the shuttle straight at the opponent's chest", "A sharp, compact wrist flick to drive a loose high net return steeply down", "A deceptive shot disguised as a lob", "Blocking a smash into the side alley"],
    answer: 1,
    explanation: "A net kill is played when the opponent lifts or leaves a return high above the net tape — a quick brush down finishes the rally immediately."
  },
  {
    category: "Shots",
    question: "What is the primary tactical purpose of a high defensive overhead clear?",
    options: ["To score an immediate clean winner", "To push the opponent deep to their baseline and buy recovery time to reset position", "To spin the shuttle so it tumbles over the tape", "To force the opponent to play a backhand drive"],
    answer: 1,
    explanation: "The defensive clear sends the shuttle high and deep to the opponent's backcourt, giving you time to return to the centre base."
  },
  {
    category: "Shots",
    question: "What is a 'drive' shot in badminton?",
    options: ["A high looping shot to the baseline", "A flat, rapid shot skimming horizontally just over the net tape", "A steep downward smash from midcourt", "A delicate slice drop into the corner"],
    answer: 1,
    explanation: "A drive is a fast, flat exchange hit at chest/waist level, critical in doubles to keep pressure without lifting."
  },
  {
    category: "Shots",
    question: "What is a 'flick serve'?",
    options: ["A low, gentle serve aimed at the front line", "A deceptive serve that looks like a low serve but suddenly whips high and deep to the rear court", "A side-sliced serve into the doubles alley", "A serve where the racket contacts the feathers first"],
    answer: 1,
    explanation: "A flick serve disguises a low serve stance but uses a fast wrist snap to propel the shuttle over the receiver's head."
  },
  {
    category: "Shots",
    question: "What biomechanical motion generates the majority of power in an overhead badminton smash?",
    options: ["Bending the knees backward", "Forearm pronation and rapid wrist snap at high contact point", "Locking the elbow completely straight throughout the swing", "Swinging the arm with a stiff wrist like a tennis serve"],
    answer: 1,
    explanation: "Forearm pronation (internal rotation) combined with wrist extension/flexion creates the whipping racket speed needed for a 400+ km/h smash."
  },
  {
    category: "Shots",
    question: "What is a 'cross-court sliced drop' shot?",
    options: ["Hitting the shuttle flat across the diagonal at head height", "Slicing across the shuttlecock at an angle to create deceptive spin, altered trajectory, and deceleration", "Hitting the cork with the racket frame deliberately", "A backhand clear hit with an open racket face"],
    answer: 1,
    explanation: "Slicing the racket face across the cork creates friction and angle deception, making the shuttle dive diagonally across court."
  },
  {
    category: "Shots",
    question: "When executing a tight tumbling net shot, how should the racket face make contact with the shuttle?",
    options: ["With a heavy downward hammer smash", "Gently slicing or brushing under the cork to induce a tumbling spin over the tape", "With a full follow-through pointing to the floor", "By pushing the shuttle with two hands on the grip"],
    answer: 1,
    explanation: "Brushing under the shuttle cork creates a tumbling motion that forces the opponent to lift from below net height."
  },
  {
    category: "Shots",
    question: "What is the purpose of an attacking 'punch clear' (or flat attacking clear)?",
    options: ["To lift the shuttle as high as the arena ceiling", "To quickly push the shuttle over the opponent's reach into deep court before they can retreat", "To gently drop the shuttle on the short service line", "To hit the shuttle deliberately out of bounds"],
    answer: 1,
    explanation: "An attacking clear has a lower, flatter trajectory than a defensive clear, catching the opponent flat-footed and off balance."
  },

  // ── 2. RULES & FAULTS (10 Questions) ─────────────────────────────────────
  {
    category: "Rules",
    question: "Which of these is NOT considered a fault in competitive badminton?",
    options: ["Touching the net with your racket or body during a rally", "The shuttle landing on any part of the boundary line", "Hitting the shuttle twice consecutively in one stroke", "The shuttle striking the arena ceiling or wall"],
    answer: 1,
    explanation: "In badminton, the line is IN bounds. The shuttle must land completely outside the boundary lines to be called 'out'."
  },
  {
    category: "Rules",
    question: "What happens if a player touches the net with their racket, body, or clothing during an active rally?",
    options: ["A let is called and the point is replayed", "Play continues until the shuttle hits the floor", "It is an immediate fault and the opponent wins the point", "A warning is issued on the first offence"],
    answer: 2,
    explanation: "Touching the net with racket, body, or apparel while the shuttle is in play is an immediate fault."
  },
  {
    category: "Rules",
    question: "Can a player reach across the net to hit the shuttle before it has passed over to their side?",
    options: ["Yes, whenever they can reach it", "No, it is a fault to strike the shuttle before it crosses the net plane", "Yes, but only in doubles play", "Yes, as long as their racket does not hit the net"],
    answer: 1,
    explanation: "You cannot strike the shuttle until it has crossed into your court plane. Doing so is an obstruction / over-the-net fault."
  },
  {
    category: "Rules",
    question: "Is it legal for a player's racket to follow through across the net plane after hitting the shuttle on their own side?",
    options: ["No, any part of the racket crossing the net is always a fault", "Yes, provided contact occurred on their own side and the net was not touched", "Only during a smash, not during net play", "Only if the umpire grants permission"],
    answer: 1,
    explanation: "A follow-through may cross the net plane as long as the initial point of contact was on your side and you did not touch or obstruct the net."
  },
  {
    category: "Rules",
    question: "What is a 'let' under official BWF rules?",
    options: ["A penalty point awarded to the receiver", "A ruling that halts play and replays the rally without awarding a point", "A fault committed during the service delivery", "An automatic win of the game for unsportsmanlike conduct"],
    answer: 1,
    explanation: "A 'let' halts play without penalty or point — such as when an unforeseen disturbance occurs or the shuttle breaks mid-rally."
  },
  {
    category: "Rules",
    question: "Under current BWF service rules, at what height must the shuttlecock be struck during a serve?",
    options: ["Any height as long as the racket head points downward", "The entire shuttle must be below 1.15 metres from the court surface at contact", "Above the server's shoulder", "Level with the top of the net"],
    answer: 1,
    explanation: "Under BWF fixed-height service law (Law 9.1.5), the entire shuttle must be below 1.15 metres from the court surface at the moment of contact."
  },
  {
    category: "Rules",
    question: "What must both the server and receiver do with their feet until the serve is struck?",
    options: ["Keep parts of both feet in stationary contact with the court surface inside their service boxes", "They may run forward as soon as the server's arm starts moving", "One foot must be lifted completely off the ground", "Both feet must be touching the boundary lines"],
    answer: 0,
    explanation: "Both feet of the server and receiver must remain stationary and on the floor inside their respective service courts until the serve is hit."
  },
  {
    category: "Rules",
    question: "What happens if the server swings and completely misses the shuttlecock on the serve?",
    options: ["The server gets a second try (like in tennis)", "It is a service fault and the opponent wins the rally and point", "A let is automatically called", "The umpire flips a coin"],
    answer: 1,
    explanation: "Unlike tennis, there is no second serve in badminton. Missing the shuttle entirely is an immediate fault and costs a point."
  },
  {
    category: "Rules",
    question: "Can a player deliberately distract, shout, or gesture to obstruct an opponent before they hit the shuttle?",
    options: ["Yes, psychological distraction is part of the game", "No, it is an illegal obstruction / fault", "Only the receiver is allowed to shout", "Yes, but only in doubles communication"],
    answer: 1,
    explanation: "Deliberately shouting, waving, or making actions to distract the opponent while they are striking the shuttle is a fault (Law 13.4.4)."
  },
  {
    category: "Rules",
    question: "If the shuttlecock disintegrates or the cork separates from the feathers mid-rally, what is the call?",
    options: ["The rally continues with whatever piece lands first", "A fault against whoever hit it last", "A let is called and the rally is replayed with a fresh shuttle", "The point goes to the receiver"],
    answer: 2,
    explanation: "Under BWF Law 14.2.4, if the shuttle completely disintegrates mid-rally, a let must be called immediately."
  },

  // ── 3. SCORING & SERVICE (10 Questions) ──────────────────────────────────
  {
    category: "Scoring",
    question: "How many points are required to win a standard game in BWF badminton?",
    options: ["11 points", "15 points", "21 points (leading by at least 2 points)", "25 points"],
    answer: 2,
    explanation: "A standard game is won by the first side to score 21 points with a margin of at least 2 points."
  },
  {
    category: "Scoring",
    question: "In a match tied at 20-20 (deuce), what is the maximum score cap a game can reach?",
    options: ["25-24", "28-26", "30-29 (first to 30 points wins)", "No cap, play continues indefinitely until a 2-point lead"],
    answer: 2,
    explanation: "If the score reaches 29-29, the side scoring the 30th point wins the game (30-29). The score is never extended past 30."
  },
  {
    category: "Scoring",
    question: "Under the BWF rally-point scoring system, how are points awarded?",
    options: ["Only the serving side can score points", "Every single rally winner scores a point regardless of who served", "Points are awarded only after two consecutive rally wins", "The receiver gets 2 points if they win the rally"],
    answer: 1,
    explanation: "Under the rally point system (introduced in 2006), whoever wins the rally wins the point and the right to serve."
  },
  {
    category: "Scoring",
    question: "How many games are played in a standard official badminton match?",
    options: ["Best of 1 single game to 30", "Best of 3 games to 21", "Best of 5 games to 15", "Best of 3 games to 15"],
    answer: 1,
    explanation: "All standard BWF matches are best-of-three games. The first to win two games wins the match."
  },
  {
    category: "Scoring",
    question: "In singles, which service court does the server serve from when their score is EVEN (0, 2, 4, 6...)?",
    options: ["Left service court", "Right service court", "Either court of their choice", "The back tramline"],
    answer: 1,
    explanation: "Even score = Right service court. At 0-0, the match always begins from the right service court."
  },
  {
    category: "Scoring",
    question: "In singles, which service court does the server serve from when their score is ODD (1, 3, 5, 7...)?",
    options: ["Right service court", "Left service court", "From the centre 'T' line", "Opposite to where the receiver stands"],
    answer: 1,
    explanation: "Odd score = Left service court. When the server has an odd score, they deliver from the left box."
  },
  {
    category: "Scoring",
    question: "In the third deciding game of a match, at what score do players switch ends of the court?",
    options: ["When either side first reaches 11 points", "When the score is tied at 10-10", "At 15 points", "Ends are never switched during the third game"],
    answer: 0,
    explanation: "In the third game, players switch ends when the leading side first reaches 11 points."
  },
  {
    category: "Scoring",
    question: "In doubles, when do partners on the serving team swap their service courts (left/right)?",
    options: ["After every completed rally", "Only when their side wins a point on their OWN serve", "Whenever the opponents make an unforced error", "At the end of every 5-point cycle"],
    answer: 1,
    explanation: "The serving team swaps courts only after scoring a point on their own serve. They do NOT swap if they won the serve from the opponents."
  },
  {
    category: "Scoring",
    question: "At 29-29 in an intense deuce situation, how many more points are required to win?",
    options: ["Must win by 2 points (e.g. 32-30)", "Just 1 point — whoever scores the 30th point wins immediately", "A 5-point tiebreak is played", "A coin toss decides the winner"],
    answer: 1,
    explanation: "At 29-29, the normal 2-point lead rule is waived. The first side to reach 30 points wins 30-29."
  },
  {
    category: "Scoring",
    question: "Who serves first at the beginning of the second game in a match?",
    options: ["The side that won the first game", "The side that lost the first game", "Whoever served first in game 1", "Decided by a new coin toss"],
    answer: 0,
    explanation: "Under BWF rules, the winner of the previous game always serves first in the following game."
  },

  // ── 4. COURT & EQUIPMENT (10 Questions) ──────────────────────────────────
  {
    category: "Court",
    question: "What are the full standard dimensions (length × width) of a doubles badminton court?",
    options: ["12.0 m × 5.5 m", "13.4 m × 6.1 m", "14.5 m × 7.0 m", "13.4 m × 5.18 m"],
    answer: 1,
    explanation: "A full badminton court is 13.40 metres long and 6.10 metres wide for doubles."
  },
  {
    category: "Court",
    question: "What is the width of a badminton court for singles play?",
    options: ["4.80 m", "5.18 m", "6.10 m", "5.80 m"],
    answer: 1,
    explanation: "Singles uses the inner sidelines, reducing the court width from 6.10 m to 5.18 m."
  },
  {
    category: "Court",
    question: "What is the official net height at the centre of the court?",
    options: ["1.40 m", "1.524 m (5 feet)", "1.55 m", "1.60 m"],
    answer: 1,
    explanation: "The net height is 1.524 metres (5 feet) at the centre and 1.55 metres at the post edges."
  },
  {
    category: "Court",
    question: "What is the distance between the net and the short service line?",
    options: ["1.50 m", "1.98 m (6 feet 6 inches)", "2.25 m", "2.50 m"],
    answer: 1,
    explanation: "The short service line is 1.98 metres from the net. Any serve landing short of this line is a fault."
  },
  {
    category: "Court",
    question: "In doubles, during the serve, which tramlines are considered OUT of bounds?",
    options: ["The side tramlines are out; back tramline is in", "The rear tramline (long service line) is out; side tramlines are in", "Both side and back tramlines are out", "All tramlines are in on serve"],
    answer: 1,
    explanation: "On the doubles serve: wide and short! The side alleys are IN, but the rear 0.76 m tramline is OUT."
  },
  {
    category: "Court",
    question: "How many feathers are in a standard BWF-approved tournament shuttlecock?",
    options: ["12 feathers", "14 feathers", "16 feathers", "18 feathers"],
    answer: 2,
    explanation: "Every official tournament shuttlecock has exactly 16 goose or duck feathers fixed into a rounded cork base."
  },
  {
    category: "Court",
    question: "What weight class does a standard '4U' badminton racket represent?",
    options: ["70–74 grams", "75–79 grams", "80–84 grams", "85–89 grams"],
    answer: 2,
    explanation: "4U designates 80–84 grams, the most versatile and popular weight for both singles and doubles."
  },
  {
    category: "Court",
    question: "What does a 'head-heavy' balance indicate about a badminton racket?",
    options: ["More mass is distributed in the frame head, generating greater smash momentum", "The grip handle is extra thick and heavy", "The overall racket weighs more than 100 grams", "The strings are strung at maximum tension"],
    answer: 0,
    explanation: "Head-heavy rackets shift weight toward the racket head, giving extra inertia for explosive smashes."
  },
  {
    category: "Court",
    question: "Why are non-marking gum-rubber soles mandatory on indoor badminton courts?",
    options: ["To make footsteps completely silent", "To provide optimal traction without scuffing or damaging specialized court mats", "To increase jump height by 20%", "Because standard rubber melts under friction"],
    answer: 1,
    explanation: "Non-marking gum rubber provides critical traction for sudden lunges without leaving streaks on court surfaces."
  },
  {
    category: "Court",
    question: "What does a shuttlecock speed rating of 77 or 78 indicate compared to 75?",
    options: ["77/78 flies faster and is calibrated for cooler temperatures or denser sea-level air", "77/78 is lighter and flies slower", "77/78 is designed exclusively for outdoor wind resistance", "77/78 has plastic nylon skirts instead of feathers"],
    answer: 0,
    explanation: "Cold or dense air slows shuttles down, so faster-rated shuttles (77/78) are used to maintain correct flight distance."
  },

  // ── 5. HISTORY & STRATEGY (10 Questions) ─────────────────────────────────
  {
    category: "History",
    question: "In what year and host city did badminton make its debut as an official Olympic medal sport?",
    options: ["1988 Seoul", "1992 Barcelona", "1996 Atlanta", "2000 Sydney"],
    answer: 1,
    explanation: "Badminton became a full Olympic medal sport at the 1992 Barcelona Games (following a demonstration in Seoul 1988)."
  },
  {
    category: "History",
    question: "From which English estate did the sport of modern badminton derive its name around 1873?",
    options: ["Wimbledon Manor in London", "Badminton House in Gloucestershire", "Buckingham Palace in Westminster", "Windsor Castle in Berkshire"],
    answer: 1,
    explanation: "The sport was formalised at Badminton House in Gloucestershire, country home of the Duke of Beaufort."
  },
  {
    category: "History",
    question: "What is the name of the prestigious Men's World Team Championship trophy in badminton?",
    options: ["The Uber Cup", "The Thomas Cup", "The Sudirman Cup", "The Davis Cup"],
    answer: 1,
    explanation: "The Thomas Cup, inaugurated in 1948–49, is the premier trophy for men's national teams."
  },
  {
    category: "History",
    question: "What is the name of the Women's World Team Championship trophy in badminton?",
    options: ["The Thomas Cup", "The Uber Cup", "The Sudirman Cup", "The Billie Jean King Cup"],
    answer: 1,
    explanation: "The Uber Cup, founded in 1956–57, is the women's equivalent of the Thomas Cup."
  },
  {
    category: "History",
    question: "Which prestigious international championship represents the World Mixed Team Championship?",
    options: ["The Sudirman Cup", "The All England Championship", "The Thomas Cup", "The BWF World Tour Finals"],
    answer: 0,
    explanation: "Named after Indonesian badminton pioneer Dick Sudirman, the Sudirman Cup is held biennially for mixed national teams."
  },
  {
    category: "History",
    question: "Which legendary player won back-to-back Men's Singles Olympic gold medals (2008 & 2012) and 5 World Championship titles?",
    options: ["Lee Chong Wei", "Taufik Hidayat", "Lin Dan", "Peter Gade"],
    answer: 2,
    explanation: "Lin Dan ('Super Dan') of China achieved the historic 'Super Grand Slam' by winning all nine major titles in badminton."
  },
  {
    category: "History",
    question: "What is the fastest recorded smash speed in competitive badminton, proving it the fastest racket sport?",
    options: ["332 km/h", "390 km/h", "493+ km/h", "600 km/h"],
    answer: 2,
    explanation: "Speeds over 493 km/h have been recorded in match play (and over 565 km/h in lab tests), far faster than tennis or squash."
  },
  {
    category: "History",
    question: "In doubles tactical play, what is the standard 'front-and-back' court formation used for?",
    options: ["Defending against opponent smashes", "Attacking — rear player smashes while front player intercepts weak lifts at the net", "Executing a high defensive lift", "Serving in mixed doubles only"],
    answer: 1,
    explanation: "Front-and-back is the attacking formation: the backcourt player smashes while the net player intercepts replies."
  },
  {
    category: "History",
    question: "What is the 'split-step' in badminton footwork and why is it essential?",
    options: ["A full stretching split performed when lunging", "A small reactive hop landing with feet apart just as the opponent hits the shuttle to initiate rapid movement", "Stepping backward onto one foot during the serve", "A victory celebration after winning a rally"],
    answer: 1,
    explanation: "The split-step loads the calf and leg muscles elastically, letting players sprint explosively in whichever direction the shuttle is struck."
  },
  {
    category: "History",
    question: "Approximately how much running distance can a top singles player cover during an intense 3-game match?",
    options: ["Under 1 kilometre", "Around 2 kilometres", "Between 5 and 6 kilometres of explosive sprints, lunges, and jumps", "Over 15 kilometres"],
    answer: 2,
    explanation: "Studies tracking elite players show up to 6 km of high-intensity movement per match — far more intense distance than tennis."
  }
];

// Active subset of questions based on mode/category
let activeQuizQuestions = [...ALL_QUIZ_QUESTIONS];
let currentQuizCategory = 'all';

let quizState = {
  current: 0,
  score: 0,
  answered: false,
  wrongAnswers: []
};

function setQuizCategory(category) {
  currentQuizCategory = category;

  // Update button active state
  const buttons = document.querySelectorAll('.quiz-mode-btn');
  buttons.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    if (onclickAttr.includes(`'${category}'`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (category === 'all') {
    activeQuizQuestions = [...ALL_QUIZ_QUESTIONS];
  } else if (category === 'random10') {
    activeQuizQuestions = [...ALL_QUIZ_QUESTIONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
  } else {
    activeQuizQuestions = ALL_QUIZ_QUESTIONS.filter(q => q.category === category);
  }

  quizInit();
}

function quizInit() {
  quizState = { current: 0, score: 0, answered: false, wrongAnswers: [] };
  const resultsEl = document.getElementById('quiz-results');
  const cardEl = document.getElementById('quiz-card');
  if (resultsEl) resultsEl.style.display = 'none';
  if (cardEl) cardEl.style.display = 'block';
  quizRender();
}

function quizRender() {
  if (!activeQuizQuestions || activeQuizQuestions.length === 0) return;

  const q = activeQuizQuestions[quizState.current];
  const total = activeQuizQuestions.length;

  // Progress bar
  const progressBar = document.getElementById('quiz-progress-bar');
  const counter = document.getElementById('quiz-counter');
  const scoreLabel = document.getElementById('quiz-score-label');

  if (progressBar) {
    progressBar.style.width = ((quizState.current / total) * 100) + '%';
  }
  if (counter) {
    counter.textContent = `Question ${quizState.current + 1} of ${total}`;
  }
  if (scoreLabel) {
    scoreLabel.textContent = `Score: ${quizState.score}`;
  }

  const catEl = document.getElementById('quiz-category');
  const questionEl = document.getElementById('quiz-question');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (catEl) {
    const categoryLabels = {
      'Shots': '🏸 Shots & Techniques',
      'Rules': '📜 Rules & Faults',
      'Scoring': '🔢 Scoring & Service',
      'Court': '🏟️ Court & Equipment',
      'History': '🏆 History & Strategy'
    };
    catEl.textContent = categoryLabels[q.category] || q.category;
  }
  if (questionEl) questionEl.textContent = q.question;
  if (feedbackEl) feedbackEl.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';

  quizState.answered = false;

  // Build option buttons
  const optionsEl = document.getElementById('quiz-options');
  if (optionsEl) {
    optionsEl.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.onclick = () => quizAnswer(i);
      optionsEl.appendChild(btn);
    });
  }
}

function quizAnswer(selectedIndex) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = activeQuizQuestions[quizState.current];
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
  if (feedback) {
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback ' + (correct ? 'feedback-correct' : 'feedback-wrong');
    feedback.innerHTML = (correct ? '✅ <strong>Correct!</strong> ' : '❌ <strong>Wrong!</strong> ') + q.explanation;
  }

  // Update score label immediately
  const scoreLabel = document.getElementById('quiz-score-label');
  if (scoreLabel) {
    scoreLabel.textContent = `Score: ${quizState.score}`;
  }

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'inline-block';
    const isLast = quizState.current === activeQuizQuestions.length - 1;
    nextBtn.textContent = isLast ? '🏁 View Final Results' : 'Next Question →';
  }
}

function quizNext() {
  if (quizState.current < activeQuizQuestions.length - 1) {
    quizState.current++;
    quizRender();
  } else {
    quizShowResults();
  }
}

function quizShowResults() {
  const cardEl = document.getElementById('quiz-card');
  const resultsEl = document.getElementById('quiz-results');
  const progressBar = document.getElementById('quiz-progress-bar');

  if (cardEl) cardEl.style.display = 'none';
  if (resultsEl) resultsEl.style.display = 'block';
  if (progressBar) progressBar.style.width = '100%';

  const score = quizState.score;
  const total = activeQuizQuestions.length;
  const percentage = Math.round((score / total) * 100);

  const finalScoreEl = document.getElementById('quiz-final-score');
  if (finalScoreEl) {
    finalScoreEl.textContent = `${score} / ${total} (${percentage}%)`;
  }

  let emoji, title, desc;
  if (percentage === 100) {
    emoji = '🏆'; title = 'Flawless Master!'; desc = 'You scored 100%! You have Olympic-level badminton knowledge!';
  } else if (percentage >= 80) {
    emoji = '🥇'; title = 'Outstanding Champion!'; desc = 'Exceptional badminton knowledge. You truly know the sport inside out!';
  } else if (percentage >= 60) {
    emoji = '🥈'; title = 'Solid Performer!'; desc = 'Great job! You know the core rules and tactics very well.';
  } else if (percentage >= 40) {
    emoji = '🥉'; title = 'Club Competitor!'; desc = 'A decent effort! Review the court and shots guides to push higher.';
  } else {
    emoji = '🏸'; title = 'Keep Practicing!'; desc = 'Read through the guide above and try again — you will get better every round!';
  }

  const emojiEl = document.getElementById('quiz-result-emoji');
  const titleEl = document.getElementById('quiz-result-title');
  const descEl = document.getElementById('quiz-result-desc');

  if (emojiEl) emojiEl.textContent = emoji;
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;

  const breakdown = document.getElementById('quiz-result-breakdown');
  if (breakdown) {
    if (quizState.wrongAnswers.length > 0) {
      breakdown.innerHTML = `<p class="breakdown-title">Review the ${quizState.wrongAnswers.length} question(s) you missed:</p>` +
        quizState.wrongAnswers.map(w =>
          `<div class="breakdown-item">❌ <strong>${w.q}</strong><br><span class="breakdown-correct">✅ Correct: ${w.correct}</span></div>`
        ).join('');
    } else {
      breakdown.innerHTML = '<p class="breakdown-title">🎯 Perfect run! You did not miss a single question!</p>';
    }
  }
}

function quizRestart() {
  quizInit();
}

// Initialise quiz on load
quizInit();
