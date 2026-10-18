<script setup lang="ts">
import { computed } from 'vue'

interface StackItem {
  title: string
  icon: string
  color?: string
}

interface StackCategory {
  name: string
  items: StackItem[]
}

interface StackSection {
  key: string
  title: string
  description: string
  categories: StackCategory[]
}

const { t } = useI18n()

// Static, non-translatable data only (icons + tech names are the same in every language).
// title / description / category.name come from the i18n locale files (en.json / fr.json / ar.json).
const staticStacks: { key: string, categories: { items: StackItem[] }[] }[] = [
  {
    key: 'frontend',
    categories: [
      { items: [{ title: 'HTML5', icon: 'devicon:html5' }] },
      {
        items: [
          { title: 'CSS3', icon: 'devicon:css3' },
          { title: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
        ],
      },
      {
        items: [
          { title: 'JavaScript', icon: 'logos:javascript' },
          { title: 'TypeScript', icon: 'logos:typescript-icon' },
        ],
      },
      {
        items: [
          { title: 'Vue.js', icon: 'logos:vue' },
          { title: 'Nuxt', icon: 'logos:nuxt-icon' },
        ],
      },
      {
        items: [
          { title: 'GSAP', icon: 'logos:greensock-icon' },
          { title: 'Three.js', icon: 'logos:threejs' },
        ],
      },
    ],
  },
  {
    key: 'desktop',
    categories: [
      {
        items: [
          { title: 'JavaFX', icon: 'logos:java' },
          { title: 'Electron.js', icon: 'logos:electron' },
        ],
      },
    ],
  },
  {
    key: 'backend',
    categories: [
      {
        items: [
          { title: 'Node.js', icon: 'logos:nodejs-icon' },
          { title: 'Express.js', icon: 'devicon:express' },
          { title: 'Spring Boot', icon: 'logos:spring-icon' },
        ],
      },
    ],
  },
  {
    key: 'databases-orm',
    categories: [
      {
        items: [
          { title: 'MySQL', icon: 'logos:mysql-icon' },
          { title: 'PostgreSQL', icon: 'logos:postgresql' },
          { title: 'MongoDB', icon: 'logos:mongodb-icon' },
        ],
      },
      {
        items: [
          { title: 'Drizzle ORM', icon: 'simple-icons:drizzle' },
          { title: 'Mongoose', icon: 'devicon:mongoose' },
        ],
      },
    ],
  },
  {
    key: 'system-design',
    categories: [
      {
        items: [
          { title: 'Microservices', icon: 'carbon:microservices-1' },
          { title: 'RESTful APIs', icon: 'dashicons:rest-api' },
          { title: 'GraphQL', icon: 'logos:graphql' },
          { title: 'Load Balancing', icon: 'tabler:scale-outline' },
        ],
      },
      {
        items: [
          { title: 'Redis', icon: 'logos:redis' },
          { title: 'Apache Kafka', icon: 'logos:kafka-icon' },
          { title: 'RabbitMQ', icon: 'logos:rabbitmq-icon' },
        ],
      },
      {
        items: [
          { title: 'Docker', icon: 'logos:docker-icon' },
          { title: 'Kubernetes', icon: 'logos:kubernetes' },
          { title: 'Nginx', icon: 'logos:nginx' },
        ],
      },
    ],
  },
]

// Reactive + locale-aware: recomputes automatically whenever the active locale changes.
const stacks = computed<StackSection[]>(() =>
  staticStacks.map(section => ({
    key: section.key,
    title: t(`stacks.${section.key}.title`),
    description: t(`stacks.${section.key}.description`),
    categories: section.categories.map((category, idx) => ({
      name: t(`stacks.${section.key}.categories.${idx}.name`),
      items: category.items,
    })),
  })),
)
</script>

<template>
  <div id="technologies" class="max-w-6xl mx-auto space-y-8 sm:space-y-10 font-sans transition-colors duration-300">
    <!-- Overall Section Heading -->
    <div data-aos="fade-up" class=" px-2 border-b border-slate-200  dark:border-gray-700 pb-6">
      <span class="inline-block px-3 py-1 rounded-full bg-slate-200/70 dark:bg-black/50 text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider">
        {{ $t('techStack.badge') }}
      </span>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-3">
        {{ $t('techStack.heading') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
        {{ $t('techStack.subheading') }}
      </p>
    </div>

    <!-- Stack Cards Loop -->
    <div class="space-y-6 sm:space-y-8">
      <section
        v-for="stack in stacks"
        :key="stack.key"
        class="bg-white  border border-slate-200/80  rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 relative overflow-hidden group dark:bg-gray-700/60 dark:border-gray-700 dark:text-slate-200"
      >
        <!-- Top Accent Gradient Bar -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <!-- Header Block -->
        <div data-aos="fade-up" class="mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {{ stack.title }}
            </h2>
            <p v-if="stack.description" class="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              {{ stack.description }}
            </p>
          </div>
          <span class="self-start sm:self-auto text-[10px] sm:text-xs font-bold px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600 shrink-0">
            {{ stack.categories.reduce((acc, cat) => acc + cat.items.length, 0) }} {{ $t('techStack.technologiesLabel') }}
          </span>
        </div>

        <!-- Categories & Tech Items -->
        <div class="space-y-6">
          <div
            v-for="(category, index) in stack.categories"
            :key="category.name"
            data-aos="fade-up"
            :data-aos-delay="index * 50"
            class="space-y-3"
          >
            <!-- Category Label -->
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
              <h3 class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {{ category.name }}
              </h3>
            </div>

            <!-- Grid Items Container (Adaptive responsive sizing) -->
            <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5 sm:gap-3">
              <div
                v-for="(item) in category.items"
                :key="item.title"
                class="group/item relative flex flex-col items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-2.5 sm:p-3 aspect-square transition-all duration-200 hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 dark:hover:shadow-slate-900/50 cursor-pointer"
              >
                <!-- Icon with adaptive sizing -->
                <Icon
                  :name="item.icon"
                  class="w-12 h-12 sm:w-8 sm:h-8 md:w-9 md:h-9 text-slate-700 dark:text-slate-200 transition-transform group-hover/item:scale-110"
                />

                <!-- Tooltip on hover -->
                <span
                  class="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 scale-90 whitespace-nowrap rounded-lg bg-slate-900 dark:bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-white dark:text-slate-900 opacity-0 shadow-lg transition-all duration-200 group-hover/item:-translate-y-0.5 group-hover/item:scale-100 group-hover/item:opacity-100"
                >
                  {{ item.title }}
                  <span class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Smooth font rendering */
div {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
