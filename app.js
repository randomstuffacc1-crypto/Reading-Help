const STORAGE_KEY = "readrise_v2";
const PDF_DB_NAME = "readrise_pdf_store";
const PDF_DB_VERSION = 1;
const PDF_STORE_NAME = "pdfs";

if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

const LEVELS = {
  emerging: { label: "Emerging K–1", minGrade: 0, maxGrade: 1.9, targetWpm: 45 },
  building: { label: "Building 2–3", minGrade: 2, maxGrade: 3.9, targetWpm: 90 },
  confident: { label: "Confident 4–5", minGrade: 4, maxGrade: 5.9, targetWpm: 125 },
  advanced: { label: "Advanced 6–8", minGrade: 6, maxGrade: 8.9, targetWpm: 155 }
};

const DEFAULT_BOOKS = [
  {
    id: "sunny-seed",
    title: "The Sunny Seed",
    author: "ReadRise Original",
    level: "emerging",
    tags: ["plants", "family", "science"],
    summary: "A simple story about a child who helps a tiny seed grow.",
    text: `Mina held a small seed in her hand. The seed was brown and dry. It did not look like much, but Grandpa said it could grow into a bright green plant.

Mina dug a little hole. She put the seed in the soil. She gave it water. Every morning, Mina looked at the pot by the window.

One day, a tiny stem pushed up. Mina smiled. The plant had two small leaves. She kept giving it sun and water.

By the end of the week, the plant was taller. Mina learned that small things can grow with care, time, and light.`,
    questions: [
      { type: "mc", q: "What did Mina put in the soil?", choices: ["A stone", "A seed", "A shell", "A leaf"], answer: "A seed", skill: "literal recall" },
      { type: "mc", q: "What helped the plant grow?", choices: ["Snow and wind", "Sun and water", "Sand and toys", "Paint and glue"], answer: "Sun and water", skill: "cause and effect" },
      { type: "mc", q: "What is the main idea of the story?", choices: ["Plants need care to grow", "Windows are cold", "Grandpa lost a pot", "Seeds are always green"], answer: "Plants need care to grow", skill: "main idea" }
    ]
  },
  {
    id: "moon-map",
    title: "The Moon Map",
    author: "ReadRise Original",
    level: "building",
    tags: ["space", "problem solving", "friends"],
    summary: "Two friends use careful clues to solve a backyard mystery under the moon.",
    text: `Leo and Sam wanted to find the missing moon map. It was not a real map of the moon. It was a silver paper map that showed where they had hidden their treasure box in the yard.

The wind had blown hard during the afternoon. Sam found silver paper under the porch steps, but the middle of the map was torn. Leo noticed three clues that were still clear: the birdbath, the oak tree, and a flat gray stone.

They stood by the birdbath first. Then they walked twelve steps toward the oak tree. Near the flat gray stone, Leo saw fresh dirt. Sam used a small shovel and uncovered the box.

Inside the box were marbles, stickers, and a note from last summer. Sam laughed and said, "The map was torn, but the clues were enough." Leo agreed that careful reading can help you find what is hidden.`,
    questions: [
      { type: "mc", q: "Why was the map hard to use?", choices: ["It was written in another language", "The middle was torn", "It was too heavy", "It was under water"], answer: "The middle was torn", skill: "literal recall" },
      { type: "mc", q: "Which clue helped the friends find the box?", choices: ["A red kite", "A gray stone", "A blue door", "A yellow cup"], answer: "A gray stone", skill: "text evidence" },
      { type: "mc", q: "What lesson fits the story best?", choices: ["Never play outside", "Clues can help solve problems", "Maps are always wrong", "Treasure boxes are dangerous"], answer: "Clues can help solve problems", skill: "theme" }
    ]
  },
  {
    id: "river-rescue",
    title: "River Rescue Plan",
    author: "ReadRise Original",
    level: "confident",
    tags: ["nature", "community", "science"],
    summary: "A class studies a stream and designs a plan to protect local wildlife.",
    text: `When Ms. Patel's class visited Willow Creek, the students expected to see frogs, minnows, and dragonflies. Instead, they found cloudy water and bits of plastic caught in the reeds. The creek was still alive, but it was struggling.

The class divided into teams. One team tested the water temperature. Another counted insects near the bank, because many insects are signs of a healthy stream. A third team recorded where trash collected after rainstorms.

Back at school, the students compared their notes. They realized the creek needed more than one solution. The class planned a cleanup day, wrote polite letters to nearby businesses, and designed signs that reminded people not to litter.

A month later, the water looked clearer. The creek was not perfect, but the students had evidence that their plan was working. They learned that conservation is not a single heroic act. It is a series of careful choices repeated by a community.`,
    questions: [
      { type: "mc", q: "Why did one team count insects?", choices: ["Insects can show whether a stream is healthy", "They wanted to scare the frogs", "The insects were made of plastic", "They were feeding birds"], answer: "Insects can show whether a stream is healthy", skill: "cause and effect" },
      { type: "mc", q: "Which sentence best supports the idea that the students used evidence?", choices: ["The students expected to see frogs.", "They compared their notes.", "The creek had reeds.", "The signs were polite."], answer: "They compared their notes.", skill: "text evidence" },
      { type: "mc", q: "What does conservation mean in the final paragraph?", choices: ["Protecting natural places", "Drawing a map", "Walking quickly", "Making loud sounds"], answer: "Protecting natural places", skill: "vocabulary in context" }
    ]
  },
  {
    id: "clockwork-orchard",
    title: "The Clockwork Orchard",
    author: "ReadRise Original",
    level: "advanced",
    tags: ["engineering", "mystery", "persistence"],
    summary: "A young inventor repairs an old irrigation machine and discovers why details matter.",
    text: `The orchard behind Aunt Rima's house contained fifty-seven apple trees and one extraordinary machine. It was a clockwork irrigation system built by her grandfather, a patient mechanic who believed that every problem could be understood if a person observed long enough.

For years, brass gears had opened tiny gates that guided water from one channel to another. But this spring the eastern row was dry while the western row was muddy. The machine still ticked, yet its pattern had become unreliable.

Nadia sketched the gears each morning. At first, the drawings seemed useless. Then she noticed that one small tooth on a timing wheel was bent. The flaw was nearly invisible, but it delayed the gate by several minutes. That delay sent too much water west before the eastern channel could open.

Nadia replaced the wheel with a spare from the shed. By sunset, water moved evenly through the orchard again. Aunt Rima told her that careful attention is a form of respect: respect for tools, for land, and for the people who depend on both.`,
    questions: [
      { type: "mc", q: "What caused the irrigation problem?", choices: ["A bent tooth on a timing wheel", "A missing apple tree", "Too many sketches", "A storm that broke the shed"], answer: "A bent tooth on a timing wheel", skill: "cause and effect" },
      { type: "mc", q: "What does unreliable mean in the passage?", choices: ["Not working in a dependable way", "Very colorful", "Easy to carry", "Completely silent"], answer: "Not working in a dependable way", skill: "vocabulary in context" },
      { type: "mc", q: "Which theme is best supported by the story?", choices: ["Small details can create large effects", "Machines never need repair", "Drawing is always useless", "Apple trees grow only in mud"], answer: "Small details can create large effects", skill: "theme" }
    ]
  }
];

const LOCAL_DICTIONARY = {
  conservation: { part: "noun", definition: "the act of protecting natural resources, plants, animals, or places", example: "Conservation helps keep rivers and forests healthy." },
  reliable: { part: "adjective", definition: "able to be trusted to work well or happen as expected", example: "A reliable clock keeps the correct time." },
  extraordinary: { part: "adjective", definition: "very unusual, special, or impressive", example: "The machine was extraordinary because it watered many trees by itself." },
  evidence: { part: "noun", definition: "facts or details that help prove whether an idea is true", example: "The students used evidence from their notes." },
  clues: { part: "noun", definition: "details that help someone solve a problem or mystery", example: "The clues helped them find the hidden box." },
  irrigation: { part: "noun", definition: "the process of bringing water to plants or crops", example: "Irrigation helped the apple trees grow." },
  struggling: { part: "verb", definition: "having difficulty or working hard against a problem", example: "The creek was struggling because trash was in the water." },
  mechanic: { part: "noun", definition: "a person who builds or repairs machines", example: "The mechanic fixed the machine." },
  stem: { part: "noun", definition: "the main thin part of a plant that holds up leaves or flowers", example: "A tiny stem pushed out of the soil." },
  treasure: { part: "noun", definition: "something valuable or special", example: "The treasure box held marbles and stickers." }
};

const PHONICS_SETS = {
  emerging: ["cat", "sun", "ship", "thin", "chip", "lake"],
  building: ["bright", "float", "crane", "splash", "string", "market"],
  confident: ["conserve", "evidence", "compare", "healthy", "solution", "record"],
  advanced: ["extraordinary", "irrigation", "unreliable", "invisible", "mechanic", "attention"]
};

let state = loadState();
let currentPageIndex = 0;
let currentBookId = state.currentBookId || DEFAULT_BOOKS[0].id;
let selectedLookup = null;
let activitySession = null;
let fluencyTimer = null;
let fluencyStart = null;
let activePdfDoc = null;
let activePdfBookId = null;
let activePdfRenderTask = null;
let activePdfPageText = "";
let activePdfPageTextByIndex = {};

function createInitialState() {
  return {
    profile: { name: "Reader", level: "building" },
    books: [],
    hostedBooks: [],
    catalogUrl: "books/books.json",
    pdfTextCache: {},
    progress: {
      minutes: 0,
      words: 0,
      todayDate: todayKey(),
      todayMinutes: 0,
      quizzes: [],
      fluency: [],
      log: [],
      wordBank: []
    },
    settings: { textSize: 22, lineHeight: 170, focusMode: false, syllableMode: false },
    currentBookId: DEFAULT_BOOKS[0].id
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialState();
  try {
    const parsed = JSON.parse(raw);
    const base = createInitialState();
    return {
      ...base,
      ...parsed,
      books: parsed.books || base.books,
      hostedBooks: parsed.hostedBooks || base.hostedBooks,
      catalogUrl: parsed.catalogUrl || base.catalogUrl,
      pdfTextCache: { ...base.pdfTextCache, ...(parsed.pdfTextCache || {}) },
      progress: { ...base.progress, ...(parsed.progress || {}) },
      settings: { ...base.settings, ...(parsed.settings || {}) }
    };
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function allBooks() {
  return [...DEFAULT_BOOKS, ...(state.hostedBooks || []), ...state.books];
}

function getBook(id = currentBookId) {
  return allBooks().find(b => b.id === id) || allBooks()[0];
}

function getLevelLabel(level) {
  return LEVELS[level]?.label || level;
}

function $(id) { return document.getElementById(id); }

function init() {
  normalizeDailyProgress();
  bindNavigation();
  bindLibrary();
  bindReader();
  bindPractice();
  bindProgress();
  bindSettings();
  applySettingsToDom();
  renderAll();
  loadHostedCatalog(state.catalogUrl, { silent: true });
}

document.addEventListener("DOMContentLoaded", init);

function normalizeDailyProgress() {
  const today = todayKey();
  if (state.progress.todayDate !== today) {
    state.progress.todayDate = today;
    state.progress.todayMinutes = 0;
    saveState();
  }
}

function bindNavigation() {
  document.querySelectorAll(".bottom-nav button").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });
  $("profileButton").addEventListener("click", () => showPage("settings"));
}

function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  $(`page-${page}`).classList.add("active");
  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.toggle("active", b.dataset.page === page));
  if (page === "reader") renderReader();
  if (page === "progress") renderProgress();
}

function bindLibrary() {
  $("levelFilter").addEventListener("change", renderLibrary);
  $("bookSearch").addEventListener("input", renderLibrary);
  $("openImporter").addEventListener("click", () => $("importDialog").showModal());
  $("newBookText").addEventListener("input", renderImportEstimate);
  $("newBookPdf").addEventListener("change", renderImportEstimate);
  $("newBookPdfUrl").addEventListener("input", renderImportEstimate);
  $("catalogUrl").addEventListener("input", renderImportEstimate);
  $("loadDefaultCatalog").addEventListener("click", e => {
    e.preventDefault();
    $("importType").value = "catalog";
    toggleImportType();
    $("catalogUrl").value = state.catalogUrl || "books/books.json";
    renderImportEstimate();
  });
  $("importType").addEventListener("change", toggleImportType);
  $("saveNewBook").addEventListener("click", e => {
    e.preventDefault();
    saveImportedBook();
  });
}

function bindReader() {
  $("readerBookSelect").addEventListener("change", e => {
    currentBookId = e.target.value;
    state.currentBookId = currentBookId;
    currentPageIndex = 0;
    saveState();
    renderReader();
  });
  $("prevPage").addEventListener("click", () => changePage(-1));
  $("nextPage").addEventListener("click", () => changePage(1));
  $("speakPage").addEventListener("click", speakCurrentPage);
  $("stopSpeak").addEventListener("click", () => speechSynthesis.cancel());
  $("markComplete").addEventListener("click", markCurrentBookRead);
  $("ocrPage").addEventListener("click", ocrCurrentPdfPage);
  $("hearWord").addEventListener("click", () => selectedLookup && speakText(selectedLookup.word));
  $("saveWord").addEventListener("click", saveLookupWord);
}

function bindPractice() {
  $("startActivity").addEventListener("click", startActivity);
  $("practiceBookSelect").addEventListener("change", e => {
    currentBookId = e.target.value;
    state.currentBookId = currentBookId;
    saveState();
  });
}

function bindProgress() {
  $("exportData").addEventListener("click", exportData);
}

function bindSettings() {
  $("saveProfile").addEventListener("click", () => {
    const name = $("readerNameInput").value.trim() || "Reader";
    const level = $("profileLevelInput").value;
    state.profile = { name, level };
    saveState();
    renderAll();
    toast("Profile saved");
  });

  $("applyReaderSettings").addEventListener("click", () => {
    state.settings.textSize = Number($("textSize").value);
    state.settings.lineHeight = Number($("lineHeight").value);
    state.settings.focusMode = $("focusMode").checked;
    state.settings.syllableMode = $("syllableMode").checked;
    saveState();
    applySettingsToDom();
    renderReader();
    toast("Reading supports updated");
  });

  $("resetData").addEventListener("click", () => {
    if (confirm("Reset all ReadRise data on this device?")) {
      localStorage.removeItem(STORAGE_KEY);
      state = createInitialState();
      currentBookId = state.currentBookId;
      currentPageIndex = 0;
      renderAll();
      toast("Data reset");
    }
  });

  $("importData").addEventListener("change", importData);
}

function renderAll() {
  renderProfile();
  renderLibrary();
  renderSelectors();
  renderReader();
  renderProgress();
  renderSettings();
}

function renderProfile() {
  $("profileName").textContent = state.profile.name;
  $("profileInitial").textContent = state.profile.name.trim().charAt(0).toUpperCase() || "R";
  $("todayMinutes").textContent = state.progress.todayMinutes || 0;
}

function renderLibrary() {
  const grid = $("bookGrid");
  const filter = $("levelFilter").value;
  const search = $("bookSearch").value.trim().toLowerCase();
  const books = allBooks().filter(book => {
    const matchesLevel = filter === "all" || book.level === filter;
    const haystack = `${book.title} ${book.author} ${book.tags?.join(" ")} ${book.summary}`.toLowerCase();
    return matchesLevel && (!search || haystack.includes(search));
  });

  grid.innerHTML = books.map(book => {
    const metrics = analyzeText(getBookText(book));
    return `<div class="card book-card">
      <div>
        <span class="level-badge">${getLevelLabel(book.level)}</span>
        <h3>${escapeHtml(book.title)}</h3>
        <p>${escapeHtml(book.summary || "Imported reading text.")}</p>
        <p class="small">${book.type === "pdf" ? (book.pdfUrl ? "Hosted PDF" : "Local PDF") : metrics.wordCount + " words"} • est. grade ${metrics.grade.toFixed(1)} • ${escapeHtml(book.tags?.join(", ") || "custom")}</p>
      </div>
      <div class="book-actions">
        <button class="primary" onclick="openBook('${book.id}')">Read</button>
        <button class="ghost" onclick="practiceBook('${book.id}')">Practice</button>
      </div>
    </div>`;
  }).join("") || `<div class="card"><p>No books found. Try another filter or add your own text.</p></div>`;

  renderRecommendation();
}

window.openBook = function(id) {
  currentBookId = id;
  state.currentBookId = id;
  currentPageIndex = 0;
  saveState();
  showPage("reader");
};

window.practiceBook = function(id) {
  currentBookId = id;
  state.currentBookId = id;
  saveState();
  renderSelectors();
  showPage("practice");
};

function renderRecommendation() {
  const card = $("recommendationCard");
  const rec = getRecommendation();
  if (!rec) {
    card.classList.remove("show");
    return;
  }
  card.classList.add("show");
  card.innerHTML = `<p class="eyebrow">Recommended next</p>
    <h3>${escapeHtml(rec.book.title)}</h3>
    <p>${escapeHtml(rec.reason)}</p>
    <button class="primary" onclick="openBook('${rec.book.id}')">Start recommendation</button>`;
}

function getRecommendation() {
  const latestQuiz = state.progress.quizzes.at(-1);
  let targetLevel = state.profile.level;
  let reason = `Based on ${state.profile.name}'s starting level, this is a just-right place to practice.`;

  if (latestQuiz) {
    if (latestQuiz.score >= 85) {
      targetLevel = nextLevel(latestQuiz.level);
      reason = `Last quiz was ${latestQuiz.score}%. Try a slightly harder text or continue building stamina.`;
    } else if (latestQuiz.score < 70) {
      targetLevel = previousLevel(latestQuiz.level);
      reason = `Last quiz was ${latestQuiz.score}%. Try a slightly easier text, then return to the challenge.`;
    } else {
      targetLevel = latestQuiz.level;
      reason = `Last quiz was ${latestQuiz.score}%. Keep practicing at this level until it feels fluent.`;
    }
  }

  const readIds = new Set(state.progress.log.filter(l => l.type === "read").map(l => l.bookId));
  const book = allBooks().find(b => b.level === targetLevel && !readIds.has(b.id)) || allBooks().find(b => b.level === targetLevel);
  return book ? { book, reason } : null;
}

function nextLevel(level) {
  const order = ["emerging", "building", "confident", "advanced"];
  return order[Math.min(order.indexOf(level) + 1, order.length - 1)] || level;
}

function previousLevel(level) {
  const order = ["emerging", "building", "confident", "advanced"];
  return order[Math.max(order.indexOf(level) - 1, 0)] || level;
}

function renderSelectors() {
  const options = allBooks().map(b => `<option value="${b.id}">${escapeHtml(b.title)} — ${getLevelLabel(b.level)}</option>`).join("");
  $("readerBookSelect").innerHTML = options;
  $("practiceBookSelect").innerHTML = options;
  $("readerBookSelect").value = currentBookId;
  $("practiceBookSelect").value = currentBookId;
}

async function renderReader() {
  const book = getBook();
  const fullText = getBookText(book);
  const metrics = analyzeText(fullText);
  $("readerBookSelect").value = book.id;
  $("bookTitle").textContent = book.title;
  $("bookMeta").textContent = `${book.author} • ${getLevelLabel(book.level)}${book.type === "pdf" ? " • PDF reader" : ""}`;
  $("readerLevel").textContent = getLevelLabel(book.level).replace(" ", "\n");
  $("readerWords").textContent = metrics.wordCount;
  $("readerGrade").textContent = metrics.grade.toFixed(1);

  $("pdfStage").hidden = book.type !== "pdf";
  $("ocrPage").style.display = book.type === "pdf" ? "inline-flex" : "none";

  if (book.type === "pdf") {
    await renderPdfReader(book);
    return;
  }

  activePdfDoc = null;
  activePdfBookId = null;
  activePdfPageText = "";
  const pages = paginateText(fullText);
  currentPageIndex = clamp(currentPageIndex, 0, pages.length - 1);
  $("pageLabel").textContent = `${currentPageIndex + 1} / ${pages.length}`;

  const readingText = $("readingText");
  readingText.classList.toggle("focus", state.settings.focusMode);
  readingText.innerHTML = tokenizePage(pages[currentPageIndex]);
  readingText.querySelectorAll(".word-token").forEach(token => token.addEventListener("click", () => lookupToken(token)));
}

async function renderPdfReader(book) {
  const readingText = $("readingText");
  readingText.classList.toggle("focus", state.settings.focusMode);
  readingText.innerHTML = `<p class="empty-state">Loading PDF page text…</p>`;
  $("pdfStatus").textContent = "Loading PDF…";

  if (!window.pdfjsLib) {
    $("pdfStatus").textContent = "PDF.js did not load. Check your internet connection, then reload.";
    readingText.innerHTML = `<p>PDF support needs the PDF.js library from the CDN.</p>`;
    return;
  }

  try {
    if (!activePdfDoc || activePdfBookId !== book.id) {
      const buffer = book.pdfUrl ? null : await getStoredPdf(book.pdfKey || book.id);
      if (book.pdfUrl) {
        activePdfDoc = await pdfjsLib.getDocument({ url: book.pdfUrl }).promise;
      } else {
        if (!buffer) throw new Error("PDF file not found on this device");
        activePdfDoc = await pdfjsLib.getDocument({ data: buffer }).promise;
      }
      activePdfBookId = book.id;
      activePdfPageTextByIndex = { ...(state.pdfTextCache?.[book.id] || {}) };
    }

    currentPageIndex = clamp(currentPageIndex, 0, activePdfDoc.numPages - 1);
    $("pageLabel").textContent = `${currentPageIndex + 1} / ${activePdfDoc.numPages}`;
    const page = await activePdfDoc.getPage(currentPageIndex + 1);
    const viewport = page.getViewport({ scale: Math.min(1.8, Math.max(1.05, ($("pdfStage").clientWidth || 720) / page.getViewport({ scale: 1 }).width)) });
    const canvas = $("pdfCanvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    if (activePdfRenderTask) activePdfRenderTask.cancel();
    activePdfRenderTask = page.render({ canvasContext: context, viewport });
    await activePdfRenderTask.promise.catch(err => {
      if (err?.name !== "RenderingCancelledException") throw err;
    });

    let pageText = activePdfPageTextByIndex[currentPageIndex] || "";
    if (!pageText) {
      const textContent = await page.getTextContent();
      pageText = textContent.items.map(item => item.str).join(" ").replace(/\s+/g, " ").trim();
      if (pageText) {
        cachePdfPageText(book.id, currentPageIndex, pageText);
      }
    }
    activePdfPageText = pageText;
    $("pdfStatus").textContent = pageText ? "PDF page loaded. Tap words in the extracted page text below." : "This page looks image-only. Use OCR page text to make words tappable.";
    readingText.innerHTML = pageText
      ? `<div class="pdf-text-label">Extracted text for word lookup</div>${tokenizePage(pageText)}`
      : `<div class="pdf-text-label">No embedded text found</div><p>Tap <strong>OCR page text</strong> to extract words from this picture page, then tap any word for a context definition.</p>`;
    readingText.querySelectorAll(".word-token").forEach(token => token.addEventListener("click", () => lookupToken(token)));
  } catch (error) {
    $("pdfStatus").textContent = error.message || "Could not open PDF.";
    readingText.innerHTML = book.pdfUrl
      ? `<p>Could not open this hosted PDF. Check that the URL is public, allows browser access, and ends in a PDF file.</p>`
      : `<p>Could not open this PDF on this device. Re-import the PDF if it was added in another browser.</p>`;
  }
}

function paginateText(text) {
  const paragraphs = text.split(/\n\s*\n/g).map(p => p.trim()).filter(Boolean);
  const pages = [];
  let page = "";
  for (const paragraph of paragraphs) {
    if ((page + "\n\n" + paragraph).split(/\s+/).length > 210 && page) {
      pages.push(page);
      page = paragraph;
    } else {
      page = page ? `${page}\n\n${paragraph}` : paragraph;
    }
  }
  if (page) pages.push(page);
  return pages.length ? pages : [text];
}

function tokenizePage(text) {
  const sentences = splitSentences(text);
  return sentences.map((sentence, sentenceIndex) => {
    const html = sentence.replace(/([A-Za-z]+(?:'[A-Za-z]+)?)/g, match => {
      const display = state.settings.syllableMode ? syllableDisplay(match) : escapeHtml(match);
      return `<span class="word-token" data-word="${escapeHtml(match)}" data-sentence-index="${sentenceIndex}" data-sentence="${escapeHtml(sentence)}">${display}</span>`;
    });
    return `<p>${html}</p>`;
  }).join("");
}

function syllableDisplay(word) {
  const chunks = roughSyllables(word);
  if (chunks.length < 2) return escapeHtml(word);
  return chunks.map(c => `<span class="syllable-hint">${escapeHtml(c)}</span>`).join("·");
}

function roughSyllables(word) {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (cleaned.length <= 4) return [word];
  const matches = cleaned.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]+$|[^aeiouy]*)/g);
  return matches && matches.length > 1 ? matches : [word];
}

async function lookupToken(token) {
  document.querySelectorAll(".word-token.selected").forEach(t => t.classList.remove("selected"));
  token.classList.add("selected");
  const rawWord = token.dataset.word;
  const word = normalizeWord(rawWord);
  const sentence = token.dataset.sentence || "";
  selectedLookup = { word, sentence };

  $("lookupWord").textContent = word;
  $("lookupSentence").textContent = sentence;
  $("definitionList").innerHTML = `<div class="definition-item">Looking up definitions...</div>`;

  const definitions = await lookupDefinitions(word);
  renderDefinitions(word, sentence, definitions);
}

function normalizeWord(word) {
  return word.toLowerCase().replace(/[^a-z']/g, "");
}

async function lookupDefinitions(word) {
  const local = LOCAL_DICTIONARY[word] || LOCAL_DICTIONARY[word.replace(/s$/, "")];
  const definitions = [];
  if (local) definitions.push({ source: "ReadRise", part: local.part, definition: local.definition, example: local.example });

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (response.ok) {
      const data = await response.json();
      const apiDefs = data.flatMap(entry => (entry.meanings || []).flatMap(meaning => (meaning.definitions || []).slice(0, 2).map(def => ({
        source: "Dictionary",
        part: meaning.partOfSpeech || "word",
        definition: def.definition,
        example: def.example || ""
      }))));
      definitions.push(...apiDefs.slice(0, 4));
    }
  } catch {
    // Offline or blocked. Local fallback remains available.
  }

  return definitions.length ? definitions : [{ source: "Context", part: "word", definition: inferDefinition(word), example: "Use the sentence to decide which meaning makes sense." }];
}

function inferDefinition(word) {
  const endings = [
    { suffix: "ing", text: "an action or process happening in the sentence" },
    { suffix: "ed", text: "an action that already happened" },
    { suffix: "ly", text: "a word that often describes how an action is done" },
    { suffix: "tion", text: "an idea, action, or process" },
    { suffix: "ness", text: "a quality or state" },
    { suffix: "er", text: "a person or thing connected to an action" }
  ];
  const match = endings.find(e => word.endsWith(e.suffix));
  return match ? `This looks like ${match.text}. Check the surrounding sentence for the exact meaning.` : "No exact definition is stored yet. Use context clues, reread the sentence, and ask an adult if needed.";
}

function renderDefinitions(word, sentence, definitions) {
  const contextHint = buildContextHint(word, sentence, definitions[0]?.definition || "");
  $("definitionList").innerHTML = `
    <div class="definition-item"><strong>Likely meaning here:</strong><br>${escapeHtml(contextHint)}</div>
    ${definitions.map(def => `<div class="definition-item">
      <strong>${escapeHtml(def.part || "word")}</strong> <span class="small">${escapeHtml(def.source || "")}</span><br>
      ${escapeHtml(def.definition || "No definition found.")}
      ${def.example ? `<p class="small">Example: ${escapeHtml(def.example)}</p>` : ""}
    </div>`).join("")}
  `;
}

function buildContextHint(word, sentence, definition) {
  if (!sentence) return definition;
  const shortSentence = sentence.length > 160 ? sentence.slice(0, 157) + "..." : sentence;
  return `In “${shortSentence},” ${word} most likely means: ${definition}`;
}

function saveLookupWord() {
  if (!selectedLookup) return toast("Tap a word first");
  const exists = state.progress.wordBank.some(w => w.word === selectedLookup.word && w.bookId === currentBookId);
  if (!exists) {
    state.progress.wordBank.push({ word: selectedLookup.word, sentence: selectedLookup.sentence, bookId: currentBookId, date: new Date().toISOString() });
    state.progress.log.unshift({ type: "word", label: `Saved “${selectedLookup.word}”`, date: new Date().toISOString(), bookId: currentBookId });
    saveState();
    renderProgress();
  }
  toast("Word saved");
}

function changePage(delta) {
  const book = getBook();
  const pageCount = book.type === "pdf" && activePdfDoc && activePdfBookId === book.id
    ? activePdfDoc.numPages
    : paginateText(getBookText(book)).length;
  currentPageIndex = clamp(currentPageIndex + delta, 0, Math.max(0, pageCount - 1));
  renderReader();
}

function speakCurrentPage() {
  const book = getBook();
  const page = getCurrentPageText(book);
  speakText(page);
}

function speakText(text) {
  if (!window.speechSynthesis) return toast("Speech is not supported in this browser");
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

function markCurrentBookRead() {
  const book = getBook();
  const metrics = analyzeText(getBookText(book));
  const minutes = Math.max(1, Math.round(metrics.wordCount / 110));
  state.progress.words += metrics.wordCount;
  state.progress.minutes += minutes;
  state.progress.todayMinutes += minutes;
  state.progress.log.unshift({ type: "read", label: `Read ${book.title}`, date: new Date().toISOString(), bookId: book.id, words: metrics.wordCount, minutes });
  saveState();
  renderAll();
  toast(`Added ${minutes} reading minute${minutes === 1 ? "" : "s"}`);
}

function toggleImportType() {
  const type = $("importType").value;
  $("textImportFields").hidden = type !== "text";
  $("pdfImportFields").hidden = type !== "pdf";
  $("hostedPdfFields").hidden = type !== "hostedPdf";
  $("catalogImportFields").hidden = type !== "catalog";
  renderImportEstimate();
}

function renderImportEstimate() {
  const importType = $("importType").value;
  if (importType === "pdf") {
    const file = $("newBookPdf").files?.[0];
    if (!file) {
      $("importEstimate").textContent = "Choose a PDF book to import.";
      return;
    }
    $("importEstimate").textContent = `${file.name} • ${(file.size / 1024 / 1024).toFixed(1)} MB • level will be estimated after text extraction in the reader.`;
    return;
  }
  if (importType === "hostedPdf") {
    const url = $("newBookPdfUrl").value.trim();
    $("importEstimate").textContent = url ? "Hosted PDF will stream from the public URL and cache extracted text locally." : "Paste a public PDF URL, preferably from your GitHub Pages books folder.";
    return;
  }
  if (importType === "catalog") {
    const url = $("catalogUrl").value.trim() || "books/books.json";
    $("importEstimate").textContent = `Catalog URL: ${url}. The app will load all book entries from that JSON file.`;
    return;
  }

  const text = $("newBookText").value.trim();
  if (!text) {
    $("importEstimate").textContent = "Paste text to estimate level.";
    return;
  }
  const metrics = analyzeText(text);
  const level = gradeToLevel(metrics.grade);
  $("importEstimate").textContent = `${metrics.wordCount} words • estimated FK grade ${metrics.grade.toFixed(1)} • suggested level: ${getLevelLabel(level)}`;
}

async function saveImportedBook() {
  const title = $("newBookTitle").value.trim();
  const author = $("newBookAuthor").value.trim() || "Imported";
  const importType = $("importType").value;

  if (importType === "catalog") {
    const url = $("catalogUrl").value.trim() || "books/books.json";
    const count = await loadHostedCatalog(url, { silent: false });
    if (count !== null) {
      state.catalogUrl = url;
      saveState();
      clearImporter();
      $("importDialog").close();
      renderAll();
      toast(`Loaded ${count} hosted book${count === 1 ? "" : "s"}`);
    }
    return;
  }

  if (importType === "hostedPdf") {
    const url = $("newBookPdfUrl").value.trim();
    if (!title || !url) return toast("Add a title and hosted PDF URL");
    const id = `hosted-${Date.now()}`;
    const book = {
      id,
      type: "pdf",
      source: "hosted",
      pdfUrl: url,
      title,
      author,
      text: "",
      level: state.profile.level || "building",
      tags: ["hosted", "pdf"],
      summary: `Hosted PDF streamed from ${url}. Text is extracted page-by-page for word lookup.`,
      questions: []
    };
    state.books.push(book);
    currentBookId = book.id;
    state.currentBookId = book.id;
    saveState();
    clearImporter();
    $("importDialog").close();
    renderAll();
    showPage("reader");
    toast("Hosted PDF added");
    return;
  }

  if (importType === "pdf") {
    const file = $("newBookPdf").files?.[0];
    if (!title || !file) return toast("Add a title and choose a PDF");
    if (file.type !== "application/pdf") return toast("Choose a PDF file");

    const id = `pdf-${Date.now()}`;
    const arrayBuffer = await file.arrayBuffer();
    await saveStoredPdf(id, arrayBuffer);
    const book = {
      id,
      type: "pdf",
      pdfKey: id,
      title,
      author,
      text: "",
      level: state.profile.level || "building",
      tags: ["pdf", "picture book"],
      summary: `PDF book imported from ${file.name}. Text is extracted page-by-page for word lookup.`,
      questions: []
    };
    state.books.push(book);
    currentBookId = book.id;
    state.currentBookId = book.id;
    saveState();
    clearImporter();
    $("importDialog").close();
    renderAll();
    showPage("reader");
    toast("PDF book imported");
    return;
  }

  const text = $("newBookText").value.trim();
  if (!title || !text) return toast("Add a title and text");
  const metrics = analyzeText(text);
  const book = {
    id: `custom-${Date.now()}`,
    title,
    author,
    type: "text",
    text,
    level: gradeToLevel(metrics.grade),
    tags: ["custom"],
    summary: `Custom text, estimated grade ${metrics.grade.toFixed(1)}.`,
    questions: []
  };
  state.books.push(book);
  currentBookId = book.id;
  state.currentBookId = book.id;
  saveState();
  clearImporter();
  $("importDialog").close();
  renderAll();
  showPage("reader");
  toast("Book imported");
}

function clearImporter() {
  $("newBookTitle").value = "";
  $("newBookAuthor").value = "";
  $("newBookText").value = "";
  $("newBookPdf").value = "";
  $("newBookPdfUrl").value = "";
  $("catalogUrl").value = state.catalogUrl || "books/books.json";
  $("importType").value = "text";
  toggleImportType();
}

function startActivity() {
  const book = getBook($("practiceBookSelect").value);
  currentBookId = book.id;
  state.currentBookId = book.id;
  const type = $("activityType").value;
  if (fluencyTimer) clearInterval(fluencyTimer);
  if (type === "comprehension") return renderComprehension(book);
  if (type === "vocabulary") return renderVocabulary(book);
  if (type === "cloze") return renderCloze(book);
  if (type === "sequence") return renderSequence(book);
  if (type === "phonics") return renderPhonics(book);
  if (type === "fluency") return renderFluency(book);
}

function renderComprehension(book) {
  const questions = book.questions?.length ? book.questions : generateComprehensionQuestions(book);
  activitySession = { type: "comprehension", book, questions, correct: 0, answered: 0 };
  $("activityArea").innerHTML = `<h3>${escapeHtml(book.title)} quiz</h3><div id="quizArea"></div><button id="finishQuiz" class="primary wide" disabled>Finish quiz</button>`;
  $("finishQuiz").addEventListener("click", finishQuiz);
  renderQuizQuestions(questions);
}

function renderQuizQuestions(questions) {
  $("quizArea").innerHTML = questions.map((question, i) => `<div class="quiz-question" data-question="${i}">
    <p><strong>${i + 1}. ${escapeHtml(question.q)}</strong></p>
    <div class="answer-list">
      ${shuffle(question.choices).map(choice => `<button class="answer-option" data-answer="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`).join("")}
    </div>
    <p class="small" id="feedback-${i}"></p>
  </div>`).join("");

  document.querySelectorAll(".answer-option").forEach(button => {
    button.addEventListener("click", () => answerQuestion(button));
  });
}

function answerQuestion(button) {
  const block = button.closest(".quiz-question");
  if (block.dataset.answered) return;
  const questionIndex = Number(block.dataset.question);
  const question = activitySession.questions[questionIndex];
  const answer = button.dataset.answer;
  const correct = answer === question.answer;
  button.classList.add(correct ? "correct" : "wrong");
  block.querySelectorAll(".answer-option").forEach(opt => {
    opt.disabled = true;
    if (opt.dataset.answer === question.answer) opt.classList.add("correct");
  });
  $(`feedback-${questionIndex}`).textContent = correct ? `Correct — ${question.skill}` : `Not quite. Correct answer: ${question.answer}. Skill: ${question.skill}`;
  activitySession.correct += correct ? 1 : 0;
  activitySession.answered += 1;
  block.dataset.answered = "true";
  $("finishQuiz").disabled = activitySession.answered !== activitySession.questions.length;
}

function finishQuiz() {
  const score = Math.round((activitySession.correct / activitySession.questions.length) * 100);
  state.progress.quizzes.push({ score, bookId: activitySession.book.id, title: activitySession.book.title, level: activitySession.book.level, date: new Date().toISOString(), type: activitySession.type });
  state.progress.log.unshift({ type: "quiz", label: `${activitySession.book.title} quiz: ${score}%`, date: new Date().toISOString(), bookId: activitySession.book.id });
  saveState();
  renderProgress();
  $("activityArea").insertAdjacentHTML("beforeend", `<div class="card flat"><h3>Score: ${score}%</h3><p>${quizAdvice(score, activitySession.book.level)}</p></div>`);
  $("finishQuiz").disabled = true;
}

function quizAdvice(score, level) {
  if (score >= 85) return `Strong comprehension. Try another ${getLevelLabel(level)} text or move toward ${getLevelLabel(nextLevel(level))}.`;
  if (score >= 70) return "Good progress. Reread tricky paragraphs and explain the main idea out loud.";
  return `This text may be too hard right now. Try ${getLevelLabel(previousLevel(level))}, build vocabulary, then return.`;
}

function generateComprehensionQuestions(book) {
  const sourceText = getBookText(book);
  const sentences = splitSentences(sourceText).filter(s => s.split(/\s+/).length > 6);
  const first = sentences[0] || sourceText.slice(0, 120);
  const last = sentences.at(-1) || first;
  return [
    { q: "Which sentence appeared in the text?", choices: shuffle([first, ...sentences.slice(1, 5)]).slice(0, 4), answer: first, skill: "literal recall" },
    { q: "What is the best title for the passage?", choices: shuffle([book.title, "A List of Random Numbers", "How to Bake a Cake", "A Day With No Problem"]), answer: book.title, skill: "main idea" },
    { q: "Which ending idea fits the passage?", choices: shuffle([last, "The moon turned into soup.", "Nobody learned anything.", "The machine flew away."]), answer: last, skill: "sequence" }
  ];
}

function renderVocabulary(book) {
  const sourceText = getBookText(book);
  const words = chooseVocabularyWords(sourceText, 5);
  const sentenceMap = mapWordsToSentences(sourceText, words);
  const questions = words.map(word => {
    const local = LOCAL_DICTIONARY[word];
    const correct = local?.definition || inferDefinition(word);
    return {
      q: `In this sentence, what does “${word}” most likely mean?\n“${sentenceMap[word] || "Find it in the passage."}”`,
      choices: shuffle([correct, "a kind of food", "a loud musical instrument", "a place to sleep"]).slice(0, 4),
      answer: correct,
      skill: "vocabulary in context"
    };
  });
  activitySession = { type: "vocabulary", book, questions, correct: 0, answered: 0 };
  $("activityArea").innerHTML = `<h3>Vocabulary in context</h3><div id="quizArea"></div><button id="finishQuiz" class="primary wide" disabled>Finish vocabulary check</button>`;
  $("finishQuiz").addEventListener("click", finishQuiz);
  renderQuizQuestions(questions);
}

function renderCloze(book) {
  const sourceText = getBookText(book);
  const sentences = splitSentences(sourceText).filter(s => s.split(/\s+/).length >= 8);
  const sentence = sentences[Math.floor(Math.random() * sentences.length)] || sourceText;
  const words = sentence.match(/\b[A-Za-z]{5,}\b/g) || [];
  const target = words[Math.floor(Math.random() * words.length)] || "word";
  const prompt = sentence.replace(new RegExp(`\\b${escapeRegExp(target)}\\b`), `<input id="clozeAnswer" class="fill-input" aria-label="Missing word" />`);
  $("activityArea").innerHTML = `<h3>Cloze reading</h3><p>Use context clues to fill in the missing word.</p><p class="reading-text">${prompt}</p><button id="checkCloze" class="primary">Check answer</button><p id="clozeFeedback"></p>`;
  $("checkCloze").addEventListener("click", () => {
    const answer = $("clozeAnswer").value.trim().toLowerCase();
    const correct = answer === target.toLowerCase();
    $("clozeFeedback").textContent = correct ? "Correct. The sentence still makes sense." : `Good try. The missing word was “${target}.” Reread the full sentence.`;
    logMiniActivity(book, correct ? "Cloze correct" : "Cloze practice");
  });
}

function renderSequence(book) {
  const sentences = splitSentences(getBookText(book)).filter(s => s.split(/\s+/).length > 5).slice(0, 4);
  const shuffled = shuffle(sentences);
  $("activityArea").innerHTML = `<h3>Sentence order</h3><p>Move the sentences into the order they appeared in the text.</p><div id="sortList" class="sort-list">${shuffled.map((s, i) => sortItemHtml(s, i)).join("")}</div><button id="checkSequence" class="primary">Check order</button><p id="sequenceFeedback"></p>`;
  document.querySelectorAll("[data-up]").forEach(button => button.addEventListener("click", () => moveSortItem(button.closest(".sort-item"), -1)));
  document.querySelectorAll("[data-down]").forEach(button => button.addEventListener("click", () => moveSortItem(button.closest(".sort-item"), 1)));
  $("checkSequence").addEventListener("click", () => {
    const current = [...document.querySelectorAll(".sort-item")].map(item => item.dataset.sentence);
    const correct = current.every((s, i) => s === sentences[i]);
    $("sequenceFeedback").textContent = correct ? "Correct sequence." : "Not yet. Look for time words and cause-effect clues, then try again.";
    logMiniActivity(book, correct ? "Sequence correct" : "Sequence practice");
  });
}

function sortItemHtml(sentence) {
  return `<div class="sort-item" data-sentence="${escapeHtml(sentence)}"><span>${escapeHtml(sentence)}</span><span><button class="ghost" data-up>↑</button> <button class="ghost" data-down>↓</button></span></div>`;
}

function moveSortItem(item, direction) {
  const parent = item.parentElement;
  if (direction < 0 && item.previousElementSibling) parent.insertBefore(item, item.previousElementSibling);
  if (direction > 0 && item.nextElementSibling) parent.insertBefore(item.nextElementSibling, item);
}

function renderPhonics(book) {
  const words = PHONICS_SETS[book.level] || PHONICS_SETS.building;
  $("activityArea").innerHTML = `<h3>Phonics warm-up</h3><p>Tap a word to hear it, then read it out loud. Notice sound chunks and syllables.</p><div class="word-bank">${words.map(w => `<button class="word-chip" data-say="${w}">${syllableText(w)}</button>`).join("")}</div><button id="phonicsDone" class="primary">Done</button>`;
  document.querySelectorAll("[data-say]").forEach(button => button.addEventListener("click", () => speakText(button.dataset.say)));
  $("phonicsDone").addEventListener("click", () => {
    logMiniActivity(book, "Phonics practice");
    toast("Phonics practice logged");
  });
}

function syllableText(word) {
  return roughSyllables(word).join("·");
}

function renderFluency(book) {
  const passage = splitSentences(getBookText(book)).slice(0, 5).join(" ");
  $("activityArea").innerHTML = `<h3>Fluency timer</h3><p>Read the passage aloud. Press start, read for one minute or until finished, then enter words read and errors.</p><div class="timer-display" id="timerDisplay">60</div><p class="reading-text">${escapeHtml(passage)}</p><div class="toolbar flat"><label>Words read<input id="wordsRead" type="number" min="0" placeholder="e.g., 92"></label><label>Errors<input id="readingErrors" type="number" min="0" value="0"></label><button id="saveFluency" class="primary">Save</button></div><button id="startTimer" class="ghost">Start 60-second timer</button><p id="fluencyFeedback"></p>`;
  $("startTimer").addEventListener("click", startFluencyTimer);
  $("saveFluency").addEventListener("click", () => saveFluency(book));
}

function startFluencyTimer() {
  if (fluencyTimer) clearInterval(fluencyTimer);
  fluencyStart = Date.now();
  let remaining = 60;
  $("timerDisplay").textContent = remaining;
  fluencyTimer = setInterval(() => {
    remaining -= 1;
    $("timerDisplay").textContent = remaining;
    if (remaining <= 0) {
      clearInterval(fluencyTimer);
      fluencyTimer = null;
      speakText("Time is up.");
    }
  }, 1000);
}

function saveFluency(book) {
  const words = Number($("wordsRead").value || 0);
  const errors = Number($("readingErrors").value || 0);
  const wpm = Math.max(0, words - errors);
  const target = LEVELS[book.level]?.targetWpm || 100;
  const feedback = wpm >= target ? `Excellent fluency for this level. WPM: ${wpm}.` : `WPM: ${wpm}. Keep rereading short passages until accuracy and smoothness improve.`;
  state.progress.fluency.push({ wpm, errors, bookId: book.id, title: book.title, level: book.level, date: new Date().toISOString() });
  state.progress.log.unshift({ type: "fluency", label: `${book.title}: ${wpm} WPM`, date: new Date().toISOString(), bookId: book.id });
  saveState();
  $("fluencyFeedback").textContent = feedback;
  renderProgress();
}

function logMiniActivity(book, label) {
  state.progress.log.unshift({ type: "practice", label: `${book.title}: ${label}`, date: new Date().toISOString(), bookId: book.id });
  saveState();
  renderProgress();
}

function renderProgress() {
  $("totalMinutes").textContent = state.progress.minutes || 0;
  $("totalWords").textContent = state.progress.words || 0;
  const quizzes = state.progress.quizzes || [];
  const avg = quizzes.length ? Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length) + "%" : "—";
  $("avgQuiz").textContent = avg;
  const fluency = state.progress.fluency || [];
  $("bestWpm").textContent = fluency.length ? Math.max(...fluency.map(f => f.wpm)) : "—";

  $("wordBank").innerHTML = state.progress.wordBank.length
    ? state.progress.wordBank.slice().reverse().map(w => `<span class="word-chip" title="${escapeHtml(w.sentence)}">${escapeHtml(w.word)}</span>`).join("")
    : `<p>No saved words yet. Tap words in the reader and save tricky ones.</p>`;

  $("activityLog").innerHTML = state.progress.log.length
    ? state.progress.log.slice(0, 12).map(item => `<div class="log-item"><strong>${escapeHtml(item.label)}</strong><br><span class="small">${new Date(item.date).toLocaleString()}</span></div>`).join("")
    : `<p>No activity yet. Read a book or start a practice activity.</p>`;

  $("todayMinutes").textContent = state.progress.todayMinutes || 0;
}

function renderSettings() {
  $("readerNameInput").value = state.profile.name;
  $("profileLevelInput").value = state.profile.level;
  $("textSize").value = state.settings.textSize;
  $("lineHeight").value = state.settings.lineHeight;
  $("focusMode").checked = state.settings.focusMode;
  $("syllableMode").checked = state.settings.syllableMode;
}

function applySettingsToDom() {
  document.documentElement.style.setProperty("--reader-font", `${state.settings.textSize}px`);
  document.documentElement.style.setProperty("--reader-line", String(state.settings.lineHeight / 100));
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `readrise-data-${todayKey()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      state = { ...createInitialState(), ...imported };
      currentBookId = state.currentBookId || DEFAULT_BOOKS[0].id;
      saveState();
      renderAll();
      toast("Data imported");
    } catch {
      toast("Could not import that file");
    }
  };
  reader.readAsText(file);
}

function getBookText(book) {
  if (!book) return "";
  if (book.type === "pdf") {
    const cached = state.pdfTextCache?.[book.id] || {};
    const combined = Object.keys(cached)
      .sort((a, b) => Number(a) - Number(b))
      .map(key => cached[key])
      .join("\n\n")
      .trim();
    return combined || book.text || "";
  }
  return book.text || "";
}

function getCurrentPageText(book) {
  if (book?.type === "pdf") return activePdfPageText || getBookText(book) || "No readable page text yet.";
  return paginateText(getBookText(book))[currentPageIndex] || getBookText(book);
}

function cachePdfPageText(bookId, pageIndex, text) {
  if (!text) return;
  state.pdfTextCache ||= {};
  state.pdfTextCache[bookId] ||= {};
  state.pdfTextCache[bookId][pageIndex] = text;
  activePdfPageTextByIndex[pageIndex] = text;
  activePdfPageText = text;
  const book = state.books.find(b => b.id === bookId) || (state.hostedBooks || []).find(b => b.id === bookId);
  if (book) {
    const metrics = analyzeText(getBookText(book));
    book.level = gradeToLevel(metrics.grade);
    book.summary = `PDF book with ${metrics.wordCount} extracted words so far; estimated grade ${metrics.grade.toFixed(1)}.`;
  }
  saveState();
}


async function loadHostedCatalog(url = "books/books.json", options = {}) {
  const { silent = false } = options;
  if (!url) return null;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const rawBooks = Array.isArray(data) ? data : (data.books || []);
    const base = new URL(url, window.location.href);
    const hostedBooks = rawBooks.map((item, index) => {
      const pdfPath = item.pdfUrl || item.url || item.pdf || "";
      const resolvedPdfUrl = pdfPath ? new URL(pdfPath, base).href : "";
      return {
        id: item.id || `hosted-${index}-${slugify(item.title || "book")}`,
        type: "pdf",
        source: "hosted",
        pdfUrl: resolvedPdfUrl,
        title: item.title || `Hosted Book ${index + 1}`,
        author: item.author || item.source || "Hosted library",
        text: item.text || "",
        level: item.level || "building",
        tags: item.tags || ["hosted", "pdf"],
        summary: item.summary || "Hosted PDF book. Text is extracted page-by-page for word lookup.",
        questions: item.questions || []
      };
    }).filter(book => book.pdfUrl);

    state.hostedBooks = hostedBooks;
    state.catalogUrl = url;
    saveState();
    renderAll();
    if (!silent) toast(`Hosted catalog loaded: ${hostedBooks.length} book${hostedBooks.length === 1 ? "" : "s"}`);
    return hostedBooks.length;
  } catch (error) {
    if (!silent) toast("Could not load hosted catalog");
    return null;
  }
}

function slugify(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "book";
}

function openPdfDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PDF_DB_NAME, PDF_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PDF_STORE_NAME)) db.createObjectStore(PDF_STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveStoredPdf(key, arrayBuffer) {
  const db = await openPdfDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE_NAME, "readwrite");
    tx.objectStore(PDF_STORE_NAME).put(arrayBuffer, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getStoredPdf(key) {
  const db = await openPdfDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE_NAME, "readonly");
    const request = tx.objectStore(PDF_STORE_NAME).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function ocrCurrentPdfPage() {
  const book = getBook();
  if (book.type !== "pdf") return toast("OCR is only for PDF picture pages");
  if (!window.Tesseract) return toast("OCR library did not load. Check internet and reload.");
  const canvas = $("pdfCanvas");
  if (!canvas.width) return toast("Open a PDF page first");
  $("pdfStatus").textContent = "OCR is reading this picture page…";
  try {
    const result = await Tesseract.recognize(canvas, "eng");
    const text = (result?.data?.text || "").replace(/\s+/g, " ").trim();
    if (!text) {
      $("pdfStatus").textContent = "OCR did not find readable text on this page.";
      return;
    }
    cachePdfPageText(book.id, currentPageIndex, text);
    const readingText = $("readingText");
    readingText.innerHTML = `<div class="pdf-text-label">OCR text for word lookup</div>${tokenizePage(text)}`;
    readingText.querySelectorAll(".word-token").forEach(token => token.addEventListener("click", () => lookupToken(token)));
    $("readerWords").textContent = analyzeText(getBookText(book)).wordCount;
    $("pdfStatus").textContent = "OCR complete. Tap words in the OCR text below.";
    toast("OCR text added for this page");
  } catch (error) {
    $("pdfStatus").textContent = "OCR failed on this page.";
    toast("OCR failed");
  }
}

function analyzeText(text) {
  const words = (text.match(/\b[A-Za-z]+(?:'[A-Za-z]+)?\b/g) || []);
  const sentences = splitSentences(text);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0) || 1;
  const wordCount = words.length || 1;
  const sentenceCount = sentences.length || 1;
  const grade = clamp(0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59, 0, 12);
  return { wordCount, sentenceCount, syllables, grade };
}

function gradeToLevel(grade) {
  if (grade < 2) return "emerging";
  if (grade < 4) return "building";
  if (grade < 6) return "confident";
  return "advanced";
}

function splitSentences(text) {
  return text.replace(/\n+/g, " ").match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s => s.trim()).filter(Boolean) || [];
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/e$/, "");
  const groups = word.match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

function chooseVocabularyWords(text, count = 5) {
  const stop = new Set("about after again also because before could every first from have into more most other some than that their there these they this through were when where which while with would your".split(" "));
  const words = [...new Set((text.toLowerCase().match(/\b[a-z]{5,}\b/g) || []).filter(w => !stop.has(w)))];
  const scored = words.map(word => ({ word, score: (LOCAL_DICTIONARY[word] ? 10 : 0) + word.length })).sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map(w => w.word);
}

function mapWordsToSentences(text, words) {
  const sentences = splitSentences(text);
  const map = {};
  for (const word of words) {
    map[word] = sentences.find(s => new RegExp(`\\b${escapeRegExp(word)}\\b`, "i").test(s)) || "";
  }
  return map;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function toast(message) {
  const t = $("toast");
  t.textContent = message;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}
