import React from 'react';
import { H2, P, Ul, Ol, Table, Callout, BrandLink, GuideLink, Faq } from '@/components/guide/Prose';
import { BRAND_TERMS_DATA } from '@/data/brandTermsData';
import { ALL_ROWS, DEVICE_RULES_SUMMARY } from '@/data/guideStats';
import { fmtYuan } from '@/data/format';
import { CYCLE_LABELS } from '@/data/priceFacts';

export default function MultiDevicePlans() {
  // 价格表备注里写了“限 N 台设备”的套餐（资料标注）
  const capped = ALL_ROWS.flatMap((r) => {
    const m = r.note?.match(/(?:最多|限)\s*(\d+)\s*台/);
    return m ? [{ row: r, max: Number(m[1]) }] : [];
  });
  const shared = BRAND_TERMS_DATA.filter((t) => t.devices && /共享|共用/.test(t.devices));

  return (
    <>
      <P>
        家里有几个人、每人几台设备，选机场时最容易问的是：设备数限制是什么意思？一个订阅能同时连几台？路由器算几台？本文先把几个容易混的概念分开，再看站内各家资料是怎么写的，最后给出付款前该向服务商问清的问题。
      </P>

      <H2 id="concepts">三个容易混的概念</H2>
      <Ul
        items={[
          '设备数上限：同时在线的设备（或连接）数量的上限。有的按设备算，有的按公网 IP 数算，两种算法下，同一个家庭能用的台数可以差很多。',
          '共享流量：多台设备共用同一份每月流量。设备再多也不会多给流量，所以家庭选套餐，看的是全家的总用量，不是设备数。',
          '共享账号或订阅链接：同一个账号登录在多台设备上，或把服务商给的订阅链接导入多台设备，都不等于“不限设备”，更不等于可以发给别人用，泄露出去容易被判定为滥用。'
        ]}
      />

      <H2 id="site-data">站内各家的资料是怎么写的</H2>
      <P>
        按站长提供的机场资料统计：{DEVICE_RULES_SUMMARY}；另有 {shared.length} 家明确写了所有设备共用同一份流量。这是品牌自己的标注，本站没有逐家测试，付款前仍要向服务商确认。
      </P>
      <P>
        价格表备注里写了设备数上限的套餐有 {capped.length} 个，列在下表，其余套餐的设备数以各品牌页的“品牌资料”为准：
      </P>
      <Table
        head={['品牌', '套餐', '设备数上限', '价格']}
        rows={capped.map(({ row, max }) => [
          <BrandLink key={`${row.brand.id}-${row.name}`} id={row.brand.id}>{row.brand.name}</BrandLink>,
          row.name,
          `${max} 台`,
          `${fmtYuan(row.price)}${row.cycle === 'o' ? '（一次性）' : `/${CYCLE_LABELS[row.cycle]}`}`
        ])}
      />
      <P>
        写了“所有设备共用同一份流量”的品牌有：
        {shared.map((t, i) => (
          <React.Fragment key={t.brand_id}>
            {i > 0 ? '、' : ''}
            <BrandLink id={t.brand_id}>{t.name}</BrandLink>
          </React.Fragment>
        ))}
        。
      </P>

      <H2 id="unlimited">“不限设备”也要问清楚</H2>
      <Ul
        items={[
          '按同时在线的连接数算，还是按公网 IP 数算？一个家庭路由器后面的所有设备，可能只算一个 IP，也可能每台都算。',
          '有没有“合理使用”之类的限制条款？不限设备不等于不限用途。',
          '多台设备同时下载或看视频，共享的流量会很快用完，设备数不限，流量是限的。'
        ]}
      />

      <H2 id="estimate">家庭场景怎么估用量</H2>
      <P>
        家庭选套餐，先估全家每月的总用量，再去找额度够用的档位，不要用“设备数 × 单台用量”去乘。举一个假设的例子（数字是假设，不是统计）：三口之家，一人常看高清视频，每月约 100GB，一人日常浏览约 40GB，一人偶尔使用约 15GB，合计约 155GB，就找每月额度略高于 155GB 的档位。把总用量和预算填进<GuideLink href="/tools/plan-finder/">套餐匹配器</GuideLink>，可以直接筛出符合的月付和年付档位。
      </P>

      <H2 id="router">路由器和软路由</H2>
      <P>
        在路由器或软路由上用机场，好处是全屋设备不用各装一个客户端；要注意四件事：路由器后面的设备在服务商那里算几台；全屋流量都会走共享额度，消耗比想象的快；订阅格式要被路由器固件或插件支持；国内网站要做好分流直连，否则会白白消耗额度，也更慢。路由器上排错比电脑难，第一次建议先在电脑上跑通，再迁到路由器。
      </P>

      <H2 id="ask">付款前向服务商问的五个问题</H2>
      <Ol
        items={[
          '设备数按同时在线的连接数算，还是按公网 IP 数算？',
          '一个路由器后面的多台设备，算一台还是多台？',
          '多台设备共用同一份流量吗？有没有按设备单独计量的情况？',
          '有没有同时在线数的硬限制，超过后是拒绝连接，还是被封号？',
          '账号或订阅链接被多人使用时，服务商怎么处理？'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '一个账号给全家用，会被封吗？',
            a: '取决于服务条款。资料写“不限同时在线设备数”的，不等于可以转租或公开分享；把账号或订阅链接发给不认识的人，容易被判定为滥用。拿不准就发工单问清楚，再付款。'
          },
          {
            q: '设备数上限是 3 台，家里有 4 台怎么办？',
            a: '先看上限怎么算：按同时在线数算的话，不同时开就行；按设备数算的话，就要换更高的档位或不限设备的套餐。以服务商的说明为准，不要靠反复登录登出去绕。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        设备数的写法是资料里的标注，没有逐家测试；套餐和价格以结算页为准。付款前的其他核对项，见<GuideLink href="/guides/refund-and-purchase-checklist/">购买前核对清单</GuideLink>。
      </Callout>
    </>
  );
}
