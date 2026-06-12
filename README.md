# ReadRise Literacy Lab

ReadRise is a static, mobile-friendly web app designed to help children read at different levels, practice comprehension, build vocabulary, and track literacy growth.

## What it includes

- Leveled reading library: Emerging K–1, Building 2–3, Confident 4–5, Advanced 6–8
- Book/passage importer with estimated reading level using a Flesch-Kincaid-style readability calculation
- Interactive reader with page navigation, text size controls, focus mode, syllable hints, and read-aloud support
- Tap-to-define word lookup with sentence context and local fallback definitions
- Practice modules:
  - Comprehension quiz
  - Vocabulary in context
  - Cloze sentence
  - Sentence order
  - Phonics warm-up
  - Fluency timer with WPM tracking
- Progress dashboard:
  - Total reading minutes
  - Words read
  - Average quiz score
  - Best WPM
  - Word bank
  - Recent activity log
- Parent/teacher controls with local export/import

## How to use

Open `index.html` in a browser. No backend, build step, login, or paid API is required.

For GitHub Pages:

1. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to a repository.
2. Go to repository Settings → Pages.
3. Deploy from the main branch/root folder.

## Privacy

The app stores progress in browser localStorage on the device. It does not require an account. The dictionary lookup attempts to use the free dictionaryapi.dev endpoint when internet is available, then falls back to local definitions and context clues.

## Important note

The included reading levels and generated activities are educational supports, not a diagnostic reading assessment. For formal reading concerns, dyslexia evaluation, IEP/504 planning, or grade-level placement, use validated assessments with a qualified educator or reading specialist.


## PDF book reader upgrade

This version supports importing PDF books from the Add book / PDF dialog.

How it works:

1. Choose **Add book / PDF**.
2. Set **Import type** to **Upload PDF book**.
3. Add a title, choose a `.pdf`, and save.
4. Open the book in the Reader.
5. The PDF page is rendered visually, and any embedded PDF text is extracted below the page as tappable words.
6. Tap a word in the extracted text to get a definition using the surrounding sentence as context.
7. For image-only picture books, tap **OCR page text**. The app uses browser OCR to extract the visible page words, then makes those words tappable for contextual definitions.

Important notes:

- PDFs are stored locally in the browser using IndexedDB. Reader data and extracted page text are stored locally.
- PDF.js and Tesseract.js are loaded from public CDNs, so PDF rendering/OCR needs internet access unless those libraries are bundled locally.
- Text-based PDFs work best. OCR quality depends on image clarity, font size, contrast, and page angle.
- Because this is a static browser app, large PDF files may use significant local browser storage.

## Hosted PDF book library

This version supports a shared hosted book library. Instead of storing every PDF only in the browser, you can host PDFs on GitHub Pages or another public file host and load them through `books/books.json`.

Included files:

- `books/books.json` — sample hosted catalog
- `books/README.md` — book catalog instructions
- `HOSTING.md` — GitHub Pages setup guide

The app reads `books/books.json` on startup. Each catalog entry can use either:

```json
"pdf": "frog-and-rain.pdf"
```

for a PDF inside the same `books/` folder, or:

```json
"pdfUrl": "https://example.com/frog-and-rain.pdf"
```

for a fully hosted public PDF URL.

For image-only picture books, the app still renders the PDF page visually and can use OCR to create tappable words for definitions.
