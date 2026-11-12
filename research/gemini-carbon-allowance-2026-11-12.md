# Gemini 4 Carbon High subscription allowance audit

Audited 2026-11-12 using the original local generation records, quota history,
and first-party pricing and product documentation. All times below are UTC. This
report contains aggregate measurements only. Source paths, per-task accounting,
hashes, and verification scripts remain in a private cache outside this
repository.[^L1]

The measured workload supports a provisional estimate of **$1,618.70 per average
calendar month in standard global API list-price equivalent usage**, or
**$809.35 at the November promotional effective rates**. This extrapolates a
56.55636489391327 percentage-point increase in the shared Gemini weekly meter.
It is a workload-specific estimate of the measured subscription's capacity;
neither a measured month nor a guaranteed dollar entitlement.[^L1][^L2]

## Generation accounting

An independent reconstruction read the 100 current task records and their
current stdout streams, rather than accepting the existing audit totals. All 100
saved usage records exactly match their final CLI terminal usage summaries. For
99 tasks, they also exactly match the sum of unique completed model-response
steps. The remaining task timed out and its terminal summary includes partial
response usage beyond the completed steps.[^L1]

| Token category             | Verified count | Standard API-equivalent USD |
| -------------------------- | -------------: | --------------------------: |
| Uncached input             |     11,094,229 |                   44.376916 |
| Cache reads                |     20,991,410 |                    4.198282 |
| Output, including thinking |      8,105,486 |                  162.109720 |
| Total                      |                |                  210.684918 |

Thinking accounts for 7,649,761 of the output tokens. It is already included in
the output row. Saved prompt tokens include cache reads; uncached input is
`prompt_tokens - cached_prompt_tokens`. Charging all prompt tokens at the input
rate and then adding cache reads would overcount. No additional cache-write
charge is inferred from these CLI fields.[^L1][^L3]

The 100 current streams contain 103 initialization events, all reporting
`gemini-4-carbon-high`, and 591 completed model-response steps with usage.
Deduplicating by conversation and step index does not change this step count.
There are 96 final `SUCCESS` summaries and four `ERROR` summaries. Three of the
errors repeat an older stream interruption after a successful resumed turn; the
fourth is the timeout. The final saved task statuses are 97 `ok`, two
`rejected`, and one `agent_error`. Rejection does not remove the generation
usage from the numerator.[^L1]

Each of the three recoveries has one error before its final user-input step. The
subsequent 10, nine, and six steps, respectively, are all complete, contain no
new error, and end in a model response. Their combined terminal usage is
preserved in the saved record. All completed response usages in the six archived
stdout snapshots also appear unchanged in the current streams. Summing those
archives again would duplicate usage.[^L1]

Completed steps alone total $209.0759488 at standard rates. The timeout's
additional terminal usage is 31,992 uncached input, 266,306 cache-read, and
71,387 output tokens, including 68,174 thinking tokens. Its additional
equivalent is exactly **$1.6089692**, bringing the total to $210.684918.
Retaining it measures reported model work consumed during the subscription run;
it does not establish that every token would have appeared on a separately
billed API invoice.[^L1]

## Pricing basis

Google's [official pricing page](https://cloud.google.com/model-garden/pricing)
lists these standard-service global rates in USD per million tokens:

| Period                                         | Uncached input | Cached input | Output, including reasoning |
| ---------------------------------------------- | -------------: | -----------: | --------------------------: |
| Through November 30, 2026, effective promotion |              2 |         0.10 |                          10 |
| Starting December 1, 2026, standard            |              4 |         0.20 |                          20 |

The November promotion is delivered as 50% credits back on net spend. Thus the
run has a $210.684918 standard equivalent and a $105.342459 promotional
effective equivalent. Eligibility and actual credit application are not verified
here. The run's existing accounting file labels $2/$0.10/$10 as standard
November rates; the report should identify those as promotional effective rates.

The same official page announces charging retrievable output from some timed-out
completions longer than 32K tokens starting November 13. This run predates that
change. The timeout value above remains a usage equivalent, with API invoice
treatment unverified.

## Weekly meter and extrapolation

| Observation                                 | Timestamp             |  Gemini weekly used |
| ------------------------------------------- | --------------------- | ------------------: |
| Latest saved baseline before generation     | November 10, 16:58:06 | 11.136561632156372% |
| Observed peak                               | November 11, 20:23:05 |  69.27155256271362% |
| First observation at the later stable level | November 11, 22:58:05 |  67.69292652606964% |
| Last cached live snapshot                   | November 12, 03:59:50 |  67.69292652606964% |

The controller records a start of November 10, 17:53:50.087 and a `finished`
timestamp of November 11, 20:39:53.561. Its source writes `finished` after
grading as well as on error stops, so this field alone does not establish the
exact end of generation. The supplied audit's label
`generation_finished_before_grading` overstates what was verified. The 36
weekly-history observations within the audited interval and the cached live
snapshot have the same weekly reset: November 14, 04:46:05. The live window is
10,080 minutes. The final history observation at November 12, 03:58:06 agrees
with the cached live snapshot.[^L2]

```text
weekly fraction = (67.69292652606964 - 11.136561632156372) / 100
                = 0.5655636489391327
standard USD/week = 210.684918 / weekly fraction
                  = 372.52202894439284
weeks per average calendar month = 365 / 12 / 7
                                = 4.345238095238096
standard USD/month = 372.52202894439284 × weeks per month
                   = 1618.6969114845645
promotional effective USD/month = 809.3484557422822
```

The peak-to-stable decline is 1.57862603664398 percentage points. Its cause is
unverified: the logs do not establish a refund, reservation release, or other
server-side adjustment. Using the observed peak instead gives $1,574.74/month at
standard rates. That alternative is a sensitivity calculation, not a confidence
interval. Calling the later reading settled assumes no subsequent adjustment; it
was stable in the retained observations through the cached live snapshot.[^L2]

The baseline precedes the controller start by about 56 minutes. The endpoint
follows the recorded controller finish by about seven hours and 20 minutes; the
exact gap after generation is unverified. Those gaps allow unrecorded activity
or delayed accounting to affect attribution. No full month or complete weekly
exhaustion was observed. Repeating this workload assumes stable quota rules and
a proportional relationship between token-priced work and meter use. Google says
limits depend on work and capacity and can change; its
[plans documentation](https://antigravity.google/docs/plans) does not promise
this dollar allowance.

## Model identity and contamination checks

The controller records Antigravity CLI 1.5.5, subscription keychain
authentication, one worker, high effort, and actual model
`gemini-4-carbon-high`. Every initialization agrees. This establishes the
client-reported model identity. It does not independently identify Google's
underlying model checkpoint or any unreported internal model work.[^L1] Google's
[model documentation](https://antigravity.google/docs/models) lists Carbon High
and displays a Gemini-model quota group. The estimate therefore concerns the
Gemini pool used by Carbon High, rather than a proven Carbon-exclusive
entitlement. The public availability table alone does not verify this account's
subscription tier or billing status.

The bounded local contamination checks found the following:[^L4]

- The native Mac conversation database modified on November 10 at 17:50:48
  contains zero steps and zero generation-metadata rows. The matching recent
  history event is setup evidence, not a recorded model response. The 13 native
  databases with generation metadata have summary modification dates in October;
  five other native databases have no steps or generation metadata.
- All seven supplied T3 Carbon-mention logs identify their provider as Codex or
  Claude, not Gemini. A broader scan parsed 25,475 timestamped records across
  the baseline-to-endpoint interval from 228 retained provider log files,
  without a JSON parse failure. It found no Google, Gemini, or Antigravity
  provider events. Carbon references in those logs are insufficient evidence of
  direct Gemini inference; they include benchmark discussion and quoted logs or
  tool output. This is not a complete audit of every shell command or external
  application.
- Saved panel reviews for 80 graded tasks identify GPT-6.1 Sol through Codex and
  Claude Sonnet 5.5 through Claude. Grading therefore supplies no recorded
  Gemini usage for this run. Generation usage is accounted separately.
- The highest sampled Gemini five-hour usage was 46.99817895889282% across 47
  observations; the weekly maximum was 69.27155256271362%. Neither sampled meter
  reached exhaustion. No overage/credit/billing setting was found in the
  inspected native CLI settings file. This absence does not establish that
  overages were disabled, and no credit ledger or billing statement was
  available.

Google's [plans documentation](https://antigravity.google/docs/plans) says
purchased or promotional credits can fund usage after baseline quota exhaustion.
The sampled counters provide no positive evidence that this run needed overages.
Unsampled exhaustion and credit consumption remain unverified. Other devices,
browser sessions, IDE activity, deleted logs, and hidden internal model usage
are outside the coverage of this audit. Attribution to the benchmark alone is
therefore an explicit assumption, not a demonstrated account-wide fact.

## Artificial Analysis conversion

The saved first-party
[Artificial Analysis Carbon release page](https://artificialanalysis.ai/models/releases/gemini-4-carbon)
contains these exact embedded values, independently extracted and matched to
their model slugs:[^L5]

| Variant | Intelligence Index |   USD per AA task | Seconds per AA task |
| ------- | -----------------: | ----------------: | ------------------: |
| High    |    60.025738829526 | 7.755545745286556 |  1527.3417239709174 |
| Medium  |   58.2587824022788 | 6.585776867225546 |  1382.5216422438905 |
| Low     |   54.2206114502924 | 7.186577262951972 |   1439.669771002305 |

The embedded prices are $4 input, $0.20 cache hit, $4 cache write, and $20
output per million tokens. These confirm that the saved AA costs use the
standard rate basis. AA owns these measurements; this audit does not reproduce
its evaluations. AA describes task cost as a weighted evaluation average and
time as output tokens divided by output speed, rather than observed end-to-end
completion time for this subscription run.

Dividing $1,618.6969114845645 by the High task cost gives **208.71476549130406
AA task equivalents per average month**, approximately 209. Halving both the
monthly numerator and the AA task-cost denominator leaves that ratio unchanged.
Halving only the numerator would mix pricing bases. The cross-workload
conversion assumes comparable quota consumption per API-equivalent dollar. It is
not a measured count of AA tasks completed on the subscription. No Medium or Low
subscription allowance was measured.

## Recommended reporting

Report approximately $1,619/month at standard global API rates, alongside
$809/month at November's effective promotional rates, as a provisional
extrapolation for the observed Carbon High workload and measured subscription.
Approximately 209 AA High task equivalents/month is defensible as a separate
modeled conversion with its workload assumption. Preserve the 56.56-point
observed weekly delta and $210.684918 standard-equivalent numerator so readers
can assess the estimate. Do not describe either dollar amount as an official
subscription allowance or claim account-wide isolation or disabled overages.

[^L1]: Private primary evidence: the original generation run's 100 current task
    JSON records, 100 current agent stdout streams, six archived stdout
    snapshots, controller status, recovery evidence, and recovery-capture
    source. Independently reconstructed terminal, completed-step, recovery, and
    timeout accounting agrees with the supplied audit. Private cache files
    `independent-verify.py`, `independent-ledger.json`,
    `independent-summary.json`, and `recovery-coverage.json` retain the
    reproducibility evidence; no private prompts or responses are copied here.

[^L2]: Private primary evidence: CodexBar Antigravity weekly and five-hour
    history for the measured account, plus the sanitized cached live snapshot
    updated November 12 at 03:59:50. This was a local read of the supplied
    snapshot, not a new live account fetch.

[^L3]: Local primary implementation: the benchmark's Antigravity usage adapter
    explicitly treats CLI input as excluding cache reads and output as including
    thinking; saved normalized task usage agrees with those fields. Pricing is
    independently sourced from Google's official page above.

[^L4]: Private primary evidence: read-only native Antigravity
    conversation/summary databases and history; the supplied seven-log inventory
    and retained T3 provider logs; saved judge panel reviews; native CLI
    settings; and CodexBar history. Coverage findings are aggregates and do not
    prove account-wide absence of activity.

[^L5]: First-party saved HTML and independent embedded-record extraction from
    the AA Carbon release page, fetched into the supplied private cache on
    November 12. The public page was also retrieved during this audit and
    confirms the variant identities and rounded displayed metrics; exact values
    above are from the saved HTML.
