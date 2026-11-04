import React from 'react';
import { Plan } from '@/types';
import { getPlanTrafficLabel } from '@/data/packages';
import { fmtPerGB, fmtYuan } from '@/data/format';

export default function BrandPlansTable({ plans }: { plans: Plan[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] whitespace-nowrap">
            <th className="py-2.5 px-3">套餐方案</th>
            <th className="py-2.5 px-3">流量额度</th>
            <th className="py-2.5 px-3">付款周期</th>
            <th className="py-2.5 px-3">实付金额</th>
            <th className="py-2.5 px-3">折合月价</th>
            <th className="py-2.5 px-3">每 GB 单价</th>
          </tr>
        </thead>
        {plans.map((plan) => (
          <tbody key={plan.id} className="border-b border-[#E2E8F0]">
            {plan.price_options.map((option, index) => (
              <tr key={option.id}>
                {index === 0 && (
                  <>
                    <td rowSpan={plan.price_options.length} className="py-2.5 px-3 align-top min-w-[150px]">
                      <div className="font-bold text-[#17233A]">{plan.plan_name}</div>
                      {plan.source_note && (
                        <div className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{plan.source_note}</div>
                      )}
                    </td>
                    <td rowSpan={plan.price_options.length} className="py-2.5 px-3 align-top whitespace-nowrap text-[#475569]">
                      {getPlanTrafficLabel(plan)}
                    </td>
                  </>
                )}
                <td className="py-2.5 px-3 whitespace-nowrap text-[#475569]">{option.period_label}</td>
                <td className="py-2.5 px-3 whitespace-nowrap font-semibold text-[#17233A]">
                  {option.payment_amount !== null ? fmtYuan(option.payment_amount) : '未确认'}
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap text-[#6378EA]">
                  {option.calculated_monthly_amount !== null ? `${fmtYuan(option.calculated_monthly_amount)} / 月` : '-'}
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap text-[#475569]">
                  {option.payment_amount !== null && option.total_traffic_gb
                    ? fmtPerGB(option.payment_amount / option.total_traffic_gb)
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
