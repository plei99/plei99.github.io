# Fable 5.2 measured Max allowance audit

Audited 2026-11-10 against original local records and current Anthropic
documentation. All times are UTC. This note contains aggregate accounting only;
private source locations and record hashes remain in the audit cache.

The records support a provisional estimate of **about $1,290/month in standard
API list-price equivalent Fable 5.2 usage** for the measured Max subscription
and observed workload mix. The exact pooled calculation is $1,293.6766455026454.
This is an extrapolation from 27 displayed percentage points of the Fable weekly
submeter, not a measured month, a cash allowance, or a guaranteed subscription
entitlement. The benchmark-only and normal-use extrapolations differ
substantially, so the pooled figure needs a workload caveat.[^L1][^L2][^L3]

## November 11 scenario selection

The website now uses the normal-coding extrapolation of **$1,672.61/month**
(`1672.6116135714285` before rounding), selected at the owner's request after
confirming Claude Duet access. The pooled result above and the benchmark-only
result remain unchanged as alternative workload scenarios. At the existing AA
costs per task, the selected value gives about 184 high or 113 xhigh task
equivalents per month. This choice changes the headline scenario, not the
underlying measurements.

[Anthropic's Duet documentation](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet),
checked November 11, says Duet runs Opus 5.5, shares the plan's five-hour and
weekly limits, and counts background work toward usage. Duet activity is outside
this local token ledger. Access does not establish a recurring Fable allowance
increase or prove that Duet affected either measured interval. Its one-time
preview reset is excluded. The choice of the higher normal-coding result is a
preferred scenario, not a measured Duet uplift.

## Reconciled measurement

| Observation                           | API-equivalent usage, USD | Fable weekly submeter | Extrapolated USD/week | Extrapolated USD/month |
| ------------------------------------- | ------------------------: | --------------------: | --------------------: | ---------------------: |
| Benchmark, including interrupted work |                41.8921884 |              0% → 17% |           246.4246376 |               1,070.77 |
| Normal use, including compaction      |                38.4929796 |             17% → 27% |           384.9297960 |               1,672.61 |
| Pooled                                |                80.3851680 |              0% → 27% |           297.7228444 |               1,293.68 |

Costs were independently recomputed from original usage fields. The benchmark
numerator matches terminal summaries and canonical session accounting. The
normal numerator matches the latest cumulative cost state and the final provider
result. These are client-reported API list-price equivalents, not API invoices
or subscription charges.[^L1][^L2]

The calculation uses an average calendar month:

```text
weeks per month = 365 / 12 / 7 = 4.345238095238096
pooled monthly equivalent = (41.8921884 + 38.4929796) / 0.27 × weeks per month
                          = 1,293.6766455026454 USD
```

Pooling divides total cost by total quota consumption. It is equivalent to
weighting the two interval estimates by their 17 and 10 quota points; taking
their unweighted average would answer a different question. The arithmetic is
confirmed. Assuming future usage retains this mixture and cost-to-quota
relationship is an extrapolation.[^L1][^L2][^L3]

## Pricing treatment

Anthropic currently lists Fable 5.2 at $8 input, $40 output, $0.20 cache reads,
$10 five-minute cache writes, and $16 one-hour cache writes, all per million
tokens. The cache-read rate is 2.5% of base input. Applying a generic 10%
cache-read multiplier would overstate this model's cost. Long context uses
standard rates.
[Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)

The recomputation uses each recorded cache-write TTL. Visible responses use
one-hour writes; the cumulative compaction-associated difference also includes
five-minute writes. Aggregate cache creation is a cross-check on the TTL
breakdown, not another charge. Recorded output is charged once; the separate
thinking counter is not added to it. This calculation reproduces the stored
costs. Benchmark results report standard speed and global inference; normal
provider results report standard speed, global inference for ordinary turns, and
an unspecified geography on the compaction result. There is no recorded premium
requiring a pricing adjustment.[^L1][^L2] Fast mode and US-only inference have
separate modifiers in
[Anthropic's pricing documentation](https://platform.claude.com/docs/en/about-claude/pricing).

## Duplicate records, streaming, and interrupted work

The benchmark canonical logs contain 584 Fable assistant records representing
201 distinct message IDs. Normal use contains 402 records representing 179
distinct IDs. Summing every assistant record would count repeated content blocks
and usage snapshots more than once. Deduplication uses message identity and
final usage. Independently checked fieldwise maxima equal the last canonical
usage vector for every message; usage does not decrease within these
groups.[^L1][^L2]

Benchmark stdout has the same Fable message identities as the canonical logs but
incomplete output-usage fields. Its terminal aggregate, canonical final usage,
and canonical cost state agree for all three benchmark sessions. Stdout
assistant usage alone is unsuitable for this calculation.[^L1]

The benchmark includes two completed sessions and the work recorded before a
third session stopped with an API error. Recovery metadata identifies a
first-party HTTP 429 usage-limit stop. The recovery archive's
interrupted-session terminal log and canonical log are byte-for-byte identical
to the corresponding originals. Recovery's “previous” and “cumulative” cost
fields describe the same work; they are not extra charges. Metadata records
waiting for quota followed by cancellation, with the controller stopped. A
separate earlier launcher restart records zero generated work. These checks
support counting the three session totals once.[^L1][^L4]

Normal provider records contain 11 completed-turn results, two
`aborted_streaming` results, and one compaction result without a terminal-reason
field. The interrupted turns' reported cost increments are included. Ordinary
per-query result usage sums to $33.9785244, exactly matching deduplicated
canonical response usage. Two additional stream starts lack corresponding
canonical responses; their provisional usage fields do not establish additional
finalized costs and are not added on top of cumulative accounting. Unreported
server-side consumption cannot be ruled out by client logs alone.[^L2]

## What the compaction evidence establishes

The normal session's first two saved cumulative states exactly match visible
response accounting. The last state is $38.4929796, while visible responses
total $33.9785244. Their difference is $4.5144552.[^L2]

The direct provider sequence supplies stronger attribution than a timing
coincidence:

| Accounting checkpoint                                   | Cumulative API-equivalent cost, USD |
| ------------------------------------------------------- | ----------------------------------: |
| Last result before manual compaction                    |                          29.4014080 |
| Result immediately after the manual compaction boundary |                          33.9158632 |
| Final normal-use result                                 |                          38.4929796 |

The compaction operation raises cumulative cost by exactly $4.5144552. Its
per-query `usage` reports zero, while its cumulative `modelUsage` advances.
Subsequent ordinary work adds $4.5771164. The manual compaction boundary occurs
at 13:34:53.129, between the two relevant results.[^L2]

Confirmed: the entire accounting gap appears in the cumulative cost increase
across the manual compaction operation. Describing it as compaction-associated
cost is supported by the direct operation sequence. Plausible but unconfirmed:
that it represents exactly one hidden summarization request, with no internal
retries or other internal work. The logs do not expose an independently itemized
request record for that increase. They also do not expose the provider's exact
quota charge for compaction. Keeping the increase in the API-equivalent
numerator follows the recorded cumulative accounting.[^L2]

## Which allowance the percentages measure

Anthropic says Max subscribers can use up to 50% of their regular weekly limits
on Fable models, sharing the overall weekly allowance with other models.
[Fable models on your plan](https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan)

The observed Fable-only submeter is already normalized to its own allotment. Its
27% is the denominator for the pooled estimate. **Do not halve the result
again.** As a consistency check, the all-model weekly meter rises from 9% to 23%
while the scoped Fable meter rises from 0% to 27%; the approximately two-to-one
relationship is consistent with that normalization and integer display
precision. The ordinary interval is 18% → 23% overall against 17% → 27%
scoped.[^L3]

The benchmark baseline is 04:40:36. The final valid benchmark sample at 07:44:43
reports Fable 17%, overall weekly 18%, and five-hour usage 100%. There are 56
valid samples at Fable 17% from 06:36:03 onward; four samples elsewhere have a
missing Fable value and are not treated as zero. The five-hour reset is
scheduled for 09:30. Thus the observed stop exhausts the five-hour window while
substantial Fable weekly capacity remains.[^L3][^L4]

Normal responses run from 09:46:33.029 to 13:41:58.991. The sanitized live
snapshot is later, at 14:29:53, with Fable 27%, overall weekly 23%, and
five-hour usage 47%. Both weekly windows are 10,080 minutes and reset at
2026-11-13 23:00; the primary window is 300 minutes. A separate cached capture
at 14:28:48 has the same numeric percentages and reset times. These are weekly
measurements spanning separate five-hour windows. A monthly extrapolation
assumes usage can be spread across available windows.[^L2][^L3]

## Coverage and remaining uncertainty

An independent scan of all 381 original native Claude project logs found one
normal Fable 5.2 session in the measured interval and no other model's native
assistant records in that interval. The benchmark uses its separate canonical
logs. No native guest Claude logs were present. Direct provider-event inspection
found the same normal Fable response identities; the other logged Claude model
activity predates the interval. Checked Hermes usage rows, recent OpenCode
assistant records, and 47 Pi session files supplied no additional Fable activity
relevant to the measurement.[^L5]

This supports the selected local numerator. It cannot exclude usage in Claude
web, mobile, another computer, an unrecorded client, or an unrecorded reset.
Such consumption would move quota without a matching local cost. The lack of
local activity after 13:41:58 does not prove that the account was idle until the
14:29:53 snapshot. Meter reporting delay is also possible. The earlier benchmark
endpoint has repeated settled samples; the normal endpoint lacks equally dense
sampling.[^L3][^L5]

The displayed percentages are integers, and the record does not establish the
service's rounding rule. A displayed initial zero need not be an exact physical
zero. As a sensitivity calculation only, replacing the pooled 27-point
denominator by 26 or 28 gives about $1,343.43 or $1,247.47/month. These values
are not a confidence interval or a guaranteed rounding bound.[^L3]

Workload differences are larger than that sensitivity: the normal-use
extrapolation is about 56% above the benchmark extrapolation. Caching, output
mix, and compaction change list-price equivalent costs; this audit does not
identify Anthropic's internal quota formula or establish a constant dollar
exchange rate. The two interval estimates describe observed workloads, not lower
and upper guarantees. This is one partial week on one subscription, and the
audit does not establish transferability across Max tiers or
accounts.[^L1][^L2][^L3]

Anthropic's current launch offer grants eligible Max subscriptions a limited
number of Fable resets. A reset restores spent usage and does not raise the
recurring limit. Promotional resets are excluded from the recurring monthly
extrapolation. The sampled benchmark meter is monotone; there is no continuous
normal-interval meter trace proving that a reset could not have occurred between
endpoints.
[Fable 5.2 launch offers](https://support.claude.com/en/articles/17506494-claude-fable-5-2-launch-offers)

## Audit implementation notes

The supplied `audit.py` and `audit.json` were read, then original records were
reaggregated independently with decimal arithmetic and no imports from the
supplied script. The independent check reproduced the numerators and denominator
arithmetic, checked streaming identities against canonical records, reconciled
direct provider results, and compared recovery archive hashes. Source evidence
covered by the independent manifest remained unchanged during the audit.[^L6]

Several script assumptions need care if this method is reused. `NORMAL_START` is
declared but unused. Normal sessions are selected using an earlier baseline and
file modification-time prefilter, and their final cumulative states are used
without subtracting a baseline state. Visible totals are calculated before the
message timestamp filter. Those shortcuts do not change this sample: the
selected normal session begins after the benchmark, all its Fable responses lie
in the measured interval, and the independent full native-log scan finds no
additional Fable sessions. The original Hermes usage-table check is disabled;
the independent audit queried that table and found no Fable rows. None of the
script's external task-count projections were needed or validated
here.[^L5][^L6]

A publishable description is: “About $1,290/month in Fable 5.2 API-equivalent
usage, extrapolated from this Max subscription's observed workload mix; actual
capacity varies with workload and five-hour limits.” Retain “estimated” beside
any table value and provide the observation date.

## Local primary-record citations

The references below identify evidence classes without publishing raw logs,
private task details, credentials, or account identifiers. Exact source
mappings, record locations, and hashes are retained in the local audit cache
dated 2026-11-10.

[^L1]: Original benchmark terminal results and canonical session transcripts,
    independently deduplicated and priced. Evidence and hashes:
    `independent-verification.json`, benchmark entries and source manifest, in
    the local audit cache. This is primary client accounting, not a provider
    invoice.

[^L2]: Original normal Claude session transcript, three cumulative cost states,
    manual compaction boundary, and direct provider protocol results for the
    same session. Evidence: `independent-verification.json`,
    `provider-verification.json`, and `accounting-reconciliation.json` in the
    local audit cache. Protocol records were parsed as direct events; quoted
    logs inside tool output were excluded.

[^L3]: Original benchmark allowance samples; successful cached CodexBar capture
    at 14:28:48; sanitized live capture at 14:29:53. Evidence: allowance
    aggregation in `independent-verification.json`, cached CodexBar capture, and
    `live-usage-sanitized.json` in the local audit cache. Failed web/source
    captures were not used as usage evidence.

[^L4]: Original quota-recovery, cancellation, and pre-generation restart
    metadata, plus archived interrupted-session terminal and canonical logs.
    Evidence: `recovery-archive-verification.json` and recovery metadata
    aggregation in `independent-verification.json` in the local audit cache.

[^L5]: Independent native Claude log scan, direct provider-event inspection,
    read-only Hermes and OpenCode database queries, and Pi session scan.
    Evidence: `independent-verification.json`,
    `provider-contamination-summary.json`, and `cross-client-verification.json`
    in the local audit cache. These checks establish coverage of inspected local
    stores only.

[^L6]: Supplied audit script and JSON, independent verification scripts, source
    manifest, and aggregate reconciliation artifacts in the local audit cache.
    No source logs were edited, no inference was run, and no subscription
    credits were spent for this audit.
