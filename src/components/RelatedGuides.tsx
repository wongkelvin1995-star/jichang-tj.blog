import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import type { RelatedGuide } from '@/data/relatedGuides';

/** 品牌页的“相关教程”：每条都有一句和这家品牌有关的理由（见 src/data/relatedGuides.ts 的规则） */
export default function RelatedGuides({ brandName, guides }: { brandName: string; guides: RelatedGuide[] }) {
  if (guides.length === 0) return null;
  return (
    <section id="related-guides" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3 scroll-mt-24">
      <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-[#6378EA]" />
        <span>读{brandName}之前可以先看的教程</span>
      </h2>
      <ul className="space-y-3">
        {guides.map((g) => (
          <li key={g.slug} className="space-y-0.5">
            <Link href={g.href} className="text-sm font-bold text-[#4F64D6] hover:text-[#17233A] transition-colors">
              {g.title}
            </Link>
            {g.reason && <p className="text-xs leading-relaxed text-[#64748B]">{g.reason}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
