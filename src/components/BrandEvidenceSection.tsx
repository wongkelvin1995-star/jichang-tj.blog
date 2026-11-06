import React from 'react';
import Link from 'next/link';
import { ClipboardList } from 'lucide-react';
import type { BrandTestRecord } from '@/data/brandTests';
import { getBrandTerms } from '@/data/brandTerms';
import { fmtYuan } from '@/data/format';
import type { OfficialSite } from '@/data/officialSites';
import { CYCLE_LABELS, type BrandPriceFacts, type DeviceCap } from '@/data/priceFacts';
import { VERIFICATION } from '@/data/verification';
import type { Brand } from '@/types';

interface Props {
  brand: Brand;
  facts: BrandPriceFacts;
  site: OfficialSite;
  tests: BrandTestRecord[];
  deviceCaps: DeviceCap[];
}

interface EvidenceRow {
  item: string;
  fact: React.ReactNode;
  source: string;
}

/**
 * “{品牌}怎么样”证据表（2026-11-04 审计 P1-6）。
 * 只写本站手上有出处的资料，并把空白项写出来；不使用“实测”叙事：本站没有做过带宽和晚高峰测试，
 * 延迟与解锁只有站长提供的检测记录。
 * 只用于有官网资料的三家（站长指定）。数据全部来自 officialSites.ts、brandTests.ts、价格表和 brands.ts，不手写数字。
 */
export default function BrandEvidenceSection({ brand, facts, site, tests, deviceCaps }: Props) {
  const test = tests[0];
  const terms = getBrandTerms(brand.id);
  const { entryMonthly, cheapestYearly } = facts;
  const priceParts = [
    entryMonthly ? `入门月付：${entryMonthly.name} ${fmtYuan(entryMonthly.price)}/月，每月 ${entryMonthly.totalGB}GB` : null,
    cheapestYearly ? `最低年付：${cheapestYearly.name} ${fmtYuan(cheapestYearly.price)}/年，每月 ${cheapestYearly.monthlyGB}GB` : null,
    `付款周期：${facts.cycles.map((c) => CYCLE_LABELS[c]).join('、')}`
  ].filter((part): part is string => part !== null);
  const diffCount = site.price_check.differences.length;
  const priceSource =
    `站长核验于 ${VERIFICATION.verified_on}；官网价格页对照（${site.checked_on}）：` +
    (diffCount > 0 ? `有 ${diffCount} 处差异，价格以结算页为准` : '已对照的价格行一致') +
    (site.price_check.not_compared ? `；${site.price_check.not_compared}` : '') +
    '，详见下方官网介绍';
  const capText = deviceCaps.length > 0 ? `（${deviceCaps.map((c) => `${c.name}最多 ${c.max} 台`).join('、')}，以结算页为准）` : '';
  const blanks = `${test ? '' : '延迟与解锁、'}下载与上传速度、晚高峰表现、长期稳定性、客服响应速度${terms.refund ? '' : '、退款规则'}`;
  const altName = site.official_name && site.official_name !== brand.name ? `（${site.official_name}）` : '';

  const rows: EvidenceRow[] = [
    {
      item: '官网',
      fact: (
        <>
          <code className="font-mono font-semibold text-[#17233A]">{site.host}</code>，见下方<a href="#official" className="text-[#6378EA] font-semibold">官网介绍</a>
        </>
      ),
      source: `站长提供地址；本站 ${site.checked_on} 打开过官网首页和价格页，官网自述是品牌自己的说法，未经本站测试`
    },
    { item: '价格', fact: priceParts.join('；'), source: priceSource },
    { item: '线路', fact: brand.protocol_architecture || '未标注', source: '资料标注（品牌自述），本站未验证' },
    { item: '倍率、设备、限速', fact: `倍率：${terms.multiplier ?? '资料未提供'}；设备：${terms.devices ?? '资料未提供'}${capText}；限速：${terms.speed ?? '资料未提供'}`, source: '站长提供的机场资料（品牌自己的标注），本站未验证' },
    {
      item: '检测记录',
      fact: test ? `${test.tested_at}，${test.network}：${test.title}` : '没有',
      source: test
        ? `${test.tester}提供；${test.not_covered[0].replace(/。$/, '')}；${test.image ? '结果和原图见下方“检测记录”' : '结果见下方“检测记录”，原图待更新中'}`
        : `本站没有对${brand.name}做过检测，也没有收到站长提供的检测记录`
    },
    { item: '没有数据的项', fact: blanks, source: '本站没有测试，或资料没有写明；购买前自己核对，见下方“购买前的核对清单”' }
  ];

  return (
    <section id="evidence" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-4 scroll-mt-24">
      <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-[#6378EA]" />
        <span>{brand.name}怎么样？官网、价格与检测记录核对</span>
      </h2>
      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
        <strong className="text-[#17233A]">{brand.name}怎么样？</strong>
        本站没有做过{brand.name}的下载速度和晚高峰测试，{test ? '延迟与解锁只有站长提供的一份检测记录' : '也没有收到任何检测记录'}，所以回答不了“快不快、稳不稳”。下表只列本站手上有出处的资料，以及仍然空白的部分，供你判断要不要先用月付试一个月。
      </p>

      {/* 同一个 <table>：桌面端是三列表格，手机端每一行叠成一块，避免第三列被挤出屏幕 */}
      <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm border-collapse block sm:table">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] whitespace-nowrap">
              <th className="py-2.5 px-3 font-semibold">项目</th>
              <th className="py-2.5 px-3 font-semibold">本站手上有出处的资料</th>
              <th className="py-2.5 px-3 font-semibold">来源与日期</th>
            </tr>
          </thead>
          <tbody className="block sm:table-row-group divide-y divide-[#E2E8F0]">
            {rows.map((row) => (
              <tr key={row.item} className="block sm:table-row px-3 py-3 sm:p-0 space-y-1 sm:space-y-0">
                <th scope="row" className="block sm:table-cell sm:py-2.5 sm:px-3 text-left align-top font-semibold text-[#17233A] sm:whitespace-nowrap">
                  {row.item}
                </th>
                <td className="block sm:table-cell sm:py-2.5 sm:px-3 align-top text-[#475569] leading-relaxed">{row.fact}</td>
                <td className="block sm:table-cell sm:py-2.5 sm:px-3 align-top text-[11px] sm:text-sm text-[#64748B] leading-relaxed">
                  <span className="sm:hidden font-semibold">来源与日期：</span>
                  {row.source}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-1.5 text-xs sm:text-sm">
        <h3 id="official-which" className="text-base font-bold text-[#17233A] scroll-mt-24">{brand.name}{altName}官网是哪个？</h3>
        <p className="text-[#475569] leading-relaxed">
          {site.which_is_official}（品牌自述，{site.checked_on} 查看，本站未验证）。{site.which_is_official_note ? `${site.which_is_official_note}。` : ''}官网地址以站长提供的 <code className="font-mono font-semibold text-[#17233A]">{site.host}</code> 为准；本站（jichang-tj.blog）是选购博客，<strong>不是{brand.name}官网</strong>，页面上的注册入口是推广链接，价格与官网相同，不加价。
        </p>
      </div>

      <p className="text-[11px] text-[#94A3B8]">
        想自己测一遍、看懂别处的测速图，见<Link href="/guides/reading-speed-tests/" className="text-[#6378EA] font-semibold">机场测速图怎么看</Link>。
      </p>
    </section>
  );
}
