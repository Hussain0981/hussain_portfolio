// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    'nuxt-particles',
    '@nuxtjs/i18n',
    'nuxt-aos',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Hussain Ullah Portfolio',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }],
    },
  },
  css: [
    '~/assets/css/main.css',
  ],
  colorMode: {
    preference: 'system', // follow OS preference
    fallback: 'light', // if OS not detectable, use this
    dataValue: 'theme',
    classSuffix: '',
  },

  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', dir: 'ltr', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', dir: 'ltr', file: 'fr.json' },
      { code: 'ar', language: 'ar-AR', dir: 'rtl', file: 'ar.json' },
    ],
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },

})
