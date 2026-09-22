# Fonts

All four families are served from this site, so pages make no third-party
requests.

## TeX Gyre Pagella (text)

A free Palatino clone by B. Jackowski, J. M. Nowacki and others for the TeX
users groups, version 2.501, from <https://ctan.org/pkg/tex-gyre-pagella>.
Licence: GUST Font License, in `GUST-FONT-LICENSE.txt`, which is the LaTeX
Project Public License 1.3c plus a request, not a requirement, that derived
works be renamed.

The four `tex-gyre-pagella-*.woff2` files here are **modified**: they are the
official OpenType files converted to WOFF2 and subsetted to Latin, Latin
Extended, punctuation and common symbols, with every OpenType layout feature
kept. No outline was altered. The unmodified fonts are at the address above.

## Asana Math (mathematics)

By Apostolos Syropoulos, version 000.962, from
<https://ctan.org/pkg/asana-math>. Licence: SIL Open Font License 1.1, in
`OFL-Asana-Math.txt`, with the Reserved Font Name "Asana Math".

`asana-math.woff2` is the complete, unmodified font in WOFF2 form. It is not
subsetted, because a subset would be a modified version and could not keep the
reserved name.

## Source Han Serif SC (Chinese)

By Adobe and Google (the Noto Serif CJK build), from
<https://github.com/notofonts/noto-cjk>, `Serif/SubsetOTF/SC/`. Licence: SIL
Open Font License 1.1, in `OFL-Source-Han-Serif.txt`, with the Reserved Font
Name "Source Han Serif".

The two `source-han-serif-sc-*.woff2` files are **subsets**: the full font is 12
MB a weight, and these contain only the characters the site's content uses plus
CJK punctuation (`cjk-coverage.txt` lists them). Because the OFL reserves the
name, the family is used here under its original name only as a `@font-face`
alias in `fonts.css`; the files themselves are subsets and not the original
font. Regenerate them with `scripts/subset-cjk.py` when Chinese content adds new
characters; `deno task check` fails if that has been forgotten.

## LXGW WenKai (Chinese, by choice)

By LXGW, version 1.522, derived from Fontworks' Klee, from
<https://github.com/lxgw/LxgwWenKai>. Licence: SIL Open Font License 1.1, in
`OFL-LXGW-WenKai.txt`. Its reserved names come with an additional permission
that expressly allows subsets converted to WOFF2 for web delivery to keep the
name, which `lxgw-wenkai-regular.woff2` relies on. It is cut by the same script
and to the same characters as Source Han Serif. Only a Regular weight is
released, so bold text in it is synthesised by the browser.
