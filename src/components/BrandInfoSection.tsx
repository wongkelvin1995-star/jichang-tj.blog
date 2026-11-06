import React from 'react';
import Link from 'next/link';
import { Server, Smartphone, PlayCircle, LifeBuoy } from 'lucide-react';
import { BRAND_MD, getBrandMd, type MdPair } from '@/data/brandMd';

/**
 * 品牌资料板块：站长的机场 MD（2026-11-06 整理）里的节点与线路、设备与客户端、流媒体与 AI、客服与退款。
 * 优惠码细则在品牌页的优惠码板块里，不在这里重复；MD 里的晚高峰实测和购买流程不放（站长 2026-11-06 决定）。
 * 内容照 MD 原样显示，MD 没写的项目就不出现，不用别处的资料补。这些是品牌自己的标注或站长提供的整理，本站没有测试线路。
 *
 * 去重（2026-11-06）：MD 里有几条通用提醒在 20 家以上品牌里一字不差（如“只通过官网注册购买”“网盘分发的客户端均非官方渠道”），
 * 逐页重复会让 34 个品牌页大段雷同，所以这些行不在品牌页里重复，统一指向《订阅与客户端配置》；“使用方式”“设备数”是每家的事实，始终保留。
 */
const ALWAYS_KEEP = new Set(['使用方式', '设备数']);
const GENERIC_MIN_BRANDS = 20;

const rowKey = (section: string, label: string, value: string) => `${section}｜${label}｜${value}`;
const GENERIC_ROWS: Set<string> = (() => {
  const seen = new Map<string, Set<string>>();
  const add = (section: string, label: string, value: string, id: string) => {
    const key = rowKey(section, label, value);
    if (!seen.has(key)) seen.set(key, new Set());
    seen.get(key)!.add(id);
  };
  BRAND_MD.forEach((b) => {
    b.devices_clients.forEach(([l, v]) => add('设备与客户端', l, v, b.brand_id));
    b.media_ai.forEach(([l, v]) => add('流媒体与AI', l, v, b.brand_id));
    b.service.forEach(([l, v]) => add('客服与退款', l, v, b.brand_id));
  });
  return new Set([...seen].filter(([key, ids]) => ids.size >= GENERIC_MIN_BRANDS && !ALWAYS_KEEP.has(key.split('｜')[1])).map(([key]) => key));
})();

function Rows({ pairs }: { pairs: MdPair[] }) {
  if (pairs.length === 0) return <p className="text-xs text-[#94A3B8]">资料未提供</p>;
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-x-4 gap-y-1.5 text-xs sm:text-sm">
      {pairs.map(([label, value], i) => (
        <React.Fragment key={`${label}-${i}`}>
          <dt className="font-semibold text-[#17233A] sm:text-right">{label || '说明'}</dt>
          <dd className="text-[#475569] leading-relaxed">{value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function Block({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-[#17233A] flex items-center gap-1.5">
        {icon}
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
}

export default function BrandInfoSection({ brandId, brandName }: { brandId: string; brandName: string }) {
  const md = getBrandMd(brandId);
  const nodePairs: MdPair[] = [
    ...(md.nodes.regions ? [['节点地区', md.nodes.regions] as MdPair] : []),
    ...(md.nodes.per_region_count ? [['各地区节点数', md.nodes.per_region_count] as MdPair] : []),
    ...(md.nodes.line_type ? [['线路类型', md.nodes.line_type] as MdPair] : []),
    ...md.nodes.per_region_line.map((l): MdPair => {
      const m = l.match(/^(.+?)[：:]\s*(.+)$/);
      return m ? [`${m[1]}线路`, m[2]] : ['线路', l];
    }),
    ...(md.nodes.multiplier ? [['倍率', md.nodes.multiplier] as MdPair] : []),
    ...md.nodes.other
  ];
  const flowRules: MdPair[] = md.flow_rules.map((l) => ['流量规则', l]);

  // 去掉多家一字不差的通用提醒；去掉之后整块没东西了，就不显示这一块（不写“资料未提供”，因为 MD 其实写了）
  const dropGeneric = (section: string, pairs: MdPair[]) => pairs.filter(([l, v]) => !GENERIC_ROWS.has(rowKey(section, l, v)));
  const devices = dropGeneric('设备与客户端', md.devices_clients);
  const media = dropGeneric('流媒体与AI', md.media_ai);
  const service = dropGeneric('客服与退款', md.service);
  const droppedAny = devices.length < md.devices_clients.length || media.length < md.media_ai.length || service.length < md.service.length;
  const showBlock = (original: MdPair[], kept: MdPair[]) => original.length === 0 || kept.length > 0;

  return (
    <section id="brand-info" className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-5 scroll-mt-24">
      <h2 className="text-lg font-bold text-[#17233A]">{brandName}品牌资料</h2>

      <Block icon={<Server className="w-4 h-4 text-[#6378EA]" />} title="节点与线路">
        <Rows pairs={nodePairs} />
      </Block>

      {showBlock(md.devices_clients, devices) && (
        <Block icon={<Smartphone className="w-4 h-4 text-[#6378EA]" />} title="设备与客户端">
          <Rows pairs={devices} />
        </Block>
      )}

      {flowRules.length > 0 && (
        <Block icon={<Server className="w-4 h-4 text-[#6378EA]" />} title="流量规则">
          <Rows pairs={flowRules} />
        </Block>
      )}

      {showBlock(md.media_ai, media) && (
        <Block icon={<PlayCircle className="w-4 h-4 text-[#6378EA]" />} title="流媒体与 AI">
          <Rows pairs={media} />
        </Block>
      )}

      {showBlock(md.service, service) && (
        <Block icon={<LifeBuoy className="w-4 h-4 text-[#6378EA]" />} title="客服与退款">
          <Rows pairs={service} />
        </Block>
      )}

      {droppedAny && (
        <p className="text-xs text-[#64748B]">
          多家品牌写法相同的通用提醒，见<Link href="/guides/subscription-and-client/" className="font-semibold text-[#6378EA]">订阅与客户端配置</Link>。
        </p>
      )}
    </section>
  );
}
