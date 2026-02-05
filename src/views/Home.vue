<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useBlogStore } from '@/stores/blog'
import PostCard from '@/components/PostCard.vue'
import Sidebar from '@/components/Sidebar.vue'

const blogStore = useBlogStore()

const currentPage = ref(1)
const postsPerPage = 6
const typedText = ref('')
const fullText = 'Digest your emotions'
const cursorVisible = ref(true)

// 打字机效果
onMounted(() => {
  let i = 0
  const typeInterval = setInterval(() => {
    if (i < fullText.length) {
      typedText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(typeInterval)
    }
  }, 100)

  // 光标闪烁
  setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return blogStore.filteredPosts.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(blogStore.filteredPosts.length / postsPerPage)
)

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })
  }
}

watch(() => blogStore.searchQuery, () => {
  currentPage.value = 1
})

function scrollDown() {
  document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div>
    <!-- Hero Banner - Butterfly 风格 -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- 背景图 -->
      <div 
        class="absolute inset-0 bg-cover bg-center bg-fixed"
        style="background-image: url('/img/background.jpg');"
      >
        <div class="absolute inset-0 bg-black/30"></div>
      </div>
      
      <!-- 内容 -->
      <div class="relative text-center text-white z-10 px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
          Leguan's Blog
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-2">
          <span>{{ typedText }}</span>
          <span 
            class="inline-block w-0.5 h-6 bg-white ml-1 align-middle"
            :class="{ 'opacity-0': !cursorVisible }"
          ></span>
        </p>
        <p class="text-white/70">A person who wants to see the world</p>
        
        <!-- 统计信息 -->
        <div class="flex justify-center space-x-8 mt-8">
          <div class="text-center">
            <div class="text-3xl font-bold">{{ blogStore.posts.length }}</div>
            <div class="text-sm text-white/70">文章</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">{{ blogStore.allTags.length }}</div>
            <div class="text-sm text-white/70">标签</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">{{ blogStore.allCategories.length }}</div>
            <div class="text-sm text-white/70">分类</div>
          </div>
        </div>
      </div>

      <!-- 向下滚动提示 -->
      <button 
        @click="scrollDown"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
      >
        <Icon icon="fas:chevron-down" class="w-8 h-8" />
      </button>

      <!-- 波浪装饰 -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path 
            d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>
    </section>

    <!-- 搜索结果提示 -->
    <div 
      v-if="blogStore.searchQuery" 
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
    >
      <div class="card flex items-center justify-between px-5 py-3">
        <span class="text-[#49b1f5]">
          <Icon icon="fas:search" class="w-4 h-4 inline mr-2" />
          搜索 "{{ blogStore.searchQuery }}" 找到 {{ blogStore.filteredPosts.length }} 篇文章
        </span>
        <button 
          @click="blogStore.setSearchQuery('')"
          class="text-gray-400 hover:text-gray-600"
        >
          <Icon icon="fas:times" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- 文章列表区域 -->
    <section id="posts-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:flex lg:space-x-8">
        <!-- 文章列表 -->
        <div class="lg:w-2/3 space-y-6">
          <!-- Loading -->
          <div v-if="blogStore.isLoading" class="card p-12 text-center">
            <Icon icon="fas:spinner" class="w-12 h-12 animate-spin text-[#49b1f5] mx-auto" />
            <p class="mt-4 text-gray-500">加载中...</p>
          </div>

          <!-- Empty -->
          <div v-else-if="blogStore.filteredPosts.length === 0" class="card p-12 text-center">
            <Icon icon="fas:inbox" class="w-16 h-16 text-gray-300 mx-auto" />
            <p class="mt-4 text-gray-500">暂无文章</p>
          </div>

          <!-- Posts - Butterfly 交替布局 (index_layout: 3) -->
          <template v-else>
            <PostCard 
              v-for="(post, index) in paginatedPosts" 
              :key="post.slug" 
              :post="post" 
              :layout="index % 2 === 0 ? 'left' : 'right'"
            />
          </template>

          <!-- Pagination - Butterfly 风格 -->
          <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 pt-4">
            <button 
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
              :class="currentPage === 1 ? '' : 'card hover:bg-[#49b1f5] hover:text-white'"
            >
              <Icon icon="fas:chevron-left" class="w-4 h-4" />
            </button>

            <template v-for="page in totalPages" :key="page">
              <button 
                v-if="page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
                @click="goToPage(page)"
                class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                :class="page === currentPage 
                  ? 'bg-[#49b1f5] text-white shadow-lg' 
                  : 'card hover:bg-[#49b1f5] hover:text-white'"
              >
                {{ page }}
              </button>
              <span 
                v-else-if="page === currentPage - 2 || page === currentPage + 2"
                class="text-gray-400"
              >
                ...
              </span>
            </template>

            <button 
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
              :class="currentPage === totalPages ? '' : 'card hover:bg-[#49b1f5] hover:text-white'"
            >
              <Icon icon="fas:chevron-right" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:w-1/3 mt-8 lg:mt-0">
          <Sidebar />
        </div>
      </div>
    </section>
  </div>
</template>
