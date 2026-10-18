<script setup lang="ts">
import { Icon } from '@iconify/vue'

const config = useRuntimeConfig()

const form = reactive({ title: '', message: '' })
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

async function handleSubmit() {
  status.value = 'loading'
  const formData = new FormData()
  formData.append('access_key', `${config.public.web3formsKey}`)
  formData.append('title', form.title)
  formData.append('message', form.message)

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const result = await res.json()
    if (result.success) {
      status.value = 'success'
      form.title = ''
      form.message = ''
    }
    else {
      status.value = 'error'
    }
  }
  catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div id="contact" class="w-full p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <!-- Left Column: Info & Form -->
      <div id="info" class="space-y-6">
        <div>
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {{ $t('contact.heading') }}
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {{ $t('contact.subheading') }}
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <input type="hidden" name="access_key" :value="config.public.web3formsKey">
          <!-- Title Input -->
          <div class="flex flex-col gap-1.5">
            <label for="title" class="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
              {{ $t('contact.form.titleLabel') }}
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              name="title"
              required
              :placeholder="$t('contact.form.titlePlaceholder')"
              class="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-600 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
            >
          </div>

          <!-- Message Textarea -->
          <div class="flex flex-col gap-1.5">
            <label for="message" class="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
              {{ $t('contact.form.messageLabel') }}
            </label>
            <textarea
              id="message"
              v-model="form.message"
              name="message"
              rows="4"
              required
              :placeholder="$t('contact.form.messagePlaceholder')"
              class="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-600 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
            />
          </div>

          <!-- Status messages -->
          <div>
            <p v-if="status === 'success'" class="text-sm text-green-600">
              {{ $t('contact.form.success') }}
            </p>
            <p v-if="status === 'error'" class="text-sm text-red-600">
              {{ $t('contact.form.error') }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="status === 'loading'"
            class="w-full py-2.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-medium text-sm rounded-lg transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ status === 'loading' ? $t('contact.form.sending') : $t('contact.form.submit') }}
          </button>
        </form>

        <!-- Divider -->
        <hr class="border-slate-100 dark:border-slate-700 my-4">

        <!-- Contact Details Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <!-- Phone Card -->
          <div class="p-3.5 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-100 dark:border-slate-600 flex items-start gap-3">
            <div class="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600 shadow-2xs">
              <Icon icon="ph:phone-duotone" class="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <span class="block text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                {{ $t('contact.form.callUs') }}
              </span>
              <a
                href="tel:+923275609507"
                dir="ltr"
                class="inline-block text-xs font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                +92 327 5609507
              </a>
            </div>
          </div>

          <!-- Address Card -->
          <div class="p-3.5 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-100 dark:border-slate-600 flex items-start gap-3">
            <div class="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600 shadow-2xs">
              <Icon icon="ph:map-pin-duotone" class="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <span class="block text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                {{ $t('contact.form.address') }}
              </span>
              <address class="text-xs font-medium text-slate-700 dark:text-slate-100 not-italic leading-relaxed">
                {{ $t('contact.form.addressText') }}
              </address>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Map Frame -->
      <div id="map" class="w-full h-full min-h-[320px] lg:min-h-[420px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 relative">
        <iframe
          title="Google Map Location"
          src="https://maps.google.com/maps?q=Dhakki,%20Charsadda,%20KPK,%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
          class="w-full h-full absolute inset-0 border-0 map-iframe"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS Filter inversion to convert Google Maps to Dark Mode */
:deep(.dark) .map-iframe,
.dark .map-iframe {
  filter: grayscale(100%) invert(92%) contrast(83%);
  transition: filter 0.3s ease-in-out;
}
</style>
