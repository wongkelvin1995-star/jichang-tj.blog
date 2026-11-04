import React from 'react';
import Link from 'next/link';
import CouponTable from '@/components/CouponTable';
import { COUPONS, COUPON_DISCOUNT_LABEL } from '@/data/coupons';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export default function VerifiedDealsSection() {
  return (
    <section id="deals" className="py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
              STEP 4 · 优惠码
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
              使用优惠前，先核对适用条件
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-2xl leading-relaxed">
              以下 {COUPONS.length} 家的优惠码及 {COUPON_DISCOUNT_LABEL} 的折扣幅度由站长于 2026-11-03 在结算页核验；适用套餐、首购/续费条件和有效期以结算页实际抵扣为准，本站不编造“限时仅剩2小时”之类的倒计时。推广链接里的邀请代码和优惠码是两回事。
            </p>
          </div>

          <Link
            href="/deals/"
            className="inline-flex items-center gap-1.5 text-xs text-[#6378EA] hover:text-[#4F64D6] font-semibold"
          >
            <span>查看优惠核对说明</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {COUPONS.length === 0 ? (
          <div className="rounded-2xl liquid-glass-card p-6 border border-[#E2E8F0] flex items-start gap-3 text-sm">
            <ShieldAlert className="w-5 h-5 text-[#6378EA] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-[#17233A]">目前没有通过结算页核实的优惠码</div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                所以这里暂不列出任何折扣码。推广链接里的 code= 只是邀请参数，不是优惠码；实付金额请以结算页为准。
              </p>
            </div>
          </div>
        ) : (
          <CouponTable compact />
        )}

      </div>
    </section>
  );
}
