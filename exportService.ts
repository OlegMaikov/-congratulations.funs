
import { Book } from '../types';

const sanitizeFileName = (title: string): string => {
  return title.replace(/[^a-z0-9а-яё]/gi, '_').substring(0, 50);
};

// Helper to trigger download
const downloadFile = (content: string | Blob, fileName: string, mimeType: string) => {
  // Always use Blob for better encoding control
  const blob = typeof content === 'string'
    ? new Blob(['\ufeff', content], { type: `${mimeType};charset=utf-8` })
    : content;

  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportService = {
  toJSON: (book: Book) => {
    // JSON usually doesn't need BOM, but it doesn't hurt for some viewers
    const content = JSON.stringify(book, null, 2);
    downloadFile(content, `${sanitizeFileName(book.title)}.json`, 'application/json');
  },

  toMarkdown: (book: Book) => {
    let content = `# ${book.title}\n\n`;
    content += `Author: ${book.author}\n\n`;
    content += `> ${book.description}\n\n---\n\n`;
    book.chapters.forEach(chapter => {
      content += `## ${chapter.title}\n\n${chapter.content}\n\n`;
    });
    downloadFile(content, `${sanitizeFileName(book.title)}.md`, 'text/markdown');
  },

  toTXT: (book: Book) => {
    let content = `${book.title}\n${book.author}\n\n${book.description}\n\n=================================\n\n`;
    book.chapters.forEach(chapter => {
      content += `${chapter.title.toUpperCase()}\n\n${chapter.content}\n\n---------------------------------\n\n`;
    });
    downloadFile(content, `${sanitizeFileName(book.title)}.txt`, 'text/plain');
  },

  toHTML: (book: Book) => {
    let content = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${book.title}</title>
    <style>body{font-family:serif;max-width:800px;margin:0 auto;padding:20px;line-height:1.6}h1,h2{text-align:center}.author{text-align:center;color:#666;margin-bottom:40px}img{max-width:100%;height:auto;display:block;margin:0 auto 20px}</style>
    </head><body>`;
    if (book.coverImage) content += `<img src="${book.coverImage}" alt="Cover">`;
    content += `<h1>${book.title}</h1><p class="author">${book.author}</p><p><i>${book.description}</i></p><hr>`;
    book.chapters.forEach(c => {
      content += `<h2>${c.title}</h2><div>${c.content.replace(/\n/g, '<br>')}</div>`;
    });
    content += `</body></html>`;
    downloadFile(content, `${sanitizeFileName(book.title)}.html`, 'text/html');
  },

  toDOC: (book: Book) => {
    // Generate an HTML-based DOC file which Word opens happily.
    // IMPORTANT: Added \ufeff (BOM) in the downloadFile helper to ensure Word reads UTF-8 correctly.
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${book.title}</title>
      <style>
        body { font-family: 'Times New Roman'; }
        p.MsoNormal { margin-bottom: 12pt; }
      </style>
      </head><body>
      <h1>${book.title}</h1>
      <p><b>${book.author}</b></p>
      <br/>
      <p>${book.description}</p>
      <br clear="all" style="page-break-before:always" />
      ${book.chapters.map(c => `
        <h2>${c.title}</h2>
        ${c.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
        <br clear="all" style="page-break-before:always" />
      `).join('')}
      </body></html>
    `;
    
    // Explicitly creating Blob with BOM for DOC
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    downloadFile(blob, `${sanitizeFileName(book.title)}.doc`, 'application/msword');
  },

  toRTF: (book: Book) => {
    // RTF is 7-bit ASCII-based, so we escape unicode characters manually.
    // BOM is not usually needed for RTF if escaping is correct, but we ensure proper structure.
    const escapeRTF = (text: string) => {
      return text.replace(/[\\{}]/g, (match) => '\\' + match)
                 .replace(/\n/g, '\\par\n')
                 .replace(/[^\x00-\x7F]/g, c => `\\u${c.charCodeAt(0)}?`);
    };

    let rtf = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}\n`;
    rtf += `{\\info{\\title ${escapeRTF(book.title)}}{\\author ${escapeRTF(book.author)}}}\n`;
    rtf += `\\pard\\qc\\sa400\\b\\f0\\fs48 ${escapeRTF(book.title)} \\par\n`;
    rtf += `\\fs32 ${escapeRTF(book.author)} \\b0 \\par\n`;
    rtf += `\\pard\\sa300\\fs24 ${escapeRTF(book.description)} \\par\n`;
    rtf += `\\page\n`;
    
    book.chapters.forEach(c => {
      rtf += `\\pard\\qc\\sa300\\b\\fs36 ${escapeRTF(c.title)} \\b0 \\par\n`;
      rtf += `\\pard\\sa200\\qj\\fs24 ${escapeRTF(c.content)} \\par\n`;
      rtf += `\\page\n`;
    });
    
    rtf += `}`;
    downloadFile(rtf, `${sanitizeFileName(book.title)}.rtf`, 'application/rtf');
  },

  toFB2: (book: Book) => {
    // FictionBook 2.0 Generator
    const stripBase64 = (data: string) => data.split(',')[1] || data;
    const coverId = 'cover.jpg';
    
    let fb2 = `<?xml version="1.0" encoding="UTF-8"?>
    <FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0" xmlns:l="http://www.w3.org/1999/xlink">
      <description>
        <title-info>
          <genre>sf</genre>
          <author><first-name>${book.author}</first-name><last-name></last-name></author>
          <book-title>${book.title}</book-title>
          <annotation><p>${book.description}</p></annotation>
          ${book.coverImage ? `<coverpage><image l:href="#${coverId}"/></coverpage>` : ''}
          <lang>ru</lang>
        </title-info>
        <document-info>
          <author><nickname>BookCraftAI</nickname></author>
          <program-used>BookCraft AI</program-used>
          <date value="${new Date().toISOString().split('T')[0]}">${new Date().getFullYear()}</date>
          <id>${book.id}</id>
          <version>1.0</version>
        </document-info>
      </description>
      <body>
        <title><p>${book.title}</p></title>
        ${book.chapters.map(c => `
        <section>
          <title><p>${c.title}</p></title>
          ${c.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
        </section>`).join('')}
      </body>
      ${book.coverImage ? `<binary id="${coverId}" content-type="image/jpeg">${stripBase64(book.coverImage)}</binary>` : ''}
    </FictionBook>`;
    
    // Explicitly add BOM for FB2 as well
    const blob = new Blob(['\ufeff', fb2], { type: 'text/xml' });
    downloadFile(blob, `${sanitizeFileName(book.title)}.fb2`, 'text/xml');
  },

  printPDF: (book: Book) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = `
      <html>
      <head>
        <title>${book.title}</title>
        <style>
          @media print {
            @page { margin: 2cm; }
            body { font-family: Georgia, serif; line-height: 1.5; color: #000; }
            h1 { text-align: center; font-size: 24pt; margin-bottom: 1cm; }
            .author { text-align: center; font-size: 14pt; margin-bottom: 2cm; font-style: italic; }
            h2 { page-break-before: always; font-size: 18pt; margin-bottom: 0.5cm; }
            p { margin-bottom: 10pt; text-align: justify; }
            img { max-width: 100%; display: block; margin: 0 auto 1cm; max-height: 500px; }
          }
        </style>
      </head>
      <body>
        ${book.coverImage ? `<img src="${book.coverImage}" />` : ''}
        <h1>${book.title}</h1>
        <div class="author">${book.author}</div>
        <p>${book.description}</p>
        ${book.chapters.map(c => `
          <h2>${c.title}</h2>
          ${c.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
        `).join('')}
        <script>
          window.onload = () => {
             window.print();
             setTimeout(() => window.close(), 1000);
          }
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  }
};
