<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const bangumis = ref([
  {
    id: 1,
    name: '葬送的芙莉莲',
    cover: 'https://placehold.co/300x400/49b1f5/white?text=葬送的芙莉莲',
    status: 'watching',
    progress: '28/28',
    rating: 5,
    comment: '神作，强烈推荐'
  },
  {
    id: 2,
    name: '咒术回战',
    cover: 'https://placehold.co/300x400/f59e0b/white?text=咒术回战',
    status: 'watching',
    progress: '23/??',
    rating: 4,
    comment: '打斗场面炸裂'
  },
])

const statusMap = {
  watching: { label: '在看', color: 'bg-green-500' },
  completed: { label: '已看', color: 'bg-blue-500' },
  planned: { label: '想看', color: 'bg-yellow-500' },
  dropped: { label: '弃坑', color: 'bg-red-500' },
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
        <Icon icon="fas:video" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">番剧</h1>
        <p class="mt-2 text-white/80">我的追番记录</p>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" class="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-5 text-center">
          <div class="text-3xl font-bold text-[#49b1f5]">{{ bangumis.length }}</div>
          <div class="text-sm text-gray-500">总计</div>
        </div>
        <div class="card p-5 text-center">
          <div class="text-3xl font-bold text-green-500">{{ bangumis.filter(b => b.status === 'watching').length }}</div>
          <div class="text-sm text-gray-500">在看</div>
        </div>
        <div class="card p-5 text-center">
          <div class="text-3xl font-bold text-blue-500">{{ bangumis.filter(b => b.status === 'completed').length }}</div>
          <div class="text-sm text-gray-500">已看</div>
        </div>
        <div class="card p-5 text-center">
          <div class="text-3xl font-bold text-yellow-500">{{ bangumis.filter(b => b.status === 'planned').length }}</div>
          <div class="text-sm text-gray-500">想看</div>
        </div>
      </div>

      <!-- Bangumi Grid -->
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div 
          v-for="bangumi in bangumis"
          :key="bangumi.id"
          class="card overflow-hidden group"
        >
          <div class="relative aspect-[3/4] overflow-hidden">
            <img 
              :src="bangumi.cover"
              :alt="bangumi.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div 
              class="absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white rounded-full"
              :class="statusMap[bangumi.status as keyof typeof statusMap].color"
            >
              {{ statusMap[bangumi.status as keyof typeof statusMap].label }}
            </div>
          </div>

          <div class="p-4">
            <h3 class="font-bold text-gray-800 dark:text-white line-clamp-1">{{ bangumi.name }}</h3>
            
            <div class="flex items-center space-x-0.5 mt-2">
              <Icon 
                v-for="i in 5"
                :key="i"
                :icon="i <= bangumi.rating ? 'fas:star' : 'far:star'"
                :class="i <= bangumi.rating ? 'text-yellow-500' : 'text-gray-300'"
                class="w-4 h-4"
              />
            </div>

            <div class="flex items-center space-x-2 mt-2 text-sm text-gray-500">
              <Icon icon="fas:play-circle" class="w-4 h-4" />
              <span>{{ bangumi.progress }}</span>
            </div>

            <p class="mt-2 text-sm text-gray-500 line-clamp-2">{{ bangumi.comment }}</p>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="bangumis.length === 0" class="card p-12 text-center">
        <Icon icon="fas:tv" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p class="text-gray-500">还没有追番记录</p>
      </div>
    </div>
  </div>
</template>
