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
      score: 57,
      api: 1416.6097175377747,
      cost: 6.24,
      time_seconds: 711.14,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
      url: "https://artificialanalysis.ai/models/gpt-6-astra",
    },
    {
      plan: { en: "Codex Pro", zh: "Codex Pro" },
      model: "GPT-6 Astra (xhigh)",
      price: 100,
      score: 55,
      api: 1416.6097175377747,
      cost: 3.66,
      time_seconds: 390.94,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-astra-vs-gpt-6-astra-xhigh",
    },
    {
      plan: { en: "Codex Pro", zh: "Codex Pro" },
      model: "GPT-6.1 Sol (max)",
      price: 100,
      score: 55,
      api: 1416.6097175377747,
      cost: 1.27,
      time_seconds: 858.41,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/gpt-6-1-sol-vs-gpt-6-luna",
      url: "https://artificialanalysis.ai/models/gpt-6-1-sol",
    },
    {
      plan: { en: "Codex Pro", zh: "Codex Pro" },
      model: "GPT-6.1 Terra (max)",
      price: 100,
      score: 51,
      api: 1416.6097175377747,
      cost: 0.96,
      time_seconds: 656.65,
      time_url: "https://artificialanalysis.ai/models/gpt-6-1-terra",
      url: "https://artificialanalysis.ai/models/gpt-6-1-terra",
    },
    {
      plan: { en: "Codex Pro", zh: "Codex Pro" },
      model: "GPT-6 Luna (max)",
      price: 100,
      score: 28,
      api: 1416.6097175377747,
      cost: 0.15,
      time_seconds: 597.31,
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
      cost: 10.04,
      time_seconds: 1132.59,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
      url: "https://artificialanalysis.ai/models/claude-opus-5-5",
    },
    {
      plan: { en: "Claude Max 5x", zh: "Claude Max 5x" },
      model: "Claude Opus 5.5 (xhigh)",
      price: 100,
      score: 57,
      api: 4605.338690476191,
      cost: 6.05,
      time_seconds: 778.91,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-vs-claude-opus-5-5-xhigh",
    },
    {
      plan: { en: "Claude Max 5x", zh: "Claude Max 5x" },
      model: "Claude Sonnet 5.5 (max)",
      price: 100,
      score: 54,
      api: 4605.338690476191,
      cost: 10.02,
      time_seconds: 1325.71,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-5-vs-claude-sonnet-5-5-xhigh",
      url: "https://artificialanalysis.ai/models/claude-sonnet-5-5",
    },
    {
      plan: { en: "Claude Max 5x", zh: "Claude Max 5x" },
      model: "Claude Sonnet 5.5 (xhigh)",
      price: 100,
      score: 50,
      api: 4605.338690476191,
      cost: 4.09,
      time_seconds: 690.72,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-5-vs-claude-sonnet-5-5-xhigh",
      url:
        "https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-5-vs-claude-sonnet-5-5-xhigh",
    },
    {
      plan: {
        en: "Google AI Ultra (Antigravity)",
        zh: "Google AI Ultra（Antigravity）",
      },
      model: "Gemini 4 Argon (high)",
      price: 100,
      score: 50,
      api: 426.05901063035714,
      cost: 3.84,
      time_seconds: 1366.79,
      time_url: "https://artificialanalysis.ai/models/gemini-4-argon",
      url: "https://artificialanalysis.ai/models/gemini-4-argon",
    },
    {
      plan: { en: "Kimi Code (mainland China)", zh: "Kimi Code（中国大陆）" },
      model: "Kimi K3.1 Pro",
      price: 100,
      score: 46,
      api: 482.53775950668035,
      cost: 3.68,
      time_seconds: 1504.11,
      time_url: "https://artificialanalysis.ai/models/kimi-k3-1-pro",
      url: "https://artificialanalysis.ai/models/kimi-k3-1-pro",
    },
    {
      plan: { en: "MiMo Max", zh: "MiMo Max" },
      model: "MiMo-V2.6-Pro",
      timing: "mimo",
      price: 100,
      score: 30,
      api: 118.78579656195768,
      cost: 0.26,
      time_seconds: 1828.4,
      time_url:
        "https://artificialanalysis.ai/models/comparisons/mimo-v2-6-pro-vs-glm-5-3",
      url: "https://artificialanalysis.ai/models/mimo-v2-6-pro",
    },
    {
      plan: { en: "GLM Coding Pro", zh: "GLM Coding Pro" },
      model: "GLM-5.3 (max)",
      timing: "glm",
      price: 80,
      score: 32,
      api: 561.6210757634055,
      cost: 5.01,
      time_seconds: 1060.86,
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
        "My understanding is that it is not actually a good idea to run Astra or any Anthropic model on max, so I put in xhigh for Astra, Opus 5.5 and Sonnet 5.5. I also included GPT-6.1 Terra and Sonnet 5.5, whose API prices are half those of Sol and Opus. Otherwise, I included only the highest-scoring model for each subscription. GLM-5.3 Flash is not listed because AA has not scored it on Intelligence Index v5.",
      zh:
        "据我了解，用 max 跑 Astra 或任何 Anthropic 模型其实都不是好主意，所以我给 Astra、Opus 5.5 和 Sonnet 5.5 加上了 xhigh。我还列出了 GPT-6.1 Terra 和 Sonnet 5.5，它们的 API 价格只有 Sol 和 Opus 的一半。除此之外，每个订阅只列出了得分最高的模型。AA 尚未在 Intelligence Index v5 上为 GLM-5.3 Flash 打分，所以没有列出。",
    },
  ],
};
