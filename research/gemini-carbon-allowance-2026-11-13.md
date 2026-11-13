# Gemini 4 Carbon allowance audit after the weekly quota stop

Audited November 13, 2026. All times are UTC. This updates the
[November 12 High-only audit](gemini-carbon-allowance-2026-11-12.md) with the
Medium run through its explicit individual-quota error. The benchmark and its
supervision jobs were read without alteration. Only aggregate findings appear
here; source paths, task identifiers, hashes, raw logs, and verification scripts
remain in a private cache outside this public repository.[^local]

The recommended estimate is **approximately $1,637 per average calendar month at
standard global API list prices**, equivalent to **$376.81 per week** for the
measured High/Medium workload. At November's 50%-credit promotional effective
rates, the corresponding estimate is **$818.67 per average month**. This is a
workload-specific extrapolation of subscription capacity, not a published dollar
entitlement. The observed numerator is $331.6695352 of standard-priced usage
across an 88.01937103271484 percentage-point increase in the Gemini weekly
meter.[^usage][^quota]

Two corrections are material. The Medium run's saved $60.4923086 uses
promotional effective rates and becomes $120.9846172 on the standard basis. The
current Artificial Analysis (AA) task costs require separate component
normalization because its cache-write rate did not halve with the other rates.
Doubling today's AA total would give an incorrect standard cost.[^usage][^aa]

## Verified generation accounting

An independent reconstruction read the original current task records and stdout
streams, then compared the saved normalized usage with terminal summaries and
unique completed response steps. It did not take the supplied audit totals as
the accounting input.[^usage]

| Measurement                                |        High |      Medium |    Combined |
| ------------------------------------------ | ----------: | ----------: | ----------: |
| Records with saved usage                   |         100 |          70 |         170 |
| Exact terminal-usage matches               |         100 |          70 |         170 |
| Exact completed-step usage matches         |          99 |          70 |         169 |
| Unique completed response steps with usage |         591 |         432 |       1,023 |
| Initialization events                      |         103 |          72 |         175 |
| Resumed records                            |           3 |           2 |           5 |
| Archived stdout streams already covered    |           6 |           4 |          10 |
| Uncached input tokens                      |  11,094,229 |   6,708,069 |  17,802,298 |
| Cache-read tokens                          |  20,991,410 |  12,448,106 |  33,439,516 |
| Output tokens, including thinking          |   8,105,486 |   4,583,136 |  12,688,622 |
| Thinking tokens, already within output     |   7,649,761 |   4,244,642 |  11,894,403 |
| Standard API-equivalent USD                | 210.6849180 | 120.9846172 | 331.6695352 |

Every initialization reports the expected High or Medium model. Both controllers
record CLI 1.5.5 and subscription keychain authentication. This verifies
client-reported model identity and authentication mode; the underlying model
checkpoint and any unreported internal work are unverified.[^usage]

The adapter treats CLI input tokens as excluding cache reads and output as
including thinking. Saved prompt tokens include cache reads, so the calculation
is:[^adapter]

```text
uncached input = saved prompt tokens - saved cached prompt tokens
standard USD = (4 × uncached input + 0.2 × cache reads + 20 × output) / 1,000,000
```

Thinking is not charged a second time. The CLI fields provide no separate
cache-write category, so no additional cache-write charge is invented. The High
total is $44.376916 input + $4.198282 cache reads + $162.109720 output. Medium
is $26.832276 + $2.4896212 + $91.662720. All 70 saved Medium costs agree with
token repricing at $2/$0.10/$10 within floating-point precision.[^usage]

The one High timeout has terminal usage beyond its completed steps: 31,992
uncached input, 266,306 cache-read, and 71,387 output tokens, including 68,174
thinking tokens. The additional standard equivalent is $1.6089692. Completed
High steps alone total $209.0759488; retaining terminal-reported partial work
brings the numerator to $210.684918.[^usage]

The quota-stopped Medium record is included because it contains consumed work:
14,296 uncached input, 14,329 cache-read, and 36,976 output tokens, including
34,693 thinking tokens. Its terminal and completed-step usage match exactly.
There is no extra partial-response usage reported beyond those completed steps.
The remaining 30 planned tasks are pending, have neither saved usage nor stdout
streams, and contribute zero to this audit.[^usage]

Final saved statuses are 97 `ok`, two `rejected`, and one `agent_error` for
High; 68 `ok`, one `rejected`, one `agent_error`, and 30 `pending` for Medium.
Rejections retain their generation usage. The terminal streams contain 96 High
and 67 Medium `SUCCESS` summaries; four High and three Medium summaries retain
`ERROR`. Five of those error summaries are resumed records with saved evidence
that generation was not repeated, and no error step after their final user-input
step. The other two are the timeout and quota stop. All 84 completed response
steps in the ten archived stdout snapshots appear unchanged in the current
streams. Adding archives would duplicate usage.[^usage]

## Pricing basis

Google's
[official Model Garden pricing](https://cloud.google.com/model-garden/pricing)
lists standard-service global Carbon rates of $4 uncached input, $0.20 cache
read, and $20 output per million tokens, with response and reasoning both
included in output. The November effective rates are $2/$0.10/$10 through
November 30; Google describes the promotion as 50% credits back on net spend.
Credit eligibility and actual application to this account were not audited.

These are API usage equivalents. They do not establish subscription cost or an
API invoice. Google also states that charging retrievable usage from timed-out
completions over 32K tokens takes effect November 13. The retained High timeout
predates that date; its terminal usage is retained as reported work without
claiming a particular invoice treatment.

## Weekly exhaustion and denominator

| Observation                                    | Timestamp            |           Gemini weekly used |
| ---------------------------------------------- | -------------------- | ---------------------------: |
| Latest saved baseline before High generation   | Nov 10, 16:58:06     |          11.136561632156372% |
| Settled High/Medium split snapshot             | Nov 12, 03:59:50     |           67.69292652606964% |
| Highest retained reading                       | Nov 12, 19:43:05     |           99.94846266927198% |
| Explicit individual-quota stop                 | Nov 12, 19:47:20.374 | No synchronous meter reading |
| Last reading in the independently read history | Nov 12, 22:58:05     |           99.15593266487122% |
| Supplied cached live endpoint                  | Nov 12, 23:54:40     |           99.15593266487122% |

All 55 weekly-history observations in the independently read
baseline-to-endpoint interval, plus both supplied live snapshots, agree on the
weekly reset of November 14 at 04:46:05. The live weekly window is 10,080
minutes.[^quota]

The Medium terminal directly contains the provider error “Individual quota
reached” and says it resets in 32h58m45s. The controller is in `quota_wait`,
with a resume-not-before time of November 14 at 04:46:05.374. That reset agrees
with the weekly meter to subsecond rounding. During the Medium interval the
highest of 23 sampled five-hour readings was 43.35678815841675%; the endpoint
five-hour reading was 4.824650287628174%. There is no sampled five-hour
exhaustion. These records support usable weekly exhaustion for this attempted
request, even though the later weekly meter displays 99.16%.[^quota]

The error does not identify why the meter stopped below 100%, establish the
smallest request that might still fit, or explain the 0.79253000440076-point
peak-to-settled decline. Reservation release, refunds, and server adjustments
were not verified. The later 99.1559% value is treated as the settled observed
endpoint, with a separate peak sensitivity calculation. No 100% endpoint is
substituted.[^quota]

The 11.1366% used before the benchmark has no corresponding Carbon token
numerator in this audit. Thus $331.67 covers the measured 88.0194-point delta;
it is not the measured dollar content of a whole week. A full-week equivalent
requires scaling by that delta:[^quota]

```text
measured standard USD = 210.684918 + 120.9846172 = 331.6695352
measured weekly fraction = (99.15593266487122 - 11.136561632156372) / 100
                         = 0.8801937103271484
standard USD/week = 331.6695352 / 0.8801937103271484
                  = 376.81425271344625
weeks/average calendar month = 365 / 12 / 7 = 4.345238095238096
standard USD/month = 1637.3476457191416
November promotional effective USD/month = 818.6738228595708
```

| Workload or endpoint basis     | Measured standard USD | Weekly delta, percentage points | Standard USD/week | Standard USD/average month |
| ------------------------------ | --------------------: | ------------------------------: | ----------------: | -------------------------: |
| High only                      |           210.6849180 |               56.55636489391327 |        372.522029 |                   1,618.70 |
| Medium only through quota stop |           120.9846172 |              31.463006138801575 |        384.529745 |                   1,670.87 |
| Pooled, settled endpoint       |           331.6695352 |               88.01937103271484 |        376.814253 |                   1,637.35 |
| Pooled, observed peak endpoint |           331.6695352 |                88.8119010371156 |        373.451679 |                   1,622.74 |

These are alternative calculations, not statistical confidence bounds. The
High-only and Medium-only values differ by about 3.22%; the pooled estimate uses
the larger combined observed delta. No complete zero-to-exhaustion week or
calendar month was measured.[^quota]

## Attribution and coverage limits

The baseline is about 56 minutes before the High controller start. Medium starts
about 16.5 minutes after the split snapshot, and the endpoint is about four
hours and seven minutes after the quota stop. High's controller finish includes
grading, so it does not establish the exact generation end. These gaps allow
delayed meter updates or other activity to affect attribution.[^usage][^quota]

The bounded contamination checks found:[^coverage]

- All 18 retained native Antigravity conversation databases were opened read
  only. Thirteen have generation metadata and October summary modification
  dates. Five have zero steps and zero generation-metadata rows, including the
  database modified November 10 at 17:50:48. The recent file supplies no
  recorded native inference.
- Across 228 retained T3 provider log files, 39,427 timestamped records in the
  measured interval parse successfully. Their direct provider envelopes are
  Codex or Claude: 22,976 and 16,451 records respectively. None names Google,
  Gemini, or Antigravity. All nine files in the supplied Carbon-mention
  inventory likewise have only Codex/Claude envelopes. Carbon mentions include
  quoted benchmark material and tool output; a mention is not proof of a direct
  Gemini provider call.
- The 80 saved High panel reviews identify GPT-6.1 Sol via Codex and Claude
  Sonnet 5.5 via Claude. They supply no recorded Gemini grading usage.

Provider envelopes do not rule out inference invoked by shell tools. Retained
logs do not cover every application, browser session, other device, deleted
record, or hidden internal model action. There is no complete account billing or
credit ledger. Attribution of the measured delta entirely to the benchmark
therefore remains an assumption. The quota error establishes that this attempted
request was blocked; it does not establish the account's overage setting or
prove that no earlier credits were consumed.

Google's [plans documentation](https://antigravity.google/docs/plans) says quota
depends on work and capacity and may change. It also allows purchased or
promotional credits for overages on eligible plans. Google's
[model documentation](https://antigravity.google/docs/models) groups Gemini
weekly/five-hour usage separately from Claude/GPT usage. The estimate concerns
the measured subscription's shared Gemini pool under this Carbon workload;
account tier, Carbon-exclusive entitlement, and disabled overages are not
independently established.

## Artificial Analysis normalization

A fresh November 13 fetch of the first-party
[AA Carbon page](https://artificialanalysis.ai/models/releases/gemini-4-carbon)
matches the supplied metrics. Costs are evaluation-weighted; times derive from
output tokens and speed.[^aa]

| Variant | Intelligence Index | Current displayed USD/task | Standard-normalized USD/task | Current seconds/task |
| ------- | -----------------: | -------------------------: | ---------------------------: | -------------------: |
| High    |    60.025738829526 |          5.484780948230178 |           7.7555457452865575 |   1641.8914562608359 |
| Medium  |   58.2587824022788 |          4.677653677420589 |            6.585776867225546 |   1425.2397706296406 |
| Low     |   54.2206114502924 |          5.221404723668021 |            7.186577262951973 |   1432.9311705999035 |

Current rates are $2/$0.10/$4/$10 for input/read/write/output. Normalize to
$4/$0.20/$4/$20:[^aa]

```text
standard AA cost = 2 × nonCacheInput + 2 × cacheRead + cacheWrite + 2 × output
                 = 2 × 0.0235140179 + 2 × 1.0195728204133172
                   + 3.214016151173799 + 2 × 1.2276779587430622
                 = 7.7555457452865575
```

November 12 HTML used standard rates, consistent with the supplied $7.76
screenshot. Normalization reproduces all three prior costs. The display change
establishes no provider billing error.[^aa]

The pooled estimate converts to approximately 211 High, 249 Medium, or 228 Low
AA task equivalents/month, assuming equal quota per API-equivalent dollar across
workloads. These counts are modeled; Low subscription usage was not
measured.[^conversion]

[^local]: Scope: read-only benchmark, quota, and local activity inspection; one
    new aggregate report in this repository. No benchmark resume, cancellation,
    model inference, commit, push, deployment, or other site edit was performed.

[^usage]: Private primary evidence: 170 original task usage records and their
    current stdout streams, 30 pending task records, ten archived stdout
    snapshots, five recovery records, controller state, and the Medium quota
    terminal. Independent script `independent-verify-latest.py`, hashed
    `independent-latest-ledger.json`, and `independent-latest-summary.json` are
    retained in the private November 13 audit cache. All assertions passed.

[^adapter]: Local primary implementation: the benchmark's TypeScript usage
    adapter, `usage.ts`, in its Antigravity report normalization. Original
    normalized records agree with the directly read CLI token fields.

[^quota]: Private primary evidence: the measured account's retained CodexBar
    weekly and five-hour history, the supplied cached live snapshots updated
    November 12 at 03:59:50 and 23:54:40, controller status, quota-wait
    evidence, and the matching direct provider terminal. Snapshot timestamps
    describe the observations; this audit did not make a fresh authenticated
    quota request. Decimal token pricing and independent proportional
    calculations reproduce the supplied figures to floating-point precision.

[^coverage]: Private primary evidence: read-only native conversation and summary
    databases, retained T3 provider envelopes, the supplied nine-file mention
    inventory, and High panel reviews. Counts describe retained local evidence,
    not complete account activity or billing.

[^aa]: Independently decoded first-party AA HTML from November 12 and 13,
    including a fresh fetch; retained privately.

[^conversion]: Derived arithmetic: 1637.3476457191416 divided respectively by
    7.7555457452865575, 6.585776867225546, and 7.186577262951973 yields
    211.1195909990269, 248.61875504277796, and 227.83413936978694.
