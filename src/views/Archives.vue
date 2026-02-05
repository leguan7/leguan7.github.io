<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBlogStore } from '@/stores/blog'
import { formatDate } from '@/utils/markdown'

const blogStore = useBlogStore()
</script>

<template>
  <div>
    <!-- Banner - Butterfly 风格 -->
    <header class="relative h-[40vh] min-h-[300px] flex items-center justify-center">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-fixed"
        style="background-image: url('/img/archive-bg.jpg');"
      >
        <div class="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div class="relative text-center text-white">
        <Icon icon="fas:archive" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">归档</h1>
        <p class="mt-2 text-white/80">共 {{ blogStore.posts.length }} 篇文章</p>
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

    <!-- Timeline -->
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="blogStore.isLoading" class="card p-12 text-center">
        <Icon icon="fas:spinner" class="w-12 h-12 animate-spin text-[#49b1f5] mx-auto" />
      </div>

      <div v-else class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-[#49b1f5]/30"></div>

        <!-- Years -->
        <div 
          v-for="[year, posts] in blogStore.archivesByYear" 
          :key="year"
          class="mb-8"
        >
          <!-- Year Badge -->
          <div class="relative flex items-center mb-6">
            <div class="w-12 h-12 rounded-full bg-[#49b1f5] text-white flex items-center justify-center font-bold text-lg shadow-lg z-10">
              <Icon icon="fas:calendar-alt" class="w-5 h-5" />
            </div>
            <span class="ml-4 text-2xl font-bold text-gray-800 dark:text-white">{{ year }}</span>
            <span class="ml-2 text-gray-400">({{ posts.length }}篇)</span>
          </div>

          <!-- Posts -->
          <div class="space-y-3 pl-6">
            <router-link 
              v-for="post in posts"
              :key="post.slug"
              :to="`/post/${post.slug}`"
              class="card p-4 ml-6 flex items-center space-x-4 group relative"
            >
              <!-- Dot -->
              <div class="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#49b1f5] group-hover:bg-[#49b1f5] transition-colors"></div>
              
              <!-- Date -->
              <div class="text-sm text-gray-400 w-20 shrink-0">
                {{ formatDate(post.date, 'short') }}
              </div>
              
              <!-- Title -->
              <h3 class="flex-1 font-medium text-gray-800 dark:text-white group-hover:text-[#49b1f5] transition-colors line-clamp-1">
                {{ post.title }}
              </h3>

              <!-- Tags -->
              <div class="hidden md:flex gap-1">
                <span 
                  v-for="tag in post.tags.slice(0, 2)"
                  :key="tag"
                  class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500"
                >
                  {{ tag }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
