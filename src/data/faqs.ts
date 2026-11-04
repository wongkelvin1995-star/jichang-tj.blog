import { SITE_META } from '@/data/site';
import { FAQItem } from '@/types';

export const FAQS: FAQItem[] = [
  {
    id: "faq-ranking-basis",
    question: "本站 34 家机场的展示顺序是按什么排名的？",
    answer: `本站目录展示的是【编辑推荐展示顺序】，其中前 ${SITE_META.fixed_editorial_positions} 位为固定的编辑推荐次序（灵动云排在首位作为旗舰品牌舱展示），其余 ${SITE_META.brand_count - SITE_META.fixed_editorial_positions} 家保持登记表的稳定顺序。该顺序包含商业推广合作，不代表独立测速评分、历史销量排行或全网用户投票结果。当您使用页面上的价格或单价排序功能时，表格按价格表中的数字排列，不会人为锁定推荐位。`,
    category: "transparency"
  },
  {
    id: "faq-billing-comparison",
    question: "为什么年付折算月均价很低，编辑部依然建议新手先考虑月付？",
    answer: "年付套餐虽然在表面上折算月均价较低（如年付96元折合8元/月），但它要求用户在第一天就一次性支付全部款项，并承担服务商在未来12个月内的运营波动或跑路风险。月付虽然没有长期折扣，但本站价格表里各家入门月付约 12.5~30 元，一旦遇到晚高峰网络拥堵、本地运营商不匹配或服务规则调整，可以随时止损更换。因此对新用户而言，月付是风险最低的选型方式。",
    category: "billing"
  },
  {
    id: "faq-coupons-verification",
    question: "推广链接里的 code= 参数和页面上的优惠码是一回事吗？",
    answer: "不是。推广链接中形如 ‘#/?code=xxxx’ 的参数是服务商的推荐人识别代码，仅用于统计导流关系，不能在结算时减免金额。页面上列出的优惠码和 8 折的折扣幅度由站长于 2026-11-03 在结算页核验，需要在结算页的优惠码输入框里填写；适用套餐和有效期以结算页为准，以输入后实际抵扣的金额为准。",
    category: "selection"
  },
  {
    id: "faq-unknown-data",
    question: "本站的价格和优惠码是怎么核验的，退款规则为什么写‘未确认’？",
    answer: "全站价格表、倍率与设备口径（1 倍率、不限设备、不限速，个别套餐在套餐详情里标了设备数上限，以品牌页的套餐表为准）以及 34 个优惠码和 8 折折扣，由站长于 2026-11-03 在各家结算页核验，页面统一注明核验日期；服务商之后调价或调整活动时，以结算页实时显示为准。退款规则各家没有公开可靠的条款，本站一律写‘未确认’，这不代表可以退款，也不用假想参数填补空白。取得服务商条款等可信资料后，再更新并注明日期。",
    category: "transparency"
  },
  {
    id: "faq-affiliate-disclosure",
    question: "通过本站链接前往机场注册，会影响我的实际购买价格吗？",
    answer: "不会。通过本站推广链接注册或购买，价格与你直接在官网购买完全相同，佣金由服务商承担，不会加到你的价格上；本站收录的优惠码（8 折）在此基础上另外抵扣。由于各服务商定价与活动政策会调整，付款前仍请核对结算页的实付总金额、计费周期与退款条款。本站的推广收入用于维持运营，合作关系体现在编辑展示顺序上，不改动页面标注的价格、规则记录和比较结果。",
    category: "transparency"
  },
  {
    id: "faq-client-readiness",
    question: "购买机场订阅后，手头电脑或手机需要准备什么客户端软件？",
    answer: "机场仅提供出海网络节点与流量分发服务，不能像普通应用那样直接打开。您需要在设备上提前安装支持该机场协议的客户端软件：Windows 平台推荐 Clash Verge Rev 或 Sing-box；macOS 推荐 Clash Verge 或 Surge；Android 推荐 Clash Meta for Android 或 Sing-box；iOS 推荐在非国区 App Store 下载 Shadowrocket、Quantumult X 或 Loon。部分服务商可能提供自家客户端，是否提供、支持哪些系统，请以服务商说明为准。",
    category: "client"
  }
];
