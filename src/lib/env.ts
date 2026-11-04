/**
 * 站点是否允许搜索引擎收录（构建时确定，2026-11-04 审计 P0-2）。
 *
 * - 显式设置了 NEXT_PUBLIC_APP_ENV：只有 production 允许收录，其他值（preview、staging 等）一律不收录。
 * - 没设置：看 NODE_ENV。`next build` 和 `next start` 是 production，允许收录；`next dev` 不允许。
 *
 * 所以正式构建不需要设任何变量，忘了设也不会把正式站静默构建成全站 noindex；
 * 预览站、测试站要显式设置 NEXT_PUBLIC_APP_ENV=preview。
 * scripts/check_build_mode.mjs 在 `npm run build` 之后核对产物与这条规则一致，
 * scripts/audit_site.mjs 遇到 noindex 构建会直接报错，部署后用 scripts/verify_live.mjs 在线上再核对一遍。
 */
const appEnv = process.env.NEXT_PUBLIC_APP_ENV;

export const IS_INDEXABLE: boolean = appEnv ? appEnv === 'production' : process.env.NODE_ENV === 'production';
