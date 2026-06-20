# Website Migration Roadmap
# plei99.github.io — Astro → OCaml Static Generator

## Goal

Replace the current unmaintainable Astro/Bento template with a clean, custom
OCaml binary that reads YAML data files and Markdown prose, renders them into
HTML via Jinja-style templates, and outputs a static site deployed to GitHub
Pages. The new site supports English and Chinese on the homepage.

## Architecture Overview

```
repo root
├── bin/
│   └── main.ml          # OCaml generator entry point
├── lib/
│   ├── page.ml          # Page type definitions and rendering dispatch
│   ├── template.ml      # HTML template engine wrapper
│   ├── i18n.ml          # Language routing helpers
│   └── markdown.ml      # Markdown → HTML (via cmark)
├── data/
│   ├── site.yaml        # Global: name, nav structure, footer, contact
│   ├── home.yaml        # Bio (en+zh), now items (en+zh)
│   ├── papers.yaml      # Paper records
│   ├── notes.yaml       # Notes catalogue (36 entries)
│   └── seminars/
│       ├── index.yaml   # Seminar list metadata
│       ├── seminar-1.md # Individual seminar prose page
│       └── seminar-2.md
├── templates/
│   ├── base.html        # <html>, <head>, sidebar, wrapper
│   ├── home.html        # Homepage layout (bio, papers snippet, now)
│   ├── papers.html      # Papers list with cards
│   ├── notes.html       # Notes catalogue grid
│   ├── seminar-index.html
│   ├── seminar-page.html
│   └── now.html
├── static/
│   ├── css/
│   │   └── main.css     # All site CSS (hand-written, scoped by page class)
│   ├── js/
│   │   └── globe.js     # Standalone D3 globe (no framework)
│   └── fonts/           # Self-hosted web fonts (optional)
├── public/              # Build output (gitignored, deployed by CI)
├── dune-project
├── dune
└── .github/
    └── workflows/
        └── deploy.yml   # Build OCaml binary → run it → deploy public/
```

## OCaml Library Choices

| Need | Library | Why |
|------|---------|-----|
| YAML parsing | `yaml` (ocaml-yaml) | Binds to libYAML, well-maintained, straightforward |
| HTML templating | `jingoo` | Jinja2-compatible syntax, pure OCaml, no external deps |
| Markdown → HTML | `cmark` (ocaml-cmark) | Binds to libcmark (CommonMark reference impl), fast, stable |
| File I/O / paths | `fpath` + stdlib | Lightweight path handling |
| Build | `dune` | Standard OCaml build system |

All of these are available via `opam`. The GitHub Actions workflow installs
opam, pins the packages, builds the binary, runs it, then deploys `public/`.

---

## Migration Phases

---

### Phase 0: Repository Cleanup

**Goal:** Strip the current Astro codebase out of the repo, leaving only
content assets worth preserving. Do this in a single commit so git history
stays clean.

**Steps:**
1. Delete everything except `.github/`, `favicon.ico`, and `README.md`
2. Update `.gitignore` to ignore `public/` and `_opam/` (local opam switch)
3. Update `README.md` with a brief description of the new architecture
4. Commit: `chore: strip Astro template, start fresh`

**Note:** The globe component (`Globe.tsx`) uses D3 directly — we will rewrite
it as a standalone `globe.js` in Phase 4, referencing the same visited-country
list. No content is lost.

---

### Phase 1: OCaml Project Skeleton

**Goal:** A working `dune` project that builds a binary and outputs a single
`public/index.html`. No real content yet — just proof that the toolchain works
end-to-end locally.

**Steps:**
1. Install opam locally if not present (`brew install opam` on macOS)
2. Create a local opam switch: `opam switch create . ocaml.5.2.0`
3. Install dependencies: `opam install yaml jingoo cmark fpath`
4. Write `dune-project` (lang dune 3.x)
5. Write minimal `bin/main.ml`: read one YAML file, render one template,
   write `public/index.html`
6. Write `templates/base.html` with the design tokens from the mockup
   (EB Garamond, Cormorant, Barlow Condensed, sidebar layout, card)
7. Confirm `dune exec bin/main.exe` produces valid HTML
8. Open `public/index.html` in a browser and verify the design renders

**Deliverable:** `dune exec bin/main.exe` works locally and produces a
correctly styled (but empty) homepage.

---

### Phase 2: Data Schema and Homepage

**Goal:** Define all YAML schemas and render a complete bilingual homepage.

**Steps:**

1. **`data/site.yaml`** — global data used on every page:
   ```yaml
   name: Patrick Lei
   nav:
     - section:
         en: Research
         zh: 研究
       links:
         - label: { en: Papers, zh: 论文 }
           href: /papers.html
         - label: { en: Notes, zh: 笔记 }
           href: /notes.html
         - label: { en: Seminars, zh: 研讨班 }
           href: /seminars/
     - section:
         en: About
         zh: 关于
       links:
         - label: { en: CV, zh: 简历 }
           href: https://github.com/plei99/cv/releases/latest/download/Patrick_Lei_CV.pdf
         - label: { en: Now, zh: 最近 }
           href: /now.html
   contact:
     email: patrick.lei@bc.edu
     github: https://github.com/plei99
     arxiv: https://arxiv.org/a/0000-0003-1977-1596
   footer:
     copyright: "© 2026 Patrick Lei"
     links:
       - label: Source
         href: https://github.com/plei99/plei99.github.io
   ```

2. **`data/home.yaml`** — homepage-specific content:
   ```yaml
   bio:
     en: |
       I am a Visiting Assistant Professor (postdoc) in mathematics at
       Boston College, mentored by Qile Chen. Previously I completed my
       PhD at Columbia University, advised by Melissa Liu. My research
       is in algebraic geometry, particularly higher-genus Gromov-Witten theory.
     zh: |
       我目前在波士顿学院担任数学方向的访问助理教授（博士后），导师是陈琪乐。
       此前我在哥伦比亚大学完成了博士学位，导师是刘秋菊。
       我的研究方向是代数几何，尤其是高亏格 Gromov-Witten 理论。
   now:
     en:
       - "K-theory, allegedly"
       - "Am I a good moduli space?"
       - "Teaching multivariable calculus"
       - "broke 3 on the first try"
     zh:
       - "K-理论（据说）"
       - "我到底是不是一个好模空间？"
       - "在教多元微积分"
       - "首马破三"
   ```

3. Implement `i18n.ml`: a module that takes a locale (`en` | `zh`) and a
   YAML node with `en`/`zh` subkeys and returns the correct string.

4. Implement `template.ml`: wrap Jingoo so templates receive a flat string
   dict built from the YAML data + locale.

5. Render `/en/index.html` and `/zh/index.html` from `home.yaml` +
   `site.yaml` using `templates/home.html`.

6. Implement the language switcher in `base.html`: a toggle that links
   `/en/…` ↔ `/zh/…` for pages that have both versions, and is hidden
   for English-only pages.

7. Redirect `index.html` → `/en/index.html` (either a meta-refresh or a
   tiny JS redirect, based on `navigator.language`).

**Deliverable:** `public/en/index.html` and `public/zh/index.html` render
correctly with the mockup design and real bio content.

---

### Phase 3: Notes and Papers Pages

**Goal:** Render the notes catalogue and papers list from YAML.

**Steps:**

1. **`data/notes.yaml`** — migrate all 36 entries from `Works.astro`:
   ```yaml
   - name: Good moduli spaces, positivity, and rationality
     description: >
       When does an Artin stack admit a "reasonable" moduli space and when
       does this moduli space have nice properties?
     date: Spring 2026
     place: Boston College
     url: https://github.com/plei99/notes/raw/master/BC/moduli/moduli.pdf

   - name: Geometric rep theory and universal centralizers
     ...
   ```

2. **`data/papers.yaml`** — 3 entries:
   ```yaml
   - title: >
       Higher genus Gromov-Witten theory of one-parameter Calabi-Yau
       threefolds II: Feynman rule and anomaly equations
     date: 2024-12-09
     arxiv: "2412.06527"
     categories: [math.AG]
     pages: 37

   - title: >
       Higher-genus Gromov-Witten theory of one-parameter Calabi-Yau
       threefolds I: Polynomiality
     date: 2024-09-17
     arxiv: "2409.11659"
     categories: [math.AG, math-ph]
     pages: 49

   - title: >
       MSP theory for smooth Calabi-Yau threefolds in weighted P^4
     date: 2024-09-17
     arxiv: "2409.11660"
     categories: [math.AG, math-ph]
   ```

3. Implement page-type dispatch in `page.ml`: a variant type
   `page = Home of locale | Notes | Papers | SeminarIndex | SeminarPage of string | Now of locale`
   and a `render : page -> unit` function.

4. Render `public/notes.html` from `notes.yaml` using `templates/notes.html`
   (2-column card grid matching the mockup).

5. Render `public/papers.html` from `papers.yaml` using `templates/papers.html`
   (cards with title, date, arXiv link, abstract link, PDF link, category tags).

**Deliverable:** Both pages render with real data and correct styling.

---

### Phase 4: Globe, Now Page, and Seminars

**Goal:** Port the globe widget, render the now page, and build the seminars
section.

**Steps:**

1. **Globe (`static/js/globe.js`):**
   Rewrite `Globe.tsx` as a ~80-line vanilla JS file. It uses D3 from a CDN
   script tag (no bundler). The logic is identical to the current SolidJS
   version — `d3.geoOrthographic`, auto-rotation timer, country highlighting.
   The visited-country list is hardcoded in the JS file (easy to update).
   Embed it in a `<div id="globe-container">` on a dedicated `/travel.html`.
   On the homepage, link to `/travel.html` rather than embedding the globe
   inline (matching the current site's popup-style link).

2. **Now page:**
   `data/home.yaml` already contains the now items (defined in Phase 2).
   Render `public/en/now.html` and `public/zh/now.html` from that data using
   `templates/now.html`. The now page includes the nownownow.com explanation
   link (https://sive.rs/now) matching the current site.

3. **`data/seminars/index.yaml`** — seminar list (migrate from blog content
   collection in current repo):
   ```yaml
   - title: BC Algebraic Geometry Seminar, Spring 2026
     date: Spring 2026
     url: https://sites.google.com/bc.edu/bcags-spring2026/home
     slug: bcags-spring2026
     description: >
       The algebraic geometry seminar at Boston College, Spring 2026.
   ```

4. Write individual seminar Markdown files in `data/seminars/`:
   ```
   data/seminars/bcags-spring2026.md
   ```
   with YAML frontmatter (title, date, external URL) and Markdown body
   (schedule, speakers, abstracts etc).

5. Implement `markdown.ml`: call `cmark` to convert Markdown → HTML string,
   then inject into `templates/seminar-page.html`.

6. Render `public/seminars/index.html` and
   `public/seminars/<slug>/index.html` for each seminar.

**Deliverable:** All pages render. The site is feature-complete locally.

---

### Phase 5: CSS Polish and Design Finalization

**Goal:** Hand the `static/css/main.css` and `templates/` to Claude Code or
Codex for design refinement against the mockup. This phase is intentionally
kept separate from the generator work so that CSS iteration does not touch
OCaml code.

**Steps:**
1. Run the generator and open the site in a browser
2. Ask Claude Code: *"Refine the CSS in `static/css/main.css` to match this
   mockup [screenshot]. Use standard CSS only, no utility classes."*
3. Iterate until satisfied
4. Add dark mode: a `prefers-color-scheme: dark` media query block in
   `main.css` defining a dark token set. No JS required.
5. Ensure the sidebar and card layout are responsive down to ~768px (collapse
   sidebar to top nav on mobile)

---

### Phase 6: GitHub Actions — Replace Astro Workflow

**Goal:** Replace the `withastro/action` CI workflow with one that installs
OCaml, builds the binary, runs it, and deploys `public/`.

**New `.github/workflows/deploy.yml`:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up OCaml
        uses: ocaml/setup-ocaml@v3
        with:
          ocaml-compiler: 5.2.x

      - name: Install dependencies
        run: opam install --deps-only .

      - name: Build generator
        run: opam exec -- dune build

      - name: Run generator
        run: opam exec -- dune exec bin/main.exe

      - name: Copy static assets
        run: cp -r static/* public/

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Note:** The `setup-ocaml` action caches the opam switch between runs, so
CI build time after the first run is typically under 2 minutes.

---

### Phase 7: Chinese Homepage Verification and Cutover

**Goal:** Final check, domain cutover, retire the livetex subdomain.

**Steps:**
1. Verify `/en/index.html` and `/zh/index.html` both render correctly
2. Check language switcher links are correct on every page
3. Check all 36 PDF links in `notes.html` resolve (curl check in CI)
4. Check all 3 arXiv links in `papers.html` resolve
5. Push to `master` — CI deploys automatically
6. Update the `plei99.github.io/livetex` link in the notes page to point to
   `/notes.html` instead (the livetex repo can be archived)
7. Smoke test the live site

---

## Summary Timeline

| Phase | Work | Estimate |
|-------|------|----------|
| 0 | Repo cleanup | 15 min |
| 1 | OCaml skeleton + design shell | 2–3 hrs |
| 2 | Data schemas + bilingual homepage | 2–3 hrs |
| 3 | Notes + papers pages | 1–2 hrs |
| 4 | Globe + now + seminars | 2–3 hrs |
| 5 | CSS polish (AI-assisted) | 1–2 hrs |
| 6 | CI workflow | 30 min |
| 7 | Cutover + verification | 30 min |

Total: approximately **10–14 hours** of focused work, spreadable across
sessions with a working site at the end of each phase.

---

## Key Decisions Recorded

- **Generator language:** OCaml with Dune
- **Templating:** Jingoo (Jinja2-compatible, pure OCaml)
- **Markdown:** ocaml-cmark (CommonMark, binds to libcmark)
- **YAML:** ocaml-yaml (binds to libYAML)
- **CSS approach:** Hand-written standard CSS, no utility classes, AI-assisted
- **Fonts:** EB Garamond (body), Cormorant Garamond (display), Barlow
  Condensed (UI) — loaded from Google Fonts
- **i18n scope:** English + Chinese on homepage and now page only; all other
  content is English-only
- **Papers source:** Hand-maintained `papers.yaml` (3 entries); no live feed
- **Notes source:** Hand-maintained `notes.yaml` migrated from `Works.astro`
- **Globe:** Rewritten as vanilla D3 JS, no framework
- **Hosting:** GitHub Pages via `actions/deploy-pages`
- **Branch:** `master` (matches current repo)
