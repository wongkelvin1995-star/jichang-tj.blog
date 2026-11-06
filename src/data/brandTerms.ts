import { BRAND_TERMS_DATA } from '@/data/brandTermsData';

/**
 * 每家的倍率、设备数、限速、退款：都照站长 MD 里这一家自己的写法，MD 没写的就是 null（页面写“资料未提供”）。
 * 不再有“全站统一 1 倍率、不限设备、不限速”这种口径（站长 2026-11-06：资料都必须跟着 MD）。
 * 数据在 brandTermsData.ts（由 scripts/import_md.mjs 生成），这里只做查询和统计，客户端组件引用也不会带上整份 brandMd。
 */
export interface BrandTerms {
  multiplier: string | null;
  devices: string | null;
  speed: string | null;
  refund: string | null;
}

const BY_ID = new Map(BRAND_TERMS_DATA.map((row) => [row.brand_id, row]));

export function getBrandTerms(brandId: string): BrandTerms {
  const row = BY_ID.get(brandId);
  if (!row) throw new Error(`机场 MD 缺少品牌：${brandId}`);
  return { multiplier: row.multiplier, devices: row.devices, speed: row.speed, refund: row.refund };
}

/** 设备数写法是不是“不限”（没有数字上限，也不是“以官网说明为准”） */
export function isDeviceUnlimited(brandId: string): boolean | null {
  const devices = getBrandTerms(brandId).devices;
  if (!devices) return null;
  if (/\d+\s*台/.test(devices) || /以官网/.test(devices)) return false;
  return /不限/.test(devices);
}

const count = (pred: (row: (typeof BRAND_TERMS_DATA)[number]) => boolean) => BRAND_TERMS_DATA.filter(pred).length;

/** 跨品牌统计，指南正文用：这些数字都从 MD 数出来，改了 MD 会自动跟着变 */
export const TERMS_STATS = {
  total: BRAND_TERMS_DATA.length,
  multiplierStated: count((r) => Boolean(r.multiplier)),
  multiplierOne: count((r) => /1\s*[xX×]|1\.0/.test(r.multiplier ?? '')),
  devicesUnlimited: count((r) => isDeviceUnlimited(r.brand_id) === true),
  devicesCapped: count((r) => /\d+\s*台/.test(r.devices ?? '')),
  devicesBySite: count((r) => /以官网/.test(r.devices ?? '')),
  speedStated: count((r) => r.speed !== null),
  refundStated: count((r) => r.refund !== null && !/未公开|后续公布|未写|没有/.test(r.refund))
};

/** 写了设备数上限的品牌清单，各处写“设备数各家不同”时带上例外说明 */
export const DEVICE_CAP_BRANDS: string[] = BRAND_TERMS_DATA.filter((r) => /\d+\s*台/.test(r.devices ?? '')).map((r) => r.name);
