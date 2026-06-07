'use strict';
// ════════════════════════════════════════════
//  Cupsize — змп  |  main.js  v2
// ════════════════════════════════════════════

// ─── Данные треков ───────────────────────────────────────────────────────────
// youtube: ID видео на YouTube (если есть официальный клип / live)
// mood: ключевое слово-настроение трека
const TRACKS = [
  { n:1,  title:'Семнадцать ножевых',  anim:'knives',    x:0,  y:7,  w:20, h:21, youtube:'Oud0Cy-WNDo', mood:'злой' },
  { n:2,  title:'Детская травма',       anim:'trauma',    x:20, y:7,  w:19, h:21, mood:'страшный' },
  { n:3,  title:'Вся моя жизнь говно', anim:'trash',     x:39, y:7,  w:19, h:21, mood:'злой' },
  { n:4,  title:'Будка',                anim:'doghouse',  x:58, y:7,  w:19, h:21, mood:'грустный' },
  { n:5,  title:'Розовая могила',       anim:'grave',     x:77, y:7,  w:23, h:21, mood:'мрачный' },
  { n:6,  title:'Следак',               anim:'detective', x:0,  y:28, w:20, h:19, mood:'напряжённый' },
  { n:7,  title:'Черновик',             anim:'notebook',  x:20, y:28, w:19, h:19, mood:'задумчивый' },
  { n:8,  title:'Ты уебалась головой', anim:'head',      x:39, y:28, w:19, h:19, mood:'злой' },
  { n:9,  title:'Первокурсница',        anim:'student',   x:58, y:28, w:19, h:19, mood:'грустный' },
  { n:10, title:'ЗППП',                 anim:'pills',     x:77, y:28, w:23, h:19, mood:'горький' },
  { n:11, title:'Станцуй со мной',      anim:'dance',     x:0,  y:47, w:20, h:13, mood:'нежный' },
  { n:12, title:'Верёвка',              anim:'rope',      x:20, y:47, w:19, h:13, mood:'тёмный' },
  { n:13, title:'Я без ума от тебя',   anim:'heart',     x:39, y:47, w:19, h:13, mood:'нежный' },
  { n:14, title:'Север',                anim:'north',     x:58, y:47, w:19, h:13, mood:'холодный' },
  { n:15, title:'Вата',                 anim:'cotton',    x:77, y:47, w:23, h:13, mood:'мягкий' },
  { n:16, title:'Напорносайтах',        anim:'browser',   x:0,  y:60, w:20, h:13, mood:'горький' },
  { n:17, title:'По барабану',          anim:'drum',      x:20, y:60, w:19, h:13, mood:'злой' },
  { n:18, title:'Велосипед',            anim:'bicycle',   x:39, y:60, w:19, h:13, mood:'нежный' },
  { n:19, title:'Малолетки',            anim:'teens',     x:58, y:60, w:19, h:13, mood:'ностальгия' },
  { n:20, title:'Урод',                 anim:'mirror',    x:77, y:60, w:23, h:13, mood:'горький' },
  { n:21, title:'Сигареты',             anim:'cigarette', x:0,  y:73, w:20, h:10, mood:'ностальгия' },
  { n:22, title:'Неудобно',             anim:'awkward',   x:20, y:73, w:19, h:10, mood:'грустный' },
  { n:23, title:'Тетрадь',              anim:'journal',   x:39, y:73, w:19, h:10, mood:'задумчивый' },
  { n:24, title:'Ванна, красный пол',  anim:'bath',      x:58, y:73, w:19, h:10, mood:'тёмный' },
  { n:25, title:'Все мои поступки',    anim:'chaos',     x:77, y:73, w:23, h:10, mood:'хаос' },
  { n:26, title:'Прыгай, дура!',       anim:'jump',      x:0,  y:83, w:30, h:17, youtube:'JtGJ-quOIgs', mood:'надежда' },
];

// ─── DOM ─────────────────────────────────────────────────────────────────────
const pg0    = document.getElementById('pg0');
const pg1    = document.getElementById('pg1');
const pg2    = document.getElementById('pg2');
const btnYes = document.getElementById('btnYes');
const btnNo  = document.getElementById('btnNo');
const boyWrap= document.getElementById('boyWrap');
const boyImg = document.getElementById('boyImg');
const eyeCanvas = document.getElementById('eyeCanvas');
const eyeCtx  = eyeCanvas.getContext('2d');
const pCounter = document.getElementById('pCounter');
const heroTitle = document.getElementById('heroTitle');
const backBtn= document.getElementById('backBtn');
const tlWrap = document.getElementById('tlWrap');
const tlImg  = document.getElementById('tlImg');
const yaWrap = document.getElementById('yaPlayer');
const overlay= document.getElementById('playerOverlay');
const pClose = document.getElementById('pClose');
const pPrev  = document.getElementById('pPrev');
const pNext  = document.getElementById('pNext');
const pNum   = document.getElementById('pNum');
const pTitle = document.getElementById('pTitle');
const pStage = document.getElementById('pStage');
const pProgress = document.getElementById('pProgress');
const pFill  = document.getElementById('pFill');
const pTimeCur = document.getElementById('pTimeCur');
const pTimeTot = document.getElementById('pTimeTot');
const canvas = document.getElementById('animCanvas');
const ctx    = canvas.getContext('2d');
const pPlay      = document.getElementById('pPlay');
const pLoop      = document.getElementById('pLoop');
const pVolSlider  = document.getElementById('pVolSlider');
const balloonWrap = document.getElementById('balloonWrap');
const pinkVeil= document.getElementById('pinkVeil');
const konamiMsg= document.getElementById('konamiMsg');
const partyPop= document.getElementById('partyPop');
const cryCount= document.getElementById('cryCount');
const pViewToggle = document.getElementById('pViewToggle');
const btnAnim    = document.getElementById('btnAnim');
const btnVideo   = document.getElementById('btnVideo');
const btnLyrics  = document.getElementById('btnLyrics');
const ytWrap      = document.getElementById('ytWrap');
const lyricsPanel = document.getElementById('lyricsPanel');
const playerInner = document.getElementById('playerInner');
const pMood   = document.getElementById('pMood');
const pYtLink = document.getElementById('pYtLink');

// ─── Лайтбокс для фоновых фото ───────────────────────────────────────────────
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  lb.classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ─── Состояние ───────────────────────────────────────────────────────────────
let tears = +(localStorage.getItem('zmp_tears')||0);
let currentTrack = null;
let animRunning = false;
let rafId = null;
let zonesBuilt = false;
let loopMode = false;
let ytMode = false;
// lyricsState: 0=off  1=static  2=karaoke
let lyricsState = 0;
let karaokeLines = [];
let karaokeRafId = null;
let kPrevIdx = -1;
let lyricsFadeTimer = null;

// ─── Счётчик слёз ────────────────────────────────────────────────────────────
if (tears > 0) cryCount.textContent = `ты уже плакал ${tears} раз`;

// ─── Age Gate ────────────────────────────────────────────────────────────────
function showLanding() {
  pg0.classList.remove('active');
  pg1.classList.add('active');
}
if (sessionStorage.getItem('zmk_ok')) {
  showLanding();
}
btnYes.addEventListener('click', () => {
  sessionStorage.setItem('zmk_ok', '1');
  showLanding();
});
btnNo.addEventListener('click', () => {
  document.body.innerHTML = `<div style="height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Caveat',cursive;font-size:28px;color:#1a1612;background:#faf8f4">возвращайся когда вырастешь</div>`;
});

// ─── Howler Audio ─────────────────────────────────────────────────────────────
const AUDIO_BASE = 'audio/';
let howl = null;
let howlPlaying = false;

function playAudio(trackNum) {
  if (howl) { howl.stop(); howl.unload(); howl = null; }
  howlPlaying = false;
  const src = AUDIO_BASE + String(trackNum).padStart(2, '0') + '.mp3';
  howl = new Howl({
    src: [src],
    html5: true,
    volume: +pVolSlider.value,
    onplay()  { howlPlaying = true;  pPlay.textContent = '⏸'; },
    onpause() { howlPlaying = false; pPlay.textContent = '▶'; },
    onstop()  { howlPlaying = false; pPlay.textContent = '▶'; },
    onend() {
      howlPlaying = false;
      if (loopMode) {
        howl.play();
        return;
      }
      if (trackNum === 25) {
        document.body.classList.add('glitch');
        setTimeout(() => document.body.classList.remove('glitch'), 2200);
      }
      const idx = TRACKS.findIndex(t => t.n === trackNum);
      if (idx >= 0 && idx < TRACKS.length - 1) openTrack(TRACKS[idx + 1]);
    },
    onloaderror() { /* нет файла — тихо */ }
  });
  howl.play();
}

function stopAudio() {
  if (howl) { howl.stop(); howl.unload(); howl = null; }
  howlPlaying = false;
  pPlay.textContent = '▶';
  pFill.style.width = '0%';
  pTimeCur.textContent = '0:00';
  pTimeTot.textContent = '0:00';
}

function fmtTime(s) {
  if (!isFinite(s) || s < 0) return '0:00';
  return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
}

setInterval(() => {
  if (!howl || !howlPlaying) return;
  const pos = howl.seek() || 0;
  const dur = howl.duration() || 0;
  if (dur > 0) {
    pFill.style.width = (pos / dur * 100) + '%';
    pTimeCur.textContent = fmtTime(pos);
    pTimeTot.textContent = fmtTime(dur);
  }
}, 250);

// Scrubbing — drag по прогресс-бару
let _seeking = false;

function _doSeek(clientX) {
  if (!howl) return;
  let dur = howl.duration();
  if (!dur || !isFinite(dur)) {
    const snd = howl._sounds && howl._sounds[0];
    dur = snd && snd._node ? snd._node.duration : 0;
  }
  if (!dur || !isFinite(dur) || dur <= 0) return;
  const rect = pProgress.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  howl.seek(ratio * dur);
  pFill.style.width = (ratio * 100) + '%';
  pTimeCur.textContent = fmtTime(ratio * dur);
}

pProgress.addEventListener('mousedown', e => { _seeking = true; _doSeek(e.clientX); });
document.addEventListener('mousemove', e => { if (_seeking) _doSeek(e.clientX); });
document.addEventListener('mouseup', () => { _seeking = false; });

pProgress.addEventListener('touchstart', e => { _seeking = true; _doSeek(e.touches[0].clientX); }, {passive:true});
document.addEventListener('touchmove', e => { if (_seeking) _doSeek(e.touches[0].clientX); }, {passive:true});
document.addEventListener('touchend', () => { _seeking = false; });

// ─── Переходы страниц ─────────────────────────────────────────────────────────
boyWrap.addEventListener('click', () => {
  tears++;
  localStorage.setItem('zmp_tears', tears);
  cryCount.textContent = `ты уже плакал ${tears} раз`;
  pg1.classList.remove('active');
  pg2.classList.add('active');
  buildZones();
});

backBtn.addEventListener('click', () => {
  pg2.classList.remove('active');
  pg1.classList.add('active');
  closePlayer();
  balloonWrap.classList.remove('vis');
  document.body.style.background = '';
});

// ─── Eye tracking (canvas) ─────────────────────────────────────────────────────
let eyeL = {tx:0,ty:0,cx:0,cy:0}, eyeR = {tx:0,ty:0,cx:0,cy:0};

function resizeEyeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  eyeCanvas.width  = boyImg.offsetWidth  * dpr;
  eyeCanvas.height = boyImg.offsetHeight * dpr;
  eyeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function renderEyes() {
  const sp = 0.10;
  eyeL.cx += (eyeL.tx - eyeL.cx) * sp;
  eyeL.cy += (eyeL.ty - eyeL.cy) * sp;
  eyeR.cx += (eyeR.tx - eyeR.cx) * sp;
  eyeR.cy += (eyeR.ty - eyeR.cy) * sp;

  const W = boyImg.offsetWidth, H = boyImg.offsetHeight;
  eyeCtx.clearRect(0, 0, W, H);

  const rx = W * 0.038, ry = H * 0.032;
  [
    [W*0.330 + eyeL.cx, H*0.422 + eyeL.cy],
    [W*0.628 + eyeR.cx, H*0.422 + eyeR.cy]
  ].forEach(([cx, cy]) => {
    eyeCtx.fillStyle = 'rgba(8,6,4,0.72)';
    eyeCtx.beginPath();
    eyeCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
    eyeCtx.fill();
    eyeCtx.fillStyle = 'rgba(255,255,255,0.60)';
    eyeCtx.beginPath();
    eyeCtx.ellipse(cx - rx*0.28, cy - ry*0.30, rx*0.32, ry*0.22, 0, 0, Math.PI*2);
    eyeCtx.fill();
  });

  requestAnimationFrame(renderEyes);
}

document.addEventListener('mousemove', e => {
  if (!pg1.classList.contains('active')) return;
  const r = boyImg.getBoundingClientRect();
  if (!r.width) return;
  const lx=r.left+r.width*0.330, ly=r.top+r.height*0.422;
  const rx=r.left+r.width*0.628, ry=r.top+r.height*0.422;
  eyeL.tx = calcNudge(e.clientX,e.clientY,lx,ly,5).x;
  eyeL.ty = calcNudge(e.clientX,e.clientY,lx,ly,5).y;
  eyeR.tx = calcNudge(e.clientX,e.clientY,rx,ry,5).x;
  eyeR.ty = calcNudge(e.clientX,e.clientY,rx,ry,5).y;
});

function calcNudge(mx,my,ex,ey,max) {
  const dx=mx-ex,dy=my-ey,a=Math.atan2(dy,dx),d=Math.min(Math.hypot(dx,dy)/30,1)*max;
  return {x:Math.cos(a)*d, y:Math.sin(a)*d};
}

// Глаза убраны

// ─── Построить зоны треклиста ─────────────────────────────────────────────────
function buildZones() {
  if (zonesBuilt) return;
  zonesBuilt = true;

  TRACKS.forEach(t => {
    const zone = document.createElement('div');
    zone.className = 'track-zone';
    zone.id = 'zone-' + t.n;
    zone.style.left   = t.x + '%';
    zone.style.top    = t.y + '%';
    zone.style.width  = t.w + '%';
    zone.style.height = t.h + '%';

    const label = document.createElement('span');
    label.className = 'zone-label';
    label.textContent = t.title;

    zone.appendChild(label);
    zone.addEventListener('click', () => openTrack(t));
    if (t.n === 12) ropeEgg(zone);
    tlWrap.appendChild(zone);
  });
}

// ─── LRC парсер ───────────────────────────────────────────────────────────────
function parseLRC(str) {
  return str.split('\n')
    .map(line => {
      const m = line.match(/^\[(\d+):(\d+\.\d+)\]\s*(.*)/);
      if (!m) return null;
      return { time: parseInt(m[1]) * 60 + parseFloat(m[2]), text: m[3].trim() };
    })
    .filter(l => l && l.text);
}


// ─── Статичный текст ──────────────────────────────────────────────────────────
function showStaticLyrics(trackN) {
  const raw = (typeof LYRICS !== 'undefined' && LYRICS[trackN]) || null;
  lyricsPanel.innerHTML = raw
    ? raw.split('\n').map(l =>
        l ? '<p class="lyr-line">' + l + '</p>'
          : '<span class="lyr-gap"></span>'
      ).join('')
    : '<p class="no-lyrics">текст не найден</p>';
  lyricsPanel.scrollTop = 0;
}

// ─── Каraоке: строим DOM один раз ────────────────────────────────────────────
function buildKaraokeDOM(lines) {
  lyricsPanel.innerHTML = lines.map((line, i) =>
    '<p class="kline kline-future" data-time="' + line.time + '" data-idx="' + i + '">' +
    line.text + '</p>'
  ).join('');
  lyricsPanel.scrollTop = 0;

  lyricsPanel.querySelectorAll('.kline').forEach(el => {
    el.addEventListener('click', () => {
      if (howl) { howl.seek(parseFloat(el.dataset.time)); kPrevIdx = -1; }
    });
  });
}

// ─── Каraоке: обновляем подсветку строк ──────────────────────────────────────
function updateKaraokeHighlight(pos) {
  let idx = -1;
  for (let i = 0; i < karaokeLines.length; i++) {
    if (karaokeLines[i].time <= pos) idx = i; else break;
  }
  if (idx === kPrevIdx) return;
  kPrevIdx = idx;

  lyricsPanel.querySelectorAll('.kline').forEach((el, i) => {
    el.className = 'kline ' + (i < idx ? 'kline-past' : i === idx ? 'kline-cur' : 'kline-future');
  });

  if (idx >= 0) {
    const el = lyricsPanel.querySelectorAll('.kline')[idx];
    if (el) {
      const top = el.offsetTop - lyricsPanel.clientHeight / 2 + el.clientHeight / 2;
      lyricsPanel.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }
}

// ─── Каraоке RAF ─────────────────────────────────────────────────────────────
function karaokeFrame() {
  if (lyricsState !== 2 || !currentTrack) return;
  karaokeRafId = requestAnimationFrame(karaokeFrame);
  if (!howl || karaokeLines.length === 0) return;
  const pos = howl.seek();
  if (typeof pos === 'number') updateKaraokeHighlight(pos);
}

function startKaraoke(trackN) {
  stopKaraoke();
  const lrc = (typeof KARAOKE !== 'undefined') && KARAOKE[trackN];
  if (!lrc) {
    lyricsPanel.innerHTML = '<p class="no-lyrics">каráoke недоступно</p>';
    return;
  }
  karaokeLines = parseLRC(lrc);
  kPrevIdx = -1;
  buildKaraokeDOM(karaokeLines);
  karaokeRafId = requestAnimationFrame(karaokeFrame);
}

function stopKaraoke() {
  if (karaokeRafId) { cancelAnimationFrame(karaokeRafId); karaokeRafId = null; }
  karaokeLines = [];
  kPrevIdx = -1;
}

// ─── Переключатель вида ───────────────────────────────────────────────────────
// mode: 'anim' | 'yt' | 'lyrics' | 'karaoke'
function setView(mode) {
  ytMode = (mode === 'yt');
  lyricsState = mode === 'lyrics' ? 1 : mode === 'karaoke' ? 2 : 0;
  const hasText = lyricsState > 0;

  // Анимация всегда видна (кроме режима клипа)
  canvas.style.display = ytMode ? 'none' : 'block';
  ytWrap.classList.toggle('active', ytMode);

  // Раскрыть/закрыть текстовую панель
  lyricsPanel.classList.toggle('active', hasText);
  playerInner.classList.toggle('has-lyrics', hasText && !ytMode);

  btnAnim.classList.toggle('active',   mode === 'anim');
  btnVideo.classList.toggle('active',  ytMode);
  btnLyrics.classList.toggle('active', hasText);
  btnLyrics.textContent = lyricsState === 1 ? '✎ текст' : '♩ кар.';

  stopKaraoke();
  clearTimeout(lyricsFadeTimer);
  lyricsFadeTimer = null;
  const panelWasVisible = lyricsPanel.classList.contains('active') && lyricsPanel.innerHTML;
  const doContent = () => {
    if (lyricsState === 1 && currentTrack) showStaticLyrics(currentTrack.n);
    if (lyricsState === 2 && currentTrack) startKaraoke(currentTrack.n);
  };
  if (hasText && panelWasVisible) {
    lyricsPanel.style.opacity = '0';
    lyricsFadeTimer = setTimeout(() => {
      lyricsFadeTimer = null;
      doContent();
      lyricsPanel.style.opacity = '';
    }, 160);
  } else {
    lyricsPanel.style.opacity = '';
    doContent();
  }
}

function loadYT(videoId) {
  ytWrap.innerHTML = `<iframe
    src="https://www.youtube.com/embed/${videoId}?autoplay=0&loop=1&playlist=${videoId}&mute=0&controls=1&rel=0&modestbranding=1"
    allow="autoplay; encrypted-media; fullscreen"
    allowfullscreen></iframe>`;
}

function loadTikTok(videoId) {
  // TikTok embed: videoId — числовой ID из URL видео
  ytWrap.innerHTML = `<iframe
    src="https://www.tiktok.com/embed/v2/${videoId}"
    allow="autoplay; encrypted-media"
    allowfullscreen
    style="width:100%;height:100%;border:none;"></iframe>`;
}

btnAnim.addEventListener('click', () => setView('anim'));
btnVideo.addEventListener('click', () => {
  if (!currentTrack) return;
  if (currentTrack.tiktok) { loadTikTok(currentTrack.tiktok); setView('yt'); }
  else if (currentTrack.youtube) { loadYT(currentTrack.youtube); setView('yt'); }
});
// Цикл: аним→кар.→текст→аним
btnLyrics.addEventListener('click', () => {
  if (lyricsState === 0) setView('karaoke');
  else if (lyricsState === 2) setView('lyrics');
  else setView('anim');
});

// ─── Открыть трек ─────────────────────────────────────────────────────────────
function openTrack(t) {
  currentTrack = t;
  pNum.textContent = '#' + String(t.n).padStart(2,'0');
  pTitle.textContent = t.title;
  pMood.textContent = t.mood || '';
  const idx = TRACKS.indexOf(t);
  pCounter.textContent = (idx+1) + ' / ' + TRACKS.length;

  // Текст: сбросить fade и обновить при смене трека
  clearTimeout(lyricsFadeTimer);
  lyricsFadeTimer = null;
  lyricsPanel.style.opacity = '';
  if (lyricsState === 1) showStaticLyrics(t.n);
  if (lyricsState === 2) startKaraoke(t.n);

  // YouTube / TikTok ссылка и кнопка клипа
  if (t.youtube || t.tiktok) {
    btnVideo.style.display = '';
    if (t.youtube) {
      pYtLink.href = 'https://www.youtube.com/watch?v=' + t.youtube;
      pYtLink.textContent = 'смотреть на YouTube ↗';
    } else {
      pYtLink.href = 'https://www.tiktok.com/@cupsize/video/' + t.tiktok;
      pYtLink.textContent = 'смотреть в TikTok ↗';
    }
    pYtLink.style.display = '';
    if (ytMode && t.tiktok) loadTikTok(t.tiktok);
    else if (ytMode && t.youtube) loadYT(t.youtube);
  } else {
    btnVideo.style.display = 'none';
    pYtLink.style.display = 'none';
    ytWrap.innerHTML = '';
    if (ytMode) setView('anim');
  }

  overlay.classList.add('open');
  resizeCanvas();
  startAnim(t.anim);

  document.querySelectorAll('.track-zone').forEach(z => z.classList.remove('playing'));
  const z = document.getElementById('zone-'+t.n);
  if (z) z.classList.add('playing');

  document.body.style.background = t.n === 24 ? '#d4c8c0' : '';

  pFill.style.width = '0%';
  pTimeCur.textContent = '0:00';
  pTimeTot.textContent = '0:00';
  playAudio(t.n);
}

function closePlayer() {
  overlay.classList.remove('open');
  animRunning = false;
  cancelAnimationFrame(rafId);
  stopKaraoke();
  lyricsState = 0;
  document.querySelectorAll('.track-zone').forEach(z => z.classList.remove('playing'));
  currentTrack = null;
  stopAudio();
  ytWrap.innerHTML = '';
  lyricsPanel.innerHTML = '';
  pYtLink.style.display = 'none';
  btnVideo.style.display = '';
  playerInner.classList.remove('has-lyrics');
  lyricsPanel.classList.remove('active');
  canvas.style.display = 'block';
  ytWrap.classList.remove('active');
  btnAnim.classList.add('active');
  btnVideo.classList.remove('active');
  btnLyrics.classList.remove('active');
  btnLyrics.textContent = '♩ кар.';
}

function prevTrack() {
  if (!currentTrack) return;
  const idx = TRACKS.findIndex(t => t.n === currentTrack.n);
  if (idx > 0) openTrack(TRACKS[idx - 1]);
}

function nextTrack() {
  if (!currentTrack) return;
  const idx = TRACKS.findIndex(t => t.n === currentTrack.n);
  if (idx >= 0 && idx < TRACKS.length - 1) openTrack(TRACKS[idx + 1]);
}

pClose.addEventListener('click', closePlayer);
pPrev.addEventListener('click', prevTrack);
pNext.addEventListener('click', nextTrack);

pPlay.addEventListener('click', () => {
  if (!howl) return;
  if (howlPlaying) { howl.pause(); }
  else             { howl.play(); }
});

pLoop.addEventListener('click', () => {
  loopMode = !loopMode;
  pLoop.classList.toggle('on', loopMode);
});

pVolSlider.addEventListener('input', () => {
  const v = +pVolSlider.value;
  if (howl) howl.volume(v);
  Howler.volume(v);
});

overlay.addEventListener('click', e => { if (e.target === overlay) closePlayer(); });

// Клавиатура
document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  { e.preventDefault(); prevTrack(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); nextTrack(); }
  if (e.key === 'Escape')     { closePlayer(); }
  if (e.key === ' ')          { e.preventDefault(); pPlay.click(); }
  if (e.key === 'l' || e.key === 'л') { pLoop.click(); }
});

// Свайп в плеере
let _swipeX = 0;
overlay.addEventListener('touchstart', e => { _swipeX = e.touches[0].clientX; }, {passive:true});
overlay.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - _swipeX;
  if (Math.abs(dx) > 48) { dx < 0 ? nextTrack() : prevTrack(); }
});

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = pStage.clientWidth  * dpr;
  canvas.height = pStage.clientHeight * dpr;
  ctx.scale(dpr, dpr);
}

// ─── Рисовальные вспомогательные функции ──────────────────────────────────────
const INK  = '#1a1612';
const RED  = '#c8281a';
const PAPER= '#f2ede6';

function sketchLine(x1,y1,x2,y2,wobble=1.5) {
  const dx=x2-x1,dy=y2-y1;
  const steps=Math.max(3,Math.floor(Math.sqrt(dx*dx+dy*dy)/8));
  ctx.beginPath(); ctx.moveTo(x1,y1);
  for(let i=1;i<=steps;i++){
    const t=i/steps;
    ctx.lineTo(x1+dx*t+(Math.random()-0.5)*wobble, y1+dy*t+(Math.random()-0.5)*wobble);
  }
  ctx.stroke();
}

function sketchCircle(cx,cy,r,wobble=1.5) {
  const steps=Math.max(20,Math.floor(r*0.8));
  ctx.beginPath();
  for(let i=0;i<=steps+2;i++){
    const a=(i/steps)*Math.PI*2+(Math.random()-0.5)*0.08;
    const rr=r+(Math.random()-0.5)*wobble;
    const x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();
}

function rnd(a,b){return a+Math.random()*(b-a);}

function grain(alpha=0.03){
  const W=cW(),H=cH(),sv=ctx.globalAlpha;
  ctx.globalAlpha=alpha;ctx.fillStyle='#000';
  for(let i=0;i<350;i++) ctx.fillRect(Math.random()*W,Math.random()*H,1.5,1.5);
  ctx.globalAlpha=sv;
}


function startAnim(type) {
  animRunning = false;
  cancelAnimationFrame(rafId);
  const W=canvas.width/(window.devicePixelRatio||1);
  const H=canvas.height/(window.devicePixelRatio||1);
  ctx.clearRect(0,0,W,H);
  animRunning = true;
  const map = {
    knives,trauma,trash,doghouse,grave,detective,notebook,
    head,student,pills,dance,rope,heart,north,cotton,
    browser,drum,bicycle,teens,mirror,cigarette,awkward,
    bath,chaos,jump,journal
  };
  (map[type]||chaos)();
}

// ─── 26 АНИМАЦИЙ ──────────────────────────────────────────────────────────────

function knives(){
  const W=cW(),H=cH();
  const ks=Array.from({length:17},(_,i)=>({x:rnd(0.05,0.95)*W,y:-rnd(20,200),spd:rnd(1.2,3.5),ang:rnd(-0.15,0.15),len:rnd(35,60),delay:i*7}));
  const stuck=[
    {x:W*0.12,len:50,ang:-0.18},{x:W*0.34,len:44,ang:0.08},{x:W*0.58,len:56,ang:-0.06},{x:W*0.82,len:48,ang:0.14}
  ];
  function f(){
    if(!animRunning)return;
    ctx.clearRect(0,0,W,H); ctx.fillStyle=PAPER; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(26,22,18,0.04)'; ctx.lineWidth=0.5;
    for(let i=0;i<W;i+=22) sketchLine(i,0,i,H,0.5);
    ctx.font=`bold ${W*0.45}px Caveat`; ctx.fillStyle='rgba(200,40,26,0.07)';
    ctx.textAlign='center'; ctx.fillText('17',W/2,H*0.65);
    stuck.forEach((k,i)=>{
      const ky=H*0.85;
      ctx.save();ctx.translate(k.x,ky);ctx.rotate(k.ang);
      ctx.strokeStyle=INK;ctx.lineWidth=1.8;
      ctx.beginPath();ctx.moveTo(0,-k.len*0.5);ctx.lineTo(3,k.len*0.25);ctx.lineTo(-3,k.len*0.25);ctx.closePath();ctx.stroke();
      ctx.fillStyle='rgba(55,38,18,0.7)';ctx.fillRect(-4,k.len*0.25,8,k.len*0.22);
      ctx.strokeStyle=INK;ctx.lineWidth=1;ctx.strokeRect(-4,k.len*0.25,8,k.len*0.22);
      ctx.restore();
    });
    ks.forEach(k=>{
      if(k.delay>0){k.delay--;return;} k.y+=k.spd;
      if(k.y>H+60){k.y=-60;k.x=rnd(0.05,0.95)*W;k.delay=rnd(20,60);}
      ctx.save(); ctx.translate(k.x,k.y); ctx.rotate(k.ang+Math.sin(Date.now()*0.001+k.x)*0.03);
      ctx.strokeStyle=INK; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(0,-k.len*0.5+(Math.random()-0.5));
      ctx.lineTo(3+(Math.random()-0.5)*0.5,k.len*0.25);
      ctx.lineTo(-3+(Math.random()-0.5)*0.5,k.len*0.25); ctx.closePath(); ctx.stroke();
      ctx.fillStyle='rgba(60,40,20,0.6)'; ctx.fillRect(-4,k.len*0.25,8,k.len*0.22);
      ctx.strokeStyle=INK; ctx.lineWidth=1; ctx.strokeRect(-4,k.len*0.25,8,k.len*0.22);
      sketchLine(-7,k.len*0.25,7,k.len*0.25,0.5);
      ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=1;
      sketchLine(1,-k.len*0.45,-0.5,-k.len*0.1,0.3);
      ctx.restore();
    });
    rafId=requestAnimationFrame(f);
  }f();
}

function trauma(){
  const W=cW(),H=cH();
  const fragments=Array.from({length:9},()=>({
    x:rnd(0,W),y:rnd(0,H),w:rnd(38,105),h:rnd(28,72),
    vx:rnd(-0.12,0.12),vy:rnd(-0.08,0.08),alpha:rnd(0.05,0.18)
  }));
  function drawChild(x,y,s,a){
    ctx.globalAlpha=a;ctx.strokeStyle=INK;ctx.lineWidth=1.5;
    sketchCircle(x,y-s*2.5,s*0.72,1);
    ctx.save();ctx.translate(x,y);ctx.rotate(-0.28);
    sketchLine(0,-s*1.72,0,s*0.35,1);
    sketchLine(0,-s*0.85,-s*1.25,-s*0.18,1);
    sketchLine(0,-s*0.85,s*0.85,-s*1.1,1);
    sketchLine(0,s*0.35,-s*0.9,s*1.75,1);
    sketchLine(0,s*0.35,s*0.72,s*1.65,1);
    ctx.restore();ctx.globalAlpha=1;
  }
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle='#ede8e0';ctx.fillRect(0,0,W,H);
    const vig=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.75);
    vig.addColorStop(0,'rgba(0,0,0,0)');vig.addColorStop(1,`rgba(0,0,0,${0.52+0.18*Math.sin(t*0.25)})`);
    ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);
    fragments.forEach(fr=>{
      fr.x+=fr.vx;fr.y+=fr.vy;
      const a=fr.alpha*(0.5+0.5*Math.sin(t*0.38+fr.x*0.01));
      ctx.strokeStyle=`rgba(26,22,18,${a})`;ctx.lineWidth=1;
      ctx.strokeRect(fr.x,fr.y,fr.w,fr.h);
      ctx.fillStyle=`rgba(26,22,18,${a*0.22})`;ctx.fillRect(fr.x,fr.y,fr.w,fr.h);
    });
    if(Math.random()<0.05){ctx.strokeStyle='rgba(26,22,18,0.1)';ctx.lineWidth=0.5;const slx=rnd(0,W);sketchLine(slx,0,slx+rnd(-4,4),H,0.3);}
    const shake=(Math.sin(t*19)*2+Math.sin(t*31)*1)*Math.abs(Math.sin(t*0.38));
    drawChild(W/2+shake,H*0.56,W*0.075,0.85);
    const ty=H*0.32+(t*28)%(H*0.26);
    if(ty<H*0.54){ctx.beginPath();ctx.arc(W/2+shake,ty,3.5,0,Math.PI*2);ctx.fillStyle='rgba(74,122,181,0.65)';ctx.fill();}
    grain(0.035);
    rafId=requestAnimationFrame(f);
  }f();
}

function trash(){
  const W=cW(),H=cH();
  const deb=Array.from({length:35},()=>({x:rnd(0,W),y:rnd(0,H),vx:rnd(-1,1),vy:rnd(-2,-0.5),rot:rnd(0,Math.PI*2),rs:rnd(-0.04,0.04),size:rnd(8,24),type:Math.floor(rnd(0,4))}));
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H); ctx.fillStyle=PAPER; ctx.fillRect(0,0,W,H);
    const cx=W/2,cy=H*0.62,tw=W*0.22,th=W*0.3;
    ctx.strokeStyle=INK; ctx.lineWidth=2;
    sketchLine(cx-tw*0.55,cy-th*0.5,cx+tw*0.55,cy-th*0.5,1);
    sketchLine(cx-tw*0.3,cy-th*0.55,cx+tw*0.3,cy-th*0.55,1);
    ctx.beginPath(); ctx.moveTo(cx-tw*0.5,cy-th*0.5); ctx.lineTo(cx-tw*0.5-5,cy+th*0.5); ctx.lineTo(cx+tw*0.5+5,cy+th*0.5); ctx.lineTo(cx+tw*0.5,cy-th*0.5); ctx.stroke();
    for(let i=1;i<4;i++) sketchLine(cx-tw*0.45+i*(tw*0.3),cy-th*0.45,cx-tw*0.47+i*(tw*0.3),cy+th*0.45,0.5);
    deb.forEach(d=>{
      d.x+=d.vx; d.y+=d.vy; d.rot+=d.rs;
      if(d.y<-30){d.y=H+10;d.x=rnd(0,W);}
      ctx.save(); ctx.translate(d.x,d.y); ctx.rotate(d.rot);
      ctx.strokeStyle=INK; ctx.lineWidth=1.5;
      if(d.type===0) ctx.strokeRect(-d.size/2,-d.size*0.7,d.size,d.size*1.3);
      else if(d.type===1) sketchCircle(0,0,d.size/2,1);
      else if(d.type===2){sketchLine(-d.size/2,0,d.size/2,0,0.5);sketchLine(0,-d.size/2,0,d.size/2,0.5);}
      else{ctx.font=`${d.size}px Caveat`;ctx.fillStyle='rgba(26,22,18,0.4)';ctx.textAlign='center';ctx.fillText('☆',0,d.size/3);}
      ctx.restore();
    });
    rafId=requestAnimationFrame(f);
  }f();
}

function doghouse(){
  const W=cW(),H=cH();
  const rain=Array.from({length:90},()=>({x:rnd(0,W),y:rnd(0,H),spd:rnd(5,10),len:rnd(8,18)}));
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#eef2f8'; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(74,122,181,0.35)'; ctx.lineWidth=1;
    rain.forEach(r=>{sketchLine(r.x,r.y,r.x-3,r.y+r.len,0.3);r.y+=r.spd;if(r.y>H){r.y=-20;r.x=rnd(0,W);}});
    ctx.strokeStyle='rgba(26,22,18,0.3)'; ctx.lineWidth=1; sketchLine(0,H*0.78,W,H*0.78,1.5);
    const cx=W/2,cy=H*0.55,dw=W*0.32,dh=H*0.26;
    ctx.strokeStyle=INK; ctx.lineWidth=2;
    sketchLine(cx-dw*0.62,cy-dh*0.55,cx,cy-dh*1.15,1); sketchLine(cx,cy-dh*1.15,cx+dw*0.62,cy-dh*0.55,1);
    sketchLine(cx-dw*0.65,cy-dh*0.5,cx+dw*0.65,cy-dh*0.5,1);
    ctx.beginPath(); ctx.moveTo(cx-dw*0.5,cy-dh*0.5); ctx.lineTo(cx-dw*0.5,cy+dh*0.45); ctx.lineTo(cx+dw*0.5,cy+dh*0.45); ctx.lineTo(cx+dw*0.5,cy-dh*0.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy+dh*0.15,dw*0.16,Math.PI,0); ctx.stroke();
    sketchLine(cx-dw*0.16,cy+dh*0.15,cx-dw*0.16,cy+dh*0.43,1);
    sketchLine(cx+dw*0.16,cy+dh*0.15,cx+dw*0.16,cy+dh*0.43,1);
    const bob=Math.sin(t*1.5)*3;
    ctx.strokeStyle=INK; ctx.lineWidth=1.5;
    sketchCircle(cx,cy+dh*0.25+bob,dw*0.09,1);
    ctx.beginPath(); ctx.arc(cx-dw*0.04,cy+dh*0.23+bob,2.5,0,Math.PI*2); ctx.fillStyle=INK; ctx.fill();
    ctx.beginPath(); ctx.arc(cx+dw*0.04,cy+dh*0.23+bob,2.5,0,Math.PI*2); ctx.fill();
    rafId=requestAnimationFrame(f);
  }f();
}

function grave(){
  const W=cW(),H=cH();
  const petals=Array.from({length:22},()=>({x:rnd(0,W),y:rnd(-20,H*0.7),vx:rnd(-0.5,0.5),vy:rnd(0.3,1),rot:rnd(0,Math.PI*2),rs:rnd(-0.03,0.03),size:rnd(5,12)}));
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#1a0a1e');sky.addColorStop(0.6,'#3d1535');sky.addColorStop(1,'#220d1a');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    const fog=ctx.createRadialGradient(W/2,H*0.5,0,W/2,H*0.5,W*0.65);
    fog.addColorStop(0,`rgba(220,90,150,${0.13+0.04*Math.sin(t*0.5)})`);fog.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=fog;ctx.fillRect(0,0,W,H);
    for(let i=0;i<25;i++){
      const sx=(Math.sin(i*3.7)*0.5+0.5)*W,sy=(Math.sin(i*2.3)*0.32+0.05)*H;
      ctx.beginPath();ctx.arc(sx,sy,1,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,180,210,${0.25+0.5*Math.abs(Math.sin(t*0.45+i))})`;ctx.fill();
    }
    const gy=H*0.7;
    ctx.fillStyle='rgba(14,4,10,0.92)';ctx.fillRect(0,gy,W,H);
    ctx.strokeStyle='rgba(180,80,120,0.4)';ctx.lineWidth=1.5;sketchLine(0,gy,W,gy,1.5);
    const cx=W/2,cy=H*0.42,gw=W*0.19,gh=H*0.35;
    ctx.strokeStyle='rgba(200,100,150,0.85)';ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(cx,cy-gh*0.28,gw*0.5,Math.PI,0);
    ctx.lineTo(cx+gw*0.5,cy+gh*0.5);ctx.lineTo(cx-gw*0.5,cy+gh*0.5);ctx.closePath();ctx.stroke();
    sketchLine(cx,cy-gh*0.08,cx,cy+gh*0.25,1);sketchLine(cx-gw*0.2,cy+gh*0.08,cx+gw*0.2,cy+gh*0.08,1);
    ctx.font=`${W*0.028}px Caveat`;ctx.fillStyle='rgba(220,130,170,0.75)';ctx.textAlign='center';ctx.fillText('R.I.P',cx,cy-gh*0.46);
    const flpos=[-gw*0.85,-gw*0.35,gw*0.35,gw*0.88];
    flpos.forEach((ox,i)=>{
      const fx=cx+ox,fh=H*0.13*(0.7+0.3*Math.abs(Math.sin(t*0.3+i))),sway=Math.sin(t*0.8+i*1.2)*4;
      ctx.strokeStyle='rgba(180,80,130,0.8)';ctx.lineWidth=1.5;sketchLine(fx,gy,fx+sway,gy-fh,1);
      for(let p=0;p<6;p++){
        const pa=(p/6)*Math.PI*2+t*0.15,pr=fh*0.18;
        ctx.beginPath();ctx.arc(fx+sway+Math.cos(pa)*pr,gy-fh+Math.sin(pa)*pr,pr*0.58,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,130,185,${0.65+0.2*Math.sin(t+p)})`;ctx.fill();
      }
      ctx.beginPath();ctx.arc(fx+sway,gy-fh,fh*0.065,0,Math.PI*2);ctx.fillStyle='rgba(255,220,80,0.85)';ctx.fill();
    });
    petals.forEach(p=>{
      p.x+=p.vx+Math.sin(t*0.5+p.y*0.01)*0.3;p.y+=p.vy;p.rot+=p.rs;
      if(p.y>H+20){p.y=-10;p.x=rnd(0,W);}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.beginPath();ctx.ellipse(0,0,p.size,p.size*0.5,0,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,140,195,${0.38+0.2*Math.sin(t+p.x*0.01)})`;ctx.fill();
      ctx.restore();
    });
    grain(0.025);
    rafId=requestAnimationFrame(f);
  }f();
}

function detective(){
  const W=cW(),H=cH();
  const lines=['ДЕЛО №___','ПОДОЗРЕВ.: ?','МОТИВ: неизвестен','УЛИК: —','СТАТУС: ОТКРЫТО'];
  let revealed=0;
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#f5f0e0'; ctx.fillRect(0,0,W,H);
    const flicker=0.8+0.2*Math.sin(t*13)*Math.sin(t*8);
    const lg=ctx.createRadialGradient(W/2,0,0,W/2,H*0.3,H*0.6);
    lg.addColorStop(0,`rgba(255,220,130,${0.3*flicker})`); lg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=lg; ctx.fillRect(0,0,W,H);
    const dw=W*0.6,dh=H*0.65,dx=(W-dw)/2,dy=(H-dh)/2+10;
    ctx.fillStyle='rgba(220,200,150,0.3)'; ctx.fillRect(dx,dy,dw,dh);
    ctx.strokeStyle=INK; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(dx,dy+20); ctx.lineTo(dx+dw*0.3,dy+20); ctx.lineTo(dx+dw*0.35,dy); ctx.lineTo(dx+dw,dy); ctx.lineTo(dx+dw,dy+dh); ctx.lineTo(dx,dy+dh); ctx.closePath(); ctx.stroke();
    ctx.font=`bold ${W*0.06}px Caveat Brush`; ctx.fillStyle=`rgba(26,22,18,${0.9*flicker})`; ctx.textAlign='center'; ctx.fillText('ДЕЛО',W/2,dy+50);
    ctx.font=`${W*0.04}px Caveat`; ctx.fillStyle='rgba(200,40,26,0.7)'; ctx.fillText('№ '+Math.floor(t*10)%9999,W/2,dy+80);
    revealed=Math.min(lines.length,Math.floor(t/1.8));
    ctx.font=`${W*0.032}px Caveat`; ctx.textAlign='left';
    for(let i=0;i<revealed;i++){
      ctx.fillStyle=`rgba(26,22,18,${0.7+0.2*Math.sin(t*2+i)})`; ctx.fillText(lines[i],dx+dw*0.08,dy+dh*(0.28+i*0.14));
      sketchLine(dx+dw*0.06,dy+dh*(0.3+i*0.14),dx+dw*0.92,dy+dh*(0.3+i*0.14),0.5);
    }
    sketchCircle(dx+dw*0.78,dy+dh*0.25,W*0.07,1); ctx.strokeStyle=`rgba(200,40,26,${0.6*flicker})`; ctx.lineWidth=2;
    sketchLine(dx+dw*0.83,dy+dh*0.32,dx+dw*0.88,dy+dh*0.38,0.5);
    rafId=requestAnimationFrame(f);
  }f();
}

function notebook(){
  const W=cW(),H=cH();
  const text='всё что я чувствую останется здесь навсегда. это черновик. страница за страницей. слова которые никто не прочитает. или прочитает. всё равно.';
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#fefcf8'; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(170,200,240,0.4)'; ctx.lineWidth=0.8;
    for(let y=50;y<H;y+=28) sketchLine(50,y,W-20,y,0.3);
    ctx.strokeStyle='rgba(220,80,80,0.3)'; ctx.lineWidth=1.5; sketchLine(62,0,62,H,0.5);
    ctx.strokeStyle='rgba(100,90,80,0.3)'; ctx.lineWidth=1.5;
    for(let i=0;i<9;i++) sketchCircle(30,45+i*(H-60)/8,7,0.5);
    const cnt=Math.floor(t*14)%(text.length+60),vis=text.substring(0,Math.min(cnt,text.length)),words=vis.split(' ');
    const lh=28,sx=78; let lx=sx,ly=62;
    ctx.font=`${W*0.038}px Caveat`; ctx.fillStyle='rgba(26,22,18,0.85)'; ctx.textAlign='left';
    words.forEach(w=>{
      const ww=ctx.measureText(w+' ').width;
      if(lx+ww>W-25){lx=sx;ly+=lh;}
      if(ly<H-15){ctx.fillText(w,lx,ly);lx+=ww;}
    });
    if(cnt<text.length&&Math.sin(t*5)>0){ctx.fillStyle=INK;ctx.fillRect(lx,ly-18,2,20);}
    rafId=requestAnimationFrame(f);
  }f();
}

function head(){
  const W=cW(),H=cH();
  // Звёзды (как в ZMP2): 5 штук на орбите вокруг головы
  const starPos=[0,Math.PI*0.4,Math.PI*0.8,Math.PI*1.2,Math.PI*1.6];
  function drawStar(x,y,r){
    ctx.beginPath();
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2-Math.PI/2, rv=i%2===0?r:r*0.42;
      const px=x+Math.cos(a)*rv+(Math.random()-0.5)*1.2;
      const py=y+Math.sin(a)*rv+(Math.random()-0.5)*1.2;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.strokeStyle=INK; ctx.lineWidth=1.3; ctx.stroke();
  }
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    const shake=Math.sin(t*22)*4*Math.abs(Math.sin(t*3));
    ctx.clearRect(0,0,W,H); ctx.fillStyle=PAPER; ctx.fillRect(0,0,W,H);
    const cx=W/2+shake, cy=H*0.44, r=W*0.22;
    // Орбитальные звёзды
    const orb=r*1.55;
    starPos.forEach((a0,i)=>{
      const a=a0+t*0.7, sx=cx+Math.cos(a)*orb, sy=cy+Math.sin(a)*orb;
      ctx.globalAlpha=0.85; drawStar(sx,sy,9+Math.sin(t*1.3+i)*2.5); ctx.globalAlpha=1;
    });
    // Голова
    ctx.strokeStyle=INK; ctx.lineWidth=2; sketchCircle(cx,cy,r,1.5);
    // Волосы
    for(let i=0;i<6;i++){const hx=cx-r*0.5+i*(r*0.2); sketchLine(hx,cy-r*0.85,hx+7,cy-r*1.1+Math.sin(i*1.2)*5,1);}
    // Глаза
    const eo=r*0.3;
    for(const ex of[-1,1]){
      sketchCircle(cx+ex*eo,cy-r*0.1,r*0.1,1);
      ctx.beginPath(); ctx.arc(cx+ex*eo+Math.cos(t*8)*r*0.04,cy-r*0.1+Math.sin(t*8)*r*0.04,r*0.04,0,Math.PI*2);
      ctx.fillStyle=RED; ctx.fill();
    }
    // Рот зигзагом
    ctx.strokeStyle=INK; ctx.lineWidth=1.5; ctx.beginPath();
    for(let i=0;i<=6;i++){const mx=cx-r*0.28+i*(r*0.09)+shake*0.3,my=cy+r*0.35+(i%2===0?0:5); i===0?ctx.moveTo(mx,my):ctx.lineTo(mx,my);}
    ctx.stroke();
    rafId=requestAnimationFrame(f);
  }f();
}

function student(){
  const W=cW(),H=cH();
  const books=Array.from({length:10},(_,i)=>({x:rnd(0,W),y:-rnd(0,300),spd:rnd(1.5,3.5),rot:rnd(-0.5,0.5),rs:rnd(-0.03,0.03),w:rnd(28,50),h:rnd(38,60),col:['#c8281a','#e87028','#2850e8','#28a050'][Math.floor(rnd(0,4))]}));
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#f0f4f0'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(40,60,40,0.08)'; ctx.fillRect(0,0,W,H*0.4);
    ctx.font=`${W*0.035}px Caveat`; ctx.fillStyle='rgba(240,240,235,0.2)'; ctx.textAlign='center';
    ctx.fillText('Лекция №∞',W/2,H*0.15); ctx.fillText('Задание: жить',W/2,H*0.25);
    sketchLine(0,H*0.8,W,H*0.8,1.5);
    books.forEach(b=>{
      b.y+=b.spd; b.rot+=b.rs; if(b.y>H+60){b.y=-60;b.x=rnd(0,W);}
      ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(b.rot);
      ctx.fillStyle=b.col+'33'; ctx.fillRect(-b.w/2,-b.h/2,b.w,b.h);
      ctx.strokeStyle=b.col; ctx.lineWidth=1.5; ctx.strokeRect(-b.w/2,-b.h/2,b.w,b.h);
      ctx.restore();
    });
    const fx=W*0.5,fy=H*0.7;
    ctx.strokeStyle='rgba(26,22,18,0.7)'; ctx.lineWidth=2;
    sketchCircle(fx,fy-50,14,1); sketchLine(fx,fy-36,fx,fy,1);
    sketchLine(fx-20,fy-22,fx+20,fy-22,1); sketchLine(fx,fy,fx-12,fy+30,1); sketchLine(fx,fy,fx+12,fy+30,1);
    rafId=requestAnimationFrame(f);
  }f();
}

function pills(){
  const W=cW(),H=cH();
  const ps=Array.from({length:22},()=>({x:rnd(0,W),y:rnd(0,H),spd:rnd(0.8,2.5),rot:rnd(0,Math.PI),rs:0.02,w:rnd(22,42),type:Math.floor(rnd(0,3))}));
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H); ctx.fillStyle=PAPER; ctx.fillRect(0,0,W,H);
    ps.forEach(p=>{
      p.y+=p.spd; p.rot+=p.rs; if(p.y>H+40){p.y=-40;p.x=rnd(0,W);}
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.strokeStyle=INK; ctx.lineWidth=1.5;
      if(p.type===0){ctx.beginPath();ctx.roundRect(-p.w/2,-p.w*0.18,p.w,p.w*0.36,p.w*0.18);ctx.stroke();sketchLine(0,-p.w*0.18,0,p.w*0.18,0.3);}
      else if(p.type===1){sketchCircle(0,0,p.w*0.28,0.8);sketchLine(-p.w*0.2,0,p.w*0.2,0,0.3);}
      else{ctx.lineWidth=2.5;sketchLine(0,-p.w*0.28,0,p.w*0.28,0.5);sketchLine(-p.w*0.28,0,p.w*0.28,0,0.5);}
      ctx.restore();
    });
    const cw=W*0.52,ch=H*0.38,cx=(W-cw)/2,cy=(H-ch)/2;
    ctx.fillStyle='rgba(250,248,244,0.9)'; ctx.fillRect(cx,cy,cw,ch);
    ctx.strokeStyle=INK; ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(cx,cy+12);ctx.lineTo(cx+12,cy);ctx.lineTo(cx+cw,cy);ctx.lineTo(cx+cw,cy+ch);ctx.lineTo(cx,cy+ch);ctx.closePath();ctx.stroke();
    ctx.font=`bold ${W*0.05}px Caveat Brush`; ctx.fillStyle='rgba(200,40,26,0.4)'; ctx.textAlign='center'; ctx.fillText('+',cx+cw*0.88,cy+26);
    ctx.font=`${W*0.04}px Caveat`; ctx.fillStyle='rgba(26,22,18,0.5)'; ctx.fillText('ЗППП',W/2,cy+ch*0.38);
    ctx.font=`${W*0.028}px Caveat`; ctx.fillStyle='rgba(26,22,18,0.3)'; ctx.fillText('АНОНИМНО',W/2,cy+ch*0.75);
    rafId=requestAnimationFrame(f);
  }f();
}

function dance(){
  const W=cW(),H=cH();
  function drawFig(x,y,swing,s,t,m,col){
    ctx.save();ctx.translate(x,y);ctx.strokeStyle=col;ctx.lineWidth=2;
    sketchCircle(0,-s*2.5,s*0.78,1); ctx.rotate(swing*m);
    sketchLine(0,-s*1.72,0,s*0.45,1);
    sketchLine(0,-s*0.85,s*1.6*m,-s*0.1+Math.sin(t*2)*s*0.4,1);
    sketchLine(0,-s*0.85,-s*1.4*m,-s*0.05+Math.sin(t*2+1)*s*0.35,1);
    sketchLine(0,s*0.45,-s*0.9*m,s*1.9+Math.sin(t*4)*s*0.35,1);
    sketchLine(0,s*0.45,s*0.9*m,s*1.9+Math.sin(t*4+1)*s*0.35,1);
    ctx.restore();
  }
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#100d15';ctx.fillRect(0,0,W,H);
    const s1=ctx.createRadialGradient(W/2-W*0.08,H*0.5,0,W/2-W*0.08,H*0.5,W*0.4);
    s1.addColorStop(0,`rgba(255,200,240,${0.18+0.04*Math.sin(t*0.4)})`);s1.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=s1;ctx.fillRect(0,0,W,H);
    const s2=ctx.createRadialGradient(W/2+W*0.06,H*0.5,0,W/2+W*0.06,H*0.5,W*0.38);
    s2.addColorStop(0,`rgba(200,220,255,${0.15+0.05*Math.sin(t*0.5+1)})`);s2.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=s2;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#0c0a12';ctx.fillRect(0,H*0.82,W,H);
    ctx.strokeStyle='rgba(80,60,100,0.4)';ctx.lineWidth=1;sketchLine(0,H*0.82,W,H*0.82,1);
    const notes=['♩','♪','♫','♬'];
    ctx.font=`${W*0.045}px serif`;ctx.textAlign='center';
    for(let i=0;i<5;i++){
      const nx=W/2+Math.sin(t*0.6+i*1.5)*W*0.34,ny=H*0.75-(t*22+i*48)%(H*0.66);
      ctx.globalAlpha=0.18+0.1*Math.sin(t+i);ctx.fillStyle='rgba(200,180,230,0.8)';ctx.fillText(notes[i%4],nx,ny);
    }
    ctx.globalAlpha=1;
    const s=W*0.075,fy=H*0.66;
    drawFig(W/2-W*0.12,fy,Math.sin(t*2)*0.24,s,t,-1,'rgba(255,200,235,0.88)');
    drawFig(W/2+W*0.1,fy,Math.sin(t*2+0.4)*0.24,s,t,1,'rgba(200,220,255,0.88)');
    rafId=requestAnimationFrame(f);
  }f();
}

function rope(){
  const W=cW(),H=cH();
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#09070a'; ctx.fillRect(0,0,W,H);
    const flicker=0.85+0.15*Math.sin(t*11.3)*Math.sin(t*7.1);
    const lg=ctx.createRadialGradient(W/2,H*0.2,0,W/2,H*0.3,H*0.58);
    lg.addColorStop(0,`rgba(255,210,120,${0.22*flicker})`);lg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=lg;ctx.fillRect(0,0,W,H);
    const dg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.7);
    dg.addColorStop(0,'rgba(0,0,0,0)');dg.addColorStop(1,'rgba(0,0,0,0.72)');
    ctx.fillStyle=dg;ctx.fillRect(0,0,W,H);
    const floorY=H*0.83;
    ctx.strokeStyle='rgba(50,34,18,0.5)';ctx.lineWidth=0.9;
    for(let i=0;i<8;i++){const py=floorY+i*13;if(py<H)sketchLine(0,py,W,py,0.5);}
    for(let i=0;i<6;i++)sketchLine(W*i/5,floorY,W*i/5+12,H,0.3);
    ctx.fillStyle='rgba(55,38,20,0.65)';ctx.fillRect(W*0.18,0,W*0.64,14);
    ctx.strokeStyle='rgba(40,26,12,0.7)';ctx.lineWidth=1.5;sketchLine(W*0.18,14,W*0.82,14,0.7);
    const swing=Math.sin(t*0.88)*W*0.09,rl=H*0.41;
    const rc=`rgba(148,108,55,${0.93*flicker})`;
    ctx.strokeStyle=rc;ctx.lineWidth=3.8;
    ctx.beginPath();ctx.moveTo(W/2,14);
    for(let i=0;i<=32;i++){const ry=14+(rl/32)*i,rx=W/2+swing*(i/32)*(i/32);ctx.lineTo(rx+Math.sin(i*2.2+t)*0.4,ry);}
    ctx.stroke();
    ctx.strokeStyle='rgba(88,58,22,0.38)';ctx.lineWidth=1;
    for(let i=1;i<=32;i+=2){const ry=14+(rl/32)*i,rx=W/2+swing*(i/32)*(i/32);sketchLine(rx-2.2,ry,rx+2.2,ry+10,0.2);}
    const lx=W/2+swing,ly=14+rl,lr=W*0.072;
    ctx.strokeStyle=rc;ctx.lineWidth=3.2;sketchCircle(lx,ly+lr,lr,1.3);
    ctx.beginPath();ctx.ellipse(lx+lr*0.4,floorY+4,lr*1.3,lr*0.2,0,0,Math.PI*2);
    ctx.fillStyle=`rgba(0,0,0,${0.38*flicker})`;ctx.fill();
    const bx=W/2,by=H*0.16;
    ctx.strokeStyle=`rgba(225,185,85,${0.7*flicker})`;ctx.lineWidth=1.5;
    sketchCircle(bx,by+10,9,0.6);sketchLine(bx,0,bx,by+1,0.5);
    sketchLine(bx-7,by+19,bx+7,by+19,0.4);
    rafId=requestAnimationFrame(f);
  }f();
}

function heart(){
  const W=cW(),H=cH();
  let cracks=[];
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    const beat=Math.abs(Math.sin(t*2.5));
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#fdf0f0'; ctx.fillRect(0,0,W,H);
    const gg=ctx.createRadialGradient(W/2,H*0.5,0,W/2,H*0.5,W*0.4);
    gg.addColorStop(0,`rgba(220,50,50,${0.2*beat})`);gg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=gg;ctx.fillRect(0,0,W,H);
    const size=W*0.22*(0.85+beat*0.2),cx=W/2,cy=H*0.4;
    ctx.save();ctx.translate(0,size*0.2);
    ctx.beginPath();
    ctx.moveTo(cx,cy+size*0.3);
    ctx.bezierCurveTo(cx,cy,cx-size,cy-size*0.4,cx-size,cy+size*0.1);
    ctx.bezierCurveTo(cx-size,cy+size*0.85,cx,cy+size*1.25,cx,cy+size*1.25);
    ctx.bezierCurveTo(cx,cy+size*1.25,cx+size,cy+size*0.85,cx+size,cy+size*0.1);
    ctx.bezierCurveTo(cx+size,cy-size*0.4,cx,cy,cx,cy+size*0.3);
    ctx.fillStyle=`rgba(220,50,50,${0.12+0.06*beat})`;ctx.fill();
    ctx.strokeStyle=RED;ctx.lineWidth=2.5;ctx.stroke();
    if(Math.sin(t*0.9)>0.85&&cracks.length<8) cracks.push({x:cx+rnd(-size*0.5,size*0.5),y:cy+size*0.5+rnd(0,size*0.5),a:rnd(0,Math.PI*2),len:rnd(15,40)});
    cracks.forEach(c=>{ctx.strokeStyle='rgba(200,40,26,0.5)';ctx.lineWidth=1;sketchLine(c.x,c.y,c.x+Math.cos(c.a)*c.len,c.y+Math.sin(c.a)*c.len,1);});
    ctx.restore();
    rafId=requestAnimationFrame(f);
  }f();
}

function north(){
  const W=cW(),H=cH();
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle='#050b14';ctx.fillRect(0,0,W,H);
    for(let i=0;i<50;i++){
      const sx=(Math.sin(i*2.7+1)*0.5+0.5)*W,sy=(Math.sin(i*1.9+2)*0.4+0.08)*H,sb=0.3+0.6*Math.abs(Math.sin(t*0.7+i));
      ctx.beginPath();ctx.arc(sx,sy,1.2,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,240,${sb*0.7})`;ctx.fill();
    }
    const colors=[[100,255,150],[80,200,255],[150,100,255],[255,200,80]];
    colors.forEach(([r,g,b],band)=>{
      const off=(band/4)*Math.PI*2;
      ctx.beginPath();ctx.moveTo(0,H*0.25);
      for(let x=0;x<=W;x+=8){const w1=Math.sin(x*0.006+t*0.55+off)*H*0.1,w2=Math.sin(x*0.009+t*0.35+off*1.4)*H*0.05;const y=H*(0.17+band*0.055)+w1+w2;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
      ctx.strokeStyle=`rgba(${r},${g},${b},${0.15+0.08*Math.sin(t*0.8+band)})`;ctx.lineWidth=H*0.09;ctx.lineCap='round';ctx.stroke();
    });
    const gy=H*0.77;ctx.fillStyle='#040a12';ctx.fillRect(0,gy,W,H);
    ctx.fillStyle='#06101a';
    for(let tr=0;tr<14;tr++){const tx=(tr/13)*W+Math.sin(tr*4.1)*20,th=H*(0.1+0.09*Math.abs(Math.sin(tr*2.3)));ctx.beginPath();ctx.moveTo(tx,gy);ctx.lineTo(tx-th*0.38,gy-th);ctx.lineTo(tx+th*0.38,gy-th);ctx.closePath();ctx.fill();}
    rafId=requestAnimationFrame(f);
  }f();
}

function cotton(){
  const W=cW(),H=cH();
  const clusters=Array.from({length:5},(_,i)=>({x:rnd(0,W),y:H*(0.15+i*0.12),spd:rnd(0.25,0.7)*(i%2?1:-1),sc:rnd(0.7,1.3)}));
  function drawCloud(x,y,s,a){
    ctx.globalAlpha=a;
    [[0,0,40*s],[-38*s,12*s,28*s],[38*s,12*s,28*s],[-20*s,-20*s,22*s],[20*s,-20*s,22*s]].forEach(([ox,oy,r])=>{sketchCircle(x+ox,y+oy,r,1);});
    ctx.globalAlpha=1;
  }
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle='#f8f6f2';ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(200,200,200,0.5)';ctx.lineWidth=1.5;
    clusters.forEach(c=>{c.x+=c.spd;if(c.x>W+120)c.x=-120;if(c.x<-120)c.x=W+120;drawCloud(c.x,c.y,c.sc,0.6);});
    const stemX=W/2,stemBot=H*0.9,puffY=H*0.43+Math.sin(t*0.6)*6;
    ctx.strokeStyle='rgba(200,150,150,0.7)';ctx.lineWidth=5;sketchLine(stemX,stemBot,stemX,H*0.55,1);
    drawCloud(stemX,puffY,1.5,0.7);
    for(let i=0;i<14;i++){const px=stemX+Math.sin(t*0.5+i*0.9)*W*0.32,py=puffY-50-(t*18+i*22)%(H*0.45);ctx.beginPath();ctx.arc(px,py,rnd(4,10),0,Math.PI*2);ctx.fillStyle=`rgba(255,210,230,${0.25+0.2*Math.sin(t+i)})`;ctx.fill();}
    rafId=requestAnimationFrame(f);
  }f();
}

function browser(){
  const W=cW(),H=cH();
  const searches=['как перестать думать о нём','почему мне плохо','как не чувствовать боль','нет никого рядом','когда это закончится','как жить дальше','зачем вообще'];
  let cs=0,lastSw=0;
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle='#ffffff';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#e8e8e8';ctx.fillRect(0,0,W,50);
    [['#ff5f57'],['#febc2e'],['#28c840']].forEach(([c],i)=>{ctx.beginPath();ctx.arc(18+i*22,22,7,0,Math.PI*2);ctx.fillStyle=c;ctx.fill();});
    ctx.fillStyle='#fff';ctx.fillRect(W*0.22,10,W*0.56,28);
    if(t-lastSw>3.5){lastSw=t;cs=(cs+1)%searches.length;}
    const vis=searches[cs].substring(0,Math.floor((t-lastSw)/0.07));
    ctx.font=`${W*0.026}px Caveat`;ctx.fillStyle='#333';ctx.textAlign='left';ctx.fillText(vis,W*0.24,30);
    if(searches[cs].length>vis.length&&Math.sin(t*5)>0){const tw=ctx.measureText(vis).width;ctx.fillStyle='#333';ctx.fillRect(W*0.24+tw+1,12,1.5,20);}
    ctx.fillStyle='#fff';ctx.fillRect(W*0.04,58,W*0.92,H-62);
    for(let r=0;r<5;r++){const ry=80+r*(H*0.15);ctx.fillStyle='#1a0ae8';ctx.fillRect(W*0.06,ry,W*(0.28+Math.sin(r*2.3)*0.12),9);ctx.fillStyle='#ddd';ctx.fillRect(W*0.06,ry+16,W*(0.55+Math.sin(r*1.9)*0.15),7);ctx.fillRect(W*0.06,ry+28,W*(0.4+Math.sin(r*1.4)*0.12),7);}
    rafId=requestAnimationFrame(f);
  }f();
}

function drum(){
  const W=cW(),H=cH();
  let ripples=[];
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle=PAPER;ctx.fillRect(0,0,W,H);
    const beat=Math.abs(Math.sin(t*4)),cx=W/2,cy=H*0.52,dw=W*0.38,dh=H*0.22;
    ctx.strokeStyle=INK;ctx.lineWidth=2;
    sketchLine(cx-dw/2,cy-dh/2,cx-dw/2,cy+dh/2,1);sketchLine(cx+dw/2,cy-dh/2,cx+dw/2,cy+dh/2,1);
    ctx.beginPath();ctx.ellipse(cx,cy-dh/2,dw/2,dh*0.15,0,0,Math.PI*2);ctx.strokeStyle=`rgba(180,100,40,${0.7+0.3*beat})`;ctx.stroke();
    ctx.beginPath();ctx.ellipse(cx,cy+dh/2,dw/2,dh*0.15,0,0,Math.PI*2);ctx.strokeStyle='rgba(100,80,60,0.5)';ctx.stroke();
    if(beat>0.95&&ripples.length<5)ripples.push({a:dw*0.05,alpha:1});
    ripples=ripples.filter(r=>r.alpha>0);
    ripples.forEach(r=>{ctx.beginPath();ctx.ellipse(cx,cy-dh/2,r.a,r.a*0.3,0,0,Math.PI*2);ctx.strokeStyle=`rgba(200,40,26,${r.alpha})`;ctx.lineWidth=2;ctx.stroke();r.a+=2.5;r.alpha-=0.06;});
    const s1a=-0.5+beat*0.8,s2a=0.5-Math.abs(Math.sin(t*2+0.6))*0.8;
    [[cx-dw*0.1,s1a],[cx+dw*0.1,s2a]].forEach(([sx,sa])=>{ctx.save();ctx.translate(sx,cy-dh/2-8);ctx.rotate(sa);sketchLine(0,0,2,-W*0.25,0.5);ctx.restore();});
    rafId=requestAnimationFrame(f);
  }f();
}

function bicycle(){
  const W=cW(),H=cH();
  let roadOff=0;
  function drawWheel(x,y,r,rot){ctx.save();ctx.translate(x,y);sketchCircle(0,0,r,1.5);for(let s=0;s<8;s++){const a=rot+(s/8)*Math.PI*2;sketchLine(0,0,Math.cos(a)*r,Math.sin(a)*r,0.5);}ctx.restore();}
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    roadOff=(roadOff+3)%80;
    ctx.clearRect(0,0,W,H);
    const sky=ctx.createLinearGradient(0,0,0,H*0.68);sky.addColorStop(0,'#0a0a1a');sky.addColorStop(1,'#1a1a2e');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    for(let i=0;i<28;i++){const sx=(Math.sin(i*5.5)*0.5+0.5)*W,sy=(Math.sin(i*3.3)*0.4+0.08)*H;ctx.beginPath();ctx.arc(sx,sy,1.2,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,240,${0.3+0.5*Math.sin(t+i)})`;ctx.fill();}
    const gy=H*0.73;ctx.fillStyle='#1a1a1a';ctx.fillRect(0,gy,W,H-gy);
    ctx.strokeStyle='rgba(200,180,0,0.35)';ctx.lineWidth=2;ctx.setLineDash([28,28]);ctx.beginPath();ctx.moveTo(-roadOff,gy+12);ctx.lineTo(W+80,gy+12);ctx.stroke();ctx.setLineDash([]);
    const bx=W*0.44,by=gy,wr=W*0.09,wrot=t*4.5;
    ctx.strokeStyle='#e8e6e0';ctx.lineWidth=2;
    drawWheel(bx-wr*1.1,by-wr,wr,wrot);drawWheel(bx+wr*1.1,by-wr,wr,wrot);
    sketchLine(bx,by-wr,bx-wr*1.1,by-wr,1);sketchLine(bx,by-wr,bx+wr*1.1,by-wr,1);
    sketchLine(bx,by-wr,bx-wr*0.1,by-wr*2,1);sketchLine(bx-wr*0.1,by-wr*2,bx+wr*0.9,by-wr*1.8,1);
    sketchLine(bx-wr*0.1,by-wr*2,bx+wr*1.1,by-wr,1);sketchLine(bx+wr*0.9,by-wr*1.8,bx+wr*1.3,by-wr*1.6,1);
    sketchLine(bx-wr*0.25,by-wr*2.1,bx+wr*0.15,by-wr*2.1,2.5);
    const bob=Math.sin(t*8)*2;
    sketchCircle(bx-wr*0.05,by-wr*2.38+bob,wr*0.22,1);
    rafId=requestAnimationFrame(f);
  }f();
}

function teens(){
  const W=cW(),H=cH();
  const smokes=Array.from({length:42},(_,i)=>{const fi=i%3;return{fi,x:[W*0.3,W*0.55,W*0.72][fi],y:H*0.82,vx:rnd(-0.35,0.35),vy:rnd(-1.2,-0.4),alpha:rnd(0.12,0.45),size:rnd(4,13)};});
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0a0810';ctx.fillRect(0,0,W,H);
    const gy=H*0.82;
    const gl=ctx.createLinearGradient(0,gy-80,0,H);gl.addColorStop(0,'rgba(0,0,0,0)');gl.addColorStop(1,'rgba(20,15,30,0.5)');
    ctx.fillStyle=gl;ctx.fillRect(0,gy-80,W,H);
    smokes.forEach(p=>{
      p.x+=p.vx+Math.sin(t*0.8+p.y*0.02)*0.45;p.y+=p.vy;p.alpha-=0.0038;p.size*=1.003;
      if(p.alpha<=0||p.y<-p.size){const ox=[W*0.3,W*0.55,W*0.72][p.fi];p.x=ox+rnd(-12,12);p.y=gy-28;p.alpha=rnd(0.12,0.45);p.size=rnd(4,13);}
      ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle=`rgba(160,155,175,${p.alpha*0.28})`;ctx.fill();
    });
    ctx.strokeStyle='rgba(140,120,160,0.3)';ctx.lineWidth=1;sketchLine(0,gy,W,gy,1);
    [[W*0.3,gy],[W*0.55,gy],[W*0.72,gy]].forEach(([fx,fy],i)=>{
      const s=W*0.062,bob=Math.sin(t*0.8+i*1.4)*2;
      ctx.strokeStyle='rgba(195,180,215,0.78)';ctx.lineWidth=1.8;
      sketchCircle(fx,fy-s*2.52+bob,s*0.75,1);
      sketchLine(fx,fy-s*1.72+bob,fx,fy+s*0.4+bob,1);
      if(i===1){
        sketchLine(fx-s,fy-s*0.8+bob,fx+s*1.55,fy-s*1.38+bob,1);
        const ex=fx+s*1.55,ey=fy-s*1.38+bob;
        ctx.beginPath();ctx.arc(ex,ey,3,0,Math.PI*2);ctx.fillStyle=`rgba(255,${110+Math.sin(t*3)*40},20,${0.7+Math.sin(t*5)*0.2})`;ctx.fill();
      } else {
        sketchLine(fx-s,fy-s*0.8+bob,fx+s,fy-s*0.8+bob,1);
        const px=i===0?fx-s*0.5:fx+s*0.5,py=fy-s*2.8+bob;
        ctx.fillStyle=`rgba(80,130,255,${0.1+0.04*Math.sin(t*0.4+i)})`;ctx.fillRect(px-s*0.5,py,s,s*1.5);
        ctx.strokeStyle='rgba(80,130,255,0.2)';ctx.lineWidth=0.5;ctx.strokeRect(px-s*0.5,py,s,s*1.5);
      }
      sketchLine(fx,fy+s*0.4+bob,fx-s*0.8,fy+s*1.82+bob,1);sketchLine(fx,fy+s*0.4+bob,fx+s*0.8,fy+s*1.82+bob,1);
    });
    grain(0.04);
    rafId=requestAnimationFrame(f);
  }f();
}

function mirror(){
  const W=cW(),H=cH();
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    const shake=Math.sin(t*7)*2;
    ctx.clearRect(0,0,W,H);ctx.fillStyle=PAPER;ctx.fillRect(0,0,W,H);
    const mx=W/2,my=H*0.44,mw=W*0.3,mh=H*0.55;
    ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(mx,my,mw/2,mh/2,0,0,Math.PI*2);ctx.stroke();
    ctx.save();ctx.beginPath();ctx.ellipse(mx,my,mw/2-5,mh/2-5,0,0,Math.PI*2);ctx.clip();
    ctx.fillStyle='rgba(230,225,215,0.6)';ctx.fill();
    ctx.translate(mx+shake,my-mh*0.15);ctx.strokeStyle=INK;ctx.lineWidth=1.8;
    const s=mw*0.2;
    sketchCircle(0,-s*1.5,s,1);sketchLine(0,-s*0.5,0,s*1.2,1);sketchLine(-s*1.2,s*0.2,s*1.2,s*0.2,1);
    sketchLine(0,s*1.2,-s*0.8,s*2.5,1);sketchLine(0,s*1.2,s*0.8,s*2.5,1);
    ctx.restore();
    ctx.strokeStyle=INK;ctx.lineWidth=2;
    sketchLine(mx-mw*0.15,my+mh/2,mx,my+mh/2+20,1);sketchLine(mx+mw*0.15,my+mh/2,mx,my+mh/2+20,1);sketchLine(mx-mw*0.25,my+mh/2+20,mx+mw*0.25,my+mh/2+20,1);
    rafId=requestAnimationFrame(f);
  }f();
}

function cigarette(){
  const W=cW(),H=cH();
  const smoke=Array.from({length:25},()=>({x:W*0.5,y:H*0.58,vx:rnd(-0.4,0.4),vy:rnd(-1.5,-3),alpha:0.5,size:rnd(6,14)}));
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle='#1a1410';ctx.fillRect(0,0,W,H);
    const cx=W/2,cy=H*0.62;
    ctx.fillStyle='rgba(240,235,220,0.9)';ctx.fillRect(cx-W*0.18,cy-8,W*0.33,16);
    ctx.fillStyle='rgba(200,150,100,0.8)';ctx.fillRect(cx-W*0.18,cy-8,W*0.06,16);
    ctx.fillStyle=`rgba(255,${100+Math.sin(t*3)*50},20,${0.8+Math.sin(t*5)*0.2})`;ctx.fillRect(cx+W*0.15,cy-7,W*0.03+1,14);
    smoke.forEach(p=>{
      p.x+=p.vx+Math.sin(t*1.5+p.y*0.02)*0.3;p.y+=p.vy;p.alpha-=0.006;p.size*=1.004;
      if(p.alpha<=0){p.x=cx+W*0.17;p.y=cy-8;p.alpha=0.5;p.size=rnd(6,14);}
      ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle=`rgba(200,200,200,${p.alpha*0.3})`;ctx.fill();
    });
    rafId=requestAnimationFrame(f);
  }f();
}

function awkward(){
  const W=cW(),H=cH();
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle=PAPER;ctx.fillRect(0,0,W,H);
    const cx=W/2,cy=H*0.48,s=W*0.08,hb=Math.sin(t*0.8)*3;
    ctx.strokeStyle=INK;ctx.lineWidth=2;
    sketchCircle(cx,cy-s*2.5+hb,s*0.8,1);
    sketchLine(cx,cy-s*0.8+hb,cx+s*1.4,cy-s*2.2+hb+Math.sin(t*4)*s*0.2,1);
    sketchLine(cx,cy-s*0.8,cx-s*1.3,cy-s*0.4,1);
    sketchLine(cx,cy-s*1.72,cx,cy+s*0.5,1);sketchLine(cx,cy+s*0.5,cx-s*0.9,cy+s*1.9,1);sketchLine(cx,cy+s*0.5,cx+s*0.9,cy+s*1.9,1);
    for(let i=0;i<3;i++){const sx=cx+s*1.2+i*8,sy=cy-s*2+i*12+(t*20+i*15)%40;ctx.beginPath();ctx.arc(sx,sy,3,0,Math.PI*2);ctx.fillStyle='rgba(74,122,181,0.5)';ctx.fill();}
    ctx.font=`${W*0.05}px Caveat`;ctx.fillStyle='rgba(26,22,18,0.15)';ctx.textAlign='center';
    for(let i=0;i<3;i++)ctx.fillText('?',cx-s*2+i*s*2,cy-s*4+(t*12+i*18)%(H*0.35));
    sketchLine(0,H*0.82,W,H*0.82,1);
    rafId=requestAnimationFrame(f);
  }f();
}

function bath(){
  const W=cW(),H=cH();
  let drops=[];
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#0d0508';ctx.fillRect(0,0,W,H);
    const ts=W*0.11;
    ctx.strokeStyle='rgba(48,32,38,0.48)';ctx.lineWidth=0.8;
    for(let tx=0;tx<=W;tx+=ts)sketchLine(tx,0,tx,H*0.58,0.3);
    for(let ty=0;ty<H*0.62;ty+=ts*0.88)sketchLine(0,ty,W,ty,0.3);
    const cx=W/2,cy=H*0.52,bw=W*0.73,bh=H*0.37;
    ctx.strokeStyle='rgba(185,175,198,0.55)';ctx.lineWidth=2.5;
    ctx.beginPath();
    ctx.moveTo(cx-bw/2+18,cy-bh/2);ctx.quadraticCurveTo(cx-bw/2,cy-bh/2,cx-bw/2,cy-bh/2+18);
    ctx.lineTo(cx-bw/2,cy+bh/2);ctx.quadraticCurveTo(cx-bw/2,cy+bh/2+12,cx-bw/2+18,cy+bh/2+12);
    ctx.lineTo(cx+bw/2-18,cy+bh/2+12);ctx.quadraticCurveTo(cx+bw/2,cy+bh/2+12,cx+bw/2,cy+bh/2);
    ctx.lineTo(cx+bw/2,cy-bh/2+18);ctx.quadraticCurveTo(cx+bw/2,cy-bh/2,cx+bw/2-18,cy-bh/2);
    ctx.closePath();ctx.stroke();
    const wl=cy-bh*0.1;
    const wg=ctx.createLinearGradient(0,wl,0,cy+bh/2);
    wg.addColorStop(0,`rgba(195,16,16,${0.78+0.06*Math.sin(t*0.45)})`);wg.addColorStop(1,'rgba(90,4,4,0.95)');
    ctx.save();
    ctx.beginPath();ctx.moveTo(cx-bw/2+4,wl);
    for(let wx=cx-bw/2+4;wx<=cx+bw/2-4;wx+=6){ctx.lineTo(wx,wl+Math.sin(wx*0.055+t*1.5)*2.8);}
    ctx.lineTo(cx+bw/2-4,cy+bh/2+10);ctx.lineTo(cx-bw/2+4,cy+bh/2+10);ctx.closePath();
    ctx.fillStyle=wg;ctx.fill();ctx.restore();
    ctx.strokeStyle='rgba(255,70,70,0.13)';ctx.lineWidth=1;
    for(let r=0;r<3;r++){ctx.beginPath();ctx.ellipse(cx,wl+5,bw*(0.12+r*0.08),5+r*2.5,0,0,Math.PI*2);ctx.stroke();}
    if(drops.length<8&&Math.random()<0.028)drops.push({x:cx+rnd(-bw*0.3,bw*0.3),y:cy+bh/2+12,vy:0.6,a:0.88});
    drops=drops.filter(d=>d.a>0);
    drops.forEach(d=>{d.y+=d.vy;d.vy+=0.1;d.a-=0.009;ctx.beginPath();ctx.arc(d.x,d.y,3.5,0,Math.PI*2);ctx.fillStyle=`rgba(195,14,14,${d.a})`;ctx.fill();});
    ctx.strokeStyle='rgba(155,148,170,0.45)';ctx.lineWidth=3;
    sketchLine(cx+bw*0.38,cy-bh*0.28,cx+bw*0.38,cy-bh*0.53,0.5);
    ctx.beginPath();ctx.arc(cx+bw*0.38,cy-bh*0.53,9,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle='rgba(95,80,100,0.42)';ctx.lineWidth=1.5;
    sketchCircle(cx,cy+bh/2+7,9,0.6);
    sketchLine(cx-7,cy+bh/2+7,cx+7,cy+bh/2+7,0.3);sketchLine(cx,cy+bh/2+1,cx,cy+bh/2+13,0.3);
    rafId=requestAnimationFrame(f);
  }f();
}

function chaos(){
  const W=cW(),H=cH();
  const words=['прости','зачем','я помню','не могу','уже всё','слишком поздно','не так','я знаю','зачем'];
  const mems=Array.from({length:8},(_,i)=>({word:words[i%words.length],x:rnd(W*0.08,W*0.82),y:rnd(H*0.12,H*0.88),alpha:0,target:rnd(0.18,0.52),speed:rnd(0.005,0.014),dir:1,fs:rnd(W*0.04,W*0.09)}));
  let lines=Array.from({length:40},()=>({x1:rnd(0,W),y1:rnd(0,H),x2:rnd(0,W),y2:rnd(0,H),spd:rnd(0.5,2),alpha:rnd(0.05,0.22)}));
  function f(){
    if(!animRunning)return;
    ctx.fillStyle='rgba(250,248,244,0.22)';ctx.fillRect(0,0,cW(),cH());
    lines.forEach(l=>{
      l.x1+=rnd(-l.spd,l.spd);l.y1+=rnd(-l.spd,l.spd);l.x2+=rnd(-l.spd,l.spd);l.y2+=rnd(-l.spd,l.spd);
      if(l.x1<0||l.x1>W)l.x1=W/2;if(l.y1<0||l.y1>H)l.y1=H/2;
      ctx.strokeStyle=`rgba(26,22,18,${l.alpha})`;ctx.lineWidth=1;sketchLine(l.x1,l.y1,l.x2,l.y2,1);
    });
    mems.forEach(m=>{
      m.alpha+=m.dir*m.speed;
      if(m.alpha>=m.target)m.dir=-1;
      if(m.alpha<=0){m.dir=1;m.x=rnd(W*0.08,W*0.82);m.y=rnd(H*0.12,H*0.88);m.target=rnd(0.18,0.52);m.fs=rnd(W*0.04,W*0.09);m.word=words[Math.floor(rnd(0,words.length))];}
      ctx.font=`${m.fs}px Caveat`;ctx.fillStyle=`rgba(26,22,18,${m.alpha})`;ctx.textAlign='center';ctx.fillText(m.word,m.x,m.y);
    });
    if(Math.random()<0.004){ctx.fillStyle='rgba(200,40,26,0.05)';ctx.fillRect(0,0,cW(),cH());}
    grain(0.02);
    rafId=requestAnimationFrame(f);
  }f();
}

function jump(){
  const W=cW(),H=cH();
  const petals=Array.from({length:28},()=>({x:rnd(0,W),y:rnd(H*0.3,H),vx:rnd(-1.8,1.8),vy:rnd(-2.2,-0.4),rot:rnd(0,Math.PI*2),rs:rnd(-0.09,0.09),alpha:rnd(0.3,0.9),size:rnd(4,11)}));
  // Красный шарик (концепция ZMP2) — дрейфует вверх и по кругу
  let ballX=W*0.72, ballY=H*0.38;
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#08051a');sky.addColorStop(0.38,'#28103a');sky.addColorStop(0.65,'#8a2055');sky.addColorStop(0.88,'#d45030');sky.addColorStop(1,'#e8703a');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    for(let i=0;i<14;i++){const sx=(Math.sin(i*4.1)*0.5+0.5)*W,sy=(Math.sin(i*2.7)*0.28+0.06)*H;ctx.beginPath();ctx.arc(sx,sy,1,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,240,${Math.max(0,0.35*Math.sin(t*0.25+i))})`;ctx.fill();}
    const gy=H*0.76;
    ctx.fillStyle='#060410';ctx.fillRect(0,gy,W*0.42,H);
    ctx.fillStyle='#05030e';ctx.fillRect(W*0.42,H*0.3,W*0.2,gy-H*0.3);
    for(let ww=0;ww<5;ww++){const wy=H*(0.34+ww*0.07)+Math.sin(t*1.8+ww)*5;ctx.strokeStyle='rgba(220,150,240,0.18)';ctx.lineWidth=1;sketchLine(W*0.08,wy,W*0.42,wy+Math.sin(t+ww)*6,0.5);}
    // Фигура на краю обрыва
    const edge=W*0.52,edgeY=gy-1,s=W*0.067,armRaise=Math.sin(t*1.6)*0.32,lean=Math.sin(t*0.65)*0.08;
    ctx.save();ctx.translate(edge,edgeY);ctx.rotate(lean);
    ctx.strokeStyle='rgba(235,215,245,0.92)';ctx.lineWidth=2;
    sketchCircle(0,-s*2.55,s*0.8,1);
    sketchLine(0,-s*1.72,0,s*0.45,1);
    sketchLine(0,-s*0.85,-s*1.85,-s*0.18+armRaise*s*0.6,1);
    sketchLine(0,-s*0.85,s*1.85,-s*0.18-armRaise*s*0.6,1);
    sketchLine(0,s*0.45,-s*0.88,s*1.88,1);sketchLine(0,s*0.45,s*0.88,s*1.88,1);
    ctx.restore();
    // Красный шарик (уплывает вверх, как в ZMP2)
    const bx=W*0.72+Math.sin(t*0.8)*18, by=H*0.36-((t*14)%H);
    const bry=H*0.72; // нитка от фигуры к шарику (только когда шарик над фигурой)
    ctx.strokeStyle=RED; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.ellipse(bx, by, 18, 22, 0, 0, Math.PI*2); ctx.stroke();
    // Нитка
    ctx.strokeStyle='rgba(200,40,26,0.55)'; ctx.lineWidth=1;
    sketchLine(bx, by+22, edge+s*1.2, gy, 1.5);
    // Лепестки
    petals.forEach(p=>{
      p.x+=p.vx+Math.sin(t*0.7+p.y*0.008)*1.3;p.y+=p.vy;p.rot+=p.rs;p.alpha-=0.003;
      if(p.y<-15||p.alpha<=0){p.y=H*0.92;p.x=rnd(0,W);p.alpha=rnd(0.35,0.9);p.vy=rnd(-2.2,-0.4);}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.beginPath();ctx.ellipse(0,0,p.size,p.size*0.5,0,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,155,195,${p.alpha*0.68})`;ctx.fill();
      ctx.restore();
    });
    grain(0.03);
    rafId=requestAnimationFrame(f);
  }f();
}

function journal(){
  const W=cW(),H=cH();
  const doodles=[
    {type:'heart',x:rnd(W*0.52,W*0.78),y:rnd(H*0.18,H*0.4),s:rnd(18,32)},
    {type:'star', x:rnd(W*0.55,W*0.82),y:rnd(H*0.45,H*0.68),s:rnd(14,22)},
    {type:'arrow',x:rnd(W*0.12,W*0.38),y:rnd(H*0.55,H*0.72),s:rnd(18,28)},
  ];
  function f(){
    if(!animRunning)return; const t=Date.now()*0.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle='#fef9f0';ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(140,185,255,0.22)';ctx.lineWidth=0.5;
    for(let x=0;x<W;x+=20)sketchLine(x,0,x,H,0.15);
    for(let y=0;y<H;y+=20)sketchLine(0,y,W,y,0.15);
    ctx.strokeStyle='rgba(220,75,75,0.22)';ctx.lineWidth=1;sketchLine(58,0,58,H,0.5);
    ctx.strokeStyle='rgba(100,90,80,0.22)';ctx.lineWidth=1.5;
    for(let i=0;i<8;i++)sketchCircle(28,44+i*(H-55)/7,8,0.5);
    const progress=Math.min(1,((t*0.12)%1.3)/1);
    doodles.forEach((d,di)=>{
      if(progress<di*0.28)return;
      const dp=Math.min(1,(progress-di*0.28)/0.38);
      ctx.strokeStyle=`rgba(26,22,18,${0.55+0.2*dp})`;ctx.lineWidth=1.4;
      if(d.type==='heart'){
        const steps=Math.floor(dp*38);ctx.beginPath();
        for(let i=0;i<steps;i++){
          const a=(i/38)*Math.PI*2,
                hx=d.x+d.s*16*Math.pow(Math.sin(a),3)/16,
                hy=d.y-d.s*(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))/16;
          i===0?ctx.moveTo(hx,hy):ctx.lineTo(hx,hy);
        }ctx.stroke();
      } else if(d.type==='star'){
        const steps=Math.floor(dp*10);
        for(let i=0;i<steps;i++){const a1=(i/5)*Math.PI,a2=((i+2)/5)*Math.PI;sketchLine(d.x+Math.cos(a1)*d.s,d.y+Math.sin(a1)*d.s,d.x+Math.cos(a2)*d.s,d.y+Math.sin(a2)*d.s,0.4);}
      } else {
        if(dp>0.2)sketchLine(d.x,d.y,d.x+d.s*dp,d.y,0.5);
        if(dp>0.65){sketchLine(d.x+d.s,d.y,d.x+d.s*0.68,d.y-d.s*0.4,0.5);sketchLine(d.x+d.s,d.y,d.x+d.s*0.68,d.y+d.s*0.4,0.5);}
      }
    });
    const ti=Math.floor(t*7.5)%62,txt='ты поймёшь когда-нибудь',vis=txt.substring(0,Math.min(ti,txt.length));
    ctx.font=`${W*0.036}px Caveat`;ctx.fillStyle='rgba(26,22,18,0.72)';ctx.textAlign='left';ctx.fillText(vis,72,H*0.74);
    if(Math.sin(t*5)>0&&ti<txt.length){const tw=ctx.measureText(vis).width;ctx.fillStyle=INK;ctx.fillRect(72+tw,H*0.74-18,2,20);}
    grain(0.022);
    rafId=requestAnimationFrame(f);
  }f();
}

function cW(){return canvas.width/(window.devicePixelRatio||1);}
function cH(){return canvas.height/(window.devicePixelRatio||1);}

// ─── Вырезание девочки с шариком по контуру ────────────────────────────────────
function prepBalloon() {
  const img = new Image();
  img.onload = () => {
    const W = img.naturalWidth, H = img.naturalHeight;
    const tmp = document.createElement('canvas');
    tmp.width = W; tmp.height = H;
    const tc = tmp.getContext('2d');
    tc.drawImage(img, 0, 0);
    const id = tc.getImageData(0, 0, W, H);
    const px = id.data;
    const bgR = px[0], bgG = px[1], bgB = px[2];
    for (let i = 0; i < px.length; i += 4) {
      const dr = px[i]-bgR, dg = px[i+1]-bgG, db = px[i+2]-bgB;
      const dist = Math.sqrt(dr*dr + dg*dg + db*db);
      if (dist < 110) px[i+3] = Math.round(Math.min(255, dist * 2.3));
    }
    tc.putImageData(id, 0, 0);
    const sx = Math.round(W * 0.34), sy = Math.round(H * 0.08);
    const sw = Math.round(W * 0.24), sh = Math.round(H * 0.58);
    const out = document.createElement('canvas');
    out.width = sw; out.height = sh;
    out.getContext('2d').drawImage(tmp, sx, sy, sw, sh, 0, 0, sw, sh);
    balloonImg.src = out.toDataURL('image/png');
  };
  img.src = 'images/balloon.png';
}
prepBalloon();

// ─── Пасхалки ──────────────────────────────────────────────────────────────────

function ropeEgg(zone) {
  let timer = null;
  zone.addEventListener('mouseenter', () => {
    timer = setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'popup-msg';
      p.textContent = 'всё хорошо';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 3800);
    }, 3000);
  });
  zone.addEventListener('mouseleave', () => clearTimeout(timer));
}

let titleClicks = 0, titleTimer = null;
heroTitle.addEventListener('click', () => {
  titleClicks++;
  clearTimeout(titleTimer);
  titleTimer = setTimeout(() => titleClicks = 0, 600);
  if (titleClicks >= 3) {
    titleClicks = 0;
    partyPop.classList.add('on');
    setTimeout(() => partyPop.classList.remove('on'), 6000);
  }
});
partyPop.addEventListener('click', () => partyPop.classList.remove('on'));

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;
document.addEventListener('keydown', e => {
  if (overlay.classList.contains('open')) return;
  ki = (e.key === KONAMI[ki]) ? ki+1 : (e.key === KONAMI[0] ? 1 : 0);
  if (ki === KONAMI.length) {
    ki = 0;
    pinkVeil.classList.add('on');
    konamiMsg.classList.add('on');
    setTimeout(() => { pinkVeil.classList.remove('on'); konamiMsg.classList.remove('on'); }, 8000);
  }
});

let swipeY = 0;
document.addEventListener('touchstart', e => swipeY = e.touches[0].clientY, {passive:true});
document.addEventListener('touchend', e => {
  if (!pg1.classList.contains('active')) return;
  if (swipeY - e.changedTouches[0].clientY > 55) boyWrap.click();
}, {passive:true});
