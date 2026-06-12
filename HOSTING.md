# Free hosting setup for ReadRise

## Recommended simple setup

Use GitHub Pages for the web app and store PDFs in the same repository under `books/`.

Folder layout:

```text
readrise/
  index.html
  styles.css
  app.js
  books/
    books.json
    frog-and-rain.pdf
    space-trip.pdf
```

Then turn on GitHub Pages:

1. Create a public GitHub repository, for example `readrise`.
2. Upload the files above.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Save.
7. Your app will be at `https://YOUR-GITHUB-USERNAME.github.io/readrise/`.

## Adding books later

1. Upload the PDF into the `books/` folder.
2. Edit `books/books.json`.
3. Add an entry like this:

```json
{
  "id": "frog-and-rain",
  "title": "Frog and the Rain",
  "author": "Teacher-created",
  "level": "emerging",
  "tags": ["animals", "weather"],
  "summary": "A simple picture book about a frog in the rain.",
  "pdf": "frog-and-rain.pdf",
  "questions": []
}
```

Reload the app. It will automatically read the catalog from `books/books.json`.

## When PDFs are too large

GitHub repositories warn above 50 MiB per file and block files above 100 MiB. GitHub Pages sites also have a published-site size limit. For larger PDF libraries, use GitHub Releases or another free file host, then put the public PDF URL in `books.json` as `pdfUrl`.

Example:

```json
{
  "id": "large-picture-book",
  "title": "Large Picture Book",
  "author": "Licensed source",
  "level": "building",
  "pdfUrl": "https://example.com/large-picture-book.pdf",
  "tags": ["hosted", "picture-book"]
}
```

## Important legal note

Do not upload copyrighted commercial children's books unless you have the right to host them. Safer sources are your own books, teacher-created books, public-domain books, or openly licensed books.
