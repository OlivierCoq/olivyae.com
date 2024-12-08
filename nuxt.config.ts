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
    icons: {
      solid: [
        'times'
      ],
      brands: [
        'facebook',
        'instagram',
        'youtube',
        'bluesky',
        'tiktok',
        'medium',
        'soundcloud',
        'bandcamp',
        'spotify',
      ]
    }
  },

  googleFonts: {
    families: {
      'Noto+Sans': [100, 200, 300, 400, 500, 600, 700, 800, 900, 'latin', 'latin-ext','bold'],
    }
  }
})