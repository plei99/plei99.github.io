# plei99.github.io

Patrick Lei's personal site, built with [Lume](https://lume.land) on Deno and
deployed to GitHub Pages.

## Running it

Requires Deno 2.x (developed against 2.9.5).

```sh
deno task dev     # local server with live reload, http://localhost:3000
deno task build   # write the site to _site/
deno task check   # deno fmt --check, deno lint, deno check
```

## Layout

```
_config.ts              Lume config: plugins, static file copies, table wrapping
src/
  _data.yaml            Site-wide defaults (lang, layout)
  _data/
    site.yaml           Name, the page map the figure links to, contact, footer
    ui.yaml             Interface strings for en + zh
    home.yaml           Tagline, bio, About prose, Now list (en + zh)
    papers.yaml         Paper records
    notes.yaml          Notes catalogue
    uses.yaml           Uses page: gear by category, Markdown asides (en + zh)
  _includes/
    layouts/base.vto    <head>, masthead, the figure, footer, the panel dialog
    layouts/seminar.vto Wrapper for seminar markdown pages
    figure/*.vto        The home page figure: curve, map and target partials
    views/*.vto         Panel bodies, shared between languages
  en/, zh/              Per-language pages; each one includes a shared view
  seminars/*.md         Seminar pages, one Markdown file each
  papers.vto, notes.vto Top-level English pages
  styles.css            The whole stylesheet
  js/panel.js           Opens pages as panels over the figure
  js/, images/          Static assets copied verbatim
```

Content lives in YAML and Markdown, not in templates. To add a paper, edit
`src/_data/papers.yaml`; to add a seminar, drop a Markdown file with `title`,
`pubDate`, and `description` front matter into `src/seminars/`.

## Languages

The homepage, Now, Travel, and Uses pages are fully bilingual, driven by
`en`/`zh` keys in the data files. Papers, Notes, and Seminars have translated
interface chrome but English content, since that is the language the content is
written in. The EN/中文 control uses each page's `altUrl` front matter.

## Design

The site is one figure: a stable map f : (C, x1, x2, x3) -> X from a genus 2
curve. The marked points are About me, Seminars and Notes; the map f is Travel;
the three cycles on X, whose classes are the insertions, are Papers (labelled
arXiv), Now and CV; the label C is Uses. Every other page is a panel laid over
the figure.

Each page is still built at its own URL, with the figure behind it and its
content inside `<dialog id="panel">`, already open in the static HTML.
`js/panel.js` upgrades that to a modal dialog and turns internal links into
content swaps with `pushState`, so the figure never reloads. Without JavaScript
the labels and the close button are plain links.

The look is a page from a paper: white, black text, one blue (`--ink` for the
drawing, `--link` for text links), and one typeface, STIX Two Text. Dark mode
follows the system setting; the Dark/Light button in the masthead saves an
explicit choice to `localStorage` (`js/theme.js`, plus a small inline script in
`<head>` that applies it before first paint). The figure is drawn twice in
`figure/figure.vto`, left to right and top to bottom, because an SVG viewBox
cannot change with a media query.

The previous design ("Open Margins") is kept on the `archive/2026-09-classic`
branch and the `classic-2026-09` tag.

## URLs

Routes match the previous generator exactly: `/en/`, `/zh/`, `/papers.html`,
`/notes.html`, `/seminars/`, `/seminars/<slug>/`, `/en/now.html`,
`/zh/now.html`, `/en/travel.html`, `/zh/travel.html`, `/en/uses.html`,
`/zh/uses.html`, and a language-detecting redirect at `/`. Chinese variants of
Papers, Notes, and Seminars were added under `/zh/`.
