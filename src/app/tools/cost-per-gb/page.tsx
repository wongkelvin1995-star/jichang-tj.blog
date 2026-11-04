import React from 'react';
import type { Metadata } from 'next';
import CostCalculatorClient from '@/components/CostCalculatorClient';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: '每GB成本折算器：标称单价 vs 实际使用单价',
  description: '输入实付金额、标称额度、计费倍率与实际月消耗流量，计算套餐额度单价与真实使用单价，看清闲置浪费比例。',
  path: '/tools/cost-per-gb/'
});

export default function CostCalculatorPage() {
  return <CostCalculatorClient />;
}
