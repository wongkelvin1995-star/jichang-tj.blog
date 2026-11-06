import React from 'react';
import { H2, P, Ul, Table, Callout, GuideLink, Faq } from '@/components/guide/Prose';
import { Flow } from '@/components/guide/Media';
import { BRAND_TERMS_DATA } from '@/data/brandTermsData';
import { CONNECTION_STATS, ofTotal } from '@/data/connectionStats';

export default function WhatIsAnAirport() {
  const shared = BRAND_TERMS_DATA.filter((t) => t.devices && /共享|共用/.test(t.devices)).length;

  return (
    <>
      <P>
        “机场”是一类服务的俗称：服务商运营一批服务器（叫节点），你付费买到一定的流量和使用期限，再用客户端连上这些节点，把设备的网络流量经由节点转发出去。本文用一张流程图讲清节点、客户端、订阅和流量各自管什么，再说明买机场买到的是什么、它不能保证什么，适合还没买过、想先弄懂概念的读者。
      </P>
      <Flow
        steps={[
          { title: '你的设备', note: '浏览器或应用发出请求' },
          { title: '客户端', note: '按模式决定走不走代理' },
          { title: '入口节点', note: '服务商的服务器之一' },
          { title: '出口', note: '从服务商网络访问目标' },
          { title: '目标网站', note: '看到的是出口的地址' }
        ]}
        caption="一次访问经过的环节"
      />

      <H2 id="what-you-buy">你付费买到的是什么</H2>
      <P>
        买机场买到的是三样东西：一份可以连接的节点列表（服务器和线路），一份有期限的流量额度，以及使用它们的账号。节点由服务商运营，客户端是装在你设备上的软件，负责登录、选节点和转发流量。机场本身既不是网络运营商，也不是一个软件，它是把服务器、线路和客户端打包出售的服务，所以套餐里每一项写了什么，就是你买到什么。
      </P>

      <H2 id="parts">各个部分分别管什么</H2>
      <Table
        nowrapFirst
        head={['部分', '作用', '去哪看细节']}
        rows={[
          ['节点', '服务商的服务器入口，名字里通常带地区；节点多不等于每个都好用', '各品牌页的节点与线路资料'],
          ['流量额度', '每月或一次性能用的总量，用完之后怎么处理各家写法不同', <GuideLink key="traffic" href="/guides/billing-and-traffic-rules/">付款周期与流量规则</GuideLink>],
          ['客户端', '登录账号、选节点、转发流量的软件', <GuideLink key="clients" href="/guides/category/clients/">客户端教程</GuideLink>],
          [
            '订阅链接',
            `一条地址，通用客户端访问它就能取得节点列表。资料里 ${CONNECTION_STATS.subscriptionNotRecommended} 家写不推荐使用，${CONNECTION_STATS.subscriptionNotProvided} 家写不提供、已暂停或不对外发放`,
            <GuideLink key="sub" href="/guides/subscription-and-client/">订阅与客户端配置</GuideLink>
          ],
          ['账号和套餐', '记录付款周期、流量、设备数和到期时间，到期后失效', <GuideLink key="check" href="/guides/refund-and-purchase-checklist/">购买前核对清单</GuideLink>]
        ]}
      />
      <P>
        站长提供的机场资料里，{ofTotal(CONNECTION_STATS.officialClient)}的使用方式都是官方客户端、账号登录即可连接，所以对新手来说，先弄清“客户端”和“账号”这两样就够了。
      </P>

      <H2 id="vpn">它和普通 VPN 有什么区别</H2>
      <P>
        两者都是把你的流量经由远端服务器转发。“机场”这个说法多见于国内的使用习惯，通常按流量套餐出售，一个账号下有多个地区的节点可以切换；传统的 VPN 产品常按时长出售，用自己的客户端连接少数几台服务器。这个区别是习惯用法，没有严格定义，选购时看的还是具体套餐写了什么：流量多大、几台设备、哪些地区、怎么退款。
      </P>

      <H2 id="limits">机场不能保证什么</H2>
      <Ul
        items={[
          '速度：延迟和带宽取决于你的网络、所选节点、线路和当时的使用人数；资料里写了“专线”也不等于快，读法见 IPLC 和 IEPL 的区别。',
          '稳定：服务商可以调整节点、倍率和规则，也可能停止运营，所以长周期付款要先想清楚自己能不能承担损失。',
          '隐私：流量经过服务商的服务器，服务商处在你和目标网站之间。它能看到多少取决于协议和网站是否加密，不要默认它“看不到”，也不要在不信任的服务上输入敏感信息。',
          '合规：能否使用、用来做什么，要遵守你所在地的法律法规、学校和单位的网络规定，以及服务商的条款。'
        ]}
      />

      <H2 id="next">新手接下来做什么</H2>
      <P>
        想先把流程走一遍，看<GuideLink href="/guides/first-time-setup/">第一次用机场</GuideLink>；想看怎么比价，看<GuideLink href="/guides/how-to-choose/">机场怎么选</GuideLink>；遇到不认识的词，查<GuideLink href="/guides/airport-glossary/">机场常用名词表</GuideLink>。这三篇都不涉及品牌排名。
      </P>

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '买了机场就能直接上网吗？',
            a: '不能直接用。还要在设备上装服务商的客户端并登录，才能选节点连接。不同系统的官方客户端怎么找、怎么装，见各系统的客户端教程。'
          },
          {
            q: '一个机场的流量是所有设备共用的吗？',
            a: `设备数和流量是两回事：设备数限制同时在线的设备，流量是总量，设备再多也不会多给流量。资料里有 ${shared} 家明确写了所有设备共用同一份流量，其余以官网说明为准。`
          },
          {
            q: '第一次该买月付还是年付？',
            a: '先买月付，用满一个月、确认体验没问题，再考虑长周期。算法和理由见付款周期与流量规则。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        本文只解释概念，不推荐任何服务商，也不涉及测速和排名。套餐和价格以结算页为准，资料里的数字是品牌自己的标注，本站没有逐家验证。
      </Callout>
    </>
  );
}
