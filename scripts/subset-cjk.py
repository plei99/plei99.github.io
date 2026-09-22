#!/usr/bin/env python3
"""Subset the Chinese fonts (Source Han Serif and Sans, Resource Han Rounded,
LXGW WenKai) to the CJK characters the site uses.

The full font is 12 MB a weight, so src/fonts holds a subset of only the
characters that appear in the site's content, plus CJK punctuation. Run this
after adding Chinese text with characters the site has not used before:

    python3 -m venv /tmp/ft && /tmp/ft/bin/pip install fonttools brotli
    /tmp/ft/bin/python scripts/subset-cjk.py NotoSerifSC-Regular.otf \
        NotoSerifSC-Bold.otf NotoSansSC-Regular.otf NotoSansSC-Bold.otf \
        ResourceHanRoundedCN-Regular.ttf ResourceHanRoundedCN-Bold.ttf \
        LXGWWenKai-Regular.ttf

The source files are Serif/SubsetOTF/SC/NotoSerifSC-{Regular,Bold}.otf from
https://github.com/notofonts/noto-cjk (Sans/SubsetOTF/SC/NotoSansSC-* likewise),
ResourceHanRoundedCN-* from the RHR-CN archive of
https://github.com/CyanoHao/Resource-Han-Rounded, and LXGWWenKai-Regular.ttf
(the only weight released) from https://github.com/lxgw/LxgwWenKai. The output name comes
from the input name. The script also writes
src/fonts/cjk-coverage.txt, which `deno task check` compares against the
content, so a forgotten rerun fails the build rather than silently falling
back to a system font.
"""

import glob
import re
import sys
from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
CJK = re.compile(
    r"[⺀-⿟　-〿぀-ヿ㐀-䶿一-鿿"
    r"豈-﫿＀-￯]"
)
# Always included, so ordinary punctuation never depends on the content.
PUNCTUATION = "U+3000-303F,U+FF01-FF0F,U+FF1A-FF20,U+FF3B-FF40,U+FF5B-FF65"


def site_characters() -> set[str]:
    chars: set[str] = set()
    for path in glob.glob(str(SRC / "**" / "*"), recursive=True):
        if path.endswith((".yaml", ".vto", ".md")):
            chars |= set(CJK.findall(Path(path).read_text(encoding="utf8")))
    return chars


def main(sources: list[str]) -> None:
    chars = site_characters()
    unicodes = subset.parse_unicodes(PUNCTUATION) + [ord(c) for c in chars]
    for source in sources:
        weight = "bold" if "Bold" in source else "regular"
        family = (
            "lxgw-wenkai" if "WenKai" in source
            else "resource-han-rounded-sc" if "ResourceHanRounded" in source
            else "source-han-sans-sc" if "NotoSans" in source
            else "source-han-serif-sc"
        )
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"]
        options.name_IDs = ["*"]
        options.notdef_outline = True
        font = subset.load_font(source, options)
        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=unicodes)
        subsetter.subset(font)
        out = SRC / "fonts" / f"{family}-{weight}.woff2"
        subset.save_font(font, str(out), options)
        print(f"{out.name}: {out.stat().st_size // 1024} KB, {len(chars)} characters")
    (SRC / "fonts" / "cjk-coverage.txt").write_text(
        "".join(sorted(chars)) + "\n", encoding="utf8"
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1:])
