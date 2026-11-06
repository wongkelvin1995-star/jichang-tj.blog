import { Brand } from '@/types';
import { buildSelectionTip, getPriceFacts } from '@/data/priceFacts';
import { VERIFICATION } from '@/data/verification';

/**
 * 品牌注册表：只维护 03-brand-registry.json 里的事实（ID、名称、别名、顺序、推广链接）。
 * 线路、起步价和价格摘要都由价格表（planPrices.ts）计算，不在这里手写，避免和价格表对不上。
 */
type BrandRegistryEntry = Pick<
  Brand,
  'id' | 'name' | 'aliases' | 'display_rank' | 'source_input_order' | 'fixed_position' | 'featured' | 'affiliate_url'
>;

const BRAND_REGISTRY: BrandRegistryEntry[] = [
  {
    id: "lingdongyun",
    name: "灵动云",
    aliases: ["Lingdongyun", "Lingdong Cloud"],
    display_rank: 1,
    source_input_order: 5,
    fixed_position: true,
    featured: true,
    affiliate_url: "https://varnexa.lingdongaff.com/#/?code=HHoxxHGa"
  },
  {
    id: "twilight",
    name: "暮光加速",
    aliases: ["Twilight"],
    display_rank: 2,
    source_input_order: 1,
    fixed_position: true,
    affiliate_url: "https://varnexa.twilightaff.com/#/?code=rkRvrsRc"
  },
  {
    id: "breezenet",
    name: "微风网络",
    aliases: ["Breezenet"],
    display_rank: 3,
    source_input_order: 23,
    fixed_position: true,
    affiliate_url: "https://downloadshare.breezenetttt.sbs/#/?code=eS6rgePR"
  },
  {
    id: "flycat",
    name: "飞猫云",
    aliases: ["Flycat"],
    display_rank: 4,
    source_input_order: 7,
    fixed_position: true,
    affiliate_url: "https://flycat1.flycatvipaff.cc/#/?code=Gja6RpJ8"
  },
  {
    id: "dalaoyun",
    name: "大佬云",
    aliases: [],
    display_rank: 5,
    source_input_order: 30,
    fixed_position: true,
    affiliate_url: "https://a01vipaff.dalaoyunaff.com/#/?code=yN6HqG0d"
  },
  {
    id: "invisible",
    name: "隐形人",
    aliases: ["Invisible"],
    display_rank: 6,
    source_input_order: 6,
    fixed_position: true,
    affiliate_url: "https://varnexa.invisibleaff.com/#/?code=PoecAA0c"
  },
  {
    id: "flyv",
    name: "飞V",
    aliases: ["FLY V", "FlyV"],
    display_rank: 7,
    source_input_order: 2,
    fixed_position: true,
    affiliate_url: "https://varnexa.flyvaff.com/#/?code=1mq17Z8C"
  },
  {
    id: "wavenet",
    name: "浪网",
    aliases: ["WaveNet"],
    display_rank: 8,
    source_input_order: 4,
    fixed_position: true,
    affiliate_url: "https://varnexa.wavenetaff.com/#/?code=Thua5OyI"
  },
  {
    id: "worryfree",
    name: "无忧",
    aliases: ["Worryfree"],
    display_rank: 9,
    source_input_order: 24,
    fixed_position: true,
    affiliate_url: "https://wep01.worryfreeaff.com/#/?code=HgKiCWFk"
  },
  {
    id: "firefly",
    name: "Firefly",
    aliases: ["飞为"],
    display_rank: 10,
    source_input_order: 27,
    fixed_position: true,
    affiliate_url: "https://vip02.fireflyaff.com/#/?code=ChuJcdvd"
  },
  {
    id: "globalcloud",
    name: "全球云",
    aliases: ["Global Cloud"],
    display_rank: 11,
    source_input_order: 13,
    fixed_position: true,
    affiliate_url: "https://sswdh.gcvipaff.com/#/?code=po8R1Rnl"
  },
  {
    id: "v2yun",
    name: "唯兔云",
    aliases: ["V2云", "V2yun"],
    display_rank: 12,
    source_input_order: 10,
    fixed_position: true,
    affiliate_url: "https://fast.v2yunvipaff.com/#/?code=sZt4VRYd"
  },
  {
    id: "civet",
    name: "灵猫",
    aliases: ["Civet"],
    display_rank: 13,
    source_input_order: 25,
    fixed_position: true,
    affiliate_url: "https://vip02.civetaff.com/#/?code=oL5LiBYi"
  },
  {
    id: "flashleap",
    name: "闪跃",
    aliases: ["FlashLeap"],
    display_rank: 14,
    source_input_order: 26,
    fixed_position: true,
    affiliate_url: "https://vip02.flashleapaff.com/#/?code=mS7mSSyk"
  },
  {
    id: "laddercloud",
    name: "梯子云",
    aliases: ["LadderCloud"],
    display_rank: 15,
    source_input_order: 3,
    fixed_position: false,
    affiliate_url: "https://varnexa.ladderaff.com/#/?code=NSTRhs22"
  },
  {
    id: "stardream",
    name: "星岛梦",
    aliases: ["StarDream"],
    display_rank: 16,
    source_input_order: 8,
    fixed_position: false,
    affiliate_url: "https://kfccbb.xingdaomeng.com/#/?code=8OfXD5OF"
  },
  {
    id: "lightspeed",
    name: "光速云",
    aliases: ["LightSpeed"],
    display_rank: 17,
    source_input_order: 9,
    fixed_position: false,
    affiliate_url: "https://mdlky.gsyaff.com/#/?code=F7n0RNQb"
  },
  {
    id: "u1s1",
    name: "U1S1",
    aliases: ["有一说一"],
    display_rank: 18,
    source_input_order: 11,
    fixed_position: false,
    affiliate_url: "https://pkdj7.vipaff.cc/#/?code=fRPgEjR9"
  },
  {
    id: "jilianyun",
    name: "极连云",
    aliases: [],
    display_rank: 19,
    source_input_order: 12,
    fixed_position: false,
    affiliate_url: "https://kdjhao.jlyvipaff.com/#/?code=CLXGwx9n"
  },
  {
    id: "guangnianti",
    name: "光年梯",
    aliases: [],
    display_rank: 20,
    source_input_order: 14,
    fixed_position: false,
    affiliate_url: "https://ggmq.gntaff.com/#/?code=ntDL4Jt7"
  },
  {
    id: "sogoyun",
    name: "Sogo云",
    aliases: ["Sogo"],
    display_rank: 21,
    source_input_order: 15,
    fixed_position: false,
    affiliate_url: "https://wzjc.sogoyunaff.cc/#/?code=EJx2Kerr"
  },
  {
    id: "yuzhou",
    name: "宇宙云",
    aliases: ["YuZhou"],
    display_rank: 22,
    source_input_order: 16,
    fixed_position: false,
    affiliate_url: "https://wzjc.yuzoucloud.cc/#/?code=5LyV2wPs"
  },
  {
    id: "2mao",
    name: "二猫云",
    aliases: ["2mao"],
    display_rank: 23,
    source_input_order: 17,
    fixed_position: false,
    affiliate_url: "https://waaa.2maoyunaff.cc/#/?code=eWzdVBUV"
  },
  {
    id: "1fly",
    name: "一翻云",
    aliases: ["1fly"],
    display_rank: 24,
    source_input_order: 18,
    fixed_position: false,
    affiliate_url: "https://wzjc.1flyunaff.cc/#/?code=6kvuXWSh"
  },
  {
    id: "edgenova",
    name: "边缘节点",
    aliases: ["EdgeNova"],
    display_rank: 25,
    source_input_order: 19,
    fixed_position: false,
    affiliate_url: "https://work.edgenovaaff.cc/#/?code=nkZgzbw6"
  },
  {
    id: "kosing",
    name: "可信云",
    aliases: [],
    display_rank: 26,
    source_input_order: 20,
    fixed_position: false,
    affiliate_url: "https://work.kosingaff.com/#/?code=Ho0l8Dcm"
  },
  {
    id: "sujie",
    name: "速界",
    aliases: ["SuJie"],
    display_rank: 27,
    source_input_order: 21,
    fixed_position: false,
    affiliate_url: "https://work.speedworldaff.cc/#/?code=sRNgp64F"
  },
  {
    id: "kuaili",
    name: "快狸",
    aliases: ["KuaiLi"],
    display_rank: 28,
    source_input_order: 22,
    fixed_position: false,
    affiliate_url: "https://work.kuailicloud.cc/#/?code=Tmt2KQBn"
  },
  {
    id: "kuajie",
    name: "跨界",
    aliases: ["跨界云"],
    display_rank: 29,
    source_input_order: 28,
    fixed_position: false,
    affiliate_url: "https://vip02.kuajieaff.com/#/?code=tpRqrYXx"
  },
  {
    id: "liulianyun",
    name: "榴莲云",
    aliases: [],
    display_rank: 30,
    source_input_order: 29,
    fixed_position: false,
    affiliate_url: "https://a01vipaff.liulianyunaff.com/#/?code=DpwvSnYN"
  },
  {
    id: "shandianyun",
    name: "闪电云",
    aliases: [],
    display_rank: 31,
    source_input_order: 31,
    fixed_position: false,
    affiliate_url: "https://a01vipaff.shandianshuaff.com/#/?code=GgfmE3x9"
  },
  {
    id: "huanqiuyun",
    name: "环球云",
    aliases: [],
    display_rank: 32,
    source_input_order: 32,
    fixed_position: false,
    affiliate_url: "https://a01vipaff.huanqiutiaff.com/#/?code=KLJlZ16u"
  },
  {
    id: "shenxingyun",
    name: "神行云",
    aliases: [],
    display_rank: 33,
    source_input_order: 33,
    fixed_position: false,
    affiliate_url: "https://a01vipaff.shenxingaff.com/#/?code=NjGWznDv"
  },
  {
    id: "yunjieyun",
    name: "云界云",
    aliases: [],
    display_rank: 34,
    source_input_order: 34,
    fixed_position: false,
    affiliate_url: "https://a01vipaff.yunjiexianaff.com/#/?code=6F666lYO"
  }
];

export const BRANDS: Brand[] = BRAND_REGISTRY.map((entry) => {
  const facts = getPriceFacts(entry.id);
  const entryMonthly = facts.entryMonthly;

  return {
    ...entry,
    status: 'verified',
    protocol_architecture: facts.lineNote,
    starting_price: {
      amount: entryMonthly ? entryMonthly.price : null,
      period: '月付',
      note: entryMonthly ? `${entryMonthly.name} ${entryMonthly.totalGB}GB/月` : undefined
    },
    selection_tip: buildSelectionTip(facts),
    data_date: facts.dataDate,
    price_is_historical: facts.historical,
    verified_at: VERIFICATION.verified_on
  };
});

export const FEATURED_BRAND_ID = "lingdongyun";

export function getBrandById(id: string): Brand | undefined {
  return BRANDS.find(b => b.id === id);
}

export function searchBrands(query: string): Brand[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return BRANDS;
  return BRANDS.filter(b => {
    if (b.name.toLowerCase().includes(clean)) return true;
    if (b.id.toLowerCase().includes(clean)) return true;
    if (b.aliases.some(a => a.toLowerCase().includes(clean))) return true;
    if (b.selection_tip && b.selection_tip.toLowerCase().includes(clean)) return true;
    return false;
  });
}
