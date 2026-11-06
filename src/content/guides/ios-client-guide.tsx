import React from 'react';
import { H2, P, Ol, Callout, GuideLink, Faq } from '@/components/guide/Prose';
import { Flow, PendingShot } from '@/components/guide/Media';
import { CONNECTION_STATS, PLATFORM_DETAILS } from '@/data/connectionStats';

export default function IosClientGuide() {
  return (
    <>
      <P>
        iOS 和其他系统的差别在安装渠道：软件只能通过 Apple 允许的方式获取，所以“客户端从哪里来、用哪个账号下载”比操作本身更容易出问题。本文先看服务商资料里 iOS 一栏的写法，再说明 Apple 账号要注意什么、第一次连接要授权什么，最后给出连上之后断线、没网的排查顺序。iPhone 和 iPad 的思路相同，下文统称 iPhone。
      </P>
      <Flow
        steps={[
          { title: '看服务商的 iOS 写法', note: '有没有客户端、怎么装' },
          { title: '确认 Apple 账号归你自己', note: '不用别人的共享账号' },
          { title: '按服务商说明获取客户端', note: '只信官网的指引' },
          { title: '登录账号', note: '官方客户端' },
          { title: '允许添加 VPN 配置', note: '需要锁屏密码或面容 ID' },
          { title: '连接并验证', note: '顶部出现 VPN 标识' },
          { title: '出问题一次只改一项', note: '网络、时间、冲突、重新登录' }
        ]}
        caption="iPhone 上从获取客户端到连上的七步"
      />

      <H2 id="data">先看服务商资料里 iOS 一栏怎么写</H2>
      <P>
        站长提供的机场资料里，{CONNECTION_STATS.ios} 家写了支持 iOS（共 {CONNECTION_STATS.total} 家，另有 {CONNECTION_STATS.platformUnspecified} 家没写支持哪些系统）。写法并不统一：有 {PLATFORM_DETAILS.iosViaNextin} 家写的是“iOS 通过 Nextin”（或“通过 Nextin 登录”），资料没有进一步说明，具体怎么安装、怎么登录，以这些服务商官网的说明为准；另有 {PLATFORM_DETAILS.iosMinVersion} 家写了最低系统要求，分别是 iOS 12.0 及以上或 iOS 15 及以上。这些是品牌自己的标注，本站没有逐个验证。付款前先在官网确认三件事：有没有 iOS 客户端，安装方式是什么，你的 iOS 版本够不够。
      </P>

      <H2 id="account">Apple 账号：用自己的，别在 iCloud 里登别人的</H2>
      <P>
        客户端通过 App Store 或服务商指定的方式安装，能不能下载，取决于这个应用在你的账号所在地区有没有上架。如果服务商的说明要求用某个地区的 App Store，那是 Apple 账号里的“国家或地区”设置，改这个设置之前，Apple 要求先取消订阅、用完账户余额并更新付款方式，具体条件以 Apple 官方说明为准。
      </P>
      <P>
        有两点要注意。第一，用你自己的 Apple 账号，不要用别人出售或提供的共享账号：密码在别人手里，对方随时可以改密码，账号里的购买记录也不属于你。第二，只在“设置 → 你的名字 → 媒体与购买项目”里登录需要的账号，不要在 iCloud 里登录不属于自己的 Apple 账号，账号的所有人可以对这台设备开启丢失模式，甚至远程抹除。
      </P>

      <H2 id="vpn">第一次连接：添加 VPN 配置</H2>
      <P>
        登录并选好节点后点连接，系统会弹出“想要添加 VPN 配置”的提示，要求你输入锁屏密码或用面容 ID 确认。核对提示里的应用名是你刚装的客户端，再点“允许”。成功后，屏幕顶部的状态栏会出现 VPN 标识；也可以到“设置 → 通用 → VPN 与设备管理 → VPN”里看到这条配置（旧版本在“通用 → VPN”）。拒绝授权，客户端就建立不了连接；想重新授权，先在这个页面删掉这条配置，再连接一次，系统会重新弹出提示。
      </P>
      <PendingShot what="iPhone 上“添加 VPN 配置”的授权提示，以及设置里 VPN 配置的位置" />

      <H2 id="troubleshoot">连上之后断线、没网：一次只改一项</H2>
      <P>
        iOS 上的排查和别的系统是同一个顺序，只是入口不同。先看顶部有没有 VPN 标识，没有就是连接已经断开。再换一个网络，Wi-Fi 和蜂窝数据各试一次，并到“设置 → 蜂窝网络”里确认客户端被允许使用蜂窝数据。接着看“日期与时间”是不是“自动设置”，系统里有没有同时启用另一个 VPN：同一时间只有一个 VPN 配置能连接。这些都没问题，再退出账号重新登录、刷新节点列表，最后才联系服务商。完整的顺序见<GuideLink href="/guides/all-nodes-timeout/">节点全部超时怎么办</GuideLink>。
      </P>

      <H2 id="mistakes">最容易出错的几件事</H2>
      <Ol
        items={[
          '使用别人出售的共享 Apple 账号下载客户端。',
          '在 iCloud 里登录了不属于自己的账号。',
          '没看服务商 iOS 一栏的写法，付款后才发现没有适合的客户端。',
          '拒绝了 VPN 配置的授权，又不知道怎么重新授权。',
          '同时装了几个代理类应用，互相抢占 VPN。'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: 'iPad 的操作和 iPhone 一样吗？',
            a: '授权和排查的思路相同，菜单名称相同或相近。差别在于服务商有没有 iPad 版本、能不能用 iPhone 版本，以服务商官网为准。'
          },
          {
            q: '为什么资料里有的服务商 iOS 一栏写的是 Nextin？',
            a: '资料里只写了“iOS 通过 Nextin”，没有说明它是什么，本站没有核实，也没有测试过。照服务商官网给出的安装和登录说明操作，不要在搜索结果或群聊里找别人转发的安装方式。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        本文只讲通用的授权和排查，不提供任何账号或安装渠道。客户端是否在你所在地区的 App Store 上架、能否使用，以服务商和 Apple 的官方说明为准；界面和菜单名称随 iOS 版本变化，本站没有逐个测试客户端。
      </Callout>
    </>
  );
}
