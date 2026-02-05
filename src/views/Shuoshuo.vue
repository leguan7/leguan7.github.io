<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const shuoshuos = ref([
  {
    id: 1,
    content: '今天天气真好，适合出去走走 ☀️',
    date: '2026-02-04 14:30',
    likes: 5
  },
  {
    id: 2,
    content: '新年新气象，给博客换了新皮肤！',
    date: '2026-02-01 10:00',
    likes: 12
  },
  {
    id: 3,
    content: '学习 Vue 3 中，感觉 Composition API 真的很香 💚',
    date: '2026-01-28 20:15',
    likes: 8
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
        <Icon icon="fas:comment" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">闲言碎语</h1>
        <p class="mt-2 text-white/80">记录生活中的点点滴滴</p>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" class="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Timeline -->
      <div class="relative pl-8">
        <div class="absolute left-3 top-0 bottom-0 w-0.5 bg-[#49b1f5]/30"></div>

        <div class="space-y-6">
          <div 
            v-for="item in shuoshuos"
            :key="item.id"
            class="relative"
          >
            <div class="absolute -left-5 top-4 w-4 h-4 rounded-full bg-[#49b1f5] shadow-lg"></div>

            <div class="card p-5">
              <p class="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">{{ item.content }}</p>
              
              <div class="flex items-center justify-between mt-4 text-sm text-gray-400">
                <span class="flex items-center">
                  <Icon icon="fas:clock" class="w-4 h-4 mr-1" />
                  {{ item.date }}
                </span>
                <button class="flex items-center hover:text-red-500 transition-colors">
                  <Icon icon="fas:heart" class="w-4 h-4 mr-1" />
                  {{ item.likes }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="shuoshuos.length === 0" class="card p-12 text-center">
        <Icon icon="fas:comment-slash" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p class="text-gray-500">还没有碎碎念</p>
      </div>
    </div>
  </div>
</template>
