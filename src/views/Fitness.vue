<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface FitnessLog {
  date: string
  muscleGroups: string[]
  note?: string
}

const fitnessLogs: FitnessLog[] = [
  { date: '2026-03-09', muscleGroups: ['全身'], note: 'Full Body' },
  { date: '2026-03-10', muscleGroups: ['全身'], note: 'Full Body' },
  { date: '2026-03-17', muscleGroups: ['胸', '三头'], note: 'Chest + Triceps' },
  { date: '2026-03-18', muscleGroups: ['背', '二头'], note: 'Back + Biceps' },
  { date: '2026-03-19', muscleGroups: ['肩'], note: 'Shoulders' },
  { date: '2026-03-25', muscleGroups: ['胸', '三头'], note: 'Chest + Triceps' },
]

const muscleGroupConfig: Record<string, { color: string; label: string }> = {
  '全身': { color: '#a855f7', label: 'Full Body' },
  '胸':  { color: '#f97316', label: 'Chest' },
  '三头': { color: '#fb923c', label: 'Triceps' },
  '背':  { color: '#3b82f6', label: 'Back' },
  '二头': { color: '#60a5fa', label: 'Biceps' },
  '腿':  { color: '#ef4444', label: 'Legs' },
  '肩':  { color: '#eab308', label: 'Shoulders' },
  '核心': { color: '#14b8a6', label: 'Core' },
}

const currentYear = ref(2026)
const currentMonth = ref(3)

const logMap = computed(() => {
  const map = new Map<string, FitnessLog>()
  fitnessLogs.forEach(log => map.set(log.date, log))
  return map
})

const selectedDate = ref<string | null>(null)
const selectedLog = computed(() =>
  selectedDate.value ? logMap.value.get(selectedDate.value) ?? null : null
)

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month - 1, 1)
  const daysInMonth = new Date(year, month, 0).getDate()
  const startOffset = (firstDay.getDay() + 6) % 7

  const days: Array<{ date: string; day: number; isCurrentMonth: boolean }> = []

  const prevMonthDays = new Date(year, month - 1, 0).getDate()
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    const m = month - 1 === 0 ? 12 : month - 1
    const y = month - 1 === 0 ? year - 1 : year
    days.push({ date: `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`, day: d, isCurrentMonth: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`, day: d, isCurrentMonth: true })
  }
  const remaining = 7 - (days.length % 7)
  if (remaining < 7) {
    const nextMonth = month === 12 ? 1 : month + 1
    const nextYear = month === 12 ? year + 1 : year
    for (let d = 1; d <= remaining; d++) {
      days.push({ date: `${nextYear}-${String(nextMonth).padStart(2,'0')}-${String(d).padStart(2,'0')}`, day: d, isCurrentMonth: false })
    }
  }
  return days
})

const totalWorkouts = computed(() => fitnessLogs.length)
const monthWorkouts = computed(() =>
  fitnessLogs.filter(log => {
    const [y, m] = log.date.split('-').map(Number)
    return y === currentYear.value && m === currentMonth.value
  }).length
)
const maxStreak = computed(() => {
  if (fitnessLogs.length === 0) return 0
  const sorted = [...fitnessLogs].sort((a, b) => a.date.localeCompare(b.date))
  let max = 1, cur = 1
  for (let i = 1; i < sorted.length; i++) {
    const diff = (new Date(sorted[i].date).getTime() - new Date(sorted[i-1].date).getTime()) / 86400000
    if (diff === 1) { cur++; max = Math.max(max, cur) }
    else if (diff > 1) cur = 1
  }
  return max
})

function prevMonth() {
  if (currentMonth.value === 1) { currentMonth.value = 12; currentYear.value-- }
  else currentMonth.value--
  selectedDate.value = null
}
function nextMonth() {
  if (currentMonth.value === 12) { currentMonth.value = 1; currentYear.value++ }
  else currentMonth.value++
  selectedDate.value = null
}
function selectDay(date: string) {
  if (!logMap.value.has(date)) return
  selectedDate.value = selectedDate.value === date ? null : date
}
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  return `${monthNames[parseInt(m) - 1]} ${parseInt(d)}, ${y}`
}

// Get primary color for a workout day (first muscle group)
function getDayColor(date: string): string {
  const log = logMap.value.get(date)
  if (!log) return '#22c55e'
  return muscleGroupConfig[log.muscleGroups[0]]?.color ?? '#22c55e'
}

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
</script>

<template>
  <div>
    <!-- Banner -->
    <header class="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative text-center text-white z-10">
        <div class="relative inline-block mb-4">
          <div class="absolute inset-0 rounded-full blur-2xl opacity-60" style="background: #4ade80; transform: scale(1.5)"></div>
          <Icon icon="lucide:dumbbell" class="relative w-16 h-16 drop-shadow-lg" />
        </div>
        <h1 class="text-4xl md:text-5xl font-bold drop-shadow-lg">Fitness Log</h1>
        <p class="mt-3 text-white/80 text-lg">Discipline gives me freedom</p>
      </div>
      <div class="wave-divider">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C150,100 350,0 600,50 C850,100 1050,0 1200,50 C1350,100 1440,50 1440,50 L1440,100 L0,100 Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>
    </header>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-5">

      <!-- Stats bar -->
      <div class="grid grid-cols-3 gap-3">
        <div class="stat-card" style="--accent: #22c55e; --accent-bg: rgba(34,197,94,0.1)">
          <Icon icon="lucide:calendar-check" class="w-5 h-5 mb-2" style="color: #22c55e" />
          <span class="text-3xl font-black" style="color: #22c55e">{{ monthWorkouts }}</span>
          <span class="stat-label">This Month</span>
        </div>
        <div class="stat-card" style="--accent: #a855f7; --accent-bg: rgba(168,85,247,0.1)">
          <Icon icon="lucide:dumbbell" class="w-5 h-5 mb-2" style="color: #a855f7" />
          <span class="text-3xl font-black" style="color: #a855f7">{{ totalWorkouts }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat-card" style="--accent: #f97316; --accent-bg: rgba(249,115,22,0.1)">
          <Icon icon="lucide:flame" class="w-5 h-5 mb-2" style="color: #f97316" />
          <span class="text-3xl font-black" style="color: #f97316">{{ maxStreak }}</span>
          <span class="stat-label">Best Streak</span>
        </div>
      </div>

      <!-- Legend -->
      <div class="card p-4">
        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Muscle Groups</p>
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <div v-for="(cfg, name) in muscleGroupConfig" :key="name" class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-sm flex-shrink-0" :style="{ backgroundColor: cfg.color }"></span>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ cfg.label }}</span>
          </div>
        </div>
      </div>

      <!-- Calendar card -->
      <div class="card overflow-hidden">

        <!-- Month nav -->
        <div class="cal-header">
          <button @click="prevMonth" class="nav-btn">
            <Icon icon="lucide:chevron-left" class="w-4 h-4" />
          </button>
          <span class="text-base font-bold text-gray-800 dark:text-white tracking-wide">
            {{ monthNames[currentMonth - 1] }} {{ currentYear }}
          </span>
          <button @click="nextMonth" class="nav-btn">
            <Icon icon="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>

        <!-- Weekday row -->
        <div class="grid grid-cols-7 px-3 pb-1">
          <div
            v-for="wd in weekdays"
            :key="wd"
            class="text-center text-xs font-semibold py-2 tracking-widest"
            :class="wd === 'Sat' || wd === 'Sun' ? 'text-red-400' : 'text-gray-400 dark:text-gray-500'"
          >{{ wd }}</div>
        </div>

        <!-- Day cells -->
        <div class="grid grid-cols-7 gap-1 px-3 pb-3">
          <div
            v-for="(cell, idx) in calendarDays"
            :key="idx"
            class="day-cell"
            :class="[
              !cell.isCurrentMonth ? 'opacity-20' : '',
              logMap.has(cell.date) && cell.isCurrentMonth ? 'day-cell--workout cursor-pointer' : '',
              selectedDate === cell.date ? 'day-cell--selected' : '',
            ]"
            :style="logMap.has(cell.date) && cell.isCurrentMonth
              ? `--day-color: ${getDayColor(cell.date)}`
              : ''"
            @click="selectDay(cell.date)"
          >
            <span class="day-number">{{ cell.day }}</span>

            <!-- muscle chips -->
            <div v-if="logMap.has(cell.date) && cell.isCurrentMonth" class="day-chips">
              <span
                v-for="mg in logMap.get(cell.date)!.muscleGroups"
                :key="mg"
                class="day-chip"
                :style="{ backgroundColor: muscleGroupConfig[mg]?.color ?? '#9ca3af' }"
              >{{ muscleGroupConfig[mg]?.label ?? mg }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail panel -->
      <Transition name="detail">
        <div v-if="selectedLog && selectedDate" class="detail-card">
          <div class="detail-accent" :style="{ backgroundColor: getDayColor(selectedDate) }"></div>
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Workout Log</p>
              <h3 class="text-xl font-black text-gray-800 dark:text-white">{{ formatDate(selectedDate) }}</h3>
            </div>
            <button @click="selectedDate = null" class="close-btn">
              <Icon icon="lucide:x" class="w-4 h-4" />
            </button>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="mg in selectedLog.muscleGroups"
              :key="mg"
              class="detail-badge"
              :style="{ backgroundColor: (muscleGroupConfig[mg]?.color ?? '#9ca3af') + '22', color: muscleGroupConfig[mg]?.color ?? '#9ca3af', borderColor: (muscleGroupConfig[mg]?.color ?? '#9ca3af') + '44' }"
            >
              {{ muscleGroupConfig[mg]?.label ?? mg }}
            </span>
          </div>
          <p v-if="selectedLog.note" class="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2 leading-relaxed">
            <Icon icon="lucide:notebook-pen" class="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
            {{ selectedLog.note }}
          </p>
        </div>
      </Transition>


    </div>
  </div>
</template>

<style scoped>
/* ── Stat cards ────────────────────────────────── */
.stat-card {
  background: var(--card-bg);
  backdrop-filter: saturate(180%) blur(20px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border: 1px solid var(--accent-bg);
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent-bg);
  opacity: 0.5;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}
.stat-label {
  position: relative;
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 2px;
  letter-spacing: 0.05em;
}
.stat-card > * { position: relative; }

/* ── Calendar header ───────────────────────────── */
.cal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(156,163,175,0.15);
}
.nav-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  transition: background 0.2s, color 0.2s;
}
.nav-btn:hover {
  background: rgba(156,163,175,0.15);
  color: #374151;
}

/* ── Day cells ─────────────────────────────────── */
.day-cell {
  border-radius: 16px;
  padding: 6px 4px 5px;
  min-height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: background 0.2s;
}
.day-cell:not(.day-cell--workout):not(.opacity-20):hover {
  background: rgba(156,163,175,0.08);
}

/* workout day */
.day-cell--workout {
  background: color-mix(in srgb, var(--day-color) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--day-color) 25%, transparent);
}
.day-cell--workout:hover {
  background: color-mix(in srgb, var(--day-color) 20%, transparent);
}
.day-cell--selected {
  background: color-mix(in srgb, var(--day-color) 22%, transparent) !important;
  box-shadow: 0 0 0 2px var(--day-color);
}

.day-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.825rem;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s;
}
.dark .day-number { color: #d1d5db; }

.day-cell--workout .day-number {
  background: var(--day-color);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--day-color) 50%, transparent);
}

/* muscle chips inside cell */
.day-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
}
.day-chip {
  font-size: 0.55rem;
  font-weight: 600;
  color: #fff;
  padding: 1px 5px;
  border-radius: 9999px;
  line-height: 1.4;
  letter-spacing: 0.02em;
}

/* ── Detail panel ──────────────────────────────── */
.detail-card {
  background: var(--card-bg);
  backdrop-filter: saturate(180%) blur(20px);
  border-radius: 16px;
  padding: 1.5rem 1.5rem 1.25rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}
.detail-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}
.detail-badge {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid;
}
.close-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  transition: background 0.2s;
}
.close-btn:hover {
  background: rgba(156,163,175,0.15);
}

/* ── Transitions ───────────────────────────────── */
.detail-enter-active,
.detail-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
</style>
