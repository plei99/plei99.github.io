import type { AiSubscriptions } from "./types";

export const aiSubscriptions: AiSubscriptions = {
  // September 23 / October 2 audit; Google and mainland Kimi updated October 15, Codex October 16 (Oct 11–13 quota window excluded: failed judge calls went unrecorded).
  // AA figures from Intelligence Index v5.0, October 28.
  // Dollar values retain calculation precision; SubscriptionStudy derives task counts.
  // Only aggregate findings belong here, never raw logs or account information.
  copy: {
    en: {
      trigger: "How much inference do these subscriptions buy?",
      close: "Close subscription comparison",
      date: "Last updated October 28, 2026",
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
      chart_title: "Intelligence against quota",
      chart_note:
        "Each point is one model at one reasoning setting: its AA score against the share of its subscription's monthly quota that one AA task uses, at the API values above. A model's settings are joined from lowest to highest. Hover over or focus a point for details.",
      chart_x: "Share of the monthly quota per task",
      chart_y: "AA Intelligence Index",
      chart_scale: "Horizontal scale",
      chart_log: "Log",
      chart_linear: "Linear",
      chart_frontier: "Pareto frontier",
      chart_reasoning: "Reasoning",
      chart_models: "Models",
      chart_reset: "Reset",
      chart_quota: "{value} of the monthly quota",
      chart_cost: "{value} per task at API prices",
      chart_tasks: "About {value} tasks a month",
      chart_empty: "Choose a model and a reasoning setting to plot.",
      chart_table: "Every reasoning setting as a table",
      chart_effort: "Reasoning",
      chart_quota_task: "Quota / task",
    },
    zh: {
      trigger: "这些订阅能换来多少推理用量？",
      close: "关闭订阅比较",
      date: "更新于 2026 年 10 月 28 日",
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
      chart_title: "智能水平与额度用量",
      chart_note:
        "每个点是一个模型在一种推理强度下的结果：纵轴是 AA 分数，横轴是一个 AA 任务用掉的订阅月度额度比例，按上表的 API 等值计算。同一模型的各个推理强度从低到高连成一条线。将指针移到某个点上或聚焦它可查看详情。",
      chart_x: "每个任务用掉的月度额度",
      chart_y: "AA Intelligence Index",
      chart_scale: "横轴刻度",
      chart_log: "对数",
      chart_linear: "线性",
      chart_frontier: "帕累托前沿",
      chart_reasoning: "推理强度",
      chart_models: "模型",
      chart_reset: "重置",
      chart_quota: "月度额度的 {value}",
      chart_cost: "按 API 价格每个任务 {value}",
      chart_tasks: "每月约 {value} 个任务",
      chart_empty: "请选择至少一个模型和一种推理强度。",
      chart_table: "以表格查看所有推理强度",
      chart_effort: "推理强度",
      chart_quota_task: "单任务额度占比",
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

  // API values are each allowance's monthly worth at API prices, measured or
  // estimated as the notes describe. MiMo and GLM charge credits per model, so
  // theirs hold for MiMo-V2.6-Pro and GLM-5.3 at the sliders' defaults.
  plans: {
    codex: {
      name: { en: "Codex Pro", zh: "Codex Pro" },
      price: 100,
      api: 1416.6097175377747,
    },
    claude: {
      name: { en: "Claude Max 5x", zh: "Claude Max 5x" },
      price: 100,
      api: 4605.338690476191,
    },
    google: {
      name: {
        en: "Google AI Ultra (Antigravity)",
        zh: "Google AI Ultra（Antigravity）",
      },
      price: 100,
      api: 426.05901063035714,
    },
    kimi: {
      name: { en: "Kimi Code (mainland China)", zh: "Kimi Code（中国大陆）" },
      price: 100,
      api: 482.53775950668035,
    },
    mimo: {
      name: { en: "MiMo Max", zh: "MiMo Max" },
      price: 100,
      api: 118.78579656195768,
      timing: "mimo",
    },
    glm: {
      name: { en: "GLM Coding Pro", zh: "GLM Coding Pro" },
      price: 80,
      api: 561.6210757634055,
      timing: "glm",
    },
  },

  // AA Intelligence Index v5.0 runs, lowest reasoning setting first. Gemini
  // 3.8 Flash (low) is left out: AA has not published its cost per task.
  lines: [
    {
      id: "gpt-6-astra",
      name: "GPT-6 Astra",
      plan: "codex",
      url: "https://artificialanalysis.ai/models/gpt-6-astra",
      levels: [
        { effort: "low", score: 43, cost: 1.424, time_seconds: 189.17 },
        { effort: "medium", score: 51.5, cost: 2.732, time_seconds: 303.7 },
        { effort: "high", score: 54.8, cost: 3.239, time_seconds: 372.36 },
        { effort: "xhigh", score: 55.3, cost: 3.659, time_seconds: 390.94 },
        { effort: "max", score: 56.9, cost: 6.245, time_seconds: 711.14 },
      ],
    },
    {
      id: "gpt-6-1-sol",
      name: "GPT-6.1 Sol",
      plan: "codex",
      url: "https://artificialanalysis.ai/models/gpt-6-1-sol",
      levels: [
        { effort: "low", score: 34.5, cost: 0.1615, time_seconds: 103.5 },
        { effort: "medium", score: 46.1, cost: 0.3594, time_seconds: 231.15 },
        { effort: "high", score: 50.2, cost: 0.591, time_seconds: 322.1 },
        { effort: "xhigh", score: 52.3, cost: 0.764, time_seconds: 435.92 },
        { effort: "max", score: 54.5, cost: 1.272, time_seconds: 858.41 },
      ],
    },
    {
      id: "gpt-6-1-terra",
      name: "GPT-6.1 Terra",
      plan: "codex",
      url: "https://artificialanalysis.ai/models/gpt-6-1-terra",
      levels: [
        { effort: "none", score: 30.4, cost: 0.2259, time_seconds: 103.76 },
        { effort: "low", score: 29.2, cost: 0.07134, time_seconds: 48.27 },
        { effort: "medium", score: 38.1, cost: 0.1688, time_seconds: 118.45 },
        { effort: "high", score: 42.3, cost: 0.2593, time_seconds: 182.13 },
        { effort: "xhigh", score: 45, cost: 0.4007, time_seconds: 286.95 },
        { effort: "max", score: 51, cost: 0.9611, time_seconds: 656.65 },
      ],
    },
    {
      id: "gpt-6-luna",
      name: "GPT-6 Luna",
      plan: "codex",
      url: "https://artificialanalysis.ai/models/gpt-6-luna",
      levels: [
        { effort: "none", score: 9.4, cost: 0.07142, time_seconds: 86.18 },
        { effort: "low", score: 9.7, cost: 0.005115, time_seconds: 28.07 },
        { effort: "medium", score: 18.3, cost: 0.0422, time_seconds: null },
        { effort: "high", score: 21.4, cost: 0.07295, time_seconds: 269.24 },
        { effort: "xhigh", score: 23.3, cost: 0.1041, time_seconds: 357.16 },
        { effort: "max", score: 27.8, cost: 0.152, time_seconds: 597.31 },
      ],
    },
    {
      id: "claude-opus-5-5",
      name: "Claude Opus 5.5",
      plan: "claude",
      url: "https://artificialanalysis.ai/models/claude-opus-5-5",
      levels: [
        { effort: "low", score: 34.5, cost: 0.9755, time_seconds: 146.94 },
        { effort: "medium", score: 48.1, cost: 2.451, time_seconds: 336.65 },
        { effort: "high", score: 51.7, cost: 3.465, time_seconds: 463.62 },
        { effort: "xhigh", score: 57, cost: 6.047, time_seconds: 778.91 },
        { effort: "max", score: 58.4, cost: 10.04, time_seconds: 1132.59 },
      ],
    },
    {
      id: "claude-sonnet-5-5",
      name: "Claude Sonnet 5.5",
      plan: "claude",
      url: "https://artificialanalysis.ai/models/claude-sonnet-5-5",
      levels: [
        { effort: "low", score: 25.3, cost: 0.5113, time_seconds: 120.54 },
        { effort: "medium", score: 30.3, cost: 0.7807, time_seconds: 177.64 },
        { effort: "high", score: 41.1, cost: 1.636, time_seconds: 331.57 },
        { effort: "xhigh", score: 49.6, cost: 4.092, time_seconds: 690.72 },
        { effort: "max", score: 54.2, cost: 10.02, time_seconds: 1325.71 },
      ],
    },
    {
      id: "claude-haiku-5-5",
      name: "Claude Haiku 5.5",
      plan: "claude",
      url: "https://artificialanalysis.ai/models/claude-haiku-5-5",
      levels: [
        { effort: "low", score: 18.6, cost: 0.04376, time_seconds: 97.99 },
        { effort: "medium", score: 24.6, cost: 0.09176, time_seconds: 192.95 },
        { effort: "high", score: 29.6, cost: 0.1586, time_seconds: 298.26 },
        { effort: "xhigh", score: 34.3, cost: 0.2484, time_seconds: 441.28 },
        { effort: "max", score: 36.2, cost: 0.411, time_seconds: 593.47 },
      ],
    },
    {
      id: "claude-fable-5-1",
      name: "Claude Fable 5.1",
      plan: "claude",
      url: "https://artificialanalysis.ai/models/claude-fable-5-1",
      levels: [
        { effort: "low", score: 38.5, cost: 4.487, time_seconds: 411.15 },
        { effort: "medium", score: 43, cost: 5.581, time_seconds: 502.53 },
        { effort: "high", score: 47, cost: 7.561, time_seconds: 672.64 },
        { effort: "xhigh", score: 49.7, cost: 10.89, time_seconds: 950.8 },
        { effort: "max", score: 49, cost: 13.04, time_seconds: 1177.56 },
      ],
    },
    {
      id: "gemini-4-argon",
      name: "Gemini 4 Argon",
      plan: "google",
      url: "https://artificialanalysis.ai/models/gemini-4-argon",
      levels: [
        { effort: "high", score: 50.4, cost: 3.841, time_seconds: 1366.79 },
      ],
    },
    {
      id: "gemini-3-8-flash",
      name: "Gemini 3.8 Flash",
      plan: "google",
      url: "https://artificialanalysis.ai/models/gemini-3-8-flash",
      levels: [
        { effort: "medium", score: 30, cost: 6.259, time_seconds: null },
        { effort: "high", score: 30.5, cost: 7.766, time_seconds: 724.41 },
      ],
    },
    {
      id: "kimi-k3-1-pro",
      name: "Kimi K3.1 Pro",
      plan: "kimi",
      url: "https://artificialanalysis.ai/models/kimi-k3-1-pro",
      levels: [
        { score: 46, cost: 3.681, time_seconds: 1504.11 },
      ],
    },
    {
      id: "mimo-v2-6-pro",
      name: "MiMo-V2.6-Pro",
      plan: "mimo",
      url: "https://artificialanalysis.ai/models/mimo-v2-6-pro",
      levels: [
        { score: 29.9, cost: 0.2572, time_seconds: 1828.4 },
      ],
    },
    {
      id: "glm-5-3",
      name: "GLM-5.3",
      plan: "glm",
      url: "https://artificialanalysis.ai/models/glm-5-3",
      levels: [
        { effort: "low", score: 23.1, cost: 1.575, time_seconds: 576.15 },
        { effort: "max", score: 31.7, cost: 5.009, time_seconds: 1060.86 },
      ],
    },
  ],

  // The table's rows, each one level of a line above.
  rows: [
    {
      line: "gpt-6-astra",
      effort: "max",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
      url: "https://artificialanalysis.ai/models/gpt-6-astra",
    },
    {
      line: "gpt-6-astra",
      effort: "xhigh",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
    },
    {
      line: "gpt-6-1-sol",
      effort: "max",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-1-sol-vs-gpt-6-1-sol-xhigh",
      url: "https://artificialanalysis.ai/models/gpt-6-1-sol",
    },
    {
      line: "gpt-6-1-sol",
      effort: "xhigh",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-1-sol-vs-gpt-6-1-sol-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-1-sol-vs-gpt-6-1-sol-xhigh",
    },
    {
      line: "gpt-6-1-terra",
      effort: "max",
      time_url: "https://artificialanalysis.ai/models/gpt-6-1-terra",
      url: "https://artificialanalysis.ai/models/gpt-6-1-terra",
    },
    {
      line: "claude-opus-5-5",
      effort: "max",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
      url: "https://artificialanalysis.ai/models/claude-opus-5-5",
    },
    {
      line: "claude-opus-5-5",
      effort: "xhigh",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
    },
    {
      line: "claude-sonnet-5-5",
      effort: "max",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-5-vs-claude-sonnet-5-5-xhigh",
      url: "https://artificialanalysis.ai/models/claude-sonnet-5-5",
    },
    {
      line: "claude-sonnet-5-5",
      effort: "xhigh",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-5-vs-claude-sonnet-5-5-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-5-vs-claude-sonnet-5-5-xhigh",
    },
    {
      line: "gemini-4-argon",
      effort: "high",
      time_url: "https://artificialanalysis.ai/models/gemini-4-argon",
      url: "https://artificialanalysis.ai/models/gemini-4-argon",
    },
    {
      line: "kimi-k3-1-pro",
      time_url: "https://artificialanalysis.ai/models/kimi-k3-1-pro",
      url: "https://artificialanalysis.ai/models/kimi-k3-1-pro",
    },
    {
      line: "mimo-v2-6-pro",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/mimo-v2-6-pro-vs-glm-5-3",
      url: "https://artificialanalysis.ai/models/mimo-v2-6-pro",
    },
    {
      line: "glm-5-3",
      effort: "max",
      time_url:
        "https://artificialanalysis.ai/models/comparisons/mimo-v2-6-pro-vs-glm-5-3",
      url: "https://artificialanalysis.ai/models/glm-5-3/",
    },
  ],

  // One inline-Markdown string per list item under the "Notes" toggle. Empty
  // items are skipped, and the toggle stays hidden until one has text.
  notes: [
    {
      en:
        "Calculations for ChatGPT, Claude, Google, and Kimi were done using my actual usage. MiMo and GLM were estimated based on my token mix (cache hit vs cache miss/cache write vs output) and their published credit rules. The Kimi allowance was measured with K3; K3.1 Pro is assumed to get the same API-dollar value.",
      zh:
        "ChatGPT、Claude、Google 和 Kimi 的数字是根据我的实际用量计算的。MiMo 和 GLM 则是根据我的 token 构成（缓存命中、缓存未命中/缓存写入与输出的比例）以及它们公布的积分规则估算的。Kimi 的额度是用 K3 测量的，这里假设 K3.1 Pro 也有相同的 API 等值。",
    },
    {
      en:
        "My understanding is that it is not actually a good idea to run Astra or any Anthropic model on max, so I put in xhigh for Astra, Opus 5.5 and Sonnet 5.5, and for Sol as well. I also included GPT-6.1 Terra and Sonnet 5.5, whose API prices are half those of Sol and Opus. Otherwise, I included only the highest-scoring model for each subscription. GLM-5.3 Flash is not listed because AA has not scored it on Intelligence Index v5.",
      zh:
        "据我了解，用 max 跑 Astra 或任何 Anthropic 模型其实都不是好主意，所以我给 Astra、Opus 5.5 和 Sonnet 5.5 加上了 xhigh，Sol 也一样。我还列出了 GPT-6.1 Terra 和 Sonnet 5.5，它们的 API 价格只有 Sol 和 Opus 的一半。除此之外，每个订阅只列出了得分最高的模型。AA 尚未在 Intelligence Index v5 上为 GLM-5.3 Flash 打分，所以没有列出。",
    },
    {
      en:
        "The chart applies each subscription's API value to every model on it, so it assumes the allowance is worth the same API dollars whichever model you use. That is untested for the models I did not run, such as Haiku 5.5, Fable 5.1, Luna and Gemini 3.8 Flash. MiMo and GLM points move with the timing sliders.",
      zh:
        "图表对同一订阅下的所有模型使用相同的 API 等值，也就是假设无论使用哪个模型，额度对应的 API 金额都相同。对于我没有实际测试的模型（例如 Haiku 5.5、Fable 5.1、Luna 和 Gemini 3.8 Flash），这一点尚未验证。MiMo 和 GLM 的点会随使用时段滑块移动。",
    },
  ],
};
