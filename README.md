# plei99.github.io

Patrick Lei's personal site, written as React components and rendered to static
HTML by [Bun Bake](https://bun.com) (`bun build --app`), then deployed to GitHub
Pages. No React reaches the browser: the pages have no client components, so the
output is plain HTML plus the site's own scripts.

## Running it

Bake is experimental and only in Bun's canary builds (developed against
1.4.4-canary.1). Put a canary `bun` first on your `PATH`, since package scripts
call `bun` again, then run `bun install`.

```sh
bun run dev     # build, serve dist/ at http://localhost:3000, rebuild on save
bun run build   # bun build --app, then scripts/finish.ts; writes dist/
bun run check   # dprint check, oxlint, bun check, CJK font coverage
```

## Layout

```
bun.app.ts              Bake config: the built-in React framework
pages/                  One file per route; en/about.html.tsx serves /en/about.html
  seminars/[slug].tsx   One page per Markdown file in content/seminars/
components/
  Base.tsx              <head>, masthead, the figure, footer, the panel dialog
  Figure.tsx            The home page figure: curve, map and target
  views.tsx             Panel bodies, shared between languages
  SubscriptionStudy.tsx The AI subscription comparison on Uses
  Redirect.tsx          Old URLs: /en/, the notes and papers pages
lib/site.ts             Data imports, Markdown, dates, theme pairs, the seminar list
data/
  site.yaml             Name, the page map the figure links to, contact, footer
  ui.yaml               Interface strings for en + zh
  home.yaml             Tagline, bio, About prose, Now list (en + zh)
  themes.yaml           Colour themes: the picker and /themes.css come from this
  uses.yaml             Uses page: gear by category, Markdown asides (en + zh)
  ai_subscriptions.yaml AI subscription comparison and its notes (en + zh)
content/seminars/*.md   Seminar pages, one Markdown file each
public/                 Copied verbatim: styles.css, js/, images/, fonts/ (see fonts/README.md)
scripts/
  finish.ts             After Bake: <html>/<body> attributes, .html URLs, themes.css, sitemap
  serve.ts              The dev server
  subset-*.py           Regenerate the font files; check-cjk-coverage.ts guards the Chinese subset
```

Bake's React shell owns `<html>` and `<body>` and has its own `<title>`, so each
page renders a `<template data-shell>` carrying its language and the attributes
`panel.js` reads, and `scripts/finish.ts` moves them into place.

Content lives in YAML and Markdown, not in templates. To add a seminar, drop a
Markdown file with `title`, `pubDate`, and `description` front matter into
`content/seminars/`.

The AI tools item on Uses has a `study` flag linking it to the subscription
comparison. `ai_subscriptions.yaml` holds its copy, table rows and notes list
(en + zh); `components/SubscriptionStudy.tsx` derives task counts from API value
and AA task cost. `uses.js` adjusts the MiMo and GLM rows live from the timing
coefficients and defaults in that data file, weighting credit consumption before
inverting for capacity. The comparison opens as a second native dialog over the
Uses panel and has its own address, `uses.html#ai-subscriptions`. Without
JavaScript, its `details` element expands inline.

## Languages

The homepage, Now, Travel, and Uses pages are fully bilingual, driven by
`en`/`zh` keys in the data files. Notes and Seminars have translated interface
chrome but English content, since that is the language the content is written
in. The EN/中文 control uses each page's `altUrl` front matter.

## Design

The site is one figure: a stable map f : (C, x1, x2, x3) -> X from a genus 2
curve. The marked points are About me, Seminars and Notes; the map f is Travel;
the three cycles on X, whose classes are the insertions, are arXiv, Now and CV,
each linked from the point f(x_i) where the image f(C) meets it; the letter f is
Uses. Every other page is a panel laid over the figure.

Each page is still built at its own URL, with the figure behind it and its
content inside `<dialog id="panel">`, already open in the static HTML.
`js/panel.js` upgrades that to a modal dialog and turns internal links into
content swaps with `pushState`, so the figure never reloads. Without JavaScript
the labels and the close button are plain links.

The look is a page from the PDF notes: text in TeX Gyre Pagella (a free Palatino
clone) with mathematics in Asana Math, or by a picker in the masthead one of
nine other pairings (Pagella with Euler, Bonum, Schola, Latin Modern,
Libertinus, Garamond, Fira Sans, New CM Sans, Lato), each with its own math
font; code in Iosevka; Chinese in Source Han Serif SC (or Source Han Sans,
Resource Han Rounded or LXGW WenKai, by a picker on the Chinese pages; sans
pairs with sans by default), the figure's outlines in the text colour, and one
accent for whatever can be followed. Inline mathematics is MathML; the figure's
labels are Unicode mathematical italics set in Asana Math.

Colours come from terminal colour schemes, chosen by name from one picker in the
masthead: Modus, Ayu, Solarized, Rosé Pine, Catppuccin, Monokai, Gruvbox, Nord,
Everforest, Dracula, Tokyo Night and One, 32 themes in all. They live in
`data/themes.yaml`, the single source for both the picker and `/themes.css`
(generated by `scripts/finish.ts`). Each theme gives seven roles: paper, text,
muted, ink, link, rule and stage. `styles.css` names no colours. To add a theme,
add an entry to that file.

With nothing chosen the page is Modus Operandi, or Modus Vivendi when the system
is set to dark. `js/theme.js` saves each choice (theme, Latin font, Chinese
font) to `localStorage` and to a cookie of the same name that lasts a year, and
a small inline script in `<head>` applies whichever is present before first
paint. The cookie is only ever read by that script; the site is static.

The previous design ("Open Margins") is kept on the `archive/2026-09-classic`
branch and the `classic-2026-09` tag.

## URLs

The English home page is the site root, `/`; `/en/` redirects to it. The other
routes match the previous generator exactly: `/zh/`, `/papers.html`,
`/notes.html`, `/seminars/`, `/seminars/<slug>/`, `/en/now.html`,
`/zh/now.html`, `/en/travel.html`, `/zh/travel.html`, `/en/uses.html`,
`/zh/uses.html`. On a first visit, `/` sends browsers set to Chinese to `/zh/`.
Chinese variants of Notes and Seminars were added under `/zh/`. There is no
papers page: the arXiv label in the figure goes to the arXiv author page, and
`/papers.html` and `/zh/papers.html` redirect there.
