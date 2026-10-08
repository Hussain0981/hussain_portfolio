<script setup lang="ts">
const { t, localeProperties } = useI18n()
const siteUrl = useSiteConfig().url
const ogImage = `${siteUrl}/projects/og-image.png`

// Home page title already contains your name, so don't append the site name again.
useHead({ titleTemplate: '%s' })

// @nuxtjs/seo already sets these automatically, so they are NOT repeated here:
// og:title, og:description, og:url, og:site_name, og:type, og:locale,
// twitter:title, twitter:description, canonical URL, html lang and dir.
useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),

  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t('seo.title'),

  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
  twitterImageAlt: () => t('seo.title'),
  // twitterSite: '@your_handle',
  // twitterCreator: '@your_handle',
})
</script>

<template>
  <div :dir="localeProperties.dir">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
