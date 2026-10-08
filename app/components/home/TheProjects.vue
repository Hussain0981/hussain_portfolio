<script lang="ts" setup>
type Visibility = 'public' | 'private'

interface WebsiteProject {
  id: string // must match the key in the locale files: projects.website.items.<id>
  visibility: Visibility
  technologies: string[]
  image: string // files in /public are served from the site root: /projects/x.png
  demo: string | null
  github: string | null
}

const { t, locale } = useI18n()

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
    technologies: ['Nuxt', 'Vue', 'Tailwind CSS', 'TypeScript'],
    image: '/projects/portfolio.png',
    demo: 'https://hussainme.vercel.app/',
    github: 'https://github.com/Hussain0981/hussain_portfolio',
  },
]

// One slide per project (not one slide per category).
const projects = computed(() =>
  websiteProjects.map(project => ({
    ...project,
    title: t(`projects.website.items.${project.id}.title`),
    description: t(`projects.website.items.${project.id}.description`),
    role: t(`projects.website.items.${project.id}.role`),
  })),
)

// ---- Slider -------------------------------------------------------------
const MAX_PER_VIEW = 3 // keep in sync with the largest slidesPerView below

const swiperRef = ref(null)
const swiper = useSwiper(swiperRef, {
  slidesPerView: 1,
  spaceBetween: 16,
  grabCursor: true,
  loop: true,
  autoplay: { delay: 7000, pauseOnMouseEnter: true, disableOnInteraction: false },
  rewind: true, // goes back to the first slide at the end (loop needs more slides than slidesPerView)
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: MAX_PER_VIEW, autoplay: false },

  },
})
const needsDesktopArrows = computed(() => projects.value.length > MAX_PER_VIEW)
// Skeleton is shown until the component is mounted and Swiper has initialised.
// (useSwiper runs its own onMounted first, so after nextTick the slider is ready.)
const ready = ref(false)
onMounted(async () => {
  await nextTick()
  ready.value = true
})

// Swiper reads the text direction only once at start, so update it when the language changes.
watch(locale, async (value) => {
  await nextTick()
  const instance = (swiperRef.value as any)?.swiper
  instance?.changeLanguageDirection(value === 'ar' ? 'rtl' : 'ltr')
  instance?.update()
})

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

    <!-- Category heading + arrows -->
    <div data-aos="fade-up" class="mb-6 flex items-center gap-4">
      <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
        {{ t('projects.website.title') }}
      </h3>
      <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

      <div class="flex gap-2" :class="{ 'lg:hidden': !needsDesktopArrows }">
        <button
          type="button"
          :disabled="!ready"
          :aria-label="t('projects.prev')"
          class="inline-flex size-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-100"
          @click="swiper.prev()"
        >
          <Icon name="material-symbols:chevron-left" size="22" class="rtl:rotate-180" />
        </button>
        <button
          type="button"
          :disabled="!ready"
          :aria-label="t('projects.next')"
          class="inline-flex size-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-100"
          @click="swiper.next()"
        >
          <Icon name="material-symbols:chevron-right" size="22" class="rtl:rotate-180" />
        </button>
      </div>
    </div>

    <div data-aos="fade-up" class="relative">
      <!-- Skeleton: visible on the server and until the slider is ready -->
      <div
        v-if="!ready"
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        aria-hidden="true"
      >
        <div
          v-for="n in 3"
          :key="n"
          :class="{ 'hidden md:block': n === 2, 'hidden lg:block': n === 3 }"
        >
          <SkeletonProjectCard />
        </div>
      </div>

      <swiper-container
        ref="swiperRef"
        :init="false"
        class="block transition-opacity duration-300"
        :class="ready ? 'opacity-100' : 'pointer-events-none absolute inset-x-0 top-0 opacity-0'"
      >
        <swiper-slide v-for="item in projects" :key="item.id" class="h-auto px-1 pb-6 pt-2">
          <article
            class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
          >
            <!-- Screenshot -->
            <div class="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                v-if="item.image && !failedImages.has(item.id)"
                :src="item.image"
                :alt="item.title"
                decoding="async"
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
            <div class="flex flex-1 flex-col p-2.5 md:p-5">
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

              <!-- Links: live site if it exists, code only for public projects -->
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
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>
