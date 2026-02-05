<script setup lang="ts">
import { Icon } from '@iconify/vue'

const skills = [
  { name: 'Vue.js', icon: 'fab:vuejs', color: '#42b883' },
  { name: 'TypeScript', icon: 'fab:js', color: '#3178c6' },
  { name: 'Node.js', icon: 'fab:node-js', color: '#339933' },
  { name: 'Python', icon: 'fab:python', color: '#3776ab' },
  { name: 'Git', icon: 'fab:git-alt', color: '#f05032' },
  { name: 'Docker', icon: 'fab:docker', color: '#2496ed' },
]

const timeline = [
  { year: '2026', event: '开始写博客，分享技术与生活', icon: 'fas:pen' },
  { year: '2025', event: '探索新技术，不断学习成长', icon: 'fas:rocket' },
  { year: '2024', event: '在编程的道路上持续前行', icon: 'fas:code' },
]
</script>

<template>
  <div>
    <!-- Banner -->
    <header class="relative h-[50vh] min-h-[350px] flex items-center justify-center">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-fixed"
        style="background-image: url('/img/about-bg.jpg');"
      >
        <div class="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div class="relative text-center text-white">
        <img 
          src="/img/avatar.jpg" 
          alt="Leguan" 
          class="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-xl mb-4"
          onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=Leguan'"
        />
        <h1 class="text-4xl font-bold">关于我</h1>
        <p class="mt-2 text-white/80 text-xl">Leguan</p>
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

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 个人介绍 -->
      <div class="card p-6 md:p-8 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <Icon icon="fas:user" class="w-6 h-6 mr-2 text-[#49b1f5]" />
          个人简介
        </h2>
        <div class="text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
          <p>
            你好！我是 <strong class="text-[#49b1f5]">Leguan</strong>，一个想要看看世界的人。
          </p>
          <blockquote class="border-l-4 border-[#49b1f5] pl-4 py-2 bg-[#49b1f5]/5 rounded-r-lg italic">
            "Digest your emotions" — 消化你的情绪
          </blockquote>
          <p>
            这个博客是我记录生活、分享技术、沉淀思考的地方。在这里，你可以看到：
          </p>
          <ul class="space-y-2 pl-4">
            <li class="flex items-center">
              <Icon icon="fas:check-circle" class="w-5 h-5 text-green-500 mr-2" />
              技术分享与学习笔记
            </li>
            <li class="flex items-center">
              <Icon icon="fas:check-circle" class="w-5 h-5 text-green-500 mr-2" />
              生活随笔与感悟
            </li>
            <li class="flex items-center">
              <Icon icon="fas:check-circle" class="w-5 h-5 text-green-500 mr-2" />
              追番记录与动漫推荐
            </li>
            <li class="flex items-center">
              <Icon icon="fas:check-circle" class="w-5 h-5 text-green-500 mr-2" />
              健身日志与自我提升
            </li>
          </ul>
        </div>
      </div>

      <!-- 技术栈 -->
      <div class="card p-6 md:p-8 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <Icon icon="fas:code" class="w-6 h-6 mr-2 text-[#49b1f5]" />
          技术栈
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            v-for="skill in skills"
            :key="skill.name"
            class="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <Icon :icon="skill.icon" class="w-8 h-8" :style="{ color: skill.color }" />
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <!-- 时间线 -->
      <div class="card p-6 md:p-8 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <Icon icon="fas:history" class="w-6 h-6 mr-2 text-[#49b1f5]" />
          时间线
        </h2>
        <div class="relative pl-6">
          <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-[#49b1f5]/30"></div>
          <div class="space-y-6">
            <div 
              v-for="item in timeline"
              :key="item.year"
              class="relative"
            >
              <div class="absolute -left-4 w-4 h-4 rounded-full bg-[#49b1f5]"></div>
              <div class="ml-4">
                <div class="font-bold text-[#49b1f5]">{{ item.year }}</div>
                <div class="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                  <Icon :icon="item.icon" class="w-4 h-4 mr-2" />
                  {{ item.event }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="card p-6 md:p-8">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <Icon icon="fas:envelope" class="w-6 h-6 mr-2 text-[#49b1f5]" />
          联系我
        </h2>
        <div class="flex flex-wrap gap-4">
          <a 
            href="https://github.com/leguan7" 
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            <Icon icon="fab:github" class="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a 
            href="mailto:leguan@example.com"
            class="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <Icon icon="fas:envelope" class="w-5 h-5" />
            <span>Email</span>
          </a>
          <router-link 
            to="/messageboard"
            class="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#49b1f5] text-white hover:bg-[#3ca5e8] transition-colors"
          >
            <Icon icon="fas:comment-dots" class="w-5 h-5" />
            <span>留言板</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
