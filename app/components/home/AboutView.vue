<script setup lang="ts">
const { t, tm, rt } = useI18n()

const benefitIcons = [
  'lucide:zap',
  'lucide:shield-check',
  'lucide:sparkles',
]

const benefits = computed(() => {
  const cards = tm('about.cards')

  if (!Array.isArray(cards)) {
    return []
  }

  return cards.map((card, index) => ({
    icon: benefitIcons[index] || '',
    title: rt(card.title),
    technology: rt(card.technology),
    description: rt(card.description),
  }))
})
</script>

<template>
  <section
    id="about"
    class="py-8 xl:py-16 text-gray-800 dark:text-slate-100 transition-colors duration-300"
  >
    <div>
      <!-- Section Header -->
      <div
        data-aos="fade-up"
        class="mb-12 md:mb-20 flex items-end justify-between gap-6 flex-wrap"
      >
        <div>
          <span
            class="text-sm font-mono block mb-3"
            style="color: var(--projects-label);"
          >
            {{ t('about.sub_title') }}
          </span>

          <h2
            class="text-3xl md:text-5xl font-bold tracking-tight"
            style="color: var(--projects-heading);"
          >
            {{ t('about.title') }}
          </h2>
        </div>
      </div>

      <!-- Content -->
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        <!-- Main Intro -->
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          class="lg:col-span-7 space-y-6"
        >
          <!-- Main Statement -->
          <div
            v-for="(value, idx) in tm('about.paragraphs')"
            :key="idx"
            class="relative flex flex-col gap-4 mb-6"
          >
            <p
              class="leading-relaxed" :class="[
                idx === 0
                  ? 'text-2xl font-bold tracking-wide text-slate-700 dark:text-slate-200'
                  : 'text-lg text-gray-600 dark:text-slate-200',
              ]"
            >
              {{ rt(value) }}
            </p>

            <!-- Line after first paragraph -->
            <div
              v-if="idx === 0"
              class="w-full h-px bg-gray-200 dark:bg-gray-700"
            />
          </div>

          <!-- Core Highlights -->
          <div class="pt-4 flex flex-wrap gap-3">
            <span
              data-aos="fade-up"
              data-aos-delay="0"
              class="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-slate-200"
            >
              <Icon
                name="lucide:zap"
                size="14"
                class="text-amber-500"
              />

              {{ t('about.benefits[0]') }}
            </span>

            <span
              data-aos="fade-up"
              data-aos-delay="150"
              class="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-slate-200"
            >
              <Icon
                name="lucide:shield-check"
                size="14"
                class="text-emerald-500"
              />

              {{ t('about.benefits[1]') }}
            </span>

            <span
              data-aos="fade-up"
              data-aos-delay="300"
              class="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-slate-200"
            >
              <Icon
                name="lucide:sparkles"
                size="14"
                class="text-indigo-500"
              />

              {{ t('about.benefits[2]') }}
            </span>
          </div>
        </div>

        <!-- Expertise & Tech Stack -->
        <div class="lg:col-span-5 space-y-4">
          <!-- Cards -->
          <div
            v-for="(card, index) in benefits"
            :key="index"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
            class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/80 dark:border-gray-700 hover:border-gray-300 dark:hover:border-slate-500 transition-colors duration-300"
          >
            <!-- Card Header -->
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0" :class=" index === 0 ? 'text-blue-800 bg-blue-100 border-blue-200 dark:text-blue-200 dark:bg-blue-900/40 dark:border-blue-800' : index === 2 ? 'text-green-800 bg-green-100 border-green-200 dark:text-green-200 dark:bg-green-900/40 dark:border-green-800' : 'text-gray-800 bg-gray-100 border-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600' ">
                <Icon :name="card.icon" size="20" />
              </div>

              <!-- Title + Technology -->
              <div>
                <h4
                  class="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-slate-300"
                >
                  {{ card.title }}
                </h4>

                <p
                  class="text-base font-semibold text-gray-900 dark:text-slate-100"
                >
                  {{ card.technology }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <p
              class="text-sm text-gray-600 dark:text-slate-300"
            >
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
