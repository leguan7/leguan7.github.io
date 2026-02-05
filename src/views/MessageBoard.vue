<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const messages = ref([
  {
    id: 1,
    name: '访客',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest1',
    content: '博客很棒！期待更多内容~',
    date: '2026-02-04 14:30'
  }
])

const newMessage = ref({ name: '', content: '' })
const isSubmitting = ref(false)

function submitMessage() {
  if (!newMessage.value.name.trim() || !newMessage.value.content.trim()) return

  isSubmitting.value = true
  setTimeout(() => {
    messages.value.unshift({
      id: Date.now(),
      name: newMessage.value.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newMessage.value.name}`,
      content: newMessage.value.content,
      date: new Date().toLocaleString('zh-CN')
    })
    newMessage.value = { name: '', content: '' }
    isSubmitting.value = false
  }, 500)
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
        <Icon icon="fas:comment-dots" class="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 class="text-4xl font-bold">留言板</h1>
        <p class="mt-2 text-white/80">欢迎留下你的足迹</p>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" class="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 48.3C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Message Form -->
      <div class="card p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <Icon icon="fas:pen" class="w-5 h-5 mr-2 text-[#49b1f5]" />
          写留言
        </h3>
        <form @submit.prevent="submitMessage" class="space-y-4">
          <div>
            <input 
              v-model="newMessage.name"
              type="text"
              placeholder="你的名字"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#49b1f5] focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <textarea 
              v-model="newMessage.content"
              rows="4"
              placeholder="说点什么吧..."
              class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#49b1f5] focus:border-transparent outline-none transition-all resize-none"
              required
            ></textarea>
          </div>
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="btn btn-primary"
          >
            <Icon v-if="isSubmitting" icon="fas:spinner" class="w-4 h-4 mr-2 animate-spin" />
            <Icon v-else icon="fas:paper-plane" class="w-4 h-4 mr-2" />
            {{ isSubmitting ? '发送中...' : '发送留言' }}
          </button>
        </form>
      </div>

      <!-- Messages List -->
      <div class="space-y-4">
        <div 
          v-for="message in messages"
          :key="message.id"
          class="card p-5 flex space-x-4"
        >
          <img 
            :src="message.avatar"
            :alt="message.name"
            class="w-12 h-12 rounded-full"
          />
          <div class="flex-1">
            <div class="flex items-center space-x-2">
              <span class="font-bold text-gray-800 dark:text-white">{{ message.name }}</span>
              <span class="text-xs text-gray-400">{{ message.date }}</span>
            </div>
            <p class="mt-2 text-gray-600 dark:text-gray-400">{{ message.content }}</p>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="messages.length === 0" class="card p-12 text-center">
        <Icon icon="fas:comments" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p class="text-gray-500">还没有留言，来做第一个吧！</p>
      </div>
    </div>
  </div>
</template>
