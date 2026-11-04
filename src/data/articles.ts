import { ArticleBrief } from '@/types';

/**
 * 通用选购指南（共 10 篇，每篇正文是 src/content/guides/ 下的一个组件）。
 * 规则：
 * 1. 一个 URL 只回答一个主要问题；同意图的页面合并，旧地址在 next.config.ts 里统一 301。
 * 2. 落地页“精选指南”区块展示前 6 篇（EditorialArticlesSection），后 4 篇预算与购买核对类指南在同一区块下方单独列出。
 * 3. 数字只来自价格表（src/data/guideStats.ts 现算）或有出处的公式；没有来源的比例、统计和第三方内部机制不写。
 * 4. 本文件会被客户端组件引用，不要在这里导入价格表，也不要写会过期的具体价格。
 */
export const ARTICLES: ArticleBrief[] = [
  {
    slug: "how-to-choose",
    priority: "P0",
    title: "机场怎么选：从预算、规则到售后的五步排除法",
    primary_question: "第一次买机场，或者要换机场时，应该按什么顺序核对，才能在付款前排除不合适的选项？",
    primary_keyword_candidate: "机场怎么选、机场购买避坑、选机场看什么",
    supporting_questions: [
      "第一步为什么只买月付？",
      "客户端和同时在线设备数要核对什么？",
      "倍率、重置口径和结转规则去哪里查？"
    ],
    target_reader: "初次购买出海网络、或刚经历不稳定服务商的新手与普通用户",
    conclusion_scope: "给出预算、客户端与设备、倍率与重置、分流与 DNS、售后与条款五步核对法，附核对表和可以直接排除的情形；价格数字取自本站价格表。",
    required_evidence: "本站价格表中各家的入门月付、年付折扣和备注里写明的重置规则；各家服务条款需要读者自行核对。",
    calculation_or_comparison: "入门月付的价格区间与年付的折扣区间（都由价格表算出），说明首期只买月付与整年预付的风险差异。",
    limitations: [
      "本文不提供排名，只提供核对顺序；",
      "本站没有测速数据，实际资费与条款以各品牌结算页为准。"
    ],
    internal_links: [
      { label: "月付年付怎么选", href: "/guides/billing-and-traffic-rules/" },
      { label: "每 GB 成本怎么算", href: "/guides/cost-per-gb/" },
      { label: "订阅与客户端", href: "/guides/subscription-and-client/" },
      { label: "购买前核对清单", href: "/guides/refund-and-purchase-checklist/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "billing-and-traffic-rules",
    priority: "P0",
    title: "月付机场和年付机场怎么选：折扣、额度重置与一次性流量包",
    primary_question: "月付、年付和一次性流量包，在折扣、预付风险和额度规则上有什么区别？",
    primary_keyword_candidate: "月付机场和年付机场怎么选、不限时流量包、机场流量重置",
    supporting_questions: [
      "年付比连付 12 个月的月付便宜多少？",
      "额度是按购买日刷新，还是每月 1 日重置？",
      "没用完的流量能不能结转？"
    ],
    target_reader: "在年付折扣与预付风险之间权衡、对额度重置和结转有疑虑的谨慎买家",
    conclusion_scope: "用价格表算出季付、半年付、年付、两年付、三年付的折扣，说明预付风险，并讲清重置、结转、一次性流量包和倍率要核对什么。",
    required_evidence: "本站价格表中各付款周期的实付金额，以及备注里写明的刷新、重置、结转规则。",
    calculation_or_comparison: "折扣 = 实付 ÷（月付 × 月数），只比较同品牌同套餐名；一次性流量包每 GB 与入门月付每 GB 的倍数。",
    limitations: [
      "不同服务商的重置时间点不同，购买前要确认结算页说明；",
      "一次性流量包的有效期各家写法不同，服务商提前停止服务时，未用完的额度无法追回。"
    ],
    internal_links: [
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "每 GB 成本怎么算", href: "/guides/cost-per-gb/" },
      { label: "偶尔使用怎么选", href: "/guides/occasional-use/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "ai-users",
    priority: "P0",
    title: "ChatGPT、Claude 用什么机场：AI 工具的出口地区核对与十分钟自测",
    primary_question: "主要用 ChatGPT、Claude、Gemini 的人，付款前后该怎么确认一家机场能不能用？",
    primary_keyword_candidate: "AI 机场推荐、ChatGPT 用什么机场、Claude 节点要求、AI 工具怎么选机场",
    supporting_questions: [
      "节点名称里的地区，和实际出口地区一样吗？",
      "长回答中途出现 Network Error，该怎么排查？",
      "按价格表，实付最低的档位有哪些？"
    ],
    target_reader: "以 ChatGPT、Claude、Gemini 等 AI 工具为主要用途的个人用户、开发者和办公人员",
    conclusion_scope: "给出出口地区、出口 IP、长回答稳定性、固定出口四项核对，附十分钟自测表和价格表里实付最低的档位；不替任何品牌承诺 AI 可用性。",
    required_evidence: "站长提供的灵动云 2026-11-01 延迟与解锁检测记录（含 OpenAI 一项）；本站价格表；读者自测的记录。",
    calculation_or_comparison: "入门月付与最低年付按实付排序，只比较价格，不代表 AI 可用性。",
    limitations: [
      "AI 平台的地区政策和验证规则不公开，也会变化，本文只提供核对方法；",
      "本站没有测试任何品牌在 AI 网站上的登录和长对话，唯一的检测记录只覆盖一家品牌、一个网络、一天。"
    ],
    internal_links: [
      { label: "套餐匹配器", href: "/tools/plan-finder/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "订阅与客户端", href: "/guides/subscription-and-client/" },
      { label: "测速图怎么看", href: "/guides/reading-speed-tests/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "cost-per-gb",
    priority: "P0",
    title: "每 GB 成本怎么算：名义单价、真实单价与倍率折算",
    primary_question: "标称的每 GB 单价为什么不等于你的真实成本，怎么按自己的用量算出真实单价？",
    primary_keyword_candidate: "机场每GB成本怎么算、真实单价折算、流量倍率计算",
    supporting_questions: [
      "只用到额度的一部分时，真实单价会涨多少？",
      "倍率 3 的节点，会把 200GB 的额度缩成多少？",
      "年付和一次性流量包的单价该怎么比？"
    ],
    target_reader: "追求高性价比、想自己动手算清楚单价的精明买家",
    conclusion_scope: "给出名义单价、真实单价、倍率换算三个公式，用价格表里的真实套餐演示不同用量下的真实单价，并说明年付和一次性流量包对单价的影响。",
    required_evidence: "本站价格表中的实付金额、每月额度和备注；文中的用量档位是假设，页面里已写明。",
    calculation_or_comparison: "真实单价 = 实付 ÷ 实际用量；能传输的数据量 = 标称额度 ÷ 倍率；闲置浪费率 =（标称额度 − 实际用量）÷ 标称额度。",
    limitations: [
      "零用量时真实单价没有意义，需要以最低月租衡量；",
      "单价只是一项指标，延迟、稳定性和售后本站没有测试数据，不能由单价推断。"
    ],
    internal_links: [
      { label: "月付年付怎么选", href: "/guides/billing-and-traffic-rules/" },
      { label: "在线折算工具", href: "/tools/cost-per-gb/" },
      { label: "套餐匹配器", href: "/tools/plan-finder/" },
      { label: "性价比机场怎么选", href: "/guides/value-for-money/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "reading-speed-tests",
    priority: "P1",
    title: "机场测速图怎么看：别把单次晚高峰跑满当成日常可用",
    primary_question: "网上流传的测速图能说明什么、说明不了什么，怎样自己做一次可复核的测试？",
    primary_keyword_candidate: "机场测速图怎么看、晚高峰稳定性、延迟与丢包率",
    supporting_questions: [
      "多线程跑分和日常单线程体验为什么不一样？",
      "握手延迟和整体延迟有什么区别？",
      "丢包率为什么比带宽更伤交互体验？"
    ],
    target_reader: "被各种测速截图绕晕、想看懂测速图的进阶用户",
    conclusion_scope: "说明多线程跑分、握手延迟与整体延迟的区别、三个常用测速站测的是什么、丢包对单连接速度的影响（经验公式估算），并给出晚间测试的四项记录规范。",
    required_evidence: "站长提供的灵动云 2026-11-01 延迟检测记录；Mathis 等 1997 年的 TCP 吞吐经验公式（模型估算，不是实测）。",
    calculation_or_comparison: "单条连接的速度上限 ≈ 1.22 × MSS ÷（RTT × √丢包率），在不同 RTT 和丢包率下的取值。",
    limitations: [
      "本站不发布缺少测试环境参数的测速截图，也不编造没有测过的品牌数据；",
      "单次测速不能代表长期服务质量。"
    ],
    internal_links: [
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "AI 用户怎么选", href: "/guides/ai-users/" },
      { label: "编辑政策说明", href: "/editorial-policy/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "subscription-and-client",
    priority: "P1",
    title: "机场订阅与客户端配置：系统代理、TUN 模式分流与订阅转换安全边界",
    primary_question: "买了机场订阅后为什么不能直接出海，客户端怎么分流，第三方订阅转换有什么风险？",
    primary_keyword_candidate: "机场订阅和客户端区别、买了机场怎么用、订阅转换安全、TUN 模式",
    supporting_questions: [
      "订阅链接里的密钥是什么，泄露了会怎样？",
      "系统代理和 TUN 模式接管流量的范围有什么不同？",
      "为什么不建议用在线订阅转换网站？"
    ],
    target_reader: "刚接触出海网络软件、对客户端配置感到困惑的多平台使用者",
    conclusion_scope: "说明服务商与客户端的分工、订阅链接为什么要当密码保管、系统代理与 TUN 的区别和订阅转换的风险，并给出四步上手流程；不推荐具体软件。",
    required_evidence: "各开源客户端项目的官方页面和文档（读者以官方页面为准）；本站没有逐个测试客户端。",
    calculation_or_comparison: "对比系统代理与 TUN 的接管范围；对比导入服务商原生链接与第三方在线转换的密钥暴露面。",
    limitations: [
      "本站不提供未经授权的客户端安装包下载；",
      "不同系统版本的权限和虚拟网卡兼容性以操作系统官方文档为准。"
    ],
    internal_links: [
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "AI 用户怎么选", href: "/guides/ai-users/" },
      { label: "月付年付怎么选", href: "/guides/billing-and-traffic-rules/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "value-for-money",
    priority: "P0",
    title: "性价比机场怎么选：按用量算每 GB 单价，再看付款风险和规则",
    primary_question: "想花最少的钱买到够用、规则靠谱的机场，该怎么比较？",
    primary_keyword_candidate: "性价比机场、高性价比机场推荐、便宜翻墙、实惠机场",
    supporting_questions: [
      "每月 100GB、300GB、500GB 以上，各自哪些档位每 GB 最低？",
      "月付 20 元、30 元，或年付 100 元、250 元以内有哪些选择？",
      "年付、两年付的折扣值不值得预付？"
    ],
    target_reader: "希望在够用的前提下把钱花得最省的普通用户，以及被“便宜翻墙”广告吸引的新手",
    conclusion_scope: "把性价比拆成每 GB 单价、流量是否够用和付款风险三个因子，按用量档位和预算分别列出每 GB 最低的档位，并说明便宜套餐常见的坑。",
    required_evidence: "本站价格表中各档位的每 GB 单价；前排品牌主力档位的折扣阶梯；套餐规则资料。",
    calculation_or_comparison: "按用量档位（100–200GB、300–450GB、500GB 以上）和预算（月付 20 元、30 元以内，年付 100 元、250 元以内）按每 GB 单价排序；折扣阶梯 = 实付 ÷（月付 × 月数）。",
    limitations: [
      "单价按标称流量计算，按本站口径 1 倍率；",
      "本站没有测试速度与稳定性，“划算”只指价格与规则。"
    ],
    internal_links: [
      { label: "套餐匹配器", href: "/tools/plan-finder/" },
      { label: "便宜机场怎么比较", href: "/guides/low-budget-plans/" },
      { label: "每 GB 成本怎么算", href: "/guides/cost-per-gb/" }
    ],
    read_time_minutes: 8,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "low-budget-plans",
    priority: "P2",
    title: "便宜机场怎么比较：按明确预算核对付款与额度",
    primary_question: "月预算 15 元、年预算 100 元以内，价格表里有哪些有资料的选择？",
    primary_keyword_candidate: "便宜机场、低价机场、平价机场推荐",
    supporting_questions: [
      "月付 15 元以内、年付 100 元以内、一次性流量包 130 元以内各有哪些档位？",
      "低价套餐通常在哪些地方妥协？",
      "怎么避开“几块钱一年”的坑？"
    ],
    target_reader: "预算很紧、想找最低可用成本的学生和上班族",
    conclusion_scope: "列出价格表里符合三个预算口径的全部档位，按实付从低到高，附每月流量、每 GB 单价和备注，并写出低价套餐的妥协点，不隐藏。",
    required_evidence: "本站价格表中月付 15 元以内、年付 100 元以内、一次性流量包 130 元以内的全部档位。",
    calculation_or_comparison: "三张表都按实付从低到高；每 GB 单价 = 实付 ÷ 标称总流量；年付另列折合月价。",
    limitations: [
      "三个预算口径是本站设定的比较标准，不是行业定义；",
      "表格只收录本站价格表里的品牌，不推断未收录品牌的低价是否可靠。"
    ],
    internal_links: [
      { label: "首页套餐对比", href: "/#plans" },
      { label: "性价比机场怎么选", href: "/guides/value-for-money/" },
      { label: "购买前核对清单", href: "/guides/refund-and-purchase-checklist/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "occasional-use",
    priority: "P1",
    title: "偶尔使用怎么选：付款周期与流量保留规则",
    primary_question: "轻度或偶尔出海的用户，怎样选才能避免每个月“白交月租”？",
    primary_keyword_candidate: "偶尔使用机场怎么选、不限时流量包、备用机场推荐",
    supporting_questions: [
      "每月只查几次资料，买月付划算吗？",
      "一次性流量包单价高，什么时候才比年付小包更合适？",
      "备用机场应该怎么维护？"
    ],
    target_reader: "出海频率低、主要用于查资料、收邮件或当备用的轻度用户",
    conclusion_scope: "按价格表的最低价比较按月买、年付小包、一次性流量包三种低频方案在一年用 1、2、3、6、12 个月时的总支出，说明流量包的有效期要先看，以及备用机场怎么维护。",
    required_evidence: "本站价格表中的最低月付、最低年付和最便宜的一次性流量包，以及备注里写明的有效期。",
    calculation_or_comparison: "一年总支出：按月买 = 月数 × 月付，年付小包和一次性包 = 一次付清；假设每次用的那个月流量不超过月付档额度。",
    limitations: [
      "一次性流量包的服务商如果提前停止服务，未用完的额度无法追回；",
      "不能因为写着“不限时”就买超大容量，有效期和长期不登录是否清理账号要看条款。"
    ],
    internal_links: [
      { label: "月付年付怎么选", href: "/guides/billing-and-traffic-rules/" },
      { label: "每 GB 成本怎么算", href: "/guides/cost-per-gb/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "refund-and-purchase-checklist",
    priority: "P0",
    title: "购买机场前的核对清单：付款、退款与限制",
    primary_question: "点击最终支付按钮之前，必须核对哪五项关键条件？",
    primary_keyword_candidate: "机场购买前看什么、机场退款规则、机场能用几台设备",
    supporting_questions: [
      "服务商是否支持退款？有没有天数限制或手续费？",
      "同时在线的设备数怎么界定？",
      "使用限制和违规处理在哪里看？"
    ],
    target_reader: "准备付款、想避开不利条款和无法退款风险的谨慎用户",
    conclusion_scope: "提供五项可打勾的付款前核对清单：实付金额与周期、退款条款、设备倍率限速、流量规则、使用限制；这是资料核对，不是法律意见。",
    required_evidence: "本站价格表里各套餐的退款条款资料（目前没有写明的）；读者需要自己到服务条款原文核对。",
    calculation_or_comparison: "对比全额无理由退款、按使用量扣减退款和明确不可退款三类条款的写法。",
    limitations: [
      "本文是选购核对指南，不具备法律维权背书功能；",
      "退款政策未知的统一标记为“未确认”，不承诺可退款。"
    ],
    internal_links: [
      { label: "月付年付怎么选", href: "/guides/billing-and-traffic-rules/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  }
];

export function getArticleBySlug(slug: string): ArticleBrief | undefined {
  return ARTICLES.find(a => a.slug === slug);
}
