// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733692084/apple-touch-icon_r7ol8j.png",
        },
        {
          rel: 'android-chrome',
          sizes: '512x512',
          href: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733692085/android-chrome-512x512_oo9voi.png"
        },
        {
          rel: 'android-chrome',
          sizes: '192x192',
          href: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733692084/android-chrome-192x192_zljsyh.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733692085/favicon-32x32_qhxzov.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733692084/favicon-16x16_pdh735.png",
        },
        {
          rel: "icon",
          type: "icon",
          sizes: "16x16",
          href: "https://res.cloudinary.com/dffwof1gx/image/upload/v1733692085/favicon_nrth3d.ico"
        },
        {
          rel: "manifest",
          href: "https://res.cloudinary.com/dffwof1gx/raw/upload/v1733692085/site_dlnusl.webmanifest",
        }
      ],
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
        'times',
        'play',
        'pause',
        'backward',
        'forward',
        'volume-high',
        'volume-xmark',
        'headphones',
        'music',
        'microphone',
        'record-vinyl',
        'magnifying-glass',
        'caret-right',
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