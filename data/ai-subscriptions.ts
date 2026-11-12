import type { AiSubscriptions } from "./types";

export const aiSubscriptions: AiSubscriptions = {
  // September 23 / October 2 audit; Google and mainland Kimi updated October 15, Codex October 16 (Oct 11–13 quota window excluded: failed judge calls went unrecorded).
  // Codex Pro 100 extrapolated to twice the measured allowance after the October 29 increase.
  // AA figures from Intelligence Index v5.0, refreshed November 7.
  // Fable 5.2: November 10 measurement; normal-coding scenario selected November 11.
  // Kimi K3.1 Pro allowance measured November 2 from the October 28–29 runs.
  // Google uses the Carbon measurement from November 12 at standard API rates.
  // Tencent Token Plan Max from its published credit rules, November 7; no usage measured.
  // GLM-5.3-Flash from the September 23 token mix and GLM's credit rules, rechecked November 7.
  // Dollar values retain calculation precision; SubscriptionStudy derives task counts.
  // Only aggregate findings belong here, never raw logs or account information.
  copy: {
    en: {
      trigger: "How much inference do these subscriptions buy?",
      close: "Close subscription comparison",
      date: "Last updated November 12, 2026",
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

      endnote:
        "These estimates are based on my actual usage and the subscription rules (for example session limits, weekly limits, etc).",
      chart_title: "Intelligence against quota",
      chart_note:
        "Each point is one model at one reasoning setting: its AA score against the share of its subscription's monthly quota that one AA task uses, at the API values in the table below. Fable points use its 50% weekly cap. A model's settings are joined from lowest to highest. Hover over or focus a point for details.",
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
      table_models: "Models in the table",
      table_all: "Show all",
    },
    zh: {
      trigger: "这些订阅能换来多少推理用量？",
      close: "关闭订阅比较",
      date: "更新于 2026 年 11 月 12 日",
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
      endnote:
        "这些估算基于我的实际用量和各套餐规则（例如会话限额、周限额等）。",
      chart_title: "智能水平与额度用量",
      chart_note:
        "每个点是一个模型在一种推理强度下的结果：纵轴是 AA 分数，横轴是一个 AA 任务用掉的订阅月度额度比例，按下表的 API 等值计算。Fable 的点按 50% 周限额计算。同一模型的各个推理强度从低到高连成一条线。将指针移到某个点上或聚焦它可查看详情。",
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
      table_models: "表中显示的模型",
      table_all: "全部显示",
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
  // estimated as research/ai-subscriptions-notes.md describes. MiMo and GLM
  // charge credits per model, so theirs hold for MiMo-V2.6-Pro and GLM-5.3 at
  // the sliders' defaults; a line with its own api, such as GLM-5.3-Flash or
  // Fable 5.2, overrides its plan's.
  plans: {
    codex: {
      name: { en: "Codex Pro 100", zh: "Codex Pro 100" },
      price: 100,
      api: 2833.2194350755494,
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
      api: 1618.6969114845645,
    },
    kimi: {
      name: { en: "Kimi Code (mainland China)", zh: "Kimi Code（中国大陆）" },
      price: 100,
      api: 343.1819512670564,
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
    tencent: {
      name: { en: "Tencent Token Plan Max", zh: "腾讯云 Token Plan Max" },
      price: 103,
      api: 101.76,
    },
  },

  // AA Intelligence Index v5.0 runs, lowest reasoning setting first.
  lines: [
    {
      id: "gpt-6-astra",
      name: "GPT-6 Astra",
      plan: "codex",
      url: "https://artificialanalysis.ai/models/gpt-6-astra",
      levels: [
        { effort: "low", score: 43.3, cost: 1.424, time_seconds: 209.68 },
        { effort: "medium", score: 51.6, cost: 2.732, time_seconds: 387.53 },
        { effort: "high", score: 54.8, cost: 3.239, time_seconds: 528.02 },
        { effort: "xhigh", score: 55.3, cost: 3.659, time_seconds: 618.15 },
        { effort: "max", score: 56.9, cost: 6.245, time_seconds: 1247.1 },
      ],
    },
    {
      id: "gpt-6-1-sol",
      name: "GPT-6.1 Sol",
      plan: "codex",
      url: "https://artificialanalysis.ai/models/gpt-6-1-sol",
      levels: [
        { effort: "low", score: 34.8, cost: 0.1615, time_seconds: 110.56 },
        { effort: "medium", score: 46.3, cost: 0.3594, time_seconds: 250.94 },
        { effort: "high", score: 50.3, cost: 0.591, time_seconds: 422.62 },
        { effort: "xhigh", score: 52.5, cost: 0.764, time_seconds: 603.73 },
        { effort: "max", score: 54.6, cost: 1.272, time_seconds: 1315.85 },
      ],
    },
    {
      id: "gpt-6-1-terra",
      name: "GPT-6.1 Terra",
      plan: "codex",
      url: "https://artificialanalysis.ai/models/gpt-6-1-terra",
      levels: [
        { effort: "none", score: 30.5, cost: 0.2259, time_seconds: 134.58 },
        { effort: "low", score: 29.4, cost: 0.07134, time_seconds: 64.03 },
        { effort: "medium", score: 38.2, cost: 0.1688, time_seconds: 155.67 },
        { effort: "high", score: 42.4, cost: 0.2593, time_seconds: 240.26 },
        { effort: "xhigh", score: 45.3, cost: 0.4007, time_seconds: 368.32 },
        { effort: "max", score: 51.3, cost: 0.9611, time_seconds: 819.95 },
      ],
    },
    {
      id: "gpt-6-luna",
      name: "GPT-6 Luna",
      plan: "codex",
      url: "https://artificialanalysis.ai/models/gpt-6-luna",
      levels: [
        { effort: "none", score: 9.4, cost: 0.07142, time_seconds: 113.93 },
        { effort: "low", score: 9.7, cost: 0.005115, time_seconds: 36.57 },
        { effort: "medium", score: 18.5, cost: 0.0422, time_seconds: 198.64 },
        { effort: "high", score: 21.4, cost: 0.07295, time_seconds: 347.99 },
        { effort: "xhigh", score: 23.5, cost: 0.1041, time_seconds: 460.39 },
        { effort: "max", score: 27.9, cost: 0.152, time_seconds: 751.91 },
      ],
    },
    {
      id: "claude-opus-5-5",
      name: "Claude Opus 5.5",
      plan: "claude",
      url: "https://artificialanalysis.ai/models/claude-opus-5-5",
      levels: [
        { effort: "low", score: 34.8, cost: 0.9755, time_seconds: 180.5 },
        { effort: "medium", score: 48.2, cost: 2.451, time_seconds: 406.66 },
        { effort: "high", score: 51.8, cost: 3.465, time_seconds: 559.34 },
        { effort: "xhigh", score: 57.4, cost: 6.047, time_seconds: 966.97 },
        { effort: "max", score: 59.1, cost: 10.04, time_seconds: 1600.53 },
      ],
    },
    {
      id: "claude-sonnet-5-5",
      name: "Claude Sonnet 5.5",
      plan: "claude",
      url: "https://artificialanalysis.ai/models/claude-sonnet-5-5",
      levels: [
        { effort: "low", score: 25.6, cost: 0.5113, time_seconds: 155.42 },
        { effort: "medium", score: 30.8, cost: 0.7807, time_seconds: 216.35 },
        { effort: "high", score: 41.5, cost: 1.636, time_seconds: 419.14 },
        { effort: "xhigh", score: 49.9, cost: 4.092, time_seconds: 896.18 },
        { effort: "max", score: 54.5, cost: 10.02, time_seconds: 1887.15 },
      ],
    },
    {
      id: "claude-haiku-5-5",
      name: "Claude Haiku 5.5",
      plan: "claude",
      url: "https://artificialanalysis.ai/models/claude-haiku-5-5",
      levels: [
        { effort: "low", score: 18.6, cost: 0.04376, time_seconds: 130.46 },
        { effort: "medium", score: 24.6, cost: 0.09176, time_seconds: 244.89 },
        { effort: "high", score: 29.9, cost: 0.1586, time_seconds: 401.63 },
        { effort: "xhigh", score: 34.6, cost: 0.2484, time_seconds: 581.62 },
        { effort: "max", score: 36.5, cost: 0.411, time_seconds: 945.7 },
      ],
    },
    {
      id: "claude-fable-5-2",
      name: "Claude Fable 5.2",
      plan: "claude",
      api: 1672.6116135714285,
      quota_note: {
        en: "50% weekly cap",
        zh: "50% 周限额",
      },
      url: "https://artificialanalysis.ai/models/releases/claude-fable-5-2",
      levels: [
        {
          effort: "low",
          score: 53.9249388799182,
          cost: 3.097241904274546,
          time_seconds: 392.53108684106064,
        },
        {
          effort: "medium",
          score: 56.4083157101519,
          cost: 3.8026050641787634,
          time_seconds: 500.630681837008,
        },
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
        {
          effort: "max",
          score: 64.563595756626,
          cost: 26.53855780398091,
          time_seconds: 2785.6666305511853,
        },
      ],
    },
    {
      id: "gemini-4-carbon",
      name: "Gemini 4 Carbon",
      plan: "google",
      url: "https://artificialanalysis.ai/models/releases/gemini-4-carbon",
      levels: [
        {
          effort: "low",
          score: 54.2206114502924,
          cost: 7.186577262951972,
          time_seconds: 1439.669771002305,
        },
        {
          effort: "medium",
          score: 58.2587824022788,
          cost: 6.585776867225546,
          time_seconds: 1382.5216422438905,
        },
        {
          effort: "high",
          score: 60.025738829526,
          cost: 7.755545745286556,
          time_seconds: 1527.3417239709174,
        },
      ],
    },

    {
      id: "kimi-k3-1-pro",
      name: "Kimi K3.1 Pro",
      plan: "kimi",
      url: "https://artificialanalysis.ai/models/kimi-k3-1-pro",
      levels: [
        { score: 46.5, cost: 3.681, time_seconds: 2197.85 },
      ],
    },
    {
      id: "mimo-v2-6-pro",
      name: "MiMo-V2.6-Pro",
      plan: "mimo",
      url: "https://artificialanalysis.ai/models/mimo-v2-6-pro",
      levels: [
        { score: 29.9, cost: 0.2572, time_seconds: 2701.27 },
      ],
    },
    {
      id: "glm-5-3",
      name: "GLM-5.3",
      plan: "glm",
      url: "https://artificialanalysis.ai/models/glm-5-3",
      levels: [
        { effort: "low", score: 23.1, cost: 1.575, time_seconds: 1034.2 },
        { effort: "max", score: 31.7, cost: 5.009, time_seconds: 1879.99 },
      ],
    },
    {
      id: "glm-5-3-flash",
      name: "GLM-5.3-Flash",
      plan: "glm",
      api: 193.72915080693886,
      url: "https://artificialanalysis.ai/models/glm-5-3-flash",
      levels: [
        { score: 27.8, cost: 0.5833, time_seconds: 2416.07 },
      ],
    },
    {
      id: "tencent-hy4",
      name: "Hy4",
      plan: "tencent",
      url: "https://artificialanalysis.ai/models/tencent-hy4",
      levels: [
        { score: 34.6, cost: 1.031, time_seconds: 834.76 },
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
      line: "claude-fable-5-2",
      effort: "high",
      time_url: "https://artificialanalysis.ai/models/claude-fable-5-2-high",
      url: "https://artificialanalysis.ai/models/claude-fable-5-2-high",
    },
    {
      line: "claude-fable-5-2",
      effort: "xhigh",
      time_url: "https://artificialanalysis.ai/models/claude-fable-5-2-xhigh",
      url: "https://artificialanalysis.ai/models/claude-fable-5-2-xhigh",
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
      line: "gemini-4-carbon",
      effort: "high",
      time_url: "https://artificialanalysis.ai/models/gemini-4-carbon",
      url: "https://artificialanalysis.ai/models/gemini-4-carbon",
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
    {
      line: "glm-5-3-flash",
      time_url: "https://artificialanalysis.ai/models/glm-5-3-flash",
      url: "https://artificialanalysis.ai/models/glm-5-3-flash",
    },
    {
      line: "tencent-hy4",
      time_url: "https://artificialanalysis.ai/models/tencent-hy4",
      url: "https://artificialanalysis.ai/models/tencent-hy4",
    },
  ],
};
