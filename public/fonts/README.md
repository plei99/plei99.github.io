# Fonts

Every family is served from this site, so pages make no third-party requests.
The Latin pairings are chosen from the masthead; Pagella with Asana Math is the
default. `scripts/subset-latin.py` regenerates the Latin files.

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

## Asana Math (mathematics, with Pagella)

By Apostolos Syropoulos, version 000.962, from
<https://ctan.org/pkg/asana-math>. Licence: SIL Open Font License 1.1, in
`OFL-Asana-Math.txt`, with the Reserved Font Name "Asana Math".

`asana-math.woff2` is the complete, unmodified font in WOFF2 form. It is not
subsetted, because a subset would be a modified version and could not keep the
reserved name.

## EB Garamond and Garamond-Math

EB Garamond by Georg Duffner and Octavio Pardo, version 1.003 (the variable
build distributed by Google Fonts), from
<https://github.com/octaviopardo/EBGaramond12>; Garamond-Math by Yuansheng Zhao
and Xiangdong Zeng, 2022 release, from <https://ctan.org/pkg/garamond-math>.
Both SIL Open Font License 1.1 with no reserved names, in `OFL-EB-Garamond.txt`
and `OFL-Garamond-Math.txt`. The `eb-garamond-*.woff2` and `garamond-math.woff2`
files are subsets; the text files keep the weight axis, so bold is the font's
own.

## Lato and Lete Sans Math

Lato by Łukasz Dziedzic, version 2.015, from Google Fonts. Licence: SIL Open
Font License 1.1 with the Reserved Font Name "Lato", in `OFL-Lato.txt`, so the
four `lato-*.woff2` files are the complete, unmodified fonts in WOFF2 form and
not subsets. Lete Sans Math by Chenjing Bu and Daniel Flipo, version 0.63, is
the math companion built on Lato (renamed from "Lato Math" for that same
clause), from <https://ctan.org/pkg/lete-sans-math>, SIL Open Font License 1.1
with no reserved names, in `OFL-Lete-Sans-Math.txt`; `lete-sans-math.woff2` is a
subset.

## Iosevka (monospaced)

By Renzhi Li (Belleve Invis), version 34.8.1, the default Iosevka build from
<https://github.com/be5invis/Iosevka>. Licence: SIL Open Font License 1.1 with
no reserved names, in `OFL-Iosevka.txt`. The `iosevka-*.woff2` files (Regular,
Italic, Bold) are subsets cut by `scripts/subset-latin.py` from the unhinted
TTFs; the site uses them for `code`.

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
characters; `bun run check` fails if that has been forgotten.

## Source Han Sans SC and Resource Han Rounded SC (Chinese, by choice)

Source Han Sans SC is the Noto Sans CJK build from the same repository as Source
Han Serif, `Sans/SubsetOTF/SC/`, SIL Open Font License 1.1 with the Reserved
Font Name "Source Han Sans", in `OFL-Source-Han-Sans.txt`; the
`source-han-sans-sc-*.woff2` files are subsets under the same arrangement as the
Serif. Resource Han Rounded is Cyano Hao's rounded derivative of Source Han
Sans, version 0.990, from <https://github.com/CyanoHao/Resource-Han-Rounded>
(the CN build), SIL Open Font License 1.1 with no reserved names, in
`OFL-Resource-Han-Rounded.txt`; the `resource-han-rounded-sc-*.woff2` files are
subsets. Choosing either pairs the Latin text with Lato and Lete Sans Math
unless a Latin face has been chosen explicitly, and choosing a Latin sans pairs
the Chinese with Source Han Sans in the same way.

## LXGW WenKai (Chinese, by choice)

By LXGW, version 1.522, derived from Fontworks' Klee, from
<https://github.com/lxgw/LxgwWenKai>. Licence: SIL Open Font License 1.1, in
`OFL-LXGW-WenKai.txt`. Its reserved names come with an additional permission
that expressly allows subsets converted to WOFF2 for web delivery to keep the
name, which `lxgw-wenkai-regular.woff2` relies on. It is cut by the same script
and to the same characters as Source Han Serif. Only a Regular weight is
released, so bold text in it is synthesised by the browser.
