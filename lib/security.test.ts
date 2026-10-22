import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";
import { inlineScript } from "./inline";
import { securePage } from "./security";

test("the policy authorizes exact inline bytes and pins entry script integrity", () => {
  const code = '\nwindow.example = "allowed";\n';
  const inlineHash = `sha256-${
    createHash("sha256").update(code).digest("base64")
  }`;
  const entryHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  const html = securePage(
    `<html><head><script>${code}</script><script type="module" src="/js/panel.js?v=1"></script></head><body></body></html>`,
    new Map([["/js/panel.js", entryHash]]),
  );
  let policy = "";
  const inlineScripts: string[] = [];
  let body = "";
  new HTMLRewriter()
    .on('meta[http-equiv="Content-Security-Policy"]', {
      element(el) {
        policy = el.getAttribute("content")!;
      },
    })
    .on("script", {
      element(el) {
        body = "";
        el.onEndTag(() => {
          inlineScripts.push(body);
        });
      },
      text(chunk) {
        body += chunk.text;
      },
    }).transform(html);
  expect(html).toStartWith(
    '<html><head><meta http-equiv="Content-Security-Policy"',
  );
  const scriptPolicy = policy.split(";").map((d) => d.trim()).find((d) =>
    d.startsWith("script-src ")
  )!;
  expect(scriptPolicy).toContain(`'${inlineHash}'`);
  for (const script of inlineScripts) {
    const hash = createHash("sha256").update(script).digest("base64");
    expect(scriptPolicy).toContain(`'sha256-${hash}'`);
  }
  expect(scriptPolicy).toContain("'strict-dynamic'");
  for (
    const unsafe of ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:"]
  ) {
    expect(scriptPolicy).not.toContain(unsafe);
  }
  expect(policy).toContain("base-uri 'none'");
  expect(policy).toContain("script-src-attr 'none'");
  const loaded: { src: string; integrity: string; type: string }[] = [];
  const ready: (() => void)[] = [];
  for (const script of inlineScripts) {
    runInNewContext(script, {
      window: {},
      addEventListener(_name: string, listener: () => void) {
        ready.push(listener);
      },
      document: {
        createElement: () => ({}),
        head: { append: (entry: typeof loaded[number]) => loaded.push(entry) },
      },
    });
  }
  expect(loaded).toEqual([]);
  for (const listener of ready) listener();
  expect(loaded).toEqual([
    { src: "/js/panel.js?v=1", integrity: entryHash, type: "module" },
  ]);
});

test("the build refuses script entries outside the compiled client scripts", () => {
  for (
    const src of [
      "https://attacker.invalid/x.js",
      "/other-project/x.js",
      "data:text/javascript,alert(1)",
    ]
  ) {
    expect(() =>
      securePage(
        `<html><head><script type="module" src="${src}"></script></head></html>`,
        new Map(),
      )
    ).toThrow();
  }
});

test("inline constants keep HTML-looking input as data", async () => {
  const target = "</script><script>window.attacker = true</script>";
  const code = await inlineScript("redirect", {
    TARGET: target,
    KEEP_HASH: false,
  });
  expect(code.toLowerCase()).not.toContain("</script");
  let destination = "";
  runInNewContext(code, {
    location: {
      replace(value: string) {
        destination = value;
      },
    },
  });
  expect(destination).toBe(target);
});

test("malformed preference cookies do not stop browser initialization", async () => {
  const code = await inlineScript("preferences", { THEME_PAIRS: {} });
  const window: { applyTheme?: () => void } = {};
  runInNewContext(code, {
    window,
    document: {
      cookie: "latin=%; cjk=%E0%A4; theme=%",
      documentElement: { dataset: {} },
    },
    localStorage: { getItem: () => null },
    matchMedia: () => ({ matches: false }),
  });
  expect(typeof window.applyTheme).toBe("function");
  expect(() => window.applyTheme!()).not.toThrow();
});
