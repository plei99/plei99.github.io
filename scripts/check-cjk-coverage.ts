// Fails when the site's content uses a CJK character that the subsetted
// Source Han Serif files do not contain. See scripts/subset-cjk.py.

const CJK = /[⺀-⿟　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯]/g;
// CJK punctuation is always in the subset, so it is not tracked in the list.
const PUNCTUATION = /[　-〿！-／：-＠［-｀｛-･]/;

const covered = new Set(
  (await Deno.readTextFile("src/fonts/cjk-coverage.txt")).trim(),
);
const missing = new Set<string>();

async function walk(dir: string) {
  for await (const entry of Deno.readDir(dir)) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory) await walk(path);
    else if (/\.(yaml|vto|md)$/.test(entry.name)) {
      const text = await Deno.readTextFile(path);
      for (const ch of text.match(CJK) ?? []) {
        if (!covered.has(ch) && !PUNCTUATION.test(ch)) missing.add(ch);
      }
    }
  }
}

await walk("src");
if (missing.size) {
  console.error(
    `${missing.size} CJK character(s) are not in the subsetted font: ${
      [...missing].join("")
    }\nRerun scripts/subset-cjk.py (see its docstring).`,
  );
  Deno.exit(1);
}
console.log(`CJK font covers all ${covered.size} characters in use.`);
