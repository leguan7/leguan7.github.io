<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const fitnessLogs = ref([
  {
    id: 1,
    date: '2026-02-04',
    type: '力量训练',
    icon: 'fas:dumbbell',
    duration: 60,
    exercises: ['卧推', '深蹲', '硬拉'],
    notes: '今天状态不错，增加了重量'
  },
  {
    id: 2,
    date: '2026-02-03',
    type: '有氧运动',
    icon: 'fas:running',
    duration: 45,
    exercises: ['跑步 5km'],
    notes: '配速提升了'
  },
])

const stats = ref({
  totalWorkouts: 52,
  thisMonth: 12,
  streak: 7,
  totalHours: 78
})
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
        <Icon icon="fas:dumbbell" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">健身日寄</h1>
        <p class="mt-2 text-white/80">记录每一次进步</p>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" class="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-5 text-center">
          <Icon icon="fas:fire" class="w-8 h-8 mx-auto text-orange-500 mb-2" />
          <div class="text-2xl font-bold text-gray-800 dark:text-white">{{ stats.totalWorkouts }}</div>
          <div class="text-sm text-gray-500">总训练次数</div>
        </div>
        <div class="card p-5 text-center">
          <Icon icon="fas:calendar-check" class="w-8 h-8 mx-auto text-blue-500 mb-2" />
          <div class="text-2xl font-bold text-gray-800 dark:text-white">{{ stats.thisMonth }}</div>
          <div class="text-sm text-gray-500">本月训练</div>
        </div>
        <div class="card p-5 text-center">
          <Icon icon="fas:bolt" class="w-8 h-8 mx-auto text-yellow-500 mb-2" />
          <div class="text-2xl font-bold text-gray-800 dark:text-white">{{ stats.streak }}</div>
          <div class="text-sm text-gray-500">连续天数</div>
        </div>
        <div class="card p-5 text-center">
          <Icon icon="fas:clock" class="w-8 h-8 mx-auto text-green-500 mb-2" />
          <div class="text-2xl font-bold text-gray-800 dark:text-white">{{ stats.totalHours }}h</div>
          <div class="text-sm text-gray-500">累计时长</div>
        </div>
      </div>

      <!-- Logs -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <Icon icon="fas:list" class="w-5 h-5 mr-2 text-[#49b1f5]" />
          训练记录
        </h2>
        
        <div 
          v-for="log in fitnessLogs"
          :key="log.id"
          class="card p-5 flex items-start space-x-4"
        >
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#49b1f5] to-[#0abcf9] flex items-center justify-center text-white shadow-lg">
            <Icon :icon="log.icon" class="w-6 h-6" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-gray-800 dark:text-white">{{ log.type }}</h3>
              <span class="text-sm text-gray-400">{{ log.date }}</span>
            </div>
            
            <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span class="flex items-center">
                <Icon icon="fas:clock" class="w-4 h-4 mr-1" />
                {{ log.duration }} 分钟
              </span>
            </div>

            <div class="flex flex-wrap gap-2 mt-3">
              <span 
                v-for="exercise in log.exercises"
                :key="exercise"
                class="px-2 py-1 text-xs rounded-full bg-[#49b1f5]/10 text-[#49b1f5]"
              >
                {{ exercise }}
              </span>
            </div>

            <p v-if="log.notes" class="mt-3 text-sm text-gray-500">
              <Icon icon="fas:sticky-note" class="w-4 h-4 inline mr-1" />
              {{ log.notes }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="fitnessLogs.length === 0" class="card p-12 text-center">
        <Icon icon="fas:dumbbell" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p class="text-gray-500">还没有健身记录</p>
      </div>
    </div>
  </div>
</template>
