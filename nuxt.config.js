export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  mode: 'spa',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Oli.Vyae Music',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap' }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/d39843528a.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
   { src: '~/assets/scss/main.scss', lang: 'sass' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/index.js' },
    { src: '~/plugins/bootstrap.js', mode: 'client' }
    // { src: '~/plugins/firebase.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // '@nuxtjs/style-resources  
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources', 
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    '@nuxtjs/pwa',
    'vue2-editor/nuxt',
    ['nuxt-mail', {
      message: {
        to: 'olli.vyae@gmail.com',
      },
      smtp: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          // user: 'username',
          // pass: 'password'
          user: process.env.mail_user,
          pass: process.env.mail_password
        },
      },
    }]
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyDmIgDHvkZGt66C9MVAQIBcKgD7z6ViDM4",
      authDomain: "olivyae-58b01.firebaseapp.com",
      databaseURL: "https://olivyae-58b01-default-rtdb.firebaseio.com",
      projectId: "olivyae-58b01",
      storageBucket: "olivyae-58b01.appspot.com",
      messagingSenderId: "717334486380",
      appId: "1:717334486380:web:8425741ba410e141c26749",
      measurementId: "G-2WKB37HQWS"
    },
    services: {
      auth:{
        initialize: {
          onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'onAuthStateChangedAction' 
        }
        // persistence: 'local',
        // initialize: {
          
        //   subscribeManually: false
        // },
        // ssr: false,
        // emulatorPort: 9099,
        // emulatorHost: 'http://localhost'
      },
      firestore: {
        memoryOnly: false, // default
        chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
        enablePersistence: true,
        // emulatorPort: 3000,
        // emulatorHost: 'localhost',
        settings: {
          // Firestore Settings - currently only works in SPA mode
        }
      },
      functions: {
        location: 'us-central1',
        emulatorPort: 12345,
        emulatorHost: 'http://10.10.10.3',
      },
      storage: true,
      database: {
        emulatorPort: 9000,
        emulatorHost: 'localhost',
      },
      messaging: true,
      performance: true,
      analytics: true,
      remoteConfig: true
    }
  },
  pwa: {
    meta: false,
    icon: false,
    workbox: {
      importScripts: [
        '/firebase-auth-sw.js'
      ],
      dev: process.env.NODE_ENV === 'development'
    }
  },
  styleResources: {
    scss: [
      '~assets/scss/*.scss',
    ]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
