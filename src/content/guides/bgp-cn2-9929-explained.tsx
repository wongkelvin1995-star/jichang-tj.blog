import React from 'react';
import { H2, P, Ol, Table, Callout, BrandLink, GuideLink, Faq } from '@/components/guide/Prose';
import { Flow } from '@/components/guide/Media';
import { BRANDS } from '@/data/brands';

export default function BgpCn2Explained() {
  const lineOf = (re: RegExp) => BRANDS.filter((b) => re.test(b.protocol_architecture ?? ''));
  const bgp = lineOf(/BGP/i);
  const cn2 = lineOf(/CN2/i).length;
  const n9929 = lineOf(/9929/).length;
  const iplc = lineOf(/IPLC/i).length;
  const iepl = lineOf(/IEPL/i).length;
  const perPlan = lineOf(/套餐|轻量版|年付|独享/).length;

  return (
    <>
      <P>
        机场宣传页上的线路词，其实来自三个不同的层面：BGP 是路由协议的名字，CN2 GIA 和 9929 是运营商网络或线路产品的叫法，IPLC 和 IEPL 是专线产品的类型。它们描述的不是同一件事，更不是速度保证。本文逐个解释含义，说明每个词能说明什么、不能说明什么，再看站内资料里这些词出现的情况。需要提醒的是，这类术语的公开解释大多来自运营商和主机商的销售页面，各家对同一个词的说法并不完全一致，本文只当作提问的起点。
      </P>
      <Flow
        steps={[
          { title: '你的宽带', note: '电信、联通或移动' },
          { title: '到入口的一段', note: '入口在国内还是境外，决定这段怎么走' },
          { title: '入口节点', note: '服务商的服务器' },
          { title: '入口到出口的一段', note: '专线或普通国际链路' },
          { title: '出口和目标网站', note: '目标网站看到的是出口地址' }
        ]}
        caption="线路宣传词描述的往往只是其中一段"
      />

      <H2 id="terms">这几个词分别是什么</H2>
      <Table
        nowrapFirst
        head={['词', '是什么', '能说明什么', '不能说明什么']}
        rows={[
          ['BGP', '互联网上各个网络之间交换路由信息、选择路径的协议。宣传里的“BGP 线路”“BGP 多线”，一般指机房同时接入多家运营商并用 BGP 选路', '到不同运营商用户的路径可以选择', '每条路径的质量；它也不等于专线'],
          ['CN2 GIA', '中国电信 CN2 网络（AS4809）里被宣传为较高等级的一档线路产品', '线路是电信方向的较高等级产品', '联通和移动用户的体验；高峰时段是否拥堵'],
          ['CN2 GT', 'CN2 里较低的一档，各家对它的具体路径描述不一致', '比普通线路多接入了一部分 CN2', '和 GIA 的差别到底有多大，要看具体供应商'],
          ['9929', '中国联通的一个网络编号（AS9929），注册名称里带“工业互联网骨干网”字样，宣传里常被称作联通的优质线路', '线路是联通方向的相关产品', '它和联通其他骨干网并非完全隔离，公开资料对它是否一贯更好说法不一'],
          ['IPLC、IEPL', '国际专线产品，区别见另一篇', '两点之间用专用线路', <>是否更快，见<GuideLink key="l" href="/guides/iplc-vs-iepl/">IPLC 和 IEPL 的区别</GuideLink></>]
        ]}
      />

      <H2 id="site">站内资料里这些词出现的情况</H2>
      <P>
        站长提供的机场资料里，{BRANDS.length} 家的线路标注中，写了 IPLC 的有 {iplc} 家，写了 IEPL 的有 {iepl} 家，写了 BGP 的有 {bgp.length} 家；写 CN2 的有 {cn2} 家，写 9929 的有 {n9929} 家。也就是说，站内这些品牌的资料里没有一家用 CN2 或 9929 描述线路，这两个词如果出现在别处的宣传里，要按下面的问题单独核对。BGP 在资料里通常和专线并列，写成“智能调度”“智能优化”之类的说法，例如：
      </P>
      <Table
        nowrapFirst
        head={['品牌', '资料里的线路标注']}
        rows={bgp.slice(0, 5).map((b) => [<BrandLink key={b.id} id={b.id}>{b.name}</BrandLink>, b.protocol_architecture])}
      />
      <P>
        另外有 {perPlan} 家的资料把不同套餐写成不同线路，例如月付套餐和年付套餐、标准版和轻量版、独享专线。所以同一家品牌，不同套餐买到的线路可能不一样，付款前要问清自己买的那一档。这些都是品牌自己的标注，本站没有测试过任何线路。
      </P>

      <H2 id="ask">读线路宣传时，要追问的五件事</H2>
      <Ol
        items={[
          '这个词描述的是哪一段：入口之前、入口到出口，还是机房接入运营商的方式？',
          '入口在国内还是境外，出口在哪里，节点名里的地区指的是哪一个。',
          '电信、联通、移动三家的用户走的是不是同一条路，宣传的是哪个方向。',
          '高峰时段有没有拥堵或限速的说明，有没有带测试时间和工具的记录。',
          '买的这个套餐对应的是不是宣传里写的那条线路。'
        ]}
      />

      <H2 id="decide">这些词怎么影响选择</H2>
      <P>
        不要用线路词直接做决定。更稳妥的做法是：先按<GuideLink href="/guides/how-to-choose/">机场怎么选</GuideLink>的顺序比价格、设备数和退款，第一次只买月付，用满一个月，在自己的网络里按固定方法测一测，再决定要不要换长周期。测试方法见<GuideLink href="/guides/speed-lab-method/">测速实验室方法</GuideLink>。
      </P>

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: 'CN2 GIA 一定比 BGP 好吗？',
            a: '两个词不在同一个层面：CN2 GIA 是运营商的线路产品等级，BGP 是选路协议，一条线路可以同时用到两者。比较之前，先弄清各自描述的是哪一段、哪家运营商的方向。'
          },
          {
            q: '写了 9929 就适合联通用户吗？',
            a: '宣传 9929 的服务商，想表达的多半是联通方向的线路等级。实际体验仍取决于入口位置、所选节点和使用时段，只凭一个编号不能下结论。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        本文只解释术语，不对任何服务商的线路质量下结论。运营商的产品命名和定义可能调整，以运营商和服务商的官方说明为准；站内线路标注是品牌自己的写法，本站没有测试过任何线路。
      </Callout>
    </>
  );
}
