<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { IMAGES } from '@/utils/assets'

// Intersection Observer for animations
const visibleCards = ref<Set<number>>(new Set())
const cardElements = ref<Map<number, HTMLElement>>(new Map())
let observer: IntersectionObserver | null = null

const setCardRef = (el: any, index: number) => {
  if (el) {
    cardElements.value.set(index, el)
  }
}

const isCardVisible = (index: number) => visibleCards.value.has(index)

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = (entry.target as any).__cardIndex as number
        if (entry.isIntersecting && !visibleCards.value.has(index)) {
          setTimeout(() => {
            visibleCards.value.add(index)
            visibleCards.value = new Set(visibleCards.value)
          }, index * 100)
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  )

  // Observe all stored elements
  cardElements.value.forEach((el, index) => {
    ;(el as any).__cardIndex = index
    observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

const bangumiList = [
  {
    name: 'One Piece',
    status: 'Watching',
    rating: '9.9',
    cover: IMAGES.onepiece,
    tags: ['Adventure', 'Battle', 'Shounen'],
    link: 'https://www.yinhuadm.xyz/v/5527.html',
    description: 'Legendary pirate Gold D. Roger left a message about his lifetime treasure "One Piece" before his death, sparking an era where countless pirates compete for this legendary fortune. The world enters a turbulent "Great Pirate Era."',
  },
  {
    name: 'Jujutsu Kaisen',
    status: 'Completed',
    rating: '9.7',
    cover: IMAGES.zhoushuhuizhan,
    tags: ['Battle', 'Supernatural', 'Shounen'],
    link: 'https://www.bilibili.com/bangumi/media/md28229899',
    description: 'The boy fights — "in search of a proper death." Yuji Itadori swallowed a Special Grade cursed object — "Ryomen Sukuna\'s Finger" — binding the curse to his own soul. Guided by the strongest jujutsu sorcerer Satoru Gojo, an epic story of no return begins.',
  },
  {
    name: 'JoJo\'s Bizarre Adventure: Stone Ocean',
    status: 'Completed',
    rating: '9.5',
    cover: IMAGES.jojo,
    tags: ['Battle', 'Supernatural', 'Adventure'],
    link: 'https://www.bilibili.com/bangumi/media/md28235123',
    description: 'Year 2011, Florida, USA. Jolyne Cujoh is framed and sentenced to 15 years in Green Dolphin Street Prison. Can she break free from this "Stone Ocean" and end the century-long fate between the Joestars and DIO?',
  },
  {
    name: 'That Time I Got Reincarnated as a Slime S3',
    status: 'Completed',
    rating: '9.3',
    cover: IMAGES.shilaimu,
    tags: ['Fantasy', 'Isekai', 'Adventure'],
    link: 'https://www.bilibili.com/bangumi/media/md23154901',
    description: 'Rimuru has officially become a Demon Lord. He decides to host a "National Foundation Festival" to formally debut as a Demon Lord and attract new residents to Tempest.',
  },
  {
    name: 'Bungo Stray Dogs S5',
    status: 'Completed',
    rating: '9.4',
    cover: IMAGES.wenhaoyequan,
    tags: ['Action', 'Supernatural', 'Mystery'],
    link: 'https://www.bilibili.com/bangumi/media/md20289192',
    description: 'The Armed Detective Agency has been framed as a terrorist organization by "Decay of Angels." The military police\'s elite unit "Hunting Dogs" pursues them relentlessly. Hope seeds are sown on the road where the stray dogs run.',
  },
  {
    name: 'Spy x Family S3',
    status: 'Completed',
    rating: '9.6',
    cover: IMAGES.jiandieguojiajia,
    tags: ['Comedy', 'Action', 'Family'],
    link: 'https://www.bilibili.com/bangumi/media/md27709925',
    description: 'Everyone has a secret side. Spy "Twilight" disguises as psychiatrist Loid Forger to build a family. His adopted daughter Anya is a telepath, and his wife Yor is an assassin! World peace lies in the hands of this unexpected family.',
  },
  {
    name: 'Natsume\'s Book of Friends S7',
    status: 'Completed',
    rating: '9.5',
    cover: IMAGES.xiamuyourenzhang,
    tags: ['Supernatural', 'Slice of Life', 'Healing'],
    link: 'https://www.bilibili.com/bangumi/media/md23053814',
    description: 'Takashi Natsume inherits his grandmother Reiko\'s "Book of Friends" — a book that can command youkai. With his bodyguard Nyanko-sensei, he encounters various youkai and human friends.',
  },
  {
    name: 'Tonikaku Kawaii S2',
    status: 'Completed',
    rating: '9.0',
    cover: IMAGES.feichangkeai,
    tags: ['Romance', 'Comedy', 'Slice of Life'],
    link: 'https://www.bilibili.com/bangumi/media/md20266559',
    description: 'A newlywed couple — NASA and Tsukasa — continue their heartwarming married life. Despite their apartment burning down, they deepen their love in a Showa-era house. How will their wedding turn out?',
  },
  {
    name: 'In/Spectre S2',
    status: 'Completed',
    rating: '8.8',
    cover: IMAGES.xugoutuili,
    tags: ['Mystery', 'Supernatural', 'Romance'],
    link: 'https://www.bilibili.com/bangumi/media/md28412512',
    description: 'Kotoko Iwanaga serves as the "Goddess of Wisdom" for supernatural beings. Together with her boyfriend Kuro Sakuragawa, they solve paranormal mystery cases using "fiction." Love × Paranormal × Mystery returns!',
  },
  {
    name: 'Kaguya-sama: Love Is War -Ultra Romantic-',
    status: 'Completed',
    rating: '9.6',
    cover: IMAGES.huiyedaxiaojie,
    tags: ['Romance', 'Comedy', 'School'],
    link: 'https://www.bilibili.com/bangumi/media/md28237120',
    description: 'Student Council Vice President Kaguya Shinomiya and President Miyuki Shirogane — two geniuses whose excessive pride prevents them from confessing. Their love story reaches a turning point at the cultural festival.',
  },
  {
    name: 'Mob Psycho 100 III',
    status: 'Completed',
    rating: '9.4',
    cover: IMAGES.luren,
    tags: ['Action', 'Comedy', 'Supernatural'],
    link: 'https://www.bilibili.com/bangumi/media/md28339709',
    description: 'Mob, an ordinary-looking boy with incredible psychic powers, works under the fake psychic Reigen Arataka. Seeking a peaceful youth, can Mob keep his powers under control? Season 3 arrives!',
  },
  {
    name: 'Shikimori\'s Not Just a Cutie',
    status: 'Completed',
    rating: '8.5',
    cover: IMAGES.shishou,
    tags: ['Romance', 'Comedy', 'School'],
    link: 'https://www.bilibili.com/bangumi/media/md28237125',
    description: 'Izumi has terrible luck, but his girlfriend Shikimori is usually sweet and adorable — until he\'s in danger, when she transforms into the coolest girlfriend ever! A 1000% wholesome love comedy.',
  },
  {
    name: 'Inuyasha',
    status: 'Completed',
    rating: '9.3',
    cover: IMAGES.quanyecha,
    tags: ['Fantasy', 'Adventure', 'Romance'],
    link: 'https://www.bilibili.com/bangumi/media/md28222083',
    description: 'Half-demon Inuyasha and time-traveling girl Kagome, along with monk Miroku, demon slayer Sango, and fox demon Shippo, battle their nemesis Naraku while searching for the Sacred Jewel shards.',
  },
  {
    name: 'The Case Study of Vanitas',
    status: 'Completed',
    rating: '9.2',
    cover: IMAGES.wanitasi,
    tags: ['Fantasy', 'Supernatural', 'Action'],
    link: 'https://www.bilibili.com/bangumi/media/md28234616',
    description: 'In 19th century France where humans and vampires coexist, young vampire Noé meets Vanitas — a human doctor who treats vampires using the legendary "Book of Vanitas." A tale of curses and salvation unfolds.',
  },
  {
    name: 'Lycoris Recoil',
    status: 'Completed',
    rating: '9.5',
    cover: IMAGES.likelisi,
    tags: ['Action', 'Comedy', 'Slice of Life'],
    link: 'https://www.bilibili.com/bangumi/media/md28338623',
    description: 'Behind everyday peace lies a secret organization "DA." At café LycoReco, the strongest Lycoris Chisato and the skilled Takina form an unlikely duo, handling everything from childcare to taking down threats.',
  },
  {
    name: 'TARI TARI',
    status: 'Completed',
    rating: '8.8',
    cover: IMAGES.tari,
    tags: ['Music', 'Slice of Life', 'School'],
    link: 'https://www.bilibili.com/bangumi/media/md752',
    description: 'Set in Enoshima, Kanagawa. Konatsu and Sawa form a choir club, chasing their dreams during their last summer of high school. A P.A. Works youth drama about finding one\'s voice through music.',
  },
  {
    name: 'Anohana: The Flower We Saw That Day',
    status: 'Completed',
    rating: '9.6',
    cover: IMAGES.weiwenhuaming,
    tags: ['Drama', 'Supernatural', 'Slice of Life'],
    link: 'https://www.bilibili.com/bangumi/media/md835',
    description: 'Six childhood friends drifted apart after growing up. One day, the ghost of Menma appears to shut-in Jinta, asking him to fulfill her wish. The scattered friends reunite once more for Menma\'s sake.',
  },
  {
    name: 'Your Lie in April',
    status: 'Completed',
    rating: '9.7',
    cover: IMAGES.siyue,
    tags: ['Music', 'Romance', 'Drama'],
    link: 'https://www.bilibili.com/bangumi/media/md1699',
    description: 'Piano prodigy Kousei Arima stopped hearing piano sounds after his mother\'s death. In 8th grade, he meets free-spirited violinist Kaori Miyazono, whose playing style changes his world forever.',
  },
  {
    name: 'Yona of the Dawn',
    status: 'Completed',
    rating: '9.1',
    cover: IMAGES.chenxi,
    tags: ['Fantasy', 'Adventure', 'Romance'],
    link: 'https://www.bilibili.com/bangumi/media/md3072',
    description: 'Princess Yona witnesses her father\'s assassination on her 16th birthday by her beloved Su-won. She flees with her bodyguard Hak, beginning a journey of survival and self-discovery.',
  },
  {
    name: 'My Teen Romantic Comedy SNAFU Climax',
    status: 'Completed',
    rating: '9.4',
    cover: IMAGES.chunwu,
    tags: ['Romance', 'Comedy', 'School'],
    link: 'https://www.bilibili.com/bangumi/media/md28228386',
    description: 'Hachiman Hikigaya seeks something genuine. As spring arrives, the relationship between him, Yukino, and Yui gradually changes. What conclusion will his high school life reach?',
  },
  {
    name: 'CLANNAD ~After Story~',
    status: 'Completed',
    rating: '9.8',
    cover: IMAGES.clannad,
    tags: ['Drama', 'Romance', 'Slice of Life'],
    link: 'https://www.bilibili.com/bangumi/media/md1178',
    description: 'Delinquent Tomoya Okazaki meets the gentle Nagisa Furukawa at a school slope. After meeting her, his life undergoes a profound transformation in this deeply moving story about family and love.',
  },
  {
    name: 'The Pet Girl of Sakurasou',
    status: 'Completed',
    rating: '9.3',
    cover: IMAGES.yinghuazhuang,
    tags: ['Romance', 'Comedy', 'School'],
    link: 'https://www.bilibili.com/bangumi/media/md687',
    description: 'Sorata is exiled to Sakura Hall for keeping a stray cat. When world-class genius artist Mashiro moves in — a girl brilliant yet completely lacking common sense — his daily life turns upside down.',
  },
  {
    name: 'DARLING in the FRANXX',
    status: 'Completed',
    rating: '9.2',
    cover: IMAGES.zeroone,
    tags: ['Mecha', 'Romance', 'Sci-Fi'],
    link: 'https://www.bilibili.com/bangumi/media/md9192',
    description: 'In a distant future, children pilot mechas called FRANXX to fight mysterious creatures. Former prodigy Hiro meets the mysterious Zero Two with horns on her head: "I found you, my DARLING."',
  },
  {
    name: 'The "Hentai" Prince and the Stony Cat',
    status: 'Completed',
    rating: '8.6',
    cover: IMAGES.buxiaomao,
    tags: ['Comedy', 'Romance', 'Supernatural'],
    link: 'https://www.bilibili.com/bangumi/media/md413',
    description: 'After praying to the "Stony Cat" statue, Youto\'s inner thoughts are revealed to everyone. The expressionless Tsukiko saves him from this crisis. A quirky supernatural rom-com begins.',
  },
  {
    name: 'Shirobako',
    status: 'Completed',
    rating: '9.4',
    cover: IMAGES.baixiang,
    tags: ['Slice of Life', 'Drama', 'Comedy'],
    link: 'https://www.yinhuadm.xyz/v/19304.html',
    description: 'A behind-the-scenes look at the anime industry. Production assistant Aoi Miyamori and her friends chase their dreams of creating anime, facing the reality of tight schedules and creative challenges.',
  },
  {
    name: 'Hyouka',
    status: 'Completed',
    rating: '9.5',
    cover: IMAGES.bingguo,
    tags: ['Mystery', 'Slice of Life', 'School'],
    link: 'https://www.yinhuadm.xyz/v/5658.html',
    description: 'Energy-conserving student Houtarou Oreki joins the Classics Club at his sister\'s request, meeting the endlessly curious Chitanda Eru. Together they solve everyday mysteries in this beautiful school tale by KyoAni.',
  },
  {
    name: 'Naruto',
    status: 'Completed',
    rating: '9.5',
    cover: IMAGES.naruto,
    tags: ['Battle', 'Adventure', 'Shounen'],
    link: 'https://www.yinhuadm.xyz/v/6017.html',
    description: 'Young orphan Naruto Uzumaki, with the Nine-Tailed Fox sealed within him, dreams of becoming the strongest ninja — Hokage. Together with Sasuke and Sakura, his ninja journey begins.',
  },
  {
    name: 'Dragon Ball',
    status: 'Completed',
    rating: '9.6',
    cover: IMAGES.dragonball,
    tags: ['Battle', 'Adventure', 'Comedy'],
    link: 'https://www.yinhuadm.xyz/v/5897.html',
    description: 'Legend says seven Dragon Balls are scattered across the world. Whoever gathers all seven can summon Shenron, who grants any wish. Young Goku begins his legendary adventure.',
  },
  {
    name: 'One Punch Man S1',
    status: 'Completed',
    rating: '9.5',
    cover: IMAGES.yiquan,
    tags: ['Action', 'Comedy', 'Superhero'],
    link: 'https://www.yinhuadm.xyz/v/17918.html',
    description: 'Saitama trained so hard he went bald and became overwhelmingly powerful — defeating any enemy with just one punch. But being the strongest is surprisingly boring. A hilarious superhero story.',
  },
  {
    name: 'Re:ZERO -Starting Life in Another World- S2',
    status: 'Completed',
    rating: '9.3',
    cover: IMAGES.re,
    tags: ['Fantasy', 'Isekai', 'Drama'],
    link: 'https://www.bilibili.com/bangumi/media/md28232073',
    description: 'After defeating the Sin Archbishop of "Sloth," Subaru and Emilia reconcile. But this is merely the prelude to a new storm. Unimaginable crises and cruel reality await the boy once more.',
  },
  {
    name: 'Arcane: League of Legends',
    status: 'Completed',
    rating: '9.8',
    cover: IMAGES.shuangchengzhizhan,
    tags: ['Action', 'Fantasy', 'Drama'],
    link: 'https://www.yinhuadm.xyz/v/19756.html',
    description: 'In the utopian city of Piltover and the underground nation of Zaun, sisters Vi and Jinx find themselves on opposing sides after a devastating conflict. A visually stunning story of bonds and betrayal.',
  },
  {
    name: '86 -Eighty Six-',
    status: 'Completed',
    rating: '9.4',
    cover: IMAGES.eightysixbu,
    tags: ['Mecha', 'Drama', 'Sci-Fi'],
    link: 'https://www.yinhuadm.xyz/v/17759.html',
    description: 'The "unmanned" drones of the Republic are actually piloted by the 86 — people denied their humanity. Captain Shin fights for a purpose on a hopeless battlefield, while new handler Lena discovers the truth.',
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'Watching': return 'bg-green-500'
    case 'Completed': return 'bg-blue-500'
    case 'Plan to Watch': return 'bg-yellow-500'
    default: return 'bg-gray-500'
  }
}
</script>

<template>
  <div>
    <!-- Banner -->
    <header class="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-black/40"></div>
      
      <div class="relative text-center text-white z-10">
        <Icon icon="lucide:clapperboard" class="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
        <h1 class="text-4xl md:text-5xl font-bold drop-shadow-lg">Anime</h1>
        <p class="mt-3 text-white/80 text-lg">Anime is home for the soul</p>
      </div>

      <div class="wave-divider">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C150,100 350,0 600,50 C850,100 1050,0 1200,50 C1350,100 1440,50 1440,50 L1440,100 L0,100 Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Anime Grid -->
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <div 
          v-for="(bangumi, index) in bangumiList"
          :key="bangumi.name"
          :ref="(el) => setCardRef(el, index)"
          class="card overflow-hidden group animate-card"
          :class="{ 'animate-in': isCardVisible(index) }"
        >
          <div class="flex flex-row h-[160px]">
            <!-- Cover (horizontal, left side) -->
            <div class="w-[120px] flex-shrink-0 relative overflow-hidden">
              <img 
                :src="bangumi.cover" 
                :alt="bangumi.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <!-- Status Badge -->
              <span 
                class="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-white text-[10px] font-medium"
                :class="getStatusColor(bangumi.status)"
              >
                {{ bangumi.status }}
              </span>
            </div>

            <!-- Info (right side) -->
            <div class="flex-1 p-3.5 flex flex-col justify-between overflow-hidden">
              <div>
                <div class="flex items-center justify-between">
                  <a 
                    v-if="bangumi.link"
                    :href="bangumi.link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="font-bold text-sm text-gray-800 dark:text-white group-hover:text-[#7CB342] transition-colors inline-flex items-center pb-0.5 leading-[1.4] truncate"
                  >
                    {{ bangumi.name }}
                    <Icon icon="lucide:external-link" class="w-3 h-3 ml-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <h3 v-else class="font-bold text-sm text-gray-800 dark:text-white truncate pb-0.5 leading-[1.4]">
                    {{ bangumi.name }}
                  </h3>
                  <div class="flex items-center text-yellow-500 text-xs flex-shrink-0 ml-2">
                    <Icon icon="lucide:star" class="w-3 h-3 mr-0.5" />
                    {{ bangumi.rating }}
                  </div>
                </div>
                <p v-if="bangumi.description" class="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-3 leading-relaxed">
                  {{ bangumi.description }}
                </p>
              </div>
              <div class="flex flex-wrap gap-1 mt-1.5">
                <span 
                  v-for="tag in bangumi.tags"
                  :key="tag"
                  class="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div 
        :ref="(el) => setCardRef(el, bangumiList.length)"
        class="card p-6 mt-8 animate-card"
        :class="{ 'animate-in': isCardVisible(bangumiList.length) }"
      >
        <div class="flex justify-around text-center">
          <div>
            <div class="text-3xl font-bold text-[#7CB342]">{{ bangumiList.length }}</div>
            <div class="text-sm text-gray-500 mt-1">Total Anime</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-500">{{ bangumiList.filter(b => b.status === 'Watching').length }}</div>
            <div class="text-sm text-gray-500 mt-1">Watching</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-500">{{ bangumiList.filter(b => b.status === 'Completed').length }}</div>
            <div class="text-sm text-gray-500 mt-1">Completed</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-card {
  opacity: 0;
  transform: scale(0.85);
  transform-origin: center center;
}

.animate-card.animate-in {
  animation: scaleIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
