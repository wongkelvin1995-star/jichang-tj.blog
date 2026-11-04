import React from 'react';
import Link from 'next/link';
import { DollarSign, Clock, PackageCheck, Tag, ArrowUpRight, Bot, BadgePercent } from 'lucide-react';

export default function NeedsNavigator() {
  const needs = [
    {
      id: "budget",
      title: "便宜机场怎么比较",
      subtitle: "按明确预算核对付款与额度",
      desc: "按月预算、年预算和流量包预算，列出价格表里的全部档位和妥协点，不只看年付折合的表面便宜。",
      icon: DollarSign,
      color: "bg-[#F0F5F9] text-[#6378EA] border-[#CBD5E1]",
      href: "/guides/low-budget-plans/",
      badge: "预算分档"
    },
    {
      id: "billing",
      title: "比较付款周期",
      subtitle: "单月试水 vs 全年包月 vs 长期保活",
      desc: "月付买灵活性随时止损，年付换单位折扣，按量计费保障长期低频可用。",
      icon: Clock,
      color: "bg-[#F0F5F9] text-[#4F64D6] border-[#CBD5E1]",
      href: "/guides/billing-and-traffic-rules/",
      badge: "周期解析"
    },
    {
      id: "traffic",
      title: "偶尔使用怎么选",
      subtitle: "按月买、年付小包与一次性流量包",
      desc: "出海频率低？按价格表的最低价，算出三种低频方案在一年里用 1 到 12 个月的总支出。",
      icon: PackageCheck,
      color: "bg-[#F0F5F9] text-[#6378EA] border-[#CBD5E1]",
      href: "/guides/occasional-use/",
      badge: "轻度使用"
    },
    {
      id: "deals",
      title: "核对有效优惠",
      subtitle: "真实活动条件、折扣码与到期核验",
      desc: "严格拆分推广邀请代码与真实折扣券，核对适用套餐与门槛，拒绝假倒计时。",
      icon: Tag,
      color: "bg-[#F0F5F9] text-[#4F64D6] border-[#CBD5E1]",
      href: "/deals/",
      badge: "优惠核对"
    },
    {
      id: "ai",
      title: "用 AI 工具怎么选",
      subtitle: "ChatGPT、Claude、Gemini 用户的选档与自测",
      desc: "AI 对话流量很小，关键是出口地区可用、登录稳定；教你十分钟自己确认一家能不能用。",
      icon: Bot,
      color: "bg-[#F0F5F9] text-[#6378EA] border-[#CBD5E1]",
      href: "/guides/ai-users/",
      badge: "AI 用户"
    },
    {
      id: "value",
      title: "性价比机场怎么选",
      subtitle: "按用量算每 GB 单价，再看付款风险",
      desc: "最便宜不等于最划算：先估用量，再比每 GB 单价和折扣阶梯；想自己算真实单价，看每 GB 成本指南。",
      icon: BadgePercent,
      color: "bg-[#F0F5F9] text-[#4F64D6] border-[#CBD5E1]",
      href: "/guides/value-for-money/",
      badge: "算账"
    }
  ];

  return (
    <section className="py-16 border-y border-[#E2E8F0]/80 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
            STEP 1 · 需求导航
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
            先确定你最在意什么
          </h2>
          <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
            不要一上来就看五花八门的节点名称，先根据自己的钱包预算和使用习惯确定比较方向。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {needs.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative rounded-2xl liquid-glass p-6 border border-[#E2E8F0] hover:border-[#9BB7CF] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6378EA]/10"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${item.color} border flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]/80 group-hover:text-[#17233A] transition-colors">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#17233A] group-hover:text-[#6378EA] transition-colors">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#6378EA] transition-colors" />
                  </div>
                  <div className="text-xs font-semibold text-[#4F64D6]">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
