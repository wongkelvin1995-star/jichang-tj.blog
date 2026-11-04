import type { ComponentType } from 'react';
import HowToChoose from './how-to-choose';
import BillingAndTrafficRules from './billing-and-traffic-rules';
import CostPerGb from './cost-per-gb';
import SubscriptionAndClient from './subscription-and-client';
import AiUsers from './ai-users';
import ReadingSpeedTests from './reading-speed-tests';
import ValueForMoney from './value-for-money';
import LowBudgetPlans from './low-budget-plans';
import OccasionalUse from './occasional-use';
import RefundAndPurchaseChecklist from './refund-and-purchase-checklist';

/**
 * 指南正文组件（共 10 篇）：slug → 正文组件。
 * 前 6 篇是落地页精选的通用方法指南，后 4 篇是按预算和场景用价格表算账的指南。
 * 登记了正文才会被页面当作“已发布”；新增时同步改 src/data/articles.ts。
 */
export const GUIDE_BODIES: Record<string, ComponentType> = {
  'how-to-choose': HowToChoose,
  'billing-and-traffic-rules': BillingAndTrafficRules,
  'ai-users': AiUsers,
  'cost-per-gb': CostPerGb,
  'reading-speed-tests': ReadingSpeedTests,
  'subscription-and-client': SubscriptionAndClient,
  'value-for-money': ValueForMoney,
  'low-budget-plans': LowBudgetPlans,
  'occasional-use': OccasionalUse,
  'refund-and-purchase-checklist': RefundAndPurchaseChecklist,
};
