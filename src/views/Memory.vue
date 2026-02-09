<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import { COVER_IMAGES } from '@/utils/assets'

/* ── photo data ─────────────────────────────────────── */
const photos = [
  { image: COVER_IMAGES[0], title: 'Autumn Trip', desc: 'Visited Yunnan, picturesque scenery' },
  { image: COVER_IMAGES[1], title: 'Graduation', desc: 'Farewell to campus, starting a new journey' },
  { image: COVER_IMAGES[2], title: 'First Job', desc: 'Became a frontend developer' },
  { image: COVER_IMAGES[3], title: 'Learned Vue', desc: 'Deep dive into Vue 3 ecosystem' },
  { image: COVER_IMAGES[4], title: 'Winter Trip', desc: 'Visited Hokkaido with friends' },
  { image: COVER_IMAGES[5], title: 'Hackathon', desc: '48 hours of coding, so rewarding' },
  { image: COVER_IMAGES[6], title: 'Started Blogging', desc: 'Recording learning and life moments' },
  { image: COVER_IMAGES[0], title: 'Got a Cat', desc: 'Named it "Code"' },
]

/* ── plain JS state (NOT reactive — bypasses Vue on every frame) ── */
interface FloatState {
  x: number; y: number
  vx: number; vy: number
  rot: number; vr: number
  w: number; h: number
  grabbed: boolean
  el: HTMLElement | null
}

const poolRef = ref<HTMLElement | null>(null)
const lightbox = ref<number | null>(null)

const state: FloatState[] = []
let grabbedIdx = -1
let raf = 0

function rand(a: number, b: number) { return a + Math.random() * (b - a) }

/* ── collect DOM refs ───────────────────────────────── */
const cardRefs: HTMLElement[] = []
function setCardRef(el: any, idx: number) {
  if (el) cardRefs[idx] = el as HTMLElement
}

/* ── init positions & sizes ─────────────────────────── */
function initState() {
  const pw = poolRef.value?.clientWidth ?? 800
  const ph = poolRef.value?.clientHeight ?? 600
  state.length = 0

  for (let i = 0; i < photos.length; i++) {
    const size = Math.round(rand(110, 150))
    const s: FloatState = {
      x: rand(10, pw - size - 10),
      y: rand(10, ph - size - 10),
      vx: rand(-0.4, 0.4),
      vy: rand(-0.3, 0.3),
      rot: rand(-15, 15),
      vr: rand(-0.06, 0.06),
      w: size,
      h: size,
      grabbed: false,
      el: cardRefs[i] || null,
    }
    state.push(s)

    // Set size once (won't change)
    const el = cardRefs[i]
    if (el) {
      el.style.width = size + 'px'
      el.style.height = size + 'px'
    }
  }

  applyAll()
}

/* ── apply transform directly to DOM (no Vue involved) ── */
function applyTransform(s: FloatState) {
  if (!s.el) return
  s.el.style.transform = `translate3d(${s.x}px,${s.y}px,0) rotate(${s.rot}deg)`
}

function applyAll() {
  for (let i = 0; i < state.length; i++) {
    state[i].el = cardRefs[i] || null
    applyTransform(state[i])
  }
}

/* ── animation loop — pure JS, direct DOM ───────────── */
function tick() {
  const pw = poolRef.value?.clientWidth ?? 800
  const ph = poolRef.value?.clientHeight ?? 600

  for (let i = 0; i < state.length; i++) {
    const s = state[i]
    if (s.grabbed) continue

    s.x += s.vx
    s.y += s.vy
    s.rot += s.vr

    // Bounce
    if (s.x < 0)            { s.x = 0;              s.vx = Math.abs(s.vx) }
    if (s.x > pw - s.w)     { s.x = pw - s.w;       s.vx = -Math.abs(s.vx) }
    if (s.y < 0)            { s.y = 0;              s.vy = Math.abs(s.vy) }
    if (s.y > ph - s.h)     { s.y = ph - s.h;       s.vy = -Math.abs(s.vy) }

    applyTransform(s)
  }

  raf = requestAnimationFrame(tick)
}

/* ── pointer interaction ────────────────────────────── */
function onGrab(idx: number) {
  grabbedIdx = idx
  state[idx].grabbed = true
  const el = cardRefs[idx]
  if (el) {
    el.classList.add('is-grabbed')
    el.style.zIndex = '30'
  }
}

function onRelease() {
  if (grabbedIdx >= 0) {
    const s = state[grabbedIdx]
    s.grabbed = false
    s.vx = rand(-0.35, 0.35)
    s.vy = rand(-0.25, 0.25)
    const el = cardRefs[grabbedIdx]
    if (el) {
      el.classList.remove('is-grabbed')
      el.style.zIndex = ''
    }
    // Apply final position immediately so there's no jump
    applyTransform(s)
  }
  grabbedIdx = -1
}

function onPointerMove(e: PointerEvent) {
  if (grabbedIdx < 0) return
  const rect = poolRef.value?.getBoundingClientRect()
  if (!rect) return
  const s = state[grabbedIdx]
  s.x = e.clientX - rect.left - s.w / 2
  s.y = e.clientY - rect.top - s.h / 2
  s.rot = 0
  applyTransform(s)
}

function openLightbox(idx: number) {
  lightbox.value = idx
}

function closeLightbox() {
  lightbox.value = null
}

/* ── lifecycle ──────────────────────────────────────── */
onMounted(() => {
  initState()
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div>
    <!-- Banner -->
    <header class="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-black/40"></div>

      <div class="relative text-center text-white z-10">
        <Icon icon="lucide:images" class="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
        <h1 class="text-4xl md:text-5xl font-bold drop-shadow-lg">Gallery</h1>
        <p class="mt-3 text-white/80 text-lg">Time machine, capturing beautiful moments</p>
      </div>

      <div class="wave-divider">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C150,100 350,0 600,50 C850,100 1050,0 1200,50 C1350,100 1440,50 1440,50 L1440,100 L0,100 Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <!-- Floating photos area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <p class="text-center text-xs text-gray-400 dark:text-gray-500 mb-4 tracking-wide">hover to grab · double-click to view</p>

      <div
        ref="poolRef"
        class="photo-pool"
        @pointermove="onPointerMove"
        @pointerup="onRelease"
        @pointerleave="onRelease"
      >
        <div
          v-for="(photo, idx) in photos"
          :key="idx"
          :ref="(el) => setCardRef(el, idx)"
          class="float-photo"
          @pointerdown.prevent="onGrab(idx)"
          @dblclick="openLightbox(idx)"
        >
          <img
            :src="photo.image"
            :alt="photo.title"
            class="float-photo-img"
            draggable="false"
          />
          <div class="float-photo-label">{{ photo.title }}</div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="lightbox !== null"
          class="lightbox-overlay"
          @click.self="closeLightbox"
        >
          <div class="lightbox-card">
            <img
              :src="photos[lightbox].image"
              :alt="photos[lightbox].title"
              class="lightbox-img"
            />
            <div class="px-5 py-4">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white">{{ photos[lightbox].title }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ photos[lightbox].desc }}</p>
            </div>
            <button class="lightbox-close" @click="closeLightbox">&times;</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ── Photo pool ──────────────────────────────── */
.photo-pool {
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 480px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.02);
  cursor: default;
  touch-action: none;
  user-select: none;
}

:root.dark .photo-pool {
  border-color: rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}

/* ── Floating photo ──────────────────────────── */
.float-photo {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  background: #fff;
  border-radius: 6px;
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.10),
    0 1px 3px rgba(0, 0, 0, 0.06);
  cursor: grab;
  z-index: 1;
  will-change: transform;
  /* transition only for shadow & filter — NOT transform (that's per-frame) */
  transition: box-shadow 0.3s ease, filter 0.3s ease;
}

:root.dark .float-photo {
  background: #1e293b;
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2);
}

.float-photo:hover {
  z-index: 20;
  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.18),
    0 2px 6px rgba(0, 0, 0, 0.08);
  filter: brightness(1.03);
}

:root.dark .float-photo:hover {
  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.5),
    0 2px 6px rgba(0, 0, 0, 0.3);
}

.float-photo.is-grabbed {
  cursor: grabbing;
  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.22),
    0 4px 12px rgba(0, 0, 0, 0.10);
  filter: brightness(1.05) saturate(1.1);
}

:root.dark .float-photo.is-grabbed {
  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.6),
    0 4px 12px rgba(0, 0, 0, 0.3);
}

.float-photo-img {
  width: 100%;
  height: calc(100% - 24px);
  object-fit: cover;
  border-radius: 4px;
  pointer-events: none;
}

.float-photo-label {
  text-align: center;
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 24px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

:root.dark .float-photo-label {
  color: #94a3b8;
}

/* ── Lightbox ────────────────────────────────── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.lightbox-card {
  position: relative;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  max-width: 560px;
  width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  cursor: default;
}

:root.dark .lightbox-card {
  background: #1e293b;
}

.lightbox-img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.lightbox-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  line-height: 1;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* Lightbox transition */
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.3s ease;
}
.lb-enter-active .lightbox-card,
.lb-leave-active .lightbox-card {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
.lb-enter-from .lightbox-card,
.lb-leave-to .lightbox-card {
  transform: scale(0.85);
  opacity: 0;
}
</style>
