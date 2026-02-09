// Get correct asset path with base URL
const BASE_URL = import.meta.env.BASE_URL || '/'

export function getAssetUrl(path: string): string {
  // If already a full URL or data URL, return directly
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path
  }
  
  // Remove leading slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Concatenate base URL
  return `${BASE_URL}${cleanPath}`
}

// Image path constants
export const IMAGES = {
  background: getAssetUrl('/img/background.jpg'),
  avatar: getAssetUrl('/img/avatar.webp'),
  defaultCover: getAssetUrl('/img/default-cover.webp'),
  aboutBg: getAssetUrl('/img/about-bg.webp'),
  archiveBg: getAssetUrl('/img/archive-bg.webp'),
  animeRainbowLandscape: getAssetUrl('/img/anime-rainbow-landscape.webp'),
  fantasyAnimeScene: getAssetUrl('/img/fantasy-anime-style-scene.webp'),
  illustrationAnimeCity: getAssetUrl('/img/illustration-anime-city.webp'),
  animeCharactersSpace: getAssetUrl('/img/anime-style-characters-space.webp'),
  fantasyMagicLandscape: getAssetUrl('/img/fantasy-magic-landscape.webp'),
  animeLandscapeTraveling: getAssetUrl('/img/anime-landscape-person-traveling.webp'),
  animeCharacterTraveling: getAssetUrl('/img/anime-character-traveling.webp'),
  qqQrCode: getAssetUrl('/img/QQ.png'),
  zhoushuhuizhan: getAssetUrl('/img/zhoushuhuizhan.webp'),
  // Anime covers
  jojo: getAssetUrl('/img/jojo.webp'),
  shilaimu: getAssetUrl('/img/shilaimu.webp'),
  wenhaoyequan: getAssetUrl('/img/wenhaoyequan.webp'),
  jiandieguojiajia: getAssetUrl('/img/jiandieguojiajia.webp'),
  xiamuyourenzhang: getAssetUrl('/img/xiamuyourenzhang.webp'),
  feichangkeai: getAssetUrl('/img/feichangkeai.webp'),
  xugoutuili: getAssetUrl('/img/xugoutuili.webp'),
  huiyedaxiaojie: getAssetUrl('/img/huiyedaxiaojie.webp'),
  luren: getAssetUrl('/img/luren.webp'),
  shishou: getAssetUrl('/img/shishou.webp'),
  quanyecha: getAssetUrl('/img/quanyecha.webp'),
  wanitasi: getAssetUrl('/img/wanitasi.webp'),
  likelisi: getAssetUrl('/img/likelisi.webp'),
  tari: getAssetUrl('/img/tari.webp'),
  weiwenhuaming: getAssetUrl('/img/weiwenhuaming.webp'),
  siyue: getAssetUrl('/img/siyue.webp'),
  chenxi: getAssetUrl('/img/chenxi.webp'),
  chunwu: getAssetUrl('/img/chunwu.webp'),
  clannad: getAssetUrl('/img/clannad.webp'),
  yinghuazhuang: getAssetUrl('/img/yinghuazhuang.webp'),
  zeroone: getAssetUrl('/img/zeroone.webp'),
  buxiaomao: getAssetUrl('/img/buxiaomao.webp'),
  baixiang: getAssetUrl('/img/baixiang.webp'),
  bingguo: getAssetUrl('/img/bingguo.webp'),
  onepiece: getAssetUrl('/img/onepiece.webp'),
  naruto: getAssetUrl('/img/naruto.webp'),
  dragonball: getAssetUrl('/img/dragonball.webp'),
  yiquan: getAssetUrl('/img/yiquan.webp'),
  re: getAssetUrl('/img/re.webp'),
  shuangchengzhizhan: getAssetUrl('/img/shuangchengzhizhan.webp'),
  eightysixbu: getAssetUrl('/img/86bu.webp'),
  jinjidejuren: getAssetUrl('/img/jinjidejuren.webp'),
  // Movie covers
  qianren3: getAssetUrl('/img/qianren3.webp'),
  yinglunduijue: getAssetUrl('/img/yinglunduijue.webp'),
  jirikuaile: getAssetUrl('/img/jirikuaile.webp'),
  aiqinggongyu: getAssetUrl('/img/aiqinggongyu.webp'),
  handoutegong3: getAssetUrl('/img/handoutegong3.webp'),
  yaoshen: getAssetUrl('/img/yaoshen.webp'),
  feichirensheng: getAssetUrl('/img/feichirensheng.webp'),
  kuangrexingdong: getAssetUrl('/img/kuangrexingdong.webp'),
  tianqizhizi: getAssetUrl('/img/tianqizhizi.webp'),
  mishitaotuo: getAssetUrl('/img/mishitaotuo.webp'),
  wusha: getAssetUrl('/img/wusha.webp'),
  ziluolan: getAssetUrl('/img/ziluolan.webp'),
  tangtan3: getAssetUrl('/img/tangtan3.webp'),
  feihongdezidan: getAssetUrl('/img/feihongdezidan.webp'),
  wodejiejie: getAssetUrl('/img/wodejiejie.webp'),
  hongfageji: getAssetUrl('/img/hongfageji.webp'),
  manjianghong: getAssetUrl('/img/manjianghong.webp'),
  baonipingan: getAssetUrl('/img/baonipingan.webp'),
  lingyazhilv: getAssetUrl('/img/lingyazhilv.webp'),
  guzhuyizhi: getAssetUrl('/img/guzhuyizhi.webp'),
  qianren4: getAssetUrl('/img/qianren4.webp'),
  feichirensheng2: getAssetUrl('/img/feichirensheng2.webp'),
  yaotaiyang: getAssetUrl('/img/yaotaiyang.webp'),
  wusha3: getAssetUrl('/img/wusha3.webp'),
  nezha2: getAssetUrl('/img/nezha2.webp'),
  liejinyouxi: getAssetUrl('/img/liejinyouxi.webp'),
  huihuaqiyuji: getAssetUrl('/img/huihuaqiyuji.webp'),
  nisha: getAssetUrl('/img/nisha.webp'),
  langlangrensheng: getAssetUrl('/img/langlangrensheng.webp'),
  xiaoshuojia2: getAssetUrl('/img/xiaoshuojia2.webp'),
  bizhengming: getAssetUrl('/img/bizhengming.webp'),
  sishenlaile: getAssetUrl('/img/sishenlaile.webp'),
  bufengzhuoying: getAssetUrl('/img/bufengzhuoying.webp'),
  eyi: getAssetUrl('/img/eyi.webp'),
  xiaoyaoguai: getAssetUrl('/img/xiaoyaoguai.webp'),
  dongwucheng2: getAssetUrl('/img/dongwucheng2.webp'),
  jixianfeng: getAssetUrl('/img/jixianfeng.webp'),
  nvwushen: getAssetUrl('/img/nvwushen.webp'),
  xunxianghuaduo: getAssetUrl('/img/xunxianghuaduo.webp'),
  // TV Series covers
  baisuizhihao: getAssetUrl('/img/baisuizhihao.webp'),
  xinghancanlan: getAssetUrl('/img/xinghancanlan.webp'),
  angelidemimi: getAssetUrl('/img/angelidemimi.webp'),
  nanhong: getAssetUrl('/img/nanhong.webp'),
  toutoucangbuzhu: getAssetUrl('/img/toutoucangbuzhu.webp'),
  relian: getAssetUrl('/img/relian.webp'),
  xuwoyaoyan: getAssetUrl('/img/xuwoyaoyan.webp'),
  ruqingyun: getAssetUrl('/img/ruqingyun.webp'),
  baoxue: getAssetUrl('/img/baoxue.webp'),
  shidai: getAssetUrl('/img/shidai.webp'),
  zhaoxuelu: getAssetUrl('/img/zhaoxuelu.webp'),
  tingshuonixihuan: getAssetUrl('/img/tingshuonixihuan.webp'),
  pinuocao: getAssetUrl('/img/pinuocao.webp'),
  dushiaiqing: getAssetUrl('/img/dushiaiqing.webp'),
  renyiyilian: getAssetUrl('/img/renyiyilian.webp'),
  dangnichenshui: getAssetUrl('/img/dangnichenshui.webp'),
  strangerthings: getAssetUrl('/img/strangerthings.webp'),
}

// Cover image pool
export const COVER_IMAGES = [
  IMAGES.animeRainbowLandscape,
  IMAGES.fantasyAnimeScene,
  IMAGES.illustrationAnimeCity,
  IMAGES.animeCharactersSpace,
  IMAGES.fantasyMagicLandscape,
  IMAGES.animeLandscapeTraveling,
  IMAGES.animeCharacterTraveling,
]

// Get cover image by string hash
export function getCoverImage(seed: string): string {
  const hash = seed.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)
  const index = Math.abs(hash) % COVER_IMAGES.length
  return COVER_IMAGES[index]
}
