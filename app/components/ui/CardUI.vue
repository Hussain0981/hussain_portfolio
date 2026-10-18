<script lang="ts" setup>
type Visibility = 'public' | 'private'

const props = defineProps<{
  id: string | number
  title: string
  role: string
  visibility: Visibility
  technologies?: string[]
  image?: string
  demo?: string | null
  github?: string | null
}>()

const { t } = useI18n()

const imageFailed = ref(false)
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-black/50 dark:hover:border-slate-700"
  >
    <!-- Screenshot -->
    <div class="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img
        v-if="props.image && !imageFailed"
        :src="props.image"
        :alt="props.title"
        loading="lazy"
        decoding="async"
        class="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        @error="imageFailed = true"
      >
      <div v-else class="flex size-full items-center justify-center text-slate-400 dark:text-slate-600">
        <Icon name="material-symbols:web" size="44" />
      </div>

      <!-- Public / private badge -->
      <span
        class="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:bg-slate-900/80 dark:text-slate-200"
      >
        <Icon
          :name="props.visibility === 'private' ? 'material-symbols:lock-outline' : 'material-symbols:public'"
          size="14"
        />
        {{ props.visibility === 'private' ? t('projects.private_source') : t('projects.open_source') }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-2.5 md:p-5">
      <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100">
        {{ props.title }}
      </h4>
      <p class="mt-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        {{ props.role }}
      </p>

      <ul
        v-if="props.technologies?.length"
        class="mt-4 flex flex-wrap gap-1.5"
        :aria-label="t('projects.built_with')"
      >
        <li
          v-for="tech in props.technologies"
          :key="tech"
          class="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          {{ tech }}
        </li>
      </ul>

      <!-- Links: live site if it exists, code only for public projects -->
      <div class="mt-auto flex flex-wrap gap-2 pt-5">
        <a
          v-if="props.demo"
          :href="props.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-100"
        >
          {{ t('projects.visit_site') }}
          <Icon name="material-symbols:arrow-outward" size="16" class="rtl:-scale-x-100" />
        </a>
        <a
          v-if="props.visibility === 'public' && props.github"
          :href="props.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-100"
        >
          <Icon name="mdi:github" size="16" />
          {{ t('projects.view_code') }}
        </a>
      </div>
    </div>
  </article>
</template>
