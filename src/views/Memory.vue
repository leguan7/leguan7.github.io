<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const memories = ref([
  {
    id: 1,
    title: '2025 年度回顾',
    date: '2025-12-31',
    cover: 'https://placehold.co/600x400/49b1f5/white?text=2025',
    content: '这一年经历了很多，成长了很多...'
  },
])
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
        <Icon icon="fas:camera-retro" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">记忆胶囊</h1>
        <p class="mt-2 text-white/80">封存那些珍贵的回忆</p>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" class="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Memory Grid -->
      <div class="grid gap-6 md:grid-cols-2">
        <div 
          v-for="memory in memories"
          :key="memory.id"
          class="card overflow-hidden group cursor-pointer"
        >
          <div class="relative aspect-video overflow-hidden">
            <img 
              :src="memory.cover"
              :alt="memory.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <span class="text-sm text-white/80">{{ memory.date }}</span>
              <h3 class="text-xl font-bold">{{ memory.title }}</h3>
            </div>
          </div>

          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400 line-clamp-2">{{ memory.content }}</p>
            <button class="mt-3 text-[#49b1f5] font-medium flex items-center hover:underline">
              打开胶囊
              <Icon icon="fas:arrow-right" class="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="memories.length === 0" class="card p-12 text-center">
        <Icon icon="fas:box-open" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p class="text-gray-500">还没有记忆胶囊</p>
        <p class="text-sm text-gray-400 mt-2">等待那些值得珍藏的瞬间...</p>
      </div>
    </div>
  </div>
</template>
