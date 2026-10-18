<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const { t } = useI18n()

const currentYear = new Date().getFullYear()
const authorName = t('footer.author')
</script>

<template>
  <footer
    class="w-full border-t transition-colors duration-300
           bg-slate-50/80 dark:bg-black/50 backdrop-blur-md
           border-slate-200/80 dark:border-slate-800/80"
  >
    <div class="p-5 rounded-md flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Brand & Copyright Info -->
      <div class="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-600 dark:text-slate-400">
        <!-- Icon from Icones (Ph:Copyright / Phosphor Icons) -->
        <Icon icon="ph:copyright" class="w-4 h-4 text-slate-400 dark:text-slate-500" />

        <span>{{ currentYear }}</span>
        <span class="text-slate-300 dark:text-slate-700">•</span>

        <span class="font-semibold text-slate-900 dark:text-slate-100">
          {{ authorName }}
        </span>

        <span class="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
        <span class="text-slate-500 dark:text-slate-400 hidden sm:inline">
          {{ t('footer.copy_write') }}
        </span>
      </div>

      <!-- Social Links (Modern Portfolio Touch) -->
      <div class="flex items-center gap-3">
        <HomeSocialMediaApp />
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
