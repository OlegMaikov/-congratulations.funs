import { nanoid } from "nanoid";
import JSZip from "jszip";

import { loadStateFromStorage, saveStateToStorage, STORAGE_KEY } from "./lib/storage.js";
import { renderCoverForState, setupCoverControls } from "./lib/cover.js";
import { buildPreviewPagesForState, renderPreviewPageForState, applyPreviewOrientationForState } from "./lib/preview.js";

const DEFAULT_STATE = {
  bookTitle: "Моя первая книга",
  bookAuthor: "",
  subtitle: "",
  coverColor: "#6366f1",
  coverTheme: "classic",
  subtitleColor: "#ffffff",
  chapters: [],
  previewOrientation: "portrait",
  fontFamily: "serif",
  fontSize: "15px",
  language: "ru"
};

const state = Object.assign({}, DEFAULT_STATE);
let currentChapterId = null;
let previewPages = [];
let currentPreviewPage = 0;

// DOM elements
// Only select tab buttons that actually switch views (have data-tab) to avoid activating with undefined tabs (help button excluded)
const tabButtons = Array.from(document.querySelectorAll(".tab-btn[data-tab]"));
const tabViews = Array.from(document.querySelectorAll(".tab-view"));
const bookTitleInput = document.getElementById("book-title-input");
const bookAuthorInput = document.getElementById("book-author-input");
const chapterSelect = document.getElementById("chapter-select");
const addChapterBtn = document.getElementById("add-chapter-btn");
const deleteChapterBtn = document.getElementById("delete-chapter-btn");
const editorEl = document.getElementById("editor");
const toolbarEl = document.getElementById("editor-toolbar");
const voiceBtn = document.getElementById("voice-btn");
const fontFamilySelect = document.getElementById("font-family-select");
const fontSizeSelect = document.getElementById("font-size-select");
const insertImageBtn = document.getElementById("insert-image-btn");
const insertImageInput = document.getElementById("insert-image-input");
const previewFrame = document.getElementById("preview-frame");
const previewPageEl = document.getElementById("preview-page");
const pageIndicatorEl = document.getElementById("page-indicator");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");
const exportButtons = Array.from(document.querySelectorAll('.export-row .pill-btn'));
const orientPortrait = document.getElementById("orient-portrait");
const orientLandscape = document.getElementById("orient-landscape");
const coverControls = document.getElementById("cover-controls");
const coverControlsToggle = document.getElementById("cover-controls-toggle");
// new button to jump preview to cover
const coverShowPreviewBtn = document.getElementById("cover-show-preview");
const structureListEl = document.getElementById("structure-list");
const structureAddBtn = document.getElementById("structure-add-chapter-btn");
const pageThumbsEl = document.getElementById("page-thumbs");
const subtitleInput = document.getElementById("subtitle-input");
const coverColorInput = document.getElementById("cover-color-input");
const coverThemeSelect = document.getElementById("cover-theme-select");
const coverPreviewEl = document.getElementById("cover-preview");
const coverImageInput = document.getElementById("cover-image-input");
const coverImageClearBtn = document.getElementById("cover-image-clear");
const subtitleColorInput = document.getElementById("subtitle-color-input");
const wordCountEl = document.getElementById("word-count");
const charCountEl = document.getElementById("char-count");
const coverDownloadBtn = document.getElementById("cover-download-btn");
const langSelect = document.getElementById("lang-select");
const helpOpenBtn = document.getElementById("help-open-btn");
const helpModal = document.getElementById("editor-help-modal");
const helpCloseBtn = document.getElementById("help-close-btn");
const helpGotItBtn = document.getElementById("help-gotit-btn");
const learnGotItBtn = document.getElementById("learn-gotit-btn");
const learnCloseBtn = document.getElementById("learn-close-btn");
const splashLearnBtn = document.getElementById("splash-learn");

// Speech recognition
let recognition = null;
let recognizing = false;

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const r = new SpeechRecognition();
  r.lang = 'ru-RU';
  r.interimResults = true;
  r.continuous = false;
  r.onstart = () => {
    recognizing = true;
    voiceBtn.classList.add("recording");
  };
  r.onend = () => {
    recognizing = false;
    voiceBtn.classList.remove("recording");
    removeInterimMarker();
  };
  r.onresult = (ev) => {
    let finalTranscript = "";
    let interimTranscript = "";
    for (let i = ev.resultIndex; i < ev.results.length; ++i) {
      if (ev.results[i].isFinal) finalTranscript += ev.results[i][0].transcript;
      else interimTranscript += ev.results[i][0].transcript;
    }
    if (interimTranscript) insertInterimText(interimTranscript);
    else removeInterimMarker();
    if (finalTranscript) commitFinalText(finalTranscript);
  };
  return r;
}

function insertInterimText(text) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) editorEl.focus();
  let range = sel.getRangeAt(0);
  const existing = editorEl.querySelector('span[data-interim="true"]');
  if (existing) {
    existing.textContent = text;
    range = document.createRange();
    range.setStartAfter(existing);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    return;
  }
  const span = document.createElement("span");
  span.setAttribute("data-interim", "true");
  span.style.opacity = "0.7";
  span.style.background = "rgba(99,102,241,0.15)";
  span.textContent = text;
  range.insertNode(span);
  range = document.createRange();
  range.setStartAfter(span);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

function removeInterimMarker() {
  const existing = editorEl.querySelector('span[data-interim="true"]');
  if (existing) existing.remove();
}

function commitFinalText(text) {
  const existing = editorEl.querySelector('span[data-interim="true"]');
  if (existing) {
    const node = document.createTextNode(text);
    existing.replaceWith(node);
  } else {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) editorEl.focus();
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    const newRange = document.createRange();
    newRange.setStartAfter(node);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);
  }
  syncEditorToState();
}

voiceBtn && voiceBtn.addEventListener("click", async () => {
  if (!recognition) {
    recognition = setupSpeechRecognition();
    if (!recognition) {
      alert("Распознавание речи недоступно в этом браузере.");
      return;
    }
  }
  try {
    if (recognizing) recognition.stop();
    else { editorEl.focus(); recognition.start(); }
  } catch (err) {
    console.error(err);
  }
});

async function resizeImageFileToDataURL(file, maxWidth = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Ошибка чтения файла изображения"));
    reader.onload = () => {
      img.onload = () => {
        const ratio = img.width / img.height || 1;
        let targetW = img.width;
        let targetH = img.height;
        if (img.width > maxWidth) {
          targetW = maxWidth;
          targetH = Math.round(maxWidth / ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetW, targetH);
        try {
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } catch (err) {
          resolve(reader.result);
        }
      };
      img.onerror = () => reject(new Error("Не удалось загрузить изображение для обработки"));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function insertImageAtCaretFromFile(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("Пожалуйста, выберите изображение.");
    return;
  }
  try {
    const dataUrl = await resizeImageFileToDataURL(file, 1200, 0.85);
    editorEl.focus();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
      editorEl.insertAdjacentHTML("beforeend", `<img src="${dataUrl}" class="chapter-image" />`);
    } else {
      const range = sel.getRangeAt(0);
      const img = document.createElement("img");
      img.src = dataUrl;
      img.className = "chapter-image";
      img.alt = "Изображение";
      const fig = document.createElement("figure");
      fig.style.margin = "0 0 12px";
      fig.appendChild(img);
      range.insertNode(fig);
      range.setStartAfter(fig);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    // ensure image interactivity
    enhanceEditorImages();
    syncEditorToState();
  } catch (err) {
    console.error(err);
    alert("Ошибка при вставке изображения: " + (err.message || err));
  }
}

if (insertImageBtn && insertImageInput) {
  insertImageBtn.addEventListener("click", () => insertImageInput.click());
  insertImageInput.addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    insertImageAtCaretFromFile(f);
    insertImageInput.value = "";
  });
}

function activateTab(tabName) {
  tabButtons.forEach(btn => {
    const is = btn.dataset.tab === tabName;
    btn.classList.toggle("active", is);
    // add a quick pressed animation class when switching
    if (btn.dataset.tab === tabName) {
      btn.classList.add("pressed");
      // ensure ripple helper class present
      btn.classList.add("anim-ripple");
      setTimeout(() => btn.classList.remove("pressed"), 260);
    }
  });
  tabViews.forEach(view => {
    const active = view.dataset.tab === tabName;
    view.classList.toggle("active", active);
    // briefly trigger reflow to ensure transition runs
    if (active) {
      // force style recalculation and keep reveal smooth
      void view.offsetWidth;
      view.style.willChange = "opacity, transform";
      // remove will-change after animation
      setTimeout(() => { view.style.willChange = ""; }, 400);
    }
  });
  const activeView = tabViews.find(v => v.dataset.tab === tabName);
  if (activeView) {
    const focusable = activeView.querySelector("input,button,select,[contenteditable='true']");
    if (focusable) setTimeout(() => focusable.focus(), 50);
  }
}

// New: translations for RU and EN
const TRANSLATIONS = {
  ru: {
    tabEditor: "Редактор",
    tabStructure: "Структура",
    tabCover: "Обложка",
    tabPreview: "Просмотр",
    helpButton: "❔ Помощь",
    bookTitlePlaceholder: "Название книги",
    bookAuthorPlaceholder: "Автор",
    editorInstruction: "💡 Выберите главу, используйте форматирование и добавляйте изображения. Шрифты и размер — справа.",
    structureInstruction: "📋 Управляйте главами: переупорядочивайте, переименовывайте и создавайте новые.",
    coverInstruction: "🎨 Оформите обложку: выберите цвет, загрузите изображение, добавьте подзаголовок.",
    addChapter: "+ Глава",
    deleteChapter: "Удалить",
    subtitleLabel: "Подзаголовок",
    coverColorLabel: "Цвет фона",
    uploadCoverLabel: "Загрузить обложку",
    clearCover: "Очистить",
    subtitleColorLabel: "Цвет подзаголовка",
    hideSettings: "Скрыть настройки",
    showInPreview: "Показать в предпросмотре",
    previewInstruction: "👁️ Просмотрите книгу постранично и экспортируйте в нужный формат.",
    voiceBtnTitle: "Диктовка",
    insertImage: "Изображение",
    expEPUB: "EPUB",
    expFB2: "FB2",
    expHTML: "HTML",
    expDOCX: "DOCX",
    expPDF: "PDF",
    helpTitle: "Как пользоваться редактором — шаг за шагом",
    helpSteps: [
      "<strong>Выбор главы:</strong> в выпадающем списке выберите нужную главу или создайте новую кнопкой «+ Глава».",
      "<strong>Написание текста:</strong> в основном поле набирайте текст — оно поддерживает заголовки, абзацы и вставку изображений.",
      "<strong>Форматирование:</strong> используйте панель инструментов (жирный, курсив, списки, заголовки, цитаты) для оформления.",
      "<strong>Выравнивание:</strong> кнопки в правой части панели устанавливают выравнивание абзацев.",
      "<strong>Вставка изображения:</strong> нажмите кнопку «🖼️», выберите файл — изображение автоматически подгонится по ширине.",
      "<strong>Голосовой ввод:</strong> нажмите 🎤 и диктуйте текст (если поддерживается браузером).",
      "<strong>Сохранение:</strong> всё сохраняется автоматически в локальном хранилище; можно экспортировать книгу на вкладке «Просмотр».",
      "<strong>Структура:</strong> на вкладке «Структура» вы можете переупорядочивать и переименовывать главы."
    ],
    helpGotIt: "Понятно",
    // Splash translations RU
    splashTitle: "Конструктор книг",
    splashHeadline: "Создавайте профессиональные книги",
    splashBody: "Пишите, оформляйте и экспортируйте в любой формат — интуитивный интерфейс, быстрый старт и гибкие настройки обложки.",
    splashStart: "Начать",
    splashLearn: "Узнать больше",
    splashDesc: "Быстро начните: создайте название и автора, добавьте главы, оформите обложку и скачайте готовую книгу.",
    splashCredit: "Ваша история ждёт",
    splashCloseTitle: "Закрыть",
    // Learn modal translations (RU)
    learnTitle: "Подробнее о Конструкторе книг",
    learnP1: "<strong>Профессиональные книги:</strong> Модульный редактор, удобные шаблоны обложек и экспорт в популярные форматы.",
    learnP2: "<strong>Быстрый старт:</strong> Создайте название, добавьте главы, вставляйте изображения и используйте голосовой ввод.",
    learnP3: "<strong>Гибкая обложка:</strong> Цвета, темы, перетаскивание изображений и предпросмотр страницы обложки.",
    learnP4: "Нажмите \"Начать\" на заставке, чтобы вернуться к редактору, или закройте это окно.",
    learnGotIt: "Понятно"
  },
  en: {
    tabEditor: "Editor",
    tabStructure: "Structure",
    tabCover: "Cover",
    tabPreview: "Preview",
    helpButton: "❔ Help",
    bookTitlePlaceholder: "Book title",
    bookAuthorPlaceholder: "Author",
    editorInstruction: "💡 Pick a chapter, format text and add images. Fonts and size — on the right.",
    structureInstruction: "📋 Manage chapters: reorder, rename and create new ones.",
    coverInstruction: "🎨 Design the cover: choose color, upload image, add subtitle.",
    addChapter: "+ Chapter",
    deleteChapter: "Delete",
    subtitleLabel: "Subtitle",
    coverColorLabel: "Background color",
    uploadCoverLabel: "Upload cover",
    clearCover: "Clear",
    subtitleColorLabel: "Subtitle color",
    hideSettings: "Hide settings",
    showInPreview: "Show in preview",
    previewInstruction: "👁️ Preview the book page by page and export.",
    voiceBtnTitle: "Voice input",
    insertImage: "Image",
    expEPUB: "EPUB",
    expFB2: "FB2",
    expHTML: "HTML",
    expDOCX: "DOCX",
    expPDF: "PDF",
    helpTitle: "How to use the editor — step by step",
    helpSteps: [
      "<strong>Select chapter:</strong> choose a chapter from the dropdown or create one with \"+ Chapter\".",
      "<strong>Write text:</strong> type in the main area — supports headings, paragraphs and images.",
      "<strong>Formatting:</strong> use toolbar (bold, italic, lists, headings, quotes) to style text.",
      "<strong>Alignment:</strong> alignment buttons control paragraph alignment.",
      "<strong>Insert image:</strong> press 🖼️ and choose a file — image will be resized.",
      "<strong>Voice input:</strong> press 🎤 to dictate (if supported by browser).",
      "<strong>Saving:</strong> everything is auto-saved to local storage; export from Preview tab.",
      "<strong>Structure:</strong> reorder and rename chapters on the Structure tab."
    ],
    helpGotIt: "Got it",
    // Splash translations EN (updated to match requested copy)
    splashTitle: "Book Builder",
    splashHeadline: "Create professional books",
    splashBody: "Write, design and export to any format — intuitive UI, quick start and flexible cover options.",
    splashStart: "Get started",
    splashLearn: "Learn more",
    splashDesc: "Quick start: add a title and author, create chapters, design a cover and download your finished book.",
    splashCredit: "Your story awaits",
    splashCloseTitle: "Close",
    // Learn modal translations (EN)
    learnTitle: "Learn more about Book Builder",
    learnP1: "<strong>Professional books:</strong> Modular editor, handy cover templates and export to popular formats.",
    learnP2: "<strong>Quick start:</strong> Add a title, create chapters, insert images and use voice input.",
    learnP3: "<strong>Flexible cover:</strong> Colors, themes, drag-and-drop images and cover page preview.",
    learnP4: "Press \"Get started\" on the splash to return to the editor, or close this window.",
    learnGotIt: "Got it"
  }
};

// apply language texts to elements with data-i18n attributes
function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.ru;
  // simple mapping: elements with data-i18n -> textContent, data-i18n-title -> title, attributes placeholders
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      // if element is input placeholder
      if (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea") {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key] !== undefined) el.title = dict[key];
  });
  // placeholders specifically for title/author
  const bt = document.querySelector("[data-i18n='bookTitlePlaceholder']");
  const ba = document.querySelector("[data-i18n='bookAuthorPlaceholder']");
  if (bt && bookTitleInput) bookTitleInput.placeholder = TRANSLATIONS[lang].bookTitlePlaceholder;
  if (ba && bookAuthorInput) bookAuthorInput.placeholder = TRANSLATIONS[lang].bookAuthorPlaceholder;

  // help modal title and steps (existing)
  const helpTitleEl = document.getElementById("help-title");
  if (helpTitleEl) helpTitleEl.textContent = dict.helpTitle || "";
  const helpStepsEl = document.getElementById("help-steps");
  if (helpStepsEl) {
    helpStepsEl.innerHTML = "";
    (dict.helpSteps || []).forEach(stepHtml => {
      const li = document.createElement("li");
      li.innerHTML = stepHtml;
      helpStepsEl.appendChild(li);
    });
  }

  // Learn modal elements
  const learnTitleEl = document.getElementById("learn-title");
  if (learnTitleEl && dict.learnTitle !== undefined) learnTitleEl.textContent = dict.learnTitle;
  const learnBodyEl = document.getElementById("learn-body");
  if (learnBodyEl) {
    // set innerHTML for each paragraph key if present
    const pkeys = ["learnP1", "learnP2", "learnP3", "learnP4"];
    pkeys.forEach(k => {
      const el = learnBodyEl.querySelector(`[data-i18n="${k}"]`);
      if (el && dict[k] !== undefined) el.innerHTML = dict[k];
    });
  }
  const learnGotItBtn = document.getElementById("learn-gotit-btn");
  if (learnGotItBtn && dict.learnGotIt !== undefined) learnGotItBtn.textContent = dict.learnGotIt;

  // update export button labels if desired (they are short, but we have translations)
  exportButtons.forEach(btn => {
    const key = btn.getAttribute("data-i18n");
    if (key && dict[key]) btn.textContent = dict[key];
  });

  // update some dynamic labels like cover-controls-toggle
  const coverToggle = document.getElementById("cover-controls-toggle");
  if (coverToggle && dict.hideSettings) coverToggle.textContent = dict.hideSettings;

  // set lang-select value if present
  const langSelect = document.getElementById("lang-select");
  if (langSelect) langSelect.value = lang;
}

function loadStateLocal() {
  const loaded = loadStateFromStorage();
  if (!loaded) return;
  Object.keys(DEFAULT_STATE).forEach(k => {
    if (loaded[k] !== undefined) state[k] = loaded[k];
  });
  if (Array.isArray(loaded.chapters)) state.chapters = loaded.chapters;
  if (loaded.coverImage !== undefined) state.coverImage = loaded.coverImage;
  if (loaded.currentChapterId) currentChapterId = loaded.currentChapterId;
}

function saveStateLocal() {
  saveStateToStorage({
    bookTitle: state.bookTitle,
    bookAuthor: state.bookAuthor,
    subtitle: state.subtitle,
    coverColor: state.coverColor,
    coverTheme: state.coverTheme,
    subtitleColor: state.subtitleColor,
    chapters: state.chapters,
    previewOrientation: state.previewOrientation,
    coverImage: state.coverImage || null,
    currentChapterId,
    fontFamily: state.fontFamily,
    fontSize: state.fontSize,
    language: state.language || "ru"
  });
}

function ensureAtLeastOneChapter() {
  if (!state.chapters || state.chapters.length === 0) {
    const id = nanoid(6);
    state.chapters = [{ id, title: "Глава 1", contentHtml: "" }];
    currentChapterId = id;
  } else if (!currentChapterId) {
    currentChapterId = state.chapters[0].id;
  }
}

function renderChapterSelect() {
  chapterSelect.innerHTML = "";
  state.chapters.forEach(ch => {
    const opt = document.createElement("option");
    opt.value = ch.id;
    opt.textContent = ch.title;
    chapterSelect.appendChild(opt);
  });
  chapterSelect.value = currentChapterId;
}

function renderEditorContent() {
  const current = state.chapters.find(c => c.id === currentChapterId);
  if (!current) return;
  editorEl.innerHTML = current.contentHtml || "";
}

function renderPageThumbnails() {
  pageThumbsEl.innerHTML = "";
  if (!previewPages || previewPages.length === 0) return;
  previewPages.forEach((p, idx) => {
    const thumb = document.createElement("div");
    thumb.className = "page-thumb";
    if (idx === currentPreviewPage) thumb.classList.add("active");
    let label = "";
    if (p.type === "cover") label = "Обложка";
    else if (p.type === "toc") label = "Содержание";
    else if (p.type === "chapter") label = p.title || `Глава ${idx}`;
    thumb.innerHTML = `<div style="flex:1;display:flex;align-items:center;justify-content:center;padding:4px;word-break:break-word">${escapeHtml((label || "").slice(0, 40))}</div>`;
    thumb.addEventListener("click", () => {
      currentPreviewPage = idx;
      renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
      renderPageThumbnails();
      saveStateLocal();
    });
    pageThumbsEl.appendChild(thumb);
  });
}

function updateEditorStats() {
  if (!editorEl) return;
  // strip tags but preserve non-breaking spaces handling
  const text = editorEl.innerText || editorEl.textContent || "";
  const trimmed = text.replace(/\u00A0/g, " ").trim();
  const words = trimmed.length ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const chars = trimmed.replace(/\s/g, "").length;
  if (wordCountEl) wordCountEl.textContent = `${words} сл`;
  if (charCountEl) charCountEl.textContent = `${chars} зн`;
}

function syncEditorToState() {
  const current = state.chapters.find(c => c.id === currentChapterId);
  if (!current) return;
  current.contentHtml = editorEl.innerHTML;
  previewPages = buildPreviewPagesForState(state);
  renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
  renderPageThumbnails();
  saveStateLocal();
  updateEditorStats();
}

function renderStructureList() {
  structureListEl.innerHTML = "";
  state.chapters.forEach((ch, index) => {
    const item = document.createElement("div");
    item.className = "structure-item";

    const titleInput = document.createElement("input");
    titleInput.className = "structure-item-title";
    titleInput.type = "text";
    titleInput.value = ch.title;
    titleInput.addEventListener("input", () => updateChapterTitle(ch.id, titleInput.value));
    titleInput.addEventListener("focus", () => {
      currentChapterId = ch.id;
      renderChapterSelect();
      renderEditorContent();
      saveStateLocal();
    });

    const actions = document.createElement("div");
    actions.className = "structure-item-actions";

    const upBtn = document.createElement("button");
    upBtn.className = "icon-btn";
    upBtn.textContent = "↑";
    upBtn.disabled = index === 0;
    upBtn.addEventListener("click", () => moveChapter(ch.id, -1));

    const downBtn = document.createElement("button");
    downBtn.className = "icon-btn";
    downBtn.textContent = "↓";
    downBtn.disabled = index === state.chapters.length - 1;
    downBtn.addEventListener("click", () => moveChapter(ch.id, 1));

    actions.appendChild(upBtn);
    actions.appendChild(downBtn);
    item.appendChild(titleInput);
    item.appendChild(actions);
    structureListEl.appendChild(item);
  });
}

function addChapter() {
  const index = (state.chapters ? state.chapters.length : 0) + 1;
  const id = nanoid(6);
  if (!state.chapters) state.chapters = [];
  state.chapters.push({ id, title: `Глава ${index}`, contentHtml: "" });
  currentChapterId = id;
  renderChapterSelect();
  renderEditorContent();
  renderStructureList();
  previewPages = buildPreviewPagesForState(state);
  renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
  renderPageThumbnails();
  saveStateLocal();
}

function deleteCurrentChapter() {
  if (!state.chapters || state.chapters.length <= 1) {
    alert("Должна быть хотя бы одна глава.");
    return;
  }
  const idx = state.chapters.findIndex(c => c.id === currentChapterId);
  if (idx === -1) return;
  state.chapters.splice(idx, 1);
  const next = state.chapters[Math.max(0, idx - 1)];
  currentChapterId = next.id;
  renderChapterSelect();
  renderEditorContent();
  renderStructureList();
  previewPages = buildPreviewPagesForState(state);
  if (currentPreviewPage >= previewPages.length) currentPreviewPage = Math.max(0, previewPages.length - 1);
  renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
  renderPageThumbnails();
  saveStateLocal();
}

function updateChapterTitle(id, newTitle) {
  const chapter = state.chapters.find(c => c.id === id);
  if (!chapter) return;
  chapter.title = newTitle.trim() || "Без названия";
  renderChapterSelect();
  previewPages = buildPreviewPagesForState(state);
  renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
  renderPageThumbnails();
  saveStateLocal();
}

function moveChapter(id, direction) {
  const idx = state.chapters.findIndex(c => c.id === id);
  if (idx === -1) return;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= state.chapters.length) return;
  const [item] = state.chapters.splice(idx, 1);
  state.chapters.splice(newIdx, 0, item);
  renderChapterSelect();
  renderStructureList();
  previewPages = buildPreviewPagesForState(state);
  renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
  renderPageThumbnails();
  saveStateLocal();
}

function renderCover() {
  renderCoverForState({ state, coverPreviewEl });
  // keep subtitle color input in sync
  if (subtitleColorInput) subtitleColorInput.value = state.subtitleColor || "#ffffff";
}

function applyFontSettings() {
  const ff = state.fontFamily || DEFAULT_STATE.fontFamily;
  const fs = state.fontSize || DEFAULT_STATE.fontSize;
  if (editorEl) {
    editorEl.style.fontFamily = ff;
    editorEl.style.fontSize = fs;
  }
  if (previewPageEl) {
    previewPageEl.style.fontFamily = ff;
    previewPageEl.style.fontSize = fs;
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === "b") { e.preventDefault(); document.execCommand("bold"); syncEditorToState(); }
    if (e.key === "i") { e.preventDefault(); document.execCommand("italic"); syncEditorToState(); }
    if (e.key === "u") { e.preventDefault(); document.execCommand("underline"); syncEditorToState(); }
    if (e.key === "k") { // Ctrl/Cmd+K -> create link shortcut
      e.preventDefault();
      const url = prompt("Вставьте URL (начните с http:// или https://):", "https://");
      if (url) { document.execCommand("createLink", false, url); syncEditorToState(); }
    }
  }
});

function init() {
  // App opens directly; splash/presentation removed.
  loadStateLocal();

  bookTitleInput.value = state.bookTitle || DEFAULT_STATE.bookTitle;
  bookAuthorInput.value = state.bookAuthor || DEFAULT_STATE.bookAuthor;

  if (fontFamilySelect) fontFamilySelect.value = state.fontFamily || DEFAULT_STATE.fontFamily;
  if (fontSizeSelect) fontSizeSelect.value = state.fontSize || DEFAULT_STATE.fontSize;
  if (subtitleColorInput) subtitleColorInput.value = state.subtitleColor || DEFAULT_STATE.subtitleColor;

  ensureAtLeastOneChapter();
  renderChapterSelect();
  renderEditorContent();
  renderStructureList();
  applyFontSettings();
  renderCover();

  previewPages = buildPreviewPagesForState(state);
  renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
  renderPageThumbnails();
  updateEditorStats();

  if (state.previewOrientation === "landscape") orientLandscape.checked = true;
  else orientPortrait.checked = true;
  applyPreviewOrientationForState({ state, previewPageEl });
  // Events
  tabButtons.forEach(btn => btn.addEventListener("click", () => activateTab(btn.dataset.tab)));

  bookTitleInput.addEventListener("input", () => {
    state.bookTitle = bookTitleInput.value.trim() || "Без названия";
    renderCover();
    previewPages = buildPreviewPagesForState(state);
    renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
    saveStateLocal();
  });

  bookAuthorInput.addEventListener("input", () => {
    state.bookAuthor = bookAuthorInput.value.trim();
    renderCover();
    previewPages = buildPreviewPagesForState(state);
    renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
    saveStateLocal();
  });

  chapterSelect.addEventListener("change", () => {
    currentChapterId = chapterSelect.value;
    renderEditorContent();
    saveStateLocal();
  });

  addChapterBtn.addEventListener("click", () => addChapter());
  deleteChapterBtn.addEventListener("click", () => deleteCurrentChapter());

  toolbarEl.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const cmd = btn.dataset.cmd;
    const value = btn.dataset.value || undefined;
    if (!cmd) return;
    editorEl.focus();
    // handle link insertion with a friendly prompt
    if (cmd === "createLink") {
      // try to get selected text or ask for URL
      const sel = window.getSelection();
      let selected = (sel && sel.toString()) || "";
      const url = prompt("Вставьте URL (начните с http:// или https://):", "https://");
      if (url) { document.execCommand("createLink", false, url); syncEditorToState(); }
    } else if (cmd === "removeFormat") {
      // remove formatting for selection
      document.execCommand("removeFormat", false, null);
      // also unwrap links if any
      document.execCommand("unlink", false, null);
    } else {
      try { document.execCommand(cmd, false, value); } catch (err) { console.warn("execCommand failed", cmd, err); }
    }
    syncEditorToState();
  });

  editorEl.addEventListener("input", () => syncEditorToState());
  // update stats also on selection change so counts reflect pasted content
  document.addEventListener("selectionchange", () => updateEditorStats());

  structureAddBtn.addEventListener("click", () => { addChapter(); activateTab("editor"); });

  subtitleInput.addEventListener("input", () => {
    state.subtitle = subtitleInput.value;
    renderCover();
    previewPages = buildPreviewPagesForState(state);
    renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
    saveStateLocal();
  });

  // subtitle color control
  if (subtitleColorInput) {
    subtitleColorInput.addEventListener("input", () => {
      state.subtitleColor = subtitleColorInput.value;
      renderCover();
      previewPages = buildPreviewPagesForState(state);
      renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
      saveStateLocal();
    });
  }

  coverColorInput.addEventListener("input", () => {
    state.coverColor = coverColorInput.value;
    renderCover();
    saveStateLocal();
  });

  coverThemeSelect.addEventListener("change", () => {
    state.coverTheme = coverThemeSelect.value;
    renderCover();
    saveStateLocal();
  });

  setupCoverControls({
    state,
    coverImageInput,
    coverImageClearBtn,
    coverPreviewEl,
    onChange: () => {
      renderCover();
      previewPages = buildPreviewPagesForState(state);
      renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
      renderPageThumbnails();
      saveStateLocal();
    }
  });

  exportButtons.forEach(btn =>
    btn.addEventListener("click", async () => {
      const format = btn.dataset.format;
      try {
        if (format === "epub") {
          const blob = await buildEpub();
          downloadBlob(blob, `${safeFilename(state.bookTitle)}.epub`);
        } else if (format === "fb2") {
          const xml = buildFb2();
          downloadBlob(new Blob([xml], { type: "application/xml" }), `${safeFilename(state.bookTitle)}.fb2`);
        } else if (format === "html" || format === "docx") {
          const html = buildHtmlExport();
          downloadBlob(new Blob([html], { type: "text/html" }), `${safeFilename(state.bookTitle)}.${format}`);
        } else {
          alert(`Экспорт в ${format.toUpperCase()} недоступен`);
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка при экспорте: " + err.message);
      }
    })
  );

  prevPageBtn.addEventListener("click", () => {
    if (currentPreviewPage > 0) currentPreviewPage--;
    renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
    renderPageThumbnails();
    saveStateLocal();
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPreviewPage < previewPages.length - 1) currentPreviewPage++;
    renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
    renderPageThumbnails();
    saveStateLocal();
  });

  orientPortrait.addEventListener("change", () => {
    if (orientPortrait.checked) {
      state.previewOrientation = "portrait";
      applyPreviewOrientationForState({ state, previewPageEl });
      saveStateLocal();
    }
  });
  orientLandscape.addEventListener("change", () => {
    if (orientLandscape.checked) {
      state.previewOrientation = "landscape";
      applyPreviewOrientationForState({ state, previewPageEl });
      saveStateLocal();
    }
  });

  coverShowPreviewBtn && coverShowPreviewBtn.addEventListener("click", () => {
    // jump to preview tab and show cover page
    activateTab("preview");
    previewPages = buildPreviewPagesForState(state);
    currentPreviewPage = 0;
    renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state });
    renderPageThumbnails();
    saveStateLocal();
  });

  coverControlsToggle && coverControlsToggle.addEventListener("click", () => {
    if (coverControls.classList.contains("collapsed")) {
      coverControls.classList.remove("collapsed");
    } else {
      coverControls.classList.add("collapsed");
    }
  });

  coverDownloadBtn && coverDownloadBtn.addEventListener("click", async () => {
    // render cover-inner to canvas and download as image
    try {
      const inner = coverPreviewEl.querySelector(".cover-inner");
      if (!inner) return;
      // Use HTMLCanvas approach via SVG foreignObject for better fidelity
      const rect = inner.getBoundingClientRect();
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${Math.round(rect.width)}' height='${Math.round(rect.height)}'>
        <foreignObject width='100%' height='100%'>
          ${new XMLSerializer().serializeToString(inner.cloneNode(true))}
        </foreignObject>
      </svg>`;
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(b => {
          downloadBlob(b, `${safeFilename(state.bookTitle)}-cover.png`);
          URL.revokeObjectURL(url);
        }, "image/png");
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        alert("Не удалось подготовить обложку для скачивания.");
      };
      img.src = url;
    } catch (err) {
      console.error(err);
      alert("Ошибка при подготовке обложки: " + err.message);
    }
  });

  // simple language switch wiring
  if (langSelect) {
    langSelect.value = state.language || "ru";
    langSelect.addEventListener("change", () => {
      state.language = langSelect.value;
      applyLanguage(state.language);
      saveStateLocal();
    });
  }
  // apply initial language
  applyLanguage(state.language || "ru");

  // help modal wiring
  helpOpenBtn && helpOpenBtn.addEventListener("click", () => {
    if (helpModal) helpModal.setAttribute("aria-hidden", "false");
  });
  helpCloseBtn && helpCloseBtn.addEventListener("click", () => {
    if (helpModal) helpModal.setAttribute("aria-hidden", "true");
  });
  helpGotItBtn && helpGotItBtn.addEventListener("click", () => {
    if (helpModal) helpModal.setAttribute("aria-hidden", "true");
  });

  learnCloseBtn && learnCloseBtn.addEventListener("click", () => {
    const lm = document.getElementById("splash-learn-modal");
    if (lm) lm.setAttribute("aria-hidden", "true");
  });
  learnGotItBtn && learnGotItBtn.addEventListener("click", () => {
    const lm = document.getElementById("splash-learn-modal");
    if (lm) lm.setAttribute("aria-hidden", "true");
  });

  splashLearnBtn && splashLearnBtn.addEventListener("click", () => {
    const lm = document.getElementById("splash-learn-modal");
    if (lm) lm.setAttribute("aria-hidden", "false");
  });

  // small UX: enable clicking cover preview to open upload
  coverPreviewEl && coverPreviewEl.addEventListener("click", () => {
    if (coverImageInput) coverImageInput.click();
  });

  // keep images interactive
  enhanceEditorImages();
}

// Minimal helpers for export and utilities

function buildHtmlExport() {
  // simple single-file HTML export of chapters
  const title = escapeHtml(state.bookTitle || "Без названия");
  let body = `<h1>${title}</h1><h3>${escapeHtml(state.bookAuthor || "")}</h3>`;
  state.chapters.forEach((ch, i) => {
    body += `<h2>${escapeHtml(ch.title || `Глава ${i + 1}`)}</h2>`;
    body += `<div>${ch.contentHtml || ""}</div>`;
  });
  return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${body}</body></html>`;
}

function buildFb2() {
  // very lightweight FB2 wrapper, not full spec
  const title = escapeXml(state.bookTitle || "Без названия");
  const author = escapeXml(state.bookAuthor || "");
  let body = `<description><title-info><book-title>${title}</book-title><author><nickname>${author}</nickname></author></title-info></description>`;
  body += `<body>`;
  state.chapters.forEach((ch) => {
    body += `<section><title><p>${escapeXml(ch.title || "")}</p></title><p>${escapeXml((ch.contentHtml || "").replace(/<[^>]+>/g, " "))}</p></section>`;
  });
  body += `</body>`;
  return `<?xml version="1.0" encoding="utf-8"?><FictionBook>${body}</FictionBook>`;
}

async function buildEpub() {
  // simple EPUB: create mimetype + minimal container + single HTML content using JSZip
  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.folder("META-INF").file("container.xml", `<?xml version="1.0"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`);
  const oebps = zip.folder("OEBPS");
  const contentHtml = buildHtmlExport();
  oebps.file("content.html", contentHtml);
  // basic package.opf
  const metadata = `<?xml version="1.0" encoding="utf-8"?><package version="3.0" xmlns="http://www.idpf.org/2007/opf"><metadata><dc:title xmlns:dc="http://purl.org/dc/elements/1.1/">${escapeXml(state.bookTitle || "")}</dc:title></metadata><manifest><item id="content" href="content.html" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="content"/></spine></package>`;
  oebps.file("content.opf", metadata);
  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function safeFilename(s) {
  return (s || "book").replace(/[<>:"/\\|?*\x00-\x1F]/g, "-").trim();
}

function escapeHtml(s) {
  if (!s) return "";
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
}
function escapeXml(s) {
  return escapeHtml(s);
}

// simple image enhancements: click to toggle selection and allow removal via context menu
function enhanceEditorImages() {
  const imgs = editorEl.querySelectorAll("img.chapter-image");
  imgs.forEach(img => {
    if (img.dataset.enhanced) return;
    img.dataset.enhanced = "1";
    img.tabIndex = 0;
    img.addEventListener("click", (e) => {
      imgs.forEach(i => i.classList.remove("selected-image"));
      img.classList.add("selected-image");
    });
    img.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      if (confirm("Удалить изображение?")) {
        img.remove();
        syncEditorToState();
      }
    });
  });
}

// initialize
document.addEventListener("DOMContentLoaded", () => {
  try {
    init();
  } catch (err) {
    console.error("Инициализация не удалась:", err);
  }
});

