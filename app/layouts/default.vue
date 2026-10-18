<script setup>
// Agar aap chahte hain ke color dynamically (JS variable se) control ho,
// to neeche wala approach use karein (optional):
//
// import { ref } from 'vue'
// const watermarkColor = ref('text-slate-200/40')
// const headerBg = ref('bg-gray-100')
//
// Phir template mein: :class="[watermarkColor]" is tarah bind karein
</script>

<template>
  <div
    class="relative overflow-hidden min-h-screen dark:bg-[url('/bg.png')] dark:bg-black"
  >
    <!-- Background Watermark Typography -->
    <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10
             uppercase text-[18vw] font-black select-none pointer-events-none
             text-slate-100/80 dark:text-slate-700/30"
    >
      <span>Hussain</span>
    </div>

    <!-- Header -->
    <header>
      <NavigationTheHeader />
    </header>

    <!-- Main Content Stacking Context -->
    <main class="relative z-10 max-w-7xl mx-auto sm:px-3 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<style scoped>
/*
  ============================================
  ALTERNATIVE: CSS Variables se control (recommended for theming)
  ============================================
  Agar aap chahte hain ke colors ek jagah se globally control hon,
  to CSS variables use karein. Neeche uncomment kar ke apna color daal dein:
*/

/*
:root {
  --watermark-color: #e2e8f0;
  --watermark-opacity: 0.4;
  --header-bg-light: #f3f4f6;
  --header-bg-dark: #000000;
}

.dark {
  --watermark-color: #334155;
}
*/
</style>
