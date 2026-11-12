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

      notes: "Notes",
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
      notes: "备注",
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
  // estimated as the notes describe. MiMo and GLM charge credits per model, so
  // theirs hold for MiMo-V2.6-Pro and GLM-5.3 at the sliders' defaults; a line
  // with its own api, such as GLM-5.3-Flash, overrides its plan's. Fable's
  // 5.2 allowance is measured separately; 5.1 retains the untested half-pool projection.
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
        en: "50% weekly cap; normal-coding estimate",
        zh: "50% 周限额；按普通编程用量推算",
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
      id: "claude-fable-5-1",
      name: "Claude Fable 5.1",
      plan: "claude",
      api: 2302.6693452380955,
      quota_note: {
        en: "50% of the shared weekly limit",
        zh: "共享周额度的 50%",
      },
      url: "https://artificialanalysis.ai/models/claude-fable-5-1",
      levels: [
        { effort: "low", score: 38.7, cost: 4.471, time_seconds: 438.7 },
        { effort: "medium", score: 43.2, cost: 5.564, time_seconds: 567.4 },
        { effort: "high", score: 47.2, cost: 7.54, time_seconds: 763.53 },
        { effort: "xhigh", score: 50, cost: 10.85, time_seconds: 1127.44 },
        { effort: "max", score: 49.2, cost: 12.99, time_seconds: 1349.13 },
      ],
    },
    {
      id: "gemini-4-carbon",
      name: "Gemini 4 Carbon",
      plan: "google",
      quota_note: {
        en: "High-workload estimate; shared Gemini pool",
        zh: "按 high 用量推算；共享 Gemini 额度",
      },
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

  // One inline-Markdown string per list item under the "Notes" toggle. Empty
  // items are skipped, and the toggle stays hidden until one has text.
  notes: [
    {
      en:
        "Fable 5.2 now has its own measured estimate. On November 10, tikz-bench used $41.8921884 in API-equivalent inference as the Fable weekly meter rose from 0% to 17%; that includes two completed sessions and an interrupted third. Normal coding then used $38.4929796 as the meter rose from 17% to 27%, including $4.5144552 of compaction-associated usage captured by cumulative accounting. Streaming records and recovery copies were counted once. I use the higher normal-coding scenario in the table and chart: $38.4929796 ÷ 0.10 × (365 ÷ 12 ÷ 7) = $1,672.61/month, about 184 AA high tasks or 113 xhigh tasks. The benchmark alone projects $1,070.77/month; pooling both workloads gives $1,293.68/month. The selected value is an estimate for normal coding from part of one week. The previous $2,302.67 value was half the general Claude estimate, rather than a Fable measurement.",
      zh:
        "Fable 5.2 现在有单独的实测估算。11 月 10 日，tikz-bench 使用了 $41.8921884 的 API 等值推理用量，Fable 周用量表从 0% 升至 17%；包括两次完成的会话和第三次中断的会话。之后的普通编程使用 $38.4929796，用量表从 17% 升至 27%，其中包含累计记录显示的 $4.5144552 上下文压缩用量。流式记录和恢复副本只计一次。表格和图表采用较高的普通编程估算：$38.4929796 ÷ 0.10 ×（365 ÷ 12 ÷ 7）= 每月 $1,672.61，约为 184 个 AA high 任务或 113 个 xhigh 任务。单看基准测试，每月推算为 $1,070.77；合并两种工作构成则为 $1,293.68。所选数字根据一周中部分普通编程用量推算。此前的 $2,302.67 是普通 Claude 估算的一半，尚未单独测量 Fable。",
    },
    {
      en:
        "I have Claude Duet access and prefer the normal-coding scenario for this comparison. [Duet runs Opus 5.5 and shares Claude's five-hour and weekly limits](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet); its background work also counts. Any Duet activity is outside this local token audit. Access alone does not establish a larger Fable allowance, and I have not measured Duet's quota use. The higher headline is a scenario choice. Duet's one-time preview reset is excluded from the recurring monthly value.",
      zh:
        "我有 Claude Duet 的使用权限，这次比较倾向采用普通编程的估算。[Duet 使用 Opus 5.5，与 Claude 共享五小时和周限额](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)，后台工作也计入用量。任何 Duet 活动都不在这次本地 token 审计中。获得权限本身无法证明 Fable 额度更大，我也没有测量 Duet 的额度消耗。较高的主要数值是所选使用情景的估算。Duet 预览期的一次性重置不计入每月持续额度。",
    },
    {
      en:
        "[Fable models can use up to 50% of Claude Max's shared weekly limit](https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan). The Fable-only meter is already normalized to that allowance, so I do not halve the new estimate again. Other Claude usage can reduce what remains available for Fable. The benchmark exhausted the five-hour limit with Fable's weekly meter at only 17%; using the monthly estimate requires spreading work across sessions. The meter displays whole percentages, and I cannot exclude activity on unlogged clients. Launch reset promotions are excluded. Costs use [Fable 5.2's API prices](https://platform.claude.com/docs/en/about-claude/pricing), including each cache-write TTL and output tokens counted once. The chart includes all five reasoning levels; the main table keeps high and xhigh because max burns through the allowance too quickly for my use.",
      zh:
        "[Fable 模型最多可使用 Claude Max 共享周额度的 50%](https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan)。Fable 专用用量表已经按这份额度计算，因此新的估算不再减半。其他 Claude 模型的用量也会减少 Fable 可用的余额。基准测试耗尽五小时限额时，Fable 周用量表只有 17%；要用到每月估算的额度，需要分散到不同会话中。用量表只显示整数百分比，也无法排除没有本地日志的客户端用量。这里不计首发重置优惠。成本采用 [Fable 5.2 的 API 价格](https://platform.claude.com/docs/en/about-claude/pricing)，按每次缓存写入的有效期计价，输出 token 只计一次。图表列出全部五种推理强度；主表保留 high 和 xhigh，因为 max 对我的用法来说消耗额度太快。",
    },
    {
      en:
        "Calculations for ChatGPT, Claude, Google, and Kimi were done using my actual usage. MiMo and GLM were estimated based on my token mix (cache hit vs cache miss/cache write vs output) and their published credit rules. Tencent comes from its published credit rules alone, which for Hy4 do not depend on the token mix.",
      zh:
        "ChatGPT、Claude、Google 和 Kimi 的数字是根据我的实际用量计算的。MiMo 和 GLM 则是根据我的 token 构成（缓存命中、缓存未命中/缓存写入与输出的比例）以及它们公布的积分规则估算的。腾讯云只根据其公布的积分规则计算；对 Hy4 而言，结果与 token 构成无关。",
    },
    {
      en:
        "Kimi K3.1 Pro was measured directly from the October 28–29, 2026 tikz-bench runs: $55.46 on max, $34.89 on high and $15.28 on low, across 300 tasks and 5,290 model calls. The runs overlapped, so I pooled their usage over one quota interval. Kimi Code's monthly meter rose from 58.49% to a settled 89.27%; the separate 0.05% used by other membership features is excluded. $105.6314046 ÷ 0.3078 gives $343.18/month, or about 93 AA K3.1 Pro task equivalents. All task token totals match the request logs; the max run's missing costs were calculated from those tokens. Earlier CLI test calls preceded the baseline, and no later calls were found outside the benchmark.",
      zh:
        "Kimi K3.1 Pro 的额度直接根据 2026 年 10 月 28–29 日的 tikz-bench 测试测量：max 使用 $55.46，high 使用 $34.89，low 使用 $15.28，共 300 个任务、5,290 次模型调用。这些测试同时运行，因此按同一个额度区间合并计算。Kimi Code 的月度用量从 58.49% 上升至最终的 89.27%；其他会员功能使用的 0.05% 不计入。$105.6314046 ÷ 0.3078 得到每月 $343.18，约为 93 个 AA K3.1 Pro 任务等值。所有任务的 token 总数都与请求日志一致，max 测试缺失的成本也根据这些 token 计算。此前的 CLI 测试调用发生在起点之前，之后没有发现基准测试以外的调用。",
    },
    {
      en:
        "The K3.1 Pro estimate uses [international API prices](https://platform.kimi.ai/) of $2/M uncached input, $0.20/M cached input and $10/M output. [Mainland prices](https://platform.kimi.com/) put the same measured allowance near ¥2,270/month. The previous K3 estimate was $482.54, but its API token prices were 50% higher; repricing that earlier token mix at K3.1 rates gives $321.69. Most of the dollar change therefore reflects API pricing. This is a projection from 30.78% of one monthly quota, with no weekly-to-monthly multiplier. [Membership features share the monthly pool, and the rolling five-hour limit still applies](https://www.kimi.com/help/membership/membership-update-rules).",
      zh:
        "K3.1 Pro 的估算采用[国际 API 价格](https://platform.kimi.ai/)：每百万未缓存输入 $2、缓存输入 $0.20、输出 $10。按[中国大陆价格](https://platform.kimi.com/)，同样的实测额度约值每月 ¥2,270。此前 K3 的估算为 $482.54，但它的 API token 单价高出 50%；将当时的 token 构成按 K3.1 价格重新计算，得到 $321.69。因此，API 金额的变化主要来自价格变化。这里根据一个月度额度中已使用的 30.78% 推算，没有将周额度换算为月额度。[会员功能共享月度额度，滚动五小时限额仍然适用](https://www.kimi.com/help/membership/membership-update-rules)。",
    },
    {
      en:
        "Tencent's $103/month [Token Plan Max](https://www.tencentcloud.com/act/pro/tokenhub) gives 15,900 credits a month, with no five-hour or weekly limit; unused credits expire. [Hy4 deducts](https://intl.cloud.tencent.com/document/product/1300/81316) 130.313 credits per million uncached input tokens, 390.781 per million output tokens and 6.563 per million cache hits. That is exactly 156.25 credits per dollar at [Hy4's list API prices](https://www.tencentcloud.com/document/product/1300/78937) of $0.834, $2.501 and $0.042, whatever the token mix, so the plan buys $101.76 of Hy4 a month, slightly less than its price. Two promotions are left out: until November 17, 2026, Hy4 costs about a quarter of the credits; until December 31, 2026, pay-as-you-go Hy4 is half price, so buying through the API directly gets about twice as much.",
      zh:
        "腾讯云每月 $103 的 [Token Plan Max](https://www.tencentcloud.com/act/pro/tokenhub) 每月提供 15,900 积分，没有五小时或周限额；未用完的积分不结转。[Hy4 的扣减标准](https://intl.cloud.tencent.com/document/product/1300/81316)是每百万未缓存输入 token 130.313 积分、每百万输出 token 390.781 积分、每百万缓存命中 6.563 积分。按 [Hy4 的 API 刊例价](https://www.tencentcloud.com/document/product/1300/78937)（$0.834、$2.501、$0.042）计算，无论 token 构成如何，都正好是每美元 156.25 积分，所以这个套餐每月能买到 $101.76 的 Hy4 用量，略低于套餐价格。这里没有计入两项优惠：2026 年 11 月 17 日前，Hy4 的积分消耗约为四分之一；2026 年 12 月 31 日前，按量付费的 Hy4 打五折，直接通过 API 购买大约能多一倍。",
    },
    {
      en:
        "Gemini 4 Carbon High was measured from the November 10–11 tikz-bench run. Its 100 task records contain 11,094,229 uncached input tokens, 20,991,410 cache reads and 8,105,486 output tokens, including thinking. Those total $210.684918 at standard API rates. Three resumed attempts were reconciled once, and the timed-out task's reported partial usage is included. The shared Gemini weekly meter rose from 11.13656% to a later stable 67.69293%, a 56.55636-point increase with the same reset date. $210.684918 ÷ 0.5655636489391327 × (365 ÷ 12 ÷ 7) gives $1,618.70/month, or about 209 [AA Carbon High task equivalents](https://artificialanalysis.ai/models/releases/gemini-4-carbon). The chart includes low and medium too, applying the High workload's API-value estimate; their subscription usage was not measured separately.",
      zh:
        "Gemini 4 Carbon High 根据 11 月 10–11 日的 tikz-bench 测试估算。100 个任务记录包含 11,094,229 个未缓存输入 token、20,991,410 个缓存读取和 8,105,486 个输出 token（已含思考），按标准 API 单价共值 $210.684918。三次恢复尝试已合并去重，超时任务报告的部分用量也计入。共享 Gemini 周用量表从 11.13656% 升至之后保持稳定的 67.69293%，增加 56.55636 个百分点，重置日期相同。$210.684918 ÷ 0.5655636489391327 ×（365 ÷ 12 ÷ 7）得到每月 $1,618.70，约为 209 个 [AA Carbon High 任务等值](https://artificialanalysis.ai/models/releases/gemini-4-carbon)。图表也列出 low 和 medium，沿用 High 工作构成的 API 等值估算；没有单独测量它们的订阅用量。",
    },
    {
      en:
        "The Google plan uses [standard global API rates](https://cloud.google.com/model-garden/pricing): $4/M uncached input, $0.20/M cache reads and $20/M output, with thinking counted once. Temporary API promotions are excluded. AA's task costs use the same standard pricing basis.",
      zh:
        "Google 套餐采用[标准全球 API 单价](https://cloud.google.com/model-garden/pricing)：每百万未缓存输入 $4、缓存读取 $0.20、输出 $20，思考 token 只计一次。不计限时 API 优惠，AA 单任务成本也采用相同的标准价格。",
    },
    {
      en:
        "This Carbon estimate extrapolates part of one week and assumes the measured quota change belongs to the recorded workload. The meter peaked at 69.27155% before falling to its later stable value; the reason is unverified. Using the peak instead gives $1,574.74/month. Checked local logs supplied no other direct Gemini activity in the interval, but activity elsewhere and overage billing remain unverified. The [five-hour and shared weekly limits](https://antigravity.google/docs/cli/commands/usage) still apply. The Google plan now uses Carbon throughout the table and chart. The monthly value projects the observed workload.",
      zh:
        "Carbon 的估算根据一周中的部分用量推算，并假设测量到的额度变化来自已记录的工作。用量表曾升至 69.27155%，之后回落并保持稳定，原因尚未验证；若采用最高读数，每月推算为 $1,574.74。检查的本地日志中没有发现该区间内其他直接 Gemini 调用，但其他地方的用量和超额计费仍未验证。[五小时和共享周限额](https://antigravity.google/docs/cli/commands/usage)仍然适用。Google 套餐的表格和图表现在统一使用 Carbon。这个数字根据实际工作构成推算。",
    },
    {
      en:
        "GLM-5.3-Flash has its own API value because [GLM charges it a third of GLM-5.3's credits](https://docs.z.ai/devpack/overview): 2.3, 0.56 and 8 credits per 10,000 cache-miss, cache-hit and output tokens, against 6.9, 1.7 and 24. Applied to the same token mix, schedule and 60,000 weekly credits as GLM-5.3, that is $193.73/month at [Flash's API prices](https://docs.z.ai/guides/overview/pricing) of $0.15/M input, $0.03/M cached input and $0.50/M output, the prices AA also uses. Flash's API prices are about a ninth of GLM-5.3's, so the same quota is worth fewer API dollars on Flash, but it buys about three times as many AA tasks.",
      zh:
        "GLM-5.3-Flash 有自己的 API 等值，因为 [GLM 对它只收 GLM-5.3 三分之一的积分](https://docs.z.ai/devpack/overview)：每 10,000 个缓存未命中、缓存命中和输出 token 分别扣 2.3、0.56 和 8 积分，而 GLM-5.3 是 6.9、1.7 和 24。按与 GLM-5.3 相同的 token 构成、使用时段和每周 60,000 积分计算，按 [Flash 的 API 价格](https://docs.z.ai/guides/overview/pricing)（每百万输入 $0.15、缓存输入 $0.03、输出 $0.50，与 AA 采用的价格相同）每月值 $193.73。Flash 的 API 价格约为 GLM-5.3 的九分之一，所以同样的额度换成 Flash 对应的 API 金额更少，但能完成的 AA 任务约为三倍。",
    },
    {
      en:
        "Codex Pro 100 uses twice the October 16 measured API value, following [OpenAI's October 29 allowance increase](https://x.com/thsottiaux/status/2115850175868727621). This assumes API value scales with the allowance; I have not measured it again since the increase.",
      zh:
        "根据 [OpenAI 10 月 29 日的额度更新](https://x.com/thsottiaux/status/2115850175868727621)，Codex Pro 100 的 API 等值按 10 月 16 日实测值的 200% 计算。这里假设 API 等值与额度成正比；额度更新后尚未重新测量。",
    },
    {
      en:
        "My understanding is that it is not actually a good idea to run Astra or any Anthropic model on max, so I put in xhigh for Astra, Opus 5.5 and Sonnet 5.5, and for Sol as well. Fable 5.2 has high and xhigh entries. I also included GPT-6.1 Terra and Sonnet 5.5, whose API prices are half those of Sol and Opus, and GLM-5.3-Flash, which uses a third of GLM-5.3's credits. Otherwise, I included only the highest-scoring model for each subscription.",
      zh:
        "据我了解，用 max 跑 Astra 或任何 Anthropic 模型其实都不是好主意，所以我给 Astra、Opus 5.5 和 Sonnet 5.5 加上了 xhigh，Sol 也一样。Fable 5.2 列出了 high 和 xhigh。我还列出了 GPT-6.1 Terra 和 Sonnet 5.5，它们的 API 价格只有 Sol 和 Opus 的一半，以及积分消耗只有 GLM-5.3 三分之一的 GLM-5.3-Flash。除此之外，每个订阅只列出了得分最高的模型。",
    },
    {
      en:
        "Fable 5.2 and GLM-5.3-Flash have their own API values. Fable 5.1 retains the untested projection of half the general Claude value for its weekly cap. Other chart models use their subscription's full API value, assuming equal API-dollar value across models; this is untested for models I did not run, including Haiku 5.5 and Luna. Carbon's AA figures were checked November 12 and Fable 5.2's November 10 on Index v5.0.1; other models retain the November 7 snapshot. MiMo and GLM points move with the timing sliders.",
      zh:
        "Fable 5.2 和 GLM-5.3-Flash 有自己的 API 等值。Fable 5.1 保留尚未验证的推算，按周限额使用普通 Claude 等值的一半。图表中的其他模型使用各自订阅的完整 API 等值，假设各模型的额度对应相同的 API 金额；对于没有实际测试的模型（包括 Haiku 5.5 和 Luna），这一点尚未验证。Carbon 的 AA 数据于 11 月 12 日核对，Fable 5.2 则为 11 月 10 日，均采用 Index v5.0.1；其他模型保留 11 月 7 日的数据。MiMo 和 GLM 的点会随使用时段滑块移动。",
    },
  ],
};
