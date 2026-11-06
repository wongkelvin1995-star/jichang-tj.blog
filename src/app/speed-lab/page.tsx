import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Clock, FileQuestion, Mail } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import JsonLd, { breadcrumbList } from '@/components/JsonLd';
import PendingTestImage from '@/components/PendingTestImage';
import { BRAND_TESTS } from '@/data/brandTests';
import { BRANDS, getBrandById } from '@/data/brands';
import { getArticlesByCategory, getCategory } from '@/data/categories';
import { SITE_META } from '@/data/site';
import { buildMetadata } from '@/lib/metadata';

const category = getCategory('speed-lab');

export const metadata: Metadata = buildMetadata({
  title: category.metaTitle,
  description: category.metaDescription,
  path: category.href
});

/** 记录标准：每条记录必须有的字段，以及缺了怎么在页面上写（不补、不猜） */
const RECORD_FIELDS: { field: string; why: string; missing: string }[] = [
  { field: '测试时间', why: '同一条线路早晚、不同日期的结果可以相差很大，没有时间的结果没法比较。', missing: '没有测试时间的记录不收。' },
  { field: '测试者', why: '知道是谁测的，才能追问细节和更正。', missing: '没有就不收。' },
  { field: '工具名称和版本', why: '同一个名字的工具，不同版本的测法和算法可能不同。', missing: '版本没写明就显示“版本未记录”。' },
  { field: '线路和节点地区', why: '一个订阅里有很多节点，只测了其中几个，就只能说这几个。', missing: '没写明范围的记录不收。' },
  { field: '测试环境', why: '所在城市、运营商、设备、客户端和内核都会影响结果。', missing: '没写明的项显示“未记录”。' },
  { field: '结果', why: '要有原始截图或导出文件，页面只转述图里读得到的内容。', missing: '没有原始依据的数字不收；原图暂时没放到页面上的，标“原图待更新中”。' },
  { field: '限制', why: '这次没测什么、什么条件下不成立，要和结果写在一起。', missing: '由编辑按截图补写“没有测的”，并标明。' }
];

export default function SpeedLabPage() {
  const canonical = `${SITE_META.url}${category.href}`;
  const articles = getArticlesByCategory('speed-lab');
  const recordedIds = new Set(BRAND_TESTS.map((t) => t.brand_id));
  const withoutRecord = BRANDS.filter((b) => !recordedIds.has(b.id));

  return (
    <div className="py-12">
      <JsonLd data={breadcrumbList([{ name: '首页', url: `${SITE_META.url}/` }, { name: '测速实验室', url: canonical }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: category.metaTitle,
          description: category.metaDescription,
          url: canonical,
          inLanguage: 'zh-CN'
        }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-[#64748B]">
          <Link href="/" className="hover:text-[#17233A]">首页</Link>
          <span>/</span>
          <span className="font-semibold text-[#6378EA]">测速实验室</span>
        </nav>

        <header className="liquid-glass mb-8 space-y-3 rounded-3xl border border-[#CBD5E1] p-6 shadow-xs sm:p-8">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#17233A] sm:text-3xl">{category.metaTitle}</h1>
          <p className="text-sm leading-relaxed text-[#475569] sm:text-base">{category.intro}</p>
          <p className="text-xs leading-relaxed text-[#64748B]">
            目前本站只有 {BRAND_TESTS.length} 条站长提供的真实检测记录（{BRANDS.length} 家里的 {recordedIds.size} 家），其余 {withoutRecord.length} 家暂无记录。没有记录不代表线路不好，只代表本站没有依据可写。
          </p>
        </header>

        <section className="mb-10" aria-labelledby="rules">
          <h2 id="rules" className="mb-3 text-lg font-bold text-[#17233A]">实验室的三条规矩</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#475569]">
            <li>只收有原始依据的记录：原始截图、导出文件或日志。没有，就不收，也不写；原图还没放到页面上的，标“原图待更新中”，上传之前只当参考。</li>
            <li>每条记录写明测试时间、测试者、工具和版本、线路和节点地区、测试环境、结果与限制；缺一项就在页面上写“未记录”，不补、不猜。</li>
            <li>不平均、不排名：一次测试就是一次测试，不把不同时间、不同网络的结果算成“平均速度”，也不据此给品牌排名。</li>
          </ol>
        </section>

        <section className="mb-10" aria-labelledby="standard">
          <h2 id="standard" className="mb-3 text-lg font-bold text-[#17233A]">记录标准</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white/80">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]">
                  <th className="px-3 py-2.5 font-semibold">必须记录的项</th>
                  <th className="px-3 py-2.5 font-semibold">为什么要记</th>
                  <th className="px-3 py-2.5 font-semibold">缺了怎么处理</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                {RECORD_FIELDS.map((r) => (
                  <tr key={r.field}>
                    <td className="px-3 py-2.5 align-top font-semibold text-[#17233A]">{r.field}</td>
                    <td className="px-3 py-2.5 align-top">{r.why}</td>
                    <td className="px-3 py-2.5 align-top">{r.missing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 space-y-5" aria-labelledby="records">
          <h2 id="records" className="text-lg font-bold text-[#17233A]">已发布的记录（{BRAND_TESTS.length} 条）</h2>
          {BRAND_TESTS.map((test) => {
            const brand = getBrandById(test.brand_id);
            return (
              <article key={test.title} className="liquid-glass-card space-y-4 rounded-2xl border border-[#E2E8F0] p-5 sm:p-6">
                <h3 className="text-base font-bold text-[#17233A]">{test.title}</h3>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-xs sm:grid-cols-2 sm:text-sm">
                  <div><dt className="inline font-semibold text-[#17233A]">测试时间：</dt><dd className="inline text-[#475569]">{test.tested_at}</dd></div>
                  <div><dt className="inline font-semibold text-[#17233A]">测试者：</dt><dd className="inline text-[#475569]">{test.tester}提供</dd></div>
                  <div><dt className="inline font-semibold text-[#17233A]">工具：</dt><dd className="inline text-[#475569]">{test.tool}</dd></div>
                  <div><dt className="inline font-semibold text-[#17233A]">工具版本：</dt><dd className="inline text-[#475569]">{test.tool_version ?? '版本未记录'}</dd></div>
                  <div><dt className="inline font-semibold text-[#17233A]">线路和节点：</dt><dd className="inline text-[#475569]">{test.scope}</dd></div>
                  <div><dt className="inline font-semibold text-[#17233A]">测试网络：</dt><dd className="inline text-[#475569]">{test.network}</dd></div>
                  <div>
                    <dt className="inline font-semibold text-[#17233A]">设备 / 客户端 / 内核：</dt>
                    <dd className="inline text-[#475569]">
                      {test.environment_extra.device ?? '设备未记录'} / {test.environment_extra.client ?? '客户端未记录'} / {test.environment_extra.core ?? '内核未记录'}
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {test.items_tested.map((item) => (
                    <span key={item} className="rounded-full border border-[#E2E8F0] bg-[#F0F5F9] px-2 py-0.5 text-[#475569]">{item}</span>
                  ))}
                </div>
                {test.image ? (
                  <div className="space-y-1.5">
                    <Image src={test.image.src} width={test.image.width} height={test.image.height} alt={test.image.alt} className="h-auto w-full max-w-md rounded-xl border border-[#E2E8F0]" />
                    <a href={test.image.src} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#6378EA] hover:text-[#4F64D6]">查看原图 →</a>
                  </div>
                ) : (
                  <PendingTestImage />
                )}
                <div className="grid grid-cols-1 gap-4 text-xs sm:text-sm md:grid-cols-2">
                  <div className="space-y-1.5">
                    <div className="font-bold text-[#17233A]">{test.image ? '图中显示' : '记录里显示'}</div>
                    <ul className="list-outside list-disc space-y-1 pl-4 text-[#475569]">
                      {test.findings.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-1.5">
                    <div className="font-bold text-amber-800">这次没有测的、不能推断的</div>
                    <ul className="list-outside list-disc space-y-1 pl-4 text-[#475569]">
                      {test.not_covered.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                  </div>
                </div>
                {brand && (
                  <p className="text-xs text-[#64748B]">
                    这条记录对应的品牌页：<Link href={`/airports/${brand.id}/#tests`} className="font-semibold text-[#6378EA]">{brand.name}</Link>（含价格和资料）。
                  </p>
                )}
              </article>
            );
          })}
        </section>

        <section className="mb-10 space-y-3" aria-labelledby="pending">
          <h2 id="pending" className="flex items-center gap-2 text-lg font-bold text-[#17233A]">
            <FileQuestion className="h-5 w-5 text-amber-600" />
            原始数据和更多记录：待更新
          </h2>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-sm leading-relaxed text-[#475569]">
            上面这条记录的原图，以及更多品牌的测速记录、原始截图和导出文件，整理清楚后会在后续更新里上传；在那之前，本站不会再新增没有原始数据的测速数字，也不会用模拟结果代替。
          </div>
          <details className="rounded-xl border border-[#E2E8F0] bg-white/80 p-4 text-xs text-[#475569]">
            <summary className="cursor-pointer font-semibold text-[#17233A]">暂无记录的 {withoutRecord.length} 家（点开查看）</summary>
            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
              {withoutRecord.map((b) => (
                <Link key={b.id} href={`/airports/${b.id}/`} className="font-semibold text-[#6378EA] hover:text-[#4F64D6]">{b.name}</Link>
              ))}
            </p>
          </details>
        </section>

        <section className="mb-10 space-y-3" aria-labelledby="submit">
          <h2 id="submit" className="flex items-center gap-2 text-lg font-bold text-[#17233A]">
            <Mail className="h-5 w-5 text-[#6378EA]" />
            怎么提交测试记录
          </h2>
          <ul className="list-outside list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#475569]">
            <li>发到 {SITE_META.correction_contact.split('（')[0]}，邮件里写明测试时间、工具名称和版本、测的是哪些线路和节点、你所在的城市和运营商、设备和客户端。</li>
            <li>附上原始截图或工具导出的文件，截图里遮住订阅链接和账号信息。</li>
            <li>记录里写不清的项，页面会标“未记录”；没有原始依据的数字，不收录。</li>
          </ul>
          <p className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Clock className="h-3.5 w-3.5" />
            自己动手测的方法见下面的文章。
          </p>
        </section>

        {articles.length > 0 && (
          <section aria-labelledby="lab-articles" className="border-t border-[#E2E8F0] pt-8">
            <h2 id="lab-articles" className="mb-4 text-lg font-bold text-[#17233A]">测速实验室文章</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} showCategory={false} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
