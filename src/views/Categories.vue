<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useBlogStore } from '@/stores/blog'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const selectedCategory = ref<string | null>(null)

watch(
  () => route.query.category,
  (category) => {
    selectedCategory.value = category as string | null
  },
  { immediate: true }
)

const filteredPosts = computed(() => {
  if (!selectedCategory.value) return []
  return blogStore.getPostsByCategory(selectedCategory.value)
})

function selectCategory(category: string) {
  if (selectedCategory.value === category) {
    selectedCategory.value = null
    router.push('/categories')
  } else {
    selectedCategory.value = category
    router.push({ path: '/categories', query: { category } })
  }
}

// 分类图标和颜色
const categoryStyles: Record<string, { icon: string, color: string }> = {
  '技术': { icon: 'fas:code', color: 'from-blue-500 to-cyan-500' },
  '生活': { icon: 'fas:heart', color: 'from-pink-500 to-rose-500' },
  '随笔': { icon: 'fas:pen-fancy', color: 'from-purple-500 to-violet-500' },
  '学习': { icon: 'fas:graduation-cap', color: 'from-green-500 to-emerald-500' },
}

function getCategoryStyle(name: string) {
  return categoryStyles[name] || { icon: 'fas:folder', color: 'from-[#49b1f5] to-[#0abcf9]' }
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
        <Icon icon="fas:folder-open" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">分类</h1>
        <p class="mt-2 text-white/80">共 {{ blogStore.allCategories.length }} 个分类</p>
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
        <!-- Category Cards - Butterfly 风格 -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <button
            v-for="category in blogStore.allCategories"
            :key="category.name"
            @click="selectCategory(category.name)"
            class="card p-5 text-left transition-all duration-300 hover:shadow-xl group"
            :class="selectedCategory === category.name ? 'ring-2 ring-[#49b1f5]' : ''"
          >
            <div class="flex items-center space-x-4">
              <div 
                class="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shadow-lg"
                :class="getCategoryStyle(category.name).color"
              >
                <Icon :icon="getCategoryStyle(category.name).icon" class="w-7 h-7" />
              </div>
              <div>
                <h3 class="font-bold text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors">
                  {{ category.name }}
                </h3>
                <p class="text-sm text-gray-500">{{ category.count }} 篇文章</p>
              </div>
            </div>
          </button>
        </div>

        <!-- Selected Category Posts -->
        <div v-if="selectedCategory">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white">
              <Icon icon="fas:folder-open" class="w-5 h-5 inline text-[#49b1f5]" />
              {{ selectedCategory }}
              <span class="text-base font-normal text-gray-500 ml-2">({{ filteredPosts.length }} 篇)</span>
            </h2>
            <button 
              @click="selectCategory(selectedCategory!)"
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
          <p class="text-gray-500">点击上方分类查看相关文章</p>
        </div>
      </div>
    </div>
  </div>
</template>
