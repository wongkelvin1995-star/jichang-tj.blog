import React from 'react';
import Link from 'next/link';
import DealsQuickLookup from '@/components/DealsQuickLookup';
import { COUPONS, COUPONS_PROVIDED_ON, discountSummary } from '@/data/coupons';
import { buildCouponQuickItems } from '@/data/directory';
import { ShieldAlert, ArrowRight } from 'lucide-react';

/** 首页的优惠码速查（紧凑 + 搜索）；完整的优惠码表、适用与不适用的套餐在 /deals/ */
export default function VerifiedDealsSection() {
  return (
    <section id="deals" className="py-12 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
              优惠码速查
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-3xl leading-relaxed">
              {COUPONS.length} 家的优惠码由站长于 {COUPONS_PROVIDED_ON} 在结算页核验，折扣幅度各家不同（{discountSummary()}）。使用前先看适用与不适用的套餐，首购/续费条件和有效期以结算页实际抵扣为准；本站不编造“限时仅剩2小时”之类的倒计时。
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
          <DealsQuickLookup items={buildCouponQuickItems()} verifiedOn={COUPONS_PROVIDED_ON} />
        )}

      </div>
    </section>
  );
}
