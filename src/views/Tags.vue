<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useBlogStore } from '@/stores/blog'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const selectedTag = ref<string | null>(null)

watch(
  () => route.query.tag,
  (tag) => {
    selectedTag.value = tag as string | null
  },
  { immediate: true }
)

const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return blogStore.getPostsByTag(selectedTag.value)
})

function selectTag(tag: string) {
  if (selectedTag.value === tag) {
    selectedTag.value = null
    router.push('/tags')
  } else {
    selectedTag.value = tag
    router.push({ path: '/tags', query: { tag } })
  }
}

// 标签颜色
const tagColors = [
  'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 
  'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
  'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',
  'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500'
]

function getTagColor(index: number): string {
  return tagColors[index % tagColors.length]
}

function getTagSize(count: number): string {
  const max = Math.max(...blogStore.allTags.map(t => t.count))
  const ratio = count / max
  if (ratio > 0.8) return 'text-xl'
  if (ratio > 0.6) return 'text-lg'
  if (ratio > 0.4) return 'text-base'
  return 'text-sm'
}
</script>

<template>
  <div>
    <!-- Banner -->
    <header class="relative h-[40vh] min-h-[300px] flex items-center justify-center">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-fixed"
        style="background-image: url('/img/default-cover.jpg');"
      >
        <div class="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div class="relative text-center text-white">
        <Icon icon="fas:tags" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">标签</h1>
        <p class="mt-2 text-white/80">共 {{ blogStore.allTags.length }} 个标签</p>
      </div>

      <!-- 波浪装饰 -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" class="w-full">
          <path 
            d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>
    </header>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading -->
      <div v-if="blogStore.isLoading" class="card p-12 text-center">
        <Icon icon="fas:spinner" class="w-12 h-12 animate-spin text-[#49b1f5] mx-auto" />
      </div>

      <div v-else>
        <!-- Tag Cloud - Butterfly 彩色风格 -->
        <div class="card p-8 mb-8">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button
              v-for="(tag, index) in blogStore.allTags"
              :key="tag.name"
              @click="selectTag(tag.name)"
              class="px-4 py-1.5 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              :class="[
                getTagSize(tag.count),
                selectedTag === tag.name 
                  ? 'ring-2 ring-offset-2 ring-gray-800 dark:ring-white' 
                  : '',
                getTagColor(index)
              ]"
            >
              <Icon icon="fas:hashtag" class="w-3 h-3 inline mr-0.5" />
              {{ tag.name }}
              <span class="text-xs ml-1 opacity-80">({{ tag.count }})</span>
            </button>
          </div>
        </div>

        <!-- Selected Tag Posts -->
        <div v-if="selectedTag">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white">
              <Icon icon="fas:hashtag" class="w-5 h-5 inline text-[#49b1f5]" />
              {{ selectedTag }}
              <span class="text-base font-normal text-gray-500 ml-2">({{ filteredPosts.length }} 篇)</span>
            </h2>
            <button 
              @click="selectTag(selectedTag!)"
              class="text-sm text-gray-500 hover:text-[#49b1f5]"
            >
              <Icon icon="fas:times" class="w-4 h-4 inline mr-1" />
              清除筛选
            </button>
          </div>

          <div class="space-y-5">
            <PostCard 
              v-for="(post, index) in filteredPosts"
              :key="post.slug"
              :post="post"
              :layout="index % 2 === 0 ? 'left' : 'right'"
            />
          </div>
        </div>

        <!-- No Selection Hint -->
        <div v-else class="card p-12 text-center">
          <Icon icon="fas:mouse-pointer" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500">点击上方标签查看相关文章</p>
        </div>
      </div>
    </div>
  </div>
</template>
