import React from 'react';
import { H2, P, Ul, Callout, Table, BrandLink, GuideLink, Faq } from '@/components/guide/Prose';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { CHEAPEST_PACK, CHEAPEST_YEARLY, ENTRY_MONTHLY } from '@/data/guideStats';
import { getPriceFacts } from '@/data/priceFacts';

export default function OccasionalUse() {
  const monthlyLow = ENTRY_MONTHLY[0];
  const yearlyLow = CHEAPEST_YEARLY.slice(0, 3);
  const packLow = CHEAPEST_PACK.slice(0, 3);
  const bestYearly = CHEAPEST_YEARLY[0];
  const bestPack = CHEAPEST_PACK[0];
  const monthsUsed = [1, 2, 3, 6, 12];
  const cheapestForOneMonth = ([['按月买', monthlyLow.price], ['年付小包', bestYearly.price], ['一次性包', bestPack.price]] as Array<[string, number]>).sort((a, b) => a[1] - b[1])[0][0];

  return (
    <>
      <P>
        偶尔才用的人最怕“白交月租”。结论先说：<strong>每个月都会用一点的，年付小包最便宜；只在少数几个月里用、而且能预知是哪几个月的，按月买最省；一次性流量包单价最高，只在几年才用一次、不想每年续费时才有意义</strong>。下面用价格表里的最低价把账算出来。
      </P>

      <H2 id="options">三种低频方案的最低价</H2>
      <Table
        head={['方案', '代表', '实付', '可用流量', '每 GB', '规则']}
        rows={[
          ['按月买，只买要用的月份', <><BrandLink id={monthlyLow.brand.id}>{monthlyLow.brand.name}</BrandLink> {monthlyLow.name}</>, `${fmtYuan(monthlyLow.price)}/月`, `${monthlyLow.totalGB}GB/月`, fmtPerGB(monthlyLow.perGB), '当月清零，不用的月份不买'],
          ...yearlyLow.map((r) => ['年付小包', <><BrandLink key={r.brand.id} id={r.brand.id}>{r.brand.name}</BrandLink> {r.name}</>, `${fmtYuan(r.price)}/年`, `${r.monthlyGB}GB/月`, fmtPerGB(r.perGB), '一次付，每月发放']),
          ...packLow.map((r) => ['一次性流量包', <><BrandLink key={r.brand.id} id={r.brand.id}>{r.brand.name}</BrandLink> {r.name}</>, fmtYuan(r.price), `${r.totalGB}GB 总量`, fmtPerGB(r.perGB), r.note ?? '用完为止'])
        ]}
      />

      <H2 id="model">按“一年用几个月”算总支出</H2>
      <P>假设每次用的那个月流量不超过 {monthlyLow.totalGB}GB，三种方案一年的总支出：</P>
      <Table
        head={['一年用几个月', '按月买', `年付小包（${bestYearly.brand.name} ${bestYearly.name}）`, `一次性包（${bestPack.brand.name} ${bestPack.name}）`]}
        rows={monthsUsed.map((m) => [
          `${m} 个月`,
          fmtYuan(monthlyLow.price * m),
          fmtYuan(bestYearly.price),
          `${fmtYuan(bestPack.price)}${m * monthlyLow.totalGB > bestPack.totalGB ? '（流量不够，要再买）' : ''}`
        ])}
      />
      <P>
        按月买只在一年用 {Math.floor(bestYearly.price / monthlyLow.price)} 个月以内时，总价才低于年付小包，而且前提是你提前知道哪几个月要用。年付小包 {fmtYuan(bestYearly.price)}，一年共 {bestYearly.totalGB}GB（每月 {bestYearly.monthlyGB}GB）；最便宜的一次性包 {fmtYuan(bestPack.price)}，共 {bestPack.totalGB}GB。{bestYearly.price < bestPack.price ? `前者便宜 ${fmtYuan(bestPack.price - bestYearly.price)}，总量是后者的 ${(bestYearly.totalGB / bestPack.totalGB).toFixed(1)} 倍。` : ''}一次性包的价值不在价格，而在不清零：几年才用一次、完全不知道哪个月用的话，不用每年续费，但要先确认有效期。
      </P>

      <H2 id="validity">一次性流量包先看有效期</H2>
      <Ul
        items={[
          `价格表里有的包标注永久有效（如 FLY V 单次轻量版），有的标注购买后 365 天内有效（如环球云 ${getPriceFacts('huanqiuyun').packs[0].name}），有的注明以结算页为准。`,
          '标注“永久”的，也要在服务条款里确认账号长期不登录会不会被清理。',
          '流量包没有月度重置，所以也不存在“当月浪费”；它的浪费只发生在过期或账号失效时。'
        ]}
      />

      <H2 id="backup">当备用机场怎么维护</H2>
      <Ul
        items={[
          '备用的意义是主力失效时能立刻切换，所以订阅要提前导入客户端，每隔一两个月更新一次订阅、连一次确认可用。',
          '备用优先选年付小包或一次性包，不要用月付当备用，月付不续费就没了。',
          '预付金额控制在能接受损失的范围，服务商停止服务时未用完的流量不会退。'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '一年只用一个月，买什么最省？',
            a: `按上面的最低价：按月买 ${fmtYuan(monthlyLow.price)}，年付小包 ${fmtYuan(bestYearly.price)}，一次性包 ${fmtYuan(bestPack.price)}，其中${cheapestForOneMonth}最省。前提是用的那个月流量不超过月付档的 ${monthlyLow.totalGB}GB。`
          },
          {
            q: '一次性流量包会过期吗？',
            a: '要看各家的写法：有的写永久有效，有的写购买后 365 天内有效，也有的没写。付款前到结算页或服务条款确认，没写明的不要当作永久有效。'
          },
          {
            q: '年付小包每个月的额度用不完怎么办？',
            a: '不要指望结转。价格表只在少数备注里写明了“未用完不结转”，没写明的也按当月清零准备；偶尔用的话，额度够用就行，没必要选大档。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        以上按价格表的最低价计算，价格由站长核验于 2026-11-03，之后仍可能调整。流量包是否真的不按月清零、有效期多长，以各家服务条款为准。周期术语见 <GuideLink href="/guides/billing-and-traffic-rules/">付款与流量规则</GuideLink>。
      </Callout>
    </>
  );
}
