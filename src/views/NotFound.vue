<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <div class="text-[150px] font-bold leading-none text-[#49b1f5] opacity-20">404</div>
      <div class="-mt-16">
        <Icon icon="fas:ghost" class="w-24 h-24 mx-auto text-[#49b1f5] mb-6 animate-bounce" />
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">页面不存在</h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8">抱歉，你访问的页面似乎已经迷路了...</p>
        <router-link to="/" class="btn btn-primary">
          <Icon icon="fas:home" class="w-5 h-5 mr-2" />
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>
