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

// Desktop application
const desktopApplication: WebsiteProject[] = [
  {
    id: 'pharmacy',
    visibility: 'private',
    technologies: ['Electron.js', 'Vue', 'SQL Server', 'Drizzle ORM', 'TypeScript', 'Tailwindcss'],
    image: '/projects/pharmacy-pos.png',
    demo: '',
    github: null,
  },
  {
    id: 'uniform',
    visibility: 'private',
    technologies: ['Electron.js', 'Vue', 'SQL Server', 'Drizzle ORM', 'TypeScript', 'Tailwindcss'],
    image: '/projects/uniform-pos.png',
    demo: '',
    github: null,
  },
]

// desktop application
const desktopProject = computed(() =>
  desktopApplication.map(project => ({
    ...project,
    title: t(`projects.desktop.items.${project.id}.title`),
    role: t(`projects.desktop.items.${project.id}.role`),
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
const needsDesktopArrows = computed(() => desktopProject.value.length > MAX_PER_VIEW)
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
</script>

<template>
  <section id="desktop" class="font-sans">
    <!-- Category heading + arrows -->
    <div data-aos="fade-up" class="mb-6 flex items-center gap-4">
      <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
        {{ t('projects.desktop.title') }}
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
        <swiper-slide v-for="item in desktopProject" :key="item.id" class="h-auto px-1 pb-6 pt-2">
          <UiCardUI
            :id="item.id"
            :title="item.title"
            :role="item.role"
            :visibility="item.visibility"
            :technologies="item.technologies"
            :image="item.image"
            :demo="item.demo"
            :github="item.github"
          />
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<style lang="postcss" scoped>

</style>
