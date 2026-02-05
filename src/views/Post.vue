<script setup lang="ts">
import { computed, watch, ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useBlogStore } from '@/stores/blog'
import { formatDate, estimateReadingTime } from '@/utils/markdown'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const slug = computed(() => route.params.slug as string)
const post = computed(() => blogStore.getPostBySlug(slug.value))

const readingTime = computed(() => post.value ? estimateReadingTime(post.value.content) : 0)
const formattedDate = computed(() => post.value ? formatDate(post.value.date) : '')
const wordCount = computed(() => post.value ? post.value.content.length : 0)

// 封面图
const coverImage = computed(() => {
  if (post.value?.cover) return post.value.cover
  return '/img/default-cover.jpg'
})

// 相关文章
const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogStore.sortedPosts
    .filter(p => 
      p.slug !== post.value!.slug && 
      (p.tags.some(t => post.value!.tags.includes(t)) ||
       p.categories.some(c => post.value!.categories.includes(c)))
    )
    .slice(0, 6)
})

// 上一篇/下一篇
const prevPost = computed(() => {
  if (!post.value) return null
  const index = blogStore.sortedPosts.findIndex(p => p.slug === post.value!.slug)
  return index < blogStore.sortedPosts.length - 1 ? blogStore.sortedPosts[index + 1] : null
})

const nextPost = computed(() => {
  if (!post.value) return null
  const index = blogStore.sortedPosts.findIndex(p => p.slug === post.value!.slug)
  return index > 0 ? blogStore.sortedPosts[index - 1] : null
})

// TOC
const toc = ref<Array<{ id: string, text: string, level: number }>>([])

function generateToc() {
  if (!post.value) return
  
  const container = document.createElement('div')
  container.innerHTML = post.value.html
  const headings = container.querySelectorAll('h1, h2, h3')
  
  toc.value = Array.from(headings).map((heading, index) => {
    const level = parseInt(heading.tagName[1])
    const text = heading.textContent || ''
    const id = `heading-${index}`
    return { id, text, level }
  })
}

watch(post, () => {
  nextTick(() => {
    generateToc()
  })
}, { immediate: true })

// 404 处理
watch(
  () => [blogStore.isLoading, post.value],
  ([loading, p]) => {
    if (!loading && !p && blogStore.posts.length > 0) {
      router.push('/404')
    }
  }
)
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="blogStore.isLoading" class="min-h-screen flex items-center justify-center">
      <Icon icon="fas:spinner" class="w-12 h-12 animate-spin text-[#49b1f5]" />
    </div>

    <!-- Post Content -->
    <article v-else-if="post">
      <!-- Banner - Butterfly 风格 -->
      <header class="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <!-- 背景图 -->
        <div 
          class="absolute inset-0 bg-cover bg-center bg-fixed"
          :style="{ backgroundImage: `url(${coverImage})` }"
        >
          <div class="absolute inset-0 bg-black/40"></div>
        </div>
        
        <!-- 标题信息 -->
        <div class="relative text-center text-white px-4 max-w-4xl mx-auto">
          <!-- 分类 -->
          <div class="flex justify-center gap-2 mb-4">
            <router-link
              v-for="category in post.categories"
              :key="category"
              :to="{ path: '/categories', query: { category } }"
              class="px-3 py-1 text-sm bg-white/20 rounded-full backdrop-blur-sm hover:bg-[#49b1f5] transition-colors"
            >
              <Icon icon="fas:folder" class="w-3 h-3 inline mr-1" />
              {{ category }}
            </router-link>
          </div>

          <!-- 标题 -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
            {{ post.title }}
          </h1>

          <!-- 元信息 -->
          <div class="flex flex-wrap justify-center gap-4 mt-6 text-white/80 text-sm">
            <span class="flex items-center space-x-1">
              <Icon icon="fas:calendar-alt" class="w-4 h-4" />
              <span>发布于 {{ formattedDate }}</span>
            </span>
            <span class="flex items-center space-x-1">
              <Icon icon="fas:clock" class="w-4 h-4" />
              <span>{{ readingTime }} 分钟</span>
            </span>
            <span class="flex items-center space-x-1">
              <Icon icon="fas:book-open" class="w-4 h-4" />
              <span>{{ wordCount }} 字</span>
            </span>
          </div>
        </div>

        <!-- 波浪装饰 -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
            <path 
              d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </div>
      </header>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="lg:flex lg:space-x-8">
          <!-- Article Content -->
          <div class="lg:w-2/3">
            <div class="card p-6 md:p-8">
              <!-- 文章内容 -->
              <div 
                class="article-content"
                v-html="post.html"
              ></div>

              <!-- 文章标签 -->
              <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap gap-2">
                  <router-link
                    v-for="tag in post.tags"
                    :key="tag"
                    :to="{ path: '/tags', query: { tag } }"
                    class="tag"
                  >
                    <Icon icon="fas:hashtag" class="w-3 h-3 inline" />{{ tag }}
                  </router-link>
                </div>
              </div>

              <!-- 版权声明 -->
              <div class="mt-6 p-4 rounded-lg bg-[#49b1f5]/5 border border-[#49b1f5]/20">
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p><strong>本文作者：</strong>Leguan</p>
                  <p><strong>本文链接：</strong>{{ window?.location?.href || '' }}</p>
                  <p><strong>版权声明：</strong>本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="text-[#49b1f5]">CC BY-NC-SA 4.0</a> 许可协议。</p>
                </div>
              </div>
            </div>

            <!-- 文章导航 -->
            <div class="grid md:grid-cols-2 gap-4 mt-6">
              <router-link 
                v-if="prevPost"
                :to="`/post/${prevPost.slug}`"
                class="card p-4 group flex items-center space-x-3"
              >
                <Icon icon="fas:chevron-left" class="w-8 h-8 text-gray-300 group-hover:text-[#49b1f5] transition-colors" />
                <div class="min-w-0">
                  <div class="text-xs text-gray-400 mb-1">上一篇</div>
                  <h4 class="font-medium text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors line-clamp-1">
                    {{ prevPost.title }}
                  </h4>
                </div>
              </router-link>
              <div v-else></div>

              <router-link 
                v-if="nextPost"
                :to="`/post/${nextPost.slug}`"
                class="card p-4 group flex items-center justify-end space-x-3 text-right"
              >
                <div class="min-w-0">
                  <div class="text-xs text-gray-400 mb-1">下一篇</div>
                  <h4 class="font-medium text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors line-clamp-1">
                    {{ nextPost.title }}
                  </h4>
                </div>
                <Icon icon="fas:chevron-right" class="w-8 h-8 text-gray-300 group-hover:text-[#49b1f5] transition-colors" />
              </router-link>
            </div>

            <!-- 相关推荐 -->
            <div v-if="relatedPosts.length > 0" class="card p-6 mt-6">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <Icon icon="fas:thumbs-up" class="w-5 h-5 mr-2 text-[#49b1f5]" />
                相关推荐
              </h3>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <router-link 
                  v-for="related in relatedPosts"
                  :key="related.slug"
                  :to="`/post/${related.slug}`"
                  class="group"
                >
                  <div class="aspect-video rounded-lg overflow-hidden mb-2">
                    <img 
                      :src="related.cover || '/img/default-cover.jpg'"
                      :alt="related.title"
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#49b1f5] transition-colors line-clamp-2">
                    {{ related.title }}
                  </h4>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:w-1/3 mt-8 lg:mt-0">
            <!-- TOC 目录 -->
            <div v-if="toc.length > 0" class="card p-4 mb-5 sticky top-20">
              <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                <Icon icon="fas:list-ul" class="w-4 h-4 text-[#49b1f5]" />
                <h4 class="font-bold text-gray-800 dark:text-white">目录</h4>
              </div>
              <nav class="space-y-1.5 max-h-[50vh] overflow-y-auto text-sm">
                <a 
                  v-for="item in toc"
                  :key="item.id"
                  :href="`#${item.id}`"
                  class="block text-gray-600 dark:text-gray-400 hover:text-[#49b1f5] transition-colors"
                  :class="{ 
                    'pl-0': item.level === 1,
                    'pl-4': item.level === 2,
                    'pl-8': item.level === 3
                  }"
                >
                  {{ item.text }}
                </a>
              </nav>
            </div>

            <Sidebar />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
/* 代码块样式 */
:deep(.hljs) {
  background: #1e1e1e;
  color: #abb2bf;
  padding: 1em;
  border-radius: 0.5rem;
  overflow-x: auto;
}

:deep(pre) {
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
