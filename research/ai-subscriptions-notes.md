# AI subscription notes

The methodology notes that used to sit under the "Notes" toggle on the
subscription comparison, removed from the page on November 12, 2026. The Chinese
versions are in the git history of `data/ai-subscriptions.ts`.

- Fable 5.2 now has its own measured estimate. On November 10, tikz-bench used
  $41.8921884 in API-equivalent inference as the Fable weekly meter rose from 0%
  to 17%; that includes two completed sessions and an interrupted third. Normal
  coding then used $38.4929796 as the meter rose from 17% to 27%, including
  $4.5144552 of compaction-associated usage captured by cumulative accounting.
  Streaming records and recovery copies were counted once. I use the higher
  normal-coding scenario in the table and chart: $38.4929796 ÷ 0.10 × (365 ÷ 12
  ÷ 7) = $1,672.61/month, about 184 AA high tasks or 113 xhigh tasks. The
  benchmark alone projects $1,070.77/month; pooling both workloads gives
  $1,293.68/month. The selected value is an estimate for normal coding from part
  of one week. The previous $2,302.67 value was half the general Claude
  estimate, rather than a Fable measurement.
- I have Claude Duet access and prefer the normal-coding scenario for this
  comparison.
  [Duet runs Opus 5.5 and shares Claude's five-hour and weekly limits](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet);
  its background work also counts. Any Duet activity is outside this local token
  audit. Access alone does not establish a larger Fable allowance, and I have
  not measured Duet's quota use. The higher headline is a scenario choice.
  Duet's one-time preview reset is excluded from the recurring monthly value.
- [Fable models can use up to 50% of Claude Max's shared weekly limit](https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan).
  The Fable-only meter is already normalized to that allowance, so I do not
  halve the new estimate again. Other Claude usage can reduce what remains
  available for Fable. The benchmark exhausted the five-hour limit with Fable's
  weekly meter at only 17%; using the monthly estimate requires spreading work
  across sessions. The meter displays whole percentages, and I cannot exclude
  activity on unlogged clients. Launch reset promotions are excluded. Costs use
  [Fable 5.2's API prices](https://platform.claude.com/docs/en/about-claude/pricing),
  including each cache-write TTL and output tokens counted once. The chart
  includes all five reasoning levels; the main table keeps high and xhigh
  because max burns through the allowance too quickly for my use.
- Calculations for ChatGPT, Claude, Google, and Kimi were done using my actual
  usage. MiMo and GLM were estimated based on my token mix (cache hit vs cache
  miss/cache write vs output) and their published credit rules. Tencent comes
  from its published credit rules alone, which for Hy4 do not depend on the
  token mix.
- Kimi K3.1 Pro was measured directly from the October 28–29, 2026 tikz-bench
  runs: $55.46 on max, $34.89 on high and $15.28 on low, across 300 tasks and
  5,290 model calls. The runs overlapped, so I pooled their usage over one quota
  interval. Kimi Code's monthly meter rose from 58.49% to a settled 89.27%; the
  separate 0.05% used by other membership features is excluded. $105.6314046 ÷
  0.3078 gives $343.18/month, or about 93 AA K3.1 Pro task equivalents. All task
  token totals match the request logs; the max run's missing costs were
  calculated from those tokens. Earlier CLI test calls preceded the baseline,
  and no later calls were found outside the benchmark.
- The K3.1 Pro estimate uses
  [international API prices](https://platform.kimi.ai/) of $2/M uncached input,
  $0.20/M cached input and $10/M output.
  [Mainland prices](https://platform.kimi.com/) put the same measured allowance
  near ¥2,270/month. The previous K3 estimate was $482.54, but its API token
  prices were 50% higher; repricing that earlier token mix at K3.1 rates gives
  $321.69. Most of the dollar change therefore reflects API pricing. This is a
  projection from 30.78% of one monthly quota, with no weekly-to-monthly
  multiplier.
  [Membership features share the monthly pool, and the rolling five-hour limit still applies](https://www.kimi.com/help/membership/membership-update-rules).
- Tencent's $103/month
  [Token Plan Max](https://www.tencentcloud.com/act/pro/tokenhub) gives 15,900
  credits a month, with no five-hour or weekly limit; unused credits expire.
  [Hy4 deducts](https://intl.cloud.tencent.com/document/product/1300/81316)
  130.313 credits per million uncached input tokens, 390.781 per million output
  tokens and 6.563 per million cache hits. That is exactly 156.25 credits per
  dollar at
  [Hy4's list API prices](https://www.tencentcloud.com/document/product/1300/78937)
  of $0.834, $2.501 and $0.042, whatever the token mix, so the plan buys $101.76
  of Hy4 a month, slightly less than its price. Two promotions are left out:
  until November 17, 2026, Hy4 costs about a quarter of the credits; until
  December 31, 2026, pay-as-you-go Hy4 is half price, so buying through the API
  directly gets about twice as much.
- Gemini 4 Carbon was remeasured through the November 12 weekly quota stop. The
  high run's 100 task records used $210.684918 at standard API prices; 70 medium
  records added $120.9846172. The medium run saved costs at half those rates, so
  I repriced its tokens before combining them. The $331.6695352 total includes
  five resumed records, the high timeout's reported partial usage and the medium
  task stopped by quota. Recovery archives were counted once; 30 pending medium
  tasks contribute no usage. Thinking is already included in output tokens.
- The shared Gemini weekly meter started at 11.13656% and later settled at
  99.15593%, consuming 88.01937 percentage points with the same reset date. The
  earlier 11.14% has no matching Carbon token ledger here, so I exclude it
  rather than assuming a full 100% denominator. $331.6695352 ÷
  0.8801937103271484 × (365 ÷ 12 ÷ 7) gives $1,637.35/month, about 211 AA High
  task equivalents or 249 Medium equivalents. High alone gives $1,618.70/month
  and Medium alone $1,670.87/month; these are alternative workload estimates.
  The chart applies the pooled value to all three reasoning levels; Low
  subscription usage remains unmeasured.
- The Medium terminal reports “Individual quota reached” with a reset matching
  the weekly window, even though the later meter shows 99.16%. Its sampled
  five-hour usage stayed below 44%. The weekly peak was 99.94846% before falling
  to the stable reading; the cause is unverified. Using that peak instead gives
  $1,622.74/month. This measures the usable weekly stop for that request, and
  the
  [five-hour and shared weekly limits](https://antigravity.google/docs/cli/commands/usage)
  still apply. Attribution assumes the recorded Carbon work explains the
  measured delta. Checked local sources supplied no additional direct Gemini
  usage, but activity elsewhere and overage billing remain unverified. No
  complete zero-to-exhaustion week or calendar month was measured.
- The Google plan uses
  [standard global API rates](https://cloud.google.com/model-garden/pricing):
  $4/M uncached input, $0.20/M cache reads and $20/M output, with thinking
  counted once. Temporary API promotions are excluded.
  [AA's November 13 page](https://artificialanalysis.ai/models/releases/gemini-4-carbon)
  now uses $2 input, $0.10 cache hits and $10 output, while its cache-write
  price remains $4. I normalize each cost component to standard rates,
  preserving that $4 write rate. The resulting High cost is $7.75555/task,
  matching the November 12 $7.76 breakdown; simply doubling today's $5.48478
  total would overstate it. AA timing figures were refreshed November 13.
- GLM-5.3-Flash has its own API value because
  [GLM charges it a third of GLM-5.3's credits](https://docs.z.ai/devpack/overview):
  2.3, 0.56 and 8 credits per 10,000 cache-miss, cache-hit and output tokens,
  against 6.9, 1.7 and 24. Applied to the same token mix, schedule and 60,000
  weekly credits as GLM-5.3, that is $193.73/month at
  [Flash's API prices](https://docs.z.ai/guides/overview/pricing) of $0.15/M
  input, $0.03/M cached input and $0.50/M output, the prices AA also uses.
  Flash's API prices are about a ninth of GLM-5.3's, so the same quota is worth
  fewer API dollars on Flash, but it buys about three times as many AA tasks.
- Codex Pro 100 uses twice the October 16 measured API value, following
  [OpenAI's October 29 allowance increase](https://x.com/thsottiaux/status/2115850175868727621).
  This assumes API value scales with the allowance; I have not measured it again
  since the increase.
- My understanding is that it is not actually a good idea to run Astra or any
  Anthropic model on max, so I put in xhigh for Astra, Opus 5.5 and Sonnet 5.5,
  and for Sol as well. Fable 5.2 has high and xhigh entries. I also included
  GPT-6.1 Terra and Sonnet 5.5, whose API prices are half those of Sol and Opus,
  and GLM-5.3-Flash, which uses a third of GLM-5.3's credits. Otherwise, I
  included only the highest-scoring model for each subscription.
- Fable 5.2 and GLM-5.3-Flash have their own API values. Fable 5.1 retains the
  untested projection of half the general Claude value for its weekly cap. Other
  chart models use their subscription's full API value, assuming equal
  API-dollar value across models; this is untested for models I did not run,
  including Haiku 5.5 and Luna. Carbon's AA figures were checked November 13 and
  Fable 5.2's November 10 on Index v5.0.1; other models retain the November 7
  snapshot. MiMo and GLM points move with the timing sliders.
