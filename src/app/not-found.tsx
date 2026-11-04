import React from 'react';
import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full liquid-glass rounded-3xl p-8 border border-[#CBD5E1] text-center space-y-6 shadow-sm">
        
        {/* Visual Badge - Apple Metallic */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#6378EA] via-[#9BB7CF] to-[#17233A] p-0.5 shadow-sm">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
            <span className="text-2xl font-black text-[#6378EA]">404</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[#17233A]">
            页面未找到 (404 Not Found)
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            您访问的路径不存在或已被调整。本站严格返回 HTTP 404 状态码，绝不通过静默重定向掩盖错误。
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-white bg-[#6378EA] hover:bg-[#4F64D6] shadow-xs transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>返回网站首页</span>
          </Link>
          <Link
            href="/airports/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-[#17233A] bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#6378EA]" />
            <span>查阅 34 家机场目录</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
