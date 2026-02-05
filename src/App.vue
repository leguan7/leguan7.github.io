<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useBlogStore } from '@/stores/blog'

const blogStore = useBlogStore()
const showScrollTop = ref(false)

onMounted(() => {
  blogStore.initTheme()
  blogStore.loadPosts()

  // 滚动监听
  window.addEventListener('scroll', () => {
    showScrollTop.value = window.scrollY > 300
  })
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <!-- 背景图层 -->
  <div class="page-background"></div>
  
  <div class="min-h-screen flex flex-col relative">
    <Navbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />

    <!-- 右侧固定按钮 -->
    <div class="rightside-buttons">
      <!-- 深色模式切换 -->
      <button 
        @click="blogStore.toggleTheme"
        :title="blogStore.isDark ? '切换到浅色模式' : '切换到深色模式'"
      >
        <Icon :icon="blogStore.isDark ? 'fas:sun' : 'fas:moon'" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      
      <!-- 返回顶部 -->
      <transition name="fade">
        <button 
          v-if="showScrollTop"
          @click="scrollToTop"
          title="返回顶部"
        >
          <Icon icon="fas:arrow-up" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </transition>
    </div>
  </div>
</template>
