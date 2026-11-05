import { MetadataRoute } from 'next';
import { SITE_META } from '@/data/site';
import { IS_INDEXABLE } from '@/lib/env';

// 静态导出（Cloudflare Pages）要求这类路由声明为静态；普通构建里它本来就是静态的，不受影响
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    // 预览站、测试站和本地开发：禁止抓取，避免还没上线的页面被收录（规则见 src/lib/env.ts）
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // 正式站的 robots 配置：`next build` 默认就是这个，不需要设环境变量
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE_META.url}/sitemap.xml`,
  };
}
