# Alpine Tailwind Vite Template

> A lightweight, opinionated starter for building fast frontends with **Vite**, **Tailwind CSS**, and **Alpine.js**.

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-8.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Alpine.js](https://img.shields.io/badge/Alpine-3.15+-77C1D2?logo=alpinedotjs&logoColor=white)](https://alpinejs.dev)

</div>

## 🚀 Quick Start

### 1. Use this template
Click the **Use this template** button on GitHub to create a new repository from this starter.

### 2. Clone & install
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
```

### 3. Develop locally
```bash
npm run dev
```
Opens on `http://localhost:5173` with hot reload enabled.

### 4. Build & deploy
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Then in your GitHub repository **Settings** → **Pages**, set the source to the `gh-pages` branch.

---

## ✨ Features

- **Vite** for lightning-fast development and optimized production builds
- **Tailwind CSS v4** with semantic theme tokens and first-class color utilities
- **Alpine.js** for lightweight, focused UI interactions without framework overhead
- **GitHub Pages ready** with `gh-pages` deployment built-in
- **Clean separation**: HTML templates in `.html`, component logic in `.js`, styling in `.css`
- **Sensible defaults** for Git, accessibility, and responsive design
- **No CI or tests** — keep it simple, add complexity as needed

---

## 📁 Project structure

```
├── index.html              # Main entry point with app markup
├── src/
│   ├── main.js            # Alpine.js components and logic
│   └── styles/
│       └── main.css       # Tailwind, base styles, theme tokens, components
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

---

## 🎨 Customization

### Update the counter component
Edit the markup in [`index.html`](./index.html) and the logic in [`src/main.js`](./src/main.js).

### Theme tokens & design system
Adjust color, typography, and spacing in [`src/styles/main.css`](./src/styles/main.css) using Tailwind's `@theme` directive:

```css
@theme inline {
  --color-primary: #0f172a;
  --color-background: #f8fafc;
  /* ... */
}
```

Then use them as semantic utilities:
```html
<button class="bg-primary text-primary-foreground">Click me</button>
```

---

## 🔧 Available scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and publish to GitHub Pages |

---

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

---

## 🎯 Next steps

1. Delete or modify the example counter in `index.html` and `src/main.js`
2. Update the site title, description, and metadata
3. Add your brand colors and tokens to `src/styles/main.css`
4. Build your app, then deploy with `npm run deploy`

**Happy building!** 🎉
