const samples = [
  { genre: "pop", subgenre: "ballad pop", id: "pop_ballad-pop_suno_001_01", lyrics: "相心是没停过啊", color: "#de6d83", pitch: [0,57,57,62,62,60,60,62,62,63,64,59,59,60,0], duration: [.933,.187,.059,.203,.229,.219,.075,.181,.448,.165,.315,.181,.816,.005,.251] },
  { genre: "rock", subgenre: "punk rock", id: "rock_punk-rock_suno_000_04", lyrics: "规则的枷锁都变来逃", color: "#d35b52", pitch: [0,56,55,55,55,65,65,58,55,58,58,70,67,45,45,45,46,45,45,0], duration: [.037,.277,.64,.117,.261,.064,.256,.133,.368,.229,.315,.043,.288,.011,.005,.005,1.205,.005,.288,.059] },
  { genre: "rap", subgenre: "old skool rap pioneers", id: "rap_old-skool-rap-pioneers_suno_000_16", lyrics: "的今晚的故事现在叫室", color: "#8b63b3", pitch: [72,68,0,63,63,63,0,64,64,63,63,64,64,0,65,64,64,38,50,64,67,67], duration: [.192,.384,.363,.229,.011,.011,.048,.155,.16,.085,.075,.181,.064,.165,.149,.011,.107,.096,.08,.075,.171,.005] },
  { genre: "classical", subgenre: "opera", id: "classical_opera_suno_005_18", lyrics: "阳光挥洒", color: "#b48a46", pitch: [0,67,66,65,63,63,65,65,0], duration: [.048,.011,.208,.816,.379,.208,.251,1.312,.011] },
  { genre: "jazz", subgenre: "bebop jazz", id: "jazz_bebop-jazz_suno_000_06", lyrics: "钢琴敲碎了回忆的边缘枯调入心跳忽", color: "#d18b35", pitch: [0,65,65,63,63,63,65,63,63,64,65,63,67,67,67,67,66,66,65,65,65,65,65,65,65,63,63,65,65,65,65], duration: [.203,.144,.251,.091,.043,.112,.133,.112,.037,.107,.117,.096,.08,.256,.085,.224,.075,.795,.005,.053,.208,.112,.005,.123,.08,.091,.064,.107,.256,.011,.619] },
  { genre: "blues", subgenre: "delta blues", id: "blues_delta-blues_suno_000_14", lyrics: "你问我还在等什么我说我也不懂", color: "#477caf", pitch: [0,60,63,65,65,65,65,63,63,65,65,60,60,60,60,60,63,63,64,62,60,60,58,58,0], duration: [.475,.208,.427,.005,.661,.181,.389,.123,.203,.112,.219,.256,.16,.128,.368,.283,.229,.011,1.749,.464,.096,.192,.117,.661,.389] },
  { genre: "rnb", subgenre: "neo soul", id: "rnb_neo-soul_suno_000_24", lyrics: "啊夜色如诗谁", color: "#946d9b", pitch: [0,63,69,69,69,69,69,68,66,68,68,0], duration: [.336,1.429,1.648,.277,.416,.005,.32,.187,1.925,.005,.011,.011] },
  { genre: "world", subgenre: "africa", id: "world_africa_suno_000_08", lyrics: "敲吧敲吧一起敲", color: "#4b9a7e", pitch: [0,60,60,60,60,63,63,63,63,65,65,65,65,67,0], duration: [.485,.149,.245,.075,.181,.139,.24,.075,.272,.187,.176,.149,.171,.912,.043] },
  { genre: "electronic", subgenre: "house", id: "electronic_house_suno_000_18", lyrics: "让夜晚继绪燃烧", color: "#4b91a6", pitch: [70,70,70,70,68,66,65,65,70,71,72,70,0], duration: [.005,.005,.091,.005,.091,6.064,.005,.005,.005,.304,.171,.533,.053] },
  { genre: "country", subgenre: "bluegrass country", id: "country_bluegrass-country_suno_001_02", lyrics: "烟小路弯又长两旁树荫轻", color: "#7a9660", pitch: [62,62,62,62,60,64,63,60,62,0,60,60,60,60,60,60,62,63,64,0], duration: [.389,.123,.32,.064,.32,.603,.763,.085,2.443,.475,.139,.107,.117,.363,.203,.235,.315,.16,1.12,.021] }
];

const tabs = document.querySelector("#genre-tabs");
const comparisonGrid = document.querySelector("#comparison-grid");
const exampleCard = document.querySelector(".example-card");
const genreTitle = document.querySelector("#sample-genre");
const subgenre = document.querySelector("#sample-subgenre");
const lyrics = document.querySelector("#sample-lyrics");
const sampleAudio = document.querySelector("#sample-audio");
const scoreVisual = document.querySelector("#score-visual");

const audioPath = (type, sample) => `assets/audio/${type}/${sample.genre}/${sample.id}.wav`;

function createScore(sample) {
  const notes = sample.pitch
    .map((pitch, index) => ({ pitch, duration: Math.max(sample.duration[index], .035) }))
    .filter(note => note.pitch > 0);
  const total = notes.reduce((sum, note) => sum + note.duration, 0);
  const pitches = notes.map(note => note.pitch);
  const minPitch = Math.min(...pitches) - 2;
  const maxPitch = Math.max(...pitches) + 2;
  const width = 900;
  const height = 172;
  const pad = 12;
  let cursor = 0;

  const grid = Array.from({ length: 5 }, (_, i) => {
    const y = pad + ((height - pad * 2) / 4) * i;
    return `<line x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}" stroke="#e5eaf0" stroke-dasharray="3 6"/>`;
  }).join("");

  const bars = notes.map((note, index) => {
    const x = pad + (cursor / total) * (width - pad * 2);
    const barWidth = Math.max(4, (note.duration / total) * (width - pad * 2) - 2);
    const y = pad + ((maxPitch - note.pitch) / (maxPitch - minPitch)) * (height - pad * 2);
    cursor += note.duration;
    const opacity = .62 + (index % 4) * .1;
    return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${barWidth.toFixed(2)}" height="9" rx="4.5" fill="${sample.color}" opacity="${opacity}"><title>MIDI ${note.pitch}, ${note.duration.toFixed(3)}s</title></rect>`;
  }).join("");

  scoreVisual.setAttribute("aria-label", `Pitch-duration visualization for the selected ${sample.genre} sample`);
  scoreVisual.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">${grid}${bars}</svg>`;
}

function selectSample(index, moveFocus = false) {
  const sample = samples[index];
  document.querySelectorAll(".genre-tab").forEach((tab, tabIndex) => {
    tab.setAttribute("aria-selected", String(tabIndex === index));
    tab.tabIndex = tabIndex === index ? 0 : -1;
    if (moveFocus && tabIndex === index) tab.focus();
  });
  exampleCard.style.setProperty("--genre-color", sample.color);
  genreTitle.textContent = sample.genre;
  subgenre.textContent = sample.subgenre;
  lyrics.textContent = sample.lyrics;
  sampleAudio.src = audioPath("gt", sample);
  createScore(sample);
}

samples.forEach((sample, index) => {
  const button = document.createElement("button");
  button.className = "genre-tab";
  button.type = "button";
  button.role = "tab";
  button.textContent = sample.genre;
  button.style.setProperty("--genre-color", sample.color);
  button.setAttribute("aria-selected", String(index === 0));
  button.addEventListener("click", () => selectSample(index));
  button.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowLeft") next = (index - 1 + samples.length) % samples.length;
    if (event.key === "ArrowRight") next = (index + 1) % samples.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = samples.length - 1;
    selectSample(next, true);
  });
  tabs.appendChild(button);

  const card = document.createElement("article");
  card.className = "comparison-card";
  card.innerHTML = `
    <div class="comparison-title"><strong>${sample.genre}</strong><span>${sample.subgenre}</span></div>
    <div class="audio-pair">
      <label for="gt-${sample.genre}">Suno GT</label>
      <audio id="gt-${sample.genre}" controls preload="none" src="${audioPath("gt", sample)}"></audio>
      <label for="svs-${sample.genre}">VISinger2</label>
      <audio id="svs-${sample.genre}" controls preload="none" src="${audioPath("visinger2", sample)}"></audio>
    </div>`;
  comparisonGrid.appendChild(card);
});

selectSample(0);

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: "-25% 0px -65%" });
sections.forEach(section => observer.observe(section));

const menuToggle = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
menuToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
