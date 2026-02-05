<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useBlogStore } from '@/stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

const stats = computed(() => ({
  posts: blogStore.posts.length,
  tags: blogStore.allTags.length,
  categories: blogStore.allCategories.length
}))

const topTags = computed(() => blogStore.allTags.slice(0, 15))
const recentPosts = computed(() => blogStore.sortedPosts.slice(0, 5))

function navigateToTag(tag: string) {
  router.push({ path: '/tags', query: { tag } })
}
</script>

<template>
  <aside class="space-y-5 sticky top-20">
    <!-- 博主信息卡片 - Butterfly 风格 -->
    <div class="card overflow-hidden">
      <!-- 封面背景 -->
      <div 
        class="h-24 bg-cover bg-center"
        style="background-image: url('/img/default-cover.jpg');"
      >
        <div class="h-full bg-black/30"></div>
      </div>
      
      <!-- 头像和信息 -->
      <div class="px-5 pb-5 -mt-12 text-center">
        <img 
          src="/img/avatar.jpg" 
          alt="Leguan" 
          class="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-lg"
          onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=Leguan'"
        />
        <h3 class="mt-3 text-xl font-bold text-gray-800 dark:text-white">Leguan</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">A person who wants to see the world</p>
        
        <!-- 统计 -->
        <div class="flex justify-around mt-4 py-3 border-t border-b border-gray-100 dark:border-gray-700">
          <router-link to="/archives" class="text-center group">
            <div class="text-lg font-bold text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors">{{ stats.posts }}</div>
            <div class="text-xs text-gray-500">文章</div>
          </router-link>
          <router-link to="/tags" class="text-center group">
            <div class="text-lg font-bold text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors">{{ stats.tags }}</div>
            <div class="text-xs text-gray-500">标签</div>
          </router-link>
          <router-link to="/categories" class="text-center group">
            <div class="text-lg font-bold text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors">{{ stats.categories }}</div>
            <div class="text-xs text-gray-500">分类</div>
          </router-link>
        </div>

        <!-- 关注按钮 -->
        <a 
          href="https://github.com/leguan7" 
          target="_blank"
          class="mt-4 w-full btn btn-primary"
        >
          <Icon icon="fab:github" class="w-4 h-4 mr-2" />
          Follow Me
        </a>
      </div>
    </div>

    <!-- 公告 -->
    <div class="card p-4">
      <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
        <Icon icon="fas:bullhorn" class="w-4 h-4 text-[#49b1f5]" />
        <h4 class="font-bold text-gray-800 dark:text-white">公告</h4>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        欢迎来到 Leguan's Blog！Digest your emotions.
      </p>
    </div>

    <!-- 最新文章 -->
    <div class="card p-4">
      <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
        <Icon icon="fas:history" class="w-4 h-4 text-[#49b1f5]" />
        <h4 class="font-bold text-gray-800 dark:text-white">最新文章</h4>
      </div>
      <div class="space-y-3">
        <router-link 
          v-for="post in recentPosts"
          :key="post.slug"
          :to="`/post/${post.slug}`"
          class="flex items-center space-x-3 group"
        >
          <img 
            :src="post.cover || '/img/default-cover.jpg'"
            :alt="post.title"
            class="w-16 h-12 rounded object-cover"
          />
          <div class="flex-1 min-w-0">
            <h5 class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#49b1f5] transition-colors line-clamp-2">
              {{ post.title }}
            </h5>
            <p class="text-xs text-gray-400 mt-0.5">{{ post.date }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 标签云 -->
    <div class="card p-4">
      <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
        <Icon icon="fas:tags" class="w-4 h-4 text-[#49b1f5]" />
        <h4 class="font-bold text-gray-800 dark:text-white">标签</h4>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in topTags"
          :key="tag.name"
          @click="navigateToTag(tag.name)"
          class="tag"
        >
          {{ tag.name }}
        </button>
      </div>
      <router-link 
        v-if="blogStore.allTags.length > 15"
        to="/tags" 
        class="block mt-3 text-sm text-[#49b1f5] hover:underline text-center"
      >
        查看全部 <Icon icon="fas:angle-right" class="w-3 h-3 inline" />
      </router-link>
    </div>

    <!-- 分类 -->
    <div class="card p-4">
      <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
        <Icon icon="fas:folder-open" class="w-4 h-4 text-[#49b1f5]" />
        <h4 class="font-bold text-gray-800 dark:text-white">分类</h4>
      </div>
      <div class="space-y-2">
        <router-link 
          v-for="category in blogStore.allCategories.slice(0, 8)"
          :key="category.name"
          :to="{ path: '/categories', query: { category: category.name } }"
          class="flex items-center justify-between py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#49b1f5] transition-colors"
        >
          <span>
            <Icon icon="fas:angle-right" class="w-3 h-3 inline mr-1" />
            {{ category.name }}
          </span>
          <span class="text-xs text-gray-400">({{ category.count }})</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>
