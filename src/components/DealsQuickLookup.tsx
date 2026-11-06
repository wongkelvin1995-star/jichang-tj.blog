'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, ShieldAlert } from 'lucide-react';
import type { CouponQuickItem } from '@/data/directory';

/**
 * 首页的优惠码速查：搜索框 + 小框内滚动，34 个码都在页面 HTML 里。
 * 折扣幅度、适用与不适用的套餐、限制等细则在完整的优惠码页（/deals/），这里只放代码和折扣。
 */
export default function DealsQuickLookup({ items, verifiedOn }: { items: CouponQuickItem[]; verifiedOn: string }) {
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ids = new Set<string>();
    items.forEach((c) => {
      if (
        !q ||
        c.brandName.toLowerCase().includes(q) ||
        c.brandId.toLowerCase().includes(q) ||
        c.aliases.some((a) => a.toLowerCase().includes(q)) ||
        c.code.toLowerCase().includes(q) ||
        (c.discount ?? '').includes(q)
      ) ids.add(c.brandId);
    });
    return ids;
  }, [items, query]);

  return (
    <div className="liquid-glass rounded-2xl border border-[#E2E8F0] shadow-xs">
      <div className="p-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="按品牌或优惠码搜索"
            placeholder="搜索品牌或优惠码"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#CBD5E1] focus:border-[#6378EA] focus:ring-2 focus:ring-[#6378EA]/20 text-sm text-[#17233A] placeholder-[#94A3B8] focus:outline-none"
          />
        </div>
        <div className="text-xs text-[#64748B] sm:ml-auto">
          显示 <strong className="text-[#17233A]">{visible.size}</strong> / {items.length} 个 · 站长核验于 {verifiedOn}
        </div>
      </div>

      {visible.size === 0 && (
        <p className="px-4 py-6 text-center text-xs text-[#64748B]">
          没有找到匹配的品牌或优惠码，换个关键词试试，或到完整优惠码表里看。
        </p>
      )}

      <ul className="max-h-[300px] overflow-y-auto p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map((c) => (
          <li key={c.brandId} className={visible.has(c.brandId) ? '' : 'hidden'}>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs">
              <Link href={`/airports/${c.brandId}/`} className="min-w-0 truncate font-semibold text-[#17233A] hover:text-[#6378EA]">
                <span className="mr-1.5 text-[10px] text-[#94A3B8]">{c.rank}</span>
                {c.brandName}
              </Link>
              <span className="shrink-0 text-right">
                <code className="font-mono font-bold text-[#6378EA] select-all">{c.code}</code>
                <span className="ml-1.5 text-[#94A3B8]">{c.discount ?? '折扣未写'}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="p-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64748B]">
        <span className="flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-[#6378EA] shrink-0 mt-0.5" />
          适用套餐、新用户限制和有效期以结算页为准；推广链接里的 code= 是邀请参数，不是优惠码。
        </span>
        <Link href="/deals/" className="inline-flex items-center gap-1 font-semibold text-[#6378EA] hover:text-[#4F64D6] shrink-0">
          查看完整优惠码表与适用条件
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
