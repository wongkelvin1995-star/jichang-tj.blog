import React from 'react';
import CelestialHero from '@/components/CelestialHero';
import NeedsNavigator from '@/components/NeedsNavigator';
import BrandDirectoryGrid from '@/components/BrandDirectoryGrid';
import PackageComparisonTable from '@/components/PackageComparisonTable';
import VerifiedDealsSection from '@/components/VerifiedDealsSection';
import EditorialArticlesSection from '@/components/EditorialArticlesSection';
import ToolsAndFAQSection from '@/components/ToolsAndFAQSection';
import JsonLd from '@/components/JsonLd';
import { BRANDS } from '@/data/brands';
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
  // 结构化数据只标注页面上可见的内容：FAQ 手风琴与 34 家目录
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
      {/* Module 1: 简短首屏和灵动旗舰舱 (Sakura Celestial Hero + Lingdong Chamber) */}
      <CelestialHero />

      {/* Module 2: 需求入口 (Needs Entrance: 支出/周期/流量包/优惠) */}
      <NeedsNavigator />

      {/* Module 3: 完整34家编辑目录 (Glass Grid with fixed top positions + Registry Order) */}
      <BrandDirectoryGrid brands={BRANDS} />

      {/* Module 4: 套餐与价格比较 (Package & Price Table: Payment amount upfront, clear unknowns) */}
      <PackageComparisonTable rows={getComparisonRows()} />

      {/* Module 5: 已核实优惠 (Verified Deals: Strict promo code vs invite code) */}
      <VerifiedDealsSection />

      {/* Module 6: 精选原创文章 (Curated Editorial Articles & Outlines) */}
      <EditorialArticlesSection />

      {/* Module 7: 工具入口与FAQ (Cost Calculator Preview + Selection FAQ) */}
      <ToolsAndFAQSection />
    </div>
  );
}
