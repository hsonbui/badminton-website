// ==========================================================================
// SmashPoint - Comprehensive Badminton Platform & Synchronized Multi-Language Engine (v1.0.1)
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
  },
  pl: {
    singles: {
      title: "Gra pojedyncza: Długi i wąski kort",
      desc: "W grze pojedynczej obowiązują <strong>wewnętrzne linie boczne</strong> oraz <strong>tylna linia końcowa</strong>. Korytarze deblowe (zaznaczone na czerwono) są autowe zarówno podczas serwisu, jak i w trakcie wymiany.",
      bullets: `
        <li><strong>Boczne korytarze deblowe:</strong> Zawsze AUT podczas serwisu i gry.</li>
        <li><strong>Tylna linia kortu:</strong> POLE w grze i podczas serwisu.</li>
        <li><strong>Pole serwisowe:</strong> Lotka musi przekroczyć przednią linię serwisu i wpaść w przeciwległe pole po przekątnej.</li>
        <li><strong>Pozycja serwującego:</strong> Serwuj z prawego pola, gdy Twój wynik jest parzysty (0, 2, 4...), oraz z lewego pola, gdy wynik jest nieparzysty (1, 3, 5...).</li>
      `
    },
    doubles: {
      title: "Gra podwójna: Krótki i szeroki serwis, cały kort w grze",
      desc: "W deblu podczas wymiany obowiązują <strong>zewnętrzne linie boczne</strong>. Jednak przy serwisie <strong>tylny korytarz deblowy to AUT</strong> (pole serwisowe jest szerokie, ale krótsze).",
      bullets: `
        <li><strong>Granice serwisu:</strong> Szerokie (zewnętrzna linia to pole), lecz krótkie (tylna linia deblowa to aut).</li>
        <li><strong>Granice wymiany:</strong> Po odebraniu serwisu cały kort wraz ze wszystkimi korytarzami jest w grze.</li>
        <li><strong>Rotacja serwisu:</strong> Drużyna serwująca zmienia pola tylko wtedy, gdy sama zdobędzie punkt przy własnym podaniu.</li>
        <li><strong>Odbiór serwisu:</strong> Wyłącznie wyznaczony zawodnik stojący po przekątnej może odebrać serwis.</li>
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
  ],
  pl: [
    {
      tag: "Główny cios ofensywny",
      title: "Smecz z forhendu (Forehand Smash)",
      body: "Podstawowa broń kończąca w badmintonie. Uderzany z głębi kortu pod ostrym kątem w dół z maksymalną siłą, mający na celu natychmiastowe zdobycie punktu lub wymuszenie łatwej piłki. Kluczowa technika obejmuje wysokie uniesienie łokcia, dynamiczną pronację przedramienia i uderzenie lotki w najwyższym punkcie przed sobą.",
      tip: "Kąt uderzenia jest ważniejszy niż czysta siła. Ostry smecz skierowany w linię lub w biodro rakietowe przeciwnika jest znacznie trudniejszy do obrony niż płaski, szybki strzał."
    },
    {
      tag: "Uderzenie taktyczne i zmyłka",
      title: "Skrót / Drop Shot",
      body: "Doskonale zamaskowany zamachem identycznym jak przy smeczu lub lobie, lecz w ostatniej chwili rakieta zwalnia lub lekko ścina lotkę, sprawiając, że spada ona tuż za siatkę po stronie rywala.",
      tip: "Utrzymuj zamach nie do odróżnienia od smeczu aż do ułamka sekundy przed uderzeniem. Element zaskoczenia wytrąca rywala z równowagi i otwiera głębię kortu."
    },
    {
      tag: "Uderzenie defensywne i reset",
      title: "Lob / Clear znad głowy (Overhead Clear)",
      body: "Wysokie i głębokie zagranie posyłające lotkę aż pod samą tylną linię przeciwnika. Stosowane w obronie, aby zyskać czas na powrót do centrum kortu, lub w ataku, by minąć przeciwnika stojącego zbyt blisko siatki.",
      tip: "Upewnij się, że Twój lob dolatuje do tylnej linii. Zbyt krótki lob na środek kortu to dla rywala idealna okazja do łatwego smeczu."
    },
    {
      tag: "Błyskawiczne dobicie przy siatce",
      title: "Dobicie przy siatce / Net Kill",
      body: "Wykonywane, gdy przeciwnik zagra lotkę zbyt wysoko ponad taśmę siatki. Zamiast pełnego zamachu, używa się krótkiego, szybkiego strzału z nadgarstka, by wbić lotkę prosto w podłogę rywala.",
      tip: "Nigdy nie dotknij siatki rakietą ani ciałem (jest to błąd). Ruch powinien być krótki i precyzyjny niczym muśnięcie pędzlem."
    },
    {
      tag: "Szybka wymiana pozioma",
      title: "Drajw / Płaskie uderzenie (Drive)",
      body: "Płaskie, szybkie uderzenie przelatujące tuż nad taśmą siatki z półkortu na półkort. Niezwykle istotne w deblu do przejęcia kontroli nad atakiem bez konieczności unoszenia lotki w górę.",
      tip: "Utrzymuj nisko środek ciężkości na ugiętych nogach, trzymaj rakietę uniesioną przed klatką piersiową i wykorzystuj szybkie pchnięcia przedramieniem."
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
  },
  pl: {
    servingBadge: "🏸 Serwuje",
    rightSide: "Prawe",
    leftSide: "Lewe",
    serverHint: (name, side) => `Serwis: ${name} (${side} pole)`,
    gameOver: (winner, sA, sB) => `🏆 <strong>Koniec meczu!</strong> ${winner} wygrywa ${sA} - ${sB}! Kliknij Resetuj, aby zagrać ponownie.`,
    gamePoint: "🔥 <strong>Punkt setowy (Game Point)!</strong> Następny punkt może rozstrzygnąć seta.",
    deuce: (sA, sB) => `⚔️ <strong>Równowaga (${sA}-${sB})!</strong> Wymagana przewaga 2 punktów (maksymalnie do 30).`,
    inProgress: "Gramy do 21 punktów (przewaga 2 pkt, limit do 30). Każda wymiana daje punkt."
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
  {
    "id": 1,
    "category": "Shots",
    "answer": 3,
    "i18n": {
      "en": {
        "question": "Which shot is considered the primary attacking weapon in badminton, hit with steep downward trajectory and maximum power?",
        "options": [
          "The Clear",
          "The Drive",
          "The Net Kill",
          "The Forehand Smash"
        ],
        "explanation": "The forehand smash is badminton's ultimate kill shot, struck steeply downward at speeds exceeding 400 km/h."
      },
      "vi": {
        "question": "Cú đánh nào được coi là vũ khí tấn công chủ lực trong cầu lông, có quỹ đạo cắm dốc và uy lực tối đa?",
        "options": [
          "Cú phông cầu (Clear)",
          "Cú tạt cầu (Drive)",
          "Cú vồ lưới (Net Kill)",
          "Cú đập cầu thuận tay (Forehand Smash)"
        ],
        "explanation": "Cú đập cầu thuận tay là cú dứt điểm tối thượng, cắm dốc với vận tốc vượt hơn 400 km/h."
      },
      "zh": {
        "question": "哪种击球手法被公认为羽毛球最具威胁的主攻武器，击球弧度陡峭下压且爆发力最强？",
        "options": [
          "高远球 (The Clear)",
          "平抽球 (The Drive)",
          "扑网球 (The Net Kill)",
          "正手杀球 (The Forehand Smash)"
        ],
        "explanation": "正手杀球是羽毛球的终极进攻手段，以超过 400 km/h 的超高球速笔直向下轰击对手场地。"
      },
      "id": {
        "question": "Pukulan mana yang dianggap sebagai senjata serangan utama dalam bulutangkis, dengan lintasan menukik tajam dan tenaga maksimal?",
        "options": [
          "The Clear (Lob)",
          "The Drive",
          "The Net Kill (Sambar Net)",
          "The Forehand Smash"
        ],
        "explanation": "Forehand smash adalah pukulan mematikan utama, menukik tajam ke bawah dengan kecepatan melebihi 400 km/jam."
      },
      "pl": {
        "question": "Które uderzenie jest uważane za główną broń ofensywną w badmintonie, wykonywane ze stromą trajektorią w dół i maksymalną siłą?",
        "options": [
          "Klar (The Clear)",
          "Drive (Płaskie uderzenie)",
          "Dobicie przy siatce (Net Kill)",
          "Smecz z forhendu (Forehand Smash)"
        ],
        "explanation": "Smecz z forhendu to najgroźniejszy atak kończący, uderzany ostro w dół z prędkościami przekraczającymi 400 km/h."
      }
    }
  },
  {
    "id": 2,
    "category": "Shots",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "What is the defining characteristic of a drop shot in badminton?",
        "options": [
          "A powerful downward smash from the backcourt",
          "A high defensive lob to the baseline",
          "A deceptive shot that drops steeply just over the net",
          "A flat horizontal exchange at mid-court height"
        ],
        "explanation": "A drop shot is disguised with a full smash wind-up but decelerated at contact so it dips sharply right past the net."
      },
      "vi": {
        "question": "Đặc điểm nhận diện chính của cú bỏ nhỏ (drop shot) trong cầu lông là gì?",
        "options": [
          "Cú đập cầu cực mạnh từ cuối sân",
          "Cú lốp cầu phòng thủ sâu về vạch đáy",
          "Cú đánh đánh lừa điểm rơi sát mép lưới đối phương",
          "Pha đôi công giằng co ngang ngực ở giữa sân"
        ],
        "explanation": "Cú bỏ nhỏ ngụy trang bằng động tác mở vợt đập cầu nhưng hãm lực lúc chạm cầu khiến cầu rơi sát mép lưới."
      },
      "zh": {
        "question": "羽毛球中吊球 (Drop Shot) 最显著的技术特征是什么？",
        "options": [
          "后场势大力沉的下压杀球",
          "防守性高远挑球至底线",
          "动作极具隐蔽性、恰好擦网而过的贴网坠落球",
          "中场平抽快推互攻"
        ],
        "explanation": "吊球通常假装全力杀球，但在触球刹那减速切削，让球轻巧精准地飘落紧贴球网。"
      },
      "id": {
        "question": "Apa ciri khas utama dari pukulan drop shot dalam bulutangkis?",
        "options": [
          "Smash keras dari garis belakang",
          "Lob bertahan tinggi ke baseline",
          "Pukulan tipuan yang jatuh tipis dan menukik tepat di depan net",
          "Pukulan datar mendatar di area tengah lapangan"
        ],
        "explanation": "Drop shot disamarkan dengan ayunan smash penuh namun diperlambat saat kontak sehingga jatuh tepat di bibir net."
      },
      "pl": {
        "question": "Jaka jest charakterystyczna cecha skrótu (drop shot) w badmintonie?",
        "options": [
          "Potężny smecz z głębi kortu",
          "Wysoki obronny lob pod linię końcową",
          "Zwodnicze uderzenie opadające stromo tuż za siatkę",
          "Płaska pozioma wymiana na środku kortu"
        ],
        "explanation": "Skrót markuje zamach do smeczu, lecz w chwili kontaktu zwalnia, przez co lotka opada tuż za taśmę siatki."
      }
    }
  },
  {
    "id": 3,
    "category": "Shots",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is a 'net kill' (or net brush) in badminton?",
        "options": [
          "Smashing the shuttle straight at the opponent's chest",
          "A sharp, compact wrist flick to drive a loose high net return steeply down",
          "A deceptive shot disguised as a lob",
          "Blocking a smash into the side alley"
        ],
        "explanation": "A net kill is played when the opponent lifts or leaves a return high above the net tape — a quick brush down finishes the rally immediately."
      },
      "vi": {
        "question": "Cú 'vồ lưới' (net kill) trong cầu lông là gì?",
        "options": [
          "Đập cầu thẳng vào ngực đối thủ",
          "Cú búng cổ tay nhanh, gọn đè quả cầu bổng trên mép lưới cắm thẳng xuống đất",
          "Cú đánh lừa đối thủ giả làm cú lốp",
          "Chặn quả đập cầu sang hành lang biên"
        ],
        "explanation": "Vồ lưới được thực hiện khi đối thủ trả cầu lỏng lẻo nổi cao hơn mép lưới, một cú vuốt nhanh kết thúc pha cầu ngay lập tức."
      },
      "zh": {
        "question": "羽毛球中的“扑网球” (Net Kill / Net Brush) 指的是什么？",
        "options": [
          "直接大力杀向对手胸口",
          "手腕轻巧快速下压，将对手过网偏高、浮动的还击直接下扑终结",
          "假装挑高球的骗人假动作",
          "将杀球精准格挡至双打边线"
        ],
        "explanation": "当对手回球高于球网白带时，上前迅速利用手腕微发力将球向下扑死，直接结束争夺。"
      },
      "id": {
        "question": "Apa yang dimaksud dengan 'net kill' (sambar net) dalam bulutangkis?",
        "options": [
          "Melakukan smash lurus ke arah dada lawan",
          "Sentakan pergelangan tangan cepat untuk menyambar shuttlecock tanggung di atas net",
          "Pukulan tipuan menyamar sebagai lob",
          "Memblokir smash ke lorong samping"
        ],
        "explanation": "Net kill dilakukan saat lawan mengembalikan bola tanggung di atas bibir net — sambaran cepat langsung mengakhiri reli."
      },
      "pl": {
        "question": "Czym jest 'dobicie przy siatce' (net kill) w badmintonie?",
        "options": [
          "Mocny smecz prosto w klatkę piersiową rywala",
          "Szybki, krótki ruch nadgarstkiem ściągający w dół wysoką lotkę przy taśmie",
          "Zwodnicze uderzenie udające loba",
          "Zablokowanie smeczu w korytarz deblowy"
        ],
        "explanation": "Net kill wykonuje się, gdy przeciwnik odda zbyt wysoką lotkę nad siatką — szybkie ścięcie w dół natychmiast kończy wymianę."
      }
    }
  },
  {
    "id": 4,
    "category": "Shots",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is the primary tactical purpose of a high defensive overhead clear?",
        "options": [
          "To score an immediate clean winner",
          "To push the opponent deep to their baseline and buy recovery time to reset position",
          "To spin the shuttle so it tumbles over the tape",
          "To force the opponent to play a backhand drive"
        ],
        "explanation": "The defensive clear sends the shuttle high and deep to the opponent's backcourt, giving you time to return to the centre base."
      },
      "vi": {
        "question": "Mục đích chiến thuật chính của cú phông cầu phòng thủ (high defensive clear) là gì?",
        "options": [
          "Ghi điểm trực tiếp ngay lập tức",
          "Đẩy đối thủ lùi sâu về vạch đáy và kéo dài thời gian để hồi phục vị trí trung tâm",
          "Làm cho quả cầu xoay lật qua mép lưới",
          "Buộc đối phương phải đánh cú tạt trái tay"
        ],
        "explanation": "Cú phông cầu đưa quả cầu bay cao và sâu về cuối sân đối thủ, giúp bạn có đủ thời gian trở lại vị trí trung tâm."
      },
      "zh": {
        "question": "头顶防守性高远球 (High Defensive Clear) 最主要的战术目的是什么？",
        "options": [
          "争取直接一拍得分",
          "将对手压制到底线最深处，为自己争取重返中心位置的回动时间",
          "使球剧烈旋转翻滚掠过球网",
          "逼迫对手只能使用反手平抽球"
        ],
        "explanation": "防守高远球将球又高又深地击向后场底线，为被动的自己赢得充足回防与调整节奏的时间。"
      },
      "id": {
        "question": "Apa tujuan taktis utama dari pukulan lob bertahan tinggi (defensive clear)?",
        "options": [
          "Mencetak poin bersih seketika",
          "Mendorong lawan jauh ke garis belakang dan memberi waktu untuk kembali ke posisi tengah",
          "Membuat shuttlecock bergulir di bibir net",
          "Memaksa lawan memainkan drive backhand"
        ],
        "explanation": "Defensive clear melambungkan bola tinggi dan jauh ke belakang, memberi Anda waktu berharga untuk kembali ke titik tengah."
      },
      "pl": {
        "question": "Jaki jest główny cel taktyczny wysokiego defensywnego klara (clear)?",
        "options": [
          "Natychmiastowe zdobycie punktu",
          "Odepchnięcie rywala pod linię końcową i zyskanie czasu na powrót do środka",
          "Nadanie lotce rotacji, by koziołkowała po taśmie",
          "Wymuszenie na rywalu płaskiego uderzenia z bekhendu"
        ],
        "explanation": "Klar obronny posyła lotkę wysoko i głęboko pod linię końcową rywala, dając czas na powrót do pozycji wyjściowej."
      }
    }
  },
  {
    "id": 5,
    "category": "Shots",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is a 'drive' shot in badminton?",
        "options": [
          "A high looping shot to the baseline",
          "A flat, rapid shot skimming horizontally just over the net tape",
          "A steep downward smash from midcourt",
          "A delicate slice drop into the corner"
        ],
        "explanation": "A drive is a fast, flat exchange hit at chest/waist level, critical in doubles to keep pressure without lifting."
      },
      "vi": {
        "question": "Cú 'tạt cầu' (drive) trong cầu lông là gì?",
        "options": [
          "Đường cầu cầu vồng bay cao về vạch đáy",
          "Cú đánh cầu bay ngang sát mép lưới, tốc độ nhanh ở tầm ngực hoặc thắt lưng",
          "Cú đập cầu dốc từ giữa sân",
          "Pha cắt cầu bỏ nhỏ tinh tế vào góc sân"
        ],
        "explanation": "Cú tạt cầu là pha đánh nhanh, ngang tầm ngực giúp duy trì sức ép liên tục trong đánh đôi mà không phải nâng bổng cầu."
      },
      "zh": {
        "question": "羽毛球中的“平抽球” (Drive Shot) 是怎样的球路？",
        "options": [
          "向底线飞行的超高弧线高球",
          "平直、快速、紧贴球网白带水平飞行的快速球",
          "从中场发力的陡峭下压杀球",
          "轻柔切入边角的贴网滑板吊球"
        ],
        "explanation": "平抽球是在胸腹高度击出的快速平飞球，在双打快节奏对抗中至关重要，能在不挑高球的前提下压制对手。"
      },
      "id": {
        "question": "Apa itu pukulan 'drive' dalam bulutangkis?",
        "options": [
          "Pukulan melambung tinggi ke garis belakang",
          "Pukulan cepat dan mendatar yang meluncur tepat di atas bibir net",
          "Smash menukik tajam dari tengah lapangan",
          "Drop shot halus yang dislice ke sudut lapangan"
        ],
        "explanation": "Drive adalah pukulan cepat setinggi dada/pinggang yang krusial di ganda untuk terus menekan tanpa melambungkan kok."
      },
      "pl": {
        "question": "Czym charakteryzuje się uderzenie 'drive' w badmintonie?",
        "options": [
          "Wysoką paraboliczną trajektorią pod linię końcową",
          "Płaskim, błyskawicznym lotem tuż nad taśmą siatki",
          "Ostrym uderzeniem w dół ze środka kortu",
          "Delikatnym ściętym skrótem w narożnik"
        ],
        "explanation": "Drive to szybka, płaska wymiana na wysokości klatki piersiowej, kluczowa w deblu do wywierania ciągłej presji."
      }
    }
  },
  {
    "id": 6,
    "category": "Shots",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is a 'flick serve'?",
        "options": [
          "A low, gentle serve aimed at the front line",
          "A deceptive serve that looks like a low serve but suddenly whips high and deep to the rear court",
          "A side-sliced serve into the doubles alley",
          "A serve where the racket contacts the feathers first"
        ],
        "explanation": "A flick serve disguises a low serve stance but uses a fast wrist snap to propel the shuttle over the receiver's head."
      },
      "vi": {
        "question": "Cú 'giao cầu búng' (flick serve) là gì?",
        "options": [
          "Giao cầu ngắn nhẹ nhàng vào sát vạch giao cầu ngắn",
          "Cú giao cầu ngụy trang giống giao ngắn nhưng bất ngờ búng cổ tay đẩy sâu về cuối sân",
          "Cú giao cầu chém xoáy vào hành lang đôi",
          "Cú giao cầu mà mặt vợt chạm vào lông cầu trước"
        ],
        "explanation": "Flick serve dùng tư thế giao cầu ngắn đánh lừa đối phương, rồi dùng cổ tay búng vọt qua tầm với đối thủ."
      },
      "zh": {
        "question": "羽毛球中的“偷后场发球” (Flick Serve) 指的是什么？",
        "options": [
          "精准落向前发球线的低平发网前小球",
          "动作伪装成发网前，但在出手瞬间抖腕将球急速弹挑至对方后场底线",
          "斜切发入双打外侧边线的发球",
          "拍面直接击中羽毛而非软木托的犯规发球"
        ],
        "explanation": "偷后场发球保持发网前球的准备站位与动作，突然手腕发力将球弹出过顶，令抢网接发者措手不及。"
      },
      "id": {
        "question": "Apa itu servis 'flick serve'?",
        "options": [
          "Servis pendek pelan tepat ke garis depan",
          "Servis tipuan yang tampak seperti servis pendek namun tiba-tiba dihentakkan tinggi ke belakang",
          "Servis slice menyamping ke garis ganda",
          "Servis di mana raket mengenai bulu terlebih dahulu"
        ],
        "explanation": "Flick serve menyamar sebagai servis pendek namun memakai sentakan pergelangan tangan untuk melambungkan bola ke belakang."
      },
      "pl": {
        "question": "Czym jest 'flick serve' (serwis szybki/pędny)?",
        "options": [
          "Niskim, krótkim serwisem tuż za przednią linię serwisową",
          "Zwodniczym serwisem pozorującym krótki serwis, nagle posyłającym lotkę wysoko w tył kortu",
          "Ściętym serwisem w boczny korytarz deblowy",
          "Serwisem, w którym rakieta uderza najpierw w pióra"
        ],
        "explanation": "Flick serve markuje krótki serwis, po czym gwałtowny ruch nadgarstka przerzuca lotkę nad głową rywala."
      }
    }
  },
  {
    "id": 7,
    "category": "Shots",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What biomechanical motion generates the majority of power in an overhead badminton smash?",
        "options": [
          "Bending the knees backward",
          "Forearm pronation and rapid wrist snap at high contact point",
          "Locking the elbow completely straight throughout the swing",
          "Swinging the arm with a stiff wrist like a tennis serve"
        ],
        "explanation": "Forearm pronation (internal rotation) combined with wrist extension/flexion creates the whipping racket speed needed for a 400+ km/h smash."
      },
      "vi": {
        "question": "Chuyển động cơ sinh học nào tạo ra phần lớn uy lực trong cú đập cầu trên cao?",
        "options": [
          "Gập đầu gối ngược về sau",
          "Động tác sấp cẳng tay (pronation) và vung cổ tay dứt khoát tại điểm tiếp xúc trên cao",
          "Khóa thẳng cùi chỏ trong suốt cú vung",
          "Vung cánh tay với cổ tay cứng nhắc như giao bóng quần vợt"
        ],
        "explanation": "Chuyển động sấp cẳng tay kết hợp chuyển động cổ tay tạo ra hiệu ứng đòn bẩy quất cực nhanh để đạt tốc độ trên 400 km/h."
      },
      "zh": {
        "question": "在羽毛球大力跳杀中，主要依靠哪种生物力学动作爆发最强击球速度？",
        "options": [
          "膝关节向后弯曲",
          "前臂内旋 (Pronation) 配合高点击球瞬间的手腕极速发力",
          "在整个挥拍轨迹中将肘部完全锁死伸直",
          "像网球发球一样手腕紧绷僵硬地摆臂"
        ],
        "explanation": "前臂内旋与手腕鞭打动作能在极短距离内激发出最高拍头速度，这是产生 400+ km/h 超强球速的核心机制。"
      },
      "id": {
        "question": "Gerakan biomekanik apa yang menghasilkan tenaga terbesar pada smash overhead bulutangkis?",
        "options": [
          "Menekuk lutut ke belakang",
          "Pronasi lengan bawah dan sentakan pergelangan tangan cepat pada titik kontak tinggi",
          "Mengunci siku lurus kaku sepanjang ayunan",
          "Mengayunkan lengan dengan pergelangan tangan kaku seperti servis tenis"
        ],
        "explanation": "Pronasi lengan bawah (rotasi ke dalam) dan sentakan pergelangan tangan menghasilkan efek pecutan raket di atas 400 km/jam."
      },
      "pl": {
        "question": "Jaki ruch biomechaniczny generuje większość siły w smeczu z góry w badmintonie?",
        "options": [
          "Zginanie kolan w tył",
          "Pronacja przedramienia i błyskawiczne zgięcie nadgarstka w najwyższym punkcie",
          "Zablokowanie łokcia w prostej pozycji przez cały zamach",
          "Prowadzenie ramienia ze sztywnym nadgarstkiem jak w tenisie"
        ],
        "explanation": "Pronacja przedramienia (rotacja do wewnątrz) wraz z ruchem nadgarstka nadaje rakiecie przyspieszenie biczowe (ponad 400 km/h)."
      }
    }
  },
  {
    "id": 8,
    "category": "Shots",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is a 'cross-court sliced drop' shot?",
        "options": [
          "Hitting the shuttle flat across the diagonal at head height",
          "Slicing across the shuttlecock at an angle to create deceptive spin, altered trajectory, and deceleration",
          "Hitting the cork with the racket frame deliberately",
          "A backhand clear hit with an open racket face"
        ],
        "explanation": "Slicing the racket face across the cork creates friction and angle deception, making the shuttle dive diagonally across court."
      },
      "vi": {
        "question": "Cú 'chém cầu bỏ nhỏ chéo sân' (cross-court sliced drop) là gì?",
        "options": [
          "Đánh quả cầu bay phẳng theo đường chéo ngang đầu",
          "Chém mặt vợt xiên qua đế cầu tạo độ xoáy, đổi hướng và hãm tốc độ bất ngờ",
          "Cố tình dùng khung vợt gõ vào nút bần",
          "Cú phông cầu trái tay với mặt vợt mở rộng"
        ],
        "explanation": "Việc chém nghiêng mặt vợt tạo ma sát và đánh lừa hướng mắt, khiến quả cầu đột ngột chúc xuống góc chéo sân đối diện."
      },
      "zh": {
        "question": "羽毛球中的“对角滑板/切削吊球” (Cross-court Sliced Drop) 是什么打法？",
        "options": [
          "在头部高度水平击打对角线平抽球",
          "斜向切削羽毛球软木托表面，制造欺骗性旋转、变轨并迅速衰减球速",
          "故意用球拍边框撞击软木球托",
          "以开放拍面击出的反手高远球"
        ],
        "explanation": "拍面以特定夹角与球托摩擦切削，既能掩盖真实出手角度，又能让球越网后突然失速垂直下坠至对角网前。"
      },
      "id": {
        "question": "Apa itu pukulan 'cross-court sliced drop'?",
        "options": [
          "Memukul kok datar menyilang setinggi kepala",
          "Menyayat (slice) kepala kok secara miring untuk memberi putaran tipuan, lintasan berbelok, dan perlambatan",
          "Memukul gabus dengan frame raket secara sengaja",
          "Clear backhand dengan daun raket terbuka"
        ],
        "explanation": "Gesekan menyudut pada kepala shuttlecock menghasilkan efek belok dan perlambatan mengejutkan ke sudut seberang."
      },
      "pl": {
        "question": "Czym jest 'skrót ścięty po przekątnej' (cross-court sliced drop)?",
        "options": [
          "Płaskim uderzeniem po przekątnej na wysokości głowy",
          "Ścięciem rakietą pod kątem tworzącym zwodniczą rotację, zmianę toru lotu i nagłe wyhamowanie",
          "Świadomym uderzeniem ramy rakiety w korek",
          "Bekhendowym klarem z otwartą płaszczyzną rakiety"
        ],
        "explanation": "Ścięcie piór i korka pod kątem tworzy rotację i zwód kierunkowy, sprawiając, że lotka gwałtownie opada po przekątnej."
      }
    }
  },
  {
    "id": 9,
    "category": "Shots",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "When executing a tight tumbling net shot, how should the racket face make contact with the shuttle?",
        "options": [
          "With a heavy downward hammer smash",
          "Gently slicing or brushing under the cork to induce a tumbling spin over the tape",
          "With a full follow-through pointing to the floor",
          "By pushing the shuttle with two hands on the grip"
        ],
        "explanation": "Brushing under the shuttle cork creates a tumbling motion that forces the opponent to lift from below net height."
      },
      "vi": {
        "question": "Khi thực hiện cú vê cầu lật lưới (tumbling net shot), mặt vợt cần tiếp xúc cầu thế nào?",
        "options": [
          "Đập mạnh xuống như cây búa",
          "Vuốt nhẹ hoặc chém khéo léo dưới đế cầu khiến quả cầu lộn nhào sát mép lưới",
          "Vung hết tay chúc thẳng xuống sàn",
          "Đẩy cầu bằng cả hai tay trên cán vợt"
        ],
        "explanation": "Xoa hoặc vuốt nhẹ đáy cầu tạo chuyển động lộn vòng qua mép lưới, buộc đối thủ phải cứu cầu ở vị trí cực kỳ thấp."
      },
      "zh": {
        "question": "在高质量搓球/滚网球 (Tumbling Net Shot) 击球瞬间，拍面应当如何接触球体？",
        "options": [
          "像锤子般向下猛砸",
          "轻盈切削或从球托底部轻轻揉抹擦出，促使球体翻滚翻越球网白带",
          "随挥动作完全指向地面",
          "双手握柄全力前推"
        ],
        "explanation": "轻柔地摩擦球托下沿可让球在空中产生剧烈的翻转滚动，对手被迫在网线极低位置被动起高球。"
      },
      "id": {
        "question": "Saat melakukan pukulan netting tipis bergulir (tumbling net shot), bagaimana raket menyentuh kok?",
        "options": [
          "Dengan smash keras mengayun ke bawah",
          "Mengiris halus atau menggesek bagian bawah gabus agar kok berputar bergulir tipis di atas bibir net",
          "Ayunan penuh menghadap lantai",
          "Mendorong kok dengan dua tangan pada grip"
        ],
        "explanation": "Gesekan lembut di bawah gabus menciptakan putaran bergulir yang memaksa lawan mengangkat bola dari bawah."
      },
      "pl": {
        "question": "W jaki sposób rakieta powinna uderzyć lotkę przy ciasnym skrócie przy siatce (tumbling net shot)?",
        "options": [
          "Mocnym uderzeniem młotkowym w dół",
          "Delikatnym podcięciem lub muśnięciem pod korkiem wywołującym koziołkowanie lotki nad taśmą",
          "Pełnym zamachem skierowanym ku podłodze",
          "Oburęcznym pchnięciem rakiety w przód"
        ],
        "explanation": "Muśnięcie korka od dołu nadaje lotce rotację koziołkującą, zmuszając przeciwnika do trudnego podniesienia lotki z dołu."
      }
    }
  },
  {
    "id": 10,
    "category": "Shots",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is the purpose of an attacking 'punch clear' (or flat attacking clear)?",
        "options": [
          "To lift the shuttle as high as the arena ceiling",
          "To quickly push the shuttle over the opponent's reach into deep court before they can retreat",
          "To gently drop the shuttle on the short service line",
          "To hit the shuttle deliberately out of bounds"
        ],
        "explanation": "An attacking clear has a lower, flatter trajectory than a defensive clear, catching the opponent flat-footed and off balance."
      },
      "vi": {
        "question": "Mục đích của cú 'bắn cầu tấn công' (punch clear / attacking clear) là gì?",
        "options": [
          "Nâng cầu bổng chạm trần nhà thi đấu",
          "Đẩy cầu bay nhanh qua đầu tầm với của đối thủ về góc sân sâu trước khi họ kịp lùi",
          "Thả nhẹ cầu vào vạch giao cầu ngắn",
          "Đánh cầu cố ý ra ngoài biên"
        ],
        "explanation": "Cú phông tấn công có đường bay phẳng và nhanh hơn phông phòng thủ, khiến đối thủ bị bất ngờ và mất đà di chuyển."
      },
      "zh": {
        "question": "羽毛球中的“平高球 / 攻击性平快高球” (Punch Clear) 的实战目的是什么？",
        "options": [
          "将球高高挑起直到接近场馆天花板",
          "弧线平准快速飞越对手头顶拦截范围直扑底线，令其来不及后退回防",
          "轻柔地将球落在前发球线上",
          "故意将球击打至界外"
        ],
        "explanation": "平高球轨迹比传统高远球更为平直迅猛，能以迅雷不及掩耳之势打乱对手重心，抢占后场主动权。"
      },
      "id": {
        "question": "Apa tujuan dari pukulan 'punch clear' (lob serang mendatar)?",
        "options": [
          "Melambungkan kok setinggi langit-langit gedung",
          "Mendorong kok cepat melampaui jangkauan lawan ke sudut belakang sebelum mereka sempat mundur",
          "Menjatuhkan kok perlahan di garis servis pendek",
          "Memukul kok sengaja keluar garis"
        ],
        "explanation": "Attacking clear memiliki lintasan lebih rendah dan melaju kencang, mengejutkan lawan dan merusak keseimbangan gerak mereka."
      },
      "pl": {
        "question": "Jaki jest cel ofensywnego klara płaskiego (punch clear / attacking clear)?",
        "options": [
          "Wybicie lotki pod sam sufit hali",
          "Szybkie przerzucenie lotki nad zasięgiem rywala w głąb kortu zanim zdąży się cofnąć",
          "Delikatne opuszczenie lotki na przednią linię serwisową",
          "Świadome wybicie lotki na aut"
        ],
        "explanation": "Ofensywny klar ma niższą i znacznie szybszą trajektorię niż klar obronny, zaskakując rywala i spychając go do defensywy."
      }
    }
  },
  {
    "id": 11,
    "category": "Rules",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "Which of these is NOT considered a fault in competitive badminton?",
        "options": [
          "Touching the net with your racket or body during a rally",
          "The shuttle landing on any part of the boundary line",
          "Hitting the shuttle twice consecutively in one stroke",
          "The shuttle striking the arena ceiling or wall"
        ],
        "explanation": "In badminton, the line is IN bounds. The shuttle must land completely outside the boundary lines to be called 'out'."
      },
      "vi": {
        "question": "Trường hợp nào sau đây KHÔNG bị coi là phạm lỗi trong thi đấu cầu lông?",
        "options": [
          "Chạm vợt hoặc cơ thể vào lưới khi cầu đang trong cuộc",
          "Quả cầu rơi chạm vào bất kỳ phần nào của vạch biên",
          "Đánh cầu hai lần liên tiếp trong một cú đánh",
          "Quả cầu chạm trần nhà thi đấu hoặc tường biên"
        ],
        "explanation": "Trong cầu lông, cầu chạm vạch tính là TRONG SÂN. Quả cầu phải rơi hoàn toàn ra ngoài vạch mới bị tính là ra ngoài."
      },
      "zh": {
        "question": "在正规羽毛球比赛中，以下哪种情况不属于违例/犯规 (Fault)？",
        "options": [
          "在死球前球拍或身体任何部位触碰球网",
          "羽毛球落点击中场地界线的任何部分",
          "一次挥拍中连续击中两次羽毛球 (连击)",
          "羽毛球触碰场馆天花板或场边墙壁"
        ],
        "explanation": "在羽毛球规则中，压线球一律判界内。只有球体完全落在边界线外侧才判为出界。"
      },
      "id": {
        "question": "Manakah dari hal berikut yang BUKAN merupakan pelanggaran (fault) dalam bulutangkis?",
        "options": [
          "Menyentuh net dengan raket atau tubuh selama reli berlangsung",
          "Shuttlecock mendarat menyentuh bagian mana pun dari garis batas",
          "Memukul kok dua kali berturut-turut dalam satu pukulan",
          "Kok mengenai langit-langit gedung atau dinding"
        ],
        "explanation": "Dalam bulutangkis, bola yang menyentuh garis dinyatakan MASUK (in). Kok harus mendarat sepenuhnya di luar garis untuk dinyatakan keluar."
      },
      "pl": {
        "question": "Która z poniższych sytuacji NIE jest uważana za błąd w badmintonie wyczynowym?",
        "options": [
          "Dotknięcie siatki rakietą lub ciałem podczas trwania wymiany",
          "Lądowanie lotki na jakiejkolwiek części linii kortu",
          "Dwukrotne odbicie lotki w jednym uderzeniu",
          "Uderzenie lotki o sufit lub ścianę hali"
        ],
        "explanation": "W badmintonie linia jest polem gry (IN). Lotka musi wylądować całkowicie poza liniami kortu, aby był aut."
      }
    }
  },
  {
    "id": 12,
    "category": "Rules",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "What happens if a player touches the net with their racket, body, or clothing during an active rally?",
        "options": [
          "A let is called and the point is replayed",
          "Play continues until the shuttle hits the floor",
          "It is an immediate fault and the opponent wins the point",
          "A warning is issued on the first offence"
        ],
        "explanation": "Touching the net with racket, body, or apparel while the shuttle is in play is an immediate fault."
      },
      "vi": {
        "question": "Điều gì sẽ xảy ra nếu người chơi chạm vợt, thân thể hoặc quần áo vào lưới khi cầu đang đánh?",
        "options": [
          "Trọng tài cho đánh lại quả cầu (let)",
          "Pha cầu tiếp tục cho đến khi cầu chạm sàn",
          "Tính lỗi ngay lập tức và đối thủ được cộng điểm",
          "Nhắc nhở cảnh cáo ở lần phạm lỗi đầu tiên"
        ],
        "explanation": "Chạm vào lưới bằng vợt, thân thể hay trang phục khi cầu đang trong cuộc là lỗi trực tiếp và mất điểm."
      },
      "zh": {
        "question": "比赛进行中，如果运动员的球拍、身体或衣服触及球网，裁判将作何判罚？",
        "options": [
          "判重发球 (Let) 重新打这一分",
          "比赛继续直到羽毛球落地为止",
          "直接判定触网违例，判对手得分",
          "第一次发生仅给予口头警告"
        ],
        "explanation": "在球处于比赛状态（活球）期间，球拍、身体或衣服触及球网或其支撑物均构成触网违例，直接失分。"
      },
      "id": {
        "question": "Apa akibatnya jika pemain menyentuh net dengan raket, tubuh, atau pakaiannya saat reli berlangsung?",
        "options": [
          "Terjadi let dan reli dimainkan ulang",
          "Permainan berlanjut hingga kok menyentuh lantai",
          "Terjadi pelanggaran langsung dan lawan mendapat poin",
          "Diberikan peringatan pada pelanggaran pertama"
        ],
        "explanation": "Menyentuh net dengan raket, badan, atau baju saat bola hidup adalah pelanggaran langsung dan poin untuk lawan."
      },
      "pl": {
        "question": "Co się dzieje, gdy zawodnik dotknie siatki rakietą, ciałem lub strojem podczas trwania akcji?",
        "options": [
          "Ogłaszany jest 'let' i punkt jest powtarzany",
          "Gra toczy się dalej, dopóki lotka nie spadnie na kort",
          "Jest to natychmiastowy błąd i rywal zdobywa punkt",
          "Przy pierwszym przewinieniu zawodnik otrzymuje upomnienie"
        ],
        "explanation": "Dotknięcie siatki rakietą, ciałem lub ubiorem podczas wymiany stanowi natychmiastowy błąd punktowy."
      }
    }
  },
  {
    "id": 13,
    "category": "Rules",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "Can a player reach across the net to hit the shuttle before it has passed over to their side?",
        "options": [
          "Yes, whenever they can reach it",
          "No, it is a fault to strike the shuttle before it crosses the net plane",
          "Yes, but only in doubles play",
          "Yes, as long as their racket does not hit the net"
        ],
        "explanation": "You cannot strike the shuttle until it has crossed into your court plane. Doing so is an obstruction / over-the-net fault."
      },
      "vi": {
        "question": "Người chơi có được đưa vợt qua lưới để đánh cầu trước khi quả cầu bay sang phần sân mình không?",
        "options": [
          "Được, bất cứ khi nào với tới cầu",
          "Không, đánh cầu trước khi cầu vượt qua mặt phẳng lưới là phạm lỗi qua lưới",
          "Được, nhưng chỉ trong đánh đôi",
          "Được, miễn là vợt không chạm vào lưới"
        ],
        "explanation": "Bạn không được đánh quả cầu khi nó chưa bay qua mặt phẳng lưới sang bên sân của mình."
      },
      "zh": {
        "question": "羽毛球尚未飞跃球网垂直平面来到己方场地前，选手能否过网击球？",
        "options": [
          "可以，只要能够得着球即可",
          "不可以，在球越过球网前击球属于过网击球违例",
          "可以，但仅限双打比赛",
          "可以，前提是球拍绝不触碰到球网"
        ],
        "explanation": "击球点必须在己方场地一侧。在球越过球网之前击球属于过网击球犯规。"
      },
      "id": {
        "question": "Bolehkah pemain menjangkau melintasi net untuk memukul kok sebelum melewati bidang net ke lapangannya?",
        "options": [
          "Boleh, kapan saja raket dapat menjangkaunya",
          "Tidak boleh, memukul kok sebelum melewati bidang net adalah pelanggaran (fault)",
          "Boleh, tetapi hanya pada pertandingan ganda",
          "Boleh, asalkan raket tidak menyentuh net"
        ],
        "explanation": "Titik kontak pertama harus berada di sisi lapangan sendiri. Memukul bola sebelum menyeberang adalah pelanggaran over-the-net."
      },
      "pl": {
        "question": "Czy zawodnik może sięgnąć rakietą nad siatką i uderzyć lotkę, zanim ta przekroczy płaszczyznę siatki?",
        "options": [
          "Tak, zawsze gdy ma odpowiedni zasięg",
          "Nie, uderzenie lotki przed przekroczeniem siatki jest błędem",
          "Tak, ale tylko w grze podwójnej",
          "Tak, pod warunkiem że rakieta nie dotknie siatki"
        ],
        "explanation": "Kontakt z lotką musi nastąpić po własnej stronie siatki. Uderzenie po stronie rywala to błąd (przełożenie rakiety)."
      }
    }
  },
  {
    "id": 14,
    "category": "Rules",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "Is it legal for a player's racket to follow through across the net plane after hitting the shuttle on their own side?",
        "options": [
          "No, any part of the racket crossing the net is always a fault",
          "Yes, provided contact occurred on their own side and the net was not touched",
          "Only during a smash, not during net play",
          "Only if the umpire grants permission"
        ],
        "explanation": "A follow-through may cross the net plane as long as the initial point of contact was on your side and you did not touch or obstruct the net."
      },
      "vi": {
        "question": "Quán tính vung vợt theo cầu (follow-through) qua mặt phẳng lưới sau khi đã chạm cầu ở bên sân mình có hợp lệ không?",
        "options": [
          "Không, bất kỳ phần nào của vợt vượt qua lưới đều là lỗi",
          "Hợp lệ, miễn là điểm chạm cầu ở bên sân mình và vợt không chạm lưới",
          "Chỉ hợp lệ khi đập cầu, không áp dụng trên lưới",
          "Chỉ được phép nếu trọng tài chính đồng ý"
        ],
        "explanation": "Đà vung vợt được phép theo cầu qua lưới miễn là điểm tiếp xúc đầu tiên ở bên sân mình và không cản trở đối thủ."
      },
      "zh": {
        "question": "如果在己方场区击球后，球拍由于击球随挥惯性顺势越过球网平面，这合乎规则吗？",
        "options": [
          "违例，球拍任何部分过网一律判犯规",
          "合法，只要击球点在己方一侧且没有触网或阻碍对手",
          "仅在杀球时合法，网前击球违规",
          "必须得到主裁判口头同意才有效"
        ],
        "explanation": "只要击球瞬间触球点在己方场区，击球后顺势随挥过网不违例（前提是没有碰网、没有妨碍对手还击）。"
      },
      "id": {
        "question": "Apakah ayunan lanjutan raket (follow-through) sah jika melintasi net setelah memukul kok di sisi sendiri?",
        "options": [
          "Tidak, setiap bagian raket yang melintasi net adalah pelanggaran",
          "Sah, asalkan kontak terjadi di sisi sendiri dan tidak menyentuh net",
          "Hanya sah saat smash, bukan saat permainan net",
          "Hanya jika diizinkan oleh wasit"
        ],
        "explanation": "Follow-through boleh melintasi net asalkan titik sentuh awal berada di area sendiri dan tidak menghalangi lawan."
      },
      "pl": {
        "question": "Czy rakieta może przejść nad siatką w fazie wykończenia zamachu (follow-through) po uderzeniu lotki po własnej stronie?",
        "options": [
          "Nie, jakiekolwiek przekroczenie siatki rakietą to błąd",
          "Tak, pod warunkiem że uderzenie nastąpiło po własnej stronie i nie dotknięto siatki",
          "Tylko przy smeczu, niedozwolone przy siatce",
          "Tylko za zgodą sędziego prowadzącego"
        ],
        "explanation": "Wykończenie uderzenia może przekroczyć siatkę, o ile punkt kontaktu nastąpił po własnej stronie i nie przeszkodzono rywalowi."
      }
    }
  },
  {
    "id": 15,
    "category": "Rules",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is a 'let' under official BWF rules?",
        "options": [
          "A penalty point awarded to the receiver",
          "A ruling that halts play and replays the rally without awarding a point",
          "A fault committed during the service delivery",
          "An automatic win of the game for unsportsmanlike conduct"
        ],
        "explanation": "A 'let' halts play without penalty or point — such as when an unforeseen disturbance occurs or the shuttle breaks mid-rally."
      },
      "vi": {
        "question": "'Quả giao lại' (let) theo luật BWF chính thức là gì?",
        "options": [
          "Điểm phạt trao cho bên đỡ giao cầu",
          "Quyết định dừng trận đấu và đánh lại pha cầu mà không bên nào bị trừ hay cộng điểm",
          "Lỗi phạm phải trong lúc giao cầu",
          "Chiến thắng ván đấu do đối thủ có hành vi phi thể thao"
        ],
        "explanation": "'Let' tạm dừng pha cầu và cho đánh lại mà không cộng điểm, áp dụng khi có sự cố bất ngờ hoặc cầu bị hỏng."
      },
      "zh": {
        "question": "BWF 官方羽毛球规则中的“重发球” (Let) 代表什么？",
        "options": [
          "判给接发球方的惩罚性罚分",
          "暂停比赛并重新进行本回合，不计得分或失分的判罚",
          "发球动作过程中的发球违例",
          "因对手缺乏体育道德行为而直接获胜"
        ],
        "explanation": "当发生突发意外（如相邻场地飞来羽毛球、球体中途散架破碎等）时，裁判宣布 Let，重新开始该分对决。"
      },
      "id": {
        "question": "Apa arti 'let' menurut peraturan resmi BWF?",
        "options": [
          "Poin penalti yang diberikan kepada penerima servis",
          "Keputusan menghentikan permainan dan mengulang reli tanpa ada poin",
          "Pelanggaran yang dilakukan saat melakukan servis",
          "Kemenangan otomatis akibat perilaku tidak sportif"
        ],
        "explanation": "'Let' menghentikan permainan tanpa ada penalti atau poin — misalnya jika ada gangguan tak terduga atau kok rusak."
      },
      "pl": {
        "question": "Czym jest 'let' (powtórka) według oficjalnych przepisów BWF?",
        "options": [
          "Punktem karnym przyznanym odbierającemu",
          "Zatrzymaniem gry i powtórzeniem wymiany bez przyznawania punktu",
          "Błędem popełnionym w trakcie wykonywania serwisu",
          "Automatyczną wygraną za niesportowe zachowanie"
        ],
        "explanation": "'Let' wstrzymuje grę bez konsekwencji punktowych — np. gdy na kort wpadnie obca lotka lub lotka pęknie podczas gry."
      }
    }
  },
  {
    "id": 16,
    "category": "Rules",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "Under current BWF service rules, at what height must the shuttlecock be struck during a serve?",
        "options": [
          "Any height as long as the racket head points downward",
          "The entire shuttle must be below 1.15 metres from the court surface at contact",
          "Above the server's shoulder",
          "Level with the top of the net"
        ],
        "explanation": "Under BWF fixed-height service law (Law 9.1.5), the entire shuttle must be below 1.15 metres from the court surface at the moment of contact."
      },
      "vi": {
        "question": "Theo luật giao cầu BWF hiện hành, quả cầu phải được đánh ở độ cao tối đa bao nhiêu khi tiếp xúc vợt?",
        "options": [
          "Độ cao bất kỳ miễn là đầu vợt chúc xuống",
          "Toàn bộ quả cầu phải ở dưới 1,15 mét tính từ mặt sân lúc chạm vợt",
          "Phải ở phía trên vai người giao cầu",
          "Ngang bằng với mép trên cùng của lưới"
        ],
        "explanation": "Theo luật giao cầu cố định độ cao BWF (Luật 9.1.5), toàn bộ quả cầu phải ở dưới mức 1,15 m tại thời điểm tiếp xúc."
      },
      "zh": {
        "question": "根据世界羽联 (BWF) 现行发球规则，击球瞬间羽毛球的高度有何具体硬性限制？",
        "options": [
          "只要拍头朝下，任何高度均可",
          "在击球瞬间，整只羽毛球必须低于地面 1.15 米高度",
          "必须高于发球员肩部",
          "必须与球网顶端完全平齐"
        ],
        "explanation": "BWF 现行的发球定高规则（规则 9.1.5）明确规定：在击球瞬间，球的整体必须低于距场地地面 1.15 米高度。"
      },
      "id": {
        "question": "Menurut aturan servis BWF saat ini, pada ketinggian berapa kok harus dipukul saat servis?",
        "options": [
          "Ketinggian berapa pun asalkan kepala raket mengarah ke bawah",
          "Seluruh bagian kok harus berada di bawah 1,15 meter dari permukaan lapangan saat disentuh",
          "Di atas bahu pelaku servis",
          "Sejajar dengan puncak bibir net"
        ],
        "explanation": "Berdasarkan aturan batas tinggi tetap BWF (Law 9.1.5), seluruh shuttlecock harus berada di bawah 1,15 meter saat dipukul."
      },
      "pl": {
        "question": "Zgodnie z aktualnymi przepisami BWF, na jakiej maksymalnej wysokości musi nastąpić kontakt z lotką przy serwisie?",
        "options": [
          "Na dowolnej wysokości, o ile główka rakiety jest skierowana w dół",
          "Cała lotka musi znajdować się poniżej 1,15 metra od powierzchni kortu",
          "Powyżej barku serwującego",
          "Równo z górną krawędzią siatki"
        ],
        "explanation": "Zgodnie z zasadą stałej wysokości serwisu BWF (art. 9.1.5), cała lotka w chwili uderzenia musi być poniżej 1,15 m od kortu."
      }
    }
  },
  {
    "id": 17,
    "category": "Rules",
    "answer": 0,
    "i18n": {
      "en": {
        "question": "What must both the server and receiver do with their feet until the serve is struck?",
        "options": [
          "Keep parts of both feet in stationary contact with the court surface inside their service boxes",
          "They may run forward as soon as the server's arm starts moving",
          "One foot must be lifted completely off the ground",
          "Both feet must be touching the boundary lines"
        ],
        "explanation": "Both feet of the server and receiver must remain stationary and on the floor inside their respective service courts until the serve is hit."
      },
      "vi": {
        "question": "Cả người giao cầu và người nhận giao cầu phải làm gì với hai bàn chân cho tới khi quả giao cầu được đánh đi?",
        "options": [
          "Giữ một phần của cả hai bàn chân tiếp xúc cố định với mặt sân bên trong ô giao cầu",
          "Được phép chạy lên ngay khi tay người giao cầu bắt đầu vung",
          "Một bàn chân bắt buộc phải nhấc hoàn toàn khỏi mặt đất",
          "Cả hai bàn chân phải giẫm lên các vạch biên"
        ],
        "explanation": "Hai bàn chân của người giao và người nhận giao cầu phải đứng yên trên mặt sân bên trong ô quy định cho tới lúc cầu rời vợt."
      },
      "zh": {
        "question": "在发球员球拍击中羽毛球之前，发球员和接发球员的双脚必须满足什么规则条件？",
        "options": [
          "双脚的部分区域必须保持静止接触场区地面，且不得触碰界线",
          "只要发球员手臂一开始摆动即可向前奔跑抢网",
          "必须有一只脚完全悬空抬离地面",
          "双脚必须踩在发球区的边界线上"
        ],
        "explanation": "发球及接发双方在发球触球前，双脚必须保持部分区域静止贴地且完全处于各自发球区内，不得踩线或移动。"
      },
      "id": {
        "question": "Apa yang harus dilakukan pelaku servis dan penerima dengan kedua kakinya hingga servis dipukul?",
        "options": [
          "Menjaga kedua kaki tetap menyentuh lantai tanpa bergerak di dalam kotak servis masing-masing",
          "Boleh langsung berlari maju begitu tangan server mulai bergerak",
          "Salah satu kaki harus terangkat sepenuhnya dari lantai",
          "Kedua kaki harus menginjak garis batas"
        ],
        "explanation": "Kedua kaki server dan receiver harus tetap diam menyentuh lantai di dalam kotak servis masing-masing hingga kok dipukul."
      },
      "pl": {
        "question": "Co muszą zrobić serwujący i odbierający ze stopami do momentu uderzenia serwisu?",
        "options": [
          "Utrzymywać kontakt obu stóp z podłożem w pozycji nieruchomej wewnątrz własnego pola serwisowego",
          "Mogą biec do przodu, gdy tylko serwujący rozpocznie ruch ramieniem",
          "Jedna noga musi być całkowicie uniesiona nad ziemię",
          "Obie stopy muszą dotykać linii kortu"
        ],
        "explanation": "Do momentu uderzenia serwisu obie stopy obu graczy muszą pozostać nieruchome na korcie, bez dotykania linii."
      }
    }
  },
  {
    "id": 18,
    "category": "Rules",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What happens if the server swings and completely misses the shuttlecock on the serve?",
        "options": [
          "The server gets a second try (like in tennis)",
          "It is a service fault and the opponent wins the rally and point",
          "A let is automatically called",
          "The umpire flips a coin"
        ],
        "explanation": "Unlike tennis, there is no second serve in badminton. Missing the shuttle entirely is an immediate fault and costs a point."
      },
      "vi": {
        "question": "Điều gì sẽ xảy ra nếu người giao cầu vung vợt nhưng hụt hoàn toàn quả cầu khi giao?",
        "options": [
          "Người giao cầu được thực hiện lại lần hai (như trong quần vợt)",
          "Đó là lỗi giao cầu và đối thủ được cộng điểm cùng quyền giao cầu",
          "Trọng tài cho giao lại (let)",
          "Trọng tài tung đồng xu để quyết định"
        ],
        "explanation": "Khác với tennis, cầu lông không có giao cầu lần 2. Đánh hụt cầu khi đã thực hiện động tác giao là mất điểm."
      },
      "zh": {
        "question": "在发球过程中，发球员挥拍但完全没有击中羽毛球（空拍），判罚是什么？",
        "options": [
          "发球方享有第二次发球机会（类似网球二发）",
          "构成发球违例，对手直接赢得本回合得分与发球权",
          "主裁判自动宣布重发球 (Let)",
          "通过掷硬币决定归属"
        ],
        "explanation": "羽毛球比赛没有二发机会。一旦开始向前挥拍而完全未击中球，直接判定发球违例并失分。"
      },
      "id": {
        "question": "Apa akibatnya jika server mengayunkan raket dan meleset sepenuhnya tidak mengenai kok saat servis?",
        "options": [
          "Server mendapat kesempatan servis kedua (seperti tenis)",
          "Pelanggaran servis dan lawan memenangkan reli serta mendapat poin",
          "Otomatis dinyatakan let",
          "Wasit melempar koin"
        ],
        "explanation": "Dalam bulutangkis tidak ada servis kedua. Meleset memukul kok saat servis adalah pelanggaran langsung dan kehilangan poin."
      },
      "pl": {
        "question": "Co się dzieje, gdy serwujący wykona zamach i całkowicie minie się z lotką podczas serwisu?",
        "options": [
          "Otrzymuje drugą próbę serwisu (jak w tenisie)",
          "Jest to błąd serwisu i przeciwnik zdobywa punkt oraz serwis",
          "Automatycznie ogłaszana jest powtórka ('let')",
          "Sędzia rzuca monetą"
        ],
        "explanation": "W badmintonie nie ma drugiego serwisu. Nietrafienie w lotkę podczas próby serwisu jest natychmiastowym błędem i stratą punktu."
      }
    }
  },
  {
    "id": 19,
    "category": "Rules",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "Can a player deliberately distract, shout, or gesture to obstruct an opponent before they hit the shuttle?",
        "options": [
          "Yes, psychological distraction is part of the game",
          "No, it is an illegal obstruction / fault",
          "Only the receiver is allowed to shout",
          "Yes, but only in doubles communication"
        ],
        "explanation": "Deliberately shouting, waving, or making actions to distract the opponent while they are striking the shuttle is a fault (Law 13.4.4)."
      },
      "vi": {
        "question": "Người chơi có được phép cố tình la hét, làm cử chỉ gây phân tâm đối thủ trước khi họ đánh cầu không?",
        "options": [
          "Được, đòn tâm lý là một phần của trò chơi",
          "Không, đó là hành vi cản trở trái luật và bị xử phạt lỗi",
          "Chỉ bên đỡ giao cầu mới được phép hét",
          "Được, nhưng chỉ trong việc trao đổi giữa đôi vận động viên"
        ],
        "explanation": "Cố ý la hét hoặc có cử chỉ đánh lạc hướng đối phương khi họ đang chuẩn bị chạm cầu là lỗi cản trở (Luật 13.4.4)."
      },
      "zh": {
        "question": "在对手即将击球时，选手能否故意大声呼喊、大幅挥手干扰或阻碍对手击球？",
        "options": [
          "可以，心理战干扰属于竞技比赛的一部分",
          "不可以，属于故意妨碍对手的违例犯规 (Fault)",
          "仅接发球员有权大声呼喊",
          "可以，但仅限双打搭档内部交流"
        ],
        "explanation": "在对手准备击球时以大喊、跺脚或故意手势扰乱其视听均属严重违例（规则 13.4.4）。"
      },
      "id": {
        "question": "Bolehkah pemain sengaja mengalihkan perhatian, berteriak, atau membuat gestur untuk mengganggu lawan sebelum memukul kok?",
        "options": [
          "Boleh, perang urat syaraf adalah bagian dari olahraga",
          "Tidak boleh, itu adalah gangguan terlarang / pelanggaran (fault)",
          "Hanya penerima servis yang boleh berteriak",
          "Boleh, tetapi hanya untuk komunikasi ganda"
        ],
        "explanation": "Sengaja berteriak atau membuat gerakan mengganggu saat lawan hendak memukul adalah pelanggaran gangguan (Law 13.4.4)."
      },
      "pl": {
        "question": "Czy zawodnik może celowo rozpraszać, krzyczeć lub gestykulować, aby utrudnić rywalowi uderzenie lotki?",
        "options": [
          "Tak, presja psychologiczna to element gry",
          "Nie, jest to nieprzepisowe przeszkadzanie i błąd punktowy",
          "Tylko odbierający ma prawo krzyczeć",
          "Tak, ale tylko w komunikacji deblowej"
        ],
        "explanation": "Celowe krzyki, gesty lub rozpraszanie rywala w chwili wykonywania uderzenia to przewinienie (art. 13.4.4)."
      }
    }
  },
  {
    "id": 20,
    "category": "Rules",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "If the shuttlecock disintegrates or the cork separates from the feathers mid-rally, what is the call?",
        "options": [
          "The rally continues with whatever piece lands first",
          "A fault against whoever hit it last",
          "A let is called and the rally is replayed with a fresh shuttle",
          "The point goes to the receiver"
        ],
        "explanation": "Under BWF Law 14.2.4, if the shuttle completely disintegrates mid-rally, a let must be called immediately."
      },
      "vi": {
        "question": "Nếu quả cầu bị rách nát hoàn toàn hoặc núm bần rơi tách rời khỏi phần lông giữa pha cầu, phán quyết là gì?",
        "options": [
          "Pha cầu tiếp tục tính theo mảnh nào rơi xuống trước",
          "Xử lỗi người chạm vào quả cầu cuối cùng",
          "Trọng tài hô 'let' và cho đánh lại pha cầu bằng quả cầu mới",
          "Điểm thuộc về bên nhận giao cầu"
        ],
        "explanation": "Theo Luật 14.2.4 của BWF, nếu quả cầu bị rách bung hoặc đế bần tách rời giữa pha bóng, trận đấu phải dừng và đánh lại (let)."
      },
      "zh": {
        "question": "在对拉过程中，如果羽毛球严重损毁散架或软木底托与羽毛彻底脱离，裁判应如何判罚？",
        "options": [
          "比赛继续，以最先落地的残片判定界内或界外",
          "判处最后击球的选手违例失分",
          "立即判重发球 (Let)，更换新球重新对决",
          "直接判接发球方得分"
        ],
        "explanation": "根据 BWF 规则 14.2.4，在回合进行中球体完全解体散架，裁判必须立即宣判重发球。"
      },
      "id": {
        "question": "Jika shuttlecock hancur atau gabusnya terlepas dari bulu di tengah reli, apa keputusannya?",
        "options": [
          "Reli berlanjut berdasarkan bagian mana yang jatuh lebih dulu",
          "Pelanggaran terhadap pemain yang memukul terakhir",
          "Dinyatakan let dan reli diulang dengan shuttlecock baru",
          "Poin diberikan kepada penerima"
        ],
        "explanation": "Berdasarkan BWF Law 14.2.4, jika shuttlecock hancur saat reli berlangsung, wasit harus menyatakan let."
      },
      "pl": {
        "question": "Jeśli lotka rozpadnie się lub korek odłączy się od piór w trakcie wymiany, jaka jest decyzja sędziego?",
        "options": [
          "Wymiana toczy się dalej zależnie od tego, która część spadnie pierwsza",
          "Błąd przeciwko graczowi, który uderzył jako ostatni",
          "Ogłaszany jest 'let' i akcja jest powtarzana nową lotką",
          "Punkt otrzymuje odbierający"
        ],
        "explanation": "Zgodnie z art. 14.2.4 BWF, jeśli lotka ulegnie zniszczeniu/rozpadowi w trakcie gry, natychmiast ogłasza się powtórkę ('let')."
      }
    }
  },
  {
    "id": 21,
    "category": "Scoring",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "How many points are required to win a standard game in BWF badminton?",
        "options": [
          "11 points",
          "15 points",
          "21 points (leading by at least 2 points)",
          "25 points"
        ],
        "explanation": "A standard game is won by the first side to score 21 points with a margin of at least 2 points."
      },
      "vi": {
        "question": "Cần bao nhiêu điểm để thắng một hiệp đấu tiêu chuẩn theo thể thức BWF?",
        "options": [
          "11 điểm",
          "15 điểm",
          "21 điểm (cách biệt ít nhất 2 điểm)",
          "25 điểm"
        ],
        "explanation": "Một ván đấu tiêu chuẩn kết thúc khi một bên đạt 21 điểm trước và phải cách đối thủ tối thiểu 2 điểm."
      },
      "zh": {
        "question": "在 BWF 正式羽毛球比赛中，赢得一局标准比赛需要得到多少分？",
        "options": [
          "11 分",
          "15 分",
          "21 分 (且必须领先对手至少 2 分)",
          "25 分"
        ],
        "explanation": "标准比赛采取 21 分制，最先得到 21 分且净胜至少 2 分的一方赢得该局。"
      },
      "id": {
        "question": "Berapa poin yang dibutuhkan untuk memenangkan satu gim standar dalam bulutangkis BWF?",
        "options": [
          "11 poin",
          "15 poin",
          "21 poin (dengan selisih minimal 2 poin)",
          "25 poin"
        ],
        "explanation": "Gim standar dimenangkan oleh pihak yang pertama kali mencapai 21 poin dengan selisih minimal 2 poin."
      },
      "pl": {
        "question": "Ile punktów potrzeba, aby wygrać standardowego seta w badmintonie BWF?",
        "options": [
          "11 punktów",
          "15 punktów",
          "21 punktów (z przewagą co najmniej 2 punktów)",
          "25 punktów"
        ],
        "explanation": "Seta wygrywa strona, która jako pierwsza zdobędzie 21 punktów z przewagą co najmniej 2 punktów."
      }
    }
  },
  {
    "id": 22,
    "category": "Scoring",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "In a match tied at 20-20 (deuce), what is the maximum score cap a game can reach?",
        "options": [
          "25-24",
          "28-26",
          "30-29 (first to 30 points wins)",
          "No cap, play continues indefinitely until a 2-point lead"
        ],
        "explanation": "If the score reaches 29-29, the side scoring the 30th point wins the game (30-29). The score is never extended past 30."
      },
      "vi": {
        "question": "Trong tình thế hòa 20-20 (deuce), điểm số tối đa mà một ván đấu có thể chạm tới là bao nhiêu?",
        "options": [
          "25-24",
          "28-26",
          "30-29 (bên chạm 30 điểm trước sẽ thắng)",
          "Không giới hạn, đấu tiếp đến khi cách nhau 2 điểm"
        ],
        "explanation": "Nếu tỷ số chạm 29-29, bên nào ghi điểm thứ 30 trước sẽ thắng ván đấu đó (30-29). Điểm không bao giờ vượt quá 30."
      },
      "zh": {
        "question": "当比分战至 20-20 平局加分时，单局比赛能够达到的最高封顶比分是多少？",
        "options": [
          "25-24",
          "28-26",
          "30-29 (最先拿到第 30 分者获胜)",
          "无上限，必须无限制打到净胜 2 分为止"
        ],
        "explanation": "若战至 29-29，加分规则终止，最先拿到第 30 分的一方以 30-29 胜出，决不进行无限制延长。"
      },
      "id": {
        "question": "Dalam keadaan imbang 20-20 (setting/deuce), berapa batas skor maksimal yang dapat dicapai dalam satu gim?",
        "options": [
          "25-24",
          "28-26",
          "30-29 (pencapai poin ke-30 menang)",
          "Tanpa batas, lanjut sampai selisih 2 poin tercapai"
        ],
        "explanation": "Jika skor mencapai 29-29, pihak yang pertama meraih poin ke-30 memenangkan gim (30-29). Skor tidak pernah melebihi 30."
      },
      "pl": {
        "question": "Przy stanie 20-20 (gra na przewagi), jaki jest maksymalny możliwy limit punktowy w secie?",
        "options": [
          "25-24",
          "28-26",
          "30-29 (kto pierwszy zdobędzie 30. punkt, wygrywa)",
          "Brak limitu, gra toczy się do 2 punktów przewagi bez końca"
        ],
        "explanation": "Przy stanie 29-29 strona zdobywająca 30. punkt wygrywa seta (30-29). Gra nigdy nie przekracza 30 punktów."
      }
    }
  },
  {
    "id": 23,
    "category": "Scoring",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "Under the BWF rally-point scoring system, how are points awarded?",
        "options": [
          "Only the serving side can score points",
          "Every single rally winner scores a point regardless of who served",
          "Points are awarded only after two consecutive rally wins",
          "The receiver gets 2 points if they win the rally"
        ],
        "explanation": "Under the rally point system (introduced in 2006), whoever wins the rally wins the point and the right to serve."
      },
      "vi": {
        "question": "Theo hệ thống tính điểm trực tiếp (rally-point) của BWF, điểm số được tính như thế nào?",
        "options": [
          "Chỉ bên giao cầu mới có quyền ghi điểm",
          "Bên thắng pha cầu ghi 1 điểm bất kể ai là người giao cầu",
          "Điểm chỉ được tính khi thắng 2 pha cầu liên tiếp",
          "Bên nhận giao cầu được 2 điểm nếu thắng pha cầu"
        ],
        "explanation": "Với hệ thống tính điểm trực tiếp, bất kỳ bên nào thắng pha cầu đều được cộng 1 điểm và quyền giao cầu tiếp theo."
      },
      "zh": {
        "question": "在 BWF 每球得分制 (Rally Point System) 下，积分是如何判定的？",
        "options": [
          "只有手握发球权的一方才能得分",
          "无论谁发球，赢得该回合对决的一方均直接计得 1 分",
          "只有连胜两个回合才能计得 1 分",
          "接发球方胜出可直接获得 2 分"
        ],
        "explanation": "自 2006 年引入每球得分制以来，每回合胜者直接获得 1 分并赢取下一分的发球权。"
      },
      "id": {
        "question": "Dalam sistem penilaian rally point BWF, bagaimana poin diberikan?",
        "options": [
          "Hanya pihak yang melakukan servis yang dapat mencetak poin",
          "Setiap pemenang reli mencetak satu poin terlepas dari siapa yang servis",
          "Poin hanya diberikan setelah menang reli dua kali beruntun",
          "Penerima servis mendapat 2 poin jika memenangkan reli"
        ],
        "explanation": "Di bawah sistem rally point, siapa pun yang memenangkan reli berhak atas 1 poin dan giliran servis berikutnya."
      },
      "pl": {
        "question": "W systemie punktacji 'rally point' BWF, w jaki sposób przyznawane są punkty?",
        "options": [
          "Tylko strona serwująca może zdobywać punkty",
          "Każdy zwycięzca wymiany zdobywa punkt, niezależnie od tego, kto serwował",
          "Punkty przyznaje się tylko po wygraniu dwóch wymian z rzędu",
          "Odbierający otrzymuje 2 punkty za wygraną wymianę"
        ],
        "explanation": "W systemie rally point każda wygrana wymiana daje punkt oraz prawo do serwisu, bez względu na to, kto serwował."
      }
    }
  },
  {
    "id": 24,
    "category": "Scoring",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "How many games are played in a standard official badminton match?",
        "options": [
          "Best of 1 single game to 30",
          "Best of 3 games to 21",
          "Best of 5 games to 15",
          "Best of 3 games to 15"
        ],
        "explanation": "All standard BWF matches are best-of-three games. The first to win two games wins the match."
      },
      "vi": {
        "question": "Một trận đấu cầu lông chính thức tiêu chuẩn gồm bao nhiêu hiệp?",
        "options": [
          "1 ván duy nhất chạm 30 điểm",
          "Thi đấu 3 ván thắng 2 (mỗi ván 21 điểm)",
          "Thi đấu 5 ván thắng 3 (mỗi ván 15 điểm)",
          "Thi đấu 3 ván thắng 2 (mỗi ván 15 điểm)"
        ],
        "explanation": "Các trận đấu chính thức của BWF đều diễn ra theo thể thức 3 ván thắng 2, mỗi ván 21 điểm."
      },
      "zh": {
        "question": "一场正式国际羽毛球比赛通常采用怎样的赛制局数？",
        "options": [
          "一局决胜负 30 分制",
          "三局两胜制（每局 21 分）",
          "五局三胜制（每局 15 分）",
          "三局两胜制（每局 15 分）"
        ],
        "explanation": "所有标准 BWF 赛事均采用三局两胜制 (Best of 3)，率先赢得两局者获得整场比赛胜利。"
      },
      "id": {
        "question": "Berapa banyak gim yang dimainkan dalam pertandingan bulutangkis resmi standar?",
        "options": [
          "Satu gim tunggal hingga 30 poin",
          "Best of 3 gim hingga 21 poin (mencari 2 kemenangan)",
          "Best of 5 gim hingga 15 poin",
          "Best of 3 gim hingga 15 poin"
        ],
        "explanation": "Pertandingan resmi BWF menggunakan format best-of-three (tiga gim mencari dua kemenangan) hingga 21 poin."
      },
      "pl": {
        "question": "Ile setów rozgrywa się w standardowym oficjalnym meczu badmintona?",
        "options": [
          "Jeden decydujący set do 30 punktów",
          "Do 2 wygranych setów z 3 (każdy do 21 punktów)",
          "Do 3 wygranych setów z 5 (każdy do 15 punktów)",
          "Do 2 wygranych setów z 3 (każdy do 15 punktów)"
        ],
        "explanation": "Oficjalne mecze BWF rozgrywane są w formacie do dwóch wygranych setów (best-of-three) do 21 punktów."
      }
    }
  },
  {
    "id": 25,
    "category": "Scoring",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "In singles, which service court does the server serve from when their score is EVEN (0, 2, 4, 6...)?",
        "options": [
          "Left service court",
          "Right service court",
          "Either court of their choice",
          "The back tramline"
        ],
        "explanation": "Even score = Right service court. At 0-0, the match always begins from the right service court."
      },
      "vi": {
        "question": "Trong đánh đơn, người giao cầu đứng ở ô giao cầu nào khi điểm của họ là CHẴN (0, 2, 4, 6...)?",
        "options": [
          "Ô giao cầu bên trái",
          "Ô giao cầu bên phải",
          "Tùy chọn một trong hai ô",
          "Hành lang vạch đáy"
        ],
        "explanation": "Điểm chẵn = Ô giao cầu bên phải. Khi bắt đầu trận đấu với tỷ số 0-0, người giao cầu luôn đứng ở ô bên phải."
      },
      "zh": {
        "question": "在单打比赛中，当发球员得分为偶数（0, 2, 4, 6...）时，应在哪个发球区发球？",
        "options": [
          "左半区发球区",
          "右半区发球区",
          "任意挑选一侧发球区",
          "后场双打发球线后方"
        ],
        "explanation": "偶数分从右半区发球，奇数分从左半区发球。比赛开局 0-0 时一律从右发球区开球。"
      },
      "id": {
        "question": "Di tunggal, dari kotak servis mana server melakukan servis saat skornya GENAP (0, 2, 4, 6...)?",
        "options": [
          "Kotak servis kiri",
          "Kotak servis kanan",
          "Bebas memilih kotak mana saja",
          "Garis belakang lapangan"
        ],
        "explanation": "Skor genap = Kotak servis kanan. Pada kedudukan 0-0, pertandingan selalu dimulai dari kotak kanan."
      },
      "pl": {
        "question": "W grze pojedynczej, z którego pola serwuje zawodnik, gdy jego wynik jest PARZYSTY (0, 2, 4, 6...)?",
        "options": [
          "Z lewego pola serwisowego",
          "Z prawego pola serwisowego",
          "Z dowolnie wybranego pola",
          "Zza tylnej linii kortu"
        ],
        "explanation": "Parzysty wynik = prawe pole serwisowe. Przy stanie 0-0 mecz zawsze zaczyna się z prawego pola."
      }
    }
  },
  {
    "id": 26,
    "category": "Scoring",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "In singles, which service court does the server serve from when their score is ODD (1, 3, 5, 7...)?",
        "options": [
          "Right service court",
          "Left service court",
          "From the centre 'T' line",
          "Opposite to where the receiver stands"
        ],
        "explanation": "Odd score = Left service court. When the server has an odd score, they deliver from the left box."
      },
      "vi": {
        "question": "Trong đánh đơn, người giao cầu đứng ở ô giao cầu nào khi điểm của họ là LẺ (1, 3, 5, 7...)?",
        "options": [
          "Ô giao cầu bên phải",
          "Ô giao cầu bên trái",
          "Đứng trên vạch chữ T trung tâm",
          "Đối diện với vị trí người đỡ cầu đang đứng"
        ],
        "explanation": "Điểm lẻ = Ô giao cầu bên trái. Khi điểm số của người giao cầu là số lẻ, họ sẽ phát cầu từ ô bên trái."
      },
      "zh": {
        "question": "在单打比赛中，当发球员得分为奇数（1, 3, 5, 7...）时，应在哪个发球区发球？",
        "options": [
          "右半区发球区",
          "左半区发球区",
          "正中“T”字形中线上",
          "接发球员站立的相对侧"
        ],
        "explanation": "得分奇数站在左半区发球，发往对手的左半区接发球区（对角发球）。"
      },
      "id": {
        "question": "Di tunggal, dari kotak servis mana server melakukan servis saat skornya GANJIL (1, 3, 5, 7...)?",
        "options": [
          "Kotak servis kanan",
          "Kotak servis kiri",
          "Dari garis tengah T",
          "Berlawanan dengan posisi penerima"
        ],
        "explanation": "Skor ganjil = Kotak servis kiri. Saat skor pelaku servis ganjil, servis dilakukan dari kotak kiri ke kotak kiri lawan."
      },
      "pl": {
        "question": "W grze pojedynczej, z którego pola serwuje zawodnik, gdy jego wynik jest NIEPARZYSTY (1, 3, 5, 7...)?",
        "options": [
          "Z prawego pola serwisowego",
          "Z lewego pola serwisowego",
          "Ze środkowej linii 'T'",
          "Naprzeciwko pozycji odbierającego"
        ],
        "explanation": "Nieparzysty wynik = lewe pole serwisowe. Serwis posyłany jest po przekątnej na lewe pole rywala."
      }
    }
  },
  {
    "id": 27,
    "category": "Scoring",
    "answer": 0,
    "i18n": {
      "en": {
        "question": "In the third deciding game of a match, at what score do players switch ends of the court?",
        "options": [
          "When either side first reaches 11 points",
          "When the score is tied at 10-10",
          "At 15 points",
          "Ends are never switched during the third game"
        ],
        "explanation": "In the third game, players switch ends when the leading side first reaches 11 points."
      },
      "vi": {
        "question": "Trong ván đấu thứ ba quyết định, hai bên đổi sân khi điểm số chạm mức nào?",
        "options": [
          "Khi một bên chạm mốc 11 điểm đầu tiên",
          "Khi tỷ số hòa 10-10",
          "Khi chạm 15 điểm",
          "Không đổi sân trong ván thứ ba"
        ],
        "explanation": "Ở ván 3 (ván quyết định), hai đấu thủ sẽ đổi phần sân thi đấu ngay khi một bên dẫn trước đạt 11 điểm."
      },
      "zh": {
        "question": "在决胜局（第三局）比赛中，进行到什么比分时双方运动员需要交换场区？",
        "options": [
          "当任一方率先达到 11 分时",
          "当双方战成 10-10 平分时",
          "当达到 15 分时",
          "决胜局全场不交换场区"
        ],
        "explanation": "在决胜局中，当领先一方的分数最先达到 11 分时，双方必须交换比赛场区。"
      },
      "id": {
        "question": "Pada gim penentuan ketiga, pada skor berapa pemain bertukar sisi lapangan?",
        "options": [
          "Saat salah satu pihak pertama kali mencapai 11 poin",
          "Saat skor imbang 10-10",
          "Pada skor 15 poin",
          "Pemain tidak bertukar lapangan di gim ketiga"
        ],
        "explanation": "Di gim penentuan (ketiga), kedua pihak berganti sisi lapangan saat salah satu pemain memimpin dan mencapai 11 poin."
      },
      "pl": {
        "question": "W trzecim, decydującym secie meczu, przy jakim wyniku zawodnicy zmieniają strony kortu?",
        "options": [
          "Gdy którakolwiek ze stron jako pierwsza zdobędzie 11 punktów",
          "Gdy wynik wynosi 10-10",
          "Przy 15 punktach",
          "W trzecim secie nie zmienia się stron kortu"
        ],
        "explanation": "W trzecim secie zmiana stron kortu następuje w momencie, gdy prowadzący gracz osiągnie 11 punktów."
      }
    }
  },
  {
    "id": 28,
    "category": "Scoring",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "In doubles, when do partners on the serving team swap their service courts (left/right)?",
        "options": [
          "After every completed rally",
          "Only when their side wins a point on their OWN serve",
          "Whenever the opponents make an unforced error",
          "At the end of every 5-point cycle"
        ],
        "explanation": "The serving team swaps courts only after scoring a point on their own serve. They do NOT swap if they won the serve from the opponents."
      },
      "vi": {
        "question": "Trong đánh đôi, khi nào hai vận động viên của đội giao cầu hoán đổi vị trí ô giao cầu (trái/phải)?",
        "options": [
          "Sau mỗi pha cầu kết thúc",
          "Chỉ khi đội của họ ghi thêm điểm trên chính lượt giao cầu của MÌNH",
          "Bất cứ khi nào đối thủ đánh hỏng",
          "Sau mỗi chu kỳ 5 điểm"
        ],
        "explanation": "Đội giao cầu chỉ đổi ô trái/phải sau khi ghi điểm trên lượt giao bóng của chính mình. Nếu giành lại quyền giao cầu thì không đổi."
      },
      "zh": {
        "question": "在双打比赛中，发球方搭档两人何时需要交换左右发球区？",
        "options": [
          "在每一个回合击球结束后均交换",
          "只有当发球方连续在自己发球局中得分时才交换",
          "只要对手出现非受迫性失误即交换",
          "每打满 5 分周期交换一次"
        ],
        "explanation": "仅当发球方在己方发球轮次成功得分时，发球方搭档两人才交换左右位置继续发球；若只是夺回发球权则不换位。"
      },
      "id": {
        "question": "Di ganda, kapan pasangan di tim yang melakukan servis bertukar kotak servis (kiri/kanan)?",
        "options": [
          "Setelah setiap reli selesai",
          "Hanya saat pihak mereka mencetak poin pada servis MEREKA SENDIRI",
          "Kapan pun lawan melakukan unforced error",
          "Pada setiap kelipatan 5 poin"
        ],
        "explanation": "Pasangan server bertukar posisi hanya setelah meraih poin berturut-turut pada servisnya sendiri."
      },
      "pl": {
        "question": "W grze podwójnej, kiedy partnerzy serwującej pary zamieniają się stronami (lewa/prawa)?",
        "options": [
          "Po każdej zakończonej wymianie",
          "Tylko wtedy, gdy zdobywają punkt przy WŁASNYM serwisie",
          "Zawsze, gdy przeciwnicy popełnią niewymuszony błąd",
          "Po każdych 5 zdobytych punktach"
        ],
        "explanation": "Para serwująca zamienia się polami tylko wtedy, gdy zdobywa kolejny punkt przy własnym serwisie."
      }
    }
  },
  {
    "id": 29,
    "category": "Scoring",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "At 29-29 in an intense deuce situation, how many more points are required to win?",
        "options": [
          "Must win by 2 points (e.g. 32-30)",
          "Just 1 point — whoever scores the 30th point wins immediately",
          "A 5-point tiebreak is played",
          "A coin toss decides the winner"
        ],
        "explanation": "At 29-29, the normal 2-point lead rule is waived. The first side to reach 30 points wins 30-29."
      },
      "vi": {
        "question": "Khi tỷ số hòa 29-29 trong tình huống nghẹt thở, cần ghi thêm bao nhiêu điểm để giành chiến thắng?",
        "options": [
          "Phải cách biệt 2 điểm (ví dụ 32-30)",
          "Chỉ đúng 1 điểm — bên nào ghi điểm thứ 30 sẽ thắng trận ngay lập tức",
          "Thi đấu loạt tie-break 5 điểm",
          "Tung đồng xu quyết định"
        ],
        "explanation": "Ở tỷ số 29-29, quy tắc cách biệt 2 điểm bị bãi bỏ. Bên nào chạm mốc 30 trước sẽ thắng ván đấu với tỷ số 30-29."
      },
      "zh": {
        "question": "当比分胶着至 29-29 的白热化平局时，还需要得到几分才能决出胜负？",
        "options": [
          "必须净胜 2 分（例如打到 32-30）",
          "仅需 1 分 — 谁先抢得第 30 分即刻宣告胜出",
          "进入 5 分制的抢七局决战",
          "掷硬币判定最终胜负"
        ],
        "explanation": "当比分打到 29-29 时，净胜两分的规则失效，最先斩获第 30 分的一方以 30-29 胜出。"
      },
      "id": {
        "question": "Pada kedudukan 29-29 yang sengit, berapa poin lagi yang dibutuhkan untuk menang?",
        "options": [
          "Harus menang dengan selisih 2 poin (misal 32-30)",
          "Hanya butuh 1 poin — siapa pun yang meraih poin ke-30 langsung menang",
          "Memainkan tiebreak 5 poin",
          "Lemparan koin menentukan pemenang"
        ],
        "explanation": "Pada skor 29-29, aturan selisih 2 poin ditiadakan. Pihak yang pertama mencapai 30 poin menang 30-29."
      },
      "pl": {
        "question": "Przy wyniku 29-29, ile jeszcze punktów potrzeba, aby rozstrzygnąć seta?",
        "options": [
          "Należy zdobyć 2 punkty przewagi (np. 32-30)",
          "Tylko 1 punkt — kto zdobędzie 30. punkt, wygrywa natychmiast",
          "Rozgrywany jest 5-punktowy tie-break",
          "Rzut monetą wyłania zwycięzcę"
        ],
        "explanation": "Przy stanie 29-29 wymóg dwóch punktów przewagi nie obowiązuje. Zdobywca 30. punktu wygrywa 30-29."
      }
    }
  },
  {
    "id": 30,
    "category": "Scoring",
    "answer": 0,
    "i18n": {
      "en": {
        "question": "Who serves first at the beginning of the second game in a match?",
        "options": [
          "The side that won the first game",
          "The side that lost the first game",
          "Whoever served first in game 1",
          "Decided by a new coin toss"
        ],
        "explanation": "Under BWF rules, the winner of the previous game always serves first in the following game."
      },
      "vi": {
        "question": "Ai là người giao cầu đầu tiên khi bắt đầu ván đấu thứ hai của trận đấu?",
        "options": [
          "Bên đã thắng ván thi đấu thứ nhất",
          "Bên đã thua ở ván thứ nhất",
          "Người đã giao cầu trước ở ván thứ nhất",
          "Được quyết định bằng việc tung đồng xu lại"
        ],
        "explanation": "Theo luật BWF, bên thắng ván đấu trước đó luôn có quyền giao cầu trước trong ván đấu kế tiếp."
      },
      "zh": {
        "question": "在一场比赛的第二局开始时，由哪一方先行发球？",
        "options": [
          "在第一局比赛中获胜的一方",
          "在第一局比赛中告负的一方",
          "在第一局中最先开球的一方",
          "通过重新抛硬币决定"
        ],
        "explanation": "根据羽毛球规则，上一局获胜的一方在下一局比赛开始时享有率先发球权。"
      },
      "id": {
        "question": "Siapa yang melakukan servis pertama kali pada awal gim kedua dalam pertandingan?",
        "options": [
          "Pihak yang memenangkan gim pertama",
          "Pihak yang kalah di gim pertama",
          "Siapa pun yang servis pertama di gim 1",
          "Ditentukan melalui undian koin baru"
        ],
        "explanation": "Menurut peraturan BWF, pemenang gim sebelumnya selalu melakukan servis terlebih dahulu pada gim berikutnya."
      },
      "pl": {
        "question": "Kto serwuje jako pierwszy na początku drugiego seta meczu?",
        "options": [
          "Strona, która wygrała pierwszego seta",
          "Strona, która przegrała pierwszego seta",
          "Ten, kto serwował pierwszy w secie 1",
          "Decyduje nowy rzut monetą"
        ],
        "explanation": "Według przepisów BWF zwycięzca poprzedniego seta zawsze serwuje jako pierwszy w kolejnym secie."
      }
    }
  },
  {
    "id": 31,
    "category": "Court",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What are the full standard dimensions (length × width) of a doubles badminton court?",
        "options": [
          "12.0 m × 5.5 m",
          "13.4 m × 6.1 m",
          "14.5 m × 7.0 m",
          "13.4 m × 5.18 m"
        ],
        "explanation": "A full badminton court is 13.40 metres long and 6.10 metres wide for doubles."
      },
      "vi": {
        "question": "Kích thước tiêu chuẩn đầy đủ (chiều dài × chiều rộng) của sân cầu lông đánh đôi là bao nhiêu?",
        "options": [
          "12,0 m × 5,5 m",
          "13,4 m × 6,1 m",
          "14,5 m × 7,0 m",
          "13,4 m × 5,18 m"
        ],
        "explanation": "Sân cầu lông đánh đôi tiêu chuẩn có chiều dài là 13,40 mét và chiều rộng là 6,10 mét."
      },
      "zh": {
        "question": "标准羽毛球双打场地的完整尺寸（长 × 宽）是多少？",
        "options": [
          "12.0 米 × 5.5 米",
          "13.4 米 × 6.1 米",
          "14.5 米 × 7.0 米",
          "13.4 米 × 5.18 米"
        ],
        "explanation": "标准双打羽毛球场地全长 13.40 米，总宽度为 6.10 米。"
      },
      "id": {
        "question": "Berapa ukuran standar lengkap (panjang × lebar) lapangan bulutangkis ganda?",
        "options": [
          "12,0 m × 5,5 m",
          "13,4 m × 6,1 m",
          "14,5 m × 7,0 m",
          "13,4 m × 5,18 m"
        ],
        "explanation": "Lapangan bulutangkis ganda memiliki panjang 13,40 meter dan lebar 6,10 meter."
      },
      "pl": {
        "question": "Jakie są pełne standardowe wymiary (długość × szerokość) kortu deblowego do badmintona?",
        "options": [
          "12,0 m × 5,5 m",
          "13,4 m × 6,1 m",
          "14,5 m × 7,0 m",
          "13,4 m × 5,18 m"
        ],
        "explanation": "Pełny kort do badmintona dla debla ma 13,40 m długości i 6,10 m szerokości."
      }
    }
  },
  {
    "id": 32,
    "category": "Court",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is the width of a badminton court for singles play?",
        "options": [
          "4.80 m",
          "5.18 m",
          "6.10 m",
          "5.80 m"
        ],
        "explanation": "Singles uses the inner sidelines, reducing the court width from 6.10 m to 5.18 m."
      },
      "vi": {
        "question": "Chiều rộng của sân cầu lông khi thi đấu đơn là bao nhiêu?",
        "options": [
          "4,80 m",
          "5,18 m",
          "6,10 m",
          "5,80 m"
        ],
        "explanation": "Đánh đơn sử dụng vạch biên dọc bên trong, thu hẹp chiều rộng sân từ 6,10 m xuống còn 5,18 m."
      },
      "zh": {
        "question": "羽毛球单打比赛所使用的场地有效宽度是多少？",
        "options": [
          "4.80 米",
          "5.18 米",
          "6.10 米",
          "5.80 米"
        ],
        "explanation": "单打比赛采用内侧边线，因此有效场地宽度为 5.18 米（双打为 6.10 米）。"
      },
      "id": {
        "question": "Berapa lebar lapangan bulutangkis untuk nomor tunggal?",
        "options": [
          "4,80 m",
          "5,18 m",
          "6,10 m",
          "5,80 m"
        ],
        "explanation": "Nomor tunggal menggunakan garis samping dalam, mengurangi lebar lapangan dari 6,10 m menjadi 5,18 m."
      },
      "pl": {
        "question": "Jaka jest szerokość kortu do badmintona w grze pojedynczej (singlu)?",
        "options": [
          "4,80 m",
          "5,18 m",
          "6,10 m",
          "5,80 m"
        ],
        "explanation": "W singlu obowiązują wewnętrzne linie boczne, zmniejszające szerokość kortu z 6,10 m do 5,18 m."
      }
    }
  },
  {
    "id": 33,
    "category": "Court",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is the official net height at the centre of the court?",
        "options": [
          "1.40 m",
          "1.524 m (5 feet)",
          "1.55 m",
          "1.60 m"
        ],
        "explanation": "The net height is 1.524 metres (5 feet) at the centre and 1.55 metres at the post edges."
      },
      "vi": {
        "question": "Chiều cao chính thức của lưới cầu lông tại vị trí chính giữa sân là bao nhiêu?",
        "options": [
          "1,40 m",
          "1,524 m (5 feet)",
          "1,55 m",
          "1,60 m"
        ],
        "explanation": "Chiều cao của lưới tại giữa sân là 1,524 mét (5 feet) và tại hai cột biên là 1,55 mét."
      },
      "zh": {
        "question": "羽毛球球网在场地中央位置的法定净高是多少？",
        "options": [
          "1.40 米",
          "1.524 米 (5 英尺)",
          "1.55 米",
          "1.60 米"
        ],
        "explanation": "球网两端立柱处高度为 1.55 米，而球网中央因自然下垂规定高度为 1.524 米。"
      },
      "id": {
        "question": "Berapa tinggi resmi net bulutangkis di bagian tengah lapangan?",
        "options": [
          "1,40 m",
          "1,524 m (5 kaki)",
          "1,55 m",
          "1,60 m"
        ],
        "explanation": "Tinggi net di bagian tengah adalah 1,524 meter (5 kaki) dan 1,55 meter di tiang tepi lapangan."
      },
      "pl": {
        "question": "Jaka jest oficjalna wysokość siatki badmintonowej na środku kortu?",
        "options": [
          "1,40 m",
          "1,524 m (5 stóp)",
          "1,55 m",
          "1,60 m"
        ],
        "explanation": "Wysokość siatki na środku wynosi 1,524 m (5 stóp), a przy słupkach bocznych 1,55 m."
      }
    }
  },
  {
    "id": 34,
    "category": "Court",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is the distance between the net and the short service line?",
        "options": [
          "1.50 m",
          "1.98 m (6 feet 6 inches)",
          "2.25 m",
          "2.50 m"
        ],
        "explanation": "The short service line is 1.98 metres from the net. Any serve landing short of this line is a fault."
      },
      "vi": {
        "question": "Khoảng cách giữa lưới và vạch giao cầu ngắn là bao nhiêu?",
        "options": [
          "1,50 m",
          "1,98 m (6 feet 6 inches)",
          "2,25 m",
          "2,50 m"
        ],
        "explanation": "Vạch giao cầu ngắn cách lưới 1,98 mét. Quả giao cầu rơi chưa tới vạch này sẽ bị tính là lỗi."
      },
      "zh": {
        "question": "球网与前发球线（短发球线）之间的标准水平间距是多少？",
        "options": [
          "1.50 米",
          "1.98 米 (6 英尺 6 英寸)",
          "2.25 米",
          "2.50 米"
        ],
        "explanation": "前发球线距离球网垂直投影线 1.98 米，发球落点未过此线直接判定发球违例。"
      },
      "id": {
        "question": "Berapa jarak antara net dan garis servis pendek?",
        "options": [
          "1,50 m",
          "1,98 m (6 kaki 6 inci)",
          "2,25 m",
          "2,50 m"
        ],
        "explanation": "Garis servis pendek berjarak 1,98 meter dari net. Servis yang jatuh sebelum garis ini dinyatakan fault."
      },
      "pl": {
        "question": "Jaka jest odległość pomiędzy siatką a przednią linią serwisową?",
        "options": [
          "1,50 m",
          "1,98 m (6 stóp 6 cali)",
          "2,25 m",
          "2,50 m"
        ],
        "explanation": "Przednia linia serwisowa znajduje się 1,98 m od siatki. Serwis lądujący przed nią to błąd."
      }
    }
  },
  {
    "id": 35,
    "category": "Court",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "In doubles, during the serve, which tramlines are considered OUT of bounds?",
        "options": [
          "The side tramlines are out; back tramline is in",
          "The rear tramline (long service line) is out; side tramlines are in",
          "Both side and back tramlines are out",
          "All tramlines are in on serve"
        ],
        "explanation": "On the doubles serve: wide and short! The side alleys are IN, but the rear 0.76 m tramline is OUT."
      },
      "vi": {
        "question": "Trong đánh đôi, khi thực hiện quả giao cầu, hành lang nào bị tính là NGOÀI sân?",
        "options": [
          "Hành lang hai bên ngoài; vạch đáy trong",
          "Hành lang đáy sau (vạch giao cầu dài) là NGOÀI; hành lang hai bên là TRONG",
          "Cả hành lang hai bên lẫn hành lang đáy đều ngoài",
          "Tất cả các hành lang đều được tính trong"
        ],
        "explanation": "Khi giao cầu đôi: rộng và ngắn! Hành lang biên 2 bên được tính IN, nhưng hành lang đáy sau (0,76 m) bị tính OUT."
      },
      "zh": {
        "question": "在双打发球时，关于外围边线与底线附加区域（走廊区域）的有效性规定是什么？",
        "options": [
          "两侧双打边线走廊算界外，后场底线走廊算界内",
          "后场底线走廊（双打后发球线外）算界外，两侧边线走廊算界内",
          "两侧边线与后场底线走廊全部算界外",
          "发球时所有走廊全部算界内"
        ],
        "explanation": "双打发球口诀：“宽而短”。外侧边线走廊在界内，但后场 0.76 米的双打后发球线走廊算界外。"
      },
      "id": {
        "question": "Di ganda, saat servis dilakukan, area lorong mana yang dianggap KELUAR (out)?",
        "options": [
          "Lorong samping keluar; lorong belakang masuk",
          "Lorong belakang (garis servis panjang) KELUAR; lorong samping MASUK",
          "Baik lorong samping maupun belakang keluar",
          "Semua lorong masuk saat servis"
        ],
        "explanation": "Pada servis ganda: lebar tapi pendek! Lorong samping MASUK, tetapi lorong belakang (0,76 m) KELUAR."
      },
      "pl": {
        "question": "W deblu podczas serwisu, które korytarze kortu są uznawane za AUT?",
        "options": [
          "Korytarze boczne to aut; korytarz tylny to pole dobre",
          "Tylny korytarz (długa linia serwisu) to AUT; korytarze boczne to POLE DOBRE",
          "Zarówno boczne, jak i tylny korytarz to aut",
          "Wszystkie korytarze są dobre przy serwisie"
        ],
        "explanation": "Przy serwisie deblowym: szeroko i krótko! Korytarze boczne są dobre, ale korytarz tylny (0,76 m) to aut."
      }
    }
  },
  {
    "id": 36,
    "category": "Court",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "How many feathers are in a standard BWF-approved tournament shuttlecock?",
        "options": [
          "12 feathers",
          "14 feathers",
          "16 feathers",
          "18 feathers"
        ],
        "explanation": "Every official tournament shuttlecock has exactly 16 goose or duck feathers fixed into a rounded cork base."
      },
      "vi": {
        "question": "Có bao nhiêu chiếc lông vũ trên một quả cầu lông tiêu chuẩn thi đấu được BWF chứng nhận?",
        "options": [
          "12 chiếc lông",
          "14 chiếc lông",
          "16 chiếc lông",
          "18 chiếc lông"
        ],
        "explanation": "Mỗi quả cầu lông thi đấu chính thức có chính xác 16 chiếc lông ngỗng hoặc vịt cắm vào đế bần bọc da."
      },
      "zh": {
        "question": "一只符合世界羽联 (BWF) 标准的正式比赛级羽毛球，上面插有多少根天然羽毛？",
        "options": [
          "12 根",
          "14 根",
          "16 根",
          "18 根"
        ],
        "explanation": "所有标准比赛羽毛球均严格由 16 根天然鹅毛或鸭毛均匀植入软木球托制成。"
      },
      "id": {
        "question": "Berapa banyak bulu pada shuttlecock turnamen standar yang disetujui BWF?",
        "options": [
          "12 bulu",
          "14 bulu",
          "16 bulu",
          "18 bulu"
        ],
        "explanation": "Setiap shuttlecock turnamen resmi memiliki tepat 16 helai bulu angsa atau bebek yang tertancap pada gabus."
      },
      "pl": {
        "question": "Ile piór znajduje się w standardowej turniejowej lotce zatwierdzonej przez BWF?",
        "options": [
          "12 piór",
          "14 piór",
          "16 piór",
          "18 piór"
        ],
        "explanation": "Każda oficjalna lotka piórowa posiada dokładnie 16 gęsich lub kaczych piór osadzonych w korkowej podstawie."
      }
    }
  },
  {
    "id": 37,
    "category": "Court",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "What weight class does a standard '4U' badminton racket represent?",
        "options": [
          "70–74 grams",
          "75–79 grams",
          "80–84 grams",
          "85–89 grams"
        ],
        "explanation": "4U designates 80–84 grams, the most versatile and popular weight for both singles and doubles."
      },
      "vi": {
        "question": "Thông số '4U' trên vợt cầu lông tiêu chuẩn đại diện cho dải trọng lượng nào?",
        "options": [
          "70–74 gram",
          "75–79 gram",
          "80–84 gram",
          "85–89 gram"
        ],
        "explanation": "Chỉ số 4U đại diện cho trọng lượng 80–84 gram, dải khối lượng phổ biến và cân bằng nhất cho cả đơn và đôi."
      },
      "zh": {
        "question": "羽毛球拍重量标识中常见的“4U”代表哪一个具体的重量区间？",
        "options": [
          "70–74 克",
          "75–79 克",
          "80–84 克",
          "85–89 克"
        ],
        "explanation": "4U 代表球拍净重 80–84 克，兼具出色的操控速度与下压攻击力，是当今最广泛使用的规格。"
      },
      "id": {
        "question": "Kelas berat apa yang ditunjukkan oleh raket bulutangkis standar bertanda '4U'?",
        "options": [
          "70–74 gram",
          "75–79 gram",
          "80–84 gram",
          "85–89 gram"
        ],
        "explanation": "4U menunjukkan berat 80–84 gram, bobot paling serbaguna dan populer untuk tunggal maupun ganda."
      },
      "pl": {
        "question": "Jaki przedział wagowy oznacza standardowe oznaczenie '4U' na rakiecie do badmintona?",
        "options": [
          "70–74 gramów",
          "75–79 gramów",
          "80–84 gramy",
          "85–89 gramów"
        ],
        "explanation": "Oznaczenie 4U odpowiada wadze 80–84 g — najbardziej uniwersalnej i popularnej w singlu oraz deblu."
      }
    }
  },
  {
    "id": 38,
    "category": "Court",
    "answer": 0,
    "i18n": {
      "en": {
        "question": "What does a 'head-heavy' balance indicate about a badminton racket?",
        "options": [
          "More mass is distributed in the frame head, generating greater smash momentum",
          "The grip handle is extra thick and heavy",
          "The overall racket weighs more than 100 grams",
          "The strings are strung at maximum tension"
        ],
        "explanation": "Head-heavy rackets shift weight toward the racket head, giving extra inertia for explosive smashes."
      },
      "vi": {
        "question": "Điểm cân bằng 'nặng đầu' (head-heavy) thể hiện điều gì ở một cây vợt cầu lông?",
        "options": [
          "Khối lượng dồn nhiều hơn về phía khung đầu vợt, gia tăng lực quán tính cho cú đập",
          "Cán cầm dày và nặng bất thường",
          "Tổng trọng lượng của vợt vượt quá 100 gram",
          "Dây cước được căng ở mức cân tối đa"
        ],
        "explanation": "Vợt nặng đầu dồn trọng tâm về đầu vợt, tạo ra mô-men quán tính lớn giúp những cú đập cầu bùng nổ uy lực."
      },
      "zh": {
        "question": "羽毛球拍的“头重型” (Head-heavy) 参数主要代表什么性能特征？",
        "options": [
          "更多重量分布在拍头框部，在下压扣杀时能提供更强的惯性动能",
          "握把特别粗壮厚重",
          "球拍总重量超过 100 克",
          "拍线必须穿到极限磅数"
        ],
        "explanation": "拍头偏重使重心前移，击球时挥拍动量更大，能为强力进攻扣杀带来极强的下压与威慑力。"
      },
      "id": {
        "question": "Apa yang ditunjukkan oleh keseimbangan 'head-heavy' pada raket bulutangkis?",
        "options": [
          "Massa lebih banyak terdistribusi di kepala frame, memberi momentum smash lebih besar",
          "Grip pegangan ekstra tebal dan berat",
          "Berat total raket lebih dari 100 gram",
          "Senar ditarik pada tegangan maksimum"
        ],
        "explanation": "Raket head-heavy menggeser berat ke arah kepala, memberikan daya inersia tambahan untuk smash mematikan."
      },
      "pl": {
        "question": "Co oznacza wyważenie 'na głowicę' (head-heavy) w rakiecie do badmintona?",
        "options": [
          "Większa masa skupiona jest w główce rakiety, generując większą siłę uderzeń i smeczów",
          "Rączka rakiety jest nienaturalnie gruba i ciężka",
          "Całkowita waga rakiety przekracza 100 gramów",
          "Naciąg jest wciągnięty z maksymalną siłą"
        ],
        "explanation": "Rakiety head-heavy przenoszą środek ciężkości w stronę główki, dając potężną bezwładność do mocnych smeczów."
      }
    }
  },
  {
    "id": 39,
    "category": "Court",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "Why are non-marking gum-rubber soles mandatory on indoor badminton courts?",
        "options": [
          "To make footsteps completely silent",
          "To provide optimal traction without scuffing or damaging specialized court mats",
          "To increase jump height by 20%",
          "Because standard rubber melts under friction"
        ],
        "explanation": "Non-marking gum rubber provides critical traction for sudden lunges without leaving streaks on court surfaces."
      },
      "vi": {
        "question": "Tại sao đế giày cao su tự nhiên không để lại vết (non-marking) là bắt buộc trên sân cầu lông trong nhà?",
        "options": [
          "Để bước chân hoàn toàn không gây tiếng động",
          "Cung cấp độ bám sân tối ưu mà không làm xước hoặc để lại vệt ố trên thảm sân chuyên dụng",
          "Giúp tăng độ cao khi bật nhảy thêm 20%",
          "Vì cao su thông thường sẽ bị chảy dưới ma sát"
        ],
        "explanation": "Đế giày non-marking tạo độ bám sân chống trượt khi di chuyển đổi hướng đột ngột mà không để lại vệt đen trên thảm thảm."
      },
      "zh": {
        "question": "为什么室内专用羽毛球馆必须强制要求穿着生胶防滑无痕鞋底 (Non-marking) 的球鞋？",
        "options": [
          "为了让跑动步伐完全静音",
          "提供极致抓地力以防滑倒，同时绝不划伤磨损或在专业塑胶地胶上留下黑痕",
          "可直接使跳跃高度增加 20%",
          "因为普通橡胶在强烈摩擦下会融化"
        ],
        "explanation": "无痕生胶底能为羽毛球高速急停、启动、急转与弓步跨步提供安全抓地力，且保护昂贵的专业 PVC 地胶。"
      },
      "id": {
        "question": "Mengapa sol karet mentah non-marking wajib digunakan di lapangan bulutangkis indoor?",
        "options": [
          "Agar langkah kaki sama sekali tidak bersuara",
          "Memberi daya cengkeram optimal tanpa meninggalkan bekas atau merusak karpet lapangan",
          "Meningkatkan tinggi lompatan sebesar 20%",
          "Karena karet biasa meleleh akibat gesekan"
        ],
        "explanation": "Sol non-marking memberikan traksi kuat untuk lunge mendadak tanpa meninggalkan goresan hitam di karpet lapangan."
      },
      "pl": {
        "question": "Dlaczego na krytych kortach do badmintona wymagana jest podeszwa 'non-marking' z kauczuku?",
        "options": [
          "Aby kroki były całkowicie bezgłośne",
          "Aby zapewnić optymalną przyczepność bez brudzenia i niszczenia mat kortowych",
          "Aby zwiększyć wysokość wyskoku o 20%",
          "Ponieważ zwykła guma topi się pod wpływem tarcia"
        ],
        "explanation": "Podeszwa non-marking daje świetną przyczepność przy gwałtownych wypadach i nie pozostawia smug na macie kortu."
      }
    }
  },
  {
    "id": 40,
    "category": "Court",
    "answer": 0,
    "i18n": {
      "en": {
        "question": "What does a shuttlecock speed rating of 77 or 78 indicate compared to 75?",
        "options": [
          "77/78 flies faster and is calibrated for cooler temperatures or denser sea-level air",
          "77/78 is lighter and flies slower",
          "77/78 is designed exclusively for outdoor wind resistance",
          "77/78 has plastic nylon skirts instead of feathers"
        ],
        "explanation": "Cold or dense air slows shuttles down, so faster-rated shuttles (77/78) are used to maintain correct flight distance."
      },
      "vi": {
        "question": "Chỉ số tốc độ quả cầu 77 hoặc 78 biểu thị điều gì so với chỉ số 75?",
        "options": [
          "77/78 bay nhanh hơn và được hiệu chuẩn cho nhiệt độ mát lạnh hoặc không khí đặc ở mực nước biển",
          "77/78 nhẹ hơn và bay chậm hơn",
          "77/78 chỉ thiết kế riêng ngoài trời để cản gió",
          "77/78 làm bằng nhựa nylon thay vì lông vũ"
        ],
        "explanation": "Không khí lạnh hoặc đặc khiến cầu bay chậm hơn, do đó cầu tốc độ 77/78 được sử dụng để đạt cự ly bay tiêu chuẩn."
      },
      "zh": {
        "question": "羽毛球球速标号为 77 或 78 速，与 75 速相比意味着什么？",
        "options": [
          "77/78 球速更快，适用于气温较低、空气密度较大的海平面环境",
          "77/78 重量更轻且飞行速度更慢",
          "77/78 专为室外强风环境设计",
          "77/78 采用尼龙塑料裙代替天然羽毛"
        ],
        "explanation": "低温与密实空气会增加羽毛球阻力，因此在寒冷地区需要使用 77/78 等更高速度级别的球来保持正常飞行距离。"
      },
      "id": {
        "question": "Apa yang ditunjukkan oleh peringkat kecepatan kok 77 atau 78 dibandingkan dengan 75?",
        "options": [
          "77/78 terbang lebih cepat dan dikalibrasi untuk suhu lebih dingin atau udara padat di permukaan laut",
          "77/78 lebih ringan dan terbang lebih lambat",
          "77/78 dirancang khusus untuk luar ruangan tahan angin",
          "77/78 memakai rok nilon bukan bulu asli"
        ],
        "explanation": "Udara dingin/padat memperlambat laju kok, sehingga shuttlecock berkecepatan 77/78 dipakai agar jarak terbangnya pas."
      },
      "pl": {
        "question": "Co oznacza oznaczenie prędkości lotki 77 lub 78 w porównaniu z 75?",
        "options": [
          "77/78 lata szybciej i jest skalibrowana do niższych temperatur lub gęstszego powietrza",
          "77/78 jest lżejsza i lata wolniej",
          "77/78 jest przeznaczona wyłącznie do gry na zewnątrz na wietrze",
          "77/78 ma nylonowy koszyczek zamiast piór"
        ],
        "explanation": "Chłodne lub gęste powietrze stawia większy opór, dlatego szybsze lotki (77/78) gwarantują właściwy dystans lotu."
      }
    }
  },
  {
    "id": 41,
    "category": "History",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "In what year and host city did badminton make its debut as an official Olympic medal sport?",
        "options": [
          "1988 Seoul",
          "1992 Barcelona",
          "1996 Atlanta",
          "2000 Sydney"
        ],
        "explanation": "Badminton became a full Olympic medal sport at the 1992 Barcelona Games (following a demonstration in Seoul 1988)."
      },
      "vi": {
        "question": "Cầu lông chính thức ra mắt như một môn thể thao tranh huy chương Thế vận hội Olympic vào năm nào và tại thành phố nào?",
        "options": [
          "1988 Seoul",
          "1992 Barcelona",
          "1996 Atlanta",
          "2000 Sydney"
        ],
        "explanation": "Cầu lông trở thành môn thể thao tranh huy chương Olympic chính thức tại Thế vận hội Barcelona năm 1992."
      },
      "zh": {
        "question": "羽毛球运动是在哪一年、哪座主办城市首次被列为正式奥运会奖牌比赛项目的？",
        "options": [
          "1988年 汉城（首尔）",
          "1992年 巴塞罗那",
          "1996年 亚特兰大",
          "2000年 悉尼"
        ],
        "explanation": "在 1988 年汉城作为表演项目之后，羽毛球在 1992 年巴塞罗那奥运会上首次成为正式夏季奥运比赛项目。"
      },
      "id": {
        "question": "Pada tahun dan kota tuan rumah berapa bulutangkis memulai debutnya sebagai cabang olahraga medali resmi Olimpiade?",
        "options": [
          "1988 Seoul",
          "1992 Barcelona",
          "1996 Atlanta",
          "2000 Sydney"
        ],
        "explanation": "Bulutangkis menjadi cabang olahraga perebutan medali resmi pada Olimpiade Barcelona 1992."
      },
      "pl": {
        "question": "W którym roku i jakim mieście badminton zadebiutował jako oficjalna dyscyplina medalowa Igrzysk Olimpijskich?",
        "options": [
          "1988 Seul",
          "1992 Barcelona",
          "1996 Atlanta",
          "2000 Sydney"
        ],
        "explanation": "Badminton stał się oficjalnym sportem medalowym na Igrzyskach Olimpijskich w Barcelonie w 1992 roku."
      }
    }
  },
  {
    "id": 42,
    "category": "History",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "From which English estate did the sport of modern badminton derive its name around 1873?",
        "options": [
          "Wimbledon Manor in London",
          "Badminton House in Gloucestershire",
          "Buckingham Palace in Westminster",
          "Windsor Castle in Berkshire"
        ],
        "explanation": "The sport was formalised at Badminton House in Gloucestershire, country home of the Duke of Beaufort."
      },
      "vi": {
        "question": "Tên gọi của môn cầu lông hiện đại (Badminton) bắt nguồn từ dinh thự nào của nước Anh vào khoảng năm 1873?",
        "options": [
          "Trang viên Wimbledon ở London",
          "Tòa dinh thự Badminton House ở hạt Gloucestershire",
          "Cung điện Buckingham ở Westminster",
          "Lâu đài Windsor ở Berkshire"
        ],
        "explanation": "Môn thể thao được chuẩn hóa tại Badminton House ở Gloucestershire, tư dinh của Công tước vùng Beaufort."
      },
      "zh": {
        "question": "现代羽毛球运动的名字 (Badminton) 大约在 1873 年源自英国哪座著名的历史庄园？",
        "options": [
          "伦敦的温布尔登庄园 (Wimbledon Manor)",
          "格洛斯特郡的伯明顿庄园 (Badminton House)",
          "威斯敏斯特的白金汉宫",
          "伯克郡的温莎城堡"
        ],
        "explanation": "现代羽毛球规则最初在英国博福特公爵位于格洛斯特郡的伯明顿庄园 (Badminton House) 成型并因此得名。"
      },
      "id": {
        "question": "Dari perkebunan/istana Inggris mana nama olahraga bulutangkis modern (Badminton) berasal sekitar tahun 1873?",
        "options": [
          "Wimbledon Manor di London",
          "Badminton House di Gloucestershire",
          "Istana Buckingham di Westminster",
          "Kastil Windsor di Berkshire"
        ],
        "explanation": "Olahraga ini diformalkan di Badminton House di Gloucestershire, kediaman Duke of Beaufort."
      },
      "pl": {
        "question": "Od jakiej angielskiej posiadłości współczesny badminton wziął swoją nazwę około 1873 roku?",
        "options": [
          "Wimbledon Manor w Londynie",
          "Badminton House w Gloucestershire",
          "Pałac Buckingham w Westminsterze",
          "Zamek Windsor w Berkshire"
        ],
        "explanation": "Zasady gry sformalizowano w Badminton House w Gloucestershire — wiejskiej rezydencji księcia Beaufort."
      }
    }
  },
  {
    "id": 43,
    "category": "History",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is the name of the prestigious Men's World Team Championship trophy in badminton?",
        "options": [
          "The Uber Cup",
          "The Thomas Cup",
          "The Sudirman Cup",
          "The Davis Cup"
        ],
        "explanation": "The Thomas Cup, inaugurated in 1948–49, is the premier trophy for men's national teams."
      },
      "vi": {
        "question": "Chiếc cúp vô địch đồng đội nam thế giới danh giá nhất trong môn cầu lông có tên là gì?",
        "options": [
          "Uber Cup",
          "Thomas Cup",
          "Sudirman Cup",
          "Davis Cup"
        ],
        "explanation": "Thomas Cup (thành lập năm 1948–49) là giải vô địch đồng đội nam quốc gia danh giá nhất hành tinh."
      },
      "zh": {
        "question": "世界羽坛最具声望的男子团体锦标赛奖杯被称为什么？",
        "options": [
          "尤伯杯 (Uber Cup)",
          "汤姆斯杯 (Thomas Cup)",
          "苏迪曼杯 (Sudirman Cup)",
          "戴维斯杯 (Davis Cup)"
        ],
        "explanation": "汤姆斯杯（始于 1948-49 年）是世界羽毛球男子国家级最高荣誉的团体锦标赛。"
      },
      "id": {
        "question": "Apa nama trofi kejuaraan beregu putra dunia paling bergengsi dalam bulutangkis?",
        "options": [
          "Piala Uber (Uber Cup)",
          "Piala Thomas (Thomas Cup)",
          "Piala Sudirman (Sudirman Cup)",
          "Piala Davis (Davis Cup)"
        ],
        "explanation": "Piala Thomas, yang dimulai pada 1948–49, adalah lambang supremasi kejuaraan beregu putra dunia."
      },
      "pl": {
        "question": "Jak nazywa się prestiżowe trofeum Drużynowych Mistrzostw Świata Mężczyzn w badmintonie?",
        "options": [
          "Puchar Uber (Uber Cup)",
          "Puchar Thomasa (Thomas Cup)",
          "Puchar Sudirmana (Sudirman Cup)",
          "Puchar Davisa (Davis Cup)"
        ],
        "explanation": "Thomas Cup (od 1948–49) to najważniejsze międzynarodowe trofeum męskich drużyn narodowych."
      }
    }
  },
  {
    "id": 44,
    "category": "History",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is the name of the Women's World Team Championship trophy in badminton?",
        "options": [
          "The Thomas Cup",
          "The Uber Cup",
          "The Sudirman Cup",
          "The Billie Jean King Cup"
        ],
        "explanation": "The Uber Cup, founded in 1956–57, is the women's equivalent of the Thomas Cup."
      },
      "vi": {
        "question": "Giải vô địch đồng đội nữ thế giới trong môn cầu lông có tên gọi là gì?",
        "options": [
          "Thomas Cup",
          "Uber Cup",
          "Sudirman Cup",
          "Billie Jean King Cup"
        ],
        "explanation": "Uber Cup (ra đời năm 1956–57) là giải vô địch đồng đội nữ thế giới tương đương với Thomas Cup của nam."
      },
      "zh": {
        "question": "世界羽毛球女子顶级团体锦标赛奖杯的名字是什么？",
        "options": [
          "汤姆斯杯 (Thomas Cup)",
          "尤伯杯 (Uber Cup)",
          "苏迪曼杯 (Sudirman Cup)",
          "比利简金杯 (Billie Jean King Cup)"
        ],
        "explanation": "尤伯杯（创办于 1956-57 年）是女子羽毛球国家队最高荣誉的团体大赛。"
      },
      "id": {
        "question": "Apa nama trofi kejuaraan beregu putri dunia dalam bulutangkis?",
        "options": [
          "Piala Thomas",
          "Piala Uber",
          "Piala Sudirman",
          "Piala Billie Jean King"
        ],
        "explanation": "Piala Uber, didirikan pada 1956–57, adalah kompetisi beregu putri tingkat dunia (ekuivalen Thomas Cup)."
      },
      "pl": {
        "question": "Jak nazywa się trofeum Drużynowych Mistrzostw Świata Kobiet w badmintonie?",
        "options": [
          "Puchar Thomasa (Thomas Cup)",
          "Puchar Uber (Uber Cup)",
          "Puchar Sudirmana (Sudirman Cup)",
          "Puchar Billie Jean King"
        ],
        "explanation": "Uber Cup, założony w latach 1956–57, to kobiecy odpowiednik męskiego Pucharu Thomasa."
      }
    }
  },
  {
    "id": 45,
    "category": "History",
    "answer": 0,
    "i18n": {
      "en": {
        "question": "Which prestigious international championship represents the World Mixed Team Championship?",
        "options": [
          "The Sudirman Cup",
          "The All England Championship",
          "The Thomas Cup",
          "The BWF World Tour Finals"
        ],
        "explanation": "Named after Indonesian badminton pioneer Dick Sudirman, the Sudirman Cup is held biennially for mixed national teams."
      },
      "vi": {
        "question": "Giải đấu quốc tế danh giá nào đại diện cho giải Vô địch Đồng đội Hỗn hợp Nam Nữ Thế giới?",
        "options": [
          "Sudirman Cup",
          "Giải Toàn Anh (All England Championship)",
          "Thomas Cup",
          "BWF World Tour Finals"
        ],
        "explanation": "Mang tên nhà tiên phong cầu lông Indonesia Dick Sudirman, cúp Sudirman được tổ chức 2 năm một lần cho đồng đội hỗn hợp."
      },
      "zh": {
        "question": "代表世界羽毛球男女混合团体最高荣誉的国际锦标赛是哪一项？",
        "options": [
          "苏迪曼杯 (Sudirman Cup)",
          "全英羽毛球公开赛 (All England)",
          "汤姆斯杯 (Thomas Cup)",
          "世界羽联年终总决赛"
        ],
        "explanation": "苏迪曼杯以印尼羽毛球奠基人迪克·苏迪曼命名，每两年举办一届，包含男单、女单、男双、女双与混双全项目对抗。"
      },
      "id": {
        "question": "Kejuaraan internasional bergengsi mana yang mewakili Kejuaraan Beregu Campuran Dunia?",
        "options": [
          "Piala Sudirman (Sudirman Cup)",
          "All England Championship",
          "Piala Thomas",
          "BWF World Tour Finals"
        ],
        "explanation": "Dinamai dari tokoh bulutangkis Indonesia Dick Sudirman, Piala Sudirman diadakan dua tahun sekali untuk beregu campuran."
      },
      "pl": {
        "question": "Które mistrzostwa reprezentują Drużynowe Mistrzostwa Świata Drużyn Mieszanych w badmintonie?",
        "options": [
          "Puchar Sudirmana (Sudirman Cup)",
          "Turniej All England",
          "Puchar Thomasa",
          "BWF World Tour Finals"
        ],
        "explanation": "Nazwany na cześć indonezyjskiego pioniera Dicka Sudirmana, puchar ten jest rozgrywany co 2 lata dla kadr mieszanych."
      }
    }
  },
  {
    "id": 46,
    "category": "History",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "Which legendary player won back-to-back Men's Singles Olympic gold medals (2008 & 2012) and 5 World Championship titles?",
        "options": [
          "Lee Chong Wei",
          "Taufik Hidayat",
          "Lin Dan",
          "Peter Gade"
        ],
        "explanation": "Lin Dan ('Super Dan') of China achieved the historic 'Super Grand Slam' by winning all nine major titles in badminton."
      },
      "vi": {
        "question": "Huyền thoại nào đã giành huy chương vàng Olympic đơn nam liên tiếp (2008 & 2012) và 5 danh hiệu Vô địch Thế giới?",
        "options": [
          "Lee Chong Wei",
          "Taufik Hidayat",
          "Lin Dan",
          "Peter Gade"
        ],
        "explanation": "Lin Dan ('Super Dan') của Trung Quốc đã lập kỷ lục 'Super Grand Slam' vô tiền khoáng hậu khi thâu tóm toàn bộ danh hiệu lớn."
      },
      "zh": {
        "question": "哪位传奇名宿曾蝉联两届奥运会男子单打金牌（2008与2012）并夺得 5 次世锦赛单打冠军？",
        "options": [
          "李宗伟 (Lee Chong Wei)",
          "陶菲克 (Taufik Hidayat)",
          "林丹 (Lin Dan)",
          "彼得·盖德 (Peter Gade)"
        ],
        "explanation": "中国名将“超级丹”林丹是历史上唯一完成羽坛双圈“全满贯”伟业的传奇巨星。"
      },
      "id": {
        "question": "Pemain legendaris mana yang memenangkan medali emas tunggal putra Olimpiade berturut-turut (2008 & 2012) dan 5 gelar Juara Dunia?",
        "options": [
          "Lee Chong Wei",
          "Taufik Hidayat",
          "Lin Dan",
          "Peter Gade"
        ],
        "explanation": "Lin Dan ('Super Dan') dari Tiongkok meraih 'Super Grand Slam' dengan memenangkan seluruh gelar bergengsi bulutangkis."
      },
      "pl": {
        "question": "Który legendarny zawodnik zdobył z rzędu dwa złote medale olimpijskie w grze pojedynczej (2008 i 2012) oraz 5 tytułów mistrza świata?",
        "options": [
          "Lee Chong Wei",
          "Taufik Hidayat",
          "Lin Dan",
          "Peter Gade"
        ],
        "explanation": "Lin Dan ('Super Dan') z Chin skompletował bezprecedensowy 'Super Grand Slam', wygrywając wszystkie 9 głównych tytułów."
      }
    }
  },
  {
    "id": 47,
    "category": "History",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "What is the fastest recorded smash speed in competitive badminton, proving it the fastest racket sport?",
        "options": [
          "332 km/h",
          "390 km/h",
          "493+ km/h",
          "600 km/h"
        ],
        "explanation": "Speeds over 493 km/h have been recorded in match play (and over 565 km/h in lab tests), far faster than tennis or squash."
      },
      "vi": {
        "question": "Tốc độ đập cầu nhanh nhất từng được ghi nhận trong thi đấu chính thức là bao nhiêu, khẳng định vị thế môn thể thao dùng vợt nhanh nhất?",
        "options": [
          "332 km/h",
          "390 km/h",
          "493+ km/h",
          "600 km/h"
        ],
        "explanation": "Vận tốc vượt trên 493 km/h đã được xác lập trong thi đấu (và hơn 565 km/h trong thử nghiệm), nhanh hơn nhiều so với tennis hay squash."
      },
      "zh": {
        "question": "在正式羽毛球比赛中记录到的最快杀球球速是多少，无可争议地证明羽毛球是球速最快拍类运动？",
        "options": [
          "332 km/h",
          "390 km/h",
          "493+ km/h",
          "600 km/h"
        ],
        "explanation": "正式赛场已记录到超过 493 km/h（实验室极限测试更超 565 km/h）的惊人击球时速，远超网球、壁球和乒乓球。"
      },
      "id": {
        "question": "Berapa rekor kecepatan smash tercepat yang pernah tercatat dalam kompetisi resmi bulutangkis?",
        "options": [
          "332 km/jam",
          "390 km/jam",
          "493+ km/jam",
          "600 km/jam"
        ],
        "explanation": "Kecepatan lebih dari 493 km/jam tercatat di pertandingan resmi (dan di atas 565 km/jam dalam uji lab), jauh melampaui tenis."
      },
      "pl": {
        "question": "Jaka jest najszybsza zarejestrowana prędkość smeczu w badmintonie, czyniąca go najszybszym sportem rakietowym?",
        "options": [
          "332 km/h",
          "390 km/h",
          "493+ km/h",
          "600 km/h"
        ],
        "explanation": "Podczas meczów odnotowano prędkości przekraczające 493 km/h (w testach laboratoryjnych ponad 565 km/h), daleko przed tenisem."
      }
    }
  },
  {
    "id": 48,
    "category": "History",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "In doubles tactical play, what is the standard 'front-and-back' court formation used for?",
        "options": [
          "Defending against opponent smashes",
          "Attacking — rear player smashes while front player intercepts weak lifts at the net",
          "Executing a high defensive lift",
          "Serving in mixed doubles only"
        ],
        "explanation": "Front-and-back is the attacking formation: the backcourt player smashes while the net player intercepts replies."
      },
      "vi": {
        "question": "Trong chiến thuật đánh đôi, đội hình tiêu chuẩn 'trước - sau' (front-and-back) được sử dụng nhằm mục đích gì?",
        "options": [
          "Phòng thủ trước những cú đập cầu của đối phương",
          "Tấn công — người phía sau đập cầu trong khi người phía trước chực vồ và bắt lưới",
          "Thực hiện cú lốp cầu phòng thủ cao",
          "Chỉ dùng để giao cầu trong đánh đôi nam nữ"
        ],
        "explanation": "Đội hình trước - sau là đội hình tấn công: cầu thủ tuyến sau tung đòn đập trong khi cầu thủ đứng lưới chặn bắt đường cầu ngắn."
      },
      "zh": {
        "question": "在羽毛球双打战术体系中，经典的标准“前后站位”主要用于何种比赛局面？",
        "options": [
          "防守对手凶狠的连续下压杀球",
          "进攻状态 — 后场队员全力杀球施压，前场队员封网拦截网前还击",
          "防守时挑极深的高远球",
          "仅用于混合双打发球瞬间"
        ],
        "explanation": "前后站位是绝对的进攻阵型：后场搭档重杀下压，前场搭档封堵扑杀对手被动挡回的网前球。"
      },
      "id": {
        "question": "Dalam taktik ganda, formasi standar 'depan-belakang' (front-and-back) digunakan untuk apa?",
        "options": [
          "Bertahan dari smash lawan",
          "Menyerang — pemain belakang melakukan smash sementara pemain depan menyambar bola tanggung di net",
          "Melakukan lob bertahan tinggi",
          "Hanya untuk servis di ganda campuran"
        ],
        "explanation": "Formasi depan-belakang adalah formasi menyerang: pemain belakang menyerang dengan smash, pemain depan mencegat bola di net."
      },
      "pl": {
        "question": "W taktyce deblowej, do czego służy standardowe ustawienie 'przód-tył' (front-and-back)?",
        "options": [
          "Do obrony przed smeczami przeciwników",
          "Do ataku — gracz z tyłu smeczuje, a gracz z przodu przechwytuje wystawki przy siatce",
          "Do wykonania wysokiego obronnego loba",
          "Tylko do serwisu w mikście"
        ],
        "explanation": "Ustawienie przód-tył to formacja ofensywna: gracz z tyłu atakuje smeczem, a gracz przy siatce dobija skróty i słabe odegrania."
      }
    }
  },
  {
    "id": 49,
    "category": "History",
    "answer": 1,
    "i18n": {
      "en": {
        "question": "What is the 'split-step' in badminton footwork and why is it essential?",
        "options": [
          "A full stretching split performed when lunging",
          "A small reactive hop landing with feet apart just as the opponent hits the shuttle to initiate rapid movement",
          "Stepping backward onto one foot during the serve",
          "A victory celebration after winning a rally"
        ],
        "explanation": "The split-step loads the calf and leg muscles elastically, letting players sprint explosively in whichever direction the shuttle is struck."
      },
      "vi": {
        "question": "Kỹ thuật 'bước tách' (split-step) trong bộ pháp cầu lông là gì và vì sao nó tối quan trọng?",
        "options": [
          "Động tác xoạc chân hết cỡ khi rướn cứu cầu",
          "Cú nhún nhảy nhẹ tách hai chân tiếp đất đúng thời điểm đối thủ chạm cầu để kích hoạt phản xạ di chuyển tức thì",
          "Bước lùi lại trên một chân trong lúc đối phương giao cầu",
          "Màn ăn mừng sau khi chiến thắng một pha cầu"
        ],
        "explanation": "Split-step nạp lực đàn hồi cho cơ bắp chân, cho phép vận động viên bứt tốc bùng nổ theo bất kỳ hướng nào cầu bay đến."
      },
      "zh": {
        "question": "羽毛球步法中的“垫步起动 / 分腿垫步” (Split-step) 是什么，为何它是顶级移动的核心？",
        "options": [
          "救球跨步时完全劈叉压腿",
          "在对手触球刹那双脚轻微起跳、两脚分开着地以利用肌肉弹性蓄能并极速变向起动",
          "在接发球时向后单脚后退一步",
          "赢得精彩回合后的庆祝舞步"
        ],
        "explanation": "分腿垫步利用肌肉牵拉反射储存弹性势能，使身体重心在对手出球刹那能以最短反应时间向全场任意角落爆发蹬伸。"
      },
      "id": {
        "question": "Apa itu 'split-step' dalam footwork bulutangkis dan mengapa sangat penting?",
        "options": [
          "Melakukan split kaki penuh saat melakukan lunge",
          "Lompatan kecil mendarat dengan kedua kaki melebar tepat saat lawan memukul kok untuk memicu gerakan cepat",
          "Melangkah mundur dengan satu kaki saat servis",
          "Selebrasi kemenangan setelah memenangkan reli"
        ],
        "explanation": "Split-step memuat energi elastis pada otot kaki, memungkinkan pemain melesat eksplosif ke segala arah shuttlecock dipukul."
      },
      "pl": {
        "question": "Czym jest 'split-step' w pracy nóg w badmintonie i dlaczego jest kluczowy?",
        "options": [
          "Pełnym szpagatem wykonywanym przy wypadzie do lotki",
          "Niewielkim naskokiem z lądowaniem na szeroko rozstawionych stopach w chwili uderzenia rywala, umożliwiającym natychmiastowy start",
          "Krokiem w tył na jedną nogę podczas serwisu",
          "Gestykulacją po wygranej akcji"
        ],
        "explanation": "Split-step wstępnie napina mięśnie nóg, pozwalając na eksplozywny start w dowolnym kierunku, w którym poleci lotka."
      }
    }
  },
  {
    "id": 50,
    "category": "History",
    "answer": 2,
    "i18n": {
      "en": {
        "question": "Approximately how much running distance can a top singles player cover during an intense 3-game match?",
        "options": [
          "Under 1 kilometre",
          "Around 2 kilometres",
          "Between 5 and 6 kilometres of explosive sprints, lunges, and jumps",
          "Over 15 kilometres"
        ],
        "explanation": "Studies tracking elite players show up to 6 km of high-intensity movement per match — far more intense distance than tennis."
      },
      "vi": {
        "question": "Một tay vợt đơn hàng đầu thế giới có thể di chuyển quãng đường xấp xỉ bao nhiêu trong một trận đấu 3 ván căng thẳng?",
        "options": [
          "Dưới 1 km",
          "Khoảng 2 km",
          "Từ 5 đến 6 km bao gồm các pha bứt tốc, xoạc chân và bật nhảy liên tục",
          "Trên 15 km"
        ],
        "explanation": "Nghiên cứu theo dõi vận động viên đỉnh cao cho thấy họ di chuyển tới 6 km cường độ cực đại trong mỗi trận đấu 3 ván."
      },
      "zh": {
        "question": "在一场耗时胶着、打满三局的高水平顶级单打比赛中，选手跑动覆盖的距离大约是多少？",
        "options": [
          "1 公里以下",
          "大约 2 公里",
          "5 至 6 公里，包含海量急停、变速冲刺、大跨步急救与极限起跳",
          "超过 15 公里"
        ],
        "explanation": "运动科学追踪显示，顶尖单打选手在一场激烈三局对决中跑动距离可达 5-6 公里，且全为超高强度的无氧急停与折返。"
      },
      "id": {
        "question": "Kira-kira berapa jarak lari yang ditempuh seorang pemain tunggal top selama pertandingan 3 gim yang intens?",
        "options": [
          "Di bawah 1 kilometer",
          "Sekitar 2 kilometer",
          "Antara 5 hingga 6 kilometer sprint eksplosif, lunge, dan lompatan",
          "Lebih dari 15 kilometer"
        ],
        "explanation": "Studi melacak pemain elit menempuh hingga 6 km gerakan berintensitas tinggi per pertandingan — jauh lebih intens daripada tenis."
      },
      "pl": {
        "question": "Jaki dystans pokonuje czołowy singlista podczas zaciętego 3-setowego meczu na najwyższym poziomie?",
        "options": [
          "Poniżej 1 kilometra",
          "Około 2 kilometrów",
          "Od 5 do 6 kilometrów ciągłych sprintów, wypadów i wyskoków",
          "Ponad 15 kilometrów"
        ],
        "explanation": "Pomiary telemetryczne wykazują, że zawodnik w 3-setowym meczu pokonuje nawet 6 km sprintów o maksymalnej intensywności."
      }
    }
  }
];

function getLocalizedQuestion(q, lang) {
  const l = lang || currentLanguage || 'en';
  if (q && q.i18n && q.i18n[l]) return q.i18n[l];
  if (q && q.i18n && q.i18n.en) return q.i18n.en;
  if (q && q.question) {
    return {
      question: q.question,
      options: q.options || [],
      explanation: q.explanation || ''
    };
  }
  return { question: '', options: [], explanation: '' };
}

// Active subset of questions based on mode/category
let activeQuizQuestions = [...ALL_QUIZ_QUESTIONS];
let currentQuizCategory = 'all';

let quizState = {
  current: 0,
  score: 0,
  answered: false,
  lastSelected: -1,
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
    perfectRun: "🎯 Sempurna! Anda tidak melewatkan satu pertanyaan pun!",
    missedTitle: (n) => `Tinjau kembali ${n} pertanyaan yang salah:`
  },
  pl: {
    counter: (c, t) => `Pytanie ${c} z ${t}`,
    score: (s) => `Wynik: ${s}`,
    correct: "✅ <strong>Prawidłowa odpowiedź!</strong> ",
    wrong: "❌ <strong>Błędna odpowiedź!</strong> ",
    next: "Następne pytanie →",
    finish: "🏁 Zobacz wynik końcowy",
    res_100: { title: "Absolutny Mistrz!", desc: "Zdobyłeś 100%! Posiadasz wiedzę o badmintonie na poziomie olimpijskim!" },
    res_80: { title: "Wybitny Czempion!", desc: "Znakomity wynik! Znasz badminton od podszewki i rozumiesz każdy detal gry!" },
    res_60: { title: "Solidny Zawodnik!", desc: "Świetna robota! Dobrze znasz kluczowe zasady, technikę i taktykę." },
    res_40: { title: "Gracz Klubowy!", desc: "Niezła próba! Przejrzyj poradniki techniki i wymiarów kortu, aby zdobyć jeszcze więcej punktów." },
    res_0: { title: "Trenuj dalej!", desc: "Przeczytaj powyższy przewodnik i spróbuj ponownie — każdy quiz czyni Cię lepszym graczem!" },
    perfectRun: "🎯 Perfekcyjny bieg! Odpowiedziałeś poprawnie na każde pytanie!",
    missedTitle: (n) => `Przeanalizuj ${n} błędnych odpowiedzi:`
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
  quizState = { current: 0, score: 0, answered: false, lastSelected: -1, wrongAnswers: [] };
  const resultsEl = document.getElementById('quiz-results');
  const cardEl = document.getElementById('quiz-card');
  if (resultsEl) resultsEl.style.display = 'none';
  if (cardEl) cardEl.style.display = 'block';
  quizRender();
}

function quizRender() {
  if (!activeQuizQuestions || activeQuizQuestions.length === 0) return;
  const cardEl = document.getElementById('quiz-card');
  const resultsEl = document.getElementById('quiz-results');

  // If results screen is currently visible, update results in the current language
  if (resultsEl && resultsEl.style.display !== 'none') {
    quizShowResults();
    return;
  }
  if (cardEl) cardEl.style.display = 'block';

  const q = activeQuizQuestions[quizState.current];
  const qData = getLocalizedQuestion(q, currentLanguage);
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
      id: { 'Shots': '🏸 Teknik Pukulan', 'Rules': '📜 Aturan & Pelanggaran', 'Scoring': '🔢 Skor & Servis', 'Court': '🏟️ Lapangan & Alat', 'History': '⭐ Sejarah & Strategi' },
      pl: { 'Shots': '🏸 Technika uderzeń', 'Rules': '📜 Zasady i błędy', 'Scoring': '🔢 Punktacja i serwis', 'Court': '🏟️ Kort i sprzęt', 'History': '⭐ Historia i taktyka' }
    };
    const currentDict = catLabels[currentLanguage] || catLabels.en;
    catEl.textContent = currentDict[q.category] || q.category;
  }

  if (questionEl) questionEl.textContent = qData.question;

  const optionsEl = document.getElementById('quiz-options');
  if (optionsEl) {
    if (!quizState.answered) {
      if (feedbackEl) feedbackEl.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      optionsEl.innerHTML = '';
      qData.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = () => quizAnswer(i);
        optionsEl.appendChild(btn);
      });
    } else {
      // If already answered, update option texts without losing styling or answer state
      const btns = optionsEl.querySelectorAll('.quiz-option');
      btns.forEach((btn, i) => {
        if (qData.options[i]) btn.textContent = qData.options[i];
      });
      // Re-render feedback in new language
      if (feedbackEl && feedbackEl.style.display !== 'none') {
        const correct = quizState.lastSelected === q.answer;
        feedbackEl.innerHTML = (correct ? i18n.correct : i18n.wrong) + qData.explanation;
      }
      // Re-render next button text in new language
      if (nextBtn && nextBtn.style.display !== 'none') {
        const isLast = quizState.current === activeQuizQuestions.length - 1;
        nextBtn.textContent = isLast ? i18n.finish : i18n.next;
      }
    }
  }
}

function quizAnswer(selectedIndex) {
  if (quizState.answered) return;
  quizState.answered = true;
  quizState.lastSelected = selectedIndex;

  const q = activeQuizQuestions[quizState.current];
  const qData = getLocalizedQuestion(q, currentLanguage);
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
    quizState.wrongAnswers.push({ qIndex: quizState.current, qObj: q, selectedIndex: selectedIndex });
  }

  const feedback = document.getElementById('quiz-feedback');
  if (feedback) {
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback ' + (correct ? 'feedback-correct' : 'feedback-wrong');
    feedback.innerHTML = (correct ? i18n.correct : i18n.wrong) + qData.explanation;
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
      const correctPrefix = {
        en: "Correct answer: ",
        vi: "Đáp án chính xác: ",
        zh: "正确答案: ",
        id: "Jawaban benar: ",
        pl: "Prawidłowa odpowiedź: "
      }[currentLanguage] || "Correct: ";

      breakdown.innerHTML = `<p class="breakdown-title">${i18n.missedTitle(quizState.wrongAnswers.length)}</p>` +
        quizState.wrongAnswers.map(w => {
          const qData = getLocalizedQuestion(w.qObj, currentLanguage);
          return `<div class="breakdown-item">❌ <strong>${qData.question}</strong><br><span class="breakdown-correct">✅ ${correctPrefix}${qData.options[w.qObj.answer]}</span></div>`;
        }).join('');
    } else {
      breakdown.innerHTML = `<p class="breakdown-title">${i18n.perfectRun}</p>`;
    }
  }
}

function quizRestart() {
  quizInit();
}


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
  id: { playing: "Memutar • Lagu Resmi BWF", paused: "Dijeda • Klik untuk putar" },
  pl: { playing: "Odtwarzanie • Oficjalny hymn BWF", paused: "Wstrzymano • Kliknij, aby odtworzyć" }
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
  },
  pl: {
    site_title: "SmashPoint | Kompletny Przewodnik po Badmintonie",
    nav_about: "O dyscyplinie",
    nav_facts: "Rekordy świata",
    nav_court: "Kort i zasady",
    nav_shots: "Uderzenia",
    nav_gear: "Sprzęt",
    nav_tracker: "Tablica wyników",
    nav_quiz: "Quiz",
    nav_play_btn: "🎮 Zagraj w Quiz",
    hero_badge: "🏸 Najszybszy Sport Rakietowy na Świecie",
    hero_title: "Precyzja, Zwinność i Eksplozywna <span>Moc</span>.",
    hero_subtitle: "Poznaj oficjalne zasady BWF, opanuj kluczowe uderzenia, zrozum linie kortu i śledź wyniki meczów w czasie rzeczywistym.",
    hero_btn_court: "Interaktywny Przewodnik po Korcie",
    hero_btn_facts: "Odkryj Rekordy Świata 🚀",
    stat_1_label: "Rekord Guinnessa w prędkości smeczu (2023)",
    stat_2_label: "Najdłuższa wymiana w historii BWF (3,5 min)",
    stat_3_label: "#2 Najpopularniejszy sport na świecie",
    about_tag: "Przegląd",
    about_title: "Dlaczego Badminton Przyciąga 220 Milionów Graczy",
    about_subtitle: "Niezrównane połączenie naddźwiękowej prędkości lotki, ekstremalnej wydolności i błyskawicznego zwodzenia rywala.",
    about_card1_title: "565 km/h Naddźwiękowa Prędkość",
    about_card1_desc: "Lotka do badmintona jest najszybszym pociskiem w świecie sportu — wyprzedza bolidy Formuły 1 (372 km/h) oraz japońskie pociągi Shinkansen (320 km/h).",
    about_card2_title: "2x Dłuższy Dystans niż w Tenisie",
    about_card2_desc: "W 75-minutowym meczu zawodnik przebiega ponad 6,4 km, wykonując 1900+ dynamicznych wypadów. Czas gry z lotką w powietrzu wynosi aż 48% wobec zaledwie 18% w tenisie!",
    about_card3_title: "Refleks 0.005 Sekundy",
    about_card3_desc: "Gracz przy siatce reaguje w mniej niż 5 milisekund na potężny smecz z bliska — szybciej niż mrugnięcie ludzkiego oka!",
    facts_tag: "Rekordy Świata i Ciekawostki",
    facts_title: "Niewiarygodne Fakty i Rekordy Badmintona",
    facts_subtitle: "Od smeczu 565 km/h po tajemnicę 16 piór z lewego skrzydła gęsi — odkryj fascynujące fakty o tej dyscyplinie.",
    fact1_badge: "Rekord Guinnessa",
    fact1_title: "Najszybszy Smecz w Historii Ludzkości",
    fact1_desc: "W kwietniu 2023 r. reprezentant Indii <strong>Satwiksairaj Rankireddy</strong> posłał smecz z zawrotną prędkością <strong>565 km/h (351,07 mph)</strong>, potwierdzoną przez Rekordy Guinnessa. Malezyjka <strong>Pearly Tan</strong> ustanowiła rekord kobiet wynikiem <strong>438 km/h</strong> — oba rezultaty deklasują bolidy F1 (372 km/h)!",
    fact1_foot: "Test w laboratorium Yonex • Certyfikowany pomiar",
    fact2_badge: "Tajemnica Aerodynamiki",
    fact2_stat: "16 Piór Gęsich",
    fact2_title: "Tylko Pióra z Lewego Skrzydła",
    fact2_desc: "Turniejowe lotki najwyższej klasy wykonuje się wyłącznie z 16 piór pobranych z <strong>lewego skrzydła</strong> czterech gęsi. Pióra z prawego skrzydła obracają się w drugą stronę; ich wymieszanie powoduje niestabilny, nieregularny lot.",
    fact2_foot: "Standard turniejowy BWF • Naturalne pióra gęsie",
    fact3_badge: "Wyczyn Wytrzymałości",
    fact3_stat: "211 Uderzeń",
    fact3_title: "Najdłuższa Wymiana w Dziejach",
    fact3_desc: "Podczas Malaysia Masters 2023 debel Pearly Tan / M. Thinaah oraz Rena Miyaura / Ayako Sakuramoto walczył nieprzerwanie przez <strong>3 minuty i 30 sekund w 211 kolejnych uderzeniach</strong> przed rozstrzygnięciem punktu — wszystkie cztery zawodniczki padły z wycieńczenia.",
    fact3_foot: "Malaysia Masters 2023 • Oficjalny rekord BWF",
    fact4_badge: "Wysiłek Kardio",
    fact4_stat: "2x Dystans Tenisa",
    fact4_title: "Więcej Biegania niż w Tenisie Ziemnym",
    fact4_desc: "W 75-minutowym meczu badmintona zawodnik pokonuje około <strong>6,4 km</strong> z 1900+ eksplozywnymi wypadami. W 3-godzinnym meczu tenisa zawodnicy przebiegają tylko ~3,2 km, gdyż lotka jest w grze przez <strong>48% czasu meczu</strong> (w tenisie to tylko 18%)!",
    fact4_foot: "Badania fizjologii sportu • Tracking meczów elity",
    fact5_badge: "Początki i Historia",
    fact5_stat: "Lata 60. XIX w. \"Poona\"",
    fact5_title: "Narodził się w Pune, Nazwany w Anglii",
    fact5_desc: "Brytyjscy oficerowie stacjonujący w Pune (Poona) w Indiach w latach 60. XIX wieku dodali siatkę do dawnej gry battledore. Książę Beaufort spopularyzował tę dyscyplinę w swojej posiadłości <strong>Badminton House</strong>, nadając jej trwałą nazwę w 1873 roku.",
    fact5_foot: "Badminton House, Anglia • Dziedzictwo historyczne",
    fact6_badge: "Globalna Popularność",
    fact6_stat: "220M+ Graczy",
    fact6_title: "#2 Najchętniej Uprawiany Sport na Ziemi",
    fact6_desc: "Z ponad <strong>220 milionami aktywnych graczy</strong> badminton zajmuje drugie miejsce na świecie, ustępując jedynie piłce nożnej. Ponad 1,1 miliarda widzów oglądało transmisje z olimpijskich turniejów badmintona w Tokio i Paryżu.",
    fact6_foot: "Globalny spis BWF • Dane transmisyjne MKOl",
    fact7_badge: "Legenda Wszech Czasów",
    fact7_stat: "Super Wielki Szlem",
    fact7_title: "Niezrównany Wyczyn Lin Dana",
    fact7_desc: "Chiński mistrz <strong>Lin Dan (\"Super Dan\")</strong> dokonał czegoś, czego nie powtórzył nikt inny: zdobył pełnego <em>Super Wielkiego Szlema</em>, wygrywając wszystkie 9 głównych turniejów globu przed 28. rokiem życia, w tym 2 Złote Medale Olimpijskie i 5 Mistrzostw Świata.",
    fact7_foot: "2x Złoto Olimpijskie • 5x Mistrz Świata",
    fact8_badge: "Fizyka Lotu",
    fact8_stat: "90% Wytracenia Prędkości",
    fact8_title: "Najostrzejsze Hamowanie w Sporcie",
    fact8_desc: "Lotka traci do <strong>90% swojej prędkości początkowej</strong> na dystansie zaledwie 13,4 metra na skutek potężnego oporu stożka z piór. To gwałtowne hamowanie tworzy charakterystyczny spadek spadochronowy umożliwiający obronę potężnych smeczów.",
    fact8_foot: "Aerodynamika pocisków sportowych",
    court_tag: "Interaktywny Schemat",
    court_title: "Wymiary Kortu i Zasady Serwisu BWF",
    court_subtitle: "Przełączaj między grą pojedynczą a podwójną, aby zobaczyć pole gry i strefy serwisowe.",
    btn_singles: "Gra pojedyncza (Długi i wąski)",
    btn_doubles: "Gra podwójna (Krótki i szeroki)",
    court_net: "SIATKA",
    court_svc_left: "Lewe Pole Serwisu",
    court_svc_right: "Prawe Pole Serwisu",
    shots_tag: "Technika",
    shots_title: "5 Podstawowych Uderzeń w Badmintonie",
    shots_subtitle: "Opanuj kluczowe zagrania, aby zbudować wszechstronny repertuar ataku i obrony.",
    shot0_badge: "Atak",
    shot0_title: "Smecz z forhendu",
    shot0_desc: "Podstawowa broń ofensywna uderzana z góry pod ostrym kątem z maksymalną siłą.",
    shot0_target: "<strong>Cel:</strong> Otwarta przestrzeń środka kortu / Ciało rywala",
    shot1_badge: "Taktyka",
    shot1_title: "Skrót (Drop Shot)",
    shot1_desc: "Subtelne uderzenie zmyłkowe spadające tuż za siatkę po stronie przeciwnika.",
    shot1_target: "<strong>Cel:</strong> Narożniki przedniej części kortu rywala",
    shot2_badge: "Obrona / Głębia",
    shot2_title: "Lob / Clear znad głowy",
    shot2_desc: "Wysokie uderzenie spychające rywala pod samą tylną linię, resetujące tempo wymiany.",
    shot2_target: "<strong>Cel:</strong> Tylna linia końcowa kortu",
    shot3_badge: "Dobicie",
    shot3_title: "Dobicie przy siatce (Net Kill)",
    shot3_desc: "Błyskawiczny strzał z nadgarstka przy taśmie siatki przeciwko zbyt wysokiej lotce rywala.",
    shot3_target: "<strong>Cel:</strong> Ostro w dół w przednie pole przeciwnika",
    shot4_badge: "Szybka wymiana",
    shot4_title: "Drajw (Płaskie uderzenie)",
    shot4_desc: "Płaskie, agresywne uderzenie poziome tuż nad taśmą siatki, kluczowe w deblu.",
    shot4_target: "<strong>Cel:</strong> Ciało przeciwnika lub boczne linie",
    pro_tip_label: "Wskazówka Pro:",
    shots_cta_title: "Gotowy przetestować swoją wiedzę o technice uderzeń?",
    shots_cta_desc: "Sprawdź się w wielkim 50-pytaniowym teście mistrzowskim!",
    shots_cta_btn: "Rozwiąż Quiz Techniki Uderzeń (10) 🎯",
    gear_tag: "Przewodnik Sprzętowy",
    gear_title: "Wybór Odpowiedniego Sprzętu",
    gear_subtitle: "Krótki przewodnik po rakietach, lotkach i obuwiu na kort.",
    gear1_title: "Rakiety",
    gear1_li1: "<strong>Head-Heavy (Ciężka główka):</strong> Potężne smecze, wolniejsza reakcja w obronie.",
    gear1_li2: "<strong>Head-Light (Lekka główka):</strong> Błyskawiczna obrona refleksowa, idealna do debla.",
    gear1_li3: "<strong>Even-Balance (Wyważona):</strong> Uniwersalna do wszechstronnej gry na całym korcie.",
    gear1_li4: "<strong>Waga:</strong> 3U (85-89g), 4U (80-84g - najpopularniejsza waga).",
    gear2_title: "Lotki",
    gear2_li1: "<strong>Piórowe (Gęsie/Kacze):</strong> Autentyczna trajektoria lotu, obowiązkowe w turniejach.",
    gear2_li2: "<strong>Nylonowe / Plastikowe:</strong> Niezwykle trwałe, ekonomiczne do treningu i rekreacji.",
    gear2_li3: "<strong>Klasy prędkości:</strong> Oznaczenia 76-78 zależnie od temperatury i wysokości hali.",
    gear3_title: "Buty i Owijki",
    gear3_li1: "<strong>Podeszwa Non-Marking:</strong> Podeszwa z kauczuku naturalnego obowiązkowa na parkiecie i wykładzinie.",
    gear3_li2: "<strong>Stabilizacja boczna:</strong> Chroni kostki przed skręceniem przy ostrych wypadach i zwrotach.",
    gear3_li3: "<strong>Owijki:</strong> Lepka owijka wierzchnia lub frotte wchłaniająca pot chroni przed wyślizgnięciem rakiety.",
    tracker_tag: "Interaktywne Narzędzie",
    tracker_title: "Tablica Wyników Meczu na Żywo",
    tracker_subtitle: "Śledź punkty wymian, kolejność serwisu i punkty setowe według oficjalnych reguł BWF.",
    player_1: "Gracz 1",
    player_2: "Gracz 2",
    score_add: "+1 Punkt",
    game_badge: "Set 1 z 3",
    btn_reset: "Resetuj Mecz",
    quiz_tag: "Interaktywna Gra",
    quiz_title: "Wielki Mistrzowski Quiz Badmintona (50 Pytań)",
    quiz_subtitle: "Sprawdź wszechstronną wiedzę w 5 kategoriach: uderzenia, oficjalne zasady, punktacja, kort i historia świata.",
    quiz_btn_all: "🏆 Wszystkie 50 Pytań",
    quiz_btn_shots: "🏸 Uderzenia (10)",
    quiz_btn_rules: "📜 Zasady i Błędy (10)",
    quiz_btn_scoring: "🔢 Punktacja i Serwis (10)",
    quiz_btn_court: "🏟️ Kort i Sprzęt (10)",
    quiz_btn_history: "⭐ Historia i Taktyka (10)",
    quiz_btn_random: "🎲 Szybkie Losowe 10",
    quiz_btn_next: "Następne pytanie →",
    quiz_res_title: "Znakomicie!",
    quiz_res_desc: "Naprawdę znasz się na badmintonie!",
    quiz_btn_restart: "🔄 Zagraj Ponownie",
    footer_desc: "Kompletny przewodnik po najbardziej emocjonującym sporcie rakietowym świata.",
    footer_copy: "© 2026 SmashPoint Badminton Guide. Stworzone dla pasjonatów badmintona na całym świecie."
  }
};


// --------------------------------------------------------------------------
// 7. SINGLE BUTTON LANGUAGE SWITCHER & SYNCHRONIZED TRANSLATION ENGINE
// --------------------------------------------------------------------------
const LANG_META = {
  en: { flag: "🇬🇧", label: "English" },
  vi: { flag: "🇻🇳", label: "Tiếng Việt" },
  zh: { flag: "🇨🇳", label: "中文" },
  id: { flag: "🇮🇩", label: "Bahasa Indonesia" },
  pl: { flag: "🇵🇱", label: "Polski" }
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

