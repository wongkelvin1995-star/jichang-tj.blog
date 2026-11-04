'use client';

import { useEffect } from 'react';
import { recordVisit, type HistoryType } from '@/lib/accountStore';

/** 记录一次阅读到本浏览器的阅读记录；用户在个人中心关闭记录后不再写入。 */
export default function HistoryTracker({ type, id, title, href }: { type: HistoryType; id: string; title: string; href: string }) {
  useEffect(() => {
    recordVisit({ type, id, title, href });
  }, [type, id, title, href]);
  return null;
}
