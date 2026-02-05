<script setup lang="ts">
import { Icon } from '@iconify/vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative mt-8">
    <!-- 半透明背景 -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 backdrop-blur-sm"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white/90">
      <div class="flex flex-col items-center space-y-4">
        <!-- Logo & Slogan -->
        <div class="text-center">
          <h3 class="text-xl font-bold mb-1">Leguan's Blog</h3>
          <p class="text-white/70 italic">"Digest your emotions"</p>
        </div>

        <!-- Social Links -->
        <div class="flex items-center space-x-4">
          <a 
            href="https://github.com/leguan7" 
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#49b1f5] transition-colors"
          >
            <Icon icon="fab:github" class="w-5 h-5" />
          </a>
          <a 
            href="mailto:leguan@example.com"
            class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#49b1f5] transition-colors"
          >
            <Icon icon="fas:envelope" class="w-5 h-5" />
          </a>
        </div>

        <!-- Copyright -->
        <div class="text-center text-sm text-white/60 space-y-1">
          <p>©2025 - {{ currentYear }} By Leguan</p>
          <p class="flex items-center justify-center space-x-2">
            <span>Powered by</span>
            <a href="https://vuejs.org" target="_blank" class="text-[#42b883] hover:underline">Vue</a>
            <span>&</span>
            <a href="https://vitejs.dev" target="_blank" class="text-[#646cff] hover:underline">Vite</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
