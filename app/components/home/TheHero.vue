<script setup lang="ts">
import Typed from 'typed.js'

const { t, locale, tm, rt } = useI18n()

const typedInstance = ref<Typed | null>(null)

// 1. Reactive computed property that updates when locale changes
const skillsList = computed<string[]>(() => {
  const rawSkills = tm('hero_section.skills') as string[]
  return Array.isArray(rawSkills) ? rawSkills.map(skill => rt(skill)) : []
})

// 2. Helper function to initialize Typed.js
function initTyped() {
  // Destroy existing instance if switching languages
  if (typedInstance.value) {
    typedInstance.value.destroy()
  }

  typedInstance.value = new Typed('#element', {
    strings: skillsList.value, // Pass array value
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
  })
}

onMounted(() => {
  initTyped()
})

// 3. Re-initialize Typed.js whenever the user changes language
watch(locale, () => {
  initTyped()
})

// 4. Clean up instance when component is unmounted
onUnmounted(() => {
  if (typedInstance.value) {
    typedInstance.value.destroy()
  }
})
</script>

<template>
  <section
    id="home"
    class="min-h-screen w-full flex flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-0 py-6 transition-colors duration-300 dark:bg-gray-800 text-slate-900 dark:text-slate-100"
  >
    <!-- Particles Background -->
    <NuxtParticles id="tsparticles" :options="options" @load="onLoad" />

    <!-- Top Badge / Status Header -->
    <div class="w-full flex items-center justify-start pt-2 sm:pt-4 h-40 md:h-auto">
      <div
        class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xs"
      >
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
        </span>
        <h3 class="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
          {{ t('hero_section.current_status') }}
        </h3>
      </div>
    </div>

    <!-- Main Hero Body Grid -->
    <div class="flex-1 my-auto flex flex-col-reverse md:grid md:grid-cols-12 gap-8 items-center py-8">
      <!-- Left Hero Content -->
      <div class="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        <!-- Title -->
        <h1
          class="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight uppercase text-slate-900 dark:text-white"
        >
          {{ t('hero_section.first_name') }}<br>
          <span class="font-semibold text-blue-600 dark:text-blue-400">{{ t('hero_section.last_name') }}</span>
        </h1>

        <!-- Typed JS Output Container -->
        <div
          class="text-lg sm:text-xl md:text-2xl font-mono h-8 flex items-center justify-center md:justify-start text-slate-600 dark:text-slate-400"
        >
          <span id="element" class="font-semibold text-slate-800 dark:text-slate-200" />
        </div>

        <!-- Action Call Buttons -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 w-full sm:w-auto">
          <button
            class="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            {{ t('hero_section.buttons.start_project') }}
          </button>
          <a
            href="/hussain_ullah_cv.pdf"
            download
            class="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-200 border-b border-gray-300 dark:border-gray-600 pb-1 hover:border-gray-800 dark:hover:border-slate-300 transition-colors"
          >
            <Icon name="lucide:file-down" size="16" />
            {{ t('hero_section.buttons.download_cv') }}

          </a>
        </div>
      </div>

      <!-- Right Logo / Avatar Container -->
      <div class="md:col-span-5 flex justify-center items-center">
        <div
          class="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] aspect-square rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            class="h-full w-full object-contain rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-2"
            src="/hussain_logo.png" alt="Hussain Ullah Logo"
          >
        </div>
      </div>
    </div>

    <!-- Bottom Navigation / Social Links -->
    <div class="w-full flex items-center justify-center pb-2">
      <HomeSocialMediaApp />
    </div>
  </section>
</template>

<style scoped>
/* Typed cursor styling without CSS variables */
:deep(.typed-cursor) {
  color: #3b82f6;
  font-weight: 300;
}
</style>
