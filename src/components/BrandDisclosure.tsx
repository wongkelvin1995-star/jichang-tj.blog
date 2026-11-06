import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { VERIFICATION } from '@/data/verification';

/**
 * 品牌页的“资料与披露”：实测状态、资料引用、价格核验、商业合作四行，是全站统一的口径（2026-11-06）。
 * 其余位置不再重复这些说明；改口径只改这里。
 */
export default function BrandDisclosure({
  brandName,
  dataDate,
  testDate
}: {
  brandName: string;
  /** 资料整理日期 */
  dataDate: string;
  /** 站长提供的检测记录日期；没有记录传 null */
  testDate: string | null;
}) {
  return (
    <section id="disclosure" className="rounded-2xl border border-[#CBD5E1] bg-[#F0F5F9]/70 p-5 space-y-3 scroll-mt-24">
      <h2 className="flex items-center gap-2 text-base font-bold text-[#17233A]">
        <ShieldCheck className="h-4 w-4 text-[#6378EA]" />
        <span>资料与披露</span>
      </h2>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-xs leading-relaxed text-[#475569] sm:grid-cols-[5.5rem_1fr] sm:text-sm">
        <dt className="font-semibold text-[#17233A]">实测状态</dt>
        <dd>
          {testDate ? (
            <>
              有站长提供的检测记录（{testDate}），不含下载速度和晚高峰，见<a href="#tests" className="font-semibold text-[#6378EA]">下方记录</a>和<Link href="/speed-lab/" className="font-semibold text-[#6378EA]">测速实验室</Link>。
            </>
          ) : (
            <>
              本站没有{brandName}的测速记录，方法见<Link href="/speed-lab/" className="font-semibold text-[#6378EA]">测速实验室</Link>。
            </>
          )}
        </dd>
        <dt className="font-semibold text-[#17233A]">资料引用</dt>
        <dd>线路、倍率、设备数、限速、客服与退款取自站长提供的机场资料（{dataDate} 整理），本站没有验证。</dd>
        <dt className="font-semibold text-[#17233A]">价格核验</dt>
        <dd>价格和优惠码由站长于 {VERIFICATION.verified_on} 在结算页核验（站长的声明，本站没有独立核验），以结算页为准。</dd>
        <dt className="font-semibold text-[#17233A]">商业合作</dt>
        <dd>
          本站不是{brandName}官方网站；注册入口是推广链接，本站获得佣金，价格不变，链接里的 code= 不是折扣码，详见<Link href="/disclosure/" className="font-semibold text-[#6378EA]">推广说明</Link>。
        </dd>
      </dl>
    </section>
  );
}
