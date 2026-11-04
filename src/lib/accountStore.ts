'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * 个人中心的本地数据层：全部存在当前浏览器的 localStorage，不上传、不跨设备同步。
 * 本站没有账号系统和后端接口，页面上必须注明“仅保存在当前浏览器”，不能冒充云同步。
 */
export type HistoryType = 'airport' | 'article';

export interface HistoryItem {
  type: HistoryType;
  id: string;
  title: string;
  href: string;
  at: number;
}

export interface AccountState {
  profile: { nickname: string; email: string; avatarText: string };
  favorites: { airports: string[]; articles: string[] };
  compare: string[];
  history: HistoryItem[];
  settings: { trackHistory: boolean };
  updatedAt: number | null;
}

export const STORAGE_KEY = 'jichang-tj.account.v1';
export const COMPARE_LIMIT = 4;
export const HISTORY_LIMIT = 50;
const CHANGE_EVENT = 'jichang-account-change';

export const EMPTY_STATE: AccountState = {
  profile: { nickname: '', email: '', avatarText: '' },
  favorites: { airports: [], articles: [] },
  compare: [],
  history: [],
  settings: { trackHistory: true },
  updatedAt: null
};

export const STORAGE_UNAVAILABLE = '无法使用本浏览器的本地存储（可能是隐私模式或禁用了站点数据），个人中心暂时无法保存。';

export function readAccount(): { state: AccountState; error: string | null } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { state: EMPTY_STATE, error: null };
    const parsed = JSON.parse(raw) as Partial<AccountState>;
    return {
      state: {
        ...EMPTY_STATE,
        ...parsed,
        profile: { ...EMPTY_STATE.profile, ...(parsed.profile ?? {}) },
        favorites: { ...EMPTY_STATE.favorites, ...(parsed.favorites ?? {}) },
        settings: { ...EMPTY_STATE.settings, ...(parsed.settings ?? {}) },
        compare: parsed.compare ?? [],
        history: parsed.history ?? []
      },
      error: null
    };
  } catch {
    return { state: EMPTY_STATE, error: STORAGE_UNAVAILABLE };
  }
}

export function writeAccount(state: AccountState): string | null {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, updatedAt: Date.now() }));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return null;
  } catch {
    return STORAGE_UNAVAILABLE;
  }
}

export function clearAccount(): string | null {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return null;
  } catch {
    return STORAGE_UNAVAILABLE;
  }
}

/** 读取 + 订阅变化；ready 为 false 时表示还没读到本地数据（用于显示加载状态） */
export function useAccount() {
  const [state, setState] = useState<AccountState>(EMPTY_STATE);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const result = readAccount();
      setState(result.state);
      setError(result.error);
      setReady(true);
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const update = useCallback((mutate: (current: AccountState) => AccountState): string | null => {
    const current = readAccount();
    if (current.error) {
      setError(current.error);
      return current.error;
    }
    const err = writeAccount(mutate(current.state));
    if (err) setError(err);
    return err;
  }, []);

  return { state, ready, error, update };
}

export function recordVisit(item: Omit<HistoryItem, 'at'>): void {
  const current = readAccount();
  if (current.error || !current.state.settings.trackHistory) return;
  const rest = current.state.history.filter((h) => !(h.type === item.type && h.id === item.id));
  writeAccount({ ...current.state, history: [{ ...item, at: Date.now() }, ...rest].slice(0, HISTORY_LIMIT) });
}

export function formatRelativeTime(at: number): string {
  const diff = Date.now() - at;
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} 天前`;
  return new Date(at).toISOString().slice(0, 10);
}
