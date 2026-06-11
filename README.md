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
