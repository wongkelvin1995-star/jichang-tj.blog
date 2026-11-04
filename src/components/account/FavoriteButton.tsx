'use client';

import React, { useState } from 'react';
import { COMPARE_LIMIT, useAccount, type HistoryType } from '@/lib/accountStore';
import { Heart, GitCompare } from 'lucide-react';

/** 品牌页 / 指南页的收藏与加入对比按钮；状态只保存在当前浏览器。 */
export default function FavoriteButton({ type, id }: { type: HistoryType; id: string }) {
  const { state, ready, error, update } = useAccount();
  const [message, setMessage] = useState<string | null>(null);
  const favorites = type === 'airport' ? state.favorites.airports : state.favorites.articles;
  const isFavorite = favorites.includes(id);
  const inCompare = type === 'airport' && state.compare.includes(id);

  const toggleFavorite = () => {
    const err = update((s) => {
      const list = type === 'airport' ? s.favorites.airports : s.favorites.articles;
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      return {
        ...s,
        favorites: type === 'airport' ? { ...s.favorites, airports: next } : { ...s.favorites, articles: next }
      };
    });
    setMessage(err ?? (isFavorite ? '已取消收藏' : '已收藏，仅保存在当前浏览器'));
  };

  const toggleCompare = () => {
    if (!inCompare && state.compare.length >= COMPARE_LIMIT) {
      setMessage(`对比最多选 ${COMPARE_LIMIT} 家，先在个人中心移除一家`);
      return;
    }
    const err = update((s) => ({
      ...s,
      compare: s.compare.includes(id) ? s.compare.filter((x) => x !== id) : [...s.compare, id]
    }));
    setMessage(err ?? (inCompare ? '已从对比中移除' : '已加入对比，到个人中心开始对比'));
  };

  const buttonClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
      active
        ? 'bg-[#EBF2F7] border-[#9BB7CF] text-[#4F64D6]'
        : 'bg-white border-[#CBD5E1] text-[#475569] hover:text-[#17233A] hover:border-[#9BB7CF]'
    } disabled:opacity-50`;

  return (
    <div className="flex flex-col items-start sm:items-end gap-1">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={toggleFavorite} disabled={!ready} className={buttonClass(isFavorite)} aria-pressed={isFavorite}>
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          <span>{isFavorite ? '已收藏' : '收藏'}</span>
        </button>
        {type === 'airport' && (
          <button type="button" onClick={toggleCompare} disabled={!ready} className={buttonClass(inCompare)} aria-pressed={inCompare}>
            <GitCompare className="w-3.5 h-3.5" />
            <span>{inCompare ? '已在对比中' : '加入对比'}</span>
          </button>
        )}
      </div>
      {(message || error) && (
        <span className={`text-[11px] ${error ? 'text-amber-700' : 'text-[#64748B]'}`} role="status">
          {error ?? message}
        </span>
      )}
    </div>
  );
}
