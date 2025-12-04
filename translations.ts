
export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    landing: {
      badge: "Версия 2.0 уже доступна",
      title: "Создавайте бестселлеры с",
      titleHighlight: "Искусственным Интеллектом",
      subtitle: "Профессиональная студия для писателей. Забудьте о рутине, форматировании и творческих кризисах. Сосредоточьтесь на сюжете, а остальное сделает BookCraft.",
      start: "Начать бесплатно",
      learnMore: "Как это работает?",
      demoTitle: "Напиши свою историю",
      demoAuthor: "ИИ-Соавтор",
      features: {
        title: "Всё, что нужно писателю",
        subtitle: "Мощный набор инструментов в одном приложении",
        structure: "Умная структура",
        structureDesc: "Генерация оглавления, прологов и эпилогов за секунды на основе вашей идеи.",
        writing: "ИИ-Редактор",
        writingDesc: "Улучшение стиля, продолжение текста, исправление ошибок и поиск синонимов.",
        export: "Экспорт в 1 клик",
        exportDesc: "Скачивайте книги в PDF, FB2, EPUB, DOCX и HTML. Готово к публикации.",
        cloud: "Автосохранение",
        cloudDesc: "Ваш прогресс сохраняется локально и не пропадет при закрытии браузера.",
        cover: "Генерация обложек",
        coverDesc: "Создавайте уникальные обложки в любом стиле: от киберпанка до акварели.",
        focus: "Режим фокуса",
        focusDesc: "Минималистичный интерфейс, чтобы ничто не отвлекало от творчества."
      },
      steps: {
        title: "От идеи до книги за 4 шага",
        step1: "Идея",
        step1Desc: "Опишите замысел книги в пару строк.",
        step2: "Структура",
        step2Desc: "ИИ создаст план глав и персонажей.",
        step3: "Написание",
        step3Desc: "Пишите сами или позвольте ИИ продолжить мысль.",
        step4: "Публикация",
        step4Desc: "Экспортируйте готовую книгу и делитесь с миром."
      },
      testimonials: {
        title: "Писатели выбирают нас",
        t1: "С BookCraft я закончил свой роман за месяц, хотя мучился с ним полгода. Функция структуры — это магия!",
        a1: "Алексей В.",
        r1: "Фантаст",
        t2: "Наконец-то экспорт в FB2 работает идеально. Мои читатели довольны, а я не трачу время на верстку.",
        a2: "Мария С.",
        r2: "Блогер",
        t3: "ИИ не пишет за меня, он вдохновляет. Когда я застреваю, кнопка 'Продолжить' спасает день.",
        a3: "Дмитрий К.",
        r3: "Копирайтер"
      },
      cta: {
        title: "Готовы написать свой шедевр?",
        subtitle: "Присоединяйтесь к тысячам авторов, которые уже используют технологии будущего.",
        btn: "Открыть конструктор"
      },
      stats: {
        books: "Книг создано",
        writers: "Писателей",
        words: "Слов написано"
      },
      footer: "© 2024 BookCraft AI. Все права защищены."
    },
    dashboard: {
      title: "BookCraft AI",
      subtitle: "Ваша личная студия",
      emptyTitle: "Здесь пока пусто",
      emptyDesc: "Создайте свою первую книгу или импортируйте существующий проект!",
      createFirst: "Создать книгу сейчас",
      newBook: "Новая книга",
      importBook: "Импорт проекта",
      chapters: "глав",
      deleteConfirm: "Вы уверены, что хотите удалить эту книгу?",
      backup: "Скачать файл проекта",
      importError: "Ошибка при чтении файла. Убедитесь, что это корректный JSON файл BookCraft."
    },
    editor: {
      structure: "Структура книги",
      outline: "Оглавление",
      uploadCover: "Загрузить обложку",
      upload: "Загрузить",
      aiGen: "ИИ-Арт",
      aiCoverPrompt: "Опишите стиль обложки (например: 'Киберпанк, неон, минимализм'):",
      change: "Изменить",
      bookTitlePlaceholder: "Название книги",
      authorPlaceholder: "Автор",
      addChapter: "Добавить главу",
      aiHelper: "ИИ Помощник",
      genOutline: "Сгенерировать структуру",
      preview: "Обзор",
      export: "Экспорт",
      chapterTitlePlaceholder: "Название главы",
      contentPlaceholder: "Начните писать вашу историю здесь...",
      selectChapter: "Выберите главу или создайте новую",
      chapter: "Глава",
      alertTitle: "Пожалуйста, дайте название книге перед генерацией структуры.",
      alertError: "Ошибка при выполнении операции.",
      confirmDeleteChapter: "Удалить этот раздел?",
      confirmImprove: "Это перепишет текст для улучшения стиля. Продолжить?",
      toolContinue: "Продолжить текст",
      toolImprove: "Улучшить стиль",
      notes: "Заметки",
      notesPlaceholder: "Идеи, персонажи, сюжетные линии...",
      notesAutoSaved: "Автосохранение включено",
      stats: {
        words: "слов",
        chars: "знаков",
        pages: "стр."
      },
      types: {
        prologue: "Пролог",
        epilogue: "Эпилог",
        annotation: "Аннотация"
      }
    },
    preview: {
      title3d: "3D Обложка",
      read: "Читать",
      noDesc: "Описание отсутствует...",
      noContent: "В этой главе пока нет текста...",
      prev: "Предыдущая",
      next: "Следующая",
      chapter: "Глава"
    },
    export: {
      title: "Экспорт книги",
      desc: "Выберите формат для скачивания.",
      catEbook: "Электронные книги",
      catDoc: "Документы",
      catWeb: "Web форматы",
      catDev: "Для разработчиков",
      note: "Для Kindle и старых ридеров рекомендуем использовать формат FB2 с последующей конвертацией, либо DOC.",
      cancel: "Закрыть"
    }
  },
  en: {
    landing: {
      badge: "Version 2.0 is now live",
      title: "Create Best-Sellers with",
      titleHighlight: "Artificial Intelligence",
      subtitle: "Professional studio for writers. Forget about routine, formatting, and writer's block. Focus on the plot, and BookCraft handles the rest.",
      start: "Start for Free",
      learnMore: "How it works?",
      demoTitle: "Write Your Story",
      demoAuthor: "AI Co-Author",
      features: {
        title: "Everything a Writer Needs",
        subtitle: "A powerful toolkit in one app",
        structure: "Smart Structure",
        structureDesc: "Generate table of contents, prologues, and epilogues in seconds based on your idea.",
        writing: "AI Editor",
        writingDesc: "Style improvement, text continuation, grammar fixes, and synonym suggestions.",
        export: "1-Click Export",
        exportDesc: "Download books in PDF, FB2, EPUB, DOCX, and HTML. Ready for publishing.",
        cloud: "Auto-Save",
        cloudDesc: "Your progress is saved locally and won't be lost when you close the browser.",
        cover: "Cover Gen",
        coverDesc: "Create unique book covers in any style: from cyberpunk to watercolor.",
        focus: "Focus Mode",
        focusDesc: "Minimalist interface so nothing distracts you from creativity."
      },
      steps: {
        title: "From Idea to Book in 4 Steps",
        step1: "Idea",
        step1Desc: "Describe your book concept in a few lines.",
        step2: "Structure",
        step2Desc: "AI creates a plan of chapters and characters.",
        step3: "Writing",
        step3Desc: "Write yourself or let AI continue your thought.",
        step4: "Publishing",
        step4Desc: "Export the finished book and share with the world."
      },
      testimonials: {
        title: "Writers Choose Us",
        t1: "With BookCraft, I finished my novel in a month, though I struggled with it for six months. The structure feature is magic!",
        a1: "Alex V.",
        r1: "Sci-Fi Author",
        t2: "Finally, FB2 export works perfectly. My readers are happy, and I don't waste time formatting.",
        a2: "Maria S.",
        r2: "Blogger",
        t3: "AI doesn't write for me, it inspires me. When I get stuck, the 'Continue' button saves the day.",
        a3: "Dmitry K.",
        r3: "Copywriter"
      },
      cta: {
        title: "Ready to write your masterpiece?",
        subtitle: "Join thousands of authors who are already using future technologies.",
        btn: "Open Builder"
      },
      stats: {
        books: "Books Created",
        writers: "Writers",
        words: "Words Written"
      },
      footer: "© 2024 BookCraft AI. All rights reserved."
    },
    dashboard: {
      title: "BookCraft AI",
      subtitle: "Your personal studio",
      emptyTitle: "It's empty here",
      emptyDesc: "Create your first book or import an existing project!",
      createFirst: "Create book now",
      newBook: "New Book",
      importBook: "Import Project",
      chapters: "chapters",
      deleteConfirm: "Are you sure you want to delete this book?",
      backup: "Download Project File",
      importError: "Error reading file. Please ensure it is a valid BookCraft JSON file."
    },
    editor: {
      structure: "Structure",
      outline: "Table of Contents",
      uploadCover: "Upload Cover",
      upload: "Upload",
      aiGen: "AI Art",
      aiCoverPrompt: "Describe cover style (e.g. 'Cyberpunk, neon, minimal'):",
      change: "Change",
      bookTitlePlaceholder: "Book Title",
      authorPlaceholder: "Author",
      addChapter: "Add Chapter",
      aiHelper: "AI Assistant",
      genOutline: "Generate Structure",
      preview: "Preview",
      export: "Export",
      chapterTitlePlaceholder: "Chapter Title",
      contentPlaceholder: "Start writing your story here...",
      selectChapter: "Select a chapter or create a new one",
      chapter: "Chapter",
      alertTitle: "Please title the book before generating structure.",
      alertError: "Error performing operation.",
      confirmDeleteChapter: "Delete this section?",
      confirmImprove: "This will rewrite text to improve style. Continue?",
      toolContinue: "Continue writing",
      toolImprove: "Improve style",
      notes: "Notes",
      notesPlaceholder: "Ideas, characters, plot lines...",
      notesAutoSaved: "Autosaved",
      stats: {
        words: "words",
        chars: "chars",
        pages: "pgs"
      },
      types: {
        prologue: "Prologue",
        epilogue: "Epilogue",
        annotation: "Annotation"
      }
    },
    preview: {
      title3d: "3D Cover",
      read: "Read",
      noDesc: "No description...",
      noContent: "No text in this chapter yet...",
      prev: "Previous",
      next: "Next",
      chapter: "Chapter"
    },
    export: {
      title: "Export Book",
      desc: "Choose a format to download.",
      catEbook: "E-Books",
      catDoc: "Documents",
      catWeb: "Web Formats",
      catDev: "For Developers",
      note: "For Kindle and older readers, we recommend using FB2 (via converter) or DOC.",
      cancel: "Close"
    }
  }
};
