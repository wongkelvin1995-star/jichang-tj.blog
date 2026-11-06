/**
 * 每家机场的资料：站长的机场 MD（2026-11-06 整理）里的节点与线路、设备与客户端、流媒体与 AI、优惠码、客服与退款。
 * 本文件由 scripts/import_md.mjs 生成，不要手改；要改资料，改 MD 后重新导入。
 * 价格不在这里（见 planPrices.ts）。MD 里的“晚高峰实测”和“购买流程”没有导入（站长 2026-11-06 决定不放实测）。
 * 这些资料是品牌自己的标注或站长提供的整理，本站没有测试线路。
 */
/** 机场 MD 的整理日期 */
export const BRAND_MD_DATE = '2026-11-06';

export type MdPair = [label: string, value: string];

export interface BrandMd {
  brand_id: string;
  /** MD 文件编号（目录编号，不是站内排名） */
  md_no: number;
  md_name: string;
  english_name: string | null;
  official_site: string | null;
  positioning: string | null;
  best_advantage: string | null;
  suited_for: string | null;
  nodes: {
    regions: string | null;
    per_region_count: string | null;
    line_type: string | null;
    per_region_line: string[];
    multiplier: string | null;
    other: MdPair[];
  };
  long_cycle_note: string | null;
  /** 没有流量数据、进不了价格表的定制或短期套餐，原样保留 MD 的写法 */
  custom_plans: string[];
  flow_rules: string[];
  devices: string | null;
  devices_clients: MdPair[];
  media_ai: MdPair[];
  coupon: { code: string | null; discount: string | null; pairs: MdPair[] };
  service: MdPair[];
  /** MD 自己标注存疑的原因；有值的品牌页要标“资料待核对” */
  needs_check: string | null;
}

export const BRAND_MD: BrandMd[] = [
  {
    "brand_id": "lingdongyun",
    "md_no": 1,
    "md_name": "灵动云",
    "english_name": null,
    "official_site": null,
    "positioning": "主打 IEPL / IPLC 专线，全节点 1x 倍率、不限设备，月付 ¥20 起",
    "best_advantage": "长周期折扣最低三年付 75 折，全节点 1x 倍率，不限设备",
    "suited_for": "大流量用户、需要独享 IP 的跨境电商、偶尔使用不想按月续费的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，60 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10",
      "line_type": "IEPL 专线 + BGP 智能调度，穿云套餐为 IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点统一 1x 倍率",
      "other": []
    },
    "long_cycle_note": "季付 95 折、半年付 9 折、年付 85 折、两年付 8 折、三年付 75 折",
    "custom_plans": [],
    "flow_rules": [
      "周期套餐流量每月重置，未用完的流量不结转到下月",
      "月内流量用完，可购买同档重置包，价格等于该套餐月付价",
      "穿云套餐从购买日起每 30 天刷新 70 GB",
      "所有套餐不限速"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "已暂停提供（平台遭遇异常流量攻击，为保护节点安全，暂停第三方客户端订阅链接）"
      ],
      [
        "第三方客户端",
        "暂不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用；已购套餐不受影响，登录客户端即可继续使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Disney+、HBO、YouTube、TikTok、Abema、Spotify"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude、Midjourney"
      ],
      [
        "跨境 / 社交",
        "至尊私人定制适合跨境电商、独立站与 TikTok 直播"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "ld888",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "ld888"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "适用套餐",
          "拂风、驭浪、破晓、凌霄四档周期套餐（含长周期）"
        ],
        [
          "不适用",
          "穿云、不限时流量包、至尊私人定制"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "Crisp 在线客服、工单、Telegram 公告频道"
      ],
      [
        "客服时间",
        "工单 24 小时内回复"
      ],
      [
        "退款",
        "可申请退款与升级补差价，具体条件以平台指引为准"
      ],
      [
        "试用",
        "无免费试用"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "twilight",
    "md_no": 2,
    "md_name": "暮光加速",
    "english_name": null,
    "official_site": null,
    "positioning": "大流量档位机场，至尊版每月 1500 GB 只要 ¥180，全节点 1x、不限速",
    "best_advantage": "大流量性价比高，四大系统都有客户端，24 小时客服",
    "suited_for": "流量用得多的人、多设备用户、需要独享线路的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，55 个节点",
      "per_region_count": null,
      "line_type": "BGP 智能路由 + IPLC 专线出口",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "周期套餐流量每月重置，未用完的流量不结转到下月",
      "年付轻量版每 30 天刷新 70 GB",
      "所有套餐不限速"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Hulu、HBO、Disney+、DAZN"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "mm88",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "mm88"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "适用套餐",
          "周期套餐"
        ],
        [
          "不适用",
          "年付轻量版"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "工单"
      ],
      [
        "客服时间",
        "24 小时"
      ],
      [
        "退款",
        "提供退款，具体条件请先询问客服"
      ],
      [
        "试用",
        "无免费试用"
      ],
      [
        "付款方式",
        "支付宝；微信、USDT 需联系客服"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": "基础版半年付 ¥103：其他三档都按“月付 × 6 × 90%”计算，照此应为 ¥108，站长的资料标注存疑"
  },
  {
    "brand_id": "breezenet",
    "md_no": 3,
    "md_name": "微风网络",
    "english_name": "Breezenet",
    "official_site": null,
    "positioning": "低单价入门机场，每 GB 成本低，不限设备、所有设备共享流量",
    "best_advantage": "入门档每 GB 约 ¥0.13，在 34 家中并列第 1",
    "suited_for": "关注每 GB 单价的人、学生与轻度用户、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，53 个节点",
      "per_region_count": "香港 14、日本 14（含直连）、新加坡 10、美国 10、台湾 5",
      "line_type": "全 IPLC 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "周期套餐从购买日起按月重置，未用完的流量不结转到下月",
      "不限时流量永不过期，用完为止",
      "所有套餐不限速"
    ],
    "devices": "不限同时在线设备数，所有设备共用同一份流量",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数，所有设备共用同一份流量"
      ],
      [
        "支持系统",
        "Windows 10 及以上、macOS 10.15 及以上、Android 5.0 及以上、iOS 15 及以上（iOS 通过 Nextin 登录）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（2026 年 10 月起新订单只能使用官方客户端，老用户原有订阅不受影响）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "全节点使用住宅 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、HBO Max、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude、Gemini"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "weifeng90",
      "discount": "9 折",
      "pairs": [
        [
          "优惠码",
          "weifeng90"
        ],
        [
          "折扣",
          "9 折"
        ],
        [
          "适用套餐",
          "乘风、破风、御风"
        ],
        [
          "不适用",
          "清风、信风、长风"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "7×24 小时在线，夜间由 AI 客服值守"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "flycat",
    "md_no": 4,
    "md_name": "飞猫云",
    "english_name": null,
    "official_site": null,
    "positioning": "多地区覆盖的 IPLC 专线机场，入门 ¥25/月含 150 GB，另有 ¥84 学生年付版",
    "best_advantage": "节点地区最广之一（含韩国、东南亚、欧洲、南美），单节点最高 2.5Gbps",
    "suited_for": "学生、需要小众地区节点的人、需要独享原生 IP 的人、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国、马来西亚、越南、菲律宾、泰国、印度、英国、法国、德国、阿根廷等，共 57 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10、韩国 3",
      "line_type": "全 IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率，高峰不降速",
      "other": []
    },
    "long_cycle_note": "年付 8 折、两年付 7 折、三年付 6 折，长期有效",
    "custom_plans": [],
    "flow_rules": [
      "季付及以上从购买日起每 30 天刷新流量，未用完的流量不结转",
      "高峰不降速，单节点最高 2.5Gbps"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "flycat888",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "flycat888"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "适用套餐",
          "季付及以上周期套餐"
        ],
        [
          "不适用",
          "月付"
        ],
        [
          "使用限制",
          "新用户专享"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "dalaoyun",
    "md_no": 5,
    "md_name": "大佬云",
    "english_name": null,
    "official_site": null,
    "positioning": "2026 年 9 月新上线的低价专线机场，最低月付 ¥19.99，全节点 1x、不限设备",
    "best_advantage": "入门价低于 34 家中位数，晚高峰不限速，不限设备",
    "suited_for": "预算有限、想先买一个月试试的人，多设备用户，用量不大想年付的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国，共 6 个地区，60 个节点",
      "per_region_count": null,
      "line_type": "IEPL 专线",
      "per_region_line": [],
      "multiplier": "周期套餐全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": "没有半年付",
    "custom_plans": [],
    "flow_rules": [
      "周期套餐流量每月重置，未用完的流量不结转到下月",
      "晚高峰不限速，单节点最高 2.5Gbps"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、Android（官方客户端），iOS（通过 Nextin）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（只能使用官方客户端）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "dly88",
      "discount": "7 折",
      "pairs": [
        [
          "优惠码",
          "dly88"
        ],
        [
          "折扣",
          "7 折"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "7×24 小时真人客服"
      ],
      [
        "试用",
        "官方不提供试用"
      ],
      [
        "付款方式",
        "仅支持支付宝"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": "入门套餐各来源说法不一（初云福利版、入门版，流量 120GB、130GB 或 150GB），站长的资料标注价格待确认"
  },
  {
    "brand_id": "invisible",
    "md_no": 6,
    "md_name": "隐形人",
    "english_name": null,
    "official_site": null,
    "positioning": "大流量、多地区的专线机场，入门月付 ¥24 含 144 GB，顶档每月 1600 GB",
    "best_advantage": "流量大、地区多，钻石穹顶 1600 GB 约 ¥0.12/GB",
    "suited_for": "流量用得多的人、需要多个出口地区的人、需要独享带宽的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国、德国、法国、英国等，共 50+ 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10、韩国 2",
      "line_type": "IEPL 专线 + BGP 智能优化",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": "季付 95 折、半年付 9 折、年付 85 折",
    "custom_plans": [],
    "flow_rules": [
      "周期套餐流量每月重置，未用完的流量不结转到下月",
      "所有套餐不限速"
    ],
    "devices": "周期套餐不限设备；一次性流量包限 1 / 2 / 3 台",
    "devices_clients": [
      [
        "设备数",
        "周期套餐不限设备；一次性流量包限 1 / 2 / 3 台"
      ],
      [
        "支持系统",
        "Windows、macOS、Linux、iOS、Android"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Disney+、Prime Video、BBC、Abema、TVer"
      ],
      [
        "AI 工具",
        "ChatGPT、GitHub Copilot、Hugging Face"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "yxr888",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "yxr888"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "退款",
        "支持不满意退款，适用范围以条款为准"
      ],
      [
        "试用",
        "无免费试用"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "flyv",
    "md_no": 8,
    "md_name": "飞V",
    "english_name": "FlyV",
    "official_site": "https://flyv.site",
    "positioning": "主打专线线路和官方客户端，登录即用，不对外发放订阅链接，保护用户隐私和线路稳定",
    "best_advantage": null,
    "suited_for": null,
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，60个节点",
      "per_region_count": null,
      "line_type": null,
      "per_region_line": [
        "香港：IEPL 专线 x20节点",
        "台湾：IEPL 专线 x10节点",
        "日本：IPLC / IEPL 专线 x10节点",
        "新加坡：IPLC / IEPL 专线 x10节点",
        "美国：BGP 直连优化 x10节点"
      ],
      "multiplier": "常规会员套餐全节点统一 1x 倍率",
      "other": []
    },
    "long_cycle_note": "四档周期套餐均提供季付、半年付、年付、二年付、三年付；季付约为月付总价的 95%；半年付约为月付总价的 90%；年付约为月付总价的 85%",
    "custom_plans": [],
    "flow_rules": [
      "周期套餐流量每月重置，未用完的流量不结转到下月",
      "月内流量用完，可购买同档重置包，价格等于该套餐月付价"
    ],
    "devices": "常规周期套餐不限同时在线设备数，所有设备共享同一套餐流量",
    "devices_clients": [
      [
        "设备数",
        "常规周期套餐不限同时在线设备数，所有设备共享同一套餐流量"
      ],
      [
        "支持系统",
        "Windows、macOS、Android、iOS"
      ],
      [
        "电视盒子、软路由等其他设备",
        "请先咨询客服"
      ],
      [
        "使用方式",
        "官方客户端，用飞V 账号登录即可连接，分流规则已内置"
      ],
      [
        "订阅链接",
        "不对外发放，防止订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "下载渠道",
        "仅限官网用户中心；网上出售的「飞V 订阅链接」或网盘分发的「飞V 客户端」均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、YouTube Premium、Prime Video、Abema、TVer"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude、Midjourney、GitHub Copilot 等"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "fly20",
      "discount": "8 折（例如入门方案月付折后约 ¥20）",
      "pairs": [
        [
          "优惠码",
          "fly20"
        ],
        [
          "折扣",
          "8 折（例如入门方案月付折后约 ¥20）"
        ],
        [
          "适用套餐",
          "入门、进阶、高端、商业四档周期套餐（含长周期）"
        ],
        [
          "不适用",
          "年付标准轻量版、不限时流量包、独享黄金专线"
        ],
        [
          "使用限制",
          "新用户首单专享，每个账号限用一次"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "官网用户中心工单"
      ],
      [
        "",
        "客服不会私下索要账号凭证"
      ],
      [
        "防骗提醒",
        "宣称「¥9.9/月」「1 折码」「全场免费」的都不是官方；官方入门价为 ¥25/月，正规优惠码只有 fly20"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "wavenet",
    "md_no": 9,
    "md_name": "浪网",
    "english_name": "WaveNet",
    "official_site": null,
    "positioning": "主打超大流量档位，商业档每月 2000 GB，在 34 家中排第 1",
    "best_advantage": "流量最大，适合团队与高并发使用",
    "suited_for": "流量用量大的人、团队用户、需要定制线路的人、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国，共 6 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "月付套餐为 BGP 智能调度 + 专线出口，年付标准为全 IPLC 专线",
      "per_region_line": [],
      "multiplier": "所有节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": "季付 95 折、半年付 9 折、年付 85 折",
    "custom_plans": [],
    "flow_rules": [
      "未用完的流量不结转到下月",
      "入门、进阶、商业套餐无速率限制"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows 10 及以上、macOS 10.15 及以上、iOS 12.0 及以上、Android 5.0 及以上"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Hulu、HBO、Disney+、DAZN"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "lw888",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "lw888"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "使用限制",
          "新用户首单专享"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "24/7 在线协助"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "worryfree",
    "md_no": 10,
    "md_name": "无忧",
    "english_name": null,
    "official_site": null,
    "positioning": "低门槛入门机场，月付 ¥19 起，年付 MINI 只要 ¥79，主打跨境电商与 TikTok",
    "best_advantage": "门槛低、全线节点无倍率、不限设备，支持 TikTok 跨区直连",
    "suited_for": "预算有限想先试一个月的人、跨境电商与 TikTok 用户、需要备用机场的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，另有东南亚、欧美地区，共 50+ 个节点",
      "per_region_count": null,
      "line_type": "IPLC 专线",
      "per_region_line": [],
      "multiplier": "全线节点 1x，无倍率",
      "other": []
    },
    "long_cycle_note": "没有半年付",
    "custom_plans": [],
    "flow_rules": [
      "周期套餐流量每月重置，未用完的流量不结转到下月",
      "所有套餐不限速"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（2026 年 10 月起新订单只能使用官方客户端，老用户原有订阅不受影响）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Disney+、YouTube、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini"
      ],
      [
        "跨境 / 社交",
        "支持 TikTok 跨区直连与直播"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "wuyou666",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "wuyou666"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "不适用",
          "MINI 链接"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "7×24 小时在线，夜间由 AI 客服值守"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "firefly",
    "md_no": 11,
    "md_name": "Firefly",
    "english_name": null,
    "official_site": null,
    "positioning": "IPLC 专线入门机场，月付 ¥25 含 150 GB，主打低延迟与晚高峰稳定",
    "best_advantage": "低延迟、晚高峰稳定",
    "suited_for": "常用 AI 办公或深夜追剧的人、多设备用户、用量不大想年付的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "IPLC 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": "没有半年付",
    "custom_plans": [],
    "flow_rules": [
      "周期套餐流量每月重置，未用完的流量不结转到下月"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（2026 年 10 月起新订单只能使用官方客户端，老用户原有订阅不受影响）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "YouTube、Netflix、Disney+、HBO"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini、Meta AI"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "firefly",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "firefly"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "适用套餐",
          "Lite、Plus、Blaze、Nova"
        ],
        [
          "不适用",
          "年付版"
        ],
        [
          "使用限制",
          "新用户专享"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "7×24 小时在线，夜间由 AI 客服值守"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "globalcloud",
    "md_no": 14,
    "md_name": "全球云",
    "english_name": null,
    "official_site": null,
    "positioning": "节点规模大的大流量机场，入门月付 ¥20 含 120 GB，顶档每月 1500 GB",
    "best_advantage": "节点多、地区广，长周期最低三年付 6 折",
    "suited_for": "流量需求大的人、需要独享 IP 的人、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、马来西亚、德国、土耳其、巴西等，共 60+ 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10",
      "line_type": "BGP 智能优化 + 专线出口，轻量版为全 IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": "季付 9 折、半年付 85 折、年付 8 折、两年付 7 折、三年付 6 折",
    "custom_plans": [],
    "flow_rules": [
      "未用完的流量不结转到下月",
      "所有套餐不限速"
    ],
    "devices": "常规套餐不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "常规套餐不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android、路由器"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Hulu、HBO、Disney+、DAZN"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "qq88",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "qq88"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "不适用",
          "独享私人专线节点"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "付款方式",
        "支付宝、微信、USDT"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "v2yun",
    "md_no": 12,
    "md_name": "唯兔云",
    "english_name": "OnlyRabbit",
    "official_site": null,
    "positioning": "低价入门、多地区节点的专线机场，月付 ¥19.9 起含 150 GB",
    "best_advantage": "价格低、档位多，其他地区可找客服加开",
    "suited_for": "看重每 GB 单价的人、预算有限的人、个人家庭或小团队",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、马来西亚、美国、英国、德国、法国、泰国、菲律宾、印度等，共 50+ 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10、马来西亚 2、英国 1、德国 1、法国 1",
      "line_type": "全 IPLC 专线，年付加强专线为 IEPL，另有备用直连节点",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": "年付 8 折、两年付 7 折、三年付 6 折，节日活动可再打折",
    "custom_plans": [],
    "flow_rules": [
      "周期套餐流量每月重置，未用完的流量不结转到下月",
      "所有套餐不限速"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Hulu、HBO、Disney+、HUGO"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini"
      ],
      [
        "跨境 / 社交",
        "TikTok"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "rabbit",
      "discount": "9 折",
      "pairs": [
        [
          "优惠码",
          "rabbit"
        ],
        [
          "折扣",
          "9 折"
        ],
        [
          "适用套餐",
          "普通版、进阶版、专业版、至尊版"
        ],
        [
          "不适用",
          "年付版限量款、年付加强专线"
        ],
        [
          "使用限制",
          "新用户专享"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "全天在线"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": "官网首屏写正常运营，服务公告却写节点全部暂时无法使用，两处都没有日期，站长的资料提醒先确认是否正常运营"
  },
  {
    "brand_id": "civet",
    "md_no": 13,
    "md_name": "灵猫",
    "english_name": null,
    "official_site": null,
    "positioning": "全 IPLC 专线、不限设备，年付性价比极高",
    "best_advantage": "年付 Big 每 GB 约 ¥0.082，34 家中最低",
    "suited_for": "愿意年付的长期用户、多设备用户、需要直播电商定制线路的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "全 IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": "没有半年付",
    "custom_plans": [
      "独享 / 定制线路：大流量定制（直播、电商专线）：¥999/月，细节以客服报价为准"
    ],
    "flow_rules": [
      "按订单日每月自动重置流量",
      "流量用完可购买加油包补充",
      "不限速，最大带宽 1000Mbps"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（2026 年 10 月起新订单只能使用官方客户端，老用户原有订阅不受影响）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Hulu、HBO、Disney+、HUGO"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini"
      ],
      [
        "跨境 / 社交",
        "TikTok"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "lingmao",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "lingmao"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "适用套餐",
          "Small、Big"
        ],
        [
          "不适用",
          "年付小包"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "全天在线"
      ],
      [
        "",
        "增加节点需提交工单"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "flashleap",
    "md_no": 16,
    "md_name": "闪跃",
    "english_name": "FlashLeap",
    "official_site": null,
    "positioning": "纯 IPLC 专线机场，主打晚高峰稳定，入门档约 ¥0.16/GB",
    "best_advantage": "IPLC 专线、晚高峰稳定、单价低",
    "suited_for": "长期高频使用 AI 或追剧的人、在意 IPLC 线路的人、想一年付一次的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "全 IPLC 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "以官网说明为准"
    ],
    "devices": "以官网说明为准",
    "devices_clients": [
      [
        "设备数",
        "以官网说明为准"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android、Linux"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、HBO"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude、Gemini"
      ],
      [
        "跨境 / 社交",
        "TikTok"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "shanyue",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "shanyue"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "适用套餐",
          "闪动、飞跃、瞬移、跃迁"
        ],
        [
          "不适用",
          "闪跃年付版"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "laddercloud",
    "md_no": 7,
    "md_name": "梯子云",
    "english_name": "LadderCloud",
    "official_site": null,
    "positioning": "大流量档位机场，顶档每月 1600 GB，入门月付 ¥25 含 125 GB",
    "best_advantage": "大流量、长周期折扣清楚，全节点 1x",
    "suited_for": "流量用量大的人、需要独享 IP 的人、偶尔使用的人、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国，共 6 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "IEPL 专线 + BGP 三网优化与高速中转",
      "per_region_line": [],
      "multiplier": "全节点统一 1x 倍率",
      "other": []
    },
    "long_cycle_note": "季付 95 折、半年付 9 折、年付 85 折",
    "custom_plans": [],
    "flow_rules": [
      "所有周期套餐每月重置，未用完的流量不结转到下月"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "自研全平台客户端（含 Android、iOS）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Disney+、YouTube"
      ],
      [
        "AI 工具",
        "ChatGPT"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "tzy888",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "tzy888"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "stardream",
    "md_no": 18,
    "md_name": "星岛梦",
    "english_name": "StarDream",
    "official_site": null,
    "positioning": "运营约 6 年的老牌机场，套餐形式丰富、节点地区多，入门 ¥25 含 150 GB",
    "best_advantage": "2020 年开业的老牌机场，全节点 1x、晚高峰不降速，有永久流量包",
    "suited_for": "学生、多设备家庭或小团队、需要多地区出口的人、偶尔使用的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、马来西亚、英国、法国、德国、土耳其、泰国、巴西、菲律宾等，共 50+ 个节点",
      "per_region_count": "香港 20、台湾 5、日本 10、新加坡 10、美国 10",
      "line_type": "IEPL / IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率，晚高峰不降速",
      "other": []
    },
    "long_cycle_note": "两年付 7 折、三年付 6 折，长期有效",
    "custom_plans": [],
    "flow_rules": [
      "每 30 天自动刷新流量",
      "晚高峰不降速，单节点峰值至 2.5Gbps"
    ],
    "devices": "不限设备（电脑、手机、路由器可同时在线）",
    "devices_clients": [
      [
        "设备数",
        "不限设备（电脑、手机、路由器可同时在线）"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、HBO Max、YouTube、Spotify、Hulu、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Copilot、Gemini"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "nmw888",
      "discount": "9 折",
      "pairs": [
        [
          "优惠码",
          "nmw888"
        ],
        [
          "折扣",
          "9 折"
        ],
        [
          "不适用",
          "贴心小包"
        ],
        [
          "使用限制",
          "新用户专享"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "lightspeed",
    "md_no": 19,
    "md_name": "光速云",
    "english_name": "LightSpeed",
    "official_site": null,
    "positioning": "地区覆盖最多的专线机场之一，入门 ¥23 含 138 GB",
    "best_advantage": "覆盖 10 个地区（34 家中并列第 1），有美国原生家宽 IP 定制",
    "suited_for": "看重每 GB 单价的人、需要多出口地区的人、需要固定 IP 的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国、马来西亚、英国、法国、德国、土耳其、泰国、巴西等，共 50+ 个节点",
      "per_region_count": "香港 20、日本 10、新加坡 10、美国 10、台湾 5",
      "line_type": "月付套餐为 IEPL 专线，轻量版为 IPLC 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "每 30 天自动刷新流量",
      "单节点最高 2.5Gbps"
    ],
    "devices": "不限设备，多端同时在线",
    "devices_clients": [
      [
        "设备数",
        "不限设备，多端同时在线"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android、Linux"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "YouTube、Netflix、Disney+、Hulu、HBO、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "AMM",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "AMM"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "7×24 小时运维支持"
      ],
      [
        "退款",
        "特殊商品不支持退款"
      ],
      [
        "试用",
        "无免费试用"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": "各来源对套餐流量和价格的写法差异最大，站长的资料标注需要优先核对"
  },
  {
    "brand_id": "u1s1",
    "md_no": 20,
    "md_name": "有一说一",
    "english_name": "U1S1",
    "official_site": null,
    "positioning": "大流量档位、套餐命名有趣的专线机场，最低 ¥20/月含 120 GB",
    "best_advantage": "大流量（最高每月 1500 GB），每两个月额外增加 200 兆带宽",
    "suited_for": "流量用得多的人、需要多出口地区的人、多台设备一起用的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、英国、德国、法国，共 8 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "BGP 三网智能优化 + IEPL 专线出口",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": "季付 9 折、半年付 85 折、年付 8 折",
    "custom_plans": [
      "独享 / 定制线路：定制包：流量按需定制，¥600/月"
    ],
    "flow_rules": [
      "每自然月自动重置流量",
      "所有套餐不限速"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android、路由器"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Disney+、HBO、DAZN"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude、Midjourney"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "U1S1",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "U1S1"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "不适用",
          "就是好用包"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "jilianyun",
    "md_no": 21,
    "md_name": "极连云",
    "english_name": null,
    "official_site": null,
    "positioning": "面向跨境电商、外贸与跨国公司的多地区专线机场，最低月付 ¥18 含 100 GB",
    "best_advantage": "最低月付 ¥18，地区多（含欧洲、东南亚），最大 2.5Gbps",
    "suited_for": "跨境电商与外贸用户、预算有限的人、需要多出口地区的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、马来西亚、韩国、德国、法国、英国、泰国、土耳其，共 50+ 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10",
      "line_type": "全 IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率，晚高峰不限速",
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "季付以上从购买日起每 30 天自动更新流量",
      "晚高峰不限速，最大 2.5Gbps"
    ],
    "devices": "不限客户端数量",
    "devices_clients": [
      [
        "设备数",
        "不限客户端数量"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "解锁各大流媒体"
      ],
      [
        "AI 工具",
        "ChatGPT"
      ],
      [
        "跨境 / 社交",
        "TikTok"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "JLY888",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "JLY888"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "退款",
        "不接受退款"
      ],
      [
        "试用",
        "无免费试用"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": "进阶、尊享等套餐的长周期价格是按旧月付价算的，与现在的月付价对不上，站长的资料标注疑似写错"
  },
  {
    "brand_id": "guangnianti",
    "md_no": 22,
    "md_name": "光年梯",
    "english_name": null,
    "official_site": null,
    "positioning": "低单价专线机场，入门版 ¥18/月含 110 GB，约 ¥0.16/GB",
    "best_advantage": "单价低，官方客户端支持路由器和 Apple Silicon Mac",
    "suited_for": "看重每 GB 单价的人、预算有限想先买一个月的人、需要独享 IP 的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、马来西亚、美国，共 6 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "IPLC / IEPL 专线，独享专线为 IEPL",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": "两年付 7 折、三年付 6 折",
    "custom_plans": [],
    "flow_rules": [
      "季付及以上每 30 天自动重置流量",
      "晚高峰不限速，最高 2.5Gbps"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS（Intel 与 Apple Silicon）、iOS、Android、路由器"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（只能使用官方自研客户端）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "GN888",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "GN888"
        ],
        [
          "叠加",
          "可与年付优惠叠加"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "退款",
        "不提供退款"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "sogoyun",
    "md_no": 17,
    "md_name": "Sogo云",
    "english_name": "SOGO Cloud",
    "official_site": null,
    "positioning": "IEPL 专线机场，节点地区覆盖最广之一，入门 ¥25 含 150 GB",
    "best_advantage": "覆盖 15 个国家和地区，另有 4 档不限时流量",
    "suited_for": "需要多个出口地区的人、多设备用户、偶尔使用的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国、马来西亚、英国、法国、德国、土耳其、泰国、巴西等，共 55 个节点",
      "per_region_count": "香港 20、台湾 5、日本 10、新加坡 10、美国 10",
      "line_type": "IEPL 专线 + 三网 BGP 优化",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "每 30 天刷新流量"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android、主流软路由"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（只能使用自研官方客户端）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Disney+、HBO Max、Hulu、YouTube Premium"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude、Midjourney"
      ],
      [
        "跨境 / 社交",
        "TikTok"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "SOGO10000",
      "discount": "9 折",
      "pairs": [
        [
          "优惠码",
          "SOGO10000"
        ],
        [
          "折扣",
          "9 折"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "试用",
        "无免费试用"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": "基础版、顶配版年付比两次半年付还贵，站长的资料标注疑似写错"
  },
  {
    "brand_id": "yuzhou",
    "md_no": 23,
    "md_name": "宇宙云",
    "english_name": "YuZhou",
    "official_site": null,
    "positioning": "全 IEPL 专线、低单价机场，入门档约 ¥0.16/GB，长周期最长到三年付",
    "best_advantage": "IEPL 专线 + VLESS 协议，长周期选择最齐全，不限设备",
    "suited_for": "要专线又想控价的人、大流量用户、需要独享原生 IP 的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国、马来西亚、越南、菲律宾、泰国、印度、英国、法国、德国、阿根廷等，共 50+ 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10、韩国 3",
      "line_type": "IEPL 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率，晚高峰不降速",
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [
      "独享 / 定制线路：家宽定制套餐（独享原生 IP，可选地区与节点）：一次性 ¥600，细节以客服报价为准"
    ],
    "flow_rules": [
      "每 30 天刷新流量",
      "流量用完可购买重置",
      "不限速，晚高峰不降速"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android、Linux"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Disney+、HBO、YouTube、Hulu、BBC iPlayer、Amazon Prime Video"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini"
      ],
      [
        "跨境 / 社交",
        "TikTok"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "YUZHOU553",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "YUZHOU553"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "适用套餐",
          "行星、恒星、星系、寰宇四款常规套餐"
        ],
        [
          "不适用",
          "星云年付小包、不限时套餐"
        ],
        [
          "使用限制",
          "新用户专享"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "在线客服"
      ],
      [
        "客服时间",
        "每日 10:00–22:00"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "2mao",
    "md_no": 24,
    "md_name": "二猫云",
    "english_name": "2mao",
    "official_site": null,
    "positioning": "低单价、主打长期稳定的专线机场，白猫套餐 ¥20/月含 130 GB",
    "best_advantage": "入门约 ¥0.15/GB，AI 解锁实测通过（含 Claude Code）",
    "suited_for": "三网用户、AI 用户、大流量用户、需要美国家宽 IP 的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，50+ 个节点",
      "per_region_count": "香港 20、日本 10、新加坡 10、美国 10、台湾 5",
      "line_type": "IPLC / IEPL 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率，晚高峰不降速",
      "other": []
    },
    "long_cycle_note": "季付 95 折、半年付 9 折、年付 85 折",
    "custom_plans": [],
    "flow_rules": [
      "每 30 天自动刷新流量",
      "晚高峰不降速，单节点峰值至 2.5Gbps"
    ],
    "devices": "不限设备（电脑、手机、路由器可同时在线）",
    "devices_clients": [
      [
        "设备数",
        "不限设备（电脑、手机、路由器可同时在线）"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、HBO Max、Hulu、YouTube Premium、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Claude、Midjourney"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "ermao888",
      "discount": "85 折",
      "pairs": [
        [
          "优惠码",
          "ermao888"
        ],
        [
          "折扣",
          "85 折"
        ],
        [
          "不适用",
          "二猫年付小包"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "1fly",
    "md_no": 25,
    "md_name": "一翻云",
    "english_name": "1fly",
    "official_site": null,
    "positioning": "全 IEPL 专线、超低单价机场，轻享版 ¥20/月含 150 GB",
    "best_advantage": "每 GB 成本在 34 家中并列第 1，长周期最长三年付，不限时包永久不过期",
    "suited_for": "看重每 GB 单价的人、多设备与重度流量用户、偶尔使用的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、英国，共 6 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "全 IEPL 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "不限速，官方称单节点 2Gbps、晚高峰 0 丢包"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（只能使用官方自研客户端，不开放第三方通用订阅）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生住宅 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、HBO Max、YouTube、Spotify、Hulu、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Copilot、Gemini"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "1FLYYUN",
      "discount": "9 折",
      "pairs": [
        [
          "优惠码",
          "1FLYYUN"
        ],
        [
          "折扣",
          "9 折"
        ],
        [
          "适用套餐",
          "四个常规套餐全部周期，以及三个不限时包"
        ],
        [
          "不适用",
          "98¥·年付小包"
        ],
        [
          "使用限制",
          "新用户专享"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "试用",
        "无免费试用"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "edgenova",
    "md_no": 26,
    "md_name": "边缘节点",
    "english_name": "EdgeNova",
    "official_site": null,
    "positioning": "多地区专线、多设备友好的机场，入门 ¥25/月含 120 GB，另有 ¥15 体验月付小包",
    "best_advantage": "地区多、不限设备，可先用 ¥15 小包体验",
    "suited_for": "想要专线又要多设备的人、需要多出口地区的人、想先小额体验的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国、马来西亚、泰国、越南、英国、法国、德国等，共 50+ 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10、韩国 3",
      "line_type": "全 IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率，高峰不降速",
      "other": []
    },
    "long_cycle_note": "两年付 8 折、三年付 75 折，长期有效",
    "custom_plans": [],
    "flow_rules": [
      "年费小包每月自动刷新",
      "高峰不降速，最高 2.5Gbps"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android、Linux、路由器"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不提供（目前只能使用官方客户端）"
      ],
      [
        "第三方客户端",
        "不支持导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、HBO、YouTube"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini"
      ],
      [
        "跨境 / 社交",
        "TikTok"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "XK808",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "XK808"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "不适用",
          "限时体验月付小包"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "退款",
        "官方称退款规则后续公布"
      ],
      [
        "试用",
        "无免费试用"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ],
      [
        "防骗提醒",
        "edgenova.club 不是官网"
      ]
    ],
    "needs_check": "标准套餐和限时年付价格各来源不一致，站长的资料标注待确认"
  },
  {
    "brand_id": "kosing",
    "md_no": 27,
    "md_name": "可信云",
    "english_name": null,
    "official_site": null,
    "positioning": "全 IEPL 专线、低门槛入门的机场，最低月付 ¥15 含 60 GB",
    "best_advantage": "最低月付 ¥15，全 IEPL 专线，60+ 专线节点",
    "suited_for": "预算有限想先买一个月试用的人、偶尔使用的人、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国，另有东南亚、印度、欧美，共 60+ 个节点",
      "per_region_count": null,
      "line_type": "全 IEPL 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": "季付 95 折、半年付 9 折、年付 85 折、两年付 8 折、三年付 7 折",
    "custom_plans": [],
    "flow_rules": [
      "流量用完可重置，享 9 折",
      "所有套餐不限速"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "解锁各大流媒体"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini"
      ],
      [
        "跨境 / 社交",
        "TikTok"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "kxy80",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "kxy80"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "sujie",
    "md_no": 28,
    "md_name": "速界",
    "english_name": "SuJie",
    "official_site": null,
    "positioning": "低价入门、地区多的 IPLC 专线机场，¥15 可单月试用",
    "best_advantage": "¥15 单月试用，地区多（含韩国、欧洲、南美），不限设备",
    "suited_for": "预算有限想先试一个月的人、需要多出口地区的人、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、韩国、马来西亚、越南、菲律宾、泰国、印度、德国、英国、法国、阿根廷等，共 50+ 个节点",
      "per_region_count": "香港 20、台湾 10、日本 10、新加坡 10、美国 10、韩国 3",
      "line_type": "全 IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率，高峰不降速",
      "other": []
    },
    "long_cycle_note": "两年付 7 折、三年付 6 折",
    "custom_plans": [],
    "flow_rules": [
      "不限速，高峰不降速，最高 2.5Gbps"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、iOS、Android、Linux"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "sujie888",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "sujie888"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "不适用",
          "单月试用"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服时间",
        "全天在线"
      ],
      [
        "试用",
        "有 ¥15 单月试用套餐（50 GB）"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": "套餐流量与部分价格各来源不一致，且年付比两次半年付还贵，站长的资料标注疑似写错"
  },
  {
    "brand_id": "kuaili",
    "md_no": 29,
    "md_name": "快狸",
    "english_name": "KuaiLi",
    "official_site": null,
    "positioning": "全 IEPL 专线、低价入门的机场，最低月付 ¥15 含 50 GB，覆盖 9 个地区",
    "best_advantage": "入门价低、全 IEPL 专线、地区多",
    "suited_for": "预算有限想先买一个月的人、需要多出口地区的人、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国、马来西亚、英国、法国、德国、土耳其、泰国、巴西等，共 50+ 个节点",
      "per_region_count": "香港 20、日本 10、新加坡 10、美国 10、台湾 5、马来西亚 2",
      "line_type": "全 IEPL 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率，晚高峰不降速",
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "每 30 天自动刷新流量",
      "晚高峰不降速，单节点峰值至 2.5Gbps"
    ],
    "devices": "不限设备（电脑、手机、路由器可同时在线）",
    "devices_clients": [
      [
        "设备数",
        "不限设备（电脑、手机、路由器可同时在线）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、HBO Max、YouTube、Spotify、Hulu、TikTok"
      ],
      [
        "AI 工具",
        "ChatGPT、Copilot、Gemini"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "kuaili996",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "kuaili996"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": "年付比两次半年付还贵，站长的资料标注疑似写错"
  },
  {
    "brand_id": "kuajie",
    "md_no": 15,
    "md_name": "跨界",
    "english_name": null,
    "official_site": null,
    "positioning": "大流量机场，顶档每月 1800 GB 只要 ¥130，入门 ¥20 含 120 GB",
    "best_advantage": "每 GB 单价低，顶档 1800 GB 在 34 家中并列第 2",
    "suited_for": "流量用得多的人、多设备用户、想先小额试用的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，50+ 个节点",
      "per_region_count": null,
      "line_type": "IPLC 专线",
      "per_region_line": [],
      "multiplier": "所有节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "从购买日起算每月流量",
      "所有套餐不限速"
    ],
    "devices": "不限登录设备数",
    "devices_clients": [
      [
        "设备数",
        "不限登录设备数"
      ],
      [
        "支持系统",
        "Windows 10 及以上、macOS 10.15 及以上、iOS 12.0 及以上、Android 5.0 及以上"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "流媒体",
        "Netflix、Hulu、HBO、Disney+、DAZN"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini、Claude"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "kuajie",
      "discount": "8 折",
      "pairs": [
        [
          "优惠码",
          "kuajie"
        ],
        [
          "折扣",
          "8 折"
        ],
        [
          "使用限制",
          "新用户专享"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "在线客服"
      ],
      [
        "付款方式",
        "微信、支付宝"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "liulianyun",
    "md_no": 30,
    "md_name": "榴莲云",
    "english_name": null,
    "official_site": null,
    "positioning": "2026 年 9 月上线的低价新机场，月付 ¥24 起含 140 GB，口号「吃着榴莲翻着墙」",
    "best_advantage": "不限设备，有一次性流量包",
    "suited_for": "偶尔使用的人、多设备用户、用量不大想年付的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，60 个节点",
      "per_region_count": null,
      "line_type": "IEPL / IPLC 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "以官网说明为准"
    ],
    "devices": "全部套餐不限设备",
    "devices_clients": [
      [
        "设备数",
        "全部套餐不限设备"
      ],
      [
        "支持系统",
        "Windows、macOS、Android（官方客户端），iOS（通过 Nextin）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "AI 工具",
        "ChatGPT、Claude、Gemini"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "ll88",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "ll88"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "官方交流群、在线客服"
      ],
      [
        "退款",
        "退款条款未公开"
      ],
      [
        "试用",
        "无免费试用"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ],
      [
        "防骗提醒",
        "与「榴莲加速器」及 liulianyun.com 无关"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "shandianyun",
    "md_no": 31,
    "md_name": "闪电云",
    "english_name": null,
    "official_site": null,
    "positioning": "低价入门机场，最低月付 ¥19.9 含 100 GB",
    "best_advantage": "入门价低于 34 家中位数，不限设备",
    "suited_for": "预算有限想先试一个月的人、多设备用户、用量不大想年付的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，60 个节点",
      "per_region_count": null,
      "line_type": "IEPL / IPLC 专线",
      "per_region_line": [],
      "multiplier": "全节点 1x 倍率",
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [
      "短期套餐：新手体验：¥1.9/天",
      "短期套餐：标准套餐：¥9.9/周"
    ],
    "flow_rules": [
      "所有套餐不限速"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、Android（官方客户端），iOS（通过 Nextin）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "AI 工具",
        "ChatGPT"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "sd88",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "sd88"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "Crisp 在线客服、工单"
      ],
      [
        "退款",
        "退款条款未公开"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ],
      [
        "防骗提醒",
        "与「星岛梦」（原 ThunderMouse）不是同一家"
      ]
    ],
    "needs_check": "官网存档自称“静态演示站点”，价格与口碑文字不能当真，站长的资料提醒先确认是否在营业"
  },
  {
    "brand_id": "huanqiuyun",
    "md_no": 32,
    "md_name": "环球云",
    "english_name": null,
    "official_site": null,
    "positioning": "入门价最低的多地区 IPLC 机场，月付 ¥12 起，另有学生年付套餐",
    "best_advantage": "入门价最低（¥12/月），有 ¥96 学生年付",
    "suited_for": "学生、预算有限想先试月付的人、偶尔使用的人",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，60 个节点",
      "per_region_count": null,
      "line_type": "IPLC 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "所有套餐不限速"
    ],
    "devices": "按套餐限制：轻享 3 台、畅游 5 台、尊享 10 台；流量包限 5 / 8 台",
    "devices_clients": [
      [
        "设备数",
        "按套餐限制：轻享 3 台、畅游 5 台、尊享 10 台；流量包限 5 / 8 台"
      ],
      [
        "支持系统",
        "Windows、macOS、Android（官方客户端），iOS（通过 Nextin）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "AI 工具",
        "ChatGPT"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "HQ66",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "HQ66"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "官方交流群 @huanqiuti88"
      ],
      [
        "退款",
        "退款条款未公开，建议先咨询客服"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ],
      [
        "防骗提醒",
        "「环球云」有同名云计算公司，与本机场无关"
      ],
      [
        "防骗提醒",
        "t.me/huanqiuti 是体育博彩账号，不是官方频道"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "shenxingyun",
    "md_no": 33,
    "md_name": "神行云",
    "english_name": null,
    "official_site": null,
    "positioning": "低单价的专线机场，入门月付 ¥23，使用原生家宽 IP",
    "best_advantage": "入门约 ¥0.15/GB（34 家中并列第 4），新客优惠码 7 折，长周期选择多",
    "suited_for": "关注每 GB 单价的人、偶尔使用的人、多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，60 个节点",
      "per_region_count": null,
      "line_type": "IPLC 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "不限速，官标最高 500Mbps"
    ],
    "devices": "全部套餐不限设备",
    "devices_clients": [
      [
        "设备数",
        "全部套餐不限设备"
      ],
      [
        "支持系统",
        "Windows、macOS、Android（官方客户端），iOS（通过 Nextin）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "",
        "使用原生家宽 IP"
      ],
      [
        "流媒体",
        "Netflix、Disney+、YouTube"
      ],
      [
        "AI 工具",
        "ChatGPT、Gemini、Claude"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "sx0077",
      "discount": "7 折",
      "pairs": [
        [
          "优惠码",
          "sx0077"
        ],
        [
          "折扣",
          "7 折"
        ],
        [
          "使用限制",
          "新客专享（请勿与客户端识别码 xs0077 混淆）"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "面板内在线客服与工单、Telegram 交流群"
      ],
      [
        "退款",
        "退款条款未公开"
      ],
      [
        "付款方式",
        "支付宝、微信支付、USDT"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ],
      [
        "防骗提醒",
        "官网域名可能不定期更换，请从推广链接进入，不要自行搜索"
      ]
    ],
    "needs_check": null
  },
  {
    "brand_id": "yunjieyun",
    "md_no": 34,
    "md_name": "云界云",
    "english_name": null,
    "official_site": null,
    "positioning": "低单价、付款周期多的入门型机场，入门档约 ¥0.15/GB",
    "best_advantage": "入门约 ¥0.15/GB（34 家中并列第 4），最长可选三年付",
    "suited_for": "长期付费、看重每 GB 单价的人，偶尔使用的人，多设备用户",
    "nodes": {
      "regions": "香港、台湾、日本、新加坡、美国，共 5 个地区，60 个节点",
      "per_region_count": null,
      "line_type": "IPLC 专线",
      "per_region_line": [],
      "multiplier": null,
      "other": []
    },
    "long_cycle_note": null,
    "custom_plans": [],
    "flow_rules": [
      "常规套餐每月重置一次，可付费重置",
      "年付小包每 30 天自动重置"
    ],
    "devices": "不限同时在线设备数",
    "devices_clients": [
      [
        "设备数",
        "不限同时在线设备数"
      ],
      [
        "支持系统",
        "Windows、macOS、Android（官方客户端），iOS（通过 Nextin）"
      ],
      [
        "使用方式",
        "官方客户端，账号登录即可连接"
      ],
      [
        "订阅链接",
        "不推荐使用，避免订阅外泄被他人盗用导致节点拥挤"
      ],
      [
        "第三方客户端",
        "不推荐导入 Clash、小火箭等"
      ],
      [
        "说明",
        "官网客户端由官方统一发布和更新，同样可以安全使用"
      ],
      [
        "下载渠道",
        "仅限官网；网上出售的订阅链接或网盘分发的客户端均非官方渠道"
      ]
    ],
    "media_ai": [
      [
        "AI 工具",
        "ChatGPT"
      ],
      [
        "说明",
        "速度、稳定性及流媒体、AI 工具的可用性不作持续保证，以实测为准"
      ]
    ],
    "coupon": {
      "code": "yjx888",
      "discount": null,
      "pairs": [
        [
          "优惠码",
          "yjx888"
        ],
        [
          "使用方法",
          "在结算页优惠码栏填写，实付金额以结算页显示为准"
        ]
      ]
    },
    "service": [
      [
        "客服渠道",
        "Crisp 在线客服、工单"
      ],
      [
        "退款",
        "退款条款未公开"
      ],
      [
        "防骗提醒",
        "只通过官网注册购买，价格与优惠以结算页为准"
      ],
      [
        "防骗提醒",
        "没有官方 Telegram，自称官方 Telegram 的都不是"
      ]
    ],
    "needs_check": "季付、半年付比月付乘以 3、6 还贵（月付降价后长周期价格没有更新），站长的资料标注疑似写错"
  }
];

const BY_ID = new Map(BRAND_MD.map((b) => [b.brand_id, b]));

export function getBrandMd(brandId: string): BrandMd {
  const md = BY_ID.get(brandId);
  if (!md) throw new Error(`机场 MD 缺少品牌：${brandId}`);
  return md;
}
