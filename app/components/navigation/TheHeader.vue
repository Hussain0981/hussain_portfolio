<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { goToPage } from '~/utils/links'

const { locale, locales, setLocale, tm, rt } = useI18n()
const localePath = useLocalePath()

const isShow = ref(false)
const langOpen = ref(false)
const lastScrollY = ref(0)
const isScrollingDown = ref(false)
const isHeaderVisible = ref(true)

let ticking = false

// Prevent body scroll when mobile menu is open
watch(isShow, (val) => {
  if (typeof window !== 'undefined') {
    if (val) {
      document.body.classList.add('overflow-hidden', 'touch-none')
    }
    else {
      document.body.classList.remove('overflow-hidden', 'touch-none')
    }
  }
})

// Header hide/show on scroll logic
function updateHeaderVisibility() {
  const currentScrollY = Math.max(0, window.scrollY)

  isScrollingDown.value = currentScrollY > lastScrollY.value
  lastScrollY.value = currentScrollY

  if (isScrollingDown.value && currentScrollY > 150) {
    isHeaderVisible.value = false
  }
  else if (!isScrollingDown.value) {
    isHeaderVisible.value = true
  }

  ticking = false
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateHeaderVisibility)
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)

  if (typeof window !== 'undefined') {
    document.body.classList.remove('overflow-hidden', 'touch-none')
  }
})

interface NavBar {
  name: string
  path?: string
}
const navigations = [
  { path: 'home' },
  { path: 'about' },
  { path: 'projects' },
  { path: 'technologies' },
  { path: 'contact' },
]

const navBar = computed<NavBar[]>(() => {
  const raw = tm('navigation') as NavBar[]
  const raw2 = Array.isArray(raw) ? raw.map(item => ({ name: rt(item.name) })) : []

  return raw2.map((item, index) => ({
    ...item,
    path: navigations[index]?.path ?? '',
  }))
})
const languagesMetaData = [
  { code: 'en', label: 'English', flag: 'emojione:flag-for-united-states' },
  { code: 'ar', label: 'العربية', flag: 'emojione:flag-for-saudi-arabia' },
  { code: 'fr', label: 'Français', flag: 'emojione:flag-for-france' },
]

// Merge i18n locales with flag & metadata
const mergedLanguages = computed(() => {
  return locales.value.map((lang) => {
    const langCode = typeof lang === 'string' ? lang : lang.code
    const meta = languagesMetaData.find(l => l.code === langCode)
    return {
      code: langCode,
      label: meta?.label || langCode.toUpperCase(),
      flag: meta?.flag || 'mynaui:globe',
    }
  })
})

// Automatically tracks current locale reactive state
const currentLang = computed(() => {
  return (
    mergedLanguages.value.find(l => l.code === locale.value)
    || mergedLanguages.value[0]
  )
})

function selectLanguage(langCode: string) {
  langOpen.value = false
  setLocale(langCode)
}
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-black backdrop-blur-xl transition-all duration-300 ease-in-out will-change-transform"
    :class="isHeaderVisible ? 'translate-y-0' : '-translate-y-full'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Brand Logo -->
        <NuxtLink
          to="#home"
          class="group flex items-center gap-1.5 font-bold tracking-tight text-slate-900 dark:text-white text-xl"
          @click="isShow = false"
        >
          <div
            class="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-extrabold text-sm border border-blue-500/20 group-hover:scale-105 transition-transform"
          >
            H
          </div>
          <span>HUB<span class="text-blue-500 inline-block animate-pulse">.</span></span>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav
          class="hidden md:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50"
        >
          <button
            v-for="nav in navBar"
            :key="nav.path"
            class="px-4 py-1.5 text-xs font-semibold rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all duration-200"
            active-class="!bg-white dark:!bg-slate-800 !text-blue-600 dark:!text-blue-400 shadow-xs border border-slate-200/50 dark:border-slate-700/50"
            @click="goToPage(`${nav.path}`)"
          >
            {{ nav.name }}
          </button>
        </nav>

        <!-- Desktop Action Controls -->
        <div class="hidden md:flex items-center gap-2">
          <!-- Language Selector -->
          <div class="relative" @mouseleave="langOpen = false">
            <button
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              @click="langOpen = !langOpen"
            >
              <Icon name="mynaui:globe" size="18" class="text-slate-400 dark:text-slate-300" />
              <span class="uppercase font-bold text-[11px]">{{ currentLang.code }}</span>
              <Icon
                name="lucide:chevron-down"
                size="12"
                class="text-slate-400 dark:text-slate-500 transition-transform"
                :class="{ 'rotate-180': langOpen }"
              />
            </button>

            <!-- Language Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-150"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div
                v-if="langOpen"
                class="absolute right-0 w-36 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl py-1.5 z-50 space-y-0.5 overflow-hidden"
              >
                <button
                  v-for="lang in mergedLanguages"
                  :key="lang.code"
                  type="button"
                  class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  :class="{ 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/30': currentLang.code === lang.code }"
                  @click="selectLanguage(lang.code)"
                >
                  <span class="flex items-center gap-2">
                    <Icon :name="lang.flag" size="16" />
                    {{ lang.label }}
                  </span>
                  <Icon v-if="currentLang.code === lang.code" name="lucide:check" size="14" class="text-blue-500" />
                </button>
              </div>
            </Transition>
          </div>

          <!-- Color Theme Toggle -->
          <UIChangeThemeButton />

          <!-- GitHub Link -->
          <NuxtLink
            to="https://github.com/Hussain0981?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            class="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <Icon name="bi:github" size="18" />
          </NuxtLink>
        </div>

        <!-- Mobile Menu Controls -->
        <div class="flex items-center gap-1 md:hidden">
          <UIChangeThemeButton />

          <button
            type="button"
            aria-label="Toggle navigation drawer"
            class="p-2 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            @click="isShow = !isShow"
          >
            <Icon :name="isShow ? 'lucide:x' : 'lucide:menu'" size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Backdrop Overlay -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isShow"
        class="fixed inset-0 top-16 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden"
        @click="isShow = false"
        @touchmove.prevent
      />
    </Transition>

    <!-- Mobile Navigation Drawer -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isShow"
        class="relative z-50 md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl px-4 pb-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto"
      >
        <!-- Mobile Navigation Links -->
        <div class="space-y-1">
          <button
            v-for="nav in navBar"
            :key="nav.path"
            class="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            active-class="!bg-blue-50 dark:!bg-blue-950/40 !text-blue-600 dark:!text-blue-400"
            @click="goToPage(`${nav.path}`);isShow = false "
          >
            <span>{{ nav.name }}</span>
            <Icon name="lucide:chevron-right" size="16" class="opacity-40" />
          </button>
        </div>

        <!-- Mobile Drawer Footer Actions -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <!-- Language Buttons -->
          <div class="flex items-center gap-1.5">
            <button
              v-for="lang in mergedLanguages"
              :key="lang.code"
              type="button"
              class="px-2.5 py-1 rounded-lg text-xs font-bold border transition-all"
              :class="currentLang.code === lang.code
                ? 'bg-slate-900 dark:bg-blue-600 text-white border-transparent'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
              @click="selectLanguage(lang.code)"
            >
              {{ lang.code.toUpperCase() }}
            </button>
          </div>

          <!-- GitHub External Link -->
          <NuxtLink
            to="https://github.com/Hussain0981?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Icon name="bi:github" size="16" />
            <span>GitHub</span>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
