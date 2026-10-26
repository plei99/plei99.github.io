import type { ReactNode } from "react";
import { type Destination, type Lang, site, ui } from "../lib/site";

type Props = { lang: Lang; section: string };

/** A destination's name in the figure, such as x₁, set in the math font. */
export function Symbol({ symbol }: { symbol: Destination["symbol"] }) {
  return (
    <span className="symbol" aria-hidden="true">
      {symbol.base}
      {symbol.n && <sub>{symbol.n}</sub>}
    </span>
  );
}

/** A label in the figure that links to a page. */
function FigLink({ id, href, current, external, children }: {
  id: string;
  href: string;
  current?: boolean;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      className="fig-link"
      href={href}
      aria-current={current ? "page" : undefined}
      rel={external ? "noopener" : undefined}
      target={external ? "_blank" : undefined}
      data-id={id}
    >
      {children}
    </a>
  );
}

/** Mathematical italic x or alpha with a subscript, as SVG text. */
function Sub({ base, n, dy = 5 }: { base: string; n: number; dy?: number }) {
  return (
    <>
      {base}
      <tspan className="fig-sub" dy={dy}>{n}</tspan>
    </>
  );
}

// The source curve C: genus 2, with marked points x1 (about me), x2 (seminars)
// and x3 (notes). Coordinates are local; Figure places the group.
function Curve({ lang, section }: Props) {
  const pages = site.pages;
  return (
    <>
      <path
        className="fig-ink fig-draw"
        pathLength={1}
        d="M 80 215 C 80 165, 120 140, 160 143 C 195 146, 205 170, 232 170 C 262 170, 275 128, 320 128 C 368 128, 392 165, 392 208 C 392 252, 362 285, 322 283 C 285 281, 268 252, 235 252 C 205 252, 195 292, 155 290 C 112 288, 80 260, 80 215 Z"
      />
      <g className="fig-ink fig-draw fig-thin">
        <path pathLength={1} d="M 116 208 Q 150 240 184 208" />
        <path pathLength={1} d="M 127 217 Q 150 197 173 217" />
        <path pathLength={1} d="M 284 198 Q 318 230 352 198" />
        <path pathLength={1} d="M 295 207 Q 318 187 341 207" />
      </g>
      <g className="fig-math" aria-hidden="true">
        <text x="72" y="138">𝐶</text>
        <text x="147" y="272">
          <Sub base="𝑥" n={1} />
        </text>
        <text x="247" y="206">
          <Sub base="𝑥" n={2} />
        </text>
        <text x="312" y="262">
          <Sub base="𝑥" n={3} />
        </text>
      </g>

      <FigLink
        id="about"
        href={pages.about.href[lang]}
        current={section === "about"}
      >
        <path className="fig-hit" d="M 135 262 L 135 368" />
        <path className="fig-leader" d="M 135 271 L 135 336" />
        <circle className="fig-pt" cx="135" cy="262" r="5" />
        <text className="fig-word" x="135" y="362">
          {pages.about.label[lang]}
        </text>
      </FigLink>
      <FigLink
        id="seminars"
        href={pages.seminars.href[lang]}
        current={section === "seminars"}
      >
        <path className="fig-hit" d="M 236 195 L 236 54" />
        <path className="fig-leader" d="M 236 186 L 236 84" />
        <circle className="fig-pt" cx="236" cy="195" r="5" />
        <text className="fig-word" x="236" y="72">
          {pages.seminars.label[lang]}
        </text>
      </FigLink>
      <FigLink id="notes" href={pages.notes.href[lang]}>
        <path className="fig-hit" d="M 345 250 L 390 366" />
        <path className="fig-leader" d="M 348.5 258.5 L 380 336" />
        <circle className="fig-pt" cx="345" cy="250" r="5" />
        <text className="fig-word" x="388" y="362">
          {pages.notes.label[lang]}
        </text>
      </FigLink>
    </>
  );
}

// The map f. The arrow is the link to Travel and the letter f is the link to
// Uses, one on each side of the arrow. `vertical` turns it to point down for
// narrow screens.
function MapArrow({ lang, section, vertical }: Props & { vertical: boolean }) {
  const pages = site.pages;
  return (
    <>
      <FigLink
        id="travel"
        href={pages.travel.href[lang]}
        current={section === "travel"}
      >
        {vertical
          ? (
            <>
              <path
                className="fig-hit"
                d="M 210 335 L 210 490 M 210 412 L 350 412"
              />
              <path
                className="fig-arrow"
                pathLength={1}
                d="M 210 335 L 210 488 M 204 477 L 210 489 L 216 477"
              />
              <path className="fig-leader" d="M 219 412 L 282 412" />
              <text className="fig-word fig-word--start" x="290" y="419">
                {pages.travel.label[lang]}
              </text>
            </>
          )
          : (
            <>
              <path
                className="fig-hit"
                d="M 430 208 L 602 208 M 515 208 L 515 368"
              />
              <path
                className="fig-arrow"
                pathLength={1}
                d="M 430 208 L 600 208 M 589 202 L 601 208 L 589 214"
              />
              <path className="fig-leader" d="M 515 217 L 515 336" />
              <text className="fig-word" x="515" y="362">
                {pages.travel.label[lang]}
              </text>
            </>
          )}
      </FigLink>
      <FigLink
        id="uses"
        href={pages.uses.href[lang]}
        current={section === "uses"}
      >
        {vertical
          ? (
            <>
              <path className="fig-hit" d="M 196 412 L 60 412" />
              <path className="fig-leader" d="M 178 412 L 120 412" />
              <text
                className="fig-math fig-math--f fig-math--link"
                x="196"
                y="418"
                textAnchor="end"
                aria-hidden="true"
              >
                𝑓
              </text>
              <text className="fig-word fig-word--end" x="112" y="419">
                {pages.uses.label[lang]}
              </text>
            </>
          )
          : (
            <>
              <path className="fig-hit" d="M 515 196 L 515 54" />
              <path className="fig-leader" d="M 515 170 L 515 84" />
              <text
                className="fig-math fig-math--f fig-math--link"
                x="515"
                y="194"
                textAnchor="middle"
                aria-hidden="true"
              >
                𝑓
              </text>
              <text className="fig-word" x="515" y="72">
                {pages.uses.label[lang]}
              </text>
            </>
          )}
      </FigLink>
    </>
  );
}

// The target X, drawn as a slanted sheet. Inside it is the image f(C), which
// meets each of the three cycles at the image of a marked point. The classes of
// the cycles are the insertions, and the links hang off the points f(x_i):
// arXiv at f(x1), now at f(x2), CV at f(x3). Each cycle is an arc touching f(C)
// at its apex, so a vertical leader from the point runs up or down the open
// wedge between the two curves.
function Target({ lang, section }: Props) {
  const pages = site.pages;
  const fx = (n: number) => (
    <>
      𝑓(<Sub base="𝑥" n={n} dy={4} />
      <tspan dy="-4">)</tspan>
    </>
  );
  return (
    <>
      <path
        className="fig-ink fig-draw"
        pathLength={1}
        d="M 658 110 L 950 110 L 918.5 320 L 626.5 320 Z"
      />
      <g className="fig-image fig-draw">
        <path
          pathLength={1}
          d="M 708 201 C 708 178, 728 160, 750 160 C 770 160, 776 176, 793 176 C 810 176, 815 157, 836 157 C 858 157, 873 176, 873 199 C 873 235, 845 282, 814 282 C 796 282, 792 256, 775 256 C 760 256, 752 270, 736 270 C 718 270, 708 228, 708 201 Z"
        />
        <path pathLength={1} d="M 736 209 Q 756 229 776 209" />
        <path pathLength={1} d="M 743 215 Q 756 203 769 215" />
        <path pathLength={1} d="M 810 207 Q 830 227 850 207" />
        <path pathLength={1} d="M 817 213 Q 830 201 843 213" />
      </g>
      <g className="fig-math" aria-hidden="true">
        <text className="fig-math--lg" x="946" y="342" textAnchor="middle">
          𝑋
        </text>
        <text className="fig-math--sm" x="793" y="147" textAnchor="middle">
          𝑓(𝐶)
        </text>
        <text className="fig-math--sm" x="697" y="207" textAnchor="end">
          {fx(1)}
        </text>
        <text className="fig-math--sm" x="884" y="205">{fx(2)}</text>
        <text className="fig-math--sm" x="822" y="312">{fx(3)}</text>
        <text x="664" y="276">
          <Sub base="𝛼" n={1} />
        </text>
        <text x="897" y="266">
          <Sub base="𝛼" n={2} />
        </text>
        <text x="746" y="306">
          <Sub base="𝛼" n={3} />
        </text>
      </g>

      <FigLink id="arxiv" href={site.contact.arxiv} external>
        <path
          className="fig-hit"
          d="M 708 60 L 708 201 M 692 252 Q 724 201 692 150"
        />
        <path className="fig-leader" d="M 708 84 L 708 193" />
        <path
          className="fig-cycle"
          pathLength={1}
          d="M 692 252 Q 724 201 692 150"
        />
        <circle className="fig-pt" cx="708" cy="201" r="4.5" />
        <text className="fig-word" x="708" y="72">
          {pages.arxiv.label[lang]}
        </text>
      </FigLink>
      <FigLink id="now" href={pages.now.href[lang]} current={section === "now"}>
        <path
          className="fig-hit"
          d="M 873 60 L 873 199 M 890 148 Q 856 199 890 250"
        />
        <path className="fig-leader" d="M 873 84 L 873 191" />
        <path
          className="fig-cycle"
          pathLength={1}
          d="M 890 148 Q 856 199 890 250"
        />
        <circle className="fig-pt" cx="873" cy="199" r="4.5" />
        <text className="fig-word" x="873" y="72">{pages.now.label[lang]}</text>
      </FigLink>
      <FigLink id="cv" href={pages.cv.href[lang]} external>
        <path
          className="fig-hit"
          d="M 814 282 L 814 368 M 774 294 Q 814 270 854 294"
        />
        <path className="fig-leader" d="M 814 290 L 814 336" />
        <path
          className="fig-cycle"
          pathLength={1}
          d="M 774 294 Q 814 270 854 294"
        />
        <circle className="fig-pt" cx="814" cy="282" r="4.5" />
        <text className="fig-word" x="814" y="362">{pages.cv.label[lang]}</text>
      </FigLink>
    </>
  );
}

// The mathematics in the caption is MathML, so it is set in Asana Math with
// proper italics and script positions, and read correctly by screen readers.
const stableMap =
  `<math><mi>f</mi><mo>:</mo><mo stretchy="false">(</mo><mi>C</mi><mo>,</mo><msub><mi>x</mi><mn>1</mn></msub><mo>,</mo><msub><mi>x</mi><mn>2</mn></msub><mo>,</mo><msub><mi>x</mi><mn>3</mn></msub><mo stretchy="false">)</mo><mo>→</mo><mi>X</mi></math>`;
const insertions =
  `<math><msub><mi>α</mi><mn>1</mn></msub><mo>,</mo><msub><mi>α</mi><mn>2</mn></msub><mo>,</mo><msub><mi>α</mi><mn>3</mn></msub><mo>∈</mo><msup><mi>A</mi><mo>*</mo></msup><mo stretchy="false">(</mo><mi>X</mi><mo stretchy="false">)</mo></math>`;
const caption = {
  en:
    `<b>Figure 1.</b> A stable map ${stableMap} of genus 2, with insertions ${insertions}.`,
  zh: `<b>图 1.</b> 一个亏格 2 的稳定映射 ${stableMap}，插入为 ${insertions}。`,
};

/**
 * The whole site map: a stable map f : (C, x1, x2, x3) -> X. It is rendered
 * twice, because an SVG viewBox cannot change with a media query: once laid out
 * left to right, and once top to bottom for narrow screens. CSS shows one of
 * the two.
 */
export default function Figure({ lang, section }: Props) {
  return (
    <figure className="figure">
      <svg
        className="fig fig--wide"
        viewBox="40 40 940 345"
        role="group"
        aria-label={ui[lang].figure_label}
      >
        <g className="fig-source">
          <Curve lang={lang} section={section} />
        </g>
        <MapArrow lang={lang} section={section} vertical={false} />
        <g className="fig-target">
          <Target lang={lang} section={section} />
        </g>
      </svg>
      <svg
        className="fig fig--tall"
        viewBox="0 0 420 835"
        role="group"
        aria-label={ui[lang].figure_label}
      >
        <g className="fig-source" transform="translate(-30 -45)">
          <Curve lang={lang} section={section} />
        </g>
        <MapArrow lang={lang} section={section} vertical />
        <g className="fig-target" transform="translate(-585 450)">
          <Target lang={lang} section={section} />
        </g>
      </svg>
      <figcaption>
        <span dangerouslySetInnerHTML={{ __html: caption[lang] }} />
        {
          /* One line under the caption says where the label being pointed at
            leads; styles.css shows the matching one with :has(). Screen
            readers get the link text itself, so these are hidden from them. */
        }
        <span className="fig-hints" aria-hidden="true">
          <span className="fig-hint fig-hint--idle">
            {ui[lang].figure_hint}
          </span>
          {Object.entries(site.pages).map(([id, page]) => (
            <span className="fig-hint" data-for={id} key={id}>
              <Symbol symbol={page.symbol} /> {page.hint[lang]}
            </span>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
