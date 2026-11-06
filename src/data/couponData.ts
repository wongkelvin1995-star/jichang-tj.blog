/** 每家 MD 里的优惠码、折扣幅度和适用条件原文。由 scripts/import_md.mjs 生成，不要手改；用法见 coupons.ts。 */
export interface CouponMd {
  brand_id: string;
  code: string;
  discount: string | null;
  condition_notes: string[];
}

export const COUPON_MD: CouponMd[] = [
  {
    "brand_id": "lingdongyun",
    "code": "ld888",
    "discount": "8 折",
    "condition_notes": [
      "适用：拂风、驭浪、破晓、凌霄四档周期套餐（含长周期）",
      "不适用：穿云、不限时流量包、至尊私人定制"
    ]
  },
  {
    "brand_id": "twilight",
    "code": "mm88",
    "discount": "8 折",
    "condition_notes": [
      "适用：周期套餐",
      "不适用：年付轻量版"
    ]
  },
  {
    "brand_id": "breezenet",
    "code": "weifeng90",
    "discount": "9 折",
    "condition_notes": [
      "适用：乘风、破风、御风",
      "不适用：清风、信风、长风"
    ]
  },
  {
    "brand_id": "flycat",
    "code": "flycat888",
    "discount": "8 折",
    "condition_notes": [
      "适用：季付及以上周期套餐",
      "不适用：月付",
      "限制：新用户专享"
    ]
  },
  {
    "brand_id": "dalaoyun",
    "code": "dly88",
    "discount": "7 折",
    "condition_notes": []
  },
  {
    "brand_id": "invisible",
    "code": "yxr888",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "flyv",
    "code": "fly20",
    "discount": "8 折（例如入门方案月付折后约 ¥20）",
    "condition_notes": [
      "适用：入门、进阶、高端、商业四档周期套餐（含长周期）",
      "不适用：年付标准轻量版、不限时流量包、独享黄金专线",
      "限制：新用户首单专享，每个账号限用一次"
    ]
  },
  {
    "brand_id": "wavenet",
    "code": "lw888",
    "discount": "8 折",
    "condition_notes": [
      "限制：新用户首单专享"
    ]
  },
  {
    "brand_id": "worryfree",
    "code": "wuyou666",
    "discount": "8 折",
    "condition_notes": [
      "不适用：MINI 链接"
    ]
  },
  {
    "brand_id": "firefly",
    "code": "firefly",
    "discount": "8 折",
    "condition_notes": [
      "适用：Lite、Plus、Blaze、Nova",
      "不适用：年付版",
      "限制：新用户专享"
    ]
  },
  {
    "brand_id": "globalcloud",
    "code": "qq88",
    "discount": "8 折",
    "condition_notes": [
      "不适用：独享私人专线节点"
    ]
  },
  {
    "brand_id": "v2yun",
    "code": "rabbit",
    "discount": "9 折",
    "condition_notes": [
      "适用：普通版、进阶版、专业版、至尊版",
      "不适用：年付版限量款、年付加强专线",
      "限制：新用户专享"
    ]
  },
  {
    "brand_id": "civet",
    "code": "lingmao",
    "discount": "8 折",
    "condition_notes": [
      "适用：Small、Big",
      "不适用：年付小包"
    ]
  },
  {
    "brand_id": "flashleap",
    "code": "shanyue",
    "discount": "8 折",
    "condition_notes": [
      "适用：闪动、飞跃、瞬移、跃迁",
      "不适用：闪跃年付版"
    ]
  },
  {
    "brand_id": "laddercloud",
    "code": "tzy888",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "stardream",
    "code": "nmw888",
    "discount": "9 折",
    "condition_notes": [
      "不适用：贴心小包",
      "限制：新用户专享"
    ]
  },
  {
    "brand_id": "lightspeed",
    "code": "AMM",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "u1s1",
    "code": "U1S1",
    "discount": "8 折",
    "condition_notes": [
      "不适用：就是好用包"
    ]
  },
  {
    "brand_id": "jilianyun",
    "code": "JLY888",
    "discount": "8 折",
    "condition_notes": []
  },
  {
    "brand_id": "guangnianti",
    "code": "GN888",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "sogoyun",
    "code": "SOGO10000",
    "discount": "9 折",
    "condition_notes": []
  },
  {
    "brand_id": "yuzhou",
    "code": "YUZHOU553",
    "discount": "8 折",
    "condition_notes": [
      "适用：行星、恒星、星系、寰宇四款常规套餐",
      "不适用：星云年付小包、不限时套餐",
      "限制：新用户专享"
    ]
  },
  {
    "brand_id": "2mao",
    "code": "ermao888",
    "discount": "85 折",
    "condition_notes": [
      "不适用：二猫年付小包"
    ]
  },
  {
    "brand_id": "1fly",
    "code": "1FLYYUN",
    "discount": "9 折",
    "condition_notes": [
      "适用：四个常规套餐全部周期，以及三个不限时包",
      "不适用：98¥·年付小包",
      "限制：新用户专享"
    ]
  },
  {
    "brand_id": "edgenova",
    "code": "XK808",
    "discount": "8 折",
    "condition_notes": [
      "不适用：限时体验月付小包"
    ]
  },
  {
    "brand_id": "kosing",
    "code": "kxy80",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "sujie",
    "code": "sujie888",
    "discount": "8 折",
    "condition_notes": [
      "不适用：单月试用"
    ]
  },
  {
    "brand_id": "kuaili",
    "code": "kuaili996",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "kuajie",
    "code": "kuajie",
    "discount": "8 折",
    "condition_notes": [
      "限制：新用户专享"
    ]
  },
  {
    "brand_id": "liulianyun",
    "code": "ll88",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "shandianyun",
    "code": "sd88",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "huanqiuyun",
    "code": "HQ66",
    "discount": null,
    "condition_notes": []
  },
  {
    "brand_id": "shenxingyun",
    "code": "sx0077",
    "discount": "7 折",
    "condition_notes": [
      "限制：新客专享（请勿与客户端识别码 xs0077 混淆）"
    ]
  },
  {
    "brand_id": "yunjieyun",
    "code": "yjx888",
    "discount": null,
    "condition_notes": []
  }
];
