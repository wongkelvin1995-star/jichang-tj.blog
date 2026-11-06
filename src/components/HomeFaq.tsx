import React from 'react';
import Link from 'next/link';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { FAQS } from '@/data/faqs';

/**
 * 首页常见问题：用原生 <details>，不依赖脚本，回答文字始终在页面 HTML 里；
 * 首页 FAQPage 结构化数据用的是同一份 FAQS，和这里可见的问答一一对应。
 */
export default function HomeFaq() {
  return (
    <section id="faq" className="py-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">常见问题</h2>
          <p className="text-sm text-[#64748B] mt-2 max-w-3xl leading-relaxed">
            新手最常问的几件事：怎么开始、连不上先查什么、排序和价格怎么来的、通过本站购买会不会更贵。
          </p>
        </div>
        <div className="max-w-3xl space-y-3">
          {FAQS.map((faq, i) => (
            <details key={faq.id} open={i === 0} className="group rounded-2xl liquid-glass border border-[#E2E8F0] overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 hover:bg-[#F8FAFC]/80 transition-colors [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm sm:text-base font-bold text-[#17233A]">{faq.question}</h3>
                <span className="w-7 h-7 rounded-full bg-[#F0F5F9] border border-[#CBD5E1] flex items-center justify-center shrink-0 text-[#6378EA] transition-transform group-open:rotate-180">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0]/60 space-y-2">
                <p>{faq.answer}</p>
                {faq.related && (
                  <p>
                    <Link href={faq.related.href} className="font-semibold text-[#6378EA] hover:text-[#4F64D6]">{faq.related.label} →</Link>
                  </p>
                )}
                {faq.editorial_reference && (
                  <div className="pt-1 text-xs text-[#94A3B8] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6378EA]" />
                    <span>准则参考：{faq.editorial_reference}</span>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
