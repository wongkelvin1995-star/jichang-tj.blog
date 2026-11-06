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
import MultiDevicePlans from './multi-device-plans';
import SpeedLabMethod from './speed-lab-method';
import IplcVsIepl from './iplc-vs-iepl';
import AllNodesTimeout from './all-nodes-timeout';
import WindowsClientGuide from './windows-client-guide';
import FirstTimeSetup from './first-time-setup';
import WhatIsAnAirport from './what-is-an-airport';
import AirportGlossary from './airport-glossary';
import GlobalRuleDirectMode from './global-rule-direct-mode';
import MacosClientGuide from './macos-client-guide';
import AndroidClientGuide from './android-client-guide';
import IosClientGuide from './ios-client-guide';
import SubscriptionUpdateFailed from './subscription-update-failed';
import ConnectedButSlowOrBlocked from './connected-but-slow-or-blocked';
import MobileKeepsDisconnecting from './mobile-keeps-disconnecting';
import BgpCn2Explained from './bgp-cn2-9929-explained';
import EntryAndExitNodes from './entry-and-exit-nodes';
import ChooseNodeRegion from './choose-node-region';
import TestAirportYourself from './test-airport-yourself';
import PeakHourTestDesign from './peak-hour-test-design';
import ReadUnlockTestResults from './read-unlock-test-results';
import CouponNotWorking from './coupon-not-working';
import HowMuchTrafficPerMonth from './how-much-traffic-per-month';
import SwitchAirportChecklist from './switch-airport-checklist';

/**
 * 指南正文组件：slug → 正文组件。前 10 篇是最早的选购与使用指南，之后是 2026-11-06 起按分类陆续补充的教程（分类见 src/data/categories.ts）。
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
  'first-time-setup': FirstTimeSetup,
  'windows-client-guide': WindowsClientGuide,
  'all-nodes-timeout': AllNodesTimeout,
  'iplc-vs-iepl': IplcVsIepl,
  'speed-lab-method': SpeedLabMethod,
  'multi-device-plans': MultiDevicePlans,
  'what-is-an-airport': WhatIsAnAirport,
  'airport-glossary': AirportGlossary,
  'global-rule-direct-mode': GlobalRuleDirectMode,
  'macos-client-guide': MacosClientGuide,
  'android-client-guide': AndroidClientGuide,
  'ios-client-guide': IosClientGuide,
  'subscription-update-failed': SubscriptionUpdateFailed,
  'connected-but-slow-or-blocked': ConnectedButSlowOrBlocked,
  'mobile-keeps-disconnecting': MobileKeepsDisconnecting,
  'bgp-cn2-9929-explained': BgpCn2Explained,
  'entry-and-exit-nodes': EntryAndExitNodes,
  'choose-node-region': ChooseNodeRegion,
  'test-airport-yourself': TestAirportYourself,
  'peak-hour-test-design': PeakHourTestDesign,
  'read-unlock-test-results': ReadUnlockTestResults,
  'coupon-not-working': CouponNotWorking,
  'how-much-traffic-per-month': HowMuchTrafficPerMonth,
  'switch-airport-checklist': SwitchAirportChecklist,
};
