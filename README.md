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
    site.yaml           Name, navigation, contact links, footer
    ui.yaml             Interface strings for en + zh
    home.yaml           Hero copy, bio, About prose, Now list (en + zh)
    papers.yaml         Paper records
    notes.yaml          Notes catalogue
  _includes/
    layouts/base.vto    Masthead, nav rail, footer, <head>
    layouts/seminar.vto Wrapper for seminar markdown pages
    views/*.vto         Page bodies, shared between languages
  en/, zh/              Per-language pages; each one includes a shared view
  seminars/*.md         Seminar pages, one Markdown file each
  papers.vto, notes.vto Top-level English pages
  styles.css            The whole stylesheet
  js/, images/          Static assets copied verbatim
```

Content lives in YAML and Markdown, not in templates. To add a paper, edit
`src/_data/papers.yaml`; to add a seminar, drop a Markdown file with `title`,
`pubDate`, and `description` front matter into `src/seminars/`.

## Languages

The homepage, Now, and Travel pages are fully bilingual, driven by `en`/`zh`
keys in the data files. Papers, Notes, and Seminars have translated interface
chrome but English content, since that is the language the content is written
in. The EN/中文 control uses each page's `altUrl` front matter.

## Design

The visual design is "Open Margins": a pearl canvas (`#F7F5F1`), soft black, ink
blue, dusty lilac, and muted apricot, with no gradients or shadows. Typography
is Fraunces (display), Source Sans 3 (body), and IBM Plex Mono (dates and
metadata).

## URLs

Routes match the previous generator exactly: `/en/`, `/zh/`, `/papers.html`,
`/notes.html`, `/seminars/`, `/seminars/<slug>/`, `/en/now.html`,
`/zh/now.html`, `/en/travel.html`, `/zh/travel.html`, and a language-detecting
redirect at `/`. Chinese variants of Papers, Notes, and Seminars were added
under `/zh/`.
