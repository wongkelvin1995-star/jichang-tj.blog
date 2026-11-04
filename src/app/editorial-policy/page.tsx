import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';
import { ShieldCheck, Mail } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: '编辑准则与推荐依据说明',
  description: '详细说明本站34家机场目录的编辑展示次序、测试定义边界、商业推广关系与事实核验标准。',
  path: '/editorial-policy/'
});

export default function EditorialPolicyPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-[#64748B] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="text-[#6378EA] font-semibold">编辑准则与推荐依据</span>
        </nav>

        {/* Header */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] mb-8 shadow-xs">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#6378EA] mb-2 px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#CBD5E1]/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>透明度宣言</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233A] tracking-tight">
            编辑准则、推荐依据与事实核查说明
          </h1>
          <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
            本站致力于为出海网络消费者提供有依据、可复核、不弄虚作假的购买决策支持。以下为本站在排序、评测、商业合作与数据呈现上的公开承诺。
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm text-[#475569] leading-relaxed">
          
          {/* Section 1: 推荐展示顺序 */}
          <section className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <span className="text-[#6378EA]">01</span>
              <span>目录展示顺序的定义与口径</span>
            </h2>
            <p>
              本站全站 34 家品牌名录所采用的顺序为<strong>【编辑推荐展示顺序】</strong>。
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-[#64748B]">
              <li>
                <strong className="text-[#17233A]">前 {SITE_META.fixed_editorial_positions} 位为固定推荐安排：</strong>
                依次为{BRANDS.filter((b) => b.fixed_position).map((b) => b.name).join('、')}。其中灵动云在首屏设立独立旗舰舱。
              </li>
              <li>
                <strong className="text-[#17233A]">后 {SITE_META.brand_count - SITE_META.fixed_editorial_positions} 位保持登记表稳定顺序：</strong>
                不随页面刷新随意打乱，保证读者检索的稳定性。
              </li>
              <li>
                <strong className="text-[#17233A]">绝非独立测速或销量绝对排名：</strong>
                排序属于编辑推荐安排，包含商业推广合作，不代表技术性能的高低先后。
              </li>
            </ul>
          </section>

          {/* Section 2: 事实核验与拒绝虚假数据 */}
          <section className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <span className="text-[#6378EA]">02</span>
              <span>事实核验与拒绝虚构数据承诺</span>
            </h2>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs space-y-1.5 text-[#475569]">
              <div>1. <strong>不造空假评测：</strong>未完成实测或无一手资料的品牌，诚实保留为草稿台账，不以套话拼接伪装完整测评；</div>
              <div>2. <strong>不写虚构数字：</strong>价格须在结算页核验并注明核验日期，节点数量、晚高峰延迟等没有资料的项目标记为“未确认”，不用 0 元或假低价占位；</div>
              <div>3. <strong>不搞伪限时倒计时：</strong>优惠信息仅收录可承兑折扣代码，不利用网页脚本伪造紧急倒计时。</div>
            </div>
          </section>

          {/* Section 3: 商业合作与推广关系 */}
          <section className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <span className="text-[#6378EA]">03</span>
              <span>商业合作与推广链接透明度</span>
            </h2>
            <p>
              本站为维持服务器开销与内容编辑，部分服务商链接包含商业推荐标识（如 <code className="text-[#6378EA] font-semibold">?code=xxxx</code>）。当读者通过这些链接注册或订阅时，本站会获得服务商支付的一定比例佣金；佣金由服务商承担，读者的购买价格与直接在官网购买相同，不加价。
            </p>
            <p className="text-xs text-[#64748B]">
              该商业合作<strong>不会增加读者付款时的任何费用</strong>。同时，我们坚决保障编辑分析的独立性，任何品牌若出现重大安全事故或恶意跑路，本站将如实记录警示。
            </p>
          </section>

          {/* Section 4: 纠错与资料提报 */}
          <section className="liquid-glass-card rounded-2xl p-6 border border-[#E2E8F0] space-y-3">
            <h2 className="text-lg font-bold text-[#17233A] flex items-center gap-2">
              <span className="text-[#6378EA]">04</span>
              <span>纠错渠道与数据修订机制</span>
            </h2>
            <p>
              若您发现某家品牌的价格、规则、优惠已发生官方调整，或存在任何事实性错误，欢迎随时向编辑部提报：
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] text-xs flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#6378EA]" />
              <span className="font-semibold text-[#17233A]">纠错联系邮箱：</span>
              <a href="mailto:feedback@jichang-tj.blog" className="text-[#6378EA] hover:underline">
                feedback@jichang-tj.blog
              </a>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
