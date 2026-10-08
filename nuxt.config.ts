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
    'nuxt-swiper',
    '@nuxtjs/seo',
  ],
  $development: {
    site: { url: 'http://localhost:3000' },
  },

  devtools: { enabled: true },

  app: {
    head: {
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
    },
  },

  css: [
    '~/assets/css/main.css',
  ],

  // Used by @nuxtjs/seo for canonical URL, og:url, og:site_name, sitemap, etc.
  // You can still override it with the NUXT_PUBLIC_SITE_URL environment variable.
  site: {
    url: 'https://hussainme.vercel.app',
    name: 'Hussain Ullah Portfolio',
  },

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
      { code: 'ar', language: 'ar-SA', dir: 'rtl', file: 'ar.json' },
    ],
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },
})
