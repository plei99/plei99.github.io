import type { AiSubscriptions } from "./types";

export const aiSubscriptions: AiSubscriptions = {
  // September 23 / October 2 audit; Google and mainland Kimi updated October 15.
  // Dollar values retain calculation precision; SubscriptionStudy derives task counts.
  // Only aggregate findings belong here, never raw logs or account information.
  copy: {
    en: {
      trigger: "How much inference do these subscriptions buy?",
      close: "Close subscription comparison",
      date: "Last updated October 15, 2026",
      title: "What my AI subscriptions buy",
      intro:
        "Someone I know (if you are reading this, you know who you are) complained about how little usage they got with their AI subscription (which cost about $100/month), so I decided to try to estimate the value of various AI subscriptions from both US and Chinese providers. All assumptions and choices are based on the nature of the aforementioned conversation.",
      reading_note:
        "“Tasks” means a task on one of the benchmarks used in the Artificial Analysis (AA) Intelligence Index. We are assuming for now that cost/task as measured by Artificial Analysis is close to proportional to the cost/task in the real world. The index measures overall model capabilities, whereas you may find different levels of performance in your own usage. If you would like to measure model performance for your usage, consider making your own benchmark.",
      timing_heading: "Adjust your usage timing",
      timing_note: "Times are Beijing time (UTC+8).",
      timing_limits: "Assuming no temporary promotions for GLM.",
      reset: "Reset timing",
      preview: "{api} a month, or {tasks} tasks",
      scroll_hint: "Scroll for more columns →",
      plan_model: "Plan / model",
      price: "Price / month",
      score: "AA score",
      api_value: "API value / month",
      cost_task: "AA cost / task",
      time_task: "AA time / task",
      time_unavailable: "AA has not published a time per task for this model.",
      minutes: "min",
      seconds: "seconds",
      tasks: "Tasks / month",
      per_100: "Tasks / $100",

      notes: "Notes",
      endnote:
        "These estimates are based on my actual usage and the subscription rules (for example session limits, weekly limits, etc).",
    },
    zh: {
      trigger: "这些订阅能换来多少推理用量？",
      close: "关闭订阅比较",
      date: "更新于 2026 年 10 月 15 日",
      title: "我的 AI 订阅能买到多少用量",
      intro:
        "我认识的某人（如果你正在读这段话，你自己心里清楚）抱怨自己每月约 100 美元的 AI 订阅用量太少，所以我试着估算了中美各家 AI 订阅的价值。所有假设和选择都取决于上述对话的性质。",
      reading_note:
        "“任务”指 Artificial Analysis（AA）Intelligence Index 所用某个基准测试中的一个任务。我们暂且假设 AA 测得的单任务成本与实际使用中的单任务成本大致成正比。该指数衡量的是模型的整体能力，你在自己的使用中可能会看到不同的表现。如果想知道模型在你自己的用法下表现如何，可以自己做一个基准测试。",
      timing_heading: "调整使用时段",
      timing_note: "时间均为北京时间（UTC+8）。",
      timing_limits: "假设 GLM 没有限时优惠。",
      reset: "重置时段",
      preview: "每月 {api}，即 {tasks} 个任务",
      scroll_hint: "滑动查看完整数据 →",
      plan_model: "方案 / 模型",
      price: "月费",
      score: "AA 分数",
      api_value: "每月 API 等值",
      cost_task: "AA 单任务成本",
      time_task: "AA 单任务用时",
      time_unavailable: "AA 尚未公布这个模型的单任务用时。",
      minutes: "分钟",
      seconds: "秒",
      tasks: "每月任务数",
      per_100: "每 $100 任务数",
      notes: "备注",
      endnote:
        "这些估算基于我的实际用量和各套餐规则（例如会话限额、周限额等）。",
    },
  },

  timing: {
    mimo: {
      label: { en: "MiMo overnight usage", zh: "MiMo 夜间用量" },
      window: {
        en: "Daily 00:00–08:00, with 20% fewer credits",
        zh: "每天 00:00–08:00，积分消耗八折",
      },
      share: {
        en: "{share}% overnight, {other}% regular",
        zh: "{share}% 夜间，{other}% 普通时段",
      },
      default: 0,
      window_coefficient: 0.8,
      other_coefficient: 1,
    },
    glm: {
      label: { en: "GLM peak-hour usage", zh: "GLM 高峰用量" },
      window: {
        en: "Weekdays 14:00–18:00; off-peak usage costs half the credits",
        zh: "周一至周五 14:00–18:00，非高峰时段积分减半",
      },
      share: {
        en: "{share}% peak, {other}% off-peak",
        zh: "{share}% 高峰，{other}% 非高峰",
      },
      default: 50,
      window_coefficient: 1,
      other_coefficient: 0.5,
    },
  },

  rows: [
    {
      plan: { en: "Codex Pro", zh: "Codex Pro" },
      model: "GPT-6 Astra (max)",
      price: 100,
      score: 53,
      api: 1665.5053786182261,
      cost: 3.26,
      time_seconds: 503.04,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
      url: "https://artificialanalysis.ai/models/gpt-6-astra",
    },
    {
      plan: { en: "Codex Pro", zh: "Codex Pro" },
      model: "GPT-6 Astra (xhigh)",
      price: 100,
      score: 52,
      api: 1665.5053786182261,
      cost: 2.31,
      time_seconds: 341.05,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
    },
    {
      plan: { en: "Codex Pro", zh: "Codex Pro" },
      model: "GPT-6.1 Sol (max)",
      price: 100,
      score: 52,
      api: 1665.5053786182261,
      cost: 0.72,
      time_seconds: 731.39,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-1-sol-vs-gpt-6-luna",
      url: "https://artificialanalysis.ai/models/gpt-6-1-sol",
    },
    {
      plan: { en: "Codex Pro", zh: "Codex Pro" },
      model: "GPT-6 Luna (max)",
      price: 100,
      score: 38,
      api: 1665.5053786182261,
      cost: 0.07,
      time_seconds: 392.22,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-1-sol-vs-gpt-6-luna",
      url: "https://artificialanalysis.ai/models/gpt-6-luna",
    },
    {
      plan: { en: "Claude Max 5x", zh: "Claude Max 5x" },
      model: "Claude Opus 5.5 (max)",
      price: 100,
      score: 58,
      api: 4605.338690476191,
      cost: 5.98,
      time_seconds: 792.67,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
      url: "https://artificialanalysis.ai/models/claude-opus-5-5",
    },
    {
      plan: { en: "Claude Max 5x", zh: "Claude Max 5x" },
      model: "Claude Opus 5.5 (xhigh)",
      price: 100,
      score: 56,
      api: 4605.338690476191,
      cost: 3.46,
      time_seconds: 500.91,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
    },
    {
      plan: {
        en: "Google AI Ultra (Antigravity)",
        zh: "Google AI Ultra（Antigravity）",
      },
      model: "Gemini 4 Argon (high)",
      price: 100,
      score: 53,
      api: 426.05901063035714,
      cost: 1.99,
      time_seconds: null,
      time_url: "https://artificialanalysis.ai/models/gemini-4-argon",
      url: "https://artificialanalysis.ai/models/gemini-4-argon",
    },
    {
      plan: { en: "Kimi Code (mainland China)", zh: "Kimi Code（中国大陆）" },
      model: "Kimi K3 (max)",
      price: 100,
      score: 44,
      api: 482.53775950668035,
      cost: 2,
      time_seconds: 1230.62,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-kimi-k3",
      url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-kimi-k3",
    },
    {
      plan: { en: "MiMo Max", zh: "MiMo Max" },
      model: "MiMo-V2.6-Pro",
      timing: "mimo",
      price: 100,
      score: 46,
      api: 118.78579656195768,
      cost: 0.13,
      time_seconds: 1518.3,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/mimo-v2-6-pro-vs-glm-5-3",
      url: "https://artificialanalysis.ai/models/mimo-v2-6-pro",
    },
    {
      plan: { en: "GLM Coding Pro", zh: "GLM Coding Pro" },
      model: "GLM-5.3 (max)",
      timing: "glm",
      price: 80,
      score: 45,
      api: 561.6210757634055,
      cost: 2.01,
      time_seconds: 817.1,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/glm-5-3-flash-vs-glm-5-3",
      url: "https://artificialanalysis.ai/models/glm-5-3/",
    },
    {
      plan: { en: "GLM Coding Pro", zh: "GLM Coding Pro" },
      model: "GLM-5.3-Flash",
      timing: "glm",
      price: 80,
      score: 42,
      api: 173.77735311326225,
      cost: 0.25,
      time_seconds: 1014.3,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/glm-5-3-flash-vs-glm-5-3",
      url:
        "https://artificialanalysis.ai/models/comparisons/glm-5-3-flash-vs-glm-5-3",
    },
  ],

  // One inline-Markdown string per list item under the "Notes" toggle. Empty
  // items are skipped, and the toggle stays hidden until one has text.
  notes: [
    {
      en:
        "Calculations for ChatGPT, Claude, Google, and Kimi were done using my actual usage. MiMo and GLM were estimated based on my token mix (cache hit vs cache miss/cache write vs output) and their published credit rules.",
      zh:
        "ChatGPT、Claude、Google 和 Kimi 的数字是根据我的实际用量计算的。MiMo 和 GLM 则是根据我的 token 构成（缓存命中、缓存未命中/缓存写入与输出的比例）以及它们公布的积分规则估算的。",
    },
    {
      en:
        "Google AI Ultra ($100/month): I exhausted the Antigravity Gemini weekly allowance on October 15, 2026. It delivered $97.9848238 of API-equivalent inference: $52.949 from the Argon high run, $34.651 from medium, $10.259 from low, and $0.126 from small CLI calls elsewhere. The final task stopped with a weekly-quota error; its partial usage is included. All three benchmark totals, including archived attempts, matched the native conversation records exactly. $97.9848238 × (365.25 ÷ 12 ÷ 7) projects to $426.06/month at full weekly utilization, or about 214 [Gemini 4 Argon (high) AA task equivalents at $1.99/task](https://artificialanalysis.ai/models/gemini-4-argon). The weekly amount is measured through exhaustion; the monthly amount is an extrapolation.",
      zh:
        "Google AI Ultra（每月 $100）：我于 2026 年 10 月 15 日用尽了 Antigravity Gemini 的周额度，实际获得 $97.9848238 的 API 等值推理。其中 Argon high 测试为 $52.949，medium 为 $34.651，low 为 $10.259，其他地方的小型 CLI 调用为 $0.126。最后一个任务因周额度耗尽而停止，它已经使用的部分也计算在内。三批基准测试的用量总数（含已存档尝试）与本机会话记录完全一致。$97.9848238 ×（365.25 ÷ 12 ÷ 7）推算为每月 $426.06，假设每周都用完额度；按 [Gemini 4 Argon（high）的 AA 单任务成本 $1.99](https://artificialanalysis.ai/models/gemini-4-argon) 计算，约为 214 个 AA 任务等值。周用量已测量至额度耗尽，月用量仍是推算值。",
    },
    {
      en:
        "That exhausted Gemini week contained 1,608 model calls: 14.15M uncached input, 31.32M cached input and 6.66M output tokens, with thinking already included in output. Requests were counted once by conversation and step. This is one measured weekly allowance; future capacity can change, and five-hour limits still constrain bursts. [Gemini models share a cost-weighted pool; Claude/GPT have a separate limit](https://antigravity.google/blog/changes-to-antigravity-plans/), which is excluded here along with Google's other subscription benefits. [Current Argon Standard API prices](https://ai.google.dev/gemini-api/docs/pricing) are $2/M uncached input, $0.10/M cached input and $10/M output. These introductory prices double on December 1, 2026; the subscription estimate needs to be measured again then. AA has not published Argon's time per task, shown as “—”.",
      zh:
        "这次用尽的 Gemini 周额度包含 1,608 次模型调用：14.15M 未缓存输入、31.32M 缓存输入和 6.66M 输出 token，思考 token 已包含在输出中。请求按会话和步骤去重。这是一个实际测量的周额度，未来可用量可能变化，五小时限额仍会限制短时间内的大量使用。[Gemini 模型共享按成本计算的额度，Claude/GPT 另有限额](https://antigravity.google/blog/changes-to-antigravity-plans/)，这里不包含后者及 Google 订阅的其他权益。[目前 Argon Standard API 的价格](https://ai.google.dev/gemini-api/docs/pricing)为每百万未缓存输入 token $2、缓存输入 $0.10、输出 $10。这些初期价格将于 2026 年 12 月 1 日翻倍，届时需要重新测量订阅价值。AA 尚未公布 Argon 的单任务用时，表中以“—”表示。",
    },
    {
      en:
        "I bought a mainland Kimi subscription to measure its monthly limit directly. It started at 0% used on October 12, 2026; by October 15, $281.705544 of K3 API-equivalent inference had consumed 58.38% of the monthly pool. The max run accounted for $173.67 and the high run for $108.03 across 5,816 model calls, including retries and archived attempts. I matched the benchmark logs with native CLI records, removed duplicate copies, and selected requests by their actual timestamps to exclude the older billing cycle. $281.705544 ÷ 0.5838 gives $482.54/month, or about 241 AA K3 (max) task equivalents at $2/task.",
      zh:
        "我买了一个中国大陆版 Kimi 订阅，直接测量它的月度限额。2026 年 10 月 12 日开始时已用额度为 0%；截至 10 月 15 日，$281.705544 的 K3 API 等值推理消耗了月度额度的 58.38%。其中 max 测试为 $173.67，high 测试为 $108.03，共 5,816 次模型调用，包含重试和已存档尝试。我将基准测试日志与本机 CLI 记录核对，去除重复副本，并按请求的实际时间排除上一计费周期的用量。$281.705544 ÷ 0.5838 得到每月 $482.54，按 AA K3（max）每任务 $2 计算，约为 241 个 AA 任务等值。",
    },
    {
      en:
        "The Kimi calls used 12.86M uncached input, 403.00M cached input and 8.15M output tokens. At [K3's international API prices](https://platform.kimi.ai/docs/pricing/chat) of $3/M uncached input, $0.30/M cached input and $15/M output, the full monthly allowance projects to about 22M uncached input, 690M cached input and 14M output tokens at the same mix. [Mainland API prices](https://platform.kimi.com/docs/pricing/chat) of ¥20/M, ¥2/M and ¥100/M put the same allowance near ¥3,200; that uses the published yuan rates rather than a currency conversion. No additional current-cycle Kimi calls were found in the host CLI, Hermes, pi or OpenCode logs.",
      zh:
        "这些 Kimi 调用使用了 12.86M 未缓存输入、403.00M 缓存输入和 8.15M 输出 token。按 [K3 国际 API 价格](https://platform.kimi.ai/docs/pricing/chat)，每百万未缓存输入 $3、缓存输入 $0.30、输出 $15，同样的构成下，完整月度额度约能提供 22M 未缓存输入、690M 缓存输入和 14M 输出 token。[中国大陆 API 价格](https://platform.kimi.com/docs/pricing/chat)分别为每百万 ¥20、¥2 和 ¥100，对应约 ¥3,200；这里使用公布的人民币价格，并非汇率换算。在本机 CLI、Hermes、pi 和 OpenCode 日志中，没有找到这个周期内的其他 Kimi 调用。",
    },
    {
      en:
        "The Kimi max and high batches separately imply monthly API values of $458 and $527, so I use about $480 as the working estimate, with $460–530 as an observed workload range. Token capacity depends on the cache and output mix; this range describes workload variation rather than a statistical confidence interval. [New mainland plans have no weekly quota, retain a rolling five-hour limit, and share the monthly pool across membership features](https://www.kimi.com/help/membership/membership-update-rules). The monthly allowance is extrapolated directly, without a weekly-to-monthly multiplier or an assumption that it matches the overseas plan. Cloud-only activity without local records could not be independently checked.",
      zh:
        "Kimi 的 max 与 high 两批测试分别推算出每月 $458 和 $527 的 API 等值，因此这里采用约 $480 的估计，并将 $460–530 作为观察到的用量构成变化范围。可用 token 数取决于缓存和输出的比例；这个范围反映用法差异，并非统计置信区间。[中国大陆新套餐没有周额度限制，保留滚动五小时限额，且各项会员功能共享月度额度](https://www.kimi.com/help/membership/membership-update-rules)。这里直接推算月度总量，没有把周额度换算成月额度，也没有假设它与海外版相同。没有本地记录的纯云端用量无法独立核查。",
    },
    {
      en:
        "My understanding is that it is not actually a good idea to run Astra or any Anthropic model on max, so I put in xhigh for Astra and Opus 5.5. Also, GLM-5.3 Flash benches pretty close to GLM-5.3, so it is also included. Otherwise, I included only the highest-scoring model for each subscription.",
      zh:
        "据我了解，用 max 跑 Astra 或任何 Anthropic 模型其实都不是好主意，所以我给 Astra 和 Opus 5.5 加上了 xhigh。另外，GLM-5.3 Flash 的跑分与 GLM-5.3 相当接近，所以也列了进来。除此之外，每个订阅只列出了得分最高的模型。",
    },
  ],
};
