import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Post, PostMeta } from '@/types'
import { parseMarkdown, extractExcerpt } from '@/utils/markdown'

export const useBlogStore = defineStore('blog', () => {
  // 状态
  const posts = ref<Post[]>([])
  const isLoading = ref(false)
  const isDark = ref(false)
  const searchQuery = ref('')

  // 计算属性
  const sortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  })

  const filteredPosts = computed(() => {
    if (!searchQuery.value) return sortedPosts.value
    const query = searchQuery.value.toLowerCase()
    return sortedPosts.value.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.categories.some(cat => cat.toLowerCase().includes(query))
    )
  })

  const allTags = computed(() => {
    const tagMap = new Map<string, number>()
    posts.value.forEach(post => {
      post.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    })
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  })

  const allCategories = computed(() => {
    const catMap = new Map<string, number>()
    posts.value.forEach(post => {
      post.categories.forEach(cat => {
        catMap.set(cat, (catMap.get(cat) || 0) + 1)
      })
    })
    return Array.from(catMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  })

  const archivesByYear = computed(() => {
    const archiveMap = new Map<string, Post[]>()
    sortedPosts.value.forEach(post => {
      const year = new Date(post.date).getFullYear().toString()
      if (!archiveMap.has(year)) {
        archiveMap.set(year, [])
      }
      archiveMap.get(year)!.push(post)
    })
    return Array.from(archiveMap.entries())
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
  })

  // 方法
  async function loadPosts() {
    isLoading.value = true
    try {
      // 加载文章列表元数据
      const response = await fetch(`${import.meta.env.BASE_URL}posts/index.json`)
      const postMetas: PostMeta[] = await response.json()

      // 加载每篇文章的内容
      const loadedPosts = await Promise.all(
        postMetas.map(async (meta) => {
          try {
            const contentResponse = await fetch(`${import.meta.env.BASE_URL}posts/${meta.slug}.md`)
            const markdown = await contentResponse.text()
            const { content, html } = parseMarkdown(markdown)
            
            return {
              ...meta,
              content,
              html,
              excerpt: meta.excerpt || extractExcerpt(content)
            } as Post
          } catch (error) {
            console.error(`Failed to load post: ${meta.slug}`, error)
            return null
          }
        })
      )

      posts.value = loadedPosts.filter((post): post is Post => post !== null)
    } catch (error) {
      console.error('Failed to load posts:', error)
      // 使用内置的默认文章
      posts.value = getDefaultPosts()
    } finally {
      isLoading.value = false
    }
  }

  function getPostBySlug(slug: string): Post | undefined {
    return posts.value.find(post => post.slug === slug)
  }

  function getPostsByTag(tag: string): Post[] {
    return sortedPosts.value.filter(post => post.tags.includes(tag))
  }

  function getPostsByCategory(category: string): Post[] {
    return sortedPosts.value.filter(post => post.categories.includes(category))
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  return {
    // 状态
    posts,
    isLoading,
    isDark,
    searchQuery,
    // 计算属性
    sortedPosts,
    filteredPosts,
    allTags,
    allCategories,
    archivesByYear,
    // 方法
    loadPosts,
    getPostBySlug,
    getPostsByTag,
    getPostsByCategory,
    initTheme,
    toggleTheme,
    setSearchQuery
  }
})

// 默认文章（当无法加载时使用）
function getDefaultPosts(): Post[] {
  return [
    {
      slug: 'welcome',
      title: '欢迎来到 Leguan\'s Blog',
      date: '2026-02-04',
      tags: ['博客', '生活'],
      categories: ['随笔'],
      cover: '',
      excerpt: '这是我的第一篇博客文章。Digest your emotions - 消化你的情绪。',
      content: '# 欢迎！\n\n这是我的第一篇博客文章。\n\n## 关于这个博客\n\n**Digest your emotions** - 消化你的情绪。\n\n我是 Leguan，一个想要看看世界的人。',
      html: '<h1>欢迎！</h1><p>这是我的第一篇博客文章。</p><h2>关于这个博客</h2><p><strong>Digest your emotions</strong> - 消化你的情绪。</p><p>我是 Leguan，一个想要看看世界的人。</p>'
    }
  ]
}
