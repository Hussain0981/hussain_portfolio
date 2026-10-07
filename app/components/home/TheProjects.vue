<script lang="ts" setup>
type Visibility = 'public' | 'private'

interface WebsiteProject {
  id: string // must match the key in the locale files: projects.website.items.<id>
  visibility: Visibility
  technologies: string[]
  image: string // files in /public are served from the site root: /projects/x.png (no "/public")
  demo: string | null
  github: string | null
}

const { t } = useI18n()

// Language-independent data only. Title, description and role come from the locale files.
const websiteProjects: WebsiteProject[] = [
  {
    id: 'nextgcircle',
    visibility: 'private',
    technologies: ['Nuxt', 'Vue', 'Tailwind CSS', 'JavaScript'],
    image: '/projects/ngen.png',
    demo: 'https://nextgcircle.com/',
    github: null,
  },
  {
    id: 'hrdn',
    visibility: 'private',
    technologies: ['Nuxt', 'Vue', 'Tailwind CSS', 'JavaScript'],
    image: '/projects/hrdn.png',
    demo: 'https://hrdn.net/',
    github: null,
  },
  {
    id: 'portfolio',
    visibility: 'public',
    technologies: ['Nuxt', 'Vue', 'Tailwind CSS', 'Typescript'],
    image: '/projects/portfolio.png',
    demo: 'https://hussainme.vercel.app/',
    github: 'https://github.com/Hussain0981/hussain_portfolio',
  },
]

// To add Web or Desktop projects later, add another object to this array.
const sections = computed(() => [
  {
    id: 'website',
    title: t('projects.website.title'),
    items: websiteProjects.map(project => ({
      ...project,
      title: t(`projects.website.items.${project.id}.title`),
      description: t(`projects.website.items.${project.id}.description`),
      role: t(`projects.website.items.${project.id}.role`),
    })),
  },
])

// If a screenshot fails to load, show the placeholder instead of a broken image.
const failedImages = reactive(new Set<string>())
</script>

<template>
  <section id="projects" class="font-sans">
    <!-- Section heading -->
    <header data-aos="fade-up" class="mb-10 md:mb-14">
      <span
        class="inline-block rounded-full bg-slate-200/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
      >
        {{ t('projects.title') }}
      </span>
      <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-slate-100">
        {{ t('projects.sub_title') }}
      </h2>
    </header>

    <div v-for="section in sections" :key="section.id" class="mb-12 last:mb-0">
      <!-- Category heading -->
      <div data-aos="fade-up" class="mb-6 flex items-center gap-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
          {{ section.title }}
        </h3>
        <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(item, index) in section.items"
          :key="item.id"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
        >
          <!-- Screenshot -->
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              v-if="item.image && !failedImages.has(item.id)"
              :src="item.image"
              :alt="item.title"
              loading="lazy"
              class="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              @error="failedImages.add(item.id)"
            >
            <div v-else class="flex size-full items-center justify-center text-slate-400 dark:text-slate-600">
              <Icon name="material-symbols:web" size="44" />
            </div>

            <!-- Public / private badge -->
            <span
              class="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:bg-slate-900/80 dark:text-slate-200"
            >
              <Icon
                :name="item.visibility === 'private' ? 'material-symbols:lock-outline' : 'material-symbols:public'"
                size="14"
              />
              {{ item.visibility === 'private' ? t('projects.private_source') : t('projects.open_source') }}
            </span>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col p-5">
            <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100">
              {{ item.title }}
            </h4>
            <p class="mt-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {{ item.role }}
            </p>

            <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {{ item.description }}
            </p>

            <ul class="mt-4 flex flex-wrap gap-1.5" :aria-label="t('projects.built_with')">
              <li
                v-for="tech in item.technologies"
                :key="tech"
                class="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {{ tech }}
              </li>
            </ul>

            <!-- Links: live site always if it exists, code only for public projects -->
            <div class="mt-auto flex flex-wrap gap-2 pt-5">
              <a
                v-if="item.demo"
                :href="item.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-100"
              >
                {{ t('projects.visit_site') }}
                <Icon name="material-symbols:arrow-outward" size="16" class="rtl:-scale-x-100" />
              </a>
              <a
                v-if="item.visibility === 'public' && item.github"
                :href="item.github"
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
      </div>
    </div>
  </section>
</template>
