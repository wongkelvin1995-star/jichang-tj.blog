import React from 'react';
import { H2, P, Ul, Callout, Table, BrandLink, GuideLink } from '@/components/guide/Prose';
import { buildBrandAnalysis } from '@/data/brandAnalysis';
import { BRANDS } from '@/data/brands';
import { COUPON_DISCOUNT_LABEL } from '@/data/coupons';
import { fmtPerGB, fmtYuan, fmtZhe } from '@/data/format';
import {
  BRAND_COUNT,
  CYCLE_COVERAGE,
  DEVICE_CAP_EXCEPTION,
  ENTRY_MONTHLY,
  PACK_PER_GB_RANGE,
  ROWS_WITH_RESET_NOTE,
  bestPerGBForBudget,
  bestPerGBForUsage,
  discountStats,
  median,
  type BrandRow
} from '@/data/guideStats';

function tierRows(rows: BrandRow[], cycleLabel: string) {
  return rows.map((r) => [
    <BrandLink key={`${r.brand.id}-${r.name}-${r.cycle}`} id={r.brand.id}>{r.brand.name}</BrandLink>,
    r.name,
    `${fmtYuan(r.price)}/${cycleLabel}`,
    `${r.monthlyGB}GB`,
    fmtPerGB(r.perGB)
  ]);
}

export default function ValueForMoney() {
  const tier100 = bestPerGBForUsage(100, 'm', 5, 200);
  const tier300 = bestPerGBForUsage(300, 'm', 5, 450);
  const tier500 = bestPerGBForUsage(500, 'm', 5);
  const yearly100 = bestPerGBForUsage(100, 'y', 5, 200);
  const budget20 = bestPerGBForBudget(20, 'm', 4);
  const budget30 = bestPerGBForBudget(30, 'm', 4);
  const budget100 = bestPerGBForBudget(100, 'y', 4);
  const budget250 = bestPerGBForBudget(250, 'y', 4);
  const ladders = ['lingdongyun', 'twilight', 'breezenet', 'flycat'].map((id) => ({
    id,
    name: BRANDS.find((b) => b.id === id)!.name,
    analysis: buildBrandAnalysis(id)
  }));
  const entryLow = ENTRY_MONTHLY[0];
  const stepStats = (['q', 'h', 'y', 'b', 't'] as const).map((c) => discountStats(c)!);
  const stepLabels: Record<string, string> = { q: '季付', h: '半年付', y: '年付', b: '两年付', t: '三年付' };
  const statText = (s: (typeof stepStats)[number]) => {
    const flat = Math.abs(s.max - s.min) < 0.005;
    return flat
      ? `${stepLabels[s.cycle]} ${fmtZhe(s.median)}（${CYCLE_COVERAGE[s.cycle]} 家提供）`
      : `${stepLabels[s.cycle]}中位数 ${fmtZhe(s.median)}（${CYCLE_COVERAGE[s.cycle]} 家提供，范围 ${fmtZhe(s.min)}–${fmtZhe(s.max)}）`;
  };
  const entryPerGBMid = median(ENTRY_MONTHLY.map((e) => e.perGB));

  return (
    <>
      <P>
        “性价比”不是“最便宜”。一个月 {fmtYuan(entryLow.price)} 的套餐只有 {entryLow.totalGB}GB，对只查资料的人够用，对常看高清视频的人可能不够，反而最不划算。本文把性价比拆成三个能算的因子：<strong>每 GB 单价、流量够不够用、付款风险</strong>，用本站价格表（{BRAND_COUNT} 家，站长核验于 2026-11-03）算出各用量档位和各预算下每 GB 最低的选项，最后列出“便宜翻墙”最常见的坑。
      </P>

      <H2 id="formula">性价比 = 单价 × 够用 × 风险</H2>
      <Ul
        items={[
          <><strong>单价：</strong>实付金额 ÷ 周期总流量，这是跨品牌比较唯一公平的口径，算法见 <GuideLink href="/guides/cost-per-gb/">每 GB 成本怎么算</GuideLink>。</>,
          <><strong>够用：</strong>额度低于实际用量，单价再低也要加购或忍着；额度高出太多，闲置部分把真实单价抬高。先估用量再比价。</>,
          <><strong>风险：</strong>年付、两年付比月付便宜，但钱一次付清，服务商出问题时收不回来。折扣是用预付时间换来的。</>
        ]}
      />

      <H2 id="by-usage">第一步：按用量选档，再比每 GB</H2>
      <P>每月 100–200GB，日常网页、社交和少量视频：</P>
      <Table head={['品牌', '套餐', '实付', '每月流量', '每 GB']} rows={tierRows(tier100, '月')} />
      <P>每月 300–450GB，经常看高清视频或下载：</P>
      <Table head={['品牌', '套餐', '实付', '每月流量', '每 GB']} rows={tierRows(tier300, '月')} />
      <P>每月 500GB 以上，重度视频、多人共用：</P>
      <Table head={['品牌', '套餐', '实付', '每月流量', '每 GB']} rows={tierRows(tier500, '月')} />
      <P>
        三张表说明一件事：<strong>档位越大，账面单价越低，但只有用得完才成立</strong>。举个假设的例子：每月实际用 120GB，买 150GB 档月付 25 元，真实单价是 25 ÷ 120 ≈ 0.21 元/GB；换成 500GB 档月付 65 元，账面单价只有 0.13 元/GB，但真实单价是 65 ÷ 120 ≈ 0.54 元/GB，反而贵了一倍多。所以选档的顺序应该是先估用量、再看单价，尽量选额度略高于用量的档位。确定长期用的话，年付的单价还能再低一截，例如每月 100–200GB 的年付档：
      </P>
      <Table head={['品牌', '套餐', '实付', '每月流量', '每 GB']} rows={tierRows(yearly100, '年')} />

      <H2 id="by-budget">第二步：按预算倒推</H2>
      <P>如果你是先定预算再选套餐，下面按四档预算列出每 GB 最低的选项：</P>
      <Table
        head={['预算', '品牌', '套餐', '实付', '每月流量', '每 GB']}
        rows={[
          ...budget20.map((r) => ['月付 ≤ ¥20', <BrandLink key={`b20-${r.brand.id}-${r.name}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.monthlyGB}GB`, fmtPerGB(r.perGB)]),
          ...budget30.map((r) => ['月付 ≤ ¥30', <BrandLink key={`b30-${r.brand.id}-${r.name}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.monthlyGB}GB`, fmtPerGB(r.perGB)]),
          ...budget100.map((r) => ['年付 ≤ ¥100', <BrandLink key={`b100-${r.brand.id}-${r.name}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.monthlyGB}GB`, fmtPerGB(r.perGB)]),
          ...budget250.map((r) => ['年付 ≤ ¥250', <BrandLink key={`b250-${r.brand.id}-${r.name}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.monthlyGB}GB`, fmtPerGB(r.perGB)])
        ]}
      />
      <P>
        预算一样时，优先选每月流量更接近自己用量的那档，而不是单价最低的那档。
      </P>

      <H2 id="risk">第三步：把付款风险算进去</H2>
      <P>长周期的折扣要和预付金额一起看。几家前排品牌主力档位的折扣阶梯（实付 ÷ 月付 × 月数）：</P>
      <Table
        head={['品牌', '折扣阶梯']}
        rows={ladders.map(({ id, name, analysis }) => [<BrandLink key={id} id={id}>{name}</BrandLink>, analysis.ladderText ?? '价格表只有月付'])}
      />
      <P>
        全站所有品牌的折扣（折扣 = 实付 ÷（月付 × 月数），同品牌同套餐名比较）：{stepStats.map((s) => statText(s)).join('；')}。周期越长折扣越大，预付的金额也成倍增加，所以<strong>第一次买只买月付，用满一个月确认体验再上年付</strong>；两年付、三年付只在预付金额你完全承受得起损失时才考虑。另外要分清首月价和续费价：有些档位标注“限时活动价”，第二个月可能恢复原价，比较性价比时按续费价算，不按首月价算。
      </P>
      <P>
        合起来就是三句话：用量决定档位，档位内比每 GB，再用月付验证一个月后决定要不要预付。<GuideLink href="/tools/plan-finder/">套餐匹配器</GuideLink>就是按这个顺序做的：填用量和预算，它只列出额度够用、单价最低的档位。
      </P>

      <H2 id="rules">第四步：规则不划算，单价再低也白搭</H2>
      <Ul
        items={[
          <>倍率、设备数、限速：本站按站长核验的口径显示 1 倍率、不限设备、不限速{DEVICE_CAP_EXCEPTION ? `（${DEVICE_CAP_EXCEPTION}）` : ''}；购买后仍在订阅节点列表确认有没有高倍率节点。</>,
          <>重置与结转：价格表里只有 {ROWS_WITH_RESET_NOTE.length} 个套餐写明了刷新或重置规则，其余没写明，没用完的额度按作废准备，所以档位不要买得远超用量，见 <GuideLink href="/guides/billing-and-traffic-rules/">付款与流量规则</GuideLink>。</>,
          <>退款：{BRAND_COUNT} 家的价格资料都没有退款条款，付款前自己去服务条款确认，见 <GuideLink href="/guides/refund-and-purchase-checklist/">购买前核对清单</GuideLink>。</>,
          '稳定性：本站没有测速数据，用月付试用一个月来验证，成本就是一个月的钱。'
        ]}
      />

      <H2 id="traps">“便宜翻墙”最常见的四个坑</H2>
      <Ul
        items={[
          '几块钱一年、永久套餐：价格远低于本站最低档位的，先问它靠什么维持，不要预付超过一个月的钱。',
          '只看折合月价：年付折合每月十几块，但钱是一次付清的，服务商跑路时整年的钱一起没了。',
          '高倍率节点：标称 100GB，用 3 倍率节点只剩 33GB，单价直接翻三倍。',
          <>把一次性流量包当主力：流量包每 GB {fmtPerGB(PACK_PER_GB_RANGE.min)}–{fmtPerGB(PACK_PER_GB_RANGE.max)}，是入门月付每 GB 中位数（{fmtPerGB(entryPerGBMid)}）的 {(PACK_PER_GB_RANGE.min / entryPerGBMid).toFixed(1)} 倍以上，只适合备用，见 <GuideLink href="/guides/occasional-use/">偶尔使用怎么选</GuideLink>。</>
        ]}
      />

      <H2 id="commission">关于本站的佣金</H2>
      <P>
        本站的品牌入口是推广链接，你通过它购买，本站会从服务商那里得到佣金。佣金由服务商承担，<strong>你的购买价格和直接在官网购买完全相同，不会因此多付一分钱</strong>；页面上的优惠码（{COUPON_DISCOUNT_LABEL}）是在此基础上另外抵扣的，抵扣多少以结算页为准。佣金不改变本站写出来的价格和比较结果。
      </P>

      <Callout title="本文的边界" tone="warn">
        所有单价按标称流量计算，按本站口径 1 倍率；价格由站长核验于 2026-11-03，之后以结算页为准。本站没有测试速度和稳定性，“划算”只指价格与规则，不指体验。预算口径更细的表见 <GuideLink href="/guides/low-budget-plans/">便宜机场怎么比较</GuideLink>。
      </Callout>
    </>
  );
}
