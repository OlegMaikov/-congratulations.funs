// Preview pagination and rendering helpers

export function buildPreviewPagesForState(state) {
  const pages = [];
  pages.push({
    type: "cover",
    title: state.bookTitle || "Без названия",
    author: state.bookAuthor || "Автор",
    subtitle: state.subtitle || ""
  });

  const tocItems = (state.chapters || []).map((ch, i) => `${i + 1}. ${ch.title}`);
  pages.push({ type: "toc", items: tocItems });

  (state.chapters || []).forEach(ch => {
    // try to preserve headings: if chapter content contains an h1-h6, use first one as the displayed chapter title
    const rawHtml = ch.contentHtml || "";
    let detectedTitle = ch.title || "";
    let bodyHtml = rawHtml;

    if (rawHtml && /<h[1-6][\s\S]*?>/i.test(rawHtml)) {
      try {
        const parser = new DOMParser();
        // parse as fragment inside a container so multiple nodes are handled
        const doc = parser.parseFromString(`<div id="__frag__">${rawHtml}</div>`, "text/html");
        const container = doc.getElementById("__frag__");
        if (container) {
          const heading = container.querySelector("h1, h2, h3, h4, h5, h6");
          if (heading) {
            const txt = heading.textContent ? heading.textContent.trim() : "";
            if (txt) detectedTitle = txt;
            // remove the heading node from body so it doesn't duplicate
            heading.remove();
            bodyHtml = container.innerHTML || "";
          }
        }
      } catch (err) {
        // parsing may fail in some environments — fall back to simple text fallback
        bodyHtml = rawHtml;
      }
    }

    // fallback: if after stripping tags body is empty, show placeholder
    const textOnly = (bodyHtml || "").replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!textOnly) {
      pages.push({ type: "chapter", title: detectedTitle || ch.title || `Глава`, bodyHtml: "<em>(пока пусто)</em>" });
    } else {
      // paginate large text conservatively by text length (rough chunking) while preserving HTML of each chunk
      const plain = textOnly;
      const chunkSize = 1200;
      if (plain.length <= chunkSize) {
        pages.push({ type: "chapter", title: detectedTitle || ch.title || `Глава`, bodyHtml: bodyHtml || `<p>${escapeHtml(plain)}</p>` });
      } else {
        // If large, split plain text into chunks and create simple paragraph wrappers for each chunk
        for (let i = 0; i < plain.length; i += chunkSize) {
          const part = plain.slice(i, i + chunkSize);
          const html = `<p>${escapeHtml(part)}</p>`;
          pages.push({ type: "chapter", title: detectedTitle || ch.title || `Глава`, bodyHtml: html, partIndex: Math.floor(i / chunkSize) + 1 });
        }
      }
    }
  });

  return pages;
}

export function renderPreviewPageForState({ previewPages, currentPreviewPage, previewPageEl, pageIndicatorEl, state, setCurrentPage }) {
  previewPageEl.innerHTML = "";
  // reset any inline background/positioning from previous render
  previewPageEl.style.backgroundImage = "";
  previewPageEl.style.backgroundSize = "";
  previewPageEl.style.backgroundPosition = "";
  previewPageEl.style.backgroundRepeat = "";
  previewPageEl.style.color = "";
  previewPageEl.style.position = "";

  if (previewPages.length === 0) {
    previewPageEl.textContent = "Пусто";
    pageIndicatorEl.textContent = "Стр. 0 / 0";
    return;
  }

  const page = previewPages[currentPreviewPage];
  pageIndicatorEl.textContent = `Стр. ${currentPreviewPage + 1} / ${previewPages.length}`;
  previewPageEl.classList.toggle("landscape", state.previewOrientation === "landscape");
  previewPageEl.classList.toggle("portrait", state.previewOrientation !== "landscape");

  if (page.type === "cover") {
    const wrap = document.createElement("div"); wrap.className = "page-cover";
    // If state.coverImage exists use it as background of the preview container
    if (state.coverImage) {
      previewPageEl.style.position = "relative";
      previewPageEl.style.backgroundImage = `url("${state.coverImage}")`;
      previewPageEl.style.backgroundSize = "cover";
      previewPageEl.style.backgroundPosition = "center";
      previewPageEl.style.backgroundRepeat = "no-repeat";
      // make sure foreground content is readable
      previewPageEl.style.color = "#ffffff";
      // optionally add a subtle overlay to improve text contrast
      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.inset = "0";
      overlay.style.background = "linear-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0.12))";
      overlay.style.pointerEvents = "none";
      previewPageEl.appendChild(overlay);
      // ensure wrap sits above overlay
      wrap.style.position = "relative";
      wrap.style.zIndex = "2";
    }

    const t = document.createElement("div"); t.className = "page-cover-title"; t.textContent = page.title;
    const a = document.createElement("div"); a.className = "page-cover-author"; a.textContent = page.author;
    if (page.subtitle) {
      const s = document.createElement("div"); s.className = "page-cover-subtitle"; s.textContent = page.subtitle;
      wrap.appendChild(s);
    }
    wrap.appendChild(t); wrap.appendChild(a); previewPageEl.appendChild(wrap);
  } else if (page.type === "toc") {
    const wrap = document.createElement("div"); wrap.className = "page-toc";
    const h = document.createElement("h3"); h.textContent = "Содержание";
    wrap.appendChild(h);
    page.items.forEach(it => {
      const li = document.createElement("div"); li.className = "toc-line"; li.textContent = it;
      wrap.appendChild(li);
    });
    previewPageEl.appendChild(wrap);
  } else if (page.type === "chapter") {
    const wrap = document.createElement("div"); wrap.className = "page-chapter";
    const h = document.createElement("h2"); h.textContent = page.title;
    const body = document.createElement("div"); body.className = "page-chapter-body";
    // bodyHtml may contain simple HTML produced from editor; insert as HTML
    body.innerHTML = page.bodyHtml;
    wrap.appendChild(h); wrap.appendChild(body); previewPageEl.appendChild(wrap);
  }

  // expose optional navigation setter to update current page externally
  if (setCurrentPage && typeof setCurrentPage === "function") {
    // nothing to do here; caller will manage currentPreviewPage variable
  }
}

export function applyPreviewOrientationForState({ state, previewPageEl }) {
  previewPageEl.classList.toggle("landscape", state.previewOrientation === "landscape");
  previewPageEl.classList.toggle("portrait", state.previewOrientation !== "landscape");
}

function escapeHtml(s) {
  // corrected mapping and quoting to avoid invalid token / unterminated string issues
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
}