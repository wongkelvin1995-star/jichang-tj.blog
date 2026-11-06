/** 每家 MD 里的倍率、设备数、限速、退款原文（没写就是 null）。由 scripts/import_md.mjs 生成，不要手改；用法见 brandTerms.ts。 */
export interface BrandTermsRow {
  brand_id: string;
  name: string;
  multiplier: string | null;
  devices: string | null;
  speed: string | null;
  refund: string | null;
}

export const BRAND_TERMS_DATA: BrandTermsRow[] = [
  {
    "brand_id": "lingdongyun",
    "name": "灵动云",
    "multiplier": "全节点统一 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": "所有套餐不限速",
    "refund": "可申请退款与升级补差价，具体条件以平台指引为准"
  },
  {
    "brand_id": "twilight",
    "name": "暮光加速",
    "multiplier": "全节点 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": "所有套餐不限速",
    "refund": "提供退款，具体条件请先询问客服"
  },
  {
    "brand_id": "breezenet",
    "name": "微风网络",
    "multiplier": null,
    "devices": "不限同时在线设备数，所有设备共用同一份流量",
    "speed": "所有套餐不限速",
    "refund": null
  },
  {
    "brand_id": "flycat",
    "name": "飞猫云",
    "multiplier": "全节点 1x 倍率，高峰不降速",
    "devices": "不限同时在线设备数",
    "speed": "高峰不降速，单节点最高 2.5Gbps",
    "refund": null
  },
  {
    "brand_id": "dalaoyun",
    "name": "大佬云",
    "multiplier": "周期套餐全节点 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": "晚高峰不限速，单节点最高 2.5Gbps",
    "refund": null
  },
  {
    "brand_id": "invisible",
    "name": "隐形人",
    "multiplier": "全节点 1x 倍率",
    "devices": "周期套餐不限设备；一次性流量包限 1 / 2 / 3 台",
    "speed": "所有套餐不限速",
    "refund": "支持不满意退款，适用范围以条款为准"
  },
  {
    "brand_id": "flyv",
    "name": "飞V",
    "multiplier": "常规会员套餐全节点统一 1x 倍率",
    "devices": "常规周期套餐不限同时在线设备数，所有设备共享同一套餐流量",
    "speed": null,
    "refund": null
  },
  {
    "brand_id": "wavenet",
    "name": "浪网",
    "multiplier": "所有节点 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": "入门、进阶、商业套餐无速率限制",
    "refund": null
  },
  {
    "brand_id": "worryfree",
    "name": "无忧",
    "multiplier": "全线节点 1x，无倍率",
    "devices": "不限同时在线设备数",
    "speed": "所有套餐不限速",
    "refund": null
  },
  {
    "brand_id": "firefly",
    "name": "Firefly",
    "multiplier": null,
    "devices": "不限同时在线设备数",
    "speed": null,
    "refund": null
  },
  {
    "brand_id": "globalcloud",
    "name": "全球云",
    "multiplier": "全节点 1x 倍率",
    "devices": "常规套餐不限同时在线设备数",
    "speed": "所有套餐不限速",
    "refund": null
  },
  {
    "brand_id": "v2yun",
    "name": "唯兔云",
    "multiplier": "全节点 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": "所有套餐不限速",
    "refund": null
  },
  {
    "brand_id": "civet",
    "name": "灵猫",
    "multiplier": "全节点 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": "不限速，最大带宽 1000Mbps",
    "refund": null
  },
  {
    "brand_id": "flashleap",
    "name": "闪跃",
    "multiplier": null,
    "devices": "以官网说明为准",
    "speed": null,
    "refund": null
  },
  {
    "brand_id": "laddercloud",
    "name": "梯子云",
    "multiplier": "全节点统一 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": null,
    "refund": null
  },
  {
    "brand_id": "stardream",
    "name": "星岛梦",
    "multiplier": "全节点 1x 倍率，晚高峰不降速",
    "devices": "不限设备（电脑、手机、路由器可同时在线）",
    "speed": "晚高峰不降速，单节点峰值至 2.5Gbps",
    "refund": null
  },
  {
    "brand_id": "lightspeed",
    "name": "光速云",
    "multiplier": null,
    "devices": "不限设备，多端同时在线",
    "speed": null,
    "refund": "特殊商品不支持退款"
  },
  {
    "brand_id": "u1s1",
    "name": "有一说一",
    "multiplier": null,
    "devices": "不限同时在线设备数",
    "speed": "所有套餐不限速",
    "refund": null
  },
  {
    "brand_id": "jilianyun",
    "name": "极连云",
    "multiplier": "全节点 1x 倍率，晚高峰不限速",
    "devices": "不限客户端数量",
    "speed": "晚高峰不限速，最大 2.5Gbps",
    "refund": "不接受退款"
  },
  {
    "brand_id": "guangnianti",
    "name": "光年梯",
    "multiplier": "全节点 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": "晚高峰不限速，最高 2.5Gbps",
    "refund": "不提供退款"
  },
  {
    "brand_id": "sogoyun",
    "name": "Sogo云",
    "multiplier": "全节点 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": null,
    "refund": null
  },
  {
    "brand_id": "yuzhou",
    "name": "宇宙云",
    "multiplier": "全节点 1x 倍率，晚高峰不降速",
    "devices": "不限同时在线设备数",
    "speed": "不限速，晚高峰不降速",
    "refund": null
  },
  {
    "brand_id": "2mao",
    "name": "二猫云",
    "multiplier": "全节点 1x 倍率，晚高峰不降速",
    "devices": "不限设备（电脑、手机、路由器可同时在线）",
    "speed": "晚高峰不降速，单节点峰值至 2.5Gbps",
    "refund": null
  },
  {
    "brand_id": "1fly",
    "name": "一翻云",
    "multiplier": null,
    "devices": "不限同时在线设备数",
    "speed": "不限速，官方称单节点 2Gbps、晚高峰 0 丢包",
    "refund": null
  },
  {
    "brand_id": "edgenova",
    "name": "边缘节点",
    "multiplier": "全节点 1x 倍率，高峰不降速",
    "devices": "不限同时在线设备数",
    "speed": "高峰不降速，最高 2.5Gbps",
    "refund": "官方称退款规则后续公布"
  },
  {
    "brand_id": "kosing",
    "name": "可信云",
    "multiplier": null,
    "devices": "不限同时在线设备数",
    "speed": "所有套餐不限速",
    "refund": null
  },
  {
    "brand_id": "sujie",
    "name": "速界",
    "multiplier": "全节点 1x 倍率，高峰不降速",
    "devices": "不限同时在线设备数",
    "speed": "不限速，高峰不降速，最高 2.5Gbps",
    "refund": null
  },
  {
    "brand_id": "kuaili",
    "name": "快狸",
    "multiplier": "全节点 1x 倍率，晚高峰不降速",
    "devices": "不限设备（电脑、手机、路由器可同时在线）",
    "speed": "晚高峰不降速，单节点峰值至 2.5Gbps",
    "refund": null
  },
  {
    "brand_id": "kuajie",
    "name": "跨界",
    "multiplier": "所有节点 1x 倍率",
    "devices": "不限登录设备数",
    "speed": "所有套餐不限速",
    "refund": null
  },
  {
    "brand_id": "liulianyun",
    "name": "榴莲云",
    "multiplier": null,
    "devices": "全部套餐不限设备",
    "speed": null,
    "refund": "退款条款未公开"
  },
  {
    "brand_id": "shandianyun",
    "name": "闪电云",
    "multiplier": "全节点 1x 倍率",
    "devices": "不限同时在线设备数",
    "speed": "所有套餐不限速",
    "refund": "退款条款未公开"
  },
  {
    "brand_id": "huanqiuyun",
    "name": "环球云",
    "multiplier": null,
    "devices": "按套餐限制：轻享 3 台、畅游 5 台、尊享 10 台；流量包限 5 / 8 台",
    "speed": "所有套餐不限速",
    "refund": "退款条款未公开，建议先咨询客服"
  },
  {
    "brand_id": "shenxingyun",
    "name": "神行云",
    "multiplier": null,
    "devices": "全部套餐不限设备",
    "speed": "不限速，官标最高 500Mbps",
    "refund": "退款条款未公开"
  },
  {
    "brand_id": "yunjieyun",
    "name": "云界云",
    "multiplier": null,
    "devices": "不限同时在线设备数",
    "speed": null,
    "refund": "退款条款未公开"
  }
];
