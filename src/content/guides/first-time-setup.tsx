import React from 'react';
import { H2, P, Ol, Callout, GuideLink, BrandLink, Faq } from '@/components/guide/Prose';
import { Flow, PendingShot } from '@/components/guide/Media';
import { CONNECTION_STATS, CONNECTION_SUMMARY } from '@/data/connectionStats';

export default function FirstTimeSetup() {
  return (
    <>
      <P>
        第一次用机场，卡住的往往不是操作，而是顺序：从不明来源装了客户端，或者以为要导入订阅链接，其实服务商只支持自己的官方客户端；连上之后只测一个网站，就以为一切正常。下面把从付款到连上拆成八步，每一步都有一个自己能确认的检查点，哪一步没过，就停在哪一步处理，不要往后走。如果连“机场是什么”都还没弄清，先看<GuideLink href="/guides/what-is-an-airport/">机场是什么</GuideLink>。
      </P>
      <Flow
        steps={[
          { title: '选月付', note: '先花一个月的钱试用' },
          { title: '记下订单信息', note: '订单号、套餐、到期日' },
          { title: '确认连接方式', note: '官方客户端还是订阅链接' },
          { title: '从官网下载客户端', note: '不走网盘和群聊' },
          { title: '安装并用账号登录', note: '看到节点列表' },
          { title: '选节点并连接', note: '客户端显示已连接' },
          { title: '测两个网站', note: '一个国内、一个境外' },
          { title: '记下起点', note: '用量和遇到的问题' }
        ]}
        caption="从购买到连上的八步顺序"
      />

      <H2 id="step-1">第一步：只买月付</H2>
      <P>
        第一次接触一家服务商，只买月付。年付折扣大，但钱要一次付清，服务商出问题时收不回来；月付最坏的结果，是浪费一个月的钱。挑哪个月付档、每 GB 单价怎么比，见<GuideLink href="/guides/how-to-choose/">机场怎么选</GuideLink>和<GuideLink href="/tools/plan-finder/">套餐匹配器</GuideLink>。
      </P>

      <H2 id="step-2">第二步：记下订单信息</H2>
      <P>
        付款后到服务商的用户后台，记下套餐名称、到期日期和每月流量额度，再把订单号和付款截图存一份。以后对账、申诉、判断流量扣得对不对，都要靠这几样。
      </P>

      <H2 id="step-3">第三步：确认连接方式</H2>
      <P>
        {CONNECTION_SUMMARY}。也就是说，多数情况下你要用的是服务商的官方客户端和你的账号，而不是订阅链接。先到服务商官网或后台，确认它提供你这个系统的客户端（资料里写了支持系统的，各家不同）。如果你的服务商确实提供订阅链接，导入的原理见<GuideLink href="/guides/subscription-and-client/">机场订阅与客户端配置</GuideLink>。
      </P>

      <H2 id="step-4">第四步：只从官网下载客户端</H2>
      <P>
        下载只走服务商官网或后台指向的地址，不要从网盘、群聊或搜索结果里的第三方站点拿安装包。资料里写得很明确：网上出售的“订阅链接”和网盘分发的客户端，都不是官方渠道。各平台的下载和安装，分别见<GuideLink href="/guides/windows-client-guide/">Windows</GuideLink>、<GuideLink href="/guides/macos-client-guide/">Mac</GuideLink>、<GuideLink href="/guides/android-client-guide/">安卓</GuideLink>和<GuideLink href="/guides/ios-client-guide/">iPhone 与 iPad</GuideLink>的教程。
      </P>

      <H2 id="step-5">第五步：安装并用账号登录</H2>
      <P>
        安装后用注册时的账号登录。检查点：登录成功，节点列表里出现了节点。登录不了，先确认账号密码和网络，再到后台看套餐有没有到期；账号密码不要借给别人，也不要在不明来源的页面里输入。
      </P>
      <PendingShot what="官方客户端登录界面和节点列表的截图" />

      <H2 id="step-6">第六步：选节点并连接</H2>
      <P>
        选一个节点连接。官方客户端通常一键连接，有的还把分流规则内置好了，例如<BrandLink id="flyv">飞V</BrandLink>的资料写的就是“分流规则已内置”；有没有系统代理、TUN 等选项，以客户端为准。检查点：客户端显示已连接。第一次选哪个节点不重要，先挑延迟低的用着，之后再慢慢比。
      </P>

      <H2 id="step-7">第七步：用两个网站验证</H2>
      <P>
        各打开一个国内网站和一个境外网站。境外网站能打开，说明代理通了；国内网站仍和平时一样快，说明分流在正常工作。国内网站变慢，先看是不是开了全局模式，再看规则和 DNS（区别见<GuideLink href="/guides/global-rule-direct-mode/">全局、规则、直连三种模式</GuideLink>），多半不是节点坏了；全部打不开，按<GuideLink href="/guides/all-nodes-timeout/">节点全部超时的排查顺序</GuideLink>处理。
      </P>

      <H2 id="step-8">第八步：记下起点，再决定要不要换长周期</H2>
      <P>
        第一周留意三件事：每天大概用了多少流量、哪些时段慢、哪些网站打不开。用满一个月，再决定要不要换长周期或换服务商。月用量没把握，可以先用<GuideLink href="/tools/plan-finder/">套餐匹配器</GuideLink>估一估。
      </P>

      <H2 id="mistakes">最容易出错的五件事</H2>
      <Ol
        items={[
          '从网盘、群聊或论坛下载客户端，或者购买别人转卖的所谓“订阅链接”。',
          '把账号密码借给别人，或者在不明来源的页面里输入。',
          '同时开着其他代理软件、加速器或安全软件，它们会互相抢系统代理的设置。',
          '只测一个网站，就以为一切正常。',
          '第一次就买年付，用了几天才发现不适合。'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '客户端要一直开着吗？',
            a: '要。客户端就是把你的流量转交给节点的那一段，关掉它，流量就回到直连。退出客户端后，如果系统里还留着代理设置，所有网站都可能打不开，记得确认已经关闭。'
          },
          {
            q: '我想用自己熟悉的客户端，行不行？',
            a: `资料里有 ${CONNECTION_STATS.thirdPartyNotRecommended} 家写不推荐、${CONNECTION_STATS.thirdPartyUnsupported} 家写不支持导入 Clash、小火箭等第三方客户端，给出的理由是避免订阅外泄、保护节点安全。是否可行以服务商的说明为准，不建议自己想办法绕开官方客户端。`
          }
        ]}
      />

      <Callout title="连上只说明代理通了" tone="warn">
        连上不代表速度和稳定性合格，本站也没有测速数据。用月付试用一个月，是最便宜的验证办法。
      </Callout>
    </>
  );
}
