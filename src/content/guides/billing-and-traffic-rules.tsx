import { VERIFICATION } from '@/data/verification';
import React from 'react';
import { H2, P, Ul, Ol, Callout, Table, BrandLink, GuideLink, Formula, Faq } from '@/components/guide/Prose';
import { fmtPerGB, fmtYuan, fmtZhe } from '@/data/format';
import {
  ALL_ROWS,
  BRAND_COUNT,
  CHEAPEST_PACK,
  CHEAPEST_YEARLY,
  CYCLE_COVERAGE,
  ENTRY_MONTHLY,
  MULTIPLIER_RULES_SUMMARY,
  PACK_PER_GB_RANGE,
  QUARTERLY_ABOVE_MONTHLY_COUNT,
  RESET_NOTE_BRAND_COUNT,
  ROWS_WITH_RESET_NOTE,
  discountStats,
  median
} from '@/data/guideStats';
import { TERMS_STATS } from '@/data/brandTerms';
import { CYCLE_LABELS } from '@/data/priceFacts';

/**
 * 月付、年付与流量包：折扣、重置、结转和倍率。
 * 折扣阶梯、品牌数、重置规则全部从价格表算出；没有来源的比例（如“多少服务商不结转”）不写。
 */
export default function BillingAndTrafficRules() {
  const cycles = (['q', 'h', 'y', 'b', 't'] as const).map((c) => discountStats(c)!);
  const yearly = discountStats('y')!;
  const twoYear = discountStats('b')!;
  const threeYear = discountStats('t')!;
  const exampleMonthly = 25;
  const exampleYearly = Math.round(exampleMonthly * 12 * yearly.median);
  const minOf = (cycle: 'b' | 't') => Math.min(...ALL_ROWS.filter((r) => r.cycle === cycle).map((r) => r.price));
  const resetAllYearly = ROWS_WITH_RESET_NOTE.every((r) => r.cycle === 'y');
  const packRows = ALL_ROWS.filter((r) => r.cycle === 'o');
  const entryPerGBMid = median(ENTRY_MONTHLY.map((e) => e.perGB));
  const packLow = CHEAPEST_PACK[0];
  const yearlyLow = CHEAPEST_YEARLY[0];

  return (
    <>
      <P>
        月付、季付、年付和一次性流量包，差别不在流量大小，而在你先付多少钱、额度什么时候回来、没用完怎么办。本文用本站价格表（{BRAND_COUNT} 家、{ALL_ROWS.length} 个价格选项，{VERIFICATION.label}）算出每种付款周期的折扣，再讲重置、结转和倍率要核对什么。
      </P>
      <P>
        结论先说：第一次接触的品牌买月付；用满一个月再决定要不要上年付；一次性流量包只适合用量很低或当备用。理由和数字在下面。
      </P>

      <H2 id="cycles">月付机场和年付机场怎么选：先看折扣，再看预付风险</H2>
      <P>
        下表是各付款周期相对“连付月付”的折扣，折扣 = 实付 ÷（月付 × 月数），只比较同一品牌同一套餐名下的价格。折合月价 = 实付 ÷ 月数，只用来比较，不是每月的实际支出：
      </P>
      <Table
        head={['付款周期', '提供的品牌数', '折扣中位数', '折扣范围']}
        rows={cycles.map((s) => [
          CYCLE_LABELS[s.cycle],
          `${CYCLE_COVERAGE[s.cycle]} 家`,
          fmtZhe(s.median),
          Math.abs(s.max - s.min) < 0.005 ? '各档一致' : `${fmtZhe(s.min)}–${fmtZhe(s.max)}`
        ])}
      />
      <P>
        以月付 {fmtYuan(exampleMonthly)} 的套餐为例：连付 12 个月是 {fmtYuan(exampleMonthly * 12)}，年付按折扣中位数（{fmtZhe(yearly.median)}）算是 {fmtYuan(exampleYearly)}，省 {fmtYuan(exampleMonthly * 12 - exampleYearly)}，但第一天要付 {fmtYuan(exampleYearly)}，是月付的 {(exampleYearly / exampleMonthly).toFixed(1)} 倍。省下的钱是用预付风险换的：服务商停止服务或调整规则时，没用完的部分能不能退取决于条款，而站长提供的资料里，写了退款说明的品牌有 {TERMS_STATS.refundStated} 家。{QUARTERLY_ABOVE_MONTHLY_COUNT > 0 ? `另外要逐档核对：有 ${QUARTERLY_ABOVE_MONTHLY_COUNT} 个季付档比连付 3 个月月付还贵。` : ''}
      </P>
      <Ul
        items={[
          <><strong>第一次买、用量不确定：</strong>月付。{BRAND_COUNT} 家都有月付档，试用的成本就是一个月的钱。</>,
          <><strong>用满一个月、确定长期用：</strong>再考虑年付。年付的折扣中位数是 {fmtZhe(yearly.median)}，比半年付的 {fmtZhe(cycles[1].median)}、季付的 {fmtZhe(cycles[0].median)} 都低。</>,
          <><strong>两年付、三年付：</strong>只有 {CYCLE_COVERAGE.b} 家提供，折扣分别是 {fmtZhe(twoYear.median)} 和 {fmtZhe(threeYear.median)}，最低要一次付 {fmtYuan(minOf('b'))} 和 {fmtYuan(minOf('t'))}，预付相当于 24 个月和 36 个月的月付，只在完全承受得起损失时才考虑。其中灵动云的两年付、三年付，官网价格页只列到年付，站长确认结算页有，以结算页为准，见<GuideLink href="/airports/lingdongyun/#official">灵动云官网核对</GuideLink>。</>
        ]}
      />

      <H2 id="reset">额度什么时候重置</H2>
      <P>
        重置口径主要有两种：一种是购买日起每 30 天刷新，一种是每月 1 日统一重置，后者在月末下单时首期可用天数会缩短。价格表备注里写了刷新或重置规则的套餐有 {ROWS_WITH_RESET_NOTE.length} 个（{RESET_NOTE_BRAND_COUNT} 家）{resetAllYearly ? '，全部是年付档' : ''}，列在下表；其余品牌的流量规则看各品牌页的“品牌资料”。
      </P>
      <Table
        head={['品牌', '套餐', '价格表备注']}
        rows={ROWS_WITH_RESET_NOTE.map((r) => [
          <BrandLink key={`${r.brand.id}-${r.name}`} id={r.brand.id}>{r.brand.name}</BrandLink>,
          r.name,
          r.note ?? '—'
        ])}
      />
      <P>
        其余套餐的重置时间资料没有写明，下单前到结算页或帮助页确认；问不到就按“每月清零”准备。
      </P>

      <H2 id="rollover">没用完的流量能不能结转</H2>
      <P>
        价格表把每个年付档都记录为“每月 N GB”，总量按 12 个月计，没有哪个年付档被写成“整年一次性给总量”。所以“年付 3000GB”这类写法，按每月额度来理解更稳妥：某个月用不完，不要指望补给下个月。是否结转，价格表只在个别备注里写了“未用完不结转”，其余没有写明，要看结算页或帮助页的说明。
      </P>

      <H2 id="traffic-packs">一次性流量包：不清零，但每 GB 更贵</H2>
      <P>
        价格表里有 {packRows.length} 个一次性流量包（{CYCLE_COVERAGE.o} 家），每 GB {fmtPerGB(PACK_PER_GB_RANGE.min)}–{fmtPerGB(PACK_PER_GB_RANGE.max)}，是入门月付每 GB 中位数（{fmtPerGB(entryPerGBMid)}）的 {(PACK_PER_GB_RANGE.min / entryPerGBMid).toFixed(1)}–{(PACK_PER_GB_RANGE.max / entryPerGBMid).toFixed(1)} 倍。它的价值不在单价，而在不按月清零：用量很低，或只想放着备用时才合适。最便宜的是{packLow.brand.name}的「{packLow.name}」，{fmtYuan(packLow.price)}/{packLow.totalGB}GB。有效期各家写法不同：{packRows.filter((r) => r.note?.includes('流量不过期')).length} 个包写了流量不过期，{packRows.filter((r) => r.note?.includes('有效期')).length} 个写了固定有效期（如有效期 365 天），其余没有写明，买之前都要确认，具体比较见<GuideLink href="/guides/occasional-use/">偶尔使用怎么选</GuideLink>。
      </P>

      <H2 id="multipliers">倍率：标称额度怎么换成能用的数据量</H2>
      <Formula>能传输的数据量 = 标称额度 ÷ 倍率</Formula>
      <P>
        倍率 2 的节点，300GB 的套餐只能传输 150GB；倍率 0.5 的节点，同样的额度能传输 600GB。倍率不同的节点可以混用，额度按各自的倍率分别扣。站长提供的资料里，{MULTIPLIER_RULES_SUMMARY}，购买后仍要在节点列表里逐个看节点标注的倍率，别等额度快用完才发现。
      </P>

      <H2 id="selection-checklist">下单前的三项自检</H2>
      <Ol
        items={[
          '结算页上的付款周期和实付金额，与你想买的一致，优惠码抵扣后的金额也核对过。',
          '确认额度的重置口径是“购买日起每 30 天”还是“每月 1 日”，以及未用完的额度是否结转。',
          <>先估自己每月真实用量，不要为了摊薄纸面单价买远超用量的容量，算法见<GuideLink href="/guides/cost-per-gb/">每 GB 成本怎么算</GuideLink>。</>
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '年付买了以后不想用了，能退款吗？',
            a: `站长提供的资料里只有 ${TERMS_STATS.refundStated} 家写了退款说明（大意），具体条款本站没有，所以只能以服务条款为准。条款没有写的，按不可退款准备，这也是第一次只买月付的原因。`
          },
          {
            q: '季付划算吗？',
            a: `季付折扣的中位数是 ${fmtZhe(cycles[0].median)}，只比连付三个月月付省一点${QUARTERLY_ABOVE_MONTHLY_COUNT > 0 ? `，还有 ${QUARTERLY_ABOVE_MONTHLY_COUNT} 个季付档比连付月付更贵` : ''}。预付金额不大、又确定要用三个月时可以考虑，但要和月付逐档核对结算页金额。`
          },
          {
            q: '只想偶尔用，买月付、年付还是流量包？',
            a: (
              <>
                按价格表的最低价，年付小包 {fmtYuan(yearlyLow.price)}，一年共 {yearlyLow.totalGB}GB；最便宜的一次性包 {fmtYuan(packLow.price)}，共 {packLow.totalGB}GB。每个月都会用一点，选年付小包；一年只用几次、不确定哪个月用，再看流量包，细节见<GuideLink href="/guides/occasional-use/">偶尔使用怎么选</GuideLink>。
              </>
            )
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        服务商可能调整资费、倍率和重置时间，一切以结算页和品牌官方条款为准。本文的折扣是价格表里的算术结果，不代表任何品牌今后的定价。
      </Callout>
    </>
  );
}
