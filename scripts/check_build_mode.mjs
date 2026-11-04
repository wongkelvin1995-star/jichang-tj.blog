// 构建后自检：构建产物的索引指令必须和构建模式一致（2026-11-04 审计 P0-2）。
//
// 规则见 src/lib/env.ts：
//   没设 NEXT_PUBLIC_APP_ENV，或设为 production  →  正式构建：页面 index, follow，robots.txt 允许抓取，不显示预览横幅
//   设成其他值（例如 preview）                     →  预览构建：页面 noindex, nofollow，robots.txt 为 Disallow: /，显示预览横幅
//
// package.json 的 build 脚本在 next build 之后自动运行本脚本；也可以单独运行：node scripts/check_build_mode.mjs
// 任何一项和规则对不上就退出码 1，让构建失败，避免悄悄把全站 noindex 的站发布到正式域名。
import fs from 'node:fs';
import path from 'node:path';

const appDir = path.join(process.cwd(), '.next', 'server', 'app');
const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
const expectPreview = Boolean(appEnv) && appEnv !== 'production';
const read = (file) => {
  const full = path.join(appDir, file);
  return fs.existsSync(full) ? fs.readFileSync(full, 'utf-8') : null;
};

const indexHtml = read('index.html');
if (indexHtml === null) {
  console.warn('⚠ 找不到 .next/server/app/index.html，无法核对构建模式（Next.js 的输出结构可能变了），请手动检查首页源码里的 robots 指令。');
  process.exit(0);
}

const problems = [];
const homeRobots = (indexHtml.match(/<meta name="robots" content="([^"]*)"/) || [])[1] ?? '（没有 robots 标签）';
const expectedRobots = expectPreview ? 'noindex, nofollow' : 'index, follow';
if (homeRobots !== expectedRobots) {
  problems.push(`首页的 robots 指令是“${homeRobots}”，这种构建应该是“${expectedRobots}”`);
}

const hasBanner = indexHtml.includes('预览环境，未开放搜索引擎收录');
if (hasBanner !== expectPreview) {
  problems.push(expectPreview ? '预览构建应该显示预览横幅，但没有' : '正式构建不应该显示预览横幅，但页面上有');
}

const robotsTxt = read('robots.txt.body');
if (robotsTxt !== null) {
  const blocksAll = /^Disallow:\s*\/\s*$/m.test(robotsTxt);
  if (blocksAll !== expectPreview) {
    problems.push(expectPreview ? 'robots.txt 应该是“Disallow: /”，但没有' : 'robots.txt 把整站都禁止抓取了（Disallow: /），正式构建不应该这样');
  }
  if (!expectPreview && !robotsTxt.includes('Sitemap: ')) {
    problems.push('robots.txt 没有声明 sitemap');
  }
}

if (problems.length > 0) {
  console.error('✗ 构建产物与构建模式不一致：');
  problems.forEach((p) => console.error(`  - ${p}`));
  console.error(
    `  当前 NEXT_PUBLIC_APP_ENV=${appEnv === undefined ? '（没设）' : JSON.stringify(appEnv)}，按规则这是${expectPreview ? '预览构建' : '正式构建'}。` +
      '正式站不需要设任何变量；预览站才设 NEXT_PUBLIC_APP_ENV=preview。'
  );
  process.exit(1);
}

if (expectPreview) {
  console.log(`✓ 构建模式：预览构建（NEXT_PUBLIC_APP_ENV=${appEnv}），全站 noindex、robots.txt 禁止抓取。不要把这份构建部署到正式域名。`);
} else {
  console.log('✓ 构建模式：正式构建，首页 index, follow，robots.txt 允许抓取并声明 sitemap，没有预览横幅。');
}
