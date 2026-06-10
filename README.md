# MMGenre Benchmark Website

Static GitHub Pages website for **MMGenre: Benchmarking Singing Voice Synthesis across Multiple Musical Genres**, accepted at Interspeech 2026.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish

Create a public GitHub repository named `mmgenre`, push this repository's `main` branch, and enable GitHub Pages from the repository settings.

The GitHub, Hugging Face, and arXiv buttons in `index.html` are intentionally disabled until the public URLs are available.

## Assets

- The two paper figures are stored as web-ready PNG images.
- The site includes only the ten selected GT and VISinger2 examples used by the page.
- The full MMGenre benchmark dataset is not included.
