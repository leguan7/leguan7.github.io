<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { Post } from '@/types'
import { formatDate, estimateReadingTime } from '@/utils/markdown'

const props = defineProps<{
  post: Post
  layout?: 'left' | 'right'
}>()

const readingTime = computed(() => estimateReadingTime(props.post.content))
const formattedDate = computed(() => formatDate(props.post.date))

// 默认封面图
const coverImage = computed(() => {
  if (props.post.cover) return props.post.cover
  // 使用默认封面
  const defaultCovers = ['/img/default-cover.jpg', '/img/background.jpg', '/img/archive-bg.jpg']
  const index = props.post.slug.length % defaultCovers.length
  return defaultCovers[index]
})
</script>

<template>
  <article 
    class="card overflow-hidden group"
    :class="layout === 'right' ? 'md:flex md:flex-row-reverse' : 'md:flex'"
  >
    <!-- 封面图 -->
    <router-link 
      :to="`/post/${post.slug}`"
      class="block md:w-2/5 relative overflow-hidden"
    >
      <div class="aspect-[16/10] md:aspect-auto md:h-full">
        <img 
          :src="coverImage" 
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <!-- 遮罩层 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </router-link>

    <!-- 内容 -->
    <div class="md:w-3/5 p-5 md:p-6 flex flex-col justify-center">
      <!-- 分类 -->
      <div class="flex flex-wrap gap-2 mb-3">
        <router-link
          v-for="category in post.categories"
          :key="category"
          :to="{ path: '/categories', query: { category } }"
          class="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#49b1f5]/10 text-[#49b1f5] hover:bg-[#49b1f5] hover:text-white transition-colors"
        >
          <Icon icon="fas:folder" class="w-3 h-3 inline mr-1" />
          {{ category }}
        </router-link>
      </div>

      <!-- 标题 -->
      <router-link :to="`/post/${post.slug}`">
        <h2 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors line-clamp-2">
          {{ post.title }}
        </h2>
      </router-link>

      <!-- 元信息 -->
      <div class="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
        <span class="flex items-center space-x-1">
          <Icon icon="fas:calendar-alt" class="w-4 h-4" />
          <span>{{ formattedDate }}</span>
        </span>
        <span class="flex items-center space-x-1">
          <Icon icon="fas:clock" class="w-4 h-4" />
          <span>{{ readingTime }} 分钟</span>
        </span>
      </div>

      <!-- 摘要 -->
      <p class="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
        {{ post.excerpt }}
      </p>

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2 mt-4">
        <router-link
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          :to="{ path: '/tags', query: { tag } }"
          class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#49b1f5] hover:text-white transition-colors"
        >
          <Icon icon="fas:hashtag" class="w-3 h-3 inline" />{{ tag }}
        </router-link>
      </div>
    </div>
  </article>
</template>
