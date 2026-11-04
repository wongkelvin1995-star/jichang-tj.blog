import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AccountCenter from '@/components/account/AccountCenter';
import { buildMetadata } from '@/lib/metadata';
import { User } from 'lucide-react';

// 个人中心是私人页面：noindex，不进 sitemap；数据只在访客自己的浏览器里
export const metadata: Metadata = {
  ...buildMetadata({
    title: '个人中心',
    description: '收藏的机场和文章、对比列表、阅读记录与资料设置，只保存在当前浏览器。',
    path: '/account/'
  }),
  robots: { index: false, follow: false }
};

export default function AccountPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <nav className="text-xs text-[#64748B] flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">个人中心</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0F5F9] border border-[#CBD5E1] flex items-center justify-center text-[#6378EA]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#17233A] tracking-tight">个人中心</h1>
            <p className="text-xs text-[#64748B]">收藏、对比、阅读记录和资料设置</p>
          </div>
        </div>

        <AccountCenter />
      </div>
    </div>
  );
}
