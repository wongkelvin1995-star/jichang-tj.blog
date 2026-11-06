import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, LifeBuoy, ShoppingBag } from 'lucide-react';
import { ARTICLE_CATEGORIES, getArticlesByCategory } from '@/data/categories';
import { START_PATHS, resolveStartLinks } from '@/data/homeContent';

const ICONS = { before: ShoppingBag, after: Compass, trouble: LifeBuoy } as const;

/** 新手入口（三条路径）+ 六个分类入口：首页英雄区下面的第一块内容 */
export default function StartHereSection() {
  return (
    <section id="start" className="py-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <div className="mb-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">新手从这里开始</h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-3xl leading-relaxed">
              按你现在的处境选一条路：还没买、刚买完、已经连不上。每条路径列出最先该读的几篇，读完再按需要去分类里找。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {START_PATHS.map((path) => {
              const Icon = ICONS[path.id];
              const links = resolveStartLinks(path);
              return (
                <div key={path.id} className="rounded-2xl liquid-glass-card border border-[#E2E8F0] bg-white/80 p-5 flex flex-col justify-between gap-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#F0F5F9] border border-[#CBD5E1] flex items-center justify-center text-[#6378EA]">
                        <Icon className="w-4 h-4" />
                      </span>
                      <h3 className="text-base font-bold text-[#17233A]">{path.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[#64748B]">{path.text}</p>
                    <ul className="space-y-1.5 text-xs">
                      {links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="font-semibold text-[#4F64D6] hover:text-[#17233A] transition-colors line-clamp-2">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={path.cta.href} className="inline-flex items-center gap-1 text-xs font-bold text-[#6378EA] hover:text-[#4F64D6]">
                    {path.cta.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#17233A] mb-4">按问题找教程</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {ARTICLE_CATEGORIES.map((c) => {
              const count = getArticlesByCategory(c.id).length;
              if (count === 0) return null;
              return (
                <Link
                  key={c.id}
                  href={c.href}
                  className="group rounded-xl border border-[#E2E8F0] bg-white p-3.5 hover:border-[#9BB7CF] transition-colors flex flex-col gap-1.5"
                >
                  <span className="text-sm font-bold text-[#17233A] group-hover:text-[#6378EA] transition-colors">{c.name}</span>
                  <span className="line-clamp-2 text-[11px] leading-snug text-[#64748B]">{c.tagline}</span>
                  <span className="text-[11px] font-semibold text-[#6378EA]">{count} 篇 →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
