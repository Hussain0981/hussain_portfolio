<script lang="ts" setup>
const { t } = useI18n()

// Only language-independent data lives here. All visible text comes from the locale files.
const jobs = [
  { id: 'intern', company: 'ngc', role: 'intern', start: '11/2023', end: '04/2024' },
  { id: 'fullstack', company: 'ngc', role: 'fullstack', start: '05/2024', end: '12/2025' },
  { id: 'remote', company: 'remote', role: 'remote', start: '12/2025', end: null }, // null = current
]

const experience = computed(() =>
  jobs.map((job) => {
    const description = t(`experience.jobs.${job.id}.description`)
    return {
      id: job.id,
      company: t(`experience.companies.${job.company}`),
      location: job.company === 'ngc' ? t('experience.location') : '',
      role: t(`experience.roles.${job.role}`),
      start: job.start,
      end: job.end ?? t('experience.present'),
      isCurrent: job.end === null,
      // Empty description (key missing or '') is hidden in the template
      description: description.startsWith('experience.') ? '' : description,
    }
  }),
)
</script>

<template>
  <section
    id="experience"
    class="space-y-8 py-6 font-sans transition-colors duration-300 sm:space-y-10 sm:py-8 md:p-8"
  >
    <!-- Section heading -->
    <header data-aos="fade-up" class="border-b border-slate-200 px-2 pb-6 dark:border-slate-800">
      <span
        class="inline-block px-3 dark:px-0 rounded-full font-mono bg-slate-200/70 py-1 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
      >
        {{ t('experience.badge') }}
      </span>
      <h2 class="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
        {{ t('experience.title') }}
      </h2>
      <p class="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {{ t('experience.subtitle') }}
      </p>
    </header>

    <!-- Timeline: uses logical properties (ps / border-s / start) so it flips automatically in Arabic (RTL) -->
    <ol class="ms-3 border-s-2 border-slate-200 px-2 dark:border-slate-700">
      <li
        v-for="(item, index) in experience"
        :key="item.id"
        data-aos="fade-up"
        :data-aos-delay="index * 120"
        class="relative ps-6 pb-10 last:pb-0"
      >
        <!-- Dot -->
        <span
          class="absolute -start-[7px] top-1.5 size-3 rounded-full ring-4 ring-white dark:ring-slate-900 md:ring-slate-50 md:dark:ring-gray-600"
          :class="item.isCurrent ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-500'"
        />

        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
          <bdi>{{ item.start }}</bdi>
          <span aria-hidden="true"> – </span>
          <bdi>{{ item.end }}</bdi>
        </p>

        <h3 class="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
          {{ item.role }}
        </h3>

        <p class="text-sm text-slate-600 dark:text-slate-300">
          {{ item.company }}
        </p>
        <p v-if="item.location" class="text-xs text-slate-500 dark:text-slate-500">
          {{ item.location }}
        </p>

        <p v-if="item.description" class="mt-3 max-w-prose text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {{ item.description }}
        </p>
      </li>
    </ol>
  </section>
</template>
