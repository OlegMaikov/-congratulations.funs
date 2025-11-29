// Cover rendering and upload/drag-drop handling module

export function renderCoverForState({ state, coverPreviewEl }) {
  const inner = coverPreviewEl.querySelector(".cover-inner");
  let background = state.coverColor || "#f5e6cc";
  let textColor = "#2b2010";
  const theme = state.coverTheme;

  if (theme === "dark") {
    background = "#2a201b";
    textColor = "#f5e6cc";
  } else if (theme === "fairy") {
    background = "#ffe9da";
    textColor = "#5a3020";
  }

  inner.style.background = background;
  inner.style.color = textColor;
  inner.style.backgroundImage = "";

  if (state.coverImage) {
    inner.style.backgroundImage = `url("${state.coverImage}")`;
    inner.style.backgroundSize = "cover";
    inner.style.backgroundPosition = "center";
    inner.style.color = "#fff";
    inner.style.position = "relative";
    inner.style.overflow = "hidden";
    let overlay = inner.querySelector(".cover-image-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "cover-image-overlay";
      inner.appendChild(overlay);
    }
    overlay.style.position = "absolute";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.background = "linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15))";
    overlay.style.pointerEvents = "none";
    inner.querySelectorAll(".cover-title,.cover-subtitle,.cover-author").forEach(el => {
      el.style.position = "relative";
      el.style.zIndex = "2";
      el.style.textShadow = "0 2px 6px rgba(0,0,0,0.35)";
    });
  } else {
    const overlay = inner.querySelector(".cover-image-overlay");
    if (overlay) overlay.remove();
    inner.style.backgroundImage = "";
    inner.style.position = "";
    inner.querySelectorAll(".cover-title,.cover-subtitle,.cover-author").forEach(el => {
      el.style.position = "";
      el.style.zIndex = "";
      el.style.textShadow = "";
    });
  }

  const coverTitleEl = document.getElementById("cover-title");
  const coverSubtitleEl = document.getElementById("cover-subtitle");
  const coverAuthorEl = document.getElementById("cover-author");
  coverTitleEl.textContent = state.bookTitle || "Без названия";
  coverAuthorEl.textContent = state.bookAuthor || "Автор";
  coverSubtitleEl.textContent = state.subtitle || "Подзаголовок";

  // apply subtitle color if provided
  if (state.subtitleColor) {
    coverSubtitleEl.style.color = state.subtitleColor;
  } else {
    coverSubtitleEl.style.color = "";
  }

  const subtitleInput = document.getElementById("subtitle-input");
  subtitleInput.value = state.subtitle || "";
}

// Setup upload, clear and drag/drop wiring for cover controls
export function setupCoverControls({ state, coverImageInput, coverImageClearBtn, coverPreviewEl, onChange }) {
  coverImageInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Пожалуйста, выберите изображение.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      state.coverImage = reader.result;
      if (onChange) onChange();
    };
    reader.readAsDataURL(file);
  });

  coverImageClearBtn.addEventListener("click", () => {
    state.coverImage = null;
    coverImageInput.value = "";
    if (onChange) onChange();
  });

  coverPreviewEl.addEventListener("dragover", (e) => {
    e.preventDefault();
    coverPreviewEl.classList.add("drag-over");
  }, { passive: false });
  coverPreviewEl.addEventListener("dragleave", () => {
    coverPreviewEl.classList.remove("drag-over");
  });
  coverPreviewEl.addEventListener("drop", (e) => {
    e.preventDefault();
    coverPreviewEl.classList.remove("drag-over");
    const dt = e.dataTransfer;
    if (!dt) return;
    const file = dt.files && dt.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Пожалуйста, перетащите изображение.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      state.coverImage = reader.result;
      if (onChange) onChange();
    };
    reader.readAsDataURL(file);
  });
}