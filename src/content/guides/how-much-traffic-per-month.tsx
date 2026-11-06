import React from 'react';
import { H2, P, Ol, Table, Formula, Callout, BrandLink, GuideLink, Faq } from '@/components/guide/Prose';
import { Flow } from '@/components/guide/Media';
import { cheapestMonthlyCovering, ENTRY_MONTHLY, median, MULTIPLIER_RULES_SUMMARY } from '@/data/guideStats';
import { fmtYuan } from '@/data/format';

// 参考值的出处（查阅于 2026-11-06）：
// Netflix 帮助中心《How to control how much data Netflix uses》：每台设备每小时，低画质最多 0.3 GB，中画质最多 0.7 GB，高画质里标清最多 1 GB、高清最多 3 GB、4K 最多 7 GB；
// HTTP Archive《Web Almanac 2024》页面体积一章：2024 年 10 月测得的全球网页体积中位数，桌面 2,652 KB，手机 2,311 KB。
const HD_GB_PER_HOUR_MAX = 3;
const PAGE_MB = 2.311;

export default function HowMuchTrafficPerMonth() {
  // 算例：下面三个数是假设，不是统计
  const videoHoursPerDay = 1;
  const pagesPerDay = 200;
  const downloadGB = 20;
  const video = videoHoursPerDay * HD_GB_PER_HOUR_MAX * 30;
  const web = Math.round((pagesPerDay * PAGE_MB * 30) / 1000);
  const base = video + web + downloadGB;
  const withMargin = Math.ceil(base * 1.25);

  const entryGB = ENTRY_MONTHLY.map((r) => r.monthlyGB).filter((v): v is number => v !== null);
  const levels = [50, 100, 200, 400].flatMap((gb) => {
    const pick = cheapestMonthlyCovering(gb, 1)[0];
    return pick ? [{ gb, pick }] : [];
  });
  const target = cheapestMonthlyCovering(withMargin, 1)[0];

  return (
    <>
      <P>
        买流量最怕两种错：买少了，月中就用完；买多了，每月白付。估算不需要精确，只要把用量拆成几类，各算一个数量级，再留一点余量。本文给出一个估算公式，列出可以引用的官方参考值（写明出处和查阅日期），再用站内价格表看看哪些月付档够用。所有算例里的使用习惯都是假设，请换成你自己的。
      </P>
      <Flow
        steps={[
          { title: '先查现在的实际用量', note: '后台、客户端、系统统计' },
          { title: '把用量拆成几类', note: '网页、视频、下载、其他' },
          { title: '每类估一个数', note: '用公式和参考值' },
          { title: '加一点余量', note: '例如再加四分之一' },
          { title: '对照套餐额度', note: '看倍率和重置规则' },
          { title: '买月付，用一个月后校准', note: '以后台的实际用量为准' }
        ]}
        caption="从估算到买套餐的六步"
      />

      <H2 id="actual">最准的办法：先看自己的实际用量</H2>
      <P>
        已经在用代理的，先看实际数字，比任何估算都准。服务商后台显示的已用流量最接近套餐会扣的数，因为它已经算进了倍率；客户端一般也有流量统计；手机和电脑的系统设置里能看到每个应用用了多少网络流量，入口因系统而异，多在“网络”或“蜂窝网络”的“数据使用情况”里。取一个完整月的数，如果这个月有出差、旅行等不寻常的情况，要单独标注。
      </P>

      <H2 id="formula">估算公式</H2>
      <Formula>每月流量 ≈ （网页 + 视频 + 下载 + 其他）× 倍率</Formula>
      <Formula>视频 = 每天看几小时 × 每小时流量 × 天数</Formula>
      <P>
        倍率指某类节点实际扣除的流量是真实用量的几倍，站内资料里的写法是：{MULTIPLIER_RULES_SUMMARY}。如果不确定，先按 1 倍估，付款前问清。顺便记一个换算：视频的码率是 1 Mbps，持续看 1 小时，约用 0.45 GB（1 × 3600 秒 ÷ 8 ÷ 1000）。
      </P>

      <H2 id="reference">可以引用的参考值</H2>
      <Table
        nowrapFirst
        head={['活动', '参考值', '出处和说明']}
        rows={[
          ['浏览网页', `全球网页体积的中位数：桌面 2,652 KB、手机 2,311 KB，约 2.3 到 2.7 MB 一页`, 'HTTP Archive《Web Almanac 2024》页面体积一章，2024 年 10 月数据，查阅于 2026-11-06。这是全球网页的中位数，不是你常访问的网站；有缓存时实际会更少'],
          ['看视频', '每台设备每小时：低画质最多约 0.3 GB，中画质最多约 0.7 GB，高画质下标清最多约 1 GB、高清最多约 3 GB、4K 最多约 7 GB', 'Netflix 帮助中心《How to control how much data Netflix uses》，查阅于 2026-11-06。这是一个服务的官方上限，其他服务不一定相同'],
          ['下载', '下载多大的文件，就用多少流量，实际略多一点', '没有通用的参考值，按文件大小算'],
          ['AI 文字对话', '以文字为主，数据量比视频小得多', '没有公开的统一数字；上传图片或文件会明显增加。想知道自己的用量，用浏览器开发者工具的“网络”面板看一次对话的传输量']
        ]}
      />

      <H2 id="example">算一个例子（数字是假设）</H2>
      <P>
        假设一个人每天看 {videoHoursPerDay} 小时高清视频，每天浏览 {pagesPerDay} 个网页，每月下载 {downloadGB} GB 的文件。视频按官方的高清上限 {HD_GB_PER_HOUR_MAX} GB 每小时算，一个月是 {video} GB；网页按手机页面的中位数 {PAGE_MB} MB 算，{pagesPerDay} 页 × 30 天约 {web} GB；下载 {downloadGB} GB。合计约 {base} GB，这是按上限算的数，实际一般会低一些。再加四分之一的余量，大约需要每月 {withMargin} GB。
      </P>

      <H2 id="plans">对照站内价格表</H2>
      <P>
        站长提供的机场资料里，34 家入门月付档的每月额度，最少 {Math.min(...entryGB)} GB，最多 {Math.max(...entryGB)} GB，中位数 {median(entryGB)} GB。{target ? (
          <>
            按上面的算例，每月额度不低于 {withMargin} GB 的月付档里，价格表中实付最低的是<BrandLink id={target.brand.id}>{target.brand.name}</BrandLink>的「{target.name}」，{fmtYuan(target.price)}、每月 {target.monthlyGB} GB。
          </>
        ) : (
          <>按上面的算例，价格表里没有每月额度达到 {withMargin} GB 的月付档，需要考虑拆分用途或换成长周期的大额度套餐。</>
        )}
        这是按价格表现算的结果，不是推荐，选套餐还要看设备数、倍率、重置规则和退款。想换一个用量，用<GuideLink href="/tools/plan-finder/">套餐匹配器</GuideLink>直接筛。
      </P>
      <Table
        nowrapFirst
        head={['每月至少要', '价格表里实付最低的月付档', '实付', '每月额度', '备注']}
        rows={levels.map(({ gb, pick }) => [
          `${gb} GB`,
          <><BrandLink key={`${gb}-${pick.brand.id}`} id={pick.brand.id}>{pick.brand.name}</BrandLink>「{pick.name}」</>,
          fmtYuan(pick.price),
          `${pick.monthlyGB} GB`,
          pick.note || '—'
        ])}
      />
      <P>
        备注列照价格表原样写，标了限时或活动价的档位，买之前先确认活动是否还在。
      </P>

      <H2 id="calibrate">买月付，用一个月后校准</H2>
      <Ol
        items={[
          '第一次只买月付，额度按估算值买，不要一上来买长周期。',
          '用满一个月，到后台记下已用流量和重置日。',
          '和估算比：差得多，就调整每类活动的估值；差得不多，再考虑要不要换更长的周期。',
          '看流量是否每月重置、没用完是否结转，这两条决定了“多买一点”是不是浪费，见付款周期与流量规则那一篇。'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '手机和电脑的流量是分开算的吗？',
            a: '看服务商的写法。设备数限制的是同时在线的台数，流量通常是账号下所有设备共用的一份，估算时把所有设备的用量加起来。'
          },
          {
            q: '估算出来的数字，和后台显示的对不上，为什么？',
            a: '后台显示的是扣除后的数，已经包含倍率；估算值是真实用量。倍率不是 1 的节点，后台数字会比实际用量大。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        本文的参考值来自 Netflix 和 HTTP Archive 的公开页面，只用于估算数量级；算例里的使用习惯是假设，不代表任何人的真实用量。套餐、倍率和价格以结算页为准，价格表里的数字是站长核验日的数据。
      </Callout>
    </>
  );
}
