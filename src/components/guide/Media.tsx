import React from 'react';

/**
 * 教程里的两种配图（2026-11-06 站长要求：真实截图和原始数据没有就写“待更新”，不编造）：
 * - Flow：自绘的步骤流程示意图，图注写明“示意图”，不是真实截图，也不含任何测试数字；
 * - PendingShot：真实截图还没有时的占位，明确写“待更新”。
 */
export function Flow({ steps, caption }: { steps: { title: string; note?: string }[]; caption: string }) {
  return (
    <figure className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5">
      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-2.5 rounded-xl border border-[#E2E8F0] bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6378EA] text-[11px] font-bold text-white">{i + 1}</span>
            <span className="min-w-0 space-y-0.5">
              <span className="block text-sm font-bold text-[#17233A]">{step.title}</span>
              {step.note && <span className="block text-xs leading-snug text-[#64748B]">{step.note}</span>}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="text-[11px] leading-relaxed text-[#94A3B8]">示意图：{caption}（自绘流程，不是真实截图，也不是测试结果）</figcaption>
    </figure>
  );
}

export function PendingShot({ what }: { what: string }) {
  return (
    <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 p-4 text-xs leading-relaxed text-[#64748B]">
      <span className="font-bold text-amber-800">真实截图待更新：</span>
      {what}。整理好之后会在后续更新里上传（会遮住订阅链接等敏感信息）。
    </div>
  );
}
