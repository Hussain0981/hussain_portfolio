<script lang="ts" setup>
const { t, locale } = useI18n()

interface WebsiteProject {
  id: string
  visibility: 'public' | 'private'
  technologies: string[]
  image: string
  demo: string | null
  github: string | null
}

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
    id: 'governance',
    visibility: 'public',
    technologies: ['Nuxt', 'Vue', 'GSAP', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/governance.png',
    demo: 'https://hussainme.vercel.app/',
    github: 'https://github.com/Hussain0981/sundown-studio',
  },
  {
    id: 'portfolio',
    visibility: 'public',
    technologies: ['Nuxt', 'Vue', 'Tailwind CSS', 'TypeScript'],
    image: '/projects/portfolio.png',
    demo: 'https://hussainme.vercel.app/',
    github: 'https://github.com/Hussain0981/hussain_portfolio',
  },
  {
    id: 'mojeto',
    visibility: 'public',
    technologies: ['Nuxt', 'Vue', 'GSAP', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/mojeto.png',
    demo: 'https://hussainme.vercel.app/',
    github: 'https://github.com/Hussain0981/Mojeto-Frontend-website',
  },
  {
    id: 'sundown-studio',
    visibility: 'public',
    technologies: ['Nuxt', 'Vue', 'GSAP', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/sundown-studio.png',
    demo: 'https://hussainme.vercel.app/',
    github: 'https://github.com/Hussain0981/sundown-studio',
  },

]

// One slide per project (not one slide per category).
const projects = computed(() =>
  websiteProjects.map(project => ({
    ...project,
    title: t(`projects.website.items.${project.id}.title`),
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
