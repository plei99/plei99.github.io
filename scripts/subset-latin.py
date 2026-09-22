#!/usr/bin/env python3
"""Convert the Latin text and math fonts to subsetted WOFF2.

    python3 -m venv /tmp/ft && /tmp/ft/bin/pip install fonttools brotli
    /tmp/ft/bin/python scripts/subset-latin.py SOURCE_DIR

SOURCE_DIR holds the original fonts under the names in FAMILIES below (see
src/fonts/README.md for where each comes from). Text fonts are cut to Latin,
Greek, punctuation and common symbols; math fonts additionally keep the
mathematical alphanumerics, operators, arrows and their MATH table, so MathML
still has proper italics, spacing and stretchy delimiters. Every layout
feature is kept and no outline is altered. Asana Math is not handled here:
its licence reserves the name, so it is shipped whole (see the README).
"""

import sys
from pathlib import Path

from fontTools import subset

OUT = Path(__file__).resolve().parent.parent / "src" / "fonts"
TEXT = (
    "U+0020-007E,U+00A0-024F,U+02B0-02FF,U+0300-036F,U+0370-03FF,U+1E00-1EFF,"
    "U+2000-206F,U+2070-209F,U+20A0-20BF,U+2100-214F,U+2190-21FF,U+2200-222F,"
    "U+2260-2265,U+25A0-25FF,U+FB00-FB06"
)
MATH = TEXT + (
    ",U+2200-22FF,U+2300-23FF,U+27C0-27FF,U+2900-2AFF,U+1D400-1D7FF"
)
# output stem -> (source file, is math font)
FAMILIES = {
    "tex-gyre-pagella-regular": ("pagella-regular.otf", False),
    "tex-gyre-pagella-italic": ("pagella-italic.otf", False),
    "tex-gyre-pagella-bold": ("pagella-bold.otf", False),
    "tex-gyre-pagella-bolditalic": ("pagella-bolditalic.otf", False),
    "tex-gyre-bonum-regular": ("bonum-regular.otf", False),
    "tex-gyre-bonum-italic": ("bonum-italic.otf", False),
    "tex-gyre-bonum-bold": ("bonum-bold.otf", False),
    "tex-gyre-bonum-bolditalic": ("bonum-bolditalic.otf", False),
    "tex-gyre-bonum-math": ("bonum-math.otf", True),
    "latin-modern-roman-regular": ("lm-regular.otf", False),
    "latin-modern-roman-italic": ("lm-italic.otf", False),
    "latin-modern-roman-bold": ("lm-bold.otf", False),
    "latin-modern-roman-bolditalic": ("lm-bolditalic.otf", False),
    "latin-modern-math": ("lm-math.otf", True),
    "libertinus-serif-regular": ("LibertinusSerif-Regular.otf", False),
    "libertinus-serif-italic": ("LibertinusSerif-Italic.otf", False),
    "libertinus-serif-bold": ("LibertinusSerif-Bold.otf", False),
    "libertinus-serif-bolditalic": ("LibertinusSerif-BoldItalic.otf", False),
    "libertinus-math": ("LibertinusMath-Regular.otf", True),
}


def main(source_dir: str) -> None:
    for stem, (name, is_math) in FAMILIES.items():
        source = Path(source_dir) / name
        if not source.exists():
            print(f"skip {stem}: {source} not found")
            continue
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"]
        options.name_IDs = ["*"]
        options.notdef_outline = True
        options.glyph_names = False
        font = subset.load_font(str(source), options)
        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=subset.parse_unicodes(MATH if is_math else TEXT))
        subsetter.subset(font)
        out = OUT / f"{stem}.woff2"
        subset.save_font(font, str(out), options)
        print(f"{out.name}: {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
