#!/usr/bin/env python3
"""Convert the Latin text and math fonts to subsetted WOFF2.

    python3 -m venv /tmp/ft && /tmp/ft/bin/pip install fonttools brotli
    /tmp/ft/bin/python scripts/subset-latin.py SOURCE_DIR

SOURCE_DIR holds the original fonts under the names in FAMILIES below (see
src/fonts/README.md for where each comes from). Text fonts are cut to Latin,
Greek, punctuation and common symbols; math fonts additionally keep the
mathematical alphanumerics, operators, arrows and their MATH table, so MathML
still has proper italics, spacing and stretchy delimiters. Every layout
feature is kept and no outline is altered. Fonts whose licence reserves the
name (Lato) are only converted, never subsetted; Asana Math, likewise, is not
handled here at all and is shipped whole (see the README).
"""

import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

OUT = Path(__file__).resolve().parent.parent / "src" / "fonts"
TEXT = (
    "U+0020-007E,U+00A0-024F,U+02B0-02FF,U+0300-036F,U+0370-03FF,U+1E00-1EFF,"
    "U+2000-206F,U+2070-209F,U+20A0-20BF,U+2100-214F,U+2190-21FF,U+2200-222F,"
    "U+2260-2265,U+25A0-25FF,U+FB00-FB06"
)
MATH = TEXT + (
    ",U+2200-22FF,U+2300-23FF,U+27C0-27FF,U+2900-2AFF,U+1D400-1D7FF"
)
# output stem -> (source file, kind): "text", "math", "mono" (text ranges, default
# layout features only: Iosevka's many stylistic alternates would triple the
# file), or "whole" (convert only)
FAMILIES = {
    "tex-gyre-pagella-regular": ("pagella-regular.otf", "text"),
    "tex-gyre-pagella-italic": ("pagella-italic.otf", "text"),
    "tex-gyre-pagella-bold": ("pagella-bold.otf", "text"),
    "tex-gyre-pagella-bolditalic": ("pagella-bolditalic.otf", "text"),
    "tex-gyre-bonum-regular": ("bonum-regular.otf", "text"),
    "tex-gyre-bonum-italic": ("bonum-italic.otf", "text"),
    "tex-gyre-bonum-bold": ("bonum-bold.otf", "text"),
    "tex-gyre-bonum-bolditalic": ("bonum-bolditalic.otf", "text"),
    "tex-gyre-bonum-math": ("bonum-math.otf", "math"),
    "latin-modern-roman-regular": ("lm-regular.otf", "text"),
    "latin-modern-roman-italic": ("lm-italic.otf", "text"),
    "latin-modern-roman-bold": ("lm-bold.otf", "text"),
    "latin-modern-roman-bolditalic": ("lm-bolditalic.otf", "text"),
    "latin-modern-math": ("lm-math.otf", "math"),
    "libertinus-serif-regular": ("LibertinusSerif-Regular.otf", "text"),
    "libertinus-serif-italic": ("LibertinusSerif-Italic.otf", "text"),
    "libertinus-serif-bold": ("LibertinusSerif-Bold.otf", "text"),
    "libertinus-serif-bolditalic": ("LibertinusSerif-BoldItalic.otf", "text"),
    "libertinus-math": ("LibertinusMath-Regular.otf", "math"),
    "iosevka-regular": ("Iosevka-Regular.ttf", "mono"),
    "iosevka-italic": ("Iosevka-Italic.ttf", "mono"),
    "iosevka-bold": ("Iosevka-Bold.ttf", "mono"),
    "tex-gyre-schola-regular": ("schola-regular.otf", "text"),
    "tex-gyre-schola-italic": ("schola-italic.otf", "text"),
    "tex-gyre-schola-bold": ("schola-bold.otf", "text"),
    "tex-gyre-schola-bolditalic": ("schola-bolditalic.otf", "text"),
    "tex-gyre-schola-math": ("schola-math.otf", "math"),
    "euler-math": ("euler-math.otf", "math"),
    "eb-garamond-roman": ("ebgaramond-roman.ttf", "text"),
    "eb-garamond-italic": ("ebgaramond-italic.ttf", "text"),
    "garamond-math": ("garamond-math.otf", "math"),
    "fira-sans-regular": ("firasans-Regular.ttf", "text"),
    "fira-sans-italic": ("firasans-Italic.ttf", "text"),
    "fira-sans-bold": ("firasans-Bold.ttf", "text"),
    "fira-sans-bolditalic": ("firasans-BoldItalic.ttf", "text"),
    "fira-math": ("fira-math.otf", "math"),
    "new-cm-sans-regular": ("newcmsans-Regular.otf", "text"),
    "new-cm-sans-italic": ("newcmsans-Oblique.otf", "text"),
    "new-cm-sans-bold": ("newcmsans-Bold.otf", "text"),
    "new-cm-sans-bolditalic": ("newcmsans-BoldOblique.otf", "text"),
    "new-cm-sans-math": ("newcmsans-math.otf", "math"),
    "lato-regular": ("lato-Regular.ttf", "whole"),
    "lato-italic": ("lato-Italic.ttf", "whole"),
    "lato-bold": ("lato-Bold.ttf", "whole"),
    "lato-bolditalic": ("lato-BoldItalic.ttf", "whole"),
    "lete-sans-math": ("lete-sans-math.otf", "math"),
}


def main(source_dir: str) -> None:
    for stem, (name, kind) in FAMILIES.items():
        source = Path(source_dir) / name
        if not source.exists():
            print(f"skip {stem}: {source} not found")
            continue
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"] if kind != "mono" else list(
            subset.Options().layout_features
        )
        options.name_IDs = ["*"]
        options.notdef_outline = True
        options.glyph_names = False
        out = OUT / f"{stem}.woff2"
        if kind == "whole":
            font = TTFont(str(source))
            font.flavor = "woff2"
            font.save(str(out))
        else:
            font = subset.load_font(str(source), options)
            subsetter = subset.Subsetter(options)
            subsetter.populate(
                unicodes=subset.parse_unicodes(MATH if kind == "math" else TEXT)
            )
            subsetter.subset(font)
            subset.save_font(font, str(out), options)
        print(f"{out.name}: {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
