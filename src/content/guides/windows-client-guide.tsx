import React from 'react';
import { H2, P, Ul, Ol, Callout, GuideLink, Faq } from '@/components/guide/Prose';
import { PendingShot } from '@/components/guide/Media';
import { CONNECTION_STATS } from '@/data/connectionStats';

export default function WindowsClientGuide() {
  return (
    <>
      <P>
        在 Windows 上用机场，要做的事其实不多：找到服务商的官方客户端，从官网下载，安装，用账号登录，选节点连接。站长提供的机场资料里，各家的使用方式都是官方客户端、账号登录，所以本文先讲官方客户端怎么找、怎么装、怎么登，最后才讲服务商提供订阅链接时怎么办。客户端的界面和按钮会随版本变化，本站没有逐个测试，也不提供安装包。
      </P>

      <H2 id="exists">先确认服务商有没有 Windows 客户端</H2>
      <P>
        资料里写明支持 Windows 的有 {CONNECTION_STATS.windows} 家；另有 {CONNECTION_STATS.platformUnspecified} 家没有写支持哪些系统。下载之前，先到服务商官网或后台确认它提供 Windows 版本，以及对系统版本的要求，有的品牌会写明最低支持的 Windows 版本。品牌页的“品牌资料”里列出了各家资料中的支持系统。
      </P>

      <H2 id="download">下载和安装的安全做法</H2>
      <P>
        只从服务商官网或后台指向的地址下载，不要从网盘、群聊或搜索结果里的第三方站点拿安装包：网上有人出售所谓的“订阅链接”，也有人用网盘分发假客户端，这类渠道都不是官方渠道。杀毒软件对这类工具偶尔会误报，也有人会借同名软件投毒，两种情况从外表看一模一样。办法是核对下载地址和文件名，官网给了校验值（哈希）的，用系统自带工具算一遍再对照；对不上就不要运行。不要为了装上去，一刀切地关掉杀毒软件。
      </P>

      <H2 id="login">登录并连接</H2>
      <Ol
        items={[
          '安装并打开客户端，用注册时的账号登录。',
          '等节点列表加载完成，检查点：列表里出现了节点。',
          '选一个节点，点击连接，检查点：客户端显示已连接。',
          '打开一个国内网站和一个境外网站各试一次。'
        ]}
      />
      <PendingShot what="Windows 官方客户端登录和连接界面的截图" />

      <H2 id="mode">系统代理还是 TUN</H2>
      <P>
        有的客户端提供“系统代理”和 TUN 两种接管方式，有的只提供一种，以客户端为准。系统代理只对读取 Windows 系统代理设置的程序生效，浏览器大多遵守，一些游戏、命令行工具和部分桌面程序不遵守；TUN 模式会创建虚拟网卡，接管整台设备的流量，覆盖面更广，但通常需要管理员权限，也更容易和其他网络软件冲突。建议先用系统代理，遇到“某个程序不走代理”再考虑 TUN。两种方式的原理见<GuideLink href="/guides/subscription-and-client/">机场订阅与客户端配置</GuideLink>。
      </P>

      <H2 id="first-run">第一次运行常见的几件事</H2>
      <Ul
        items={[
          '防火墙弹窗：只有确认程序来自官网时，才允许它联网。',
          '和其他代理软件、加速器、公司或学校的安全软件冲突：它们都会改系统代理设置，一次只开一个。',
          '退出客户端后断网：多半是系统代理没有跟着关闭，到“设置 → 网络和 Internet → 代理”里手动关掉。',
          '登录后节点列表是空的：先确认账号套餐有没有到期，再重新登录或刷新节点。',
          <>节点全部超时：按<GuideLink href="/guides/all-nodes-timeout/">节点全部超时的排查顺序</GuideLink>处理，一次只改一项。</>
        ]}
      />

      <H2 id="subscription">如果服务商提供订阅链接</H2>
      <P>
        资料里只有少数写法留有订阅链接的余地，多数写不推荐使用，其余写不提供。如果你的服务商确实给了订阅链接并说明支持通用客户端，选客户端时看三点：项目是否还在更新、是否支持服务商给的订阅格式、下载是否来自项目官方发布页。订阅链接要当密码保管，不要交给在线转换网站，原理见同一篇订阅与客户端的文章。
      </P>

      <H2 id="other-systems">用其他系统怎么办</H2>
      <P>
        原理相同，授权和设置入口不同：<GuideLink href="/guides/macos-client-guide/">Mac</GuideLink>要处理系统的拦截和代理残留，<GuideLink href="/guides/android-client-guide/">安卓</GuideLink>要设置后台运行，<GuideLink href="/guides/ios-client-guide/">iPhone 与 iPad</GuideLink>要先确认客户端的获取方式。三篇各讲各的，不重复这里的内容。
      </P>

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '需要管理员权限吗？',
            a: '要看客户端。系统代理方式通常不需要；TUN 或安装服务通常需要管理员权限，具体以客户端的官方说明为准。'
          },
          {
            q: '可以同时开两个客户端吗？',
            a: '不建议。系统代理只有一份设置，两个客户端会互相覆盖，常见的现象是关了一个，另一个也没网。'
          },
          {
            q: '想用自己熟悉的客户端行不行？',
            a: `资料里有 ${CONNECTION_STATS.thirdPartyNotRecommended} 家写不推荐、${CONNECTION_STATS.thirdPartyUnsupported} 家写不支持导入 Clash、小火箭等第三方客户端，理由是避免订阅外泄、保护节点安全。是否可行以服务商的说明为准。`
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        本文是通用步骤，不针对某个版本的某个客户端；按钮名称和位置以你下载的官方客户端为准。本站不提供安装包，也没有逐个测试客户端。
      </Callout>
    </>
  );
}
