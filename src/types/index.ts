export type VerificationStatus = 
  | 'awaiting_owner_data' // 待站长导入资料
  | 'draft_outline'       // 具备大纲但未完成
  | 'verified'            // 资料已完成核实
  | 'unconfirmed'         // 待进一步核对
  | 'expired';            // 已过期

export interface Brand {
  id: string; // 唯一 slug，来自 03-brand-registry.json
  name: string; // 中文显示名
  aliases: string[]; // 英文别名或历史别名
  display_rank: number; // 1-34 编辑展示顺序
  source_input_order: number; // 原始登记顺序
  fixed_position: boolean; // 固定展示位为 true，数量见 SITE_META.fixed_editorial_positions
  affiliate_url: string; // 完整原始推广链接（含哈希与参数）
  status: VerificationStatus;
  featured?: boolean; // 灵动云为 true
  protocol_architecture?: string | null; // 线路资料（来自价格表的品牌层面标注，本站未测试）
  starting_price?: {
    amount: number | null;
    period: string;
    note?: string;
  };
  selection_tip?: string; // 由价格表算出的价格摘要
  data_date?: string | null; // 价格资料的整理日期
  price_is_historical?: boolean; // 原资料曾标注为历史价格，仅作来源记录
  verified_at?: string | null; // 在结算页完成核验的日期，未完成为 null
}

export type PaymentPeriodType = 
  | 'monthly' 
  | 'quarterly' 
  | 'semi_annual' 
  | 'annual' 
  | 'biennial' 
  | 'triennial' 
  | 'onetime_traffic_pack' 
  | 'unknown';

export interface PlanPriceOption {
  id: string;
  period_type: PaymentPeriodType;
  period_label: string;
  period_months: number | null;
  payment_amount: number | null; // 实际付款总金额（非月均价），null 代表未知
  currency: 'CNY';
  calculated_monthly_amount: number | null; // 计算折合月均单价（仅供比较参考）
  total_traffic_gb: number | null; // 该付款周期内的总流量（GB）
  is_verified: boolean;
  notes?: string;
}

export interface Plan {
  id: string;
  brand_id: string;
  plan_name: string;
  advertised_traffic_gb: number | null; // 标称流量额度（GB）
  traffic_grant_period: 'monthly' | 'yearly' | 'onetime' | 'unknown';
  reset_rule: string | null; // 重置规则（如每月账单日重置）
  rollover_rule: string | null; // 结转规则（如不可结转）
  multiplier_rule: string | null; // 计费倍率（如全节点1x）
  client_requirements: string | null; // 客户端前提（如 Clash / Shadowrocket / Sing-box / 自研）
  device_limit: string | null; // 设备数限制
  speed_limit: string | null; // 速率限制
  refund_rule: string | null; // 退款条款
  price_options: PlanPriceOption[];
  verified_at: string | null;
  data_date: string | null; // 价格资料的整理日期
  price_is_historical?: boolean; // 原资料曾标注为历史价格，仅作来源记录
  status: VerificationStatus;
  source_note?: string;
}

// 首页比较表的一行（某品牌某套餐的一个付款周期）
export interface PlanComparisonRow {
  rowId: string;
  brandId: string;
  brandName: string;
  planName: string;
  displayRank: number;
  periodLabel: string;
  periodType: PaymentPeriodType;
  actualAmount: number;
  calculatedMonthly: number | null;
  trafficLabel: string;
  perGB: number;
  multiplier: string | null;
  usageNotes: string[];
  note: string | null;
  dataDate: string | null;
  isHistorical: boolean;
  isVerified: boolean;
}

export interface Coupon {
  id: string;
  brand_id: string;
  coupon_code: string | null; // 纯折扣码（绝不可填推广参数 code）
  eligible_plan_ids: string[];
  eligible_payment_periods: PaymentPeriodType[];
  new_customer_only: boolean | null;
  renewal_eligible: boolean | null;
  discount_type: 'percentage' | 'fixed_amount' | 'unknown' | null;
  discount_value: number | string | null;
  minimum_order_amount: number | null;
  start_at: string | null;
  end_at: string | null;
  timezone: string;
  stacking_rule: string | null;
  status: VerificationStatus;
  verification_note: string;
  source_url: string | null;
  verified_at: string | null;
}

export interface ArticleBrief {
  slug: string;
  priority: 'P0' | 'P1' | 'P2';
  title: string;
  primary_question: string;
  primary_keyword_candidate: string;
  supporting_questions: string[];
  target_reader: string;
  conclusion_scope: string; // 结论范围（能回答什么，不能回答什么）
  required_evidence: string; // 必需证据
  calculation_or_comparison: string; // 计算或比较口径
  limitations: string[]; // 限制与未知项
  internal_links: { label: string; href: string }[];
  read_time_minutes: number;
  author_or_editor: string;
  published_at: string | null;
  substantive_updated_at: string | null;
  status: 'published' | 'published_skeleton' | 'draft_outline' | 'pending_evidence'; // published 需同时有正文且 published_at 不为 null
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'selection' | 'billing' | 'traffic' | 'client' | 'transparency';
  editorial_reference?: string;
}

export interface SiteMeta {
  name: string;
  url: string;
  title: string;
  description: string;
  canonical: string;
  prepared_on: string;
  featured_brand_id: string;
  brand_count: number;
  fixed_editorial_positions: number;
  ranking_disclosure: string;
  editorial_author: string;
  correction_contact: string;
}
