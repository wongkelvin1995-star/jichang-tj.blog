import React from 'react';
import CelestialHero from '@/components/CelestialHero';
import StartHereSection from '@/components/StartHereSection';
import GuideHighlights from '@/components/GuideHighlights';
import HomeFaq from '@/components/HomeFaq';
import BrandDirectoryGrid from '@/components/BrandDirectoryGrid';
import PackageComparisonTable from '@/components/PackageComparisonTable';
import VerifiedDealsSection from '@/components/VerifiedDealsSection';
import ToolsSection from '@/components/ToolsSection';
import JsonLd from '@/components/JsonLd';
import { BRANDS } from '@/data/brands';
import { buildDirectoryBrands } from '@/data/directory';
import { FAQS } from '@/data/faqs';
import { getComparisonRows } from '@/data/packages';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';

// 首页标题不加站名后缀（SITE_META.title 已经是完整标题）
export const metadata = buildMetadata({
  title: SITE_META.title,
  description: SITE_META.description,
  path: '/',
  absoluteTitle: true
});

export default function HomePage() {
  // 结构化数据只标注页面上可见的内容：FAQ 与 34 家目录
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
  const directoryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_META.name}：34 家机场编辑推荐展示顺序`,
    description: SITE_META.ranking_disclosure,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: BRANDS.length,
    itemListElement: BRANDS.map((brand) => ({
      '@type': 'ListItem',
      position: brand.display_rank,
      name: brand.name,
      url: `${SITE_META.url}/airports/${brand.id}/`
    }))
  };

  return (
    <div className="relative">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={directoryJsonLd} />
      {/* 首屏：简短介绍和 5 家重点推荐 */}
      <CelestialHero />

      {/* 新手入口（三条路径）和六个分类入口 */}
      <StartHereSection />

      {/* 热门教程（编辑排序）、最近更新、双品牌对比专题 */}
      <GuideHighlights />

      {/* 常见问题 */}
      <HomeFaq />

      {/* 34 家目录：紧凑小卡，默认前 14 位固定推荐，可搜索和筛选 */}
      <BrandDirectoryGrid brands={buildDirectoryBrands()} defaultView="fixed" />

      {/* 套餐价格比较（精简版：前 8 家，完整表在 /plans/） */}
      <PackageComparisonTable rows={getComparisonRows()} variant="compact" limit={8} />

      {/* 优惠码速查（完整表在 /deals/） */}
      <VerifiedDealsSection />

      {/* 工具入口 */}
      <ToolsSection />
    </div>
  );
}
