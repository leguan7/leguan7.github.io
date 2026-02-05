<script setup lang="ts">
import { Icon } from '@iconify/vue'

const links = [
  {
    name: 'Kyle\'s Blog',
    url: 'https://cyborg2077.github.io/',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kyle',
    description: '灵感来源，感谢分享'
  },
]
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
        <Icon icon="fas:user-friends" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">友人帐</h1>
        <p class="mt-2 text-white/80">与有趣的灵魂相遇</p>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" class="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Links Grid -->
      <div class="grid gap-4 md:grid-cols-2">
        <a 
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="card p-5 flex items-center space-x-4 group"
        >
          <img 
            :src="link.avatar" 
            :alt="link.name"
            class="w-16 h-16 rounded-full shadow-md"
          />
          <div class="flex-1">
            <h3 class="font-bold text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors">
              {{ link.name }}
            </h3>
            <p class="text-sm text-gray-500 mt-1">{{ link.description }}</p>
          </div>
          <Icon icon="fas:external-link-alt" class="w-4 h-4 text-gray-400 group-hover:text-[#49b1f5] transition-colors" />
        </a>
      </div>

      <!-- Apply for Link -->
      <div class="card p-8 mt-8 text-center">
        <Icon icon="fas:hand-peace" class="w-12 h-12 mx-auto text-[#49b1f5] mb-4" />
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">想要交换友链？</h3>
        <p class="text-gray-500 mb-6">欢迎在留言板留言或发送邮件给我</p>
        
        <div class="flex flex-wrap justify-center gap-3 mb-6">
          <router-link to="/messageboard" class="btn btn-primary">
            <Icon icon="fas:comment-dots" class="w-4 h-4 mr-2" />
            去留言
          </router-link>
          <a href="mailto:leguan@example.com" class="btn bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
            <Icon icon="fas:envelope" class="w-4 h-4 mr-2" />
            发邮件
          </a>
        </div>
        
        <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-left text-sm">
          <h4 class="font-bold text-gray-700 dark:text-gray-300 mb-2">我的信息：</h4>
          <div class="text-gray-500 space-y-1 font-mono text-xs">
            <p><span class="text-[#49b1f5]">名称:</span> Leguan's Blog</p>
            <p><span class="text-[#49b1f5]">链接:</span> https://leguan7.github.io/Leguan-s-Blog</p>
            <p><span class="text-[#49b1f5]">描述:</span> A person who wants to see the world</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
