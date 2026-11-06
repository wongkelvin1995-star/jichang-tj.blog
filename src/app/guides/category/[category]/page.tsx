import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Users } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import {
  ARTICLE_CATEGORIES,
  articleHref,
  articleUpdatedAt,
  categoriesWithArticles,
  getArticlesByCategory,
  getCategoryBySlug
} from '@/data/categories';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';

interface Props {
  params: Promise<{ category: string }>;
}

/** 测速实验室的入口是 /speed-lab/，不在这里生成；其余分类只要有已发布文章就生成分类页 */
export async function generateStaticParams() {
  return categoriesWithArticles()
    .filter((c) => c.id !== 'speed-lab')
    .map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category || category.id === 'speed-lab') return { title: '未找到分类' };
  return buildMetadata({ title: category.metaTitle, description: category.metaDescription, path: category.href });
}

export default async function CategoryHubPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category || category.id === 'speed-lab') notFound();
  const articles = getArticlesByCategory(category.id);
  if (articles.length === 0) notFound();

  const canonical = `${SITE_META.url}${category.href}`;
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.metaTitle,
    description: category.metaDescription,
    url: canonical,
    inLanguage: 'zh-CN',
    dateModified: articles.map(articleUpdatedAt).sort().slice(-1)[0],
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: a.title,
        url: `${SITE_META.url}${articleHref(a.slug)}`
      }))
    }
  };
  const others = ARTICLE_CATEGORIES.filter((c) => c.id !== category.id && (c.id === 'speed-lab' || getArticlesByCategory(c.id).length > 0));

  return (
    <div className="py-12">
      <JsonLd
        data={breadcrumbList([
          { name: '首页', url: `${SITE_META.url}/` },
          { name: '指南', url: `${SITE_META.url}/guides/` },
          { name: category.name, url: canonical }
        ])}
      />
      <JsonLd data={collection} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-[#64748B]">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <Link href="/guides/" className="hover:text-[#17233A]">指南</Link>
          <span>/</span>
          <span className="font-semibold text-[#6378EA]">{category.name}</span>
        </nav>

        <header className="liquid-glass mb-8 space-y-3 rounded-3xl border border-[#CBD5E1] p-6 shadow-xs sm:p-8">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#17233A] sm:text-3xl">{category.metaTitle}</h1>
          <p className="text-sm leading-relaxed text-[#475569] sm:text-base">{category.intro}</p>
          <p className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Users className="h-3.5 w-3.5 text-[#6378EA]" />
            适合：{category.audience}
          </p>
        </header>

        <section aria-labelledby="order" className="mb-10">
          <h2 id="order" className="mb-4 text-lg font-bold text-[#17233A]">推荐阅读顺序</h2>
          <ol className="space-y-3">
            {articles.map((a, i) => (
              <li key={a.slug}>
                <ArticleCard article={a} showCategory={false} rank={i + 1} />
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="others" className="border-t border-[#E2E8F0] pt-8">
          <h2 id="others" className="mb-3 text-base font-bold text-[#17233A]">其他分类</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c.id}
                href={c.href}
                className="inline-flex items-center gap-1 rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-semibold text-[#4F64D6] transition-colors hover:border-[#6378EA]/40"
              >
                {c.name}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
            <Link href="/guides/" className="inline-flex items-center gap-1 rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-semibold text-[#4F64D6] transition-colors hover:border-[#6378EA]/40">
              全部指南
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
