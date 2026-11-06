/**
 * 站长提供的检测记录：只转述截图里能读到的条件和结果，不做本站没有验证的推断。
 * image 填 public/ 下的路径；文件到位前为 null，页面显示“测速原图：待更新中”（见 PendingTestImage）。
 * 2026-11-07 站长要求撤下灵动云的检测截图：文件已移出 public/，整理好清楚的图之后再上传，到时把 image 填回来，
 * 同时改一下几篇教程里“原图待更新中”的说法（搜“原图待更新中”能找全）。
 */
export interface BrandTestRecord {
  brand_id: string;
  title: string;
  tested_at: string;
  tester: string;
  network: string;
  tool: string;
  /** 工具版本：记录里没写明就是 null，页面显示“版本未记录”，不补、不猜 */
  tool_version: string | null;
  /** 测试环境里记录没写明的部分（设备、客户端、内核）：null 表示没写明，页面显示“未记录” */
  environment_extra: { device: string | null; client: string | null; core: string | null };
  scope: string;
  items_tested: string[];
  findings: string[];
  not_covered: string[];
  image: { src: string; width: number; height: number; alt: string } | null;
}

export const BRAND_TESTS: BrandTestRecord[] = [
  {
    brand_id: 'lingdongyun',
    title: '灵动云 60 个节点的延迟与流媒体 / OpenAI 解锁检测',
    tested_at: '2026-11-01',
    tester: '站长',
    network: '珠海 · 联通宽带',
    tool: 'MiaoKo 自定义测试（基础流媒体模式）；TLS RTT 为单次握手延迟，HTTPS 延迟为单次整体延迟',
    tool_version: null, // 站长提供的截图里没有写工具版本号
    environment_extra: { device: null, client: null, core: null }, // 截图里也没有设备、客户端和内核信息
    scope: '订阅内全部 60 个 VLESS 节点：日本 10、新加坡 10、美国 10、香港 20、台湾 10',
    items_tested: ['YouTube', 'Netflix', 'Disney+', 'Bilibili 港澳台', 'TikTok', 'DAZN', 'Abema', '巴哈姆特动画疯', 'OpenAI', 'Steam 货币区'],
    findings: [
      'TLS RTT：新加坡节点 2–9ms，台湾 12–19ms，香港 21–30ms，日本 50–67ms，美国 91–99ms。这是到入口的握手延迟，不是到目标网站的延迟；HTTPS 单次整体延迟都在 1 秒以上。',
      'OpenAI 检测项：60 个节点全部显示“解锁”。新加坡、日本、美国节点显示的落地地区与节点一致（SG / JP / US），香港和台湾节点显示的都是 TW。',
      'Netflix、Disney+、TikTok、DAZN、巴哈姆特：各节点均显示“解锁”，但落地地区不一定等于节点地区，例如台湾节点的 Netflix、Disney+ 显示 ES、DAZN 显示 GB，具体以原图为准（原图待更新中）；Bilibili 各节点显示解锁港澳台地区。',
      'YouTube：日本、美国、香港节点显示解锁；新加坡与台湾节点显示“送中(CN)”，即 YouTube 把出口识别为中国地区。',
      'Abema：只有日本节点显示解锁，其他地区为 N/A；Steam 货币区随节点变化（日本 JPY、美国 USD、香港 HKD、新加坡 CNY、台湾 GBP）。'
    ],
    not_covered: [
      '没有测下载和上传速度，不能据此判断带宽。',
      '只是 2026-11-01 的一次检测（工具自己也标注“试验性结果，仅供参考”），不代表晚高峰表现，也不代表长期可用；解锁状态会随平台政策变化。',
      '测试网络为珠海联通，其他地区和运营商的结果可能不同。'
    ],
    // 2026-11-07 站长要求撤下原检测截图（原为 925×1024 的 JPG），整理好清楚的图之后再填回
    image: null
  }
];

export function getBrandTests(brandId: string): BrandTestRecord[] {
  return BRAND_TESTS.filter((t) => t.brand_id === brandId);
}
