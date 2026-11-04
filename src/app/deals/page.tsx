import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CouponTable from '@/components/CouponTable';
import { COUPONS, COUPON_DISCOUNT_LABEL } from '@/data/coupons';
import { buildMetadata } from '@/lib/metadata';
import { Tag, AlertTriangle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: '机场优惠码汇总与核验状态',
  description: `收录站长在结算页核验的 ${COUPONS.length} 个机场优惠码（折扣 ${COUPON_DISCOUNT_LABEL}），逐一注明核验日期。严格区分推广链接里的邀请参数与优惠码，不伪造倒计时。`,
  path: '/deals/'
});

export default function DealsPage() {
  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">机场优惠码汇总</span>
        </nav>

        {/* Page Header - Apple Liquid Glass */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 shadow-xs">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
            <Tag className="w-3.5 h-3.5" />
            <span>优惠码与核验状态</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
            当前收录的机场优惠码与使用条件
          </h1>
          <p className="text-sm text-[#64748B] mt-2 max-w-2xl leading-relaxed">
            本页列出站长在结算页核验的优惠码和折扣幅度（{COUPON_DISCOUNT_LABEL}），并逐一注明核验日期；以后新增但还没核验的代码会标为“待核验”。本站不用“限时仅剩1小时”之类的倒计时制造焦虑。
          </p>
        </div>

        {/* Anti-Deception Callout */}
        <div className="p-5 rounded-2xl bg-[#F0F5F9] border border-[#CBD5E1] text-xs text-[#475569] leading-relaxed mb-8 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#17233A]">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>特别准则：推广链接参数 vs 真实优惠码</span>
          </div>
          <p>
            很多推荐站将推广链接末尾的 <code className="text-[#6378EA] font-semibold">?code=xxxx</code> 当作优惠码宣传。在此郑重说明：该参数仅用于标识推荐人归属，通常不能在购物车中减免任何金额。本页的优惠码需要在结算页的优惠码输入框里填写，能否抵扣、抵扣多少，以结算页实际显示为准。
          </p>
        </div>

        {/* Coupons */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
            <span>站长提供的优惠码（{COUPONS.length} 个）</span>
          </h2>

          {COUPONS.length === 0 ? (
            <div className="rounded-2xl liquid-glass-card p-6 border border-[#E2E8F0] space-y-1.5 text-xs sm:text-sm text-[#475569] leading-relaxed">
              <div className="font-bold text-[#17233A]">目前没有通过结算页核实的优惠码</div>
              <p>
                本站不把未核实的代码写成可用优惠，所以这里暂不列出任何折扣码。购买时请以结算页显示的实付金额为准。
              </p>
            </div>
          ) : (
            <CouponTable />
          )}
        </div>

        {/* Verification Policy */}
        <div className="mt-12 p-6 rounded-2xl liquid-glass border border-[#E2E8F0] space-y-3 text-xs text-[#64748B]">
          <h3 className="font-bold text-[#17233A] text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#6378EA]" />
            <span>优惠核验与失效处理准则</span>
          </h3>
          <p>
            1. 优惠码与折扣幅度由站长在服务商结算页实际输入核验并注明日期；新收录的代码在核验前标记为“待核验”。<br />
            2. 若读者发现某个代码已失效，可发送邮件至纠错信箱，本站核查后标记失效并移出有效清单。<br />
            3. 本站不使用虚假倒计时脚本，所有优惠信息以服务商结算页最终承兑为准。
          </p>
        </div>

      </div>
    </div>
  );
}
