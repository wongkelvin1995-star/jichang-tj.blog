'use client';

import React, { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { BRANDS } from '@/data/brands';
import { getCouponsByBrandId } from '@/data/coupons';
import { fmtPerGB, fmtYuan } from '@/data/format';
import { CYCLE_LABELS, getDeviceCaps, getPriceFacts } from '@/data/priceFacts';
import { SITE_META } from '@/data/site';
import { VERIFICATION } from '@/data/verification';
import {
  COMPARE_LIMIT,
  clearAccount,
  formatRelativeTime,
  useAccount,
  type AccountState
} from '@/lib/accountStore';
import {
  LayoutDashboard,
  Heart,
  GitCompare,
  History,
  MessageSquare,
  Bell,
  Settings,
  Trash2,
  X,
  ArrowRight,
  AlertCircle,
  Loader2,
  Download,
  Mail,
  Plus,
  ExternalLink,
  Info
} from 'lucide-react';

type SectionId = 'overview' | 'favorites' | 'compare' | 'history' | 'comments' | 'messages' | 'settings';

const SECTIONS: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: '账户概览', icon: LayoutDashboard },
  { id: 'favorites', label: '我的收藏', icon: Heart },
  { id: 'compare', label: '机场对比', icon: GitCompare },
  { id: 'history', label: '阅读记录', icon: History },
  { id: 'comments', label: '评论与反馈', icon: MessageSquare },
  { id: 'messages', label: '消息与订阅', icon: Bell },
  { id: 'settings', label: '账户设置', icon: Settings }
];

const CONTACT_EMAIL = SITE_META.correction_contact.split('（')[0];

const card = 'liquid-glass-card rounded-2xl p-5 sm:p-6 border border-[#E2E8F0] space-y-4';
const primaryBtn = 'inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#6378EA] hover:bg-[#4F64D6] transition-colors disabled:opacity-50';
const ghostBtn = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#475569] bg-white border border-[#CBD5E1] hover:text-[#17233A] hover:border-[#9BB7CF] transition-colors disabled:opacity-50';
const dangerBtn = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-white border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50';
const input = 'w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-sm text-[#17233A] focus:border-[#6378EA] focus:outline-none';

function readHash(): SectionId {
  const hash = window.location.hash.replace('#', '') as SectionId;
  return SECTIONS.some((s) => s.id === hash) ? hash : 'overview';
}

/** 地址栏 # 后面的部分就是当前页签：用 useSyncExternalStore 订阅它，不在 effect 里调用 setState */
function subscribeHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

function Avatar({ state, size = 'md' }: { state: AccountState; size?: 'md' | 'lg' }) {
  const text = state.profile.avatarText.trim() || state.profile.nickname.trim().slice(0, 1) || '访';
  const dim = size === 'lg' ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-lg';
  return (
    <div className={`${dim} rounded-2xl bg-gradient-to-tr from-[#6378EA] via-[#9BB7CF] to-[#17233A] p-0.5 shrink-0`}>
      <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-[#6378EA]">
        {text.slice(0, 2)}
      </div>
    </div>
  );
}

function EmptyState({ title, text, actions }: { title: string; text: string; actions?: { label: string; href: string }[] }) {
  return (
    <div className="p-6 rounded-xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] text-center space-y-2">
      <div className="font-bold text-[#17233A]">{title}</div>
      <p className="text-xs text-[#64748B] leading-relaxed">{text}</p>
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {actions.map((a) => (
            <Link key={a.href} href={a.href} className={ghostBtn}>
              <span>{a.label}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Notice({ text, tone = 'info' }: { text: string; tone?: 'info' | 'warn' | 'ok' }) {
  const cls = tone === 'warn' ? 'bg-amber-50/70 border-amber-200 text-amber-800' : tone === 'ok' ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' : 'bg-[#F0F5F9] border-[#CBD5E1] text-[#475569]';
  return (
    <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${cls}`} role="status">
      {tone === 'warn' ? <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <Info className="w-4 h-4 shrink-0 mt-0.5" />}
      <span>{text}</span>
    </div>
  );
}

export default function AccountCenter() {
  const { state, ready, error, update } = useAccount();
  // 服务端和首次渲染都是“账户概览”，挂载后按地址栏的 # 更新
  const active = useSyncExternalStore<SectionId>(subscribeHash, readHash, () => 'overview');
  const [flash, setFlash] = useState<{ text: string; tone: 'ok' | 'warn' } | null>(null);

  const go = (id: SectionId) => {
    setFlash(null);
    window.history.replaceState(null, '', `#${id}`);
    // replaceState 不会触发 hashchange，手动通知订阅者重新读取地址栏
    window.dispatchEvent(new Event('hashchange'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const notify = (err: string | null, okText: string) => setFlash(err ? { text: err, tone: 'warn' } : { text: okText, tone: 'ok' });

  const favoriteAirports = useMemo(() => state.favorites.airports.map((id) => BRANDS.find((b) => b.id === id)).filter((b): b is (typeof BRANDS)[number] => Boolean(b)), [state.favorites.airports]);
  const favoriteArticles = useMemo(() => state.favorites.articles.map((slug) => ARTICLES.find((a) => a.slug === slug)).filter((a): a is (typeof ARTICLES)[number] => Boolean(a)), [state.favorites.articles]);
  const compareBrands = useMemo(() => state.compare.map((id) => BRANDS.find((b) => b.id === id)).filter((b): b is (typeof BRANDS)[number] => Boolean(b)), [state.compare]);

  const removeFavorite = (type: 'airport' | 'article', id: string) => {
    const err = update((s) => ({
      ...s,
      favorites: type === 'airport'
        ? { ...s.favorites, airports: s.favorites.airports.filter((x) => x !== id) }
        : { ...s.favorites, articles: s.favorites.articles.filter((x) => x !== id) }
    }));
    notify(err, '已取消收藏');
  };

  const toggleCompare = (id: string) => {
    if (!state.compare.includes(id) && state.compare.length >= COMPARE_LIMIT) {
      setFlash({ text: `对比最多选 ${COMPARE_LIMIT} 家，先移除一家再添加`, tone: 'warn' });
      return;
    }
    const err = update((s) => ({ ...s, compare: s.compare.includes(id) ? s.compare.filter((x) => x !== id) : [...s.compare, id] }));
    notify(err, state.compare.includes(id) ? '已从对比中移除' : '已加入对比');
  };

  return (
    <div className="space-y-6">
      {/* Mobile account card */}
      <div className="lg:hidden liquid-glass rounded-2xl p-5 border border-[#CBD5E1] flex items-center gap-4">
        <Avatar state={state} />
        <div className="min-w-0">
          <div className="font-bold text-[#17233A] truncate">{state.profile.nickname.trim() || '未设置昵称'}</div>
          <div className="text-xs text-[#64748B] truncate">{state.profile.email.trim() || '未填写邮箱'}</div>
          <div className="text-[11px] text-[#94A3B8] mt-0.5">收藏 {favoriteAirports.length + favoriteArticles.length} · 对比 {compareBrands.length} · 记录 {state.history.length}</div>
        </div>
      </div>

      {/* Mobile compact nav */}
      <nav className="lg:hidden -mx-4 px-4 overflow-x-auto" aria-label="个人中心导航">
        <div className="flex gap-2 w-max pb-1">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${active === id ? 'bg-[#6378EA] text-white border-[#6378EA]' : 'bg-white text-[#475569] border-[#CBD5E1]'}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Desktop left nav */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 liquid-glass rounded-2xl p-4 border border-[#CBD5E1] space-y-4">
            <div className="flex items-center gap-3">
              <Avatar state={state} />
              <div className="min-w-0">
                <div className="font-bold text-[#17233A] truncate">{state.profile.nickname.trim() || '未设置昵称'}</div>
                <div className="text-xs text-[#64748B] truncate">{state.profile.email.trim() || '未填写邮箱'}</div>
              </div>
            </div>
            <ul className="space-y-1">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => go(id)}
                    aria-current={active === id ? 'page' : undefined}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${active === id ? 'bg-[#EBF2F7] text-[#4F64D6]' : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#17233A]'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-[#94A3B8] leading-relaxed">数据仅保存在当前浏览器，不会上传，也不会在其他设备同步。</p>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-9 space-y-4">
          <Notice text="个人中心的收藏、对比、阅读记录和资料只保存在当前浏览器（localStorage），不会上传到服务器，也不会在其他设备同步；清除浏览器站点数据会一起清掉。本站没有账号系统。" />

          {flash && <Notice text={flash.text} tone={flash.tone} />}

          {!ready ? (
            <div className={`${card} flex items-center gap-2 text-sm text-[#64748B]`}>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>正在读取本浏览器的数据…</span>
            </div>
          ) : error ? (
            <div className={card}>
              <Notice text={error} tone="warn" />
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => window.location.reload()} className={ghostBtn}>重试</button>
                <Link href="/airports/" className={ghostBtn}>浏览机场 <ArrowRight className="w-3 h-3" /></Link>
              </div>
            </div>
          ) : (
            <>
              {active === 'overview' && (
                <section className={card}>
                  <div className="flex items-start gap-4">
                    <Avatar state={state} size="lg" />
                    <div className="min-w-0 space-y-1">
                      <h2 className="text-xl font-bold text-[#17233A]">{state.profile.nickname.trim() || '未设置昵称'}</h2>
                      <div className="text-sm text-[#64748B]">{state.profile.email.trim() || '未填写邮箱'}</div>
                      <div className="text-xs text-[#94A3B8]">{state.updatedAt ? `最近更新：${formatRelativeTime(state.updatedAt)}` : '还没有保存过任何数据'}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    {[
                      ['收藏的机场', favoriteAirports.length],
                      ['收藏的文章', favoriteArticles.length],
                      ['对比中', compareBrands.length],
                      ['阅读记录', state.history.length]
                    ].map(([label, n]) => (
                      <div key={String(label)} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                        <div className="text-2xl font-extrabold text-[#17233A]">{n}</div>
                        <div className="text-xs text-[#64748B]">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => go('settings')} className={primaryBtn}>编辑资料</button>
                    <button type="button" onClick={() => go('favorites')} className={ghostBtn}>查看收藏</button>
                    <button type="button" onClick={() => go('compare')} className={ghostBtn}>继续对比</button>
                  </div>
                </section>
              )}

              {active === 'favorites' && (
                <FavoritesSection
                  airports={favoriteAirports}
                  articles={favoriteArticles}
                  compare={state.compare}
                  onRemove={removeFavorite}
                  onToggleCompare={toggleCompare}
                />
              )}

              {active === 'compare' && (
                <CompareSection brands={compareBrands} onToggle={toggleCompare} onFlash={setFlash} />
              )}

              {active === 'history' && (
                <section className={card}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-bold text-[#17233A]">阅读记录</h2>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={ghostBtn}
                        onClick={() => {
                          const err = update((s) => ({ ...s, settings: { ...s.settings, trackHistory: !s.settings.trackHistory } }));
                          notify(err, state.settings.trackHistory ? '已关闭阅读记录，之后的浏览不再记录' : '已开启阅读记录');
                        }}
                      >
                        {state.settings.trackHistory ? '关闭记录' : '开启记录'}
                      </button>
                      <button
                        type="button"
                        className={dangerBtn}
                        disabled={state.history.length === 0}
                        onClick={() => {
                          if (!window.confirm('清空全部阅读记录？')) return;
                          const err = update((s) => ({ ...s, history: [] }));
                          notify(err, '已清空阅读记录');
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        清空
                      </button>
                    </div>
                  </div>
                  {!state.settings.trackHistory && <Notice text="阅读记录已关闭：浏览品牌页和指南时不再记录。" />}
                  {state.history.length === 0 ? (
                    <EmptyState title="还没有阅读记录" text="浏览过的品牌页和指南会按最近阅读时间列在这里。" actions={[{ label: '浏览机场', href: '/airports/' }, { label: '阅读指南', href: '/#guides' }]} />
                  ) : (
                    <ul className="divide-y divide-[#E2E8F0]">
                      {[...state.history].sort((a, b) => b.at - a.at).map((h) => (
                        <li key={`${h.type}-${h.id}`} className="py-3 flex flex-wrap items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-xs text-[#94A3B8]">{h.type === 'airport' ? '品牌' : '指南'} · {formatRelativeTime(h.at)}</div>
                            <div className="font-semibold text-[#17233A] truncate max-w-[60vw] sm:max-w-md">{h.title}</div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={h.href} className={ghostBtn}>继续阅读 <ArrowRight className="w-3 h-3" /></Link>
                            <button
                              type="button"
                              className={dangerBtn}
                              aria-label={`删除记录：${h.title}`}
                              onClick={() => {
                                const err = update((s) => ({ ...s, history: s.history.filter((x) => !(x.type === h.type && x.id === h.id)) }));
                                notify(err, '已删除这条记录');
                              }}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {active === 'comments' && (
                <section className={card}>
                  <h2 className="text-lg font-bold text-[#17233A]">评论与反馈</h2>
                  <EmptyState
                    title="暂无评论与反馈记录"
                    text="本站还没有评论和反馈接口，暂不开放在站内提交；你提交过的内容和处理状态会在接口上线后显示在这里。现在要反馈价格或规则变化，可以直接发邮件。"
                  />
                  <a href={`mailto:${CONTACT_EMAIL}`} className={ghostBtn}>
                    <Mail className="w-3.5 h-3.5" />
                    <span>发邮件反馈：{CONTACT_EMAIL}</span>
                  </a>
                </section>
              )}

              {active === 'messages' && (
                <section className={card}>
                  <h2 className="text-lg font-bold text-[#17233A]">消息与订阅</h2>
                  <EmptyState
                    title="暂无消息"
                    text="本站没有账号系统和邮件服务，回复、反馈进展和网站更新目前不会推送到这里。"
                  />
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-[#17233A] text-sm">邮件提醒</div>
                      <div className="text-xs text-[#64748B]">接入邮件服务后在这里主动开启，随时可取消订阅；现在还不能发送邮件，所以暂不提供开关。</div>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#94A3B8] bg-white border border-[#E2E8F0]">暂不可用</span>
                  </div>
                  <p className="text-xs text-[#64748B]">想第一时间知道价格或优惠码变化，可以加入站长的 Telegram（顶栏图标）。</p>
                </section>
              )}

              {active === 'settings' && <SettingsSection state={state} update={update} notify={notify} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FavoritesSection({
  airports,
  articles,
  compare,
  onRemove,
  onToggleCompare
}: {
  airports: (typeof BRANDS)[number][];
  articles: (typeof ARTICLES)[number][];
  compare: string[];
  onRemove: (type: 'airport' | 'article', id: string) => void;
  onToggleCompare: (id: string) => void;
}) {
  const [tab, setTab] = useState<'airports' | 'articles'>('airports');
  const [airportFilter, setAirportFilter] = useState<'all' | 'fixed' | 'other'>('all');
  const [articleFilter, setArticleFilter] = useState<'all' | 'P0' | 'P1' | 'P2'>('all');

  const shownAirports = airports.filter((b) => airportFilter === 'all' || (airportFilter === 'fixed' ? b.fixed_position : !b.fixed_position));
  const shownArticles = articles.filter((a) => articleFilter === 'all' || a.priority === articleFilter);
  const chip = (on: boolean) => `px-3 py-1 rounded-full text-xs font-semibold border ${on ? 'bg-[#6378EA] text-white border-[#6378EA]' : 'bg-white text-[#475569] border-[#CBD5E1]'}`;

  return (
    <section className={card}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-[#17233A]">我的收藏</h2>
        <div className="flex gap-2">
          <button type="button" className={chip(tab === 'airports')} onClick={() => setTab('airports')}>收藏的机场 {airports.length}</button>
          <button type="button" className={chip(tab === 'articles')} onClick={() => setTab('articles')}>收藏的文章 {articles.length}</button>
        </div>
      </div>

      {tab === 'airports' ? (
        <>
          <div className="flex flex-wrap gap-2">
            {([['all', '全部'], ['fixed', `固定推荐前 ${SITE_META.fixed_editorial_positions} 位`], ['other', '其他']] as const).map(([k, label]) => (
              <button key={k} type="button" className={chip(airportFilter === k)} onClick={() => setAirportFilter(k)}>{label}</button>
            ))}
          </div>
          {airports.length === 0 ? (
            <EmptyState title="还没有收藏机场" text="在任意品牌页点“收藏”，就会出现在这里。" actions={[{ label: '浏览机场', href: '/airports/' }, { label: '看重点推荐', href: '/' }]} />
          ) : shownAirports.length === 0 ? (
            <EmptyState title="这个分类下没有收藏" text="换一个筛选条件试试。" />
          ) : (
            <ul className="divide-y divide-[#E2E8F0]">
              {shownAirports.map((b) => {
                const facts = getPriceFacts(b.id);
                const entry = facts.entryMonthly;
                return (
                  <li key={b.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold flex items-center justify-center border border-[#E2E8F0]">{b.display_rank}</span>
                        <span className="font-bold text-[#17233A]">{b.name}</span>
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5">
                        {entry ? `入门月付 ${entry.name} ${fmtYuan(entry.price)}/月 ${entry.totalGB}GB（${fmtPerGB(entry.perGB)}/GB）` : '价格待补'} · 资料日 {facts.dataDate} · {VERIFICATION.label}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/airports/${b.id}/`} className={ghostBtn}>查看详情 <ArrowRight className="w-3 h-3" /></Link>
                      <button type="button" className={ghostBtn} onClick={() => onToggleCompare(b.id)}>
                        <GitCompare className="w-3.5 h-3.5" />
                        {compare.includes(b.id) ? '移出对比' : '加入对比'}
                      </button>
                      <button type="button" className={dangerBtn} onClick={() => onRemove('airport', b.id)}>取消收藏</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {(['all', 'P0', 'P1', 'P2'] as const).map((k) => (
              <button key={k} type="button" className={chip(articleFilter === k)} onClick={() => setArticleFilter(k)}>{k === 'all' ? '全部' : k}</button>
            ))}
          </div>
          {articles.length === 0 ? (
            <EmptyState title="还没有收藏文章" text="在任意指南页点“收藏”，就会出现在这里。" actions={[{ label: '阅读指南', href: '/#guides' }, { label: '浏览机场', href: '/airports/' }]} />
          ) : shownArticles.length === 0 ? (
            <EmptyState title="这个分类下没有收藏" text="换一个筛选条件试试。" />
          ) : (
            <ul className="divide-y divide-[#E2E8F0]">
              {shownArticles.map((a) => (
                <li key={a.slug} className="py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-bold text-[#17233A]">{a.title}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{a.priority} · 更新 {a.substantive_updated_at ?? a.published_at}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/guides/${a.slug}/`} className={ghostBtn}>阅读 <ArrowRight className="w-3 h-3" /></Link>
                    <button type="button" className={dangerBtn} onClick={() => onRemove('article', a.slug)}>取消收藏</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

function CompareSection({
  brands,
  onToggle,
  onFlash
}: {
  brands: (typeof BRANDS)[number][];
  onToggle: (id: string) => void;
  onFlash: (f: { text: string; tone: 'ok' | 'warn' } | null) => void;
}) {
  const [picker, setPicker] = useState('');
  const [showTable, setShowTable] = useState(false);
  const remaining = BRANDS.filter((b) => !brands.some((x) => x.id === b.id));
  const canCompare = brands.length >= 2;
  const hasSiteCompare = brands.some((b) => b.id === 'lingdongyun') && brands.some((b) => b.id === 'twilight');

  return (
    <section className={card}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-[#17233A]">机场对比（最多 {COMPARE_LIMIT} 家）</h2>
        <button
          type="button"
          className={primaryBtn}
          disabled={!canCompare}
          onClick={() => {
            if (!canCompare) { onFlash({ text: '至少选 2 家才能开始对比', tone: 'warn' }); return; }
            setShowTable(true);
            onFlash(null);
          }}
        >
          <GitCompare className="w-3.5 h-3.5" />
          开始对比
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={picker} onChange={(e) => setPicker(e.target.value)} className={`${input} sm:w-64`} aria-label="选择要添加的机场">
          <option value="">选择要添加的机场…</option>
          {remaining.map((b) => <option key={b.id} value={b.id}>{b.display_rank}. {b.name}</option>)}
        </select>
        <button
          type="button"
          className={ghostBtn}
          disabled={!picker || brands.length >= COMPARE_LIMIT}
          onClick={() => { onToggle(picker); setPicker(''); }}
        >
          <Plus className="w-3.5 h-3.5" />
          添加
        </button>
      </div>

      {brands.length === 0 ? (
        <EmptyState title="还没有选择要对比的机场" text="在品牌页点“加入对比”，或在上面的下拉框里添加，最多 4 家。" actions={[{ label: '浏览机场', href: '/airports/' }, { label: '灵动云 vs 暮光加速', href: '/compare/lingdongyun-vs-twilight/' }]} />
      ) : (
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <span key={b.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F5F9] border border-[#CBD5E1] text-xs font-semibold text-[#17233A]">
              {b.display_rank}. {b.name}
              <button type="button" aria-label={`移除 ${b.name}`} onClick={() => { onToggle(b.id); setShowTable(false); }} className="text-[#94A3B8] hover:text-red-600">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {hasSiteCompare && (
        <Notice text="灵动云和暮光加速有一篇现成的同口径对比文章，可以直接看。" />
      )}
      {hasSiteCompare && (
        <Link href="/compare/lingdongyun-vs-twilight/" className={ghostBtn}>查看灵动云 vs 暮光加速 <ArrowRight className="w-3 h-3" /></Link>
      )}

      {showTable && canCompare && (
        <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] whitespace-nowrap">
                <th className="py-2.5 px-3">对比项</th>
                {brands.map((b) => <th key={b.id} className="py-2.5 px-3 text-[#17233A]">{b.name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {(() => {
                const facts = brands.map((b) => getPriceFacts(b.id));
                const rows: [string, React.ReactNode[]][] = [
                  ['编辑推荐位', brands.map((b) => `第 ${b.display_rank} 位`)],
                  ['入门月付', facts.map((f) => f.entryMonthly ? `${f.entryMonthly.name} ${fmtYuan(f.entryMonthly.price)}/月 · ${f.entryMonthly.totalGB}GB · ${fmtPerGB(f.entryMonthly.perGB)}/GB` : '无')],
                  ['最低年付', facts.map((f) => f.cheapestYearly ? `${f.cheapestYearly.name} ${fmtYuan(f.cheapestYearly.price)}/年 · 每月 ${f.cheapestYearly.monthlyGB}GB · ${fmtPerGB(f.cheapestYearly.perGB)}/GB` : '价格表没有年付')],
                  ['最便宜的一次性流量包', facts.map((f) => f.packs[0] ? `${f.packs[0].name} ${fmtYuan(f.packs[0].price)}/${f.packs[0].totalGB}GB` : '无')],
                  ['付款周期', facts.map((f) => f.cycles.map((c) => CYCLE_LABELS[c]).join('、'))],
                  ['线路资料', facts.map((f) => f.lineNote)],
                  ['倍率 / 设备 / 限速', facts.map((f) => {
                    const caps = getDeviceCaps(f);
                    return caps.length > 0
                      ? `1 倍率、不限速；设备数按站长口径不限，但${caps.map((c) => `${c.name}标了最多 ${c.max} 台`).join('、')}，以结算页为准`
                      : '1 倍率、不限设备、不限速（站长核验口径）';
                  })],
                  ['优惠码', brands.map((b) => { const c = getCouponsByBrandId(b.id)[0]; return c?.coupon_code ? `${c.coupon_code}（${c.discount_value}）` : '无'; })],
                  ['价格资料日 / 核验', facts.map((f) => `${f.dataDate} / ${VERIFICATION.verified_on}`)],
                  ['入口', brands.map((b) => (
                    <span key={b.id} className="flex flex-col gap-1">
                      <Link href={`/airports/${b.id}/`} className="font-semibold text-[#6378EA]">品牌页</Link>
                      <a href={b.affiliate_url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-1 text-[#475569]">注册入口（商业链接）<ExternalLink className="w-3 h-3" /></a>
                    </span>
                  ))]
                ];
                return rows.map(([label, cells]) => (
                  <tr key={label}>
                    <td className="py-2.5 px-3 font-semibold text-[#17233A] whitespace-nowrap">{label}</td>
                    {cells.map((cell, i) => <td key={i} className="py-2.5 px-3 text-[#475569] align-top min-w-[160px]">{cell}</td>)}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      )}
      {showTable && canCompare && (
        <p className="text-[11px] text-[#94A3B8]">数字来自本站价格表，每 GB 按标称流量计算；通过本站链接购买价格与官网相同，佣金由服务商承担，不加价。</p>
      )}
    </section>
  );
}

function SettingsSection({
  state,
  update,
  notify
}: {
  state: AccountState;
  update: (mutate: (s: AccountState) => AccountState) => string | null;
  notify: (err: string | null, okText: string) => void;
}) {
  const [nickname, setNickname] = useState(state.profile.nickname);
  const [email, setEmail] = useState(state.profile.email);
  const [avatarText, setAvatarText] = useState(state.profile.avatarText);
  const [syncedProfile, setSyncedProfile] = useState(state.profile);
  const [saving, setSaving] = useState(false);

  // 保存的资料变了（保存后被截断或去空格、在别的标签页里改了、清除数据），表单跟着更新。
  // 这是 React 文档推荐的“在渲染中同步”写法，不用 effect，避免多渲染一轮。
  if (
    syncedProfile.nickname !== state.profile.nickname ||
    syncedProfile.email !== state.profile.email ||
    syncedProfile.avatarText !== state.profile.avatarText
  ) {
    setSyncedProfile(state.profile);
    setNickname(state.profile.nickname);
    setEmail(state.profile.email);
    setAvatarText(state.profile.avatarText);
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      notify('邮箱格式不对，请检查后再保存', '');
      return;
    }
    setSaving(true);
    const err = update((s) => ({ ...s, profile: { nickname: nickname.trim().slice(0, 20), email: email.trim(), avatarText: avatarText.trim().slice(0, 2) } }));
    setSaving(false);
    notify(err, '已保存，仅保存在当前浏览器');
  };

  const exportData = () => {
    try {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jichang-tj-account-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      notify(null, '已导出 JSON 文件');
    } catch {
      notify('导出失败，浏览器不允许下载', '');
    }
  };

  const clearAll = () => {
    if (!window.confirm('清除本浏览器里的个人中心数据（资料、收藏、对比、阅读记录）？此操作不可恢复。')) return;
    const err = clearAccount();
    notify(err, '已清除本浏览器的个人中心数据');
  };

  return (
    <section className={card}>
      <h2 className="text-lg font-bold text-[#17233A]">账户设置</h2>
      <form onSubmit={save} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="text-xs text-[#64748B] space-y-1">
            <span>昵称（最多 20 字）</span>
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={20} className={input} placeholder="例如：小王" />
          </label>
          <label className="text-xs text-[#64748B] space-y-1">
            <span>邮箱（只保存在本浏览器，不会发送任何邮件）</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={input} placeholder="name@example.com" />
          </label>
          <label className="text-xs text-[#64748B] space-y-1">
            <span>头像文字（1–2 个字）</span>
            <input value={avatarText} onChange={(e) => setAvatarText(e.target.value)} maxLength={2} className={input} placeholder="例如：王" />
          </label>
        </div>
        <button type="submit" disabled={saving} className={primaryBtn}>{saving ? '保存中…' : '保存资料'}</button>
      </form>

      <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
        <div className="font-semibold text-[#17233A] text-sm">密码与登录方式</div>
        <p className="text-xs text-[#64748B] leading-relaxed">本站没有账号系统，不设密码，也没有第三方登录；个人中心的一切都只在当前浏览器里。换浏览器或清除站点数据后，这里会回到空白。</p>
      </div>

      <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
        <div className="font-semibold text-[#17233A] text-sm">数据</div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={ghostBtn} onClick={exportData}>
            <Download className="w-3.5 h-3.5" />
            导出为 JSON
          </button>
          <button type="button" className={dangerBtn} onClick={clearAll}>
            <Trash2 className="w-3.5 h-3.5" />
            清除数据并退出
          </button>
        </div>
      </div>
    </section>
  );
}
