// Fails when the site's content uses a CJK character that the subsetted
// Source Han Serif files do not contain. See scripts/subset-cjk.py.

const CJK = /[⺀-⿟　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯]/g;
// CJK punctuation is always in the subset, so it is not tracked in the list.
const PUNCTUATION = /[　-〿！-／：-＠［-｀｛-･]/;

const covered = new Set(
  (await Bun.file("public/fonts/cjk-coverage.txt").text()).trim(),
);
const missing = new Set<string>();

for (
  const path of new Bun.Glob(
    "{data,content,pages,components,client}/**/*.{ts,tsx,md}",
  ).scanSync()
) {
  const text = await Bun.file(path).text();
  for (const ch of text.match(CJK) ?? []) {
    if (!covered.has(ch) && !PUNCTUATION.test(ch)) missing.add(ch);
  }
}
if (missing.size) {
  console.error(
    `${missing.size} CJK character(s) are not in the subsetted font: ${
      [...missing].join("")
    }\nRerun scripts/subset-cjk.py (see its docstring).`,
  );
  process.exit(1);
}
console.log(`CJK font covers all ${covered.size} characters in use.`);
