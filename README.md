# laila sorabji — portfolio site

A lightweight static website for Laila Sorabji (El Sorab), featuring:

- Landing page with video background and artwork submenu
- Artwork pages: Tattoos, Photography, Moving Image, Circle Workshop
- About page with bio in a circular overlay

## Structure

- index.html — landing page and navigation
- about.html — about overlay with background video
- artwork/ — section pages (tattoos.html, photography.html, movingImage.html, circleWorkshop.html)
- assets/ — images and videos
- css/ — styles.css (global), artwork.css (section layouts)
- js/ — main.js (submenu interactivity)

## Local preview

Open index.html directly in a browser, or run a tiny static server:

```bash
# Using Python 3
python -m http.server 8000
# Then visit http://localhost:8000/
```

## Git

Initialize and commit:

```bash
git init
git add .
git commit -m "Initial commit: site"
```

## Notes

- Images/videos are treated as binary in .gitattributes.
- Meta descriptions and hidden H1s added for basic SEO.
- Accessibility: uses visually-hidden utility where needed.
"# elsorab"  git init git add README.md git commit -m "first commit" git branch -M main git remote add origin https://github.com/pajja/elsorab.git git push -u origin main
