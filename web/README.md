# ENTROPY — Project Website

Marketing / documentation landing page for the **Entropy Fingerprint Blockchain**
ransomware-detection lab. It is a static front end and is completely separate
from the Python lab services — it does not import or run any detection code.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 via the `@tailwindcss/vite` plugin (`@import "tailwindcss";` in `src/index.css`)
- `framer-motion` for mount and scroll animations
- Typography is set inline via the `style` prop; Google Fonts are loaded in `index.html`

## Run

```bash
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into web/dist
npm run preview
```

The dev server binds `0.0.0.0` and proxies `/api/*` to the Flask SOC dashboard on
`http://127.0.0.1:5000`, so you can run `python app.py` alongside it and wire live
stats into the page later.

## Structure

| File | Purpose |
| --- | --- |
| `src/components/Navbar.tsx` | Fixed transparent nav, entropy-wave logo, "Open Dashboard" pill |
| `src/components/Hero.tsx` | Full-viewport hero, bottom/left-anchored copy, scanline + glow overlays |
| `src/components/Pipeline.tsx` | The five detection stages: watch → measure → decide → respond → record |
| `src/components/Components.tsx` | The lab processes and the command that starts each one |
| `src/components/Ledger.tsx` | Evidence layer: mocked `/api/events` table and ledger notes |
| `src/components/Quickstart.tsx` | Setup script plus the safety-boundary warning |
| `public/hero.jpg` | Hero background image |

The sample rows in `Ledger.tsx` are illustrative static data, not live output.
