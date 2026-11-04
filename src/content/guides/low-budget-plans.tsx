import React from 'react';
import { H2, P, Ul, Callout, Table, BrandLink, GuideLink } from '@/components/guide/Prose';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { ALL_ROWS, BRAND_COUNT, median, monthlyRowsUnder, packRowsUnder, yearlyRowsUnder, type BrandRow } from '@/data/guideStats';

const MONTHLY_LIMIT = 15;
const YEARLY_LIMIT = 100;
const PACK_LIMIT = 130;

function flags(row: BrandRow): string {
  return row.note ?? '';
}

const range = (values: number[]) => ({ min: Math.min(...values), max: Math.max(...values) });

export default function LowBudgetPlans() {
  const monthly = monthlyRowsUnder(MONTHLY_LIMIT);
  const yearly = yearlyRowsUnder(YEARLY_LIMIT);
  const packs = packRowsUnder(PACK_LIMIT);
  const monthlyGB = range(monthly.map((r) => r.totalGB));
  const yearlyGB = range(yearly.map((r) => r.monthlyGB ?? 0));
  const limitedCount = monthly.filter((r) => /限时|活动价/.test(r.note ?? '')).length;
  const packTimes = median(packs.map((r) => r.perGB)) / median(yearly.map((r) => r.perGB));
  const yearlyOnlyCount = yearly.filter((r) => !ALL_ROWS.some((x) => x.brand.id === r.brand.id && x.name === r.name && x.cycle === 'm')).length;

  return (
    <>
      <P>
        “便宜机场”要先定预算口径：<strong>月预算 {fmtYuan(MONTHLY_LIMIT)} 以内、年预算 {fmtYuan(YEARLY_LIMIT)} 以内、一次性流量包 {fmtYuan(PACK_LIMIT)} 以内</strong>。下面三张表是本站价格表里符合这三个口径的全部档位，按实付金额从低到高，附每月流量和每 GB 单价，妥协点不藏。价格由站长核验于 2026-11-03，之后仍可能调整。
      </P>

      <H2 id="monthly">月付 {fmtYuan(MONTHLY_LIMIT)} 以内（{monthly.length} 档）</H2>
      <Table
        head={['品牌', '套餐', '实付/月', '每月流量', '每 GB', '备注']}
        rows={monthly.map((r) => [<BrandLink key={`${r.brand.id}-${r.name}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.totalGB}GB`, fmtPerGB(r.perGB), flags(r) || '—'])}
      />
      <P>
        月付能压到 {fmtYuan(MONTHLY_LIMIT)} 以内的，每月流量在 {monthlyGB.min}–{monthlyGB.max}GB 之间，适合轻度用户试水。{limitedCount > 0 ? `其中有 ${limitedCount} 档标注“限时活动价”，买之前确认活动是否还在。` : ''}
      </P>

      <H2 id="yearly">年付 {fmtYuan(YEARLY_LIMIT)} 以内（{yearly.length} 档）</H2>
      <Table
        head={['品牌', '套餐', '实付/年', '每月流量', '每 GB', '备注']}
        rows={yearly.map((r) => [<BrandLink key={`${r.brand.id}-${r.name}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.monthlyGB}GB`, fmtPerGB(r.perGB), flags(r) || '—'])}
      />
      <P>
        {BRAND_COUNT} 家里有 {yearly.length} 档年付不超过 {fmtYuan(YEARLY_LIMIT)}，每月流量在 {yearlyGB.min}–{yearlyGB.max}GB 之间，折合每月 {fmtYuan(Math.round((yearly[0].price / 12) * 100) / 100)} 起。这是低预算下最常见的选择：钱比按月买少，流量比一次性包多。代价是一次付清一年，服务商出问题时这笔钱收不回来，所以不要在没用过的品牌上直接年付。
      </P>

      <H2 id="packs">一次性流量包 {fmtYuan(PACK_LIMIT)} 以内（{packs.length} 档）</H2>
      <Table
        head={['品牌', '流量包', '实付', '总量', '每 GB', '备注']}
        rows={packs.map((r) => [<BrandLink key={`${r.brand.id}-${r.name}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.totalGB}GB`, fmtPerGB(r.perGB), flags(r) || '—'])}
      />
      <P>
        这 {packs.length} 档流量包的每 GB 单价中位数，是上面年付小包中位数的 {packTimes.toFixed(1)} 倍。它便宜的只是“绝对金额”和“不清零”，不是单价；每个月都要用的人选年付小包更划算，流量包留给用量很低的备用场景，见 <GuideLink href="/guides/occasional-use/">偶尔使用怎么选</GuideLink>。
      </P>

      <H2 id="monthly-vs-yearly">同样的低预算：连付月付，还是一次买年付小包</H2>
      <Table
        head={['方案', '一年总支出', '一年总流量', '代价']}
        rows={[
          [
            <><BrandLink key="cmp-m" id={monthly[0].brand.id}>{monthly[0].brand.name}</BrandLink> {monthly[0].name}，连付 12 个月</>,
            fmtYuan(monthly[0].price * 12),
            `${monthly[0].totalGB * 12}GB`,
            '随时可以停，不用的月份不花钱'
          ],
          [
            <><BrandLink key="cmp-y" id={yearly[0].brand.id}>{yearly[0].brand.name}</BrandLink> {yearly[0].name}，一次付清</>,
            fmtYuan(yearly[0].price),
            `${yearly[0].totalGB}GB`,
            '第一天付清，中途不用了也收不回来'
          ]
        ]}
      />
      <P>
        {monthly[0].price * 12 > yearly[0].price
          ? `连付 12 个月比最低的年付多花 ${fmtYuan(monthly[0].price * 12 - yearly[0].price)}，换来的是随时止损的权利。每个月都要用、又确定会用满一年的，年付小包更省；没把握的，先月付。`
          : '这两个方案的一年总支出相差不大，没把握的先选月付。'}
      </P>

      <H2 id="tradeoffs">低价套餐通常在哪里妥协</H2>
      <Ul
        items={[
          `流量少：月付和年付两张表里，每月流量最高 ${Math.max(monthlyGB.max, yearlyGB.max)}GB，常看高清视频的人可能不够用。`,
          `只有年付：上面 ${yearly.length} 档年付里有 ${yearlyOnlyCount} 档在价格表里没有同名的月付档，没法先月付试；这种情况先用同一家的月付档试一个月。`,
          '限时或学生档：标注“限时活动价”“学生”的，可能有资格或时间限制，以结算页为准。',
          '价格会变：核验日期是 2026-11-03，服务商随时可能调价或下架，下单前以结算页为准。',
          <>条款：低价不代表条款宽松，退款、设备、禁用用途仍要按 <GuideLink href="/guides/refund-and-purchase-checklist/">购买前核对清单</GuideLink> 过一遍。</>
        ]}
      />

      <H2 id="avoid">怎么避开“几块钱一年”的坑</H2>
      <Ul
        items={[
          '价格明显低于本表最低档的，先问自己它靠什么维持；不预付超过一个月的钱。',
          '要求先付款才能看套餐规则或条款的，不买。',
          '没有可核实的服务条款、联系方式和退款说明的，不买。',
          '任何优惠都以结算页实际抵扣为准。'
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        三个预算口径是本站设定的比较标准，不是行业定义；表格只收录本站价格表里的 {BRAND_COUNT} 家，不推断未收录品牌。单价按标称流量计算；本站按站长核验的口径显示 1 倍率。
      </Callout>
    </>
  );
}
