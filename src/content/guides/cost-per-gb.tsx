import { VERIFICATION } from '@/data/verification';
import React from 'react';
import { H2, P, Ul, Ol, Callout, Table, BrandLink, GuideLink, Formula, Faq } from '@/components/guide/Prose';
import { fmtPerGB, fmtYuan, fmtZhe } from '@/data/format';
import {
  BRAND_COUNT,
  CHEAPEST_PACK,
  ENTRY_MONTHLY,
  LOWEST_PER_GB_REGULAR,
  MULTIPLIER_RULES_SUMMARY,
  PACK_PER_GB_RANGE,
  bestPerGBForUsage,
  cheapestCovering,
  discountStats,
  median
} from '@/data/guideStats';
import { CYCLE_LABELS } from '@/data/priceFacts';

/**
 * 每 GB 成本怎么算：名义单价、真实单价、倍率、付款周期。
 * 示例套餐和数字都取自价格表；用量档位（15、120、450GB）是假设，页面里写明。
 */
const PERSONA_USAGE = [
  { label: '轻度办公', usageGB: 15 },
  { label: '中度日常', usageGB: 120 },
  { label: '重度下载', usageGB: 450 }
];

export default function CostPerGb() {
  const best = LOWEST_PER_GB_REGULAR[0];
  const entry = ENTRY_MONTHLY[0];
  const sample = bestPerGBForUsage(100, 'm', 1, 200)[0];
  const yearly = discountStats('y')!;
  const entryPerGBMid = median(ENTRY_MONTHLY.map((e) => e.perGB));
  const packLow = CHEAPEST_PACK[0];
  const utilization: Array<[string, number]> = [
    ['全部用完', 1],
    ['用一半', 0.5],
    ['用五分之一', 0.2],
    ['用十分之一', 0.1]
  ];
  const personas = PERSONA_USAGE.map((p) => ({ ...p, row: cheapestCovering('m', p.usageGB)[0] }));
  const monthly120 = cheapestCovering('m', 120)[0];
  const yearly120 = cheapestCovering('y', 120)[0];
  const yearlySaving = monthly120.price * 12 - yearly120.price;

  return (
    <>
      <P>
        “低至每 GB 几分钱”这类宣传，算的是月费除以标称额度，默认你把额度全部用完。真实成本还取决于三件事：你实际用了多少，连的节点倍率是多少，你付的是一个月还是一整年的钱。本文给出对应的公式，并用本站价格表（{BRAND_COUNT} 家，{VERIFICATION.label}）里的真实档位来演示。
      </P>

      <H2 id="nominal-cost">名义单价：纸面上的每 GB 价格</H2>
      <Formula>名义单价 = 付款周期实付金额 ÷ 周期标称总流量（GB）</Formula>
      <P>
        价格表的月付到年付档位里，名义单价最低的是<BrandLink id={best.brand.id}>{best.brand.name}</BrandLink>「{best.name}」的{CYCLE_LABELS[best.cycle]}，{fmtYuan(best.price)}（每月 {best.monthlyGB}GB），{fmtPerGB(best.perGB)}/GB；入门月付最便宜的是<BrandLink id={entry.brand.id}>{entry.brand.name}</BrandLink>「{entry.name}」，{fmtYuan(entry.price)}/{entry.totalGB}GB，{fmtPerGB(entry.perGB)}/GB。名义单价只有在你把额度用满时才等于真实成本。
      </P>

      <H2 id="idle-waste-factor">真实单价：按你实际用的量算</H2>
      <Formula>真实单价 = 周期实付金额 ÷ 实际用掉的流量（GB）</Formula>
      <Formula>闲置浪费率 =（标称额度 − 实际用量）÷ 标称额度</Formula>
      <P>
        多数套餐的额度当期用不完就作废，所以同一个套餐，用得越少，真实单价越高。以<BrandLink id={sample.brand.id}>{sample.brand.name}</BrandLink>「{sample.name}」（月付 {fmtYuan(sample.price)}，每月 {sample.totalGB}GB，名义 {fmtPerGB(sample.perGB)}/GB）为例：
      </P>
      <Table
        head={['用到什么程度', '实际用量', '真实单价', '是名义单价的几倍']}
        rows={utilization.map(([label, u]) => [
          label,
          `${Math.round(sample.totalGB * u)}GB`,
          fmtPerGB(sample.price / (sample.totalGB * u)),
          `${(1 / u).toFixed(0)} 倍`
        ])}
      />
      <P>
        实际用量只有额度的十分之一时，真实单价是名义单价的 10 倍。这时名义单价再低，也不如选额度小一档的套餐。闲置浪费率越高，说明套餐比你的实际需要大得越多。
      </P>

      <H2 id="multiplier-impact">倍率：额度和数据量之间的换算</H2>
      <Formula>能传输的数据量 = 标称额度 ÷ 加权平均倍率</Formula>
      <Ul
        items={[
          <><strong>倍率 3：</strong>200GB 的额度只能传输约 66.7GB，真实单价是名义的 3 倍。</>,
          <><strong>倍率 0.5：</strong>200GB 的额度能传输 400GB，真实单价减半。</>,
          <><strong>混用节点：</strong>按各节点的数据量加权平均，不能直接按 1 倍率估算。例如一半数据量走倍率 1 的节点、一半走倍率 3 的节点，加权平均倍率是 2，200GB 的额度只能传输 100GB。站长提供的资料里，{MULTIPLIER_RULES_SUMMARY}，购买后仍要核对节点列表里标注的倍率。</>
        ]}
      />

      <H2 id="persona-scenarios">三种用量的真实单价（价格表实例）</H2>
      <P>
        假设三类用户每月实际用 15GB、120GB、450GB。用量是假设，套餐取自价格表里每月额度能覆盖该用量、实付最低的月付档：
      </P>
      <Table
        head={['用户', '假设月用量', '套餐', '实付', '每月额度', '名义单价', '真实单价']}
        rows={personas.map(({ label, usageGB, row }) => [
          label,
          `${usageGB}GB`,
          <><BrandLink key={row.brand.id} id={row.brand.id}>{row.brand.name}</BrandLink> {row.name}</>,
          fmtYuan(row.price),
          `${row.totalGB}GB`,
          fmtPerGB(row.perGB),
          fmtPerGB(row.price / usageGB)
        ])}
      />
      <P>
        用量越接近额度，真实单价越接近名义单价。表里轻度办公的真实单价是重度下载的 {(personas[0].row.price / personas[0].usageGB / (personas[2].row.price / personas[2].usageGB)).toFixed(1)} 倍：用得越少，每 GB 越贵，这不是套餐的错，而是固定的月费被摊在了更少的流量上。先估用量再选档，比盯着名义单价有用；想直接按自己的用量筛选，用<GuideLink href="/tools/plan-finder/">套餐匹配器</GuideLink>，想算自己的真实单价，用<GuideLink href="/tools/cost-per-gb/">每 GB 成本计算器</GuideLink>。
      </P>

      <H2 id="period-effect">付款周期：年付的单价要看你能不能用满一年</H2>
      <P>
        仍以每月用 120GB 为例：月付最低的是<BrandLink id={monthly120.brand.id}>{monthly120.brand.name}</BrandLink>「{monthly120.name}」，{fmtYuan(monthly120.price)}/月，连付 12 个月是 {fmtYuan(monthly120.price * 12)}；年付最低的是<BrandLink id={yearly120.brand.id}>{yearly120.brand.name}</BrandLink>「{yearly120.name}」，{fmtYuan(yearly120.price)}/年（每月 {yearly120.monthlyGB}GB），折合每月 {fmtYuan(Math.round((yearly120.price / 12) * 100) / 100)}。{yearlySaving > 0 ? `年付少花 ${fmtYuan(yearlySaving)}，但要先付 ${fmtYuan(yearly120.price)}，这笔钱只有整年都在用时才算省下。` : '这个用量下，年付没有比连付月付更省。'}
      </P>
      <P>
        年付档的真实单价 = 年付实付 ÷（每月实际用量 × 12）。年付把折扣换成预付，价格表里年付档的实付是连付 12 个月月付的 {fmtZhe(yearly.min)}–{fmtZhe(yearly.max)}，中位数是 {fmtZhe(yearly.median)}。折扣能压低单价，前提是整整一年你都用得上这份额度。一次性流量包不按月清零，但每 GB {fmtPerGB(PACK_PER_GB_RANGE.min)}–{fmtPerGB(PACK_PER_GB_RANGE.max)}，是入门月付每 GB 中位数（{fmtPerGB(entryPerGBMid)}）的 {(PACK_PER_GB_RANGE.min / entryPerGBMid).toFixed(1)} 倍以上，不适合当主力。
      </P>

      <H2 id="currency-and-fees">以结算页的最终金额为准</H2>
      <P>
        结算页可能含手续费或汇率折算，优惠码的抵扣也以结算页为准。算单价时，分子用你最终付出的钱，而不是标价。比较两家时，用各自结算页的最终金额，而不是各自首页的标价；如果结算页的金额比标价高，要把差额算进真实单价。本站没有统计各家的手续费，所以不写比例。
      </P>

      <H2 id="smart-buying-rules">四项核算习惯</H2>
      <Ol
        items={[
          '先看过去几个月的流量统计（客户端或服务商后台都有），用真实的月均消耗做选档上限。',
          `偶尔才用的话，比较“连付月付的总额”和“一次性包的价格”：价格表里最便宜的一次性包是${packLow.brand.name}的「${packLow.name}」，${fmtYuan(packLow.price)}/${packLow.totalGB}GB；入门月付最低 ${fmtYuan(entry.price)}，连付 12 个月是 ${fmtYuan(entry.price * 12)}。`,
          '比较不同品牌时，把节点倍率除进额度里，用同一口径还原。',
          '用了优惠码，就拿抵扣后的实付金额重新算一遍单价，抵扣多少以结算页为准。',
          '优先选能看到用量统计和账单明细的服务商，方便事后复盘。'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '名义单价最低的套餐就是最划算的吗？',
            a: '不一定。名义单价只在额度用满时成立，上面的表里，只用到额度的十分之一时，真实单价是名义单价的 10 倍。先估用量，再选额度略高于用量的档位。'
          },
          {
            q: '倍率是 1 就不用管了吗？',
            a: `站长提供的资料里，${MULTIPLIER_RULES_SUMMARY}；但节点列表里可能有倍率不同的节点。连接前看一眼，倍率高的节点每传输 1GB 扣的额度更多，会更快用完。`
          },
          {
            q: '文章和计算器是什么关系？',
            a: <>文章讲公式和例子；<GuideLink href="/tools/cost-per-gb/">计算器</GuideLink>让你输入自己的实付金额、标称额度、倍率和实际月消耗，直接算出名义单价、真实单价和闲置浪费。</>
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        具体资费与规则以各品牌结算页为准。单价只是一项指标，延迟、稳定性和售后同样影响值不值得买，而这些本站没有测试数据。
      </Callout>
    </>
  );
}
