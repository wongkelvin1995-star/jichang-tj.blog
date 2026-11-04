/** 金额显示：整数不带小数，其余最多两位，如 ¥20、¥12.5。 */
export function fmtYuan(n: number): string {
  return `¥${Number.isInteger(n) ? n : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')}`;
}

/** 每 GB 单价统一保留 3 位小数。 */
export function fmtPerGB(n: number): string {
  return `¥${n.toFixed(3)}`;
}

/** 折扣显示，沿用站内写法：0.85 → “85 折”，0.8 → “8 折”，0.546 → “55 折”。 */
export function fmtZhe(ratio: number): string {
  const pct = Math.round(ratio * 100);
  return pct % 10 === 0 ? `${pct / 10} 折` : `${pct} 折`;
}
