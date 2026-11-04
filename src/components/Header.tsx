'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SocialIcons from '@/components/SocialIcons';
import { NAV_LINKS, SITE_META } from '@/data/site';
import { Menu, X, ShieldCheck, Compass, Zap } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand Name - Apple Minimalist */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6378EA] via-[#9BB7CF] to-[#17233A] p-0.5 shadow-sm shadow-[#6378EA]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#6378EA]" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-[#17233A] group-hover:text-[#6378EA] transition-colors">
              {SITE_META.name}
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-[#F0F5F9] text-[#475569] border border-[#CBD5E1]/60 font-medium">
              34 家资料库
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.slice(0, 6).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-[#475569] hover:text-[#17233A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/editorial-policy/"
            className="flex items-center gap-1.5 ml-2 px-3 py-1.5 text-xs font-semibold text-[#6378EA] bg-[#F0F5F9] hover:bg-[#E2E8F0] border border-[#9BB7CF]/40 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>推荐依据与核验</span>
          </Link>
          <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-[#E2E8F0]">
            <SocialIcons />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/airports/"
            className="p-2 text-xs text-[#6378EA] bg-[#F0F5F9] rounded-lg border border-[#CBD5E1]"
            aria-label="浏览目录"
          >
            <Compass className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#475569] hover:text-[#17233A] focus:outline-none"
            aria-label="切换菜单"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Apple Liquid Glass */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="text-xs font-semibold text-[#94A3B8] px-3 py-1 uppercase tracking-wider">网站导航</div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#17233A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2 px-3">
            <SocialIcons variant="row" />
          </div>
          <div className="pt-2 border-t border-[#E2E8F0]">
            <div className="px-3 py-2 text-xs text-[#64748B] leading-relaxed">
              {SITE_META.ranking_disclosure}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
