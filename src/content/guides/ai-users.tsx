import React from 'react';
import { H2, P, Ul, Ol, Callout, Table, BrandLink, GuideLink, Faq } from '@/components/guide/Prose';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { BRAND_COUNT, CHEAPEST_YEARLY, ENTRY_MONTHLY } from '@/data/guideStats';

/**
 * AI 工具用户怎么选机场。
 * 不写 AI 平台内部的风控机制（没有公开来源）；只给自测方法、价格表算出的候选档位，
 * 以及站长提供的灵动云 2026-11-01 检测记录里与 OpenAI 相关的部分（src/data/brandTests.ts）。
 */
export default function AiUsers() {
  const monthlyCandidates = ENTRY_MONTHLY.slice(0, 3);
  const yearlyCandidates = CHEAPEST_YEARLY.slice(0, 3);

  return (
    <>
      <P>
        能看视频，不等于能用 AI 网站。ChatGPT、Claude、Gemini 这类服务只在部分地区开放，登录时还可能要求额外验证；它们的判断规则不公开，也会调整，所以本文不替任何品牌回答“能不能用”，只讲付款前后怎么自己确认。本站没有测试过任何一家在这些网站上的可用性，唯一相关的第一手记录，是站长提供的一份灵动云 2026-11-01 的检测，下面会说明它能证明什么、不能证明什么。
      </P>

      <H2 id="region">第一关：出口地区要对</H2>
      <P>
        AI 网站看的是流量从哪个地区出来，而节点名称里的地区不一定等于出口地区。站长提供的灵动云检测里，OpenAI 一项 60 个节点全部显示“解锁”，但香港和台湾节点显示的落地地区都是 TW，新加坡、日本、美国节点则与标注一致（详见<GuideLink href="/airports/lingdongyun/#tests">灵动云品牌页的检测记录</GuideLink>）。这只是一次珠海联通网络下的检测，没有测登录和长对话，不能当作“稳定可用”的证明。所以别只看节点名，用检测工具或 IP 查询站确认落地地区。
      </P>

      <H2 id="ip-type">第二关：出口 IP 的类型和共用情况</H2>
      <Ul
        items={[
          <><strong>类型：</strong>出口 IP 是机房 IP 还是家庭宽带 IP，可以在 IP 查询站查到它归属的网络。AI 平台是否因此区别对待，没有公开数据，本站不下结论。</>,
          <><strong>共用：</strong>多人共用一个出口时，其他人的行为可能影响这个 IP 的信誉，这是共用出口的固有特点，不针对某一家。</>,
          <><strong>宣传标签：</strong>服务商标注的“住宅”“原生”等字样，本站没有验证过任何一家，以你自己的查询结果为准。</>
        ]}
      />

      <H2 id="stability-and-connection">第三关：长回答不能中途断开</H2>
      <P>
        AI 网站的回答是边生成边传回来的，一次长回答可能持续几十秒甚至更久。连接中途断开，页面会出现 Network Error 之类的提示。可能的原因有节点不稳定、客户端中途切换了节点，也可能是网站自身的错误，需要逐项排除，不能直接归咎于机场。
      </P>

      <H2 id="ip-drift-hazards">第四关：固定出口，别让它自动换节点</H2>
      <P>
        客户端的“自动选择”会按延迟切换节点，出口地区可能中途改变。出口一变，网站可能要求重新验证。对 AI 域名单独建一个策略组、固定在一个节点上，可以减少这类变化，也方便排查问题；这是常见的做法，本站没有测试它对具体平台的影响。DNS 也要让域名解析走代理，免得本地解析结果和出口地区对不上，设置方法见<GuideLink href="/guides/subscription-and-client/">订阅与客户端怎么配</GuideLink>。
      </P>

      <H2 id="traffic-and-price">AI 用户要买多大的套餐</H2>
      <P>
        文字对话传输的数据量小，上传文件、图片和语音时才明显增加，具体用量以你的客户端流量统计为准，先用一个月看账单。下面是价格表里实付最低的几档，仅按价格排序，与 AI 可用性无关：
      </P>
      <Table
        head={['类型', '品牌', '套餐', '实付', '每月额度', '每 GB']}
        rows={[
          ...monthlyCandidates.map((r) => ['入门月付', <BrandLink key={`m-${r.brand.id}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.totalGB}GB`, fmtPerGB(r.perGB)]),
          ...yearlyCandidates.map((r) => ['最低年付', <BrandLink key={`y-${r.brand.id}`} id={r.brand.id}>{r.brand.name}</BrandLink>, r.name, fmtYuan(r.price), `${r.monthlyGB}GB`, fmtPerGB(r.perGB)])
        ]}
      />
      <P>
        用量更大时，用<GuideLink href="/tools/plan-finder/">套餐匹配器</GuideLink>按每月用量和预算筛选，价格表共 {BRAND_COUNT} 家。第一次一定先买月付，通过下面的自测再考虑长周期。
      </P>

      <H2 id="verification-workflow">十分钟自测</H2>
      <Table
        head={['步骤', '怎么做', '记什么']}
        rows={[
          ['1 出口', '打开 IP 查询站', '出口 IP 的国家和所属网络'],
          ['2 登录', '用新开的浏览器窗口登录你要用的 AI 网站', '是否要求额外验证、出现几次'],
          ['3 长回答', '让它生成一段约一千字的文字，连续做三次', '每次是否完整，有没有 Network Error'],
          ['4 换节点', '换一个同地区节点重复第 2、3 步', '两个节点的结果差别'],
          ['5 固定出口', '为 AI 域名建独立策略组，固定一个节点再测一遍', '不稳定的情况是否减少']
        ]}
      />
      <P>
        把结果写下来，包括时间和网络环境。三次长回答都完整、登录没有反复验证，才考虑买长周期；任何一步反复出问题，就在月付期内换一家。
      </P>

      <H2 id="before-and-after-payment">付款前后各做一件事</H2>
      <Ol
        items={[
          '付款前，先在服务条款里看有没有限制用途的内容，以及退款或试用的期限。',
          '付款后，在可退款或可更换的期限内完成上面的自测；期限没有写明的，只买月付。',
          '账号安全不由机场负责：不要把 AI 账号的密码保存在公共设备上，并遵守相关平台的用户协议。'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '为什么能看视频，却打不开 AI 网站？',
            a: '能看视频只说明流量通了，不说明出口地区被 AI 网站接受。AI 服务只在部分地区开放，出口地区不在其中，或节点名称与实际出口不一致，都会打不开。具体原因没有公开资料，本站不下结论，按上面的四关逐项排查。'
          },
          {
            q: 'AI 对话每个月大概用多少流量？',
            a: '文字对话传输的数据量小，上传文件、图片和语音才会明显增加，没有可靠的通用数字。先买一个月月付，用客户端的流量统计看实际用量，再决定要不要换大一点的档位或长周期。'
          },
          {
            q: '要不要专门买“住宅 IP”套餐？',
            a: '本站没有验证过任何一家服务商的“住宅”标注，也没有数据证明它能减少验证。更稳妥的做法是先用十分钟自测评估现有节点，自测通不过再换，不为标签多付钱。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        AI 平台的地区政策和验证规则随时变化，没有任何服务商能为第三方平台的账号提供担保。本文只提供核对方法，读者需自行保管账号，并遵守相关平台的用户协议。
      </Callout>
    </>
  );
}
