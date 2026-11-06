import React from 'react';

/**
 * 检测原图的占位：站长 2026-11-07 要求撤下原来的检测截图，整理好清楚的图之后再上传。
 * 图片到位之前，页面只写“待更新中”，不放任何图；记录里的文字是站长提供的，没有原图可对照，只当参考。
 */
export default function PendingTestImage() {
  return (
    <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 p-4 text-xs leading-relaxed text-[#64748B]">
      <span className="font-bold text-amber-800">测速原图：待更新中。</span>
      整理好之后会在后续更新里上传（会遮住订阅链接等敏感信息）。在那之前，下面这些结果没有原图可以对照，请只当参考。
    </div>
  );
}
