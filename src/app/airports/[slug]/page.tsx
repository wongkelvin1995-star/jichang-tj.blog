import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BrandEvidenceSection from '@/components/BrandEvidenceSection';
import BrandDisclosure from '@/components/BrandDisclosure';
import BrandInfoSection from '@/components/BrandInfoSection';
import PendingTestImage from '@/components/PendingTestImage';
import BrandPlansTable from '@/components/BrandPlansTable';
import OfficialSiteSection from '@/components/OfficialSiteSection';
import RelatedGuides from '@/components/RelatedGuides';
import FavoriteButton from '@/components/account/FavoriteButton';
import HistoryTracker from '@/components/account/HistoryTracker';
import { getBrandMd } from '@/data/brandMd';
import { getBrandTests } from '@/data/brandTests';
import { getOfficialSite } from '@/data/officialSites';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import { buildBrandAnalysis } from '@/data/brandAnalysis';
import { BRANDS, getBrandById } from '@/data/brands';
import { getCouponsByBrandId } from '@/data/coupons';
import { FEATURED_PICKS } from '@/data/featured';
import { fmtYuan } from '@/data/format';
import { getPlansByBrandId } from '@/data/packages';
import { getRelatedGuidesForBrand } from '@/data/relatedGuides';
import { buildPriceFactLines, buildPurchaseChecklist, getDeviceCaps, getPriceFacts } from '@/data/priceFacts';
import { SITE_META } from '@/data/site';
import { VERIFICATION } from '@/data/verification';
import { buildMetadata } from '@/lib/metadata';
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Layers,
  Tag
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BRANDS.map((brand) => ({
    slug: brand.id,
  }));
}

/** 页面标题和 H1 同一句：品牌名 + 这家自己的入门月付，每页不一样 */
function brandTitle(brandId: string, brandName: string): string {
  const entry = getPriceFacts(brandId).entryMonthly;
  return `${brandName}套餐价格与线路资料${entry ? `：入门月付 ${fmtYuan(entry.price)}` : ''}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandById(slug);

  if (!brand) {
    return { title: '未找到品牌' };
  }

  const hasOfficial = Boolean(getOfficialSite(brand.id));

  return buildMetadata({
    title: brandTitle(brand.id, brand.name),
    description: `${brand.name}价格资料：${brand.selection_tip}价格由${VERIFICATION.label}，购买前请以结算页为准。${hasOfficial ? `页面附${brand.name}官网地址（站长提供）。` : ''}`,
    path: `/airports/${brand.id}/`
  });
}

export default async function AirportDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandById(slug);

  if (!brand) {
    notFound();
  }

  const plans = getPlansByBrandId(brand.id);
  const coupons = getCouponsByBrandId(brand.id);
  const facts = getPriceFacts(brand.id);
  const analysis = buildBrandAnalysis(brand.id);
  const tests = getBrandTests(brand.id);
  const featuredPick = FEATURED_PICKS.find((pick) => pick.brand_id === brand.id);
  const officialSite = getOfficialSite(brand.id);
  const deviceCaps = getDeviceCaps(facts);
  const brandMd = getBrandMd(brand.id);
  const relatedGuides = getRelatedGuidesForBrand(brand.id);
  const hasComparePage = brand.id === 'lingdongyun' || brand.id === 'twilight';
  const startingAmount = brand.starting_price?.amount ?? null;

  return (
    <article className="py-12">
      <JsonLd data={breadcrumbList([
        { name: '首页', url: `${SITE_META.url}/` },
        { name: '34家机场目录', url: `${SITE_META.url}/airports/` },
        { name: brand.name, url: `${SITE_META.url}/airports/${brand.id}/` }
      ])} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb - Apple Style */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <Link href="/airports/" className="hover:text-[#17233A]">34家机场目录</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">{brand.name}</span>
        </nav>

        {/* Top Header Card - Apple Liquid Glass */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 relative overflow-hidden shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6378EA] via-[#9BB7CF] to-[#17233A] p-0.5 shadow-md shadow-[#6378EA]/20 shrink-0">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl font-black text-[#6378EA]">
                  {brand.name.slice(0, 1)}
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {/* H1 与 <title> 同一句：品牌名大字，后半句小字，合起来是“{品牌}套餐价格与线路资料：入门月付 ¥N” */}
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight leading-tight">
                    {brand.name}
                    <span className="block text-sm sm:text-base font-bold text-[#475569] tracking-normal mt-0.5">{brandTitle(brand.id, brand.name).slice(brand.name.length)}</span>
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F5F9] text-[#4F64D6] border border-[#CBD5E1] font-semibold">
                    编辑推荐第 {brand.display_rank} 位
                  </span>
                </div>
                {brand.aliases.length > 0 && (
                  <div className="text-xs text-[#64748B] mt-1 font-medium">
                    别名：{brand.aliases.join(' / ')}
                  </div>
                )}
              </div>
            </div>

            {/* Top Action */}
            <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
              <a
                href={brand.affiliate_url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#6378EA] hover:bg-[#4F64D6] shadow-sm hover:scale-[1.01] transition-all"
              >
                <span>前往 {brand.name} 注册入口</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-[#94A3B8]">商业链接，详见推广说明</span>
              {officialSite && (
                <>
                  <a href="#evidence" className="text-[11px] font-semibold text-[#6378EA] hover:text-[#4F64D6]">
                    {brand.name}怎么样 ↓
                  </a>
                  <a href="#official" className="text-[11px] font-semibold text-[#6378EA] hover:text-[#4F64D6]">
                    查看{brand.name}官网介绍 ↓
                  </a>
                </>
              )}
              <FavoriteButton type="airport" id={brand.id} />
            </div>
          </div>
          <HistoryTracker type="airport" id={brand.id} title={`${brand.name}套餐价格与线路资料`} href={`/airports/${brand.id}/`} />

          {/* Quick Meta Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <div className="text-[#64748B] mb-0.5 font-medium">线路资料</div>
              <div className="font-bold text-[#17233A]">{brand.protocol_architecture || "未标注"}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <div className="text-[#64748B] mb-0.5 font-medium">入门月付</div>
              <div className="font-bold text-[#6378EA]">
                {startingAmount !== null ? `${fmtYuan(startingAmount)} / 月` : "未确认"}
              </div>
              {brand.starting_price?.note && (
                <div className="text-[11px] text-[#94A3B8] mt-0.5">{brand.starting_price.note}</div>
              )}
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <div className="text-[#64748B] mb-0.5 font-medium">固定展示位</div>
              <div className="font-bold text-[#17233A]">
                {brand.fixed_position ? `前${SITE_META.fixed_editorial_positions}位固定` : "登记表顺序"}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <div className="text-[#64748B] mb-0.5 font-medium">核验日期</div>
              <div className="font-bold text-[#17233A]">{brand.verified_at ?? "待核验"}</div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                {brand.verified_at ? `站长核验 · 资料日 ${brand.data_date}` : `资料日 ${brand.data_date}`}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-sm text-[#475569] leading-relaxed">

          {/* Editorial pick for the five featured brands */}
          {featuredPick && (
            <div className="p-5 rounded-2xl bg-[#F0F5F9] border-l-4 border-[#6378EA] space-y-1.5">
              <div className="font-bold text-base text-[#17233A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6378EA]" />
                <span>本站重点推荐：{featuredPick.headline}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {featuredPick.proof}这是编辑推荐，含推广合作，不是测速或销量结果。
              </p>
            </div>
          )}

          {/* 统一的披露块：实测状态、资料引用、价格核验、商业合作（口径只在 BrandDisclosure 里改） */}
          <BrandDisclosure brandName={brand.name} dataDate={facts.dataDate} testDate={tests[0]?.tested_at ?? null} />

          {/* 站长的机场 MD 自己标注存疑的品牌：照 MD 写，并标“资料待核对”，站长确认后再去掉 */}
          {brandMd.needs_check && (
            <div id="needs-check" className="p-5 rounded-2xl border border-amber-300 bg-amber-50/70 space-y-1.5 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>资料待核对</span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {brandMd.needs_check}。先照站长的机场资料写，相关数字请以结算页为准。
              </p>
            </div>
          )}

          <BrandInfoSection brandId={brand.id} brandName={brand.name} />

          {/* “怎么样”证据表和“官网是哪个”（站长指定的三家，有官网资料才写） */}
          {officialSite && (
            <BrandEvidenceSection brand={brand} facts={facts} site={officialSite} tests={tests} deviceCaps={deviceCaps} />
          )}

          {/* Official site introduction (owner-specified brands only) */}
          {officialSite && (
            <OfficialSiteSection brandName={brand.name} site={officialSite} affiliateUrl={brand.affiliate_url} />
          )}

          {/* Owner-supplied test records */}
          {tests.map((test) => (
            <section key={test.title} id="tests" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-4 scroll-mt-24">
              <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>检测记录（{test.tester}提供）：{test.title}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[#64748B] mb-0.5">测试时间</div>
                  <div className="font-bold text-[#17233A]">{test.tested_at}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[#64748B] mb-0.5">测试网络</div>
                  <div className="font-bold text-[#17233A]">{test.network}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] col-span-2">
                  <div className="text-[#64748B] mb-0.5">工具与范围</div>
                  <div className="font-bold text-[#17233A]">{test.scope}</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">{test.tool}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {test.items_tested.map((item) => (
                  <span key={item} className="px-2 py-0.5 rounded-full bg-[#F0F5F9] text-[#475569] border border-[#E2E8F0]">{item}</span>
                ))}
              </div>
              {test.image ? (
                <div className="space-y-1.5">
                  <Image
                    src={test.image.src}
                    width={test.image.width}
                    height={test.image.height}
                    alt={test.image.alt}
                    className="w-full h-auto rounded-xl border border-[#E2E8F0]"
                  />
                  <a href={test.image.src} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#6378EA] hover:text-[#4F64D6]">
                    查看原图 →
                  </a>
                </div>
              ) : (
                <PendingTestImage />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <div className="font-bold text-[#17233A]">{test.image ? '图中显示' : '记录里显示'}</div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[#475569]">
                    {test.findings.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <div className="font-bold text-amber-800">这次没有测的</div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[#475569]">
                    {test.not_covered.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8]">
                怎么看这类检测图、怎么自己复测，见 <Link href="/guides/reading-speed-tests/" className="text-[#6378EA] font-semibold">机场测速报告怎么看</Link>；AI 用户的节点核对方法见 <Link href="/guides/ai-users/" className="text-[#6378EA] font-semibold">用 AI 工具怎么选机场</Link>。
              </p>
            </section>
          ))}

          {/* Coupon codes supplied by the site owner */}
          {coupons.length > 0 && (
            <section id="coupon" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3 scroll-mt-24">
              <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#6378EA]" />
                <span>{brand.name}优惠码</span>
              </h2>
              {coupons.map((coupon) => (
                <div key={coupon.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <code className="inline-block px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] font-mono font-bold text-lg text-[#6378EA] select-all w-fit">
                    {coupon.coupon_code}
                  </code>
                  <div className="text-xs text-[#64748B] leading-relaxed space-y-0.5">
                    <p>{coupon.verification_note}</p>
                    {(coupon.condition_notes ?? []).map((line) => <p key={line}>{line}</p>)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Section 1 */}
          <section id="price-summary" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#6378EA]" />
              <span>一、{brand.name}价格摘要</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#475569] list-disc list-outside pl-4">
              {buildPriceFactLines(facts).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          {/* Section 2: per-brand analysis computed from the price table */}
          <section id="fit" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-4 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#6378EA]" />
              <span>二、{brand.name}在 34 家里的位置、适合谁</span>
            </h2>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="font-bold text-[#17233A]">价格位次（按本站价格表计算）</div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-[#475569]">
                {analysis.ranks.map((line) => <li key={line}>{line}</li>)}
                {analysis.ladderText && <li>长周期折扣：{analysis.ladderText}（实付 ÷ 月付 × 月数，按主力月付档计算）。</li>}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-800">适合优先考虑的情况</div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-[#475569]">
                  {analysis.fitFor.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-amber-200 space-y-1">
                <div className="font-bold text-amber-800">需要另作比较的情况</div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-[#475569]">
                  {analysis.notFitFor.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="font-bold text-[#17233A]">限制与未知项</div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-[#475569]">
                {analysis.limits.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>
          </section>

          {/* Section 3：全部套餐与付款周期 */}
          <section id="plans" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-4 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#6378EA]" />
              <span>三、全部套餐与付款周期</span>
            </h2>
            <BrandPlansTable plans={plans} />
            <p className="text-[11px] text-[#94A3B8]">
              注：实付金额需在付款时一次付清；每 GB 单价按标称流量计算，未考虑倍率。
              {officialSite && officialSite.price_check.differences.length > 0 && (
                <> 官网页面与本表不同的地方，见上方<a href="#official" className="text-[#6378EA] font-semibold">官网介绍</a>，价格以结算页为准。</>
              )}
            </p>
          </section>

          {/* Section 4：注册入口怎样核对 */}
          <section id="entry" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#6378EA]" />
              <span>四、注册入口</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <a
                href={brand.affiliate_url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] font-semibold text-[#6378EA] border border-[#CBD5E1] transition-colors"
              >
                <span>前往 {brand.name} 注册入口</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {officialSite && <a href="#official" className="font-semibold text-[#6378EA] hover:text-[#4F64D6]">查看官网介绍 ↓</a>}
            </div>
          </section>

          {/* Section 5：购买前的核对清单 */}
          <section id="checklist" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3 scroll-mt-24">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>五、购买{brand.name}前的核对清单</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#475569] list-disc list-outside pl-4">
              {buildPurchaseChecklist(facts).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-xs">
              <Link href="/guides/refund-and-purchase-checklist/" className="text-[#6378EA] font-semibold">购买前核对清单 →</Link>
            </p>
          </section>

          <RelatedGuides brandName={brand.name} guides={relatedGuides} />

          {hasComparePage && (
            <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-between gap-3 text-xs">
              <span className="text-[#64748B]">在灵动云与暮光加速之间犹豫？</span>
              <Link href="/compare/lingdongyun-vs-twilight/" className="text-[#6378EA] hover:text-[#4F64D6] font-semibold flex items-center gap-1 shrink-0">
                <span>查阅两品牌对比 →</span>
              </Link>
            </div>
          )}

          <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/airports/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#17233A]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回 34 家完整目录</span>
            </Link>
            <a
              href={brand.affiliate_url}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#6378EA] border border-[#CBD5E1] transition-colors"
            >
              <span>前往 {brand.name} 注册入口（商业链接）</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </article>
  );
}
