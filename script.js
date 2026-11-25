// ==========================================================================
// SmashPoint - Comprehensive Badminton Platform & Synchronized Multi-Language Engine
// ==========================================================================

let currentLanguage = 'en';
let currentCourtMode = 'singles';
let currentShotIndex = 0;

// --------------------------------------------------------------------------
// 1. COURT RULES DATA (4 Languages)
// --------------------------------------------------------------------------
const COURT_RULES = {
  en: {
    singles: {
      title: "Singles Play: Long & Narrow Court",
      desc: "In singles, the court uses the <strong>inner sidelines</strong> and the <strong>back boundary line</strong>. The side alleys (highlighted in red) are out of bounds for both serving and rallies.",
      bullets: `
        <li><strong>Side Tramlines:</strong> Always OUT during serving and rallies.</li>
        <li><strong>Back Tramline:</strong> IN bounds for both service and general play.</li>
        <li><strong>Service Courts:</strong> Must cross the short service line and land in the diagonally opposite service box.</li>
        <li><strong>Serving Position:</strong> Serve from the Right box when your score is Even (0, 2, 4...), and from the Left box when your score is Odd (1, 3, 5...).</li>
      `
    },
    doubles: {
      title: "Doubles Play: Short & Wide Service, Full Court Rally",
      desc: "In doubles, the court uses the <strong>outer sidelines</strong> for all rally play. However, on the serve, the <strong>rear tramline is OUT</strong> (making the service box short and wide).",
      bullets: `
        <li><strong>Service Bounds:</strong> Wide (outer sideline is IN) but Short (back tramline is OUT on serve).</li>
        <li><strong>Rally Bounds:</strong> Once the serve is returned, the entire full court including all tramlines is IN.</li>
        <li><strong>Service Rotation:</strong> The serving team only switches service courts when they score a point on their own serve.</li>
        <li><strong>Receiving:</strong> Only the diagonally designated receiver may return the serve.</li>
      `
    }
  },
  vi: {
    singles: {
      title: "Đánh Đơn: Sân Dài & Hẹp",
      desc: "Trong đánh đơn, sân sử dụng <strong>vạch biên bên trong</strong> và <strong>vạch đáy ngoài cùng</strong>. Hai hành lang bên (màu đỏ) là ngoài sân cho cả phát cầu và đánh bóng.",
      bullets: `
        <li><strong>Vạch biên bên:</strong> Luôn NGOÀI SÂN trong cả giao cầu và các pha giằng co.</li>
        <li><strong>Vạch đáy sau:</strong> HỢP LỆ (trong sân) trong cả giao cầu và thi đấu.</li>
        <li><strong>Ô giao cầu:</strong> Cầu phải vượt qua vạch giao cầu ngắn và rơi vào ô chéo đối diện.</li>
        <li><strong>Vị trí giao cầu:</strong> Giao từ ô Phải khi điểm Chẵn (0, 2, 4...), ô Trái khi điểm Lẻ (1, 3, 5...).</li>
      `
    },
    doubles: {
      title: "Đánh Đôi: Giao Cầu Ngắn & Rộng, Thi Đấu Toàn Sân",
      desc: "Trong đánh đôi, khi thi đấu dùng <strong>vạch biên ngoài cùng</strong>. Tuy nhiên khi giao cầu, <strong>vạch đáy phía sau là NGOÀI SÂN</strong> (khiến ô giao cầu rộng và ngắn hơn).",
      bullets: `
        <li><strong>Giới hạn giao cầu:</strong> Rộng (vạch biên ngoài tính vào) nhưng Ngắn (vạch đáy ngoài là hỏng).</li>
        <li><strong>Giới hạn hiệp đấu:</strong> Sau khi đỡ giao cầu xong, toàn bộ sân và các hành lang đều HỢP LỆ.</li>
        <li><strong>Đổi vị trí giao cầu:</strong> Đội giao cầu chỉ đổi ô khi tự ghi điểm trong lượt giao cầu của mình.</li>
        <li><strong>Quyền nhận giao cầu:</strong> Chỉ người nhận cầu đứng ở ô chéo đối diện mới được phép đánh trả quả giao cầu.</li>
      `
    }
  },
  zh: {
    singles: {
      title: "单打比赛: 长而窄的球场",
      desc: "单打比赛中，场地使用<strong>内侧边线</strong>和<strong>底线外边线</strong>。两侧边线走廊（红色高亮）在发球和拉锯回合中均为界外。",
      bullets: `
        <li><strong>两侧单打边线:</strong> 发球与比赛对攻期间始终为界外 (OUT)。</li>
        <li><strong>后场底线:</strong> 在发球和对拉中均为界内 (IN)。</li>
        <li><strong>接发球区域:</strong> 发球必须过前发球线并落在斜对角发球区内。</li>
        <li><strong>发球站位:</strong> 得分为偶数 (0, 2, 4...) 在右区发球；得分为奇数 (1, 3, 5...) 在左区发球。</li>
      `
    },
    doubles: {
      title: "双打比赛: 短而宽的发球区，全场拉锯",
      desc: "双打比赛中，全场拉锯使用<strong>最外侧边线</strong>。但接发球时<strong>后发球线为界外</strong>（发球区变宽且变短）。",
      bullets: `
        <li><strong>发球界限:</strong> 宽（外侧边线为界内）但短（后外底线为发球出界）。</li>
        <li><strong>对拉界限:</strong> 只要接发球完成，全场包含所有边线走廊均为界内。</li>
        <li><strong>发球轮转:</strong> 仅在发球方连续得分时，发球人员才在左右半区轮换。</li>
        <li><strong>接发球限制:</strong> 仅斜对角指定接发球员可以回击发球。</li>
      `
    }
  },
  id: {
    singles: {
      title: "Permainan Tunggal: Lapangan Panjang & Sempit",
      desc: "Pada nomor tunggal, lapangan menggunakan <strong>garis samping dalam</strong> dan <strong>garis belakang luar</strong>. Jalur samping (warna merah) adalah KELUAR untuk servis dan reli.",
      bullets: `
        <li><strong>Garis Samping:</strong> Selalu KELUAR (OUT) saat servis dan selama reli.</li>
        <li><strong>Garis Belakang Luar:</strong> MASUK (IN) untuk servis maupun permainan reli.</li>
        <li><strong>Kotak Servis:</strong> Harus melewati garis servis pendek dan mendarat di kotak diagonal lawan.</li>
        <li><strong>Posisi Servis:</strong> Lakukan servis dari kotak Kanan jika poin Genap (0, 2, 4...), dan dari kotak Kiri jika poin Ganjil (1, 3, 5...).</li>
      `
    },
    doubles: {
      title: "Permainan Ganda: Servis Pendek & Lebar, Reli Penuh",
      desc: "Pada nomor ganda, reli menggunakan <strong>garis samping terluar</strong>. Namun saat servis, <strong>garis belakang luar adalah KELUAR</strong> (kotak servis menjadi pendek dan lebar).",
      bullets: `
        <li><strong>Batas Servis:</strong> Lebar (garis samping luar MASUK) tetapi Pendek (garis belakang luar KELUAR pada servis).</li>
        <li><strong>Batas Reli:</strong> Setelah pengembalian servis, seluruh lapangan termasuk semua garis adalah MASUK.</li>
        <li><strong>Rotasi Servis:</strong> Tim yang memegang servis hanya bertukar sisi ketika mereka mencetak poin dari servis sendiri.</li>
        <li><strong>Penerima Servis:</strong> Hanya pemain di kotak diagonal yang berhak mengembalikan pukulan servis.</li>
      `
    }
  }
};

const courtSvg = document.getElementById('badminton-court');
const btnSingles = document.getElementById('btn-singles');
const btnDoubles = document.getElementById('btn-doubles');
const modeTitle = document.getElementById('mode-title');
const modeDesc = document.getElementById('mode-desc');
const modeBullets = document.getElementById('mode-bullets');

function setCourtMode(mode) {
  currentCourtMode = mode;
  if (!modeTitle || !modeDesc || !modeBullets) return;

  const rule = (COURT_RULES[currentLanguage] || COURT_RULES.en)[mode];

  if (mode === 'singles') {
    if (courtSvg) courtSvg.className.baseVal = 'court-svg mode-singles';
    if (btnSingles) btnSingles.classList.add('active');
    if (btnDoubles) btnDoubles.classList.remove('active');
  } else {
    if (courtSvg) courtSvg.className.baseVal = 'court-svg mode-doubles';
    if (btnDoubles) btnDoubles.classList.add('active');
    if (btnSingles) btnSingles.classList.remove('active');
  }

  modeTitle.textContent = rule.title;
  modeDesc.innerHTML = rule.desc;
  modeBullets.innerHTML = rule.bullets;
}


// --------------------------------------------------------------------------
// 2. SHOT DATA & DETAILS (4 Languages)
// --------------------------------------------------------------------------
const SHOT_DETAILS = {
  en: [
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
  ],
  vi: [
    {
      tag: "Đòn Tấn Công Uy Lực",
      title: "Cú Đập Cầu Thuận Tay (Forehand Smash)",
      body: "Đòn tấn công kết liễu số 1 trong cầu lông. Được thực hiện từ cuối sân với quỹ đạo cắm dốc thẳng xuống sàn đấu đối phương. Kỹ thuật cốt lõi đòi hỏi nâng cao cùi chỏ, xoay cẳng tay phát lực bộc phát và tiếp xúc cầu ở điểm cao nhất phía trước trán.",
      tip: "Góc cắm hiểm hóc quan trọng hơn lực cơ bắp thuần túy. Một cú đập cắm sát vạch biên hoặc hướng thẳng vào hông cầm vợt của đối thủ khó chống đỡ hơn nhiều so với cú đập bay ngang."
    },
    {
      tag: "Đòn Chiến Thuật & Đánh Lừa",
      title: "Cú Bỏ Nhỏ / Chém Cầu (Drop Shot)",
      body: "Được ngụy trang bằng động tác mở vợt giống hệt cú đập hoặc phông cầu, nhưng mặt vợt miết nhẹ giảm tốc vào thời khắc chạm cầu để quả cầu rơi sát mép lưới bên phần sân đối phương.",
      tip: "Giữ động tác vung vợt ban đầu y hệt cú đập cho đến phần nghìn giây cuối cùng. Yếu tố bất ngờ sẽ khiến đối phương bị vặn sườn và để lộ khoảng trống lớn ở đáy sân."
    },
    {
      tag: "Đòn Phòng Thủ & Giãn Nhịp",
      title: "Cú Phông Cầu / Lốp Cầu (Overhead Clear)",
      body: "Cú đánh bổng và sâu đưa quả cầu bay cao vút về tận vạch đáy cuối sân đối thủ. Dùng để tái lập thế cân bằng, câu giờ hồi phục vị trí trung tâm, hoặc phản công khi đối phương dâng lưới quá sớm.",
      tip: "Hãy đảm bảo quả phông cầu chạm sát vạch đáy. Một quả phông lửng giữa sân sẽ dâng tặng đối phương cơ hội đập cầu ghi điểm dễ dàng."
    },
    {
      tag: "Đòn Kết Liễu Trên Lưới",
      title: "Cú Vồ Cầu / Đập Lưới (Net Kill)",
      body: "Được tung ra khi đối phương trả cầu cao hơn mép lưới. Thay vì vung vợt hết biên độ, người chơi sử dụng lực búng cổ tay dứt khoát để đè cầu cắm thẳng xuống phần sân trước.",
      tip: "Tuyệt đối không để vợt hoặc thân người chạm lưới (lỗi phạm quy). Động tác vung vợt phải ngắn và gọn như một nhát quét nhanh."
    },
    {
      tag: "Pha Đổi Đòn Tốc Độ Cao",
      title: "Cú Tạt Cầu / Bạt Cầu (Drive)",
      body: "Cú đánh ngang bằng, tốc độ cực nhanh lướt sát ngay mép băng lưới. Vũ khí tối thượng trong đánh đôi để giành quyền kiểm soát thế chủ động mà không bị ép phải lốp bổng cầu lên.",
      tip: "Hạ thấp trọng tâm với tư thế đứng rộng chân, giữ mặt vợt luôn ở phía trước ngực và dùng lực cổ tay đẩy bóng tức thì."
    }
  ],
  zh: [
    {
      tag: "核心进攻利刃",
      title: "正手扣杀 (Forehand Smash)",
      body: "羽毛球比赛中最具杀伤力的得分手法。从后场起跳发力，以垂直陡峭的下压轨迹击球，力求一击制胜。技术要领为高肘引拍、前臂内旋鞭打发力并在身前最高点击球。",
      tip: "角度优于蛮力。一记落点精准贴边线或直追对手持拍侧髋部的深角度扣杀，比单纯高速平飞的重杀更加难以防守。"
    },
    {
      tag: "战术与假动作",
      title: "网前吊球 / 劈吊 (Drop Shot)",
      body: "引拍动作与高远球或扣杀高度一致，但在触球瞬间通过切削或减速减力，让羽毛球擦网垂直下落至对手前场发球区网口边缘。",
      tip: "在最后0.01秒前保持与扣杀相同的起拍姿态。极致的欺骗性将破坏对手重心，撕开后场防守大门。"
    },
    {
      tag: "防守调控与重置",
      title: "高远球 (Overhead Clear)",
      body: "又高又深地将球击回对手后场底线。在防守端用于争取回位时间并重置拉锯节奏；在进攻端可利用平高球快速压制站位过分靠前的对手。",
      tip: "必须确保高远球精准飞落到后场双打底线附近。半场不到位的出球相当于直接给对手送去绝杀机会。"
    },
    {
      tag: "网前闪电制胜",
      title: "扑球 / 封网 (Net Kill)",
      body: "当对手回球高于球网白边时施展。无需大幅度挥拍，仅靠短促有力的手腕闪动将球直接下压钉死在对手前场地面。",
      tip: "切勿触网（违例）。挥拍动作必须紧凑如刷子横抹，严禁像网球截击那样过度向前推送。"
    },
    {
      tag: "高速平抽对攻",
      title: "平抽球 (Drive)",
      body: "贴着球网白边高速水平穿透对方半场的中场平抽。是双打对决中抢夺下压主导权、避免被动起高球的关键杀招。",
      tip: "屈膝降低身体重心，拍头随时架在胸前，通过短促的前臂推挡在快节奏对攻中压制对手。"
    }
  ],
  id: [
    {
      tag: "Pukulan Serang Mematikan",
      title: "Smash Keras (Forehand Smash)",
      body: "Senjata serangan pamungkas dalam bulutangkis. Ditembakkan dari garis belakang dengan lintasan tajam menukik ke lantai lapangan lawan. Kunci mekaniknya meliputi siku tinggi, pronasi lengan cepat, dan kontak tepat di depan kepala.",
      tip: "Ketajaman sudut mengalahkan tenaga murni. Smash menukik tepat di garis tepi atau pinggul raket lawan jauh lebih sulit dikembalikan daripada smash kencang tetapi datar."
    },
    {
      tag: "Pukulan Tipuan Taktis",
      title: "Dropshot Halus (Drop Shot)",
      body: "Disamarkan dengan ayunan yang identik dengan smash atau lob tinggi, namun pada kontak terakhir kepala raket diiris atau diperlambat sehingga kok meluncur tipis di atas net.",
      tip: "Pertahankan persiapan yang sama persis dengan smash hingga pecahan detik terakhir. Kejutan ini akan merusak keseimbangan lawan dan membuka lapangan belakang."
    },
    {
      tag: "Pukulan Bertahan & Pengatur Tempo",
      title: "Pukulan Lob Tinggi (Overhead Clear)",
      body: "Pukulan tinggi dan jauh yang mengarah lurus ke garis batas belakang lawan. Berguna untuk memulihkan posisi bertengger di tengah lapangan dan mengatur ulang ritme reli.",
      tip: "Pastikan lob mencapai garis belakang. Pengembalian tanggung di tengah lapangan akan memberi lawan smash yang mudah."
    },
    {
      tag: "Pukulan Sambaran Depan Net",
      title: "Sambaran Net / Net Kill",
      body: "Dilakukan saat pengembalian lawan bergulir naik di atas pita net. Tanpa ayunan penuh, gunakan sentakan pergelangan tangan yang ringkas untuk menyambar kok lurus ke lantai lawan.",
      tip: "Jangan pernah menyentuh net dengan raket atau badan (fault). Ayunkan raket secara ringkas seperti gerakan menyapu cepat."
    },
    {
      tag: "Reli Mendatar Cepat",
      title: "Pukulan Drive Cepat",
      body: "Pukulan mendatar yang meluncur cepat tepat menyisir pita net. Sangat krusial dalam ganda untuk merebut inisiatif serangan tanpa melambungkan kok.",
      tip: "Tetap rendah dengan kuda-kuda lebar, pertahankan kepala raket di depan dada, dan andalkan dorongan lengan bawah yang sigap."
    }
  ]
};

const shotCards = document.querySelectorAll('.shot-card');
const detailTag = document.getElementById('detail-tag');
const detailTitle = document.getElementById('detail-title');
const detailBody = document.getElementById('detail-body');
const detailTipText = document.getElementById('detail-tip-text');

function selectShot(index) {
  currentShotIndex = index;
  shotCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });

  const list = SHOT_DETAILS[currentLanguage] || SHOT_DETAILS.en;
  const shot = list[index] || list[0];

  if (detailTag) detailTag.textContent = shot.tag;
  if (detailTitle) detailTitle.textContent = shot.title;
  if (detailBody) detailBody.textContent = shot.body;
  if (detailTipText) detailTipText.textContent = shot.tip;
}


// --------------------------------------------------------------------------
// 3. LIVE MATCH SCOREBOARD (4 Languages)
// --------------------------------------------------------------------------
let scoreA = 0;
let scoreB = 0;
let currentServer = 'a';
let matchOver = false;

const SCORE_MESSAGES = {
  en: {
    servingBadge: "🏸 Serving",
    rightSide: "Right",
    leftSide: "Left",
    serverHint: (name, side) => `Server: ${name} (${side} court)`,
    gameOver: (winner, sA, sB) => `🏆 <strong>Game Over!</strong> ${winner} wins with ${sA} - ${sB}! Click Reset to play again.`,
    gamePoint: "🔥 <strong>Game Point!</strong> Next point could decide the game.",
    deuce: (sA, sB) => `⚔️ <strong>Deuce (${sA}-${sB})!</strong> Must lead by 2 points to win (max 30).`,
    inProgress: "First to 21 points (lead by 2, capped at 30). Every rally awards a point."
  },
  vi: {
    servingBadge: "🏸 Giao cầu",
    rightSide: "Phải",
    leftSide: "Trái",
    serverHint: (name, side) => `Giao cầu: ${name} (Ô bên ${side})`,
    gameOver: (winner, sA, sB) => `🏆 <strong>Kết thúc hiệp đấu!</strong> ${winner} chiến thắng với tỉ số ${sA} - ${sB}! Nhấn Thiết lập lại để chơi lại.`,
    gamePoint: "🔥 <strong>Điểm quyết định (Game Point)!</strong> Điểm tiếp theo có thể định đoạt ván đấu.",
    deuce: (sA, sB) => `⚔️ <strong>Hòa điểm (Deuce ${sA}-${sB})!</strong> Cần dẫn trước 2 điểm để thắng (tối đa 30 điểm).`,
    inProgress: "Chạm 21 điểm trước (dẫn 2 điểm, tối đa 30 điểm). Mỗi pha cầu đều có điểm."
  },
  zh: {
    servingBadge: "🏸 发球方",
    rightSide: "右发球",
    leftSide: "左发球",
    serverHint: (name, side) => `发球方: ${name} (${side}区)`,
    gameOver: (winner, sA, sB) => `🏆 <strong>比赛结束!</strong> ${winner} 以 ${sA} - ${sB} 胜出! 点击重置重新开始。`,
    gamePoint: "🔥 <strong>局点 (Game Point)!</strong> 下一分即可锁定胜局。",
    deuce: (sA, sB) => `⚔️ <strong>追平加分 (Deuce ${sA}-${sB})!</strong> 需领先2分方可获胜 (上限30分)。`,
    inProgress: "21分落地得分制 (领先2分胜出，上限30分)。每球得分。"
  },
  id: {
    servingBadge: "🏸 Servis",
    rightSide: "Kanan",
    leftSide: "Kiri",
    serverHint: (name, side) => `Servis: ${name} (Kotak ${side})`,
    gameOver: (winner, sA, sB) => `🏆 <strong>Pertandingan Selesai!</strong> ${winner} menang dengan skor ${sA} - ${sB}! Klik Reset untuk main lagi.`,
    gamePoint: "🔥 <strong>Game Point!</strong> Poin berikutnya dapat menentukan pemenang.",
    deuce: (sA, sB) => `⚔️ <strong>Deuce (${sA}-${sB})!</strong> Harus unggul 2 poin untuk menang (maksimal 30).`,
    inProgress: "Pertama mencapai 21 poin (selisih 2, batas 30). Setiap reli menghasilkan poin."
  }
};

const displayA = document.getElementById('score-a');
const displayB = document.getElementById('score-b');
const serveA = document.getElementById('serve-a');
const serveB = document.getElementById('serve-b');
const serviceHint = document.getElementById('service-hint');
const matchStatus = document.getElementById('match-status');
const nameA = document.getElementById('name-a');
const nameB = document.getElementById('name-b');

function updateScoreboard() {
  if (!displayA || !displayB) return;
  displayA.textContent = scoreA;
  displayB.textContent = scoreB;

  const msgs = SCORE_MESSAGES[currentLanguage] || SCORE_MESSAGES.en;
  const serverScore = currentServer === 'a' ? scoreA : scoreB;
  const courtSide = (serverScore % 2 === 0) ? msgs.rightSide : msgs.leftSide;
  const serverName = currentServer === 'a' ? nameA.textContent : nameB.textContent;

  if (currentServer === 'a') {
    if (serveA) serveA.textContent = msgs.servingBadge;
    if (serveB) serveB.textContent = "";
  } else {
    if (serveA) serveA.textContent = "";
    if (serveB) serveB.textContent = msgs.servingBadge;
  }

  if (serviceHint) {
    serviceHint.textContent = msgs.serverHint(serverName, courtSide);
  }

  const diff = Math.abs(scoreA - scoreB);
  const maxScore = Math.max(scoreA, scoreB);

  if (!matchStatus) return;

  if ((maxScore >= 21 && diff >= 2) || maxScore === 30) {
    matchOver = true;
    const winner = scoreA > scoreB ? nameA.textContent : nameB.textContent;
    matchStatus.innerHTML = msgs.gameOver(winner, scoreA, scoreB);
    matchStatus.style.color = "#34d399";
  } else if (maxScore >= 20 && diff === 1) {
    matchStatus.innerHTML = msgs.gamePoint;
    matchStatus.style.color = "#fbbf24";
  } else if (scoreA >= 20 && scoreB >= 20) {
    matchStatus.innerHTML = msgs.deuce(scoreA, scoreB);
    matchStatus.style.color = "#f87171";
  } else {
    matchStatus.textContent = msgs.inProgress;
    matchStatus.style.color = "var(--text-muted)";
  }
}

function addPoint(team, change) {
  if (matchOver && change > 0) return;
  if (team === 'a') {
    scoreA = Math.max(0, Math.min(30, scoreA + change));
    if (change > 0) currentServer = 'a';
  } else {
    scoreB = Math.max(0, Math.min(30, scoreB + change));
    if (change > 0) currentServer = 'b';
  }
  if (matchOver && change < 0) matchOver = false;
  updateScoreboard();
}

function resetScores() {
  scoreA = 0;
  scoreB = 0;
  currentServer = 'a';
  matchOver = false;
  updateScoreboard();
}


// --------------------------------------------------------------------------
// 4. THE 50-QUESTION BADMINTON MASTER QUIZ
// --------------------------------------------------------------------------

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

const QUIZ_I18N = {
  en: {
    counter: (c, t) => `Question ${c} of ${t}`,
    score: (s) => `Score: ${s}`,
    correct: "✅ <strong>Correct!</strong> ",
    wrong: "❌ <strong>Wrong!</strong> ",
    next: "Next Question →",
    finish: "🏁 View Final Results",
    res_100: { title: "Flawless Master!", desc: "You scored 100%! You have Olympic-level badminton knowledge!" },
    res_80: { title: "Outstanding Champion!", desc: "Exceptional badminton knowledge. You truly know the sport inside out!" },
    res_60: { title: "Solid Performer!", desc: "Great job! You know the core rules and tactics very well." },
    res_40: { title: "Club Competitor!", desc: "A decent effort! Review the court and shots guides to push higher." },
    res_0: { title: "Keep Practicing!", desc: "Read through the guide above and try again — you will get better every round!" },
    perfectRun: "🎯 Perfect run! You did not miss a single question!",
    missedTitle: (n) => `Review the ${n} question(s) you missed:`
  },
  vi: {
    counter: (c, t) => `Câu hỏi ${c} / ${t}`,
    score: (s) => `Điểm số: ${s}`,
    correct: "✅ <strong>Chính xác!</strong> ",
    wrong: "❌ <strong>Chưa đúng!</strong> ",
    next: "Câu tiếp theo →",
    finish: "🏁 Xem kết quả chung cuộc",
    res_100: { title: "Bậc Thầy Hoàn Hảo!", desc: "Bạn đạt 100% điểm số! Kiến thức cầu lông đạt chuẩn Thế vận hội Olympic!" },
    res_80: { title: "Nhà Vô Địch Xuất Sắc!", desc: "Kiến thức cầu lông tuyệt vời. Bạn thực sự am hiểu tường tận môn thể thao này!" },
    res_60: { title: "Tay Vợt Cừ Khôi!", desc: "Làm tốt lắm! Bạn nắm rất vững các kỹ thuật và luật thi đấu cốt lõi." },
    res_40: { title: "Người Chơi Phong Trào!", desc: "Nỗ lực đáng khen! Hãy xem lại sơ đồ sân và hướng dẫn kỹ thuật để bứt phá hơn." },
    res_0: { title: "Tiếp Tục Rèn Luyện!", desc: "Đọc kỹ cẩm nang phía trên và thử lại nhé — bạn sẽ tiến bộ qua từng lượt chơi!" },
    perfectRun: "🎯 Tuyệt đối xuất sắc! Bạn không trả lời sai bất kỳ câu hỏi nào!",
    missedTitle: (n) => `Xem lại ${n} câu hỏi bạn đã trả lời chưa chính xác:`
  },
  zh: {
    counter: (c, t) => `第 ${c} 题 / 共 ${t} 题`,
    score: (s) => `当前得分: ${s}`,
    correct: "✅ <strong>回答正确!</strong> ",
    wrong: "❌ <strong>回答错误!</strong> ",
    next: "下一题 →",
    finish: "🏁 查看最终成绩",
    res_100: { title: "全能羽球大师!", desc: "荣获满分 100%! 你拥有奥运级别的羽毛球全能知识!" },
    res_80: { title: "顶尖冠军水准!", desc: "出类拔萃的羽球知识储备，对这项运动的各个细节洞若观火!" },
    res_60: { title: "实力悍将!", desc: "表现出色! 你已牢固掌握羽毛球核心规则与实战手法。" },
    res_40: { title: "俱乐部好手!", desc: "不错的尝试! 复习场地规则与技术手法指南即可更上层楼。" },
    res_0: { title: "继续加油练习!", desc: "仔细阅读上方百科内容后再次挑战 — 每一次练习都会让你更强!" },
    perfectRun: "🎯 完美通关! 全程未失一分，完全无懈可击!",
    missedTitle: (n) => `复盘错题 (${n} 道题):`
  },
  id: {
    counter: (c, t) => `Soal ${c} dari ${t}`,
    score: (s) => `Skor: ${s}`,
    correct: "✅ <strong>Benar!</strong> ",
    wrong: "❌ <strong>Salah!</strong> ",
    next: "Soal Berikutnya →",
    finish: "🏁 Lihat Hasil Akhir",
    res_100: { title: "Master Sempurna!", desc: "Skor 100%! Pengetahuan bulutangkis Anda setara level Olimpiade!" },
    res_80: { title: "Juara Luar Biasa!", desc: "Wawasan bulutangkis yang luar biasa. Anda sangat memahami olahraga ini!" },
    res_60: { title: "Pemain Solid!", desc: "Kerja bagus! Anda menguasai aturan dan strategi dasar dengan sangat baik." },
    res_40: { title: "Kompetitor Klub!", desc: "Upaya yang bagus! Pelajari kembali panduan lapangan dan pukulan untuk skor lebih tinggi." },
    res_0: { title: "Terus Berlatih!", desc: "Baca panduan di atas dan coba lagi — Anda pasti akan berkembang di setiap putaran!" },
    perfectRun: "🎯 Sempurna! Anda tidak melewatkan satu pertanyaan pun!",
    missedTitle: (n) => `Tinjau kembali ${n} pertanyaan yang salah:`
  }
};

function setQuizCategory(category) {
  currentQuizCategory = category;
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
  const i18n = QUIZ_I18N[currentLanguage] || QUIZ_I18N.en;

  const progressBar = document.getElementById('quiz-progress-bar');
  const counter = document.getElementById('quiz-counter');
  const scoreLabel = document.getElementById('quiz-score-label');

  if (progressBar) progressBar.style.width = ((quizState.current / total) * 100) + '%';
  if (counter) counter.textContent = i18n.counter(quizState.current + 1, total);
  if (scoreLabel) scoreLabel.textContent = i18n.score(quizState.score);

  const catEl = document.getElementById('quiz-category');
  const questionEl = document.getElementById('quiz-question');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (catEl) {
    const catLabels = {
      en: { 'Shots': '🏸 Shots & Techniques', 'Rules': '📜 Rules & Faults', 'Scoring': '🔢 Scoring & Service', 'Court': '🏟️ Court & Equipment', 'History': '⭐ History & Strategy' },
      vi: { 'Shots': '🏸 Kỹ thuật đánh cầu', 'Rules': '📜 Luật chơi & Lỗi cầu', 'Scoring': '🔢 Tính điểm & Giao cầu', 'Court': '🏟️ Sân bãi & Dụng cụ', 'History': '⭐ Lịch sử & Kỷ lục' },
      zh: { 'Shots': '🏸 核心击球手法', 'Rules': '📜 比赛规则与犯规', 'Scoring': '🔢 计分与发球法', 'Court': '🏟️ 场地尺寸与装备', 'History': '⭐ 历史典故与战术' },
      id: { 'Shots': '🏸 Teknik Pukulan', 'Rules': '📜 Aturan & Pelanggaran', 'Scoring': '🔢 Skor & Servis', 'Court': '🏟️ Lapangan & Alat', 'History': '⭐ Sejarah & Strategi' }
    };
    const currentDict = catLabels[currentLanguage] || catLabels.en;
    catEl.textContent = currentDict[q.category] || q.category;
  }

  if (questionEl) questionEl.textContent = q.question;
  if (feedbackEl) feedbackEl.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';

  quizState.answered = false;

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
  const i18n = QUIZ_I18N[currentLanguage] || QUIZ_I18N.en;

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
    feedback.innerHTML = (correct ? i18n.correct : i18n.wrong) + q.explanation;
  }

  const scoreLabel = document.getElementById('quiz-score-label');
  if (scoreLabel) scoreLabel.textContent = i18n.score(quizState.score);

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'inline-block';
    const isLast = quizState.current === activeQuizQuestions.length - 1;
    nextBtn.textContent = isLast ? i18n.finish : i18n.next;
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
  const i18n = QUIZ_I18N[currentLanguage] || QUIZ_I18N.en;

  if (cardEl) cardEl.style.display = 'none';
  if (resultsEl) resultsEl.style.display = 'block';
  if (progressBar) progressBar.style.width = '100%';

  const score = quizState.score;
  const total = activeQuizQuestions.length;
  const percentage = Math.round((score / total) * 100);

  const finalScoreEl = document.getElementById('quiz-final-score');
  if (finalScoreEl) finalScoreEl.textContent = `${score} / ${total} (${percentage}%)`;

  let info;
  let emoji = '🏆';
  if (percentage === 100) { emoji = '🏆'; info = i18n.res_100; }
  else if (percentage >= 80) { emoji = '🥇'; info = i18n.res_80; }
  else if (percentage >= 60) { emoji = '🥈'; info = i18n.res_60; }
  else if (percentage >= 40) { emoji = '🥉'; info = i18n.res_40; }
  else { emoji = '🏸'; info = i18n.res_0; }

  const emojiEl = document.getElementById('quiz-result-emoji');
  const titleEl = document.getElementById('quiz-result-title');
  const descEl = document.getElementById('quiz-result-desc');

  if (emojiEl) emojiEl.textContent = emoji;
  if (titleEl) titleEl.textContent = info.title;
  if (descEl) descEl.textContent = info.desc;

  const breakdown = document.getElementById('quiz-result-breakdown');
  if (breakdown) {
    if (quizState.wrongAnswers.length > 0) {
      breakdown.innerHTML = `<p class="breakdown-title">${i18n.missedTitle(quizState.wrongAnswers.length)}</p>` +
        quizState.wrongAnswers.map(w =>
          `<div class="breakdown-item">❌ <strong>${w.q}</strong><br><span class="breakdown-correct">✅ Correct: ${w.correct}</span></div>`
        ).join('');
    } else {
      breakdown.innerHTML = `<p class="breakdown-title">${i18n.perfectRun}</p>`;
    }
  }
}

function quizRestart() {
  quizInit();
}


// --------------------------------------------------------------------------
// 5. BWF ANTHEM PLAYER (4 Languages)
// --------------------------------------------------------------------------
let bwfAudioMode = 'none';
let bwfPlaying = false;
let ytPlayer = null;
let userHasInteracted = false;

const BWF_MUSIC_I18N = {
  en: { playing: "Playing • Official Theme", paused: "Paused • Click to Play" },
  vi: { playing: "Đang phát • Nhạc nền BWF", paused: "Tạm dừng • Bấm để nghe" },
  zh: { playing: "播放中 • BWF官方主题曲", paused: "已暂停 • 点击播放" },
  id: { playing: "Memutar • Lagu Resmi BWF", paused: "Dijeda • Klik untuk putar" }
};

function updateBwfMusicUI(isPlaying) {
  bwfPlaying = isPlaying;
  const musicEqualizer = document.getElementById('bwf-equalizer');
  const musicStatus = document.getElementById('bwf-music-status');
  const musicIconPlay = document.getElementById('bwf-icon-play');
  const musicIconPause = document.getElementById('bwf-icon-pause');
  const musicPlayBtn = document.getElementById('bwf-music-btn');
  const i18n = BWF_MUSIC_I18N[currentLanguage] || BWF_MUSIC_I18N.en;

  if (isPlaying) {
    if (musicEqualizer) musicEqualizer.className = 'bwf-equalizer playing';
    if (musicStatus) musicStatus.textContent = i18n.playing;
    if (musicIconPlay) musicIconPlay.style.display = 'none';
    if (musicIconPause) musicIconPause.style.display = 'block';
    if (musicPlayBtn) musicPlayBtn.setAttribute('title', 'Pause BWF Anthem');
  } else {
    if (musicEqualizer) musicEqualizer.className = 'bwf-equalizer paused';
    if (musicStatus) musicStatus.textContent = i18n.paused;
    if (musicIconPlay) musicIconPlay.style.display = 'block';
    if (musicIconPause) musicIconPause.style.display = 'none';
    if (musicPlayBtn) musicPlayBtn.setAttribute('title', 'Play BWF Anthem');
  }
}

function toggleBwfMusic() {
  if (bwfPlaying) pauseBwfMusic();
  else playBwfMusic();
}

function playBwfMusic() {
  const html5Audio = document.getElementById('bwf-html5-audio');
  if (bwfAudioMode === 'html5' && html5Audio) {
    html5Audio.play().then(() => {
      updateBwfMusicUI(true);
    }).catch(() => {
      initYouTubeBwf(true);
    });
  } else if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
    try {
      ytPlayer.unMute();
      ytPlayer.setVolume(75);
      ytPlayer.playVideo();
      updateBwfMusicUI(true);
    } catch (e) {
      console.warn('YT play error:', e);
    }
  } else {
    initYouTubeBwf(true);
  }
}

function pauseBwfMusic() {
  const html5Audio = document.getElementById('bwf-html5-audio');
  if (html5Audio && !html5Audio.paused) html5Audio.pause();
  if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
    try { ytPlayer.pauseVideo(); } catch (e) {}
  }
  updateBwfMusicUI(false);
}

function initBwfAudio() {
  const html5Audio = document.getElementById('bwf-html5-audio');
  if (html5Audio) {
    html5Audio.volume = 0.7;
    const playPromise = html5Audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        bwfAudioMode = 'html5';
        updateBwfMusicUI(true);
      }).catch(() => {
        initYouTubeBwf(false);
      });
    } else {
      initYouTubeBwf(false);
    }
  } else {
    initYouTubeBwf(false);
  }
}

function initYouTubeBwf(forcePlay = false) {
  bwfAudioMode = 'youtube';
  if (window.YT && window.YT.Player) {
    createYTPlayer(forcePlay);
  } else {
    const prevOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function() {
      if (typeof prevOnReady === 'function') prevOnReady();
      createYTPlayer(forcePlay);
    };

    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(tag, firstScript);
    }
  }
}

function createYTPlayer(forcePlay) {
  if (ytPlayer) return;
  ytPlayer = new YT.Player('bwf-yt-player', {
    height: '1',
    width: '1',
    videoId: 'gVnjzJkjzQo',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'gVnjzJkjzQo',
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      onReady: function(e) {
        try {
          e.target.setVolume(75);
          if (forcePlay) {
            e.target.unMute();
            e.target.playVideo();
            updateBwfMusicUI(true);
          } else {
            e.target.playVideo();
            setupAutoplayOnInteraction();
          }
        } catch (err) {}
      },
      onStateChange: function(e) {
        if (e.data === YT.PlayerState.PLAYING) updateBwfMusicUI(true);
        else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) updateBwfMusicUI(false);
      }
    }
  });
}

function setupAutoplayOnInteraction() {
  const triggerAudio = () => {
    if (!userHasInteracted) {
      userHasInteracted = true;
      playBwfMusic();
    }
    ['click', 'touchstart', 'keydown', 'scroll'].forEach(evt => {
      window.removeEventListener(evt, triggerAudio);
    });
  };
  ['click', 'touchstart', 'keydown', 'scroll'].forEach(evt => {
    window.addEventListener(evt, triggerAudio, { passive: true, once: true });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBwfAudio);
} else {
  initBwfAudio();
}


// --------------------------------------------------------------------------
// 6. SYNCHRONIZED MULTI-LANGUAGE TRANSLATION DICTIONARY
// --------------------------------------------------------------------------
const TRANSLATIONS = {
  en: {
    site_title: "SmashPoint | Everything Badminton",
    nav_about: "About",
    nav_facts: "World Records",
    nav_court: "Court & Rules",
    nav_shots: "Key Shots",
    nav_gear: "Equipment",
    nav_tracker: "Scorer",
    nav_quiz: "Quiz",
    nav_play_btn: "🎮 Play Quiz",
    hero_badge: "🏸 The World's Fastest Racket Sport",
    hero_title: "Precision, Agility, and explosive <span>Power</span>.",
    hero_subtitle: "Explore rules, master essential shots, understand court boundaries, and track your match scores in real time.",
    hero_btn_court: "Interactive Court Guide",
    hero_btn_facts: "Explore World Records 🚀",
    stat_1_label: "Guinness World Record Smash (2023)",
    stat_2_label: "Longest Rally in BWF History (3.5 mins)",
    stat_3_label: "#2 Most Played Sport Worldwide",
    about_tag: "Overview",
    about_title: "Why Badminton Captivates 220 Million Players",
    about_subtitle: "The ultimate blend of supersonic projectile speed, extreme cardiovascular output, and split-second tactical deception.",
    about_card1_title: "565 km/h Supersonic Speed",
    about_card1_desc: "The shuttlecock is the fastest moving projectile in all of sport — outspeeding Formula 1 race cars (372 km/h) and Japanese bullet trains (320 km/h).",
    about_card2_title: "2x The Distance of Tennis",
    about_card2_desc: "In a 75-minute match, players run over 6.4 km with 1,900+ explosive lunges. Ball-in-play time is 48% in badminton compared to only 18% in tennis!",
    about_card3_title: "0.005s Reaction Reflexes",
    about_card3_desc: "Net defenders react in less than 5 milliseconds against point-blank smashes — relying on subconscious muscle anticipation faster than a human blink.",
    facts_tag: "World Records & Curiosities",
    facts_title: "Mind-Blowing Badminton Facts & Records",
    facts_subtitle: "From 565 km/h supersonic smashes to 16 left-wing goose feathers, explore the astonishing feats that make badminton legendary.",
    fact1_badge: "Guinness World Record",
    fact1_title: "The Fastest Smash in Human History",
    fact1_desc: "In April 2023, India's <strong>Satwiksairaj Rankireddy</strong> smashed at an astronomical <strong>565 km/h (351.07 mph)</strong>, certified by Guinness World Records. Malaysia's <strong>Pearly Tan</strong> set the female record at <strong>438 km/h</strong> — both faster than Formula 1 cars (372 km/h)!",
    fact1_foot: "Yonex Laboratory Test • Speed-certified",
    fact2_badge: "Aerodynamic Secret",
    fact2_stat: "16 Feathers",
    fact2_title: "Left-Wing Feathers Only",
    fact2_desc: "Tournament-grade shuttlecocks exclusively use 16 feathers taken from the <strong>left wing</strong> of four geese. Feathers from the right wing spin in the opposite direction; mixing left and right feathers causes erratic tumbling and aerodynamic instability.",
    fact2_foot: "BWF Tournament Standard • Goose Feathers",
    fact3_badge: "Endurance Feat",
    fact3_stat: "211 Shots",
    fact3_title: "The Longest Rally in History",
    fact3_desc: "At the 2023 Malaysia Masters, Pearly Tan / M. Thinaah and Rena Miyaura / Ayako Sakuramoto fought for <strong>3 minutes and 30 seconds across 211 consecutive shots</strong> before a winner was decided — leaving all four players collapsed in exhaustion.",
    fact3_foot: "Malaysia Masters 2023 • BWF World Record",
    fact4_badge: "Cardio Comparison",
    fact4_stat: "2x Tennis Distance",
    fact4_title: "More Running Than Tennis",
    fact4_desc: "In a 75-minute badminton match, a player runs roughly <strong>6.4 km (4 miles)</strong> with 1,900+ explosive lunges. In a 3-hour tennis match, players cover only ~3.2 km, because the shuttlecock is active <strong>48% of match time</strong> vs tennis's 18%!",
    fact4_foot: "Physiology Research • Elite Match Tracking",
    fact5_badge: "Origins",
    fact5_stat: "1860s \"Poona\"",
    fact5_title: "Born in Pune, Named in England",
    fact5_desc: "British army officers stationed in Pune (Poona), India in the 1860s added a net to the traditional game of battledore. The Duke of Beaufort introduced it to British society at his ancestral estate, <strong>Badminton House</strong>, giving the sport its permanent name in 1873.",
    fact5_foot: "Badminton House, England • Historic Heritage",
    fact6_badge: "Global Popularity",
    fact6_stat: "220M+ Players",
    fact6_title: "#2 Most Played Sport on Earth",
    fact6_desc: "With more than <strong>220 million active participants</strong>, badminton ranks as the second most played sport worldwide, behind only association football (soccer). Over 1.1 billion viewers watched Olympic badminton broadcasts in Tokyo and Paris.",
    fact6_foot: "BWF Global Census • IOC Olympic Broadcaster Data",
    fact7_badge: "All-Time Legend",
    fact7_stat: "Super Grand Slam",
    fact7_title: "Lin Dan's Unbeatable Feat",
    fact7_desc: "China's <strong>Lin Dan (\"Super Dan\")</strong> achieved what no other badminton player has ever accomplished: completing the full <em>Super Grand Slam</em> by winning all 9 major global tournaments by age 28, including 2 Olympic Golds and 5 World Championships.",
    fact7_foot: "2x Olympic Gold • 5x World Champion",
    fact8_badge: "Aerodynamics",
    fact8_stat: "90% Deceleration",
    fact8_title: "Extreme Speed Braking in Sport",
    fact8_desc: "A shuttlecock loses up to <strong>90% of its initial velocity</strong> within its 13.4m journey due to the extreme conical drag of its feathers. This sharp deceleration creates the dramatic vertical parachute drop that makes defensive returns possible.",
    fact8_foot: "Aerodynamics of Sports Projectiles",
    court_tag: "Interactive Diagram",
    court_title: "Badminton Court Boundaries & Service Rules",
    court_subtitle: "Toggle between Singles and Doubles to see the in-bounds court areas and service zones highlighted.",
    btn_singles: "Singles Mode (Long & Narrow)",
    btn_doubles: "Doubles Mode (Short & Wide)",
    court_net: "NET",
    court_svc_left: "Left Service Court",
    court_svc_right: "Right Service Court",
    shots_tag: "Techniques",
    shots_title: "The 5 Fundamental Badminton Shots",
    shots_subtitle: "Master these core strokes to build an unpredictable attacking and defensive repertoire.",
    shot0_badge: "Offensive",
    shot0_title: "The Forehand Smash",
    shot0_desc: "The primary attacking weapon hit with steep downward trajectory and maximum power.",
    shot0_target: "<strong>Target:</strong> Midcourt open floor / Body",
    shot1_badge: "Tactical",
    shot1_title: "The Drop Shot",
    shot1_desc: "A delicate deception stroke disguised as a clear/smash that dips just over the net.",
    shot1_target: "<strong>Target:</strong> Opponent front court corners",
    shot2_badge: "Defensive / Baseline",
    shot2_title: "The Clear (Lob)",
    shot2_desc: "A deep high shot pushing the opponent back to their rear boundary to reset tempo.",
    shot2_target: "<strong>Target:</strong> Rear boundary baseline",
    shot3_badge: "Aggressive",
    shot3_title: "The Net Kill",
    shot3_desc: "A quick wrist flick at the tape against a weak tumbling return from the opponent.",
    shot3_target: "<strong>Target:</strong> Steep downward into forecourt",
    shot4_badge: "Speed Rally",
    shot4_title: "The Drive",
    shot4_desc: "A flat, aggressive horizontal shot skimming the net, vital for fast doubles exchanges.",
    shot4_target: "<strong>Target:</strong> Opponent body or sidelines",
    pro_tip_label: "Pro Tip:",
    shots_cta_title: "Ready to put your shot knowledge to the test?",
    shots_cta_desc: "Challenge yourself with the 50-Question Badminton Master Quiz!",
    shots_cta_btn: "Take Shots Quiz (10) 🎯",
    gear_tag: "Gear Guide",
    gear_title: "Choosing the Right Equipment",
    gear_subtitle: "A quick breakdown of rackets, shuttlecocks, and court essentials.",
    gear1_title: "Rackets",
    gear1_li1: "<strong>Head-Heavy:</strong> Powerful smashes, slower defense.",
    gear1_li2: "<strong>Head-Light:</strong> Fast reflex defense, doubles play.",
    gear1_li3: "<strong>Even-Balance:</strong> Versatile all-around play.",
    gear1_li4: "<strong>Weights:</strong> 3U (85-89g), 4U (80-84g - most popular).",
    gear2_title: "Shuttlecocks",
    gear2_li1: "<strong>Feather (Goose/Duck):</strong> Authentic flight trajectory, required for tournament competition.",
    gear2_li2: "<strong>Nylon / Plastic:</strong> Highly durable, cost-effective for casual games and training.",
    gear2_li3: "<strong>Speed Ratings:</strong> Rated 76-78 depending on temperature and altitude.",
    gear3_title: "Shoes & Grip",
    gear3_li1: "<strong>Non-Marking Sole:</strong> Gum-rubber sole required on indoor synthetic and wooden courts.",
    gear3_li2: "<strong>Lateral Support:</strong> Protects ankles from sudden lunge stops and direction switches.",
    gear3_li3: "<strong>Grip:</strong> Overgrip (tacky or towel grip) absorbs sweat and prevents racket slipping.",
    tracker_tag: "Interactive Tool",
    tracker_title: "Live Match Score Tracker",
    tracker_subtitle: "Keep track of rally points, service turns, and game points during your practice matches.",
    player_1: "Player 1",
    player_2: "Player 2",
    score_add: "+1 Point",
    game_badge: "Game 1 of 3",
    btn_reset: "Reset Match",
    quiz_tag: "Interactive Game",
    quiz_title: "The 50-Question Badminton Master Quiz",
    quiz_subtitle: "Test your comprehensive knowledge across all 5 key categories: shots, official rules, scoring systems, court boundaries, and world history.",
    quiz_btn_all: "🏆 All 50 Questions",
    quiz_btn_shots: "🏸 Key Shots (10)",
    quiz_btn_rules: "📜 Rules & Faults (10)",
    quiz_btn_scoring: "🔢 Scoring & Service (10)",
    quiz_btn_court: "🏟️ Court & Equipment (10)",
    quiz_btn_history: "⭐ History & Strategy (10)",
    quiz_btn_random: "🎲 Quick Random 10",
    quiz_btn_next: "Next Question →",
    quiz_res_title: "Amazing!",
    quiz_res_desc: "You really know your badminton!",
    quiz_btn_restart: "🔄 Play Again",
    footer_desc: "A comprehensive introduction to the world's most exciting racket sport.",
    footer_copy: "© 2026 SmashPoint Badminton Guide. Created for badminton enthusiasts worldwide."
  },
  vi: {
    site_title: "SmashPoint | Cẩm Nang Cầu Lông Toàn Diện",
    nav_about: "Giới thiệu",
    nav_facts: "Kỷ lục thế giới",
    nav_court: "Sân & Luật đấu",
    nav_shots: "Kỹ thuật đánh",
    nav_gear: "Dụng cụ",
    nav_tracker: "Tính điểm",
    nav_quiz: "Trắc nghiệm",
    nav_play_btn: "🎮 Chơi trắc nghiệm",
    hero_badge: "🏸 Môn Thể Thao Dùng Vợt Nhanh Nhất Hành Tinh",
    hero_title: "Chính xác, Khéo léo và <span>Sức Mạnh</span> bùng nổ.",
    hero_subtitle: "Khám phá luật chơi BWF, thuần thục các cú đánh cốt lõi, nắm vững vạch sân và theo dõi tỉ số trận đấu trực tiếp.",
    hero_btn_court: "Xem sơ đồ sân tương tác",
    hero_btn_facts: "Khám phá kỷ lục thế giới 🚀",
    stat_1_label: "Kỷ lục Guinness đập cầu (2023)",
    stat_2_label: "Pha cầu dài nhất lịch sử BWF (3.5 phút)",
    stat_3_label: "Môn thể thao phổ biến thứ 2 toàn cầu",
    about_tag: "Tổng quan",
    about_title: "Vì Sao Cầu Lông Thu Hút 220 Triệu Người Chơi",
    about_subtitle: "Sự kết hợp hoàn hảo giữa vận tốc siêu thanh, sức bền tim mạch tột đỉnh và những cú đánh đánh lừa thị giác.",
    about_card1_title: "Tốc Độ Siêu Thanh 565 km/h",
    about_card1_desc: "Quả cầu lông là vật thể bay nhanh nhất trong mọi môn thể thao — vượt xa xe đua F1 (372 km/h) và tàu cao tốc Shinkansen (320 km/h).",
    about_card2_title: "Chạy Nhiều Gấp Đôi Quần Vợt",
    about_card2_desc: "Trong trận 75 phút, VĐV chạy hơn 6.4 km với 1.900+ cú bật nhảy. Thời gian cầu bay chiếm 48% trận đấu so với chỉ 18% của tennis!",
    about_card3_title: "Phản Xạ 0.005 Giây",
    about_card3_desc: "Tay vợt đứng lưới phản ứng trong chưa đầy 5 phần nghìn giây trước cú đập cầu cự ly gần — nhanh hơn cả một cái chớp mắt!",
    facts_tag: "Kỷ Lục & Những Điều Kỳ Thú",
    facts_title: "Kỷ Lục & Sự Thật Kinh Ngạc Về Cầu Lông",
    facts_subtitle: "Từ cú đập 565 km/h đến bí mật 16 chiếc lông cánh trái của ngỗng, khám phá những điều thú vị làm nên sự vĩ đại của môn cầu lông.",
    fact1_badge: "Kỷ Lục Guinness",
    fact1_title: "Cú Đập Cầu Nhanh Nhất Lịch Sử",
    fact1_desc: "Tháng 4/2023, tay vợt Ấn Độ <strong>Satwiksairaj Rankireddy</strong> tung cú đập đạt vận tốc không tưởng <strong>565 km/h</strong>, được Kỷ lục Guinness công nhận. Tay vợt nữ Malaysia <strong>Pearly Tan</strong> lập kỷ lục nữ với <strong>438 km/h</strong> — đều vượt trội xe đua F1 (372 km/h)!",
    fact1_foot: "Thử nghiệm phòng lab Yonex • Đo chuẩn tốc độ",
    fact2_badge: "Bí Mật Khí Động Học",
    fact2_stat: "16 Chiếc Lông",
    fact2_title: "Chỉ Dùng Lông Cánh Trái",
    fact2_desc: "Quả cầu thi đấu tiêu chuẩn quốc tế chỉ sử dụng 16 chiếc lông lấy từ <strong>cánh trái</strong> của 4 con ngỗng. Lông cánh phải xoay theo chiều ngược lại; trộn lẫn hai cánh sẽ làm quả cầu chao đảo mất kiểm soát.",
    fact2_foot: "Tiêu chuẩn thi đấu BWF • Lông ngỗng tự nhiên",
    fact3_badge: "Sức Bền Phi Thường",
    fact3_stat: "211 Cú Đánh",
    fact3_title: "Pha Cầu Dài Nhất Mọi Thời Đại",
    fact3_desc: "Tại giải Malaysia Masters 2023, cặp đôi Pearly Tan / M. Thinaah và Rena Miyaura / Ayako Sakuramoto đã giằng co suốt <strong>3 phút 30 giây qua 211 lần chạm cầu</strong> liên tiếp trước khi phân định thắng thua — cả 4 VĐV đều gục ngã vì kiệt sức.",
    fact3_foot: "Malaysia Masters 2023 • Kỷ lục thế giới BWF",
    fact4_badge: "So Sánh Thể Lực",
    fact4_stat: "Gấp Đôi Quần Vợt",
    fact4_title: "Chạy Nhiều Hơn Quần Vợt",
    fact4_desc: "Trong trận cầu lông 75 phút, người chơi chạy khoảng <strong>6.4 km</strong> với 1.900+ cú bật nhảy tấn công. Trong trận tennis 3 tiếng, VĐV chỉ chạy ~3.2 km, bởi vì thời gian bóng sống trong cầu lông chiếm tới <strong>48% thời lượng</strong> so với 18% của tennis!",
    fact4_foot: "Nghiên cứu y sinh học • Theo dõi thi đấu đỉnh cao",
    fact5_badge: "Nguồn Gốc Lịch Sử",
    fact5_stat: "Thập niên 1860 \"Poona\"",
    fact5_title: "Ra Đời Tại Pune, Đặt Tên Tại Anh",
    fact5_desc: "Các sĩ quan quân đội Anh đóng quân tại Pune (Poona), Ấn Độ vào thập niên 1860 đã căng thêm lưới vào trò chơi truyền thống battledore. Công tước xứ Beaufort mang trò chơi này về điền trang <strong>Badminton House</strong>, chính thức khai sinh tên gọi môn Cầu Lông vào năm 1873.",
    fact5_foot: "Badminton House, Anh Quốc • Di sản lịch sử",
    fact6_badge: "Độ Phổ Biến Toàn Cầu",
    fact6_stat: "220M+ Người Chơi",
    fact6_title: "Môn Thể Thao Phổ Biến Thứ 2 Hành Tinh",
    fact6_desc: "Với hơn <strong>220 triệu người chơi thường xuyên</strong>, cầu lông đứng thứ hai toàn cầu chỉ sau bóng đá. Hơn 1.1 tỷ khán giả toàn cầu đã theo dõi các trận thi đấu cầu lông tại Olympic Tokyo và Paris.",
    fact6_foot: "Khảo sát BWF • Dữ liệu truyền hình Olympic IOC",
    fact7_badge: "Huyền Thoại Bất Tử",
    fact7_stat: "Super Grand Slam",
    fact7_title: "Kỳ Tích Vô Tiền Khoáng Hậu Của Lin Dan",
    fact7_desc: "Huyền thoại Trung Quốc <strong>Lin Dan (\"Super Dan\")</strong> đã đạt được điều mà chưa tay vợt nào trong lịch sử làm được: hoàn tất trọn bộ <em>Super Grand Slam</em> khi thâu tóm toàn bộ 9 danh hiệu lớn nhất hành tinh ở tuổi 28, bao gồm 2 HCV Olympic và 5 chức Vô địch Thế giới.",
    fact7_foot: "2 HCV Olympic • 5 lần Vô địch Thế giới",
    fact8_badge: "Khí Động Học",
    fact8_stat: "Giảm Tốc 90%",
    fact8_title: "Cú Phanh Tốc Độ Khủng Khiếp Nhất Thể Thao",
    fact8_desc: "Quả cầu lông mất tới <strong>90% vận tốc ban đầu</strong> chỉ trong quãng đường bay 13.4m nhờ lực cản hình nón cực mạnh của vành lông vũ. Cú hãm phanh đột ngột này tạo ra quỹ đạo rơi cắm thẳng đứng giúp VĐV có thể phòng thủ được những cú đập sấm sét.",
    fact8_foot: "Khí động học vật thể bay thể thao",
    court_tag: "Sơ Đồ Tương Tác",
    court_title: "Kích Thước Sân & Quy Định Giao Cầu BWF",
    court_subtitle: "Chuyển đổi giữa Đánh Đơn và Đánh Đôi để thấy rõ các vạch giới hạn và ô giao cầu hợp lệ.",
    btn_singles: "Đánh Đơn (Dài & Hẹp)",
    btn_doubles: "Đánh Đôi (Rộng & Ngắn)",
    court_net: "LƯỚI",
    court_svc_left: "Ô Giao Cầu Trái",
    court_svc_right: "Ô Giao Cầu Phải",
    shots_tag: "Kỹ Thuật",
    shots_title: "5 Cú Đánh Nền Tảng Trong Cầu Lông",
    shots_subtitle: "Làm chủ 5 đòn đánh thiết yếu để xây dựng lối chơi tấn công uy lực và phòng ngự biến hóa.",
    shot0_badge: "Tấn công",
    shot0_title: "Cú Đập Cầu Thuận Tay",
    shot0_desc: "Vũ khí tấn công ghi điểm số 1 với quỹ đạo cắm dốc thẳng và sức mạnh tối đa.",
    shot0_target: "<strong>Mục tiêu:</strong> Khoảng trống giữa sân / Thân người",
    shot1_badge: "Chiến thuật",
    shot1_title: "Cú Bỏ Nhỏ / Chém Cầu",
    shot1_desc: "Đòn đánh lừa tinh tế ngụy trang như cú đập khiến quả cầu rơi sát mép lưới.",
    shot1_target: "<strong>Mục tiêu:</strong> Góc sân trước đối phương",
    shot2_badge: "Phòng thủ / Cuối sân",
    shot2_title: "Cú Phông Cầu (Lốp Cầu)",
    shot2_desc: "Đường cầu bổng sâu đẩy đối thủ lùi sát vạch đáy để giành lại quyền chủ động.",
    shot2_target: "<strong>Mục tiêu:</strong> Vạch đáy cuối sân",
    shot3_badge: "Kết liễu",
    shot3_title: "Cú Vồ Cầu / Đập Lưới",
    shot3_desc: "Cú vẩy cổ tay chớp nhoáng trên mép lưới khi đối thủ trả cầu lơ lửng.",
    shot3_target: "<strong>Mục tiêu:</strong> Cắm thẳng vào sân trước",
    shot4_badge: "Tốc độ nhanh",
    shot4_title: "Cú Tạt Cầu (Drive)",
    shot4_desc: "Đường cầu bay ngang bằng, tốc độ cao lướt sát mép lưới, vũ khí số 1 trong đánh đôi.",
    shot4_target: "<strong>Mục tiêu:</strong> Thân người hoặc vạch biên đối phương",
    pro_tip_label: "Mẹo Pro:",
    shots_cta_title: "Sẵn sàng thử thách kiến thức kỹ thuật của bạn?",
    shots_cta_desc: "Chinh phục bộ đề trắc nghiệm toàn diện 50 câu hỏi chuẩn quốc tế!",
    shots_cta_btn: "Làm bài trắc nghiệm Kỹ Thuật (10) 🎯",
    gear_tag: "Hướng Dẫn Dụng Cụ",
    gear_title: "Lựa Chọn Dụng Cụ Thi Đấu Chuẩn",
    gear_subtitle: "Phân biệt vợt, quả cầu lông vũ và trang bị thiết yếu trên sân thi đấu.",
    gear1_title: "Vợt Cầu Lông",
    gear1_li1: "<strong>Nặng đầu (Head-Heavy):</strong> Đập cầu uy lực, tốc độ xoay chuyển phòng thủ chậm hơn.",
    gear1_li2: "<strong>Nhẹ đầu (Head-Light):</strong> Phản xạ phòng thủ cực nhanh, lý tưởng cho đánh đôi.",
    gear1_li3: "<strong>Cân bằng (Even-Balance):</strong> Công thủ toàn diện, phù hợp mọi lối chơi.",
    gear1_li4: "<strong>Trọng lượng:</strong> 3U (85-89g), 4U (80-84g - phổ biến nhất hiện nay).",
    gear2_title: "Quả Cầu Lông",
    gear2_li1: "<strong>Lông vũ tự nhiên:</strong> Quỹ đạo bay chuẩn xác, bắt buộc trong thi đấu chuyên nghiệp.",
    gear2_li2: "<strong>Nylon / Nhựa nhân tạo:</strong> Siêu bền, tiết kiệm chi phí cho tập luyện và đánh phong trào.",
    gear2_li3: "<strong>Tốc độ cầu:</strong> Thường dùng tốc độ 76-78 tùy thuộc vào nhiệt độ và độ cao sân.",
    gear3_title: "Giày & Quấn Cán",
    gear3_li1: "<strong>Đế Non-Marking:</strong> Đế cao su bám sàn, bắt buộc trên sân thảm và sân gỗ trong nhà.",
    gear3_li2: "<strong>Chống lật cổ chân:</strong> Bảo vệ mắt cá chân khỏi những cú bật nhảy tiếp đất đột ngột.",
    gear3_li3: "<strong>Quấn cán:</strong> Quấn cán cao su (bám dính) hoặc quấn khăn thấm hút mồ hôi chống tuột vợt.",
    tracker_tag: "Công Cụ Tương Tác",
    tracker_title: "Bảng Tính Điểm Trận Đấu Trực Tiếp",
    tracker_subtitle: "Theo dõi điểm số từng hiệp đấu, lượt giao cầu và điểm kết thúc ván theo luật BWF.",
    player_1: "VĐV 1",
    player_2: "VĐV 2",
    score_add: "+1 Điểm",
    game_badge: "Hiệp 1 / 3",
    btn_reset: "Thiết Lập Lại",
    quiz_tag: "Trò Chơi Tương Tác",
    quiz_title: "Bộ Đề Trắc Nghiệm Cầu Lông 50 Câu",
    quiz_subtitle: "Thử thách kiến thức toàn diện qua 5 chủ đề: kỹ thuật đánh, luật chính thức, tính điểm, kích thước sân và lịch sử thế giới.",
    quiz_btn_all: "🏆 Tất cả 50 câu",
    quiz_btn_shots: "🏸 Kỹ thuật đánh (10)",
    quiz_btn_rules: "📜 Luật & Lỗi cầu (10)",
    quiz_btn_scoring: "🔢 Tính điểm & Giao cầu (10)",
    quiz_btn_court: "🏟️ Sân & Dụng cụ (10)",
    quiz_btn_history: "⭐ Lịch sử & Chiến thuật (10)",
    quiz_btn_random: "🎲 10 câu ngẫu nhiên",
    quiz_btn_next: "Câu tiếp theo →",
    quiz_res_title: "Xuất Sắc!",
    quiz_res_desc: "Bạn thực sự là một chuyên gia cầu lông!",
    quiz_btn_restart: "🔄 Chơi Lại",
    footer_desc: "Cẩm nang toàn diện về môn thể thao dùng vợt nhanh và hấp dẫn nhất hành tinh.",
    footer_copy: "© 2026 SmashPoint Badminton Guide. Được xây dựng vì đam mê cầu lông toàn cầu."
  },
  zh: {
    site_title: "SmashPoint | 羽毛球全方位百科指南",
    nav_about: "关于羽球",
    nav_facts: "世界纪录",
    nav_court: "场地与规则",
    nav_shots: "核心手法",
    nav_gear: "装备指南",
    nav_tracker: "实时计分",
    nav_quiz: "50题问答",
    nav_play_btn: "🎮 开始答题",
    hero_badge: "🏸 全球球速最快的球拍运动",
    hero_title: "精准、敏捷与爆发性<span>力量</span>的交响。",
    hero_subtitle: "探索BWF官方规则，精通核心击球手法，理解球场边界与实时计分系统。",
    hero_btn_court: "查看交互式球场",
    hero_btn_facts: "探索世界纪录 🚀",
    stat_1_label: "吉尼斯世界纪录杀球速度 (2023)",
    stat_2_label: "BWF史上最长多拍回合 (211拍)",
    stat_3_label: "全球参与人数第二多的体育项目",
    about_tag: "总览",
    about_title: "为何羽毛球吸引全球2.2亿运动人群",
    about_subtitle: "超音速球速、极致有氧耐力与瞬息万变战术假动作的完美融合。",
    about_card1_title: "565 km/h 超音速极速",
    about_card1_desc: "羽毛球是所有体育运动中速度最快的飞行物 — 超越F1赛车（372 km/h）与新干线高铁（320 km/h）。",
    about_card2_title: "两倍于网球的奔跑距离",
    about_card2_desc: "在75分钟的高强度比赛中，选手奔跑超6.4公里，完成1900+次弓步起跳。有效击球时间高达48%，远超网球的18%！",
    about_card3_title: "0.005秒极限神经反射",
    about_card3_desc: "面对近身抽杀，网前选手必须在5毫秒内做出预判拦截 — 比人类眨眼还要迅捷。",
    facts_tag: "世界纪录与冷知识",
    facts_title: "令人惊叹的羽毛球世界纪录",
    facts_subtitle: "从565 km/h吉尼斯杀球到仅采用左翼鹅毛的秘密，探索羽毛球运动的非凡魅力。",
    fact1_badge: "吉尼斯世界纪录",
    fact1_title: "人类历史上最快的击球速度",
    fact1_desc: "2023年4月，印度选手<strong>兰基雷迪 (Satwiksairaj Rankireddy)</strong> 轰出惊人的 <strong>565 km/h</strong> 扣杀，获吉尼斯世界纪录认证。马来西亚女将<strong>陈康乐 (Pearly Tan)</strong> 以 <strong>438 km/h</strong> 保持女子纪录 — 均大幅超越F1赛车极速 (372 km/h)！",
    fact1_foot: "尤尼克斯实验室测试 • 速度权威认证",
    fact2_badge: "空气动力学秘密",
    fact2_stat: "16 根羽毛",
    fact2_title: "仅采用鹅左翼羽毛",
    fact2_desc: "国际顶级比赛用球全部由4只鹅的<strong>左翼16根主羽</strong>精制而成。右翼羽毛旋转方向相反，左右混用会导致飞行翻滚不稳定。",
    fact2_foot: "BWF比赛级标准 • 天然特级鹅毛",
    fact3_badge: "耐力极限",
    fact3_stat: "211 拍",
    fact3_title: "羽坛史上最长多拍对攻",
    fact3_desc: "在2023年马来西亚大师赛上，陈康乐/蒂娜与日本组合宫浦玲奈/樱本绚子鏖战 <strong>3分30秒共计211拍</strong> 方决出胜负 — 四位选手赛后全部精疲力竭倒地。",
    fact3_foot: "2023马来西亚大师赛 • BWF世界纪录",
    fact4_badge: "体能消耗对比",
    fact4_stat: "2倍于网球奔跑距离",
    fact4_title: "跑动距离大幅超越网球",
    fact4_desc: "一场75分钟的羽毛球比赛中，选手跑动约 <strong>6.4公里</strong>，完成1900+次弓步跨跳。在3小时的网球比赛中仅跑动约3.2公里，因为羽毛球的活球时间占比高达 <strong>48%</strong>，而网球仅为18%！",
    fact4_foot: "运动生理学研究 • 顶级赛事追踪数据",
    fact5_badge: "历史起源",
    fact5_stat: "19世纪60年代 \"普纳\"",
    fact5_title: "始于印度普纳，定名于英国庄园",
    fact5_desc: "19世纪60年代驻扎在印度普纳的英国军官在传统板羽球游戏中加入球网。博福特公爵将其带回其英国祖传庄园 <strong>羽毛球山庄 (Badminton House)</strong>，使该项运动于1873年正式得名。",
    fact5_foot: "英国羽毛球山庄 • 历史传承",
    fact6_badge: "全球普及度",
    fact6_stat: "2.2亿+ 参与者",
    fact6_title: "全球参与人数第二多的运动",
    fact6_desc: "全球拥有超过 <strong>2.2亿经常参与者</strong>，羽毛球仅次于足球，高居全球最受欢迎体育运动榜第二位。东京与巴黎奥运会羽毛球转播吸引了超过11亿全球观众收看。",
    fact6_foot: "BWF全球统计 • 国际奥委会转播数据",
    fact7_badge: "全满贯传奇",
    fact7_stat: "双圈全满贯",
    fact7_title: "林丹前无古人的全满贯纪录",
    fact7_desc: "中国羽坛传奇<strong>林丹（\"超级丹\"）</strong>完成了无人企及的壮举：在28岁前集齐包括2枚奥运单打金牌和5届世锦赛冠军在内的全部9大赛事冠军，达成双圈超级全满贯。",
    fact7_foot: "2届奥运金牌 • 5届世锦赛冠军",
    fact8_badge: "空气动力学",
    fact8_stat: "90% 极速骤减",
    fact8_title: "体育界最极致的急刹降速",
    fact8_desc: "羽毛球在短短13.4米飞行距离内会因羽毛锥体产生的巨大空气阻力<strong>损失高达90%的初速度</strong>。这种剧烈的垂直减速使防守方拦截高速暴杀成为可能。",
    fact8_foot: "高速体育飞行器空气动力学研究",
    court_tag: "交互图解",
    court_title: "羽毛球场边界线与发球规则",
    court_subtitle: "在单打与双打模式之间自由切换，清晰掌握接发球界线与边线范围。",
    btn_singles: "单打模式 (长而窄)",
    btn_doubles: "双打模式 (短而宽)",
    court_net: "球网",
    court_svc_left: "左发球区",
    court_svc_right: "右发球区",
    shots_tag: "技术手法",
    shots_title: "五大羽毛球基础核心击球技术",
    shots_subtitle: "精通扣杀、吊球、高远球、封网与平抽，构建攻守兼备的技术体系。",
    shot0_badge: "进攻杀手锏",
    shot0_title: "正手扣杀",
    shot0_desc: "最核心的下压终结武器，具备极陡峭的下坠角度与无与伦比的爆发力。",
    shot0_target: "<strong>目标落点:</strong> 中场空当 / 对手追身",
    shot1_badge: "战术欺骗",
    shot1_title: "网前吊球 / 劈吊",
    shot1_desc: "与高远球假动作完美契合，在触球瞬间切削使球轻飘滚网而过。",
    shot1_target: "<strong>目标落点:</strong> 对手网前两侧边角",
    shot2_badge: "防守重置",
    shot2_title: "后场高远球",
    shot2_desc: "将球高高击向对方底线深处，压制对手站位并赢取喘息回位时机。",
    shot2_target: "<strong>目标落点:</strong> 后场底线界内",
    shot3_badge: "网前突击",
    shot3_title: "网前扑球 / 封网",
    shot3_desc: "针对对手稍高的网前还击，手腕短促闪动快速向下扑死在对方前场。",
    shot3_target: "<strong>目标落点:</strong> 前场陡峭下压钉地",
    shot4_badge: "高速对抽",
    shot4_title: "中半场平抽球",
    shot4_desc: "贴网疾速对穿的平直击球，双打中争夺主动权、避免被动起球的核心。",
    shot4_target: "<strong>目标落点:</strong> 对手躯干或两侧边线",
    pro_tip_label: "专业提示:",
    shots_cta_title: "准备好检验你的羽毛球技术手法了吗？",
    shots_cta_desc: "挑战包含50道全能题目的羽毛球大师测试题库！",
    shots_cta_btn: "参加击球技术专项测试 (10题) 🎯",
    gear_tag: "装备指南",
    gear_title: "挑选最适合你的专业装备",
    gear_subtitle: "拍头平衡点、4U/3U重量分类、鹅毛球飞行特性与生胶防滑鞋底解析。",
    gear1_title: "球拍分类",
    gear1_li1: "<strong>拍头偏重 (进攻型):</strong> 杀球势大力沉，防守回拍稍显迟缓。",
    gear1_li2: "<strong>拍头偏轻 (速度型):</strong> 挥速极快防守灵动，双打网前利器。",
    gear1_li3: "<strong>平衡型 (控球型):</strong> 攻守兼备，适合各水平全面打法。",
    gear1_li4: "<strong>重量规格:</strong> 3U (85-89克), 4U (80-84克 - 现今最普及主流)。",
    gear2_title: "羽毛球",
    gear2_li1: "<strong>天然羽毛球 (鹅毛/鸭毛):</strong> 顶级飞行质感与旋转，正规大赛指定用球。",
    gear2_li2: "<strong>尼龙球 / 塑料球:</strong> 超强耐打抗磨损，业余娱乐与启蒙训练首选。",
    gear2_li3: "<strong>球速标准:</strong> 根据比赛场馆温度与海拔常使用76速至78速。",
    gear3_title: "专业球鞋与手胶",
    gear3_li1: "<strong>生胶防滑大底:</strong> 室内塑胶场地与木地板必备，抓地防滑且不划伤地面。",
    gear3_li2: "<strong>侧向支撑抗扭:</strong> 保护脚踝，抵御高速急停跨步与变向冲击。",
    gear3_li3: "<strong>手胶 (握把布):</strong> 粘性手胶或毛巾胶吸汗防滑，防止击球脱手飞拍。",
    tracker_tag: "计分工具",
    tracker_title: "BWF标准实时计分与发球区提示",
    tracker_subtitle: "21分落地得分制、连得2分胜出、最高封顶30分的专业赛制计分器。",
    player_1: "选手 1",
    player_2: "选手 2",
    score_add: "+1 分",
    game_badge: "第 1 局 / 共 3 局",
    btn_reset: "重置比赛",
    quiz_tag: "互动问答",
    quiz_title: "50道羽毛球全能大师挑战赛",
    quiz_subtitle: "全面覆盖击球技巧、犯规判定、发球规则、场地尺寸与羽球历史名录。",
    quiz_btn_all: "🏆 全部 50 题",
    quiz_btn_shots: "🏸 核心手法 (10)",
    quiz_btn_rules: "📜 规则与犯规 (10)",
    quiz_btn_scoring: "🔢 计分与发球 (10)",
    quiz_btn_court: "🏟️ 场地与装备 (10)",
    quiz_btn_history: "⭐ 历史与战术 (10)",
    quiz_btn_random: "🎲 随机 10 题",
    quiz_btn_next: "下一题 →",
    quiz_res_title: "太棒了!",
    quiz_res_desc: "你对羽毛球运动如数家珍！",
    quiz_btn_restart: "🔄 再玩一次",
    footer_desc: "全球最具魅力的球拍运动全方位指南。",
    footer_copy: "© 2026 SmashPoint 羽球指南 • 为全球羽毛球爱好者倾心打造"
  },
  id: {
    site_title: "SmashPoint | Panduan Lengkap Bulutangkis",
    nav_about: "Tentang",
    nav_facts: "Rekor Dunia",
    nav_court: "Lapangan & Aturan",
    nav_shots: "Pukulan Kunci",
    nav_gear: "Peralatan",
    nav_tracker: "Skor",
    nav_quiz: "Kuis",
    nav_play_btn: "🎮 Mainkan Kuis",
    hero_badge: "🏸 Olahraga Raket Tercepat di Dunia",
    hero_title: "Presisi, Kelincahan, dan <span>Kekuatan</span> Eksplosif.",
    hero_subtitle: "Pelajari peraturan BWF resmi, kuasai teknik pukulan penting, dan catat skor pertandingan secara langsung.",
    hero_btn_court: "Panduan Lapangan Interaktif",
    hero_btn_facts: "Lihat Rekor Dunia 🚀",
    stat_1_label: "Rekor Dunia Smash Guinness (2023)",
    stat_2_label: "Rally Terpanjang Sejarah BWF (211 Pukulan)",
    stat_3_label: "Olahraga Terpopuler #2 di Dunia",
    about_tag: "Ikhtisar",
    about_title: "Mengapa Bulutangkis Memikat 220 Juta Pemain",
    about_subtitle: "Kombinasi kecepatan supersonik, daya tahan kardio ekstrem, dan tipuan taktik sepersekian detik.",
    about_card1_title: "Kecepatan Supersonik 565 km/jam",
    about_card1_desc: "Shuttlecock adalah proyektil tercepat di dunia olahraga — melampaui mobil balap Formula 1 (372 km/jam) dan kereta peluru Shinkansen (320 km/jam).",
    about_card2_title: "2x Jarak Lari Dibanding Tenis",
    about_card2_desc: "Dalam pertandingan 75 menit, pemain berlari lebih dari 6,4 km dengan 1.900+ lunge. Waktu bola aktif mencapai 48% dibanding 18% di tenis!",
    about_card3_title: "Refleks 0.005 Detik",
    about_card3_desc: "Pemain depan bereaksi dalam waktu kurang dari 5 milidetik saat mengantisipasi smash jarak dekat — lebih cepat dari kedipan mata manusia.",
    facts_tag: "Rekor Dunia & Keunikan",
    facts_title: "Fakta Mengagumkan & Rekor Dunia Bulutangkis",
    facts_subtitle: "Dari smash 565 km/jam hingga rahasia 16 helai bulu sayap kiri angsa, jelajahi keajaiban bulutangkis dunia.",
    fact1_badge: "Rekor Dunia Guinness",
    fact1_title: "Smash Tercepat dalam Sejarah Manusia",
    fact1_desc: "Pada April 2023, pemain India <strong>Satwiksairaj Rankireddy</strong> melepaskan smash berkecepatan <strong>565 km/jam</strong> yang disahkan Guinness World Records. Pemain Malaysia <strong>Pearly Tan</strong> memegang rekor wanita <strong>438 km/jam</strong> — keduanya lebih cepat dari mobil F1 (372 km/jam)!",
    fact1_foot: "Uji Laboratorium Yonex • Teruji kecepatan resmi",
    fact2_badge: "Rahasia Aerodinamika",
    fact2_stat: "16 Bulu Angsa",
    fact2_title: "Hanya Bulu Sayap Kiri",
    fact2_desc: "Shuttlecock kelas turnamen secara ketat hanya menggunakan 16 helai bulu dari <strong>sayap kiri</strong> empat ekor angsa. Bulu sayap kanan berputar ke arah sebaliknya; mencampurnya akan menimbulkan putaran tidak stabil.",
    fact2_foot: "Standar Turnamen BWF • Bulu Angsa Asli",
    fact3_badge: "Uji Ketahanan Luar Biasa",
    fact3_stat: "211 Pukulan",
    fact3_title: "Rally Terpanjang Sepanjang Sejarah",
    fact3_desc: "Pada Malaysia Masters 2023, pasangan Pearly Tan / M. Thinaah dan Rena Miyaura / Ayako Sakuramoto bertarung selama <strong>3 menit 30 detik lewat 211 pukulan</strong> tanpa henti sebelum poin ditentukan — keempat pemain roboh karena kelelahan.",
    fact3_foot: "Malaysia Masters 2023 • Rekor Dunia BWF",
    fact4_badge: "Komparasi Kardio",
    fact4_stat: "2x Jarak Tenis",
    fact4_title: "Lari Lebih Jauh Dibandingkan Tenis",
    fact4_desc: "Dalam pertandingan bulutangkis 75 menit, pemain berlari sekitar <strong>6,4 km</strong> dengan 1.900+ gerakan lunge intens. Pada laga tenis 3 jam, pemain hanya menempuh ~3,2 km, karena bola aktif bulutangkis mencapai <strong>48% durasi laga</strong> vs tenis 18%!",
    fact4_foot: "Riset Fisiologi Olahraga • Pemantauan Laga Elit",
    fact5_badge: "Asal Mula",
    fact5_stat: "Era 1860-an \"Poona\"",
    fact5_title: "Lahir di Pune, Dinamai di Inggris",
    fact5_desc: "Perwira militer Inggris di Pune (Poona), India pada tahun 1860-an menambahkan jaring pada permainan tradisional battledore. Duke of Beaufort memperkenalkannya di perkebunan <strong>Badminton House</strong>, meresmikan nama olahraga ini pada 1873.",
    fact5_foot: "Badminton House, Inggris • Warisan Sejarah",
    fact6_badge: "Popularitas Global",
    fact6_stat: "220Juta+ Pemain",
    fact6_title: "Olahraga Terpopuler #2 di Bumi",
    fact6_desc: "Dengan lebih dari <strong>220 juta partisipan aktif</strong>, bulutangkis menjadi olahraga paling banyak dimainkan kedua di dunia setelah sepak bola. Lebih dari 1,1 miliar pemirsa menyaksikan siaran bulutangkis Olimpiade di Tokyo dan Paris.",
    fact6_foot: "Sensus Global BWF • Data Penyiaran Olimpiade IOC",
    fact7_badge: "Legenda Abadi",
    fact7_stat: "Super Grand Slam",
    fact7_title: "Prestasi Tak Tertandingi Lin Dan",
    fact7_desc: "Legenda Tiongkok <strong>Lin Dan (\"Super Dan\")</strong> meraih rekor yang belum pernah dicapai pemain mana pun: melengkapi gelar <em>Super Grand Slam</em> dengan memenangkan seluruh 9 turnamen bergengsi dunia di usia 28 tahun, termasuk 2 Emas Olimpiade & 5 Juara Dunia.",
    fact7_foot: "2x Emas Olimpiade • 5x Juara Dunia",
    fact8_badge: "Aerodinamika",
    fact8_stat: "Perlambatan 90%",
    fact8_title: "Pengereman Kecepatan Paling Ekstrem",
    fact8_desc: "Shuttlecock kehilangan hingga <strong>90% kecepatan awalnya</strong> dalam jarak tempuh 13,4 meter akibat hambatan udara kerucut bulu angsa. Deselerasi tajam ini menghasilkan lintasan parasut vertikal yang memungkinkan kembalinya kok smash keras.",
    fact8_foot: "Aerodinamika Proyektil Olahraga",
    court_tag: "Diagram Interaktif",
    court_title: "Batas Lapangan & Aturan Servis Bulutangkis",
    court_subtitle: "Beralih antara mode Tunggal dan Ganda untuk melihat area lapangan dan kotak servis secara jelas.",
    btn_singles: "Mode Tunggal (Panjang & Sempit)",
    btn_doubles: "Mode Ganda (Pendek & Lebar)",
    court_net: "NET",
    court_svc_left: "Kotak Servis Kiri",
    court_svc_right: "Kotak Servis Kanan",
    shots_tag: "Teknik",
    shots_title: "5 Pukulan Fundamental Bulutangkis",
    shots_subtitle: "Kuasai smash, dropshot, lob, net kill, dan drive untuk membangun permainan menyerang yang tangguh.",
    shot0_badge: "Menyerang",
    shot0_title: "Pukulan Smash Keras",
    shot0_desc: "Senjata serangan utama yang dipukul menukik tajam dengan daya ledak maksimal.",
    shot0_target: "<strong>Target:</strong> Area tengah lapangan kosong / Tubuh lawan",
    shot1_badge: "Taktis",
    shot1_title: "Pukulan Dropshot Halus",
    shot1_desc: "Tipuan halus yang disamarkan seperti smash, kok jatuh tipis tepat di bibir net.",
    shot1_target: "<strong>Target:</strong> Sudut lapangan depan lawan",
    shot2_badge: "Bertahan / Belakang",
    shot2_title: "Pukulan Lob Tinggi (Clear)",
    shot2_desc: "Pukulan melambung tinggi mendorong lawan ke garis belakang untuk mengatur tempo.",
    shot2_target: "<strong>Target:</strong> Garis batas belakang",
    shot3_badge: "Agresif",
    shot3_title: "Sambaran Depan Net (Kill)",
    shot3_desc: "Sentakan pergelangan tangan cepat di atas pita net menyambar bola tanggung lawan.",
    shot3_target: "<strong>Target:</strong> Menukik ke lapangan depan",
    shot4_badge: "Reli Cepat",
    shot4_title: "Pukulan Drive Mendatar",
    shot4_desc: "Pukulan mendatar menyisir net dengan kecepatan tinggi, vital dalam reli ganda.",
    shot4_target: "<strong>Target:</strong> Tubuh lawan atau garis tepi",
    pro_tip_label: "Tips Ahli:",
    shots_cta_title: "Siap menguji pengetahuan teknik pukulan Anda?",
    shots_cta_desc: "Tantang diri Anda dalam kuis bulutangkis 50 pertanyaan lengkap!",
    shots_cta_btn: "Ikuti Kuis Pukulan (10) 🎯",
    gear_tag: "Panduan Alat",
    gear_title: "Memilih Perlengkapan yang Tepat",
    gear_subtitle: "Panduan memilih raket, shuttlecock bulu angsa, dan sepatu sol karet non-marking.",
    gear1_title: "Raket",
    gear1_li1: "<strong>Head-Heavy:</strong> Smash bertenaga tinggi, pertahanan refleks sedikit lambat.",
    gear1_li2: "<strong>Head-Light:</strong> Refleks bertahan super cepat, ideal permainan ganda.",
    gear1_li3: "<strong>Even-Balance:</strong> Serbaguna seimbang, cocok untuk segala gaya permainan.",
    gear1_li4: "<strong>Berat:</strong> 3U (85-89g), 4U (80-84g - paling populer saat ini).",
    gear2_title: "Shuttlecock",
    gear2_li1: "<strong>Bulu Asli (Angsa/Bebek):</strong> Lintasan terbang akurat, wajib untuk kompetisi resmi.",
    gear2_li2: "<strong>Nilon / Plastik:</strong> Sangat awet, hemat biaya untuk latihan kasual.",
    gear2_li3: "<strong>Tingkat Kecepatan:</strong> Dinilai 76-78 tergantung suhu dan ketinggian lapangan.",
    gear3_title: "Sepatu & Grip",
    gear3_li1: "<strong>Sol Non-Marking:</strong> Sol karet mentah wajib di lapangan sintetis dan kayu.",
    gear3_li2: "<strong>Dukungan Lateral:</strong> Melindungi pergelangan kaki dari lunge tiba-tiba.",
    gear3_li3: "<strong>Grip:</strong> Overgrip karet perekat atau handuk untuk mencegah raket terlepas.",
    tracker_tag: "Pencatat Skor",
    tracker_title: "Penghitung Skor Pertandingan BWF Langsung",
    tracker_subtitle: "Sistem reli poin 21 angka, deuce selisih 2, dan batas maksimal 30 poin.",
    player_1: "Pemain 1",
    player_2: "Pemain 2",
    score_add: "+1 Poin",
    game_badge: "Game 1 dari 3",
    btn_reset: "Reset Pertandingan",
    quiz_tag: "Permainan Interaktif",
    quiz_title: "Kuis Master Bulutangkis 50 Pertanyaan",
    quiz_subtitle: "Uji wawasan lengkapmu tentang teknik pukulan, aturan servis, garis lapangan, dan sejarah bulutangkis dunia.",
    quiz_btn_all: "🏆 Semua 50 Soal",
    quiz_btn_shots: "🏸 Pukulan Kunci (10)",
    quiz_btn_rules: "📜 Aturan & Pelanggaran (10)",
    quiz_btn_scoring: "🔢 Skor & Servis (10)",
    quiz_btn_court: "🏟️ Lapangan & Alat (10)",
    quiz_btn_history: "⭐ Sejarah & Taktik (10)",
    quiz_btn_random: "🎲 10 Soal Acak",
    quiz_btn_next: "Soal Berikutnya →",
    quiz_res_title: "Luar Biasa!",
    quiz_res_desc: "Anda benar-benar memahami bulutangkis!",
    quiz_btn_restart: "🔄 Main Lagi",
    footer_desc: "Pengantar komprehensif tentang olahraga raket paling seru di dunia.",
    footer_copy: "© 2026 SmashPoint Badminton Guide. Diciptakan untuk pecinta bulutangkis seluruh dunia."
  }
};


// --------------------------------------------------------------------------
// 7. SINGLE BUTTON LANGUAGE SWITCHER & SYNCHRONIZED TRANSLATION ENGINE
// --------------------------------------------------------------------------
const LANG_META = {
  en: { flag: "🇬🇧", label: "English" },
  vi: { flag: "🇻🇳", label: "Tiếng Việt" },
  zh: { flag: "🇨🇳", label: "中文" },
  id: { flag: "🇮🇩", label: "Bahasa Indonesia" }
};

function toggleLangDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('lang-dropdown');
  const btn = document.getElementById('lang-dropdown-btn');
  if (!dropdown) return;
  const isOpen = dropdown.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function selectLanguage(lang, event) {
  if (event) event.stopPropagation();
  closeLangDropdown();
  changeLanguage(lang);
}

function closeLangDropdown() {
  const dropdown = document.getElementById('lang-dropdown');
  const btn = document.getElementById('lang-dropdown-btn');
  if (dropdown) dropdown.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

// Close dropdown on outside click or Escape key
window.addEventListener('click', (e) => {
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown && dropdown.classList.contains('open') && !dropdown.contains(e.target)) {
    closeLangDropdown();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLangDropdown();
});

function changeLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLanguage = lang;

  // 1. Update Dropdown Button UI
  const flagEl = document.getElementById('lang-current-flag');
  const textEl = document.getElementById('lang-current-text');
  const meta = LANG_META[lang] || LANG_META.en;
  if (flagEl) flagEl.textContent = meta.flag;
  if (textEl) textEl.textContent = meta.label;

  // Update checkmarks in dropdown options
  const options = document.querySelectorAll('.lang-option');
  options.forEach(opt => {
    const fn = opt.getAttribute('onclick') || '';
    if (fn.includes(`'${lang}'`)) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // 2. Update HTML tag and Page Title
  document.documentElement.lang = lang;
  if (TRANSLATIONS[lang].site_title) {
    document.title = TRANSLATIONS[lang].site_title;
  }

  // 3. Synchronously update all [data-i18n] elements
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (dict[key].includes('<')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // 4. Synchronously re-render Court Rules in active language
  setCourtMode(currentCourtMode);

  // 5. Synchronously re-render Shot Details in active language
  selectShot(currentShotIndex);

  // 6. Synchronously update Live Scoreboard strings
  updateScoreboard();

  // 7. Synchronously update Quiz UI
  quizRender();

  // 8. Update Music Status
  updateBwfMusicUI(bwfPlaying);

  // 9. Persist choice
  try {
    localStorage.setItem('smashpoint_lang', lang);
  } catch (e) {}
}

// --------------------------------------------------------------------------
// 8. INITIALIZATION ON STARTUP
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Set default court mode
  setCourtMode('singles');

  // Set default shot
  selectShot(0);

  // Initialize Scoreboard
  updateScoreboard();

  // Initialize Quiz
  quizInit();

  // Check saved language
  try {
    const saved = localStorage.getItem('smashpoint_lang');
    if (saved && TRANSLATIONS[saved]) {
      changeLanguage(saved);
    } else {
      changeLanguage('en');
    }
  } catch (e) {
    changeLanguage('en');
  }
});

// Run once immediately if DOM is already ready
if (document.readyState !== 'loading') {
  try {
    const saved = localStorage.getItem('smashpoint_lang');
    if (saved && TRANSLATIONS[saved]) {
      changeLanguage(saved);
    } else {
      changeLanguage('en');
    }
  } catch (e) {
    changeLanguage('en');
  }
}
