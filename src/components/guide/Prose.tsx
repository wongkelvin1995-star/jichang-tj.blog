import React from 'react';
import Link from 'next/link';

/** 指南正文用的简单排版组件，保持全站统一样式。 */
export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl sm:text-2xl font-bold text-[#17233A] tracking-tight pt-4 scroll-mt-24">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base sm:text-lg font-bold text-[#17233A] pt-2">{children}</h3>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm sm:text-base text-[#475569] leading-relaxed">{children}</p>;
}

export function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc list-outside pl-5 space-y-1.5 text-sm sm:text-base text-[#475569] leading-relaxed">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export function Ol({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="list-decimal list-outside pl-5 space-y-1.5 text-sm sm:text-base text-[#475569] leading-relaxed">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ol>
  );
}

export function Callout({ title, children, tone = 'info' }: { title: string; children: React.ReactNode; tone?: 'info' | 'warn' }) {
  const border = tone === 'warn' ? 'border-amber-200 bg-amber-50/60' : 'border-[#CBD5E1] bg-[#F0F5F9]';
  return (
    <div className={`p-4 rounded-xl border ${border} text-sm text-[#475569] leading-relaxed space-y-1`}>
      <div className="font-bold text-[#17233A]">{title}</div>
      <div>{children}</div>
    </div>
  );
}

export function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs sm:text-sm text-[#17233A]">
      {children}
    </div>
  );
}

/**
 * 表格。nowrapFirst：第一列是“1 预算”这样的短标签时打开，标签不换行、加粗，其余列再按剩下的宽度排版；
 * 不打开的话，第一列会被挤成一两个字一行（2026-11-04 站长指出“五步核对表”对不齐）。
 * 单元格用 text-pretty，避免最后一行只剩一个字。
 */
export function Table({ head, rows, nowrapFirst = false }: { head: string[]; rows: React.ReactNode[][]; nowrapFirst?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] whitespace-nowrap">
            {head.map((h) => <th key={h} className="py-2.5 px-3 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-2.5 px-3 align-top text-pretty ${nowrapFirst && j === 0 ? 'whitespace-nowrap font-semibold text-[#17233A]' : 'text-[#475569]'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 常见问题：问题用 h3，回答用段落，方便读者和搜索引擎识别问答结构。 */
export function Faq({ items }: { items: Array<{ q: string; a: React.ReactNode }> }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.q} className="space-y-1">
          <h3 className="text-base font-bold text-[#17233A]">{item.q}</h3>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  );
}

export function BrandLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Link href={`/airports/${id}/`} className="font-semibold text-[#6378EA] hover:text-[#4F64D6]">
      {children}
    </Link>
  );
}

export function GuideLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-[#6378EA] hover:text-[#4F64D6]">
      {children}
    </Link>
  );
}
