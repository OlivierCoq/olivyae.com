// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ]
    }
  },

  css: [
    '~/assets/css/main.css',
    '~/assets/scss/main.scss'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt', '@vesp/nuxt-fontawesome'],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  fontawesome: {
    component: 'fa',
    suffix: true,
    icons: {
      solid: [
        'faTimes'
      ]
    }
  }
})