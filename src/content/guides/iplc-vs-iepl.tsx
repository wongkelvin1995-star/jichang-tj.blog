import React from 'react';
import { H2, P, Ul, Ol, Table, Callout, BrandLink, GuideLink, Faq } from '@/components/guide/Prose';
import { BRANDS } from '@/data/brands';
import { getBrandMd } from '@/data/brandMd';

const hasLine = (line: string | null | undefined, re: RegExp) => Boolean(line && re.test(line));

function BrandNames({ ids }: { ids: string[] }) {
  return (
    <>
      {ids.map((id, i) => {
        const brand = BRANDS.find((b) => b.id === id)!;
        return (
          <React.Fragment key={id}>
            {i > 0 && '、'}
            <BrandLink id={id}>{brand.name}</BrandLink>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function IplcVsIepl() {
  const ids = (pred: (line: string | null | undefined) => boolean) => BRANDS.filter((b) => pred(b.protocol_architecture)).map((b) => b.id);
  const onlyIplc = ids((l) => hasLine(l, /IPLC/i) && !hasLine(l, /IEPL/i));
  const onlyIepl = ids((l) => hasLine(l, /IEPL/i) && !hasLine(l, /IPLC/i));
  const both = ids((l) => hasLine(l, /IPLC/i) && hasLine(l, /IEPL/i));
  const neither = ids((l) => !hasLine(l, /IPLC|IEPL/i));
  const flyvRegions = getBrandMd('flyv').nodes.per_region_line.map((l) => l.replace(/\s*x\s*\d+\s*节点/i, '')).join('；');

  return (
    <>
      <P>
        机场的宣传页常把“IPLC”“IEPL”当作卖点，写在节点名或套餐介绍里。这两个词到底是什么意思，写了它们能说明什么，又有哪些事它们根本说明不了？本文先讲定义，再讲读宣传时该追问什么。文中站内各家的线路写法，都只是资料里的标注，本站没有测试过任何线路。
      </P>

      <H2 id="private-line">什么是专线</H2>
      <P>
        普通上网的国际流量，要经过运营商的国际出入口，路径由网络按公网规则选择，高峰时段容易拥塞。专线是运营商提供的点对点电路：两端固定，中间路径相对固定，带宽按合同划分。机场宣传里说的“专线”，通常指机场的入口节点和境外落地节点之间租用了这样的电路，而不是你到落地节点的整条路径都是专线。
      </P>

      <H2 id="difference">IPLC 和 IEPL 的区别</H2>
      <P>
        IPLC（International Private Leased Circuit，国际专线电路）传统上按电路出租，多以时分复用（TDM）的方式承载；IEPL（International Ethernet Private Line，国际以太网专线）是以太网形式的点对点专线，接口和带宽划分更灵活。两者都是点对点的专线，对机场用户来说，实际差别取决于运营商的具体产品、带宽划分和路由，很难从名字上判断谁更好。
      </P>
      <P>
        以上定义参考运营商和代理商的公开产品介绍（查阅于 2026-11-06），这些资料多为销售页面，只用来解释术语；具体带宽、价格和路由，以供应商给出的合同和说明为准。
      </P>

      <H2 id="site-labels">站内 {BRANDS.length} 家的线路是怎么写的</H2>
      <P>
        下表按资料里的线路标注归类，只是品牌自己的写法，不是测试结果，也不代表哪一类更好。
      </P>
      <Table
        nowrapFirst
        head={['资料里的写法', '家数', '品牌']}
        rows={[
          ['只写 IPLC', `${onlyIplc.length} 家`, <BrandNames key="a" ids={onlyIplc} />],
          ['只写 IEPL', `${onlyIepl.length} 家`, <BrandNames key="b" ids={onlyIepl} />],
          ['两者都写', `${both.length} 家`, <BrandNames key="c" ids={both} />],
          ['两者都没写', `${neither.length} 家`, <BrandNames key="d" ids={neither} />]
        ]}
      />
      <P>
        同一家的写法也可能按地区、按套餐不同。例如 <BrandLink id="flyv">飞V</BrandLink> 的资料是按地区分写的：{flyvRegions}。所以看到“专线”两个字，先问是哪个地区、哪个套餐。
      </P>

      <H2 id="not-proof">写了“专线”不能说明什么</H2>
      <Ul
        items={[
          '不能说明全程专线：你到入口节点那一段，走的仍是你自己的宽带和公网。',
          '不能说明速度：带宽多大、有没有和别的用户共享、落地机房的出口质量，都不由“专线”两个字决定。',
          '不能说明稳定：线路拥塞、设备故障、被限速都可能发生，宣传页不会写这些。',
          '不能说明价格合理：专线成本高，但套餐怎么定价是商业决定。'
        ]}
      />

      <H2 id="ask">读线路宣传时要追问的五件事</H2>
      <Ol
        items={[
          '哪一段是专线：入口到落地的整段，还是只有部分地区？',
          '入口在哪个城市，落地机房在哪个地区？',
          '带宽是独享还是共享，有没有限速，有没有限制并发连接？',
          '所有地区、所有套餐都一样吗？',
          '出问题时，服务商能不能给出链路或路由方面的说明？'
        ]}
      />

      <H2 id="how-we-treat">站内怎么处理线路标注</H2>
      <P>
        品牌页的“线路资料”照站长提供的机场资料写，是品牌自己的标注。本站没有测试过任何线路，要判断实际表现，只能自己在常用时段测一测：怎么记录、怎么读，见<GuideLink href="/speed-lab/">测速实验室</GuideLink>和<GuideLink href="/guides/reading-speed-tests/">机场测速报告怎么看</GuideLink>。
      </P>

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: 'IEPL 一定比 IPLC 好吗？',
            a: '不一定。两者都是点对点专线，差别主要在承载方式和接口，实际表现取决于运营商的具体产品、带宽划分和路由，没法从名字判断。'
          },
          {
            q: '标了专线，为什么还会慢？',
            a: '专线只覆盖入口到落地的一段。你到入口的那一段、入口节点的负载、落地机房的出口、目标网站本身，都会影响速度。'
          },
          {
            q: '资料里没写专线的机场就不行吗？',
            a: '不能这么说。没写只说明资料没写，不说明线路不好；比较的办法是自己在常用时段测，再对照记录。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        本文解释术语，不对任何品牌的线路质量下结论。站内的线路标注是资料里的写法，价格和资料的口径见各品牌页的“资料与披露”。
      </Callout>
    </>
  );
}
