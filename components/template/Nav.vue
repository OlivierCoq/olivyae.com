<template>
  <div 
    id="nav" class="backdrop-blur-sm bg-transparent/10 h-[50px] flex flex-row justify-between fixed top-0 z-10 w-full"
    :class="settings.dark ? 'dark' : ''"
  >
    <div class="ctr-logo w-1/2 md:w-1/3 h-full flex flex-start justify-start align-start items-center p-2">
      <a href="/" >
        <h3 
          class="uppercase text-3xl font-bold primary-font" 
          v-html="state.nav.logo.title" 
          :style="{ backgroundImage: `url(${randomBackgroundImage()});`  }">
        </h3>
      </a>
    </div>
    <div class="invisible lg:flex flex-1"></div>
    <div class="h-full w-1/2 md:w/1/3 invisible md:visible md:flex flex-row justify-end items-center px-4">
      <div class="flex flex-row flex-wrap h-full">
        <a 
          v-for="(social, a) in state.nav.social_media" 
          :key="a" 
          :href="social.url" 
          class="h-full w-8 flex flex-row justify-center items-center">
          <font-awesome :icon="['fab', social.name]" class="text-slate-700 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" />
        </a> 
      </div>
      <a href="/contact" class="uppercase primary-font ms-4 text-sm text-slate-700 dark:text-slate-200">Contact</a>
    </div>
  </div>
</template>
<script setup>

  // State
  const state = reactive({
    nav: {
      logo: {
        title: 'Oli.Vyae',
        images: [
          'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635260/guitars-small_nubeqe.jpg',
          'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635370/DJing-small_zbhbfd.jpg',
          'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635468/Piano_Instrument_Music_v0ehoo.jpg',
          'https://res.cloudinary.com/dffwof1gx/image/upload/v1733947582/cassette_izcrvj.jpg'
        ]
      },
      social_media: [
        {
          name: 'instagram',
          url: 'https://www.instagram.com/oli.vyae/'
        },
        {
          name: 'bluesky',
          url: 'https://olivyae.bsky.social'
        },
        {
          name: 'youtube',
          url: 'https://www.youtube.com/@OliVyae'
        },
        {
          name: 'facebook',
          url: 'https://www.facebook.com/OliVyaeMusic/'
        },
        { 
          name: 'tiktok',
          url: 'https://www.tiktok.com/@ollivyae'
        },
        {
          name: 'bandcamp',
          url: 'https://olivyae.bandcamp.com/'
        },
        {
          name: 'soundcloud',
          url: 'https://soundcloud.com/oliolimusic'
        },
        {
          name: 'medium',
          url: 'https://medium.com/@olli.vyae'
        }
      ]
    }
  })

  // Stores
  import { settingsStore } from '~/stores/settings.js'
  const settings = settingsStore()
  
  // Methods
  const randomBackgroundImage = () => {
    const randomIndex = Math.floor(Math.random() * state.nav.logo.images.length)
    return state.nav.logo.images[randomIndex]
  }

</script>
<style lang="scss">
  @keyframes animate {
    0%, 100% {
      background-position: left top;
    }
    25%{
      background-position: right bottom;
     }
    50% {
      background-position: left bottom;
    }
    75% {
      background-position: right top;
    }   
}
  #nav {
    .ctr-logo {
      a {
        h3 {
          color: rgba(225,225,225, .01);
          -webkit-background-clip:text;
          animation: animate 15s ease-in-out infinite;
        }
      }
    }
  }
</style>