import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import { ARTICLE_CATEGORIES, articleHref, getArticlesByCategory, latestUpdatedArticles, publishedArticles } from '@/data/categories';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: '机场使用与选购指南：教程、排障、线路知识和选购',
  description: '按问题分类的机场指南：新手教程、客户端教程、网络故障排查、线路知识、测速实验室和选购指南，每篇只回答一个问题，没有品牌排名。',
  path: '/guides/'
});

export default function GuidesIndexPage() {
  const total = publishedArticles().length;
  const latest = latestUpdatedArticles(4);
  const canonical = `${SITE_META.url}/guides/`;
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '机场使用与选购指南',
    url: canonical,
    inLanguage: 'zh-CN',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: total,
      itemListElement: publishedArticles().map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: a.title,
        url: `${SITE_META.url}${articleHref(a.slug)}`
      }))
    }
  };

  return (
    <div className="py-12">
      <JsonLd data={breadcrumbList([{ name: '首页', url: `${SITE_META.url}/` }, { name: '指南', url: canonical }])} />
      <JsonLd data={itemList} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-[#64748B]">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="font-semibold text-[#6378EA]">指南</span>
        </nav>

        <header className="mb-10 space-y-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17233A] sm:text-4xl">机场使用与选购指南</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-[#475569] sm:text-base">
            共 {total} 篇，按读者遇到的问题分成六类：刚接触机场、选客户端、连不上怎么办、读线路宣传、看测速记录、选套餐。每篇只回答一个问题，先给判断依据再给操作步骤；本站没有测速排名，也不替任何品牌背书。
          </p>
          <nav aria-label="指南分类" className="flex flex-wrap gap-2 pt-1">
            {ARTICLE_CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={c.href}
                className="rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-semibold text-[#4F64D6] transition-colors hover:border-[#6378EA]/40"
              >
                {c.name}（{getArticlesByCategory(c.id).length}）
              </Link>
            ))}
          </nav>
        </header>

        <section className="mb-12" aria-labelledby="latest">
          <h2 id="latest" className="mb-4 text-lg font-bold text-[#17233A]">最近更新</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        {ARTICLE_CATEGORIES.map((category) => {
          const list = getArticlesByCategory(category.id);
          if (list.length === 0) return null;
          return (
            <section key={category.id} id={category.slug} className="mb-12 scroll-mt-24" aria-labelledby={`cat-${category.id}`}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 id={`cat-${category.id}`} className="text-lg font-bold text-[#17233A]">{category.name}</h2>
                  <p className="text-xs text-[#64748B]">{category.tagline}</p>
                </div>
                <Link href={category.href} className="inline-flex items-center gap-1 text-xs font-semibold text-[#6378EA] hover:text-[#4F64D6]">
                  {category.id === 'speed-lab' ? '进入测速实验室' : `查看${category.name}全部文章`}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a) => (
                  <ArticleCard key={a.slug} article={a} showCategory={false} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
