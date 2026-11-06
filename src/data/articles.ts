import { ArticleBrief } from '@/types';

/**
 * 指南与教程（每篇正文是 src/content/guides/ 下的一个组件；2026-11-06 起按分类补充，分类见 src/data/categories.ts）。
 * 规则：
 * 1. 一个 URL 只回答一个主要问题；同意图的页面合并，旧地址在 next.config.ts 里统一 301。
 * 2. 首页展示“热门教程”（编辑排序）和“最近更新”，全部文章在 /guides/ 索引页和各分类页，不再要求每篇都从首页直达。
 * 3. 数字只来自价格表（src/data/guideStats.ts 现算）或有出处的公式；没有来源的比例、统计和第三方内部机制不写。
 * 4. 本文件会被客户端组件引用，不要在这里导入价格表，也不要写会过期的具体价格。
 */
export const ARTICLES: ArticleBrief[] = [
  {
    slug: "how-to-choose",
    category: "buying",
    summary: "按预算、客户端与设备、倍率与重置、分流与 DNS、售后五步，付款前先排除不合适的选项。",
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
      { label: "购买前核对清单", href: "/guides/refund-and-purchase-checklist/" },
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "多设备家庭怎么选", href: "/guides/multi-device-plans/" },
      { label: "机场是什么", href: "/guides/what-is-an-airport/" },
      { label: "一个月要多少流量", href: "/guides/how-much-traffic-per-month/" },
      { label: "优惠码用不了怎么办", href: "/guides/coupon-not-working/" },
      { label: "换机场怎么迁移", href: "/guides/switch-airport-checklist/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "billing-and-traffic-rules",
    category: "buying",
    summary: "用价格表算出各付款周期的折扣，讲清额度重置、结转、一次性流量包和倍率。",
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
      { label: "偶尔使用怎么选", href: "/guides/occasional-use/" },
      { label: "一个月要多少流量", href: "/guides/how-much-traffic-per-month/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "ai-users",
    category: "buying",
    summary: "给 ChatGPT、Claude、Gemini 用户：出口地区、IP 类型、连接稳定和固定出口怎么核对。",
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
    category: "buying",
    summary: "名义单价和真实单价怎么算，倍率和付款周期怎样改变每 GB 成本。",
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
      { label: "性价比机场怎么选", href: "/guides/value-for-money/" },
      { label: "一个月要多少流量", href: "/guides/how-much-traffic-per-month/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "reading-speed-tests",
    category: "speed-lab",
    summary: "看懂延迟、丢包、多线程跑分和晚高峰测速图，分清它们各说明什么。",
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
      { label: "编辑政策说明", href: "/editorial-policy/" },
      { label: "测速实验室方法", href: "/guides/speed-lab-method/" },
      { label: "IPLC 和 IEPL 的区别", href: "/guides/iplc-vs-iepl/" },
      { label: "自己动手测机场", href: "/guides/test-airport-yourself/" },
      { label: "晚高峰对比测试怎么设计", href: "/guides/peak-hour-test-design/" },
      { label: "解锁检测怎么读", href: "/guides/read-unlock-test-results/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "subscription-and-client",
    category: "clients",
    summary: "订阅链接是什么、客户端和机场各管什么、系统代理与 TUN 的区别、订阅维护习惯。",
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
      { label: "月付年付怎么选", href: "/guides/billing-and-traffic-rules/" },
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "Windows 用机场", href: "/guides/windows-client-guide/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "机场常用名词表", href: "/guides/airport-glossary/" },
      { label: "全局、规则、直连", href: "/guides/global-rule-direct-mode/" },
      { label: "节点列表拉不下来、订阅更新失败", href: "/guides/subscription-update-failed/" },
      { label: "换机场怎么迁移", href: "/guides/switch-airport-checklist/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-04",
    status: "published"
  },
  {
    slug: "value-for-money",
    category: "buying",
    summary: "把性价比拆成单价、够用、风险三个因子，按用量和预算挑每 GB 最低的档位。",
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
      "单价按标称流量计算，不按倍率折算；",
      "本站没有测试速度与稳定性，“划算”只指价格与规则。"
    ],
    internal_links: [
      { label: "套餐匹配器", href: "/tools/plan-finder/" },
      { label: "便宜机场怎么比较", href: "/guides/low-budget-plans/" },
      { label: "每 GB 成本怎么算", href: "/guides/cost-per-gb/" },
      { label: "一个月要多少流量", href: "/guides/how-much-traffic-per-month/" }
    ],
    read_time_minutes: 8,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "low-budget-plans",
    category: "buying",
    summary: "月付 ¥15、年付 ¥100、流量包 ¥130 以内的全部档位，附每 GB 单价和妥协点。",
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
      { label: "购买前核对清单", href: "/guides/refund-and-purchase-checklist/" },
      { label: "一个月要多少流量", href: "/guides/how-much-traffic-per-month/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "occasional-use",
    category: "buying",
    summary: "偶尔才用：按月买、年付小包和一次性流量包，一年用几个月各花多少钱。",
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
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "refund-and-purchase-checklist",
    category: "buying",
    summary: "付款前五项核对、退款条款三种写法、付款后当天要做的三件事。",
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
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "多设备家庭怎么选", href: "/guides/multi-device-plans/" },
      { label: "优惠码用不了怎么办", href: "/guides/coupon-not-working/" },
      { label: "换机场怎么迁移", href: "/guides/switch-airport-checklist/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-04",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "first-time-setup",
    category: "beginner",
    summary: "八步走完：选月付、记订单、确认连接方式、官网下载官方客户端、账号登录、选节点、测两个网站、记起点。",
    priority: "P0",
    title: "第一次用机场：从购买到连上的八步流程",
    primary_question: "第一次买机场，从付款到真正连上，应该按什么顺序做，哪几步最容易出错？",
    meta_description: "第一次用机场的八步流程：选月付、记订单、确认连接方式、只从官网下载官方客户端、账号登录、选节点、测两个网站，每步附检查点。",
    primary_keyword_candidate: "第一次用机场、机场怎么用、机场使用教程",
    supporting_questions: [
      "付款后先做什么？",
      "用官方客户端还是订阅链接？",
      "连上以后怎么确认真的可用？"
    ],
    target_reader: "刚买了机场、或准备第一次买的新手",
    conclusion_scope: "给出从购买到连上的八步顺序、每一步的检查点和最容易出错的五件事；不涉及某个客户端的界面细节。",
    required_evidence: "站长提供的机场资料里各家的使用方式、订阅链接和第三方客户端写法（统计自 34 家）；通用操作流程；不含测速数据。",
    calculation_or_comparison: "无计算；按“检查点通过再进入下一步”的顺序排查。",
    limitations: [
      "客户端界面会随版本变化，按钮名称以客户端官方说明为准；",
      "连上只说明代理通了，不说明速度和稳定性合格，本站没有测速数据。"
    ],
    internal_links: [
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "订阅与客户端配置", href: "/guides/subscription-and-client/" },
      { label: "Windows 用机场", href: "/guides/windows-client-guide/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "套餐匹配器", href: "/tools/plan-finder/" },
      { label: "机场是什么", href: "/guides/what-is-an-airport/" },
      { label: "Mac 用机场", href: "/guides/macos-client-guide/" },
      { label: "安卓用机场", href: "/guides/android-client-guide/" },
      { label: "iPhone 和 iPad 用机场", href: "/guides/ios-client-guide/" },
      { label: "全局、规则、直连", href: "/guides/global-rule-direct-mode/" },
      { label: "节点列表拉不下来、订阅更新失败", href: "/guides/subscription-update-failed/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "windows-client-guide",
    category: "clients",
    summary: "Windows 上怎么找官方客户端、安全下载安装、账号登录连接，以及系统代理和 TUN 怎么选。",
    priority: "P0",
    title: "Windows 用机场：官方客户端怎么下载、登录和排错",
    primary_question: "在 Windows 上用机场，官方客户端怎么找、怎么安全下载和登录，第一次运行要注意什么？",
    meta_description: "在 Windows 上用机场：先确认服务商有 Windows 客户端，只从官网下载并核对校验值，登录连接，系统代理和 TUN 怎么选，服务商给订阅链接时怎么办。",
    primary_keyword_candidate: "Windows 机场客户端、机场电脑怎么用、机场官方客户端下载",
    supporting_questions: [
      "服务商没写支持 Windows 怎么办？",
      "系统代理和 TUN 有什么区别？",
      "下载客户端怎么避免装到假软件？"
    ],
    target_reader: "用 Windows 电脑、刚买了机场的读者",
    conclusion_scope: "给出确认官方客户端、安全下载安装、登录连接、系统代理与 TUN 的区别和首次运行常见问题；服务商提供订阅链接时的处理放在最后。",
    required_evidence: "站长提供的机场资料里各家的使用方式和支持系统（统计自 34 家）；通用操作说明；不引用任何客户端的测试数据。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "客户端会更新，界面和按钮以官方版本为准；",
      "本站没有逐个测试客户端，也不提供安装包。"
    ],
    internal_links: [
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "订阅与客户端配置", href: "/guides/subscription-and-client/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "Mac 用机场", href: "/guides/macos-client-guide/" },
      { label: "安卓用机场", href: "/guides/android-client-guide/" },
      { label: "iPhone 和 iPad 用机场", href: "/guides/ios-client-guide/" },
      { label: "全局、规则、直连", href: "/guides/global-rule-direct-mode/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "all-nodes-timeout",
    category: "troubleshooting",
    summary: "全部节点同时超时：从换网络、关冲突软件、校对时间到刷新节点列表，七步一次只改一项。",
    priority: "P0",
    title: "机场节点全部超时怎么办：七步排查顺序",
    primary_question: "客户端里所有节点都超时，应该按什么顺序排查，什么时候该联系服务商？",
    meta_description: "客户端里所有节点都超时：先分清全部还是部分，再按换网络、关冲突软件、校对系统时间、刷新节点列表、升级官方客户端、查套餐的七步顺序排查。",
    primary_keyword_candidate: "机场节点全部超时、机场连不上、节点超时怎么办",
    supporting_questions: [
      "怎么区分全部超时和部分超时？",
      "系统时间不对会导致连不上吗？",
      "联系服务商时要带哪些信息？"
    ],
    target_reader: "突然连不上、所有节点都显示超时的用户",
    conclusion_scope: "给出七步排查顺序、各步的判断依据、结果对照表和联系服务商时要带的信息；不判断任何服务商的可用性。",
    required_evidence: "V2Fly 项目官方文档中关于 VMess 时间差的说明（客户端与服务器相差不超过 90 秒，查阅于 2026-11-06）；其余为通用排查流程。",
    calculation_or_comparison: "无计算；每步只改一项，做完再测。",
    limitations: [
      "客户端的按钮名称以你使用的版本为准；",
      "只有部分协议对时间敏感，时间校对不是所有情况下的原因。"
    ],
    internal_links: [
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "订阅与客户端配置", href: "/guides/subscription-and-client/" },
      { label: "Windows 用机场", href: "/guides/windows-client-guide/" },
      { label: "机场测速报告怎么看", href: "/guides/reading-speed-tests/" },
      { label: "节点列表拉不下来、订阅更新失败", href: "/guides/subscription-update-failed/" },
      { label: "能连上却打不开或很慢", href: "/guides/connected-but-slow-or-blocked/" },
      { label: "手机上用着用着就断", href: "/guides/mobile-keeps-disconnecting/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "iplc-vs-iepl",
    category: "routes",
    summary: "IPLC 和 IEPL 的含义和区别，写了专线能说明什么、不能说明什么，读线路宣传要追问的五件事。",
    priority: "P0",
    title: "IPLC 和 IEPL 有什么区别：机场“专线”宣传怎么读",
    primary_question: "机场宣传里的 IPLC 和 IEPL 分别是什么，它们能说明什么、不能说明什么？",
    meta_description: "解释 IPLC 和 IEPL 的含义与区别，统计站内各家资料里的线路写法，并说明写了专线不能证明什么、读线路宣传时该追问哪五件事。",
    primary_keyword_candidate: "IPLC IEPL 区别、机场专线是什么、IEPL 是什么",
    supporting_questions: [
      "写了专线为什么还会慢？",
      "站内各家的线路是怎么写的？",
      "读线路宣传要追问什么？"
    ],
    target_reader: "看不懂机场线路宣传、想判断专线标注含义的读者",
    conclusion_scope: "解释 IPLC 与 IEPL 的定义和区别，统计站内各家资料里的线路标注，并给出读宣传时的追问清单；不对任何品牌的线路质量下结论。",
    required_evidence: "运营商和代理商的公开产品介绍（查阅于 2026-11-06，均为销售资料，只用于解释术语）；站内各家的线路标注取自站长提供的机场资料。",
    calculation_or_comparison: "按资料里的线路标注文字分类计数；不是测试结果。",
    limitations: [
      "线路标注是品牌自己的写法，本站没有测试过任何线路；",
      "定义因运营商产品不同而有差异，具体以供应商合同为准。"
    ],
    internal_links: [
      { label: "机场测速报告怎么看", href: "/guides/reading-speed-tests/" },
      { label: "测速实验室", href: "/speed-lab/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "BGP、CN2 GIA、9929", href: "/guides/bgp-cn2-9929-explained/" },
      { label: "入口和出口", href: "/guides/entry-and-exit-nodes/" },
      { label: "节点地区怎么选", href: "/guides/choose-node-region/" },
      { label: "自己动手测机场", href: "/guides/test-airport-yourself/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "speed-lab-method",
    category: "speed-lab",
    summary: "一次测试要记录的七项内容，以及用灵动云真实记录演示怎么读、怎么判断别人的测速结果。",
    priority: "P0",
    title: "测速实验室方法：我们怎么记录一次测试",
    primary_question: "一次机场测速应该记录哪些条件和限制，别人发的测速结果该怎么判断可不可信？",
    meta_description: "测速实验室怎么记录一次测试：时间、工具和版本、节点范围、测试环境、结果和限制七项，用真实检测记录演示怎么读，并给出判断他人测速结果的方法。",
    primary_keyword_candidate: "机场测速记录、测速方法、测速结果怎么看",
    supporting_questions: [
      "为什么不做排名？",
      "TLS RTT 和网页打开速度是一回事吗？",
      "怎么向本站提交测试记录？"
    ],
    target_reader: "想自己测速，或想判断测速结果可信度的读者",
    conclusion_scope: "说明测试记录必须包含的七项内容，用站长提供的灵动云 2026-11-01 检测记录演示读法，并给出判断他人测速结果的六个问题。",
    required_evidence: "站长提供的灵动云 2026-11-01 检测记录，见测速实验室页面（原图待更新中）。",
    calculation_or_comparison: "无计算；不对结果取平均，也不排名。",
    limitations: [
      "示例记录只代表它自己的测试条件；",
      "本站目前只有这一份记录，原图待更新中，其余品牌暂无记录。"
    ],
    internal_links: [
      { label: "机场测速报告怎么看", href: "/guides/reading-speed-tests/" },
      { label: "IPLC 和 IEPL 的区别", href: "/guides/iplc-vs-iepl/" },
      { label: "测速实验室", href: "/speed-lab/" },
      { label: "灵动云检测记录", href: "/airports/lingdongyun/#tests" },
      { label: "入口和出口", href: "/guides/entry-and-exit-nodes/" },
      { label: "能连上却打不开或很慢", href: "/guides/connected-but-slow-or-blocked/" },
      { label: "自己动手测机场", href: "/guides/test-airport-yourself/" },
      { label: "晚高峰对比测试怎么设计", href: "/guides/peak-hour-test-design/" },
      { label: "解锁检测怎么读", href: "/guides/read-unlock-test-results/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "multi-device-plans",
    category: "buying",
    summary: "设备数上限、共享流量、路由器算几台：先分清概念，再看站内各家的写法和付款前要问的问题。",
    priority: "P1",
    title: "多设备家庭怎么选机场：设备数、共享流量和路由器场景",
    primary_question: "家里设备多，选机场时设备数限制怎么看，一个订阅能连几台，路由器怎么算？",
    meta_description: "多设备家庭选机场：分清设备数上限、共享流量和订阅共享，看站内各家的设备数写法，学会估全家用量，并列出付款前要问服务商的五个问题。",
    primary_keyword_candidate: "机场多设备、机场设备数限制、机场路由器",
    supporting_questions: [
      "不限设备是真的不限吗？",
      "多台设备怎么估流量？",
      "路由器上用机场要注意什么？"
    ],
    target_reader: "家里有多人多设备、想选套餐的读者",
    conclusion_scope: "分清设备数上限、共享流量和订阅共享三个概念，统计站内各家资料里的设备数写法，给出家庭用量估算方法和付款前要问的五个问题。",
    required_evidence: "站长提供的机场资料里各家的设备数写法；价格表备注里的设备数上限。",
    calculation_or_comparison: "家庭用量 = 全家各人每月用量之和（文中示例数字为假设）。",
    limitations: [
      "设备数写法是资料标注，本站没有逐家测试；",
      "套餐和价格以结算页为准。"
    ],
    internal_links: [
      { label: "购买前核对清单", href: "/guides/refund-and-purchase-checklist/" },
      { label: "套餐匹配器", href: "/tools/plan-finder/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "换机场怎么迁移", href: "/guides/switch-airport-checklist/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "what-is-an-airport",
    category: "beginner",
    summary: "机场是一种什么服务：买到的是节点和流量，客户端负责连接，一次访问怎么走，以及它不能保证什么。",
    priority: "P0",
    title: "机场是什么：节点、订阅、客户端和流量，新手一次看懂",
    primary_question: "机场到底是什么服务，买到的是什么，节点、客户端、订阅和流量各管什么，它不能保证什么？",
    meta_description: "机场是什么？用一张流程图讲清节点、客户端、订阅和流量各管什么，买机场时买到的是什么，和普通 VPN 的习惯区别，以及它不能保证速度、稳定和隐私。",
    primary_keyword_candidate: "机场是什么、机场和 VPN 的区别、机场节点是什么意思",
    supporting_questions: [
      "买机场买到的到底是什么？",
      "机场和普通 VPN 有什么区别？",
      "机场能保证速度和稳定吗？"
    ],
    target_reader: "还没买过机场、想先弄懂概念的新手",
    conclusion_scope: "解释机场的构成和一次访问的路径，说明套餐里每一项对应买到什么，以及机场不能保证的四件事；不推荐服务商，不涉及测速和排名。",
    required_evidence: "站长提供的机场资料里各家的使用方式、订阅链接和设备数写法（统计自 34 家）；其余为通用概念说明。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "“机场”和 VPN 的区别是习惯用法，没有严格定义；",
      "资料里的数字是品牌自己的标注，本站没有逐家验证。"
    ],
    internal_links: [
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "机场常用名词表", href: "/guides/airport-glossary/" },
      { label: "订阅与客户端配置", href: "/guides/subscription-and-client/" },
      { label: "付款周期与流量规则", href: "/guides/billing-and-traffic-rules/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "airport-glossary",
    category: "beginner",
    summary: "买机场和用客户端时常见的 27 个名词，按买之前、线路、客户端、测速分四组，说明指什么、该留意什么。",
    priority: "P1",
    title: "机场常用名词表：节点、订阅、倍率、分流、内核和 TUN 怎么读",
    primary_question: "买机场和用客户端时遇到的节点、订阅、倍率、分流、内核、TUN 等名词分别指什么，该留意什么？",
    meta_description: "机场常用名词表：按买之前、线路与节点、客户端与规则、测速与检测四组，解释流量额度、倍率、入口出口、订阅、内核、TUN、延迟、TLS RTT 等词，并说明遇到时该留意什么。",
    primary_keyword_candidate: "机场名词解释、倍率是什么意思、TUN 模式是什么",
    supporting_questions: [
      "倍率是越小越好吗？",
      "节点名里写了专线就一定快吗？",
      "看到不认识的词先去哪里查？"
    ],
    target_reader: "看不懂套餐和客户端里术语的读者",
    conclusion_scope: "解释四组共 27 个常用名词的含义，并说明遇到时该留意什么；倍率和设备数的站内写法取自站长提供的资料；不涉及品牌比较。",
    required_evidence: "站长提供的机场资料里各家的倍率、设备数和使用方式写法（统计自 34 家）；通用技术概念。",
    calculation_or_comparison: "无计算；带宽单位换算：1 字节等于 8 比特。",
    limitations: [
      "客户端和内核的名字只作举例，不构成推荐；",
      "界面里的叫法会随版本和服务商变化。"
    ],
    internal_links: [
      { label: "机场是什么", href: "/guides/what-is-an-airport/" },
      { label: "IPLC 和 IEPL 的区别", href: "/guides/iplc-vs-iepl/" },
      { label: "全局、规则、直连", href: "/guides/global-rule-direct-mode/" },
      { label: "付款周期与流量规则", href: "/guides/billing-and-traffic-rules/" },
      { label: "多设备家庭怎么选", href: "/guides/multi-device-plans/" },
      { label: "入口和出口", href: "/guides/entry-and-exit-nodes/" },
      { label: "BGP、CN2 GIA、9929", href: "/guides/bgp-cn2-9929-explained/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "global-rule-direct-mode",
    category: "beginner",
    summary: "全局、规则、直连三种模式分别怎么处理流量，日常和排错时怎么选，切换后怎么验证。",
    priority: "P1",
    title: "全局、规则、直连三种模式：新手该选哪一种",
    primary_question: "客户端里的全局、规则、直连三种模式有什么区别，日常和排错时分别该选哪一种？",
    meta_description: "全局模式、规则模式、直连模式有什么区别：分别怎么处理流量、对速度和流量消耗的影响、按现象怎么选，以及切换之后怎么验证有没有生效。",
    primary_keyword_candidate: "全局模式规则模式区别、机场规则模式是什么、直连模式",
    supporting_questions: [
      "新手日常该用哪种模式？",
      "个别网站打不开时怎么判断是不是规则的问题？",
      "切换模式后怎么验证？"
    ],
    target_reader: "刚连上机场、分不清客户端模式的读者",
    conclusion_scope: "说明三种模式的处理方式，给出按现象选择的对照表和验证办法；不针对任何服务商的客户端，也不推荐规则列表。",
    required_evidence: "通用代理客户端的模式概念；站长资料里 1 家写明分流规则已内置（其余各家没有单独写）。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "不同客户端的模式名称和数量不同，以你使用的版本为准；",
      "本站没有逐个测试客户端。"
    ],
    internal_links: [
      { label: "Windows 用机场", href: "/guides/windows-client-guide/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "机场常用名词表", href: "/guides/airport-glossary/" },
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "能连上却打不开或很慢", href: "/guides/connected-but-slow-or-blocked/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "macos-client-guide",
    category: "clients",
    summary: "Mac 上怎么确认芯片和系统、从官网下载校验、应对系统拦截、授权网络配置，以及退出后系统代理残留怎么处理。",
    priority: "P1",
    title: "Mac 用机场：官方客户端怎么下载、打开、登录和排错",
    primary_question: "在 Mac 上用机场，官方客户端怎么下载、第一次打开被系统拦住怎么办、要授权什么、退出后上不了网怎么处理？",
    meta_description: "在 Mac 上用机场：确认芯片和系统版本，只从官网下载并校验，第一次打开被系统拦截怎么办，授权网络配置，系统代理和虚拟网卡怎么选，以及退出后系统代理残留的处理。",
    primary_keyword_candidate: "Mac 机场客户端、苹果电脑怎么用机场、macOS 代理客户端",
    supporting_questions: [
      "Apple 芯片的 Mac 能用 Intel 版本吗？",
      "第一次打开被系统拦住怎么办？",
      "退出客户端后浏览器打不开怎么处理？"
    ],
    target_reader: "用 Mac、刚买了机场的读者",
    conclusion_scope: "给出 Mac 上确认版本、下载校验、放行、授权、验证和代理残留处理的步骤；服务商是否支持 macOS 的统计来自站长提供的资料。",
    required_evidence: "站长提供的机场资料里各家的支持系统和下载渠道写法（统计自 34 家）；macOS 的通用操作说明。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "系统设置的名称随 macOS 版本略有不同；",
      "本站没有逐个测试客户端，也不提供安装包。"
    ],
    internal_links: [
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "Windows 用机场", href: "/guides/windows-client-guide/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "订阅与客户端配置", href: "/guides/subscription-and-client/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "android-client-guide",
    category: "clients",
    summary: "安卓上怎么选安装包、临时允许安装、授权 VPN 连接，以及锁屏后总断线时的后台运行设置。",
    priority: "P1",
    title: "安卓用机场：安装官方客户端、连接授权和后台运行怎么设置",
    primary_question: "在安卓手机上用机场，安装包怎么选、怎么安全安装、第一次连接要授权什么、锁屏后总断线怎么办？",
    meta_description: "在安卓手机上用机场：确认系统版本和安装包类型，只从官网下载，临时允许安装未知应用，授权 VPN 连接请求，并设置后台运行解决锁屏后总断线的问题。",
    primary_keyword_candidate: "安卓机场客户端、手机怎么用机场、安卓代理总断线",
    supporting_questions: [
      "为什么要给浏览器安装未知应用的权限？",
      "锁屏后连接断开怎么设置？",
      "能只让某几个应用走代理吗？"
    ],
    target_reader: "用安卓手机、刚买了机场的读者",
    conclusion_scope: "给出安卓上确认版本、下载安装、授权连接、后台运行设置和冲突排查的步骤；服务商是否支持 Android 的统计来自站长提供的资料。",
    required_evidence: "站长提供的机场资料里各家的支持系统和下载渠道写法（统计自 34 家）；安卓的通用操作说明。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "手机品牌和系统版本不同，设置的名称和路径会有差别；",
      "本站没有逐个测试客户端，也不提供安装包。"
    ],
    internal_links: [
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "Windows 用机场", href: "/guides/windows-client-guide/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "订阅与客户端配置", href: "/guides/subscription-and-client/" },
      { label: "手机上用着用着就断", href: "/guides/mobile-keeps-disconnecting/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "ios-client-guide",
    category: "clients",
    summary: "iPhone 和 iPad 上先看服务商 iOS 一栏的写法，再看 Apple 账号、添加 VPN 配置的授权，以及断线没网的排查。",
    priority: "P1",
    title: "iPhone 和 iPad 用机场：客户端怎么获取、登录和授权",
    primary_question: "在 iPhone 或 iPad 上用机场，客户端怎么获取、Apple 账号要注意什么、第一次连接要授权什么、断线没网怎么排查？",
    meta_description: "在 iPhone 或 iPad 上用机场：先看服务商资料里 iOS 一栏怎么写，再说明 Apple 账号和国家地区设置要注意什么、添加 VPN 配置的授权，以及连上后断线、没网的排查顺序。",
    primary_keyword_candidate: "苹果手机机场客户端、iPhone 怎么用机场、iOS 添加 VPN 配置",
    supporting_questions: [
      "为什么不要用别人提供的共享 Apple 账号？",
      "添加 VPN 配置的提示该怎么处理？",
      "资料里写的 Nextin 是什么？"
    ],
    target_reader: "用 iPhone 或 iPad、刚买了机场的读者",
    conclusion_scope: "说明 iOS 上先确认服务商写法、Apple 账号的两点注意事项、VPN 配置授权和排查顺序；不提供任何账号或安装渠道。",
    required_evidence: "站长提供的机场资料里各家 iOS 一栏的写法（统计自 34 家，其中几家写“通过 Nextin”，资料没有说明它是什么）；Apple 官方对账号国家或地区变更条件的说明；iOS 的通用操作说明。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "客户端是否在你所在地区的 App Store 上架，以服务商和 Apple 的官方说明为准；",
      "本站没有核实 Nextin，也没有逐个测试客户端。"
    ],
    internal_links: [
      { label: "第一次用机场", href: "/guides/first-time-setup/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "订阅与客户端配置", href: "/guides/subscription-and-client/" },
      { label: "多设备家庭怎么选", href: "/guides/multi-device-plans/" },
      { label: "手机上用着用着就断", href: "/guides/mobile-keeps-disconnecting/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "subscription-update-failed",
    category: "troubleshooting",
    summary: "登录后节点列表是空的、刷新或更新订阅报错：先分清官方客户端和订阅链接，再按固定顺序排查。",
    priority: "P1",
    title: "节点列表拉不下来、订阅更新失败：原因与解决办法",
    primary_question: "客户端里节点列表是空的、刷新失败，或订阅更新报错，有哪些原因，应该按什么顺序排查？",
    meta_description: "节点列表是空的、刷新失败、订阅更新报错：先分清官方客户端登录和订阅链接两种情况，再按看报错、查套餐、换网络、校对时间的顺序排查，并给出状态码对照和联系服务商要带的信息。",
    primary_keyword_candidate: "订阅更新失败、机场节点列表为空、拉不到节点",
    supporting_questions: [
      "官方客户端登录后没有节点怎么办？",
      "订阅更新提示 403 或 404 是什么意思？",
      "更新成功了节点还是不能用怎么办？"
    ],
    target_reader: "登录或更新后拿不到节点列表的读者",
    conclusion_scope: "分清官方客户端与订阅链接两种情况，给出排查顺序、报错对照表和联系服务商的信息清单；不针对任何服务商。",
    required_evidence: "站长提供的机场资料里各家的使用方式和订阅链接写法（统计自 34 家）；网络服务常见的状态码含义；其余为通用排查流程。",
    calculation_or_comparison: "无计算；每步只改一项，做完再测。",
    limitations: [
      "状态码和提示文字因客户端、服务商而异；",
      "本站没有逐个测试客户端，不判断服务商的故障原因。"
    ],
    internal_links: [
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "订阅与客户端配置", href: "/guides/subscription-and-client/" },
      { label: "Windows 用机场", href: "/guides/windows-client-guide/" },
      { label: "第一次用机场", href: "/guides/first-time-setup/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "connected-but-slow-or-blocked",
    category: "troubleshooting",
    summary: "客户端显示已连接，网页却打不开或很慢：用四个对照实验区分线路、DNS 和规则。",
    priority: "P1",
    title: "能连上节点却打不开网页或很慢：怎么区分线路、DNS 和规则",
    primary_question: "客户端显示已连接，网页却打不开或很慢，怎么判断是节点线路、DNS、分流规则还是目标网站的问题？",
    meta_description: "客户端显示已连接，网页却打不开或很慢：用换节点、换网站、切模式、换网络四个对照实验，区分是线路、DNS、规则还是目标网站的问题，并说明入口延迟低为什么不等于网页快。",
    primary_keyword_candidate: "连上了打不开网页、机场连上很慢、节点延迟低网页慢",
    supporting_questions: [
      "延迟很低为什么网页还是慢？",
      "怎么判断是规则还是线路的问题？",
      "测速网站很快网页却慢是怎么回事？"
    ],
    target_reader: "显示已连接但网页异常的读者",
    conclusion_scope: "用四个对照实验把问题缩小到线路、DNS、规则或目标网站之一，并解释入口延迟与网页速度的区别；不判断任何服务商的线路好坏。",
    required_evidence: "站长提供的灵动云 2026-11-01 检测记录（见测速实验室页面，原图待更新中），用来说明入口握手延迟不等于网页速度；浏览器常见错误码的含义；其余为通用排查流程。",
    calculation_or_comparison: "无计算；每个实验只改一项。",
    limitations: [
      "示例记录只代表它自己的测试条件，没有测下载和上传速度；",
      "对照实验只能缩小范围，不能证明某条线路的好坏。"
    ],
    internal_links: [
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "全局、规则、直连", href: "/guides/global-rule-direct-mode/" },
      { label: "测速实验室方法", href: "/guides/speed-lab-method/" },
      { label: "入口和出口", href: "/guides/entry-and-exit-nodes/" },
      { label: "机场测速报告怎么看", href: "/guides/reading-speed-tests/" },
      { label: "自己动手测机场", href: "/guides/test-airport-yourself/" },
      { label: "晚高峰对比测试怎么设计", href: "/guides/peak-hour-test-design/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "mobile-keeps-disconnecting",
    category: "troubleshooting",
    summary: "手机上用着用着就断：先记录断线的条件，再对照表区分系统限制、网络切换和节点问题。",
    priority: "P1",
    title: "手机上用着用着就断：后台限制、网络切换和节点问题怎么区分",
    primary_question: "手机上的代理连接总是中途断开，怎么区分是系统结束了连接、网络切换后没恢复，还是节点出了问题？",
    meta_description: "手机上用机场总断线：先记录断线的时间、网络和 VPN 标识，再对照表区分后台限制、网络切换、节点中断和设备数上限，只改一项设置并观察，避免盲目重装。",
    primary_keyword_candidate: "手机代理总断线、机场手机老是断、安卓 iPhone 代理自动断开",
    supporting_questions: [
      "断线时顶部的 VPN 标识还在不在有什么区别？",
      "Wi-Fi 和蜂窝数据切换时断线怎么办？",
      "多台设备轮流断线是什么原因？"
    ],
    target_reader: "手机上代理总是中途断开的读者",
    conclusion_scope: "给出记录断线条件的办法和对照表，帮助把原因缩小到一类，再一次只改一项；具体设置入口见各系统教程。",
    required_evidence: "站长提供的机场资料里各家的设备数写法（统计自 34 家）；手机系统的通用行为说明。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "系统设置的名称随手机品牌和版本变化；",
      "设备数写法是资料标注，本站没有逐家验证。"
    ],
    internal_links: [
      { label: "安卓用机场", href: "/guides/android-client-guide/" },
      { label: "iPhone 和 iPad 用机场", href: "/guides/ios-client-guide/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" },
      { label: "多设备家庭怎么选", href: "/guides/multi-device-plans/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "bgp-cn2-9929-explained",
    category: "routes",
    summary: "BGP、CN2 GIA、9929 分别是什么、能说明什么、不能说明什么，以及站内资料里这些词出现的情况。",
    priority: "P1",
    title: "BGP、CN2 GIA、9929：机场线路宣传里这些词指什么",
    primary_question: "机场线路宣传里的 BGP、CN2 GIA、CN2 GT、9929 分别指什么，能说明什么，不能说明什么？",
    meta_description: "解释机场线路宣传里 BGP、CN2 GIA、CN2 GT、9929 的含义，统计站内资料里这些词的出现情况，并给出读线路宣传时要追问的五件事；不对任何线路下质量结论。",
    primary_keyword_candidate: "CN2 GIA 是什么、9929 是什么线路、机场 BGP 线路",
    supporting_questions: [
      "CN2 GIA 一定比 BGP 好吗？",
      "写了 9929 就适合联通用户吗？",
      "站内资料里有没有写 CN2 或 9929 的品牌？"
    ],
    target_reader: "看不懂线路宣传词的读者",
    conclusion_scope: "解释四个线路词的含义和边界，统计站内资料里这些词的出现情况，并给出追问清单；不对任何品牌的线路质量下结论。",
    required_evidence: "主机商和运营商公开的产品介绍及网络注册信息（查阅于 2026-11-06，均为销售或登记资料，各家对 CN2 GT 的路径描述不一致，对 9929 是否一贯更优的说法也不一致，只用于解释术语）；站长提供的机场资料里各家的线路标注。",
    calculation_or_comparison: "按资料里的线路标注文字分类计数；不是测试结果。",
    limitations: [
      "运营商的产品命名和定义可能调整；",
      "线路标注是品牌自己的写法，本站没有测试过任何线路。"
    ],
    internal_links: [
      { label: "IPLC 和 IEPL 的区别", href: "/guides/iplc-vs-iepl/" },
      { label: "入口和出口", href: "/guides/entry-and-exit-nodes/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "测速实验室方法", href: "/guides/speed-lab-method/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "entry-and-exit-nodes",
    category: "routes",
    summary: "入口、出口、中转、落地各指什么，为什么节点名和落地地区会不一样，以及怎么自己查出口。",
    priority: "P1",
    title: "入口和出口：为什么节点名里的地区，不等于落地地区",
    primary_question: "机场节点里的入口、出口、中转、落地分别指什么，为什么节点名里的地区和落地地区会不一样？",
    meta_description: "机场节点的入口、出口、中转和落地分别是什么，为什么节点名里的地区和落地地区会不一样，用一份真实检测记录说明，并给出自己查出口地区的四个步骤。",
    primary_keyword_candidate: "机场入口出口、节点落地是什么意思、节点地区和 IP 不一致",
    supporting_questions: [
      "为什么节点显示一个地区，IP 却不在那里？",
      "怎么查自己的出口在哪里？",
      "延迟低为什么网页不一定快？"
    ],
    target_reader: "发现节点名和出口地区对不上、想弄清原因的读者",
    conclusion_scope: "解释入口、出口、中转、落地的含义，用站长提供的检测记录说明节点名不等于落地地区，并给出自查出口的步骤；不判断任何服务商的节点布局。",
    required_evidence: "站长提供的灵动云 2026-11-01 检测记录（见测速实验室页面，原图待更新中）；其余为通用概念说明。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "示例记录只代表它自己的测试条件；",
      "IP 归属地数据库有误差，不同网站的结果可能不一致。"
    ],
    internal_links: [
      { label: "IPLC 和 IEPL 的区别", href: "/guides/iplc-vs-iepl/" },
      { label: "能连上却打不开或很慢", href: "/guides/connected-but-slow-or-blocked/" },
      { label: "测速实验室方法", href: "/guides/speed-lab-method/" },
      { label: "机场常用名词表", href: "/guides/airport-glossary/" },
      { label: "节点地区怎么选", href: "/guides/choose-node-region/" },
      { label: "解锁检测怎么读", href: "/guides/read-unlock-test-results/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "choose-node-region",
    category: "routes",
    summary: "站内资料里各家写了哪些地区，按用途怎么选地区，以及一个在自己网络里试节点的办法。",
    priority: "P2",
    title: "节点地区怎么选：按用途选地区，再用自己的网络验证",
    primary_question: "机场节点的地区该怎么选，按浏览、流媒体、AI、游戏、下载不同用途分别看什么，怎么验证？",
    meta_description: "机场节点地区怎么选：先看站内资料里各家写了哪些地区，再按浏览、流媒体、AI 工具、游戏和下载的用途给出选择依据，并用自己的网络试节点、核对出口地区。",
    primary_keyword_candidate: "机场节点选哪个地区、香港日本新加坡美国节点区别、节点地区怎么选",
    supporting_questions: [
      "哪个地区延迟最低？",
      "看流媒体和用 AI 工具应该选哪个地区？",
      "同一地区的节点为什么速度不同？"
    ],
    target_reader: "不知道该用哪个地区节点的读者",
    conclusion_scope: "按用途给出选择依据和验证办法，统计站内资料里各家写了哪些地区；不推荐某个地区，也不判断节点质量。",
    required_evidence: "站长提供的机场资料里各家的节点地区写法（统计自 34 家）；站长提供的灵动云 2026-11-01 检测记录里各地区的握手延迟；各服务的可用地区以其官方说明为准。",
    calculation_or_comparison: "按资料里列出的地区名计数；不是测试结果。",
    limitations: [
      "资料里有的地区列表以“等”结尾，没有列全；",
      "示例延迟只代表一次检测的条件。"
    ],
    internal_links: [
      { label: "入口和出口", href: "/guides/entry-and-exit-nodes/" },
      { label: "IPLC 和 IEPL 的区别", href: "/guides/iplc-vs-iepl/" },
      { label: "测速实验室方法", href: "/guides/speed-lab-method/" },
      { label: "机场常用名词表", href: "/guides/airport-glossary/" },
      { label: "自己动手测机场", href: "/guides/test-airport-yourself/" },
      { label: "解锁检测怎么读", href: "/guides/read-unlock-test-results/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "test-airport-yourself",
    category: "speed-lab",
    summary: "在自己的网络里测延迟、网页加载和下载速度：先测基线、固定条件、逐次记录，附记录表模板。",
    priority: "P1",
    title: "自己动手测机场：延迟、网页加载和下载速度怎么测、怎么记",
    primary_question: "怎么在自己的网络里测一个机场节点的延迟、网页加载和下载速度，才不会测歪？",
    meta_description: "在自己的网络里测机场节点：先测不开代理的基线，固定设备、网络和模式，再分别测延迟、网页加载和下载速度，附记录表模板和常见错误，不涉及任何品牌打分。",
    primary_keyword_candidate: "怎么测机场速度、机场测速方法、机场延迟怎么测",
    supporting_questions: [
      "为什么要先测不开代理的基线？",
      "客户端的延迟测试可以信吗？",
      "测节点为什么要用全局模式？"
    ],
    target_reader: "想自己验证节点表现、不想只看别人测速的读者",
    conclusion_scope: "给出测基线、固定条件、测延迟、网页加载和下载速度以及记录的步骤和记录表模板；只讲方法，不含测试数据，不给服务商打分。",
    required_evidence: "通用的网络测量方法；浏览器开发者工具的通用用法；不引用任何测速数据。",
    calculation_or_comparison: "无计算；单位换算：Mbps 与 MB/s 相差 8 倍。",
    limitations: [
      "自己的测试只代表自己的网络和那个时段；",
      "本站不提供测速工具，也不推荐具体的测速软件或网站。"
    ],
    internal_links: [
      { label: "测速实验室方法", href: "/guides/speed-lab-method/" },
      { label: "晚高峰对比测试怎么设计", href: "/guides/peak-hour-test-design/" },
      { label: "全局、规则、直连", href: "/guides/global-rule-direct-mode/" },
      { label: "能连上却打不开或很慢", href: "/guides/connected-but-slow-or-blocked/" },
      { label: "测速实验室", href: "/speed-lab/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "peak-hour-test-design",
    category: "speed-lab",
    summary: "晚高峰对比测试的设计：选时段、定天数和次数、每次先测基线、逐次记录，并按结果形态读结论。",
    priority: "P2",
    title: "晚高峰对比测试怎么设计：时间点、重复次数和记录表",
    primary_question: "想验证节点晚高峰有没有变差，测试应该怎么设计：测哪些时段、测几天、每次测几次、怎么记录和读结果？",
    meta_description: "晚高峰对比测试怎么设计：选哪些时段、连续测几天、每次测几遍、为什么每次都要先测不开代理的基线，附记录项和按结果形态对号入座的对照表，全程不含模拟数据。",
    primary_keyword_candidate: "机场晚高峰测速、晚高峰变慢怎么测、机场晚高峰对比",
    supporting_questions: [
      "测几天、每次测几次才够？",
      "怎么区分本地拥堵和节点变差？",
      "测出来的结果能公开吗？"
    ],
    target_reader: "怀疑晚高峰变慢、想设计一个公平对比的读者",
    conclusion_scope: "给出时段、天数和次数的设计建议，每次先测基线的理由，记录项和按结果形态读结论的对照表；不含任何测试数据，不对服务商的晚高峰表现下结论。",
    required_evidence: "通用的对比测试设计方法；不引用任何测速数据。",
    calculation_or_comparison: "无计算；设计示例：三天、三个时段、每次三遍，至少 27 个数据（建议值，不是统计规则）。",
    limitations: [
      "天数和次数是建议值，可按自己的情况调整并写进记录；",
      "本站目前没有任何品牌的晚高峰测试记录。"
    ],
    internal_links: [
      { label: "自己动手测机场", href: "/guides/test-airport-yourself/" },
      { label: "测速实验室方法", href: "/guides/speed-lab-method/" },
      { label: "机场测速报告怎么看", href: "/guides/reading-speed-tests/" },
      { label: "测速实验室", href: "/speed-lab/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "read-unlock-test-results",
    category: "speed-lab",
    summary: "解锁检测的结果标签代表什么、不代表什么，用一份真实检测记录演示同一节点在不同服务眼里的地区可以不同。",
    priority: "P1",
    title: "流媒体和 AI 解锁检测怎么读：结果代表什么，不代表什么",
    primary_question: "流媒体和 AI 工具的解锁检测结果该怎么读，“解锁”“N/A”“送中”等标签分别代表什么、不代表什么？",
    meta_description: "解锁检测结果怎么读：解锁、地区代码、N/A、送中分别代表什么、不代表什么，用站长提供的真实检测记录演示同一节点在不同服务眼里的地区可以不一样，并给出使用检测结果的五条原则。",
    primary_keyword_candidate: "解锁检测怎么看、流媒体解锁检测结果、节点送中是什么意思",
    supporting_questions: [
      "检测显示解锁为什么实际打不开？",
      "送中（CN）是什么意思？",
      "N/A 就是被封了吗？"
    ],
    target_reader: "看到解锁检测表却不知道怎么读的读者",
    conclusion_scope: "解释四类常见结果标签的含义和边界，用一份真实检测记录演示读法，并给出使用检测结果的原则；不对任何服务商的解锁能力下结论。",
    required_evidence: "站长提供的灵动云 2026-11-01 检测记录（见测速实验室页面，原图待更新中）。",
    calculation_or_comparison: "无计算；不对检测结果取平均或排名。",
    limitations: [
      "记录只代表它自己的测试条件，工具版本未记录，且工具自己标注“试验性结果，仅供参考”；",
      "本站目前只有这一份检测记录，原图待更新中。"
    ],
    internal_links: [
      { label: "入口和出口", href: "/guides/entry-and-exit-nodes/" },
      { label: "测速实验室方法", href: "/guides/speed-lab-method/" },
      { label: "机场常用名词表", href: "/guides/airport-glossary/" },
      { label: "灵动云检测记录", href: "/airports/lingdongyun/#tests" },
      { label: "测速实验室", href: "/speed-lab/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "coupon-not-working",
    category: "buying",
    summary: "优惠码用不了：统计站内资料里 34 个码的适用范围和限制，按原因对照排查，并给出固定的操作顺序。",
    priority: "P1",
    title: "优惠码用不了怎么办：适用套餐、新用户限制和常见原因",
    primary_question: "机场优惠码输入后不生效，常见原因有哪些，应该按什么顺序排查？",
    meta_description: "机场优惠码用不了：统计站内资料里 34 个优惠码的适用套餐、不适用套餐和新用户限制，按套餐、周期、账号类型、输错混淆等原因对照排查，并给出一套固定的操作顺序。",
    primary_keyword_candidate: "机场优惠码无效、优惠码用不了、机场优惠码怎么用",
    supporting_questions: [
      "优惠码和推广链接里的 code= 一样吗？",
      "新用户专享的码老账号能用吗？",
      "优惠码能叠加吗？"
    ],
    target_reader: "输入优惠码后金额没有变化的读者",
    conclusion_scope: "统计站内资料里优惠码的条件写法，按原因给出排查对照表和固定操作顺序；不保证任何码在所有套餐上都能抵扣。",
    required_evidence: "站长提供的机场资料里 34 个优惠码的折扣和适用、不适用、限制写法；以结算页实际抵扣为准。",
    calculation_or_comparison: "按资料里的条件文字分类计数；不是对每个码的实测。",
    limitations: [
      "条件写法是品牌自己的标注，本站没有逐个套餐验证；",
      "折扣幅度和适用范围随时可能调整。"
    ],
    internal_links: [
      { label: "优惠码汇总", href: "/deals/" },
      { label: "购买前核对清单", href: "/guides/refund-and-purchase-checklist/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "月付年付怎么选", href: "/guides/billing-and-traffic-rules/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "how-much-traffic-per-month",
    category: "buying",
    summary: "一个月要多少流量：用公式把网页、视频、下载拆开估算，引用官方参考值，再对照站内价格表。",
    priority: "P1",
    title: "一个月要多少流量：按网页、视频、下载、AI 估算",
    primary_question: "机场每月流量该买多少，怎么按网页、视频、下载和 AI 使用估算，估完怎么对照套餐？",
    meta_description: "机场一个月要买多少流量：用公式把网页、视频、下载和 AI 使用拆开估算，引用 Netflix 官方每小时流量上限和 HTTP Archive 的网页体积中位数，并用站内价格表看哪些月付档够用。",
    primary_keyword_candidate: "机场一个月多少流量、机场流量够不够用、看视频一小时用多少流量",
    supporting_questions: [
      "看一小时视频大概用多少流量？",
      "后台流量和估算对不上是为什么？",
      "第一次该买多少流量？"
    ],
    target_reader: "不知道每月该买多大流量套餐的读者",
    conclusion_scope: "给出估算公式、可引用的官方参考值、一个带假设的算例，并用站内价格表看哪些月付档额度够用；不推荐具体套餐。",
    required_evidence: "Netflix 帮助中心《How to control how much data Netflix uses》（查阅于 2026-11-06，每台设备每小时的流量上限）；HTTP Archive《Web Almanac 2024》页面体积一章（2024 年 10 月数据的全球中位数，查阅于 2026-11-06）；本站价格表。",
    calculation_or_comparison: "每月流量 ≈ （网页 + 视频 + 下载 + 其他）× 倍率；算例里的使用习惯是假设；1 Mbps 持续 1 小时约 0.45 GB。",
    limitations: [
      "参考值只用于估算数量级，其他视频服务的数字可能不同；",
      "算例的使用习惯是假设，不代表任何人的真实用量。"
    ],
    internal_links: [
      { label: "月付年付怎么选", href: "/guides/billing-and-traffic-rules/" },
      { label: "每 GB 成本怎么算", href: "/guides/cost-per-gb/" },
      { label: "套餐匹配器", href: "/tools/plan-finder/" },
      { label: "多设备家庭怎么选", href: "/guides/multi-device-plans/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" }
    ],
    read_time_minutes: 7,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  },
  {
    slug: "switch-airport-checklist",
    category: "buying",
    summary: "换机场的七步清单：盘点旧套餐、先买新月付、新旧并行、逐台迁移、验证，以及关自动续费和清理代理残留。",
    priority: "P2",
    title: "换机场怎么迁移：旧套餐、客户端和设备的切换清单",
    primary_question: "换一家机场时，旧套餐、客户端、各台设备和旧账号分别要怎么处理，才不会断网、不重复付款？",
    meta_description: "换机场怎么迁移：先写下换的原因，盘点旧套餐的到期日和退款条款，先买新服务商的月付并新旧并行，逐台设备迁移并验证，最后关闭自动续费、清理系统代理残留。",
    primary_keyword_candidate: "换机场怎么换、机场迁移、换机场注意什么",
    supporting_questions: [
      "旧套餐没到期能直接换吗？",
      "旧套餐的流量能带到新服务商吗？",
      "旧账号要怎么收尾？"
    ],
    target_reader: "准备从一家机场换到另一家的读者",
    conclusion_scope: "给出七步迁移清单、逐台设备的检查点和旧账号的收尾事项；不推荐换到哪一家。",
    required_evidence: "站长提供的机场资料里各家的退款、试用和支持路由器的写法（统计自 34 家）；其余为通用流程。",
    calculation_or_comparison: "无计算。",
    limitations: [
      "退款能否办理取决于各服务商的条款；",
      "资料里的写法是品牌自己的标注，本站没有逐家核实。"
    ],
    internal_links: [
      { label: "购买前核对清单", href: "/guides/refund-and-purchase-checklist/" },
      { label: "机场怎么选", href: "/guides/how-to-choose/" },
      { label: "多设备家庭怎么选", href: "/guides/multi-device-plans/" },
      { label: "Windows 用机场", href: "/guides/windows-client-guide/" },
      { label: "节点全部超时怎么办", href: "/guides/all-nodes-timeout/" }
    ],
    read_time_minutes: 6,
    author_or_editor: "机场推荐编辑部",
    published_at: "2026-11-06",
    substantive_updated_at: "2026-11-06",
    status: "published"
  }
];

export function getArticleBySlug(slug: string): ArticleBrief | undefined {
  return ARTICLES.find(a => a.slug === slug);
}
