import React from 'react';
import { H2, P, Ul, Ol, Callout, Table, GuideLink } from '@/components/guide/Prose';
import { fmtYuan, fmtZhe } from '@/data/format';
import {
  BRAND_COUNT,
  CHEAPEST_YEARLY,
  CYCLE_COVERAGE,
  DEVICE_CAP_EXCEPTION,
  ENTRY_MONTHLY,
  RESET_NOTE_BRAND_COUNT,
  ROWS_WITH_RESET_NOTE,
  discountStats,
  median
} from '@/data/guideStats';
import { PLANS } from '@/data/packages';

/**
 * 机场怎么选：五步排除法。
 * 凡是数字都从价格表算出（guideStats）；没有来源的比例、统计和第三方内部机制一律不写。
 */
export default function HowToChoose() {
  const yearly = discountStats('y')!;
  const entryLow = ENTRY_MONTHLY[0];
  const entryHigh = ENTRY_MONTHLY[ENTRY_MONTHLY.length - 1];
  const entryMid = median(ENTRY_MONTHLY.map((e) => e.price));
  const yearlyLow = CHEAPEST_YEARLY[0];
  const refundCount = PLANS.filter((p) => p.refund_rule !== null).length;

  return (
    <>
      <P>
        选机场最常见的错误，是先看测速截图和折合月价，最后才看规则。更稳妥的顺序正好相反：先定预算和用量，再核对设备、倍率、重置和售后，最后才比价格。本文把这个顺序拆成五步，每一步都是你自己能核对的指标。文中的价格数字来自本站价格表（{BRAND_COUNT} 家，站长核验于 2026-11-03）；速度和稳定性本站没有测试数据，所以不在比较范围内。
      </P>
      <P>
        五步得出的都是“排除”而不是“推荐”：走完以后剩下的，才值得拿月付去试一个月。
      </P>

      <H2 id="step-1">第一步：先定预算，首次只买月付</H2>
      <P>
        价格表里 {BRAND_COUNT} 家都有月付档，入门月付从 {fmtYuan(entryLow.price)} 到 {fmtYuan(entryHigh.price)}，中位数 {fmtYuan(entryMid)}，试一次的成本并不高。年付要先付的钱多得多：有年付的 {CYCLE_COVERAGE.y} 家里，最低的年付是{yearlyLow.brand.name}的 {fmtYuan(yearlyLow.price)}。年付总价是连付 12 个月月付的 {fmtZhe(yearly.min)}到 {fmtZhe(yearly.max)}，中位数 {fmtZhe(yearly.median)}，这点折扣是用预付时间换来的。
      </P>
      <Ul
        items={[
          <><strong>按首日实付定预算：</strong>年付 ¥200 就是当天扣 ¥200，折合月价只用来比较，不是每月的支出。</>,
          <><strong>价格远低于价格表最低档的套餐，先看规则再付钱：</strong>条款、联系方式和退款说明都找得到，再决定预付多少，金额以承受得起损失为限。</>
        ]}
      />

      <H2 id="step-2">第二步：确认客户端和设备数</H2>
      <P>
        订阅链接只是一份带密钥的节点配置，要导入客户端才能用，见<GuideLink href="/guides/subscription-and-client/">订阅与客户端怎么配</GuideLink>。本站不提供安装包，也没有逐个测试过客户端，下载渠道和支持的订阅格式以服务商后台的教程和客户端项目的官方页面为准。
      </P>
      <Ul
        items={[
          <><strong>苹果设备：</strong>客户端要从应用商店安装，有的在中国大陆区的商店里搜不到，付款前先确认你能装上。</>,
          <><strong>电脑和安卓：</strong>多数客户端支持导入通用订阅格式，买之前问清服务商给的是哪种格式，以及客户端是否支持。</>,
          <><strong>同时在线设备数：</strong>本站按站长核验的口径写“不限设备”{DEVICE_CAP_EXCEPTION ? `，${DEVICE_CAP_EXCEPTION}` : ''}。多设备共用的人，付款前仍要向服务商确认。</>
        ]}
      />

      <H2 id="step-3">第三步：核对倍率、重置和结转</H2>
      <P>
        标称额度不等于能传输的数据量。倍率决定每传输 1GB 扣多少额度：倍率 2 的节点传输 10GB，后台扣 20GB。本站价格表按站长核验的口径是 1 倍率，购买后仍应在节点列表里看一遍每个节点标注的倍率。
      </P>
      <Ul
        items={[
          <><strong>重置口径：</strong>额度是“购买日起每 30 天刷新”，还是“每月 1 日统一重置”，决定月末下单的首期能用多久。价格表只在 {ROWS_WITH_RESET_NOTE.length} 个套餐（{RESET_NOTE_BRAND_COUNT} 家）的备注里写了刷新或重置规则，其余没有写明，下单前自己问。</>,
          <><strong>未用完的额度：</strong>能否结转同样多数没写明，问不到就按“当月清零”准备。一次性流量包不按月清零，但有效期要看清，见<GuideLink href="/guides/occasional-use/">偶尔使用怎么选</GuideLink>。</>
        ]}
      />

      <H2 id="step-4">第四步：看分流规则和 DNS 设置</H2>
      <P>
        分流是客户端按规则决定哪些流量走代理、哪些直连。规则太粗，国内网站可能被送到境外再绕回来，既慢又多耗额度。
      </P>
      <Ul
        items={[
          <><strong>规则能自动更新：</strong>订阅或客户端里的规则集要定期更新，否则新出现的域名不在规则里，会走错路径。</>,
          <><strong>DNS 走加密或远程解析：</strong>在客户端里设置加密 DNS，或让域名解析走代理，减少解析被运营商篡改的可能。</>,
          <><strong>敏感业务单独设规则：</strong>网银、AI 工具这类对出口地区敏感的业务，可以单独建策略组固定出口，做法见<GuideLink href="/guides/ai-users/">AI 工具用户怎么选机场</GuideLink>。</>
        ]}
      />

      <H2 id="step-5">第五步：看售后和服务条款</H2>
      <P>
        价格表里写明退款条款的套餐有 {refundCount} 个，所以能不能退、几天内、扣不扣手续费，都要自己去服务条款里找，逐项清单见<GuideLink href="/guides/refund-and-purchase-checklist/">购买前核对清单</GuideLink>。
      </P>
      <Ul
        items={[
          <><strong>工单和公告渠道：</strong>后台有没有工单系统或公告频道，节点出问题时你能找谁。</>,
          <><strong>退款边界：</strong>条款没有写退款的，按不可退款对待，只买月付。</>,
          <><strong>禁止用途：</strong>服务条款常会写明禁止的用途，例如垃圾邮件、滥用下载，违反可能被停用，以条款原文为准。</>
        ]}
      />

      <H2 id="decision-matrix">五步核对表</H2>
      <Table
        nowrapFirst
        head={['步骤', '核对什么', '去哪里看', '过不了关时']}
        rows={[
          ['1 预算', '首日实付金额和付款周期', '结算页', '改买月付，或换更小的档位'],
          ['2 设备', '客户端能否安装、同时在线设备数', '服务商教程、套餐详情', '换品牌，或换设备方案'],
          ['3 规则', '倍率、重置口径、是否结转、流量包有效期', '套餐页、帮助页、节点列表', '问客服；问不到按“每月清零”准备'],
          ['4 分流', '规则能否自动更新、DNS 怎么设', '客户端设置', '换客户端，或自己补规则'],
          ['5 售后', '工单渠道、退款条款、禁止用途', '后台、服务条款', '只买月付，保留订单号和截图']
        ]}
      />

      <H2 id="exclusion-summary">可以直接排除的几种情况</H2>
      <Ol
        items={[
          `没有月付档、只能整年预付的，不买。价格表里 ${BRAND_COUNT} 家都有月付档，试用没有理由预付全年。`,
          '订阅只能用服务商自带客户端、没法导入通用客户端的，谨慎对待，因为以后换服务商要重新适应。',
          '倍率、重置和结转写得含糊，客服又不回答具体规则的，不买。',
          '宣称“永不断线”“全网最快”的文案，当营销话术处理，不当事实。',
          '过了前面几关，再按每 GB 单价和优惠码选一家，先买月付。'
        ]}
      />

      <Callout title="本文的边界" tone="warn">
        线路表现受你的宽带、国际出口和目标网站共同影响，本站没有测速数据，不对任何品牌的速度和稳定性做判断。价格以结算页为准，本文讲的是方法，不是对某一家的背书。
      </Callout>
    </>
  );
}
