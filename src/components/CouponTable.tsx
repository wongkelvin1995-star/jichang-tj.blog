import React from 'react';
import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { COUPONS, COUPONS_PROVIDED_ON } from '@/data/coupons';
import { Coupon } from '@/types';
import { ExternalLink, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

function describeConditions(coupon: Coupon): string {
  const parts = [
    coupon.discount_value !== null ? `${coupon.discount_value}` : '折扣幅度未提供',
    coupon.new_customer_only === null ? '首购/续费条件以结算页为准' : coupon.new_customer_only ? '仅限新用户首购' : '新老用户可用',
    coupon.end_at ? `截止 ${coupon.end_at}` : '有效期以结算页为准'
  ];
  return parts.join('；');
}

export default function CouponTable({ compact = false }: { compact?: boolean }) {
  const rows = COUPONS
    .map((coupon) => ({ coupon, brand: BRANDS.find((b) => b.id === coupon.brand_id)! }))
    .sort((a, b) => a.brand.display_rank - b.brand.display_rank);

  return (
    <div className="liquid-glass rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs">
      <div className={`overflow-auto ${compact ? 'max-h-[560px]' : ''}`}>
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] font-semibold whitespace-nowrap">
              <th className="py-3 px-4">推荐位 / 品牌</th>
              <th className="py-3 px-4">优惠码</th>
              <th className="py-3 px-4">折扣与适用条件</th>
              <th className="py-3 px-4">状态</th>
              <th className="py-3 px-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {rows.map(({ coupon, brand }) => (
              <tr key={coupon.id} className="hover:bg-[#F0F5F9]/70 transition-colors">
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold flex items-center justify-center border border-[#E2E8F0]">
                      {brand.display_rank}
                    </span>
                    <span className="font-bold text-[#17233A]">{brand.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <code className="font-mono font-bold text-sm text-[#6378EA] select-all">{coupon.coupon_code}</code>
                </td>
                <td className="py-3 px-4 text-[#64748B] min-w-[220px]">{describeConditions(coupon)}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {coupon.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>站长核验于 {coupon.verified_at}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>待核验</span>
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <Link href={`/airports/${brand.id}/`} className="font-semibold text-[#6378EA] hover:text-[#4F64D6]">
                    品牌页
                  </Link>
                  <span className="mx-1.5 text-[#CBD5E1]">·</span>
                  <a
                    href={brand.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="inline-flex items-center gap-1 font-semibold text-[#475569] hover:text-[#17233A]"
                  >
                    <span>前往注册</span>
                    <ExternalLink className="w-3 h-3 text-[#6378EA]" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-start gap-2 text-xs text-[#64748B]">
        <ShieldAlert className="w-4 h-4 text-[#6378EA] shrink-0 mt-0.5" />
        <span>
          以上优惠码和折扣幅度由站长于 {COUPONS_PROVIDED_ON} 在结算页核验；适用套餐、首购/续费条件与有效期以结算页为准，输入后以实际抵扣金额为准。推广链接里的 code= 是邀请参数，不是优惠码；注册入口为商业链接。
        </span>
      </div>
    </div>
  );
}
