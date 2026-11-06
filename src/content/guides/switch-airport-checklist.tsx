import React from 'react';
import { H2, P, Ol, Table, Callout, GuideLink, Faq } from '@/components/guide/Prose';
import { Flow } from '@/components/guide/Media';
import { BRAND_MD } from '@/data/brandMd';

export default function SwitchAirportChecklist() {
  const serviceCount = (label: string) => BRAND_MD.filter((b) => b.service.some(([l]) => l === label)).length;
  const refundCount = serviceCount('退款');
  const trialCount = serviceCount('试用');
  const routerCount = BRAND_MD.filter((b) => /路由器|软路由/.test(b.devices_clients.find(([l]) => l === '支持系统')?.[1] ?? '')).length;

  return (
    <>
      <P>
        换机场听上去只是换一个客户端，实际要处理的事不少：旧套餐还剩多久、多少流量，新服务商的客户端怎么装，几台设备都要换，旧账号和自动续费怎么收尾，旧客户端留下的系统设置要不要清理。本文给一份按顺序走的清单，每一步都有检查点，目标是换的过程中不断网、不重复付款、不留隐患。
      </P>
      <Flow
        steps={[
          { title: '写下为什么换', note: '先排除本地原因' },
          { title: '盘点旧套餐', note: '到期日、剩余流量、自动续费、退款条款' },
          { title: '先买新服务商的月付', note: '确认有没有试用' },
          { title: '安装新客户端', note: '新旧不要同时开' },
          { title: '逐台设备迁移', note: '先换一台，确认再换其他' },
          { title: '验证日常用法', note: '常用的两三件事都试一遍' },
          { title: '收尾旧账号', note: '关自动续费，清理代理残留' }
        ]}
        caption="换机场的七步清单"
      />

      <H2 id="why">先写下为什么换</H2>
      <P>
        换之前先写一行原因：价格、速度、稳定性、设备数还是售后。原因写不清楚，换完往往还是同样的问题。如果问题是连不上或很慢，先按<GuideLink href="/guides/all-nodes-timeout/">节点全部超时怎么办</GuideLink>和<GuideLink href="/guides/connected-but-slow-or-blocked/">能连上却打不开或很慢</GuideLink>排查：问题可能出在你的网络、时间或设置上，换了服务商也解决不了。
      </P>

      <H2 id="old-plan">盘点旧套餐</H2>
      <P>
        登录旧服务商的后台，记下四件事：到期日、剩余流量和重置日、是否开了自动续费、退款条款怎么写。站长提供的机场资料里，{refundCount} 家写了退款说明，其余没写，所以旧套餐能不能退、怎么退，要看你当时的订单页和服务商的条款，不要凭印象。不同服务商之间的流量和余额不能互通，旧套餐里没用完的流量，只能用到到期，或按条款申请退款。
      </P>

      <H2 id="new-plan">先买新服务商的月付，新旧并行一小段时间</H2>
      <P>
        新服务商第一次只买月付，选套餐的方法见<GuideLink href="/guides/how-to-choose/">机场怎么选</GuideLink>，付款前的核对见<GuideLink href="/guides/refund-and-purchase-checklist/">购买前核对清单</GuideLink>。资料里有 {trialCount} 家写了试用说明，有试用的先试用，再决定付费。新旧并行用一段时间，旧的当备用，新的确认稳定了再收尾，这样即使新的出了问题，你也不会断网。
      </P>

      <H2 id="client">客户端的切换</H2>
      <P>
        每家服务商有自己的官方客户端和账号，换服务商就是换一套：从新服务商官网下载新客户端，登录新账号。安装之后，先退出旧客户端，再打开新的，不要同时开两个：系统代理只有一份设置，手机上同一时间也只有一个 VPN 连接，两个客户端会互相覆盖。各系统的下载、授权和排错见<GuideLink href="/guides/windows-client-guide/">Windows</GuideLink>、<GuideLink href="/guides/macos-client-guide/">Mac</GuideLink>、<GuideLink href="/guides/android-client-guide/">安卓</GuideLink>和<GuideLink href="/guides/ios-client-guide/">iPhone 与 iPad</GuideLink>的教程。如果你之前用订阅链接把节点导入了通用客户端，新服务商如果提供订阅，就在新的配置里导入，旧配置先保留到确认新的可用。
      </P>

      <H2 id="devices">逐台设备迁移</H2>
      <Table
        nowrapFirst
        head={['设备', '要做什么', '检查点']}
        rows={[
          ['电脑', '安装新客户端并登录，退出旧客户端', '国内外各打开一个网站都正常'],
          ['手机和平板', '按系统的方式获取新客户端，登录后授权 VPN 配置', '状态栏出现 VPN 标识，锁屏几分钟后仍在线'],
          ['路由器和软路由', `资料里写了支持路由器或软路由的有 ${routerCount} 家，各家支持的方式不同，要单独向服务商确认`, '路由器后面的设备都能正常上网，再决定是否撤掉旧配置'],
          ['其他设备', '按服务商的说明处理，没有说明的就先问客服', '确认设备数没有超过新套餐的上限']
        ]}
      />
      <P>
        设备数和共享流量的问题见<GuideLink href="/guides/multi-device-plans/">多设备家庭怎么选</GuideLink>。先换一台设备，确认没问题再换下一台，不要一次全换。
      </P>

      <H2 id="verify">验证日常用法</H2>
      <P>
        把你日常最常做的两三件事各做一遍：一个国内网站，一个境外网站，再加上你最常用的服务，比如视频或 AI 工具。同时记下新套餐的起点：后台显示的已用流量和重置日。之后想比较新旧服务商的实际体验，按<GuideLink href="/guides/test-airport-yourself/">自己动手测</GuideLink>的方法在同一网络下各测一次。
      </P>

      <H2 id="wrap-up">旧账号怎么收尾</H2>
      <Ol
        items={[
          '先关闭旧套餐的自动续费，在服务商后台或付款平台里确认，不要只关一处。',
          '保存订单和付款凭证，旧套餐到期前不要删除账号，申诉或退款可能用得上。',
          '确认新的稳定之后，退出旧客户端的登录，再卸载。',
          '清理系统代理残留：电脑到网络设置里的代理页检查一遍，手机到 VPN 设置里删除不用的配置。',
          '用过订阅链接的，不再使用的链接不要再分享给别人；新旧账号如果用了同一个密码，把其他网站上相同的密码也换掉。'
        ]}
      />

      <H2 id="mistakes">最容易出错的几件事</H2>
      <Ol
        items={[
          '忘记关旧套餐的自动续费，到期后又被扣了一次。',
          '新旧客户端同时开，设置互相覆盖，以为新服务商不能用。',
          '新的还没验证就卸载了旧的，出问题时没有备用。',
          '一次把所有设备都换了，哪一台出问题都不好排查。',
          '没有记下旧套餐的到期日和退款条款，想退款时找不到依据。'
        ]}
      />

      <H2 id="faq">常见问题</H2>
      <Faq
        items={[
          {
            q: '旧套餐还没到期，能直接换吗？',
            a: '可以，不必等到期。新旧并行用一小段时间最稳，旧套餐剩得多的，可以继续当备用，直到到期。'
          },
          {
            q: '换了服务商，原来的设置和规则要重新做吗？',
            a: '官方客户端的设置和规则是各家自己的，不能互相导入，换了就要在新客户端里重新设置。官方客户端里内置了规则的，一般不用自己改。'
          }
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        本文是通用的迁移清单，不推荐换到哪一家。退款能否办理、怎么办理，取决于各服务商的条款，资料里的写法是品牌自己的标注，本站没有逐家核实；一切以服务商的条款和结算页为准。
      </Callout>
    </>
  );
}
