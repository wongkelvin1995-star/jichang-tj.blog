import { BRAND_MD, type BrandMd } from '@/data/brandMd';

/**
 * 各家怎么连：从站长机场 MD 的“设备与客户端”里统计使用方式、订阅链接、第三方客户端和支持系统（2026-11-06）。
 * 教程和 FAQ 里写“多数服务商怎么连”之前先看这里的数字，不凭印象写；MD 改了重新导入，数字会自动跟着变。
 */
const row = (b: BrandMd, label: string): string => b.devices_clients.find(([k]) => k === label)?.[1] ?? '';
const count = (pred: (b: BrandMd) => boolean) => BRAND_MD.filter(pred).length;

export const CONNECTION_STATS = {
  total: BRAND_MD.length,
  /** 使用方式写“官方客户端”（账号登录） */
  officialClient: count((b) => /官方客户端|官方自研|自研官方/.test(row(b, '使用方式'))),
  /** 订阅链接：写“不推荐使用” */
  subscriptionNotRecommended: count((b) => /不推荐/.test(row(b, '订阅链接'))),
  /** 订阅链接：写不提供、已暂停或不对外发放 */
  subscriptionNotProvided: count((b) => /不提供|暂停|不对外发放/.test(row(b, '订阅链接'))),
  /** 第三方客户端（Clash、小火箭等）：写“不推荐导入” */
  thirdPartyNotRecommended: count((b) => /不推荐/.test(row(b, '第三方客户端'))),
  /** 第三方客户端：写“不支持”或“暂不支持” */
  thirdPartyUnsupported: count((b) => /不支持/.test(row(b, '第三方客户端'))),
  /** 资料里没有写支持哪些系统的品牌数 */
  platformUnspecified: count((b) => !row(b, '支持系统')),
  windows: count((b) => /windows/i.test(row(b, '支持系统'))),
  macos: count((b) => /macos/i.test(row(b, '支持系统'))),
  android: count((b) => /android/i.test(row(b, '支持系统'))),
  ios: count((b) => /ios/i.test(row(b, '支持系统')))
};

const systemsOf = (b: BrandMd) => row(b, '支持系统');

/** “支持系统”“下载渠道”“使用方式”里的细节，各系统教程引用（同样从 MD 数出来，不凭印象） */
export const PLATFORM_DETAILS = {
  /** 写了最低要求 macOS 10.15 及以上 */
  macosMinVersion: count((b) => /macOS\s*10\.15/i.test(systemsOf(b))),
  /** 写明同时支持 Intel 和 Apple 芯片 */
  macosBothChips: count((b) => /Apple Silicon/i.test(systemsOf(b))),
  /** 写了最低要求 Android 5.0 及以上 */
  androidMinVersion: count((b) => /Android\s*5\.0/i.test(systemsOf(b))),
  /** iOS 一栏写“通过 Nextin”（资料没有说明 Nextin 是什么） */
  iosViaNextin: count((b) => /Nextin/i.test(systemsOf(b))),
  /** 写了最低要求 iOS 12.0 或 15 及以上 */
  iosMinVersion: count((b) => /iOS\s*\d+(\.\d+)?\s*及以上/i.test(systemsOf(b))),
  /** 下载渠道写“仅限官网” */
  downloadOfficialOnly: count((b) => /仅限官网/.test(row(b, '下载渠道'))),
  /** 使用方式里写明分流规则已内置的品牌 */
  rulesBuiltInBrandIds: BRAND_MD.filter((b) => /分流规则已内置/.test(row(b, '使用方式'))).map((b) => b.brand_id)
};

/** “N 家（共 M 家）”；N 等于总数时写“全部 M 家”，免得出现“34 家（共 34 家）”这种读起来别扭的写法 */
export const ofTotal = (n: number): string => (n === CONNECTION_STATS.total ? `全部 ${n} 家` : `${n} 家（共 ${CONNECTION_STATS.total} 家）`);

/** 一句话概述，教程里直接引用 */
export const CONNECTION_SUMMARY = `站长提供的机场资料里，${ofTotal(CONNECTION_STATS.officialClient)}的使用方式都是官方客户端、账号登录即可连接；订阅链接方面，${CONNECTION_STATS.subscriptionNotRecommended} 家写不推荐使用，${CONNECTION_STATS.subscriptionNotProvided} 家写不提供、已暂停或不对外发放；第三方客户端方面，${CONNECTION_STATS.thirdPartyNotRecommended} 家写不推荐导入 Clash、小火箭等，${CONNECTION_STATS.thirdPartyUnsupported} 家写不支持`;
