# Claude Fable 5.2 research

Researched 2026-11-10. Scope: primary-source evidence for the website's **high
and xhigh** entries; no max table row. Only this research note was written. Site
source and deployment were not changed.

## Exact Artificial Analysis values

Source:
[AA release comparison](https://artificialanalysis.ai/models/releases/claude-fable-5-2),
specifically the server-embedded `initialModels` data. Individual cross-checks:
[High](https://artificialanalysis.ai/models/claude-fable-5-2-high),
[Xhigh](https://artificialanalysis.ai/models/claude-fable-5-2-xhigh), and
[leaderboard](https://artificialanalysis.ai/leaderboards/models). These are
**Default Fallback** variants.

| Setting | AA Intelligence Index, raw |  API USD/task, raw |  Seconds/task, raw | AA displayed score / USD / minutes |
| ------- | -------------------------: | -----------------: | -----------------: | ---------------------------------- |
| high    |           61.8218785440284 |  9.078414777860381 | 1076.2028073048332 | 62 / $9.08 / 17.9                  |
| xhigh   |           62.2167392403357 | 14.828587632511116 | 1582.4722991739663 | 62 / $14.83 / 26.4                 |

The raw time is already seconds. Dividing by 60 reproduces the release chart's
raw minutes: High `17.936713455080554`, Xhigh `26.374538319566106`. The separate
first-answer-token latency is `31.969869358233343` seconds for High and
`84.73529853461669` seconds for Xhigh; neither is seconds per task.
[AA model pages](https://artificialanalysis.ai/models/claude-fable-5-2-high)

Fields to use, without inventing precision from rounded UI text:

```ts
[
  {
    effort: "high",
    score: 61.8218785440284,
    cost: 9.078414777860381,
    time_seconds: 1076.2028073048332,
  },
  {
    effort: "xhigh",
    score: 62.2167392403357,
    cost: 14.828587632511116,
    time_seconds: 1582.4722991739663,
  },
];
```

### Optional settings captured in the same snapshot

Research reference only; the requested website entries remain High and Xhigh.
Source: the same
[AA release comparison embedded data](https://artificialanalysis.ai/models/releases/claude-fable-5-2).

| Setting | AA Intelligence Index, raw |  API USD/task, raw |  Seconds/task, raw |
| ------- | -------------------------: | -----------------: | -----------------: |
| low     |           53.9249388799182 |  3.097241904274546 | 392.53108684106064 |
| medium  |           56.4083157101519 | 3.8026050641787634 |   500.630681837008 |

## What these metrics mean

AA's model-page definitions describe cost as a benchmark-weighted average per
Intelligence Index task, incorporating input, cache-read, cache-write, reasoning
and answer prices. Time is a benchmark-weighted estimate based on output tokens
per task and end-to-end output speed. It is not a direct measurement of an
entire coding job or user conversation. Speed/latency use a rolling five-day
measurement period, with regular remeasurement, so time can change.
[AA Xhigh metric definitions, Cost and Performance sections](https://artificialanalysis.ai/models/claude-fable-5-2-xhigh)

The current index is **v5.0.1**, with nine evaluations in four equally weighted
categories: knowledge work, coding, science, and general. AA uses
provider-reported token counts when available and combines them with live
typical cache-hit measurements for cost. Compare other website entries against
the same index version and capture period before interpreting score differences.
[AA intelligence methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

## Anthropic pricing

Standard first-party Fable 5.2 API prices, USD per million tokens:

| Token category          | USD / million tokens |
| ----------------------- | -------------------: |
| Input                   |                    8 |
| Output                  |                   40 |
| Cache read              |                 0.20 |
| Five-minute cache write |                   10 |
| One-hour cache write    |                   16 |

Fast mode input/output is $16/$80. These are distinct from AA's dollars per
benchmark task.
[Anthropic pricing documentation](https://platform.claude.com/docs/en/about-claude/pricing)

The November 9 launch announcement independently confirms standard $8/$40 and
fast $16/$80 input/output pricing.
[Anthropic launch announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2)

The public plan page currently lists **Max at $100/month with 5x Pro weekly and
five-hour usage**, and **Ultra at $200/month with 10x Pro weekly usage**; prices
exclude applicable tax. The site's existing “Claude Max 5x” $100 price matches
the current Max listing. [Claude plan pricing](https://claude.com/pricing)

## The 50% shared-weekly-limit rule

**Publicly verified, not merely user supplied:** Max and Ultra, premium Team
seats, and premium legacy seat-based Enterprise seats include Fable models up to
50% of regular weekly usage. Fable usage consumes that same regular pool and
consumes limits faster than other models. Other-model usage can therefore reduce
what remains available for Fable; this is not an additional half-pool. Fable 5,
5.1 and 5.2 follow the rule together. Once capped, users can switch models or
continue with usage credits.
[Anthropic Fable plan rules, including the “Will I get 50% more” FAQ](https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan)

Ordinarily Pro and standard Team seats use paid usage credits for Fable. A
current launch exception includes Fable up to 50% of weekly usage from November
9 through **November 16, 2026 at 11:59 pm PT**. Launch resets restore spent
usage rather than increasing the cap. Do not mistake that temporary promotion
for the ongoing Max/Ultra rule.
[Anthropic Fable 5.2 launch offers](https://support.claude.com/en/articles/17506494-claude-fable-5-2-launch-offers)

### What remains an estimate

The 50% quota rule does **not** publicly establish an API-dollar allowance,
equal API-dollar value across models, or identical allowance conversion between
High and Xhigh.

Read-only project context: `data/ai-subscriptions.ts` currently gives Claude an
estimated monthly API value of `4605.338690476191`, and its notes already
describe untested cross-model assumptions. Multiplying that by 0.5 yields
`2302.6693452380955`. If used for Fable, label that as a **user/modeling
assumption applied to an existing measured allowance**, not an
Anthropic-published dollar grant or a measured Fable allowance. This research
did not measure subscription consumption or validate that conversion. AA
benchmark cost alone cannot prove it.

## Extraction and reproducibility

All file inspection, download and research-file writing ran on the persistent
Linux `agents` machine through `orb`; macOS command calls explicitly used
`/opt/homebrew/bin/bash`, and guest commands used `/bin/bash`.

One coherent AA release-page snapshot was fetched at
**2026-11-10T04:55:36.159880+00:00** (download-file modification time). HTML
SHA-256: `bf28f6d0101d05d295d362a0dceb83f7508880dd556f95c6faeac6fe05c7d097`.

Method:

1. Download the public release-page HTML with curl.
2. Find `self.__next_f.push(...)` script payloads, JSON-decode each argument,
   and concatenate their string chunks.
3. JSON-decode the resulting newline-delimited React Server Component records.
   Recursively find `initialModels`.
4. Match exact slugs `claude-fable-5-2-high` and `claude-fable-5-2-xhigh`.
5. Read `intelligenceIndex`, `intelligenceIndexCostPerTask.cost.total`, and
   `intelligenceIndexTimePerTask`; retain raw numbers.
6. Cross-check chart `value`/`displayValue`, minute conversion, and live public
   model/leaderboard text. Earlier search-cache text showed 17.7/26.3 minutes;
   the downloaded snapshot and current opened pages showed 17.9/26.4. Use the
   internally consistent snapshot above.

The model IDs are High `fdc1913b-9497-45ef-83f7-17dae756f37e` and Xhigh
`76942526-cc96-46b0-bc27-29561c53ed70`.

Reproduction (fetch can return refreshed metrics):

```bash
orb -m agents -w /home/patrick/agent-work/repos/plei99.github.io /bin/bash -lc 'curl -L --fail --silent --show-error "https://artificialanalysis.ai/models/releases/claude-fable-5-2" -o /tmp/fable-5.2-aa-release.html'
```

Core parsing code, run with Linux Python after fetching:

```python
import json
import re

html = open("/tmp/fable-5.2-aa-release.html").read()
chunks = []
for match in re.finditer(r"self\.__next_f\.push\((.*?)\)</script>", html):
    payload = json.loads(match.group(1))
    if len(payload) > 1 and isinstance(payload[1], str):
        chunks.append(payload[1])

records = []
for line in "".join(chunks).splitlines():
    _, _, value = line.partition(":")
    try:
        records.append(json.loads(value))
    except json.JSONDecodeError:
        pass

wanted = {"claude-fable-5-2-high", "claude-fable-5-2-xhigh"}

def walk(value):
    if isinstance(value, dict):
        for model in value.get("initialModels", []):
            if model.get("slug") in wanted:
                print(model["slug"], model["intelligenceIndex"],
                      model["intelligenceIndexCostPerTask"]["cost"]["total"],
                      model["intelligenceIndexTimePerTask"])
        for child in value.values():
            walk(child)
    elif isinstance(value, list):
        for child in value:
            walk(child)

walk(records)
```
