<template>
  <div class="w-[100vw] h-full bg-slate-200 dark:bg-slate-900 absolute px-2">
    <div v-show="state.fresh" id="fresh" class="fade-in mt-[3.5rem] p-4 h-full w-full flex flex-col justify-center align-center items-cener fade-in">
      <h1 
        class="uppercase text-9xl font-bold primary-font text-center" 
        :style="{ backgroundImage: `url(${randomBackgroundImage()})` }"
      >
        Oli.Vyae
      </h1>
      <div class="mx-auto w-full md:w-1/2 lg:w-1/3 flex flex-row justify-center items-center align-center p-4">
        <span class="primary-font text-slate-800 dark:text-slate-200 text-xl mx-6 cursor-pointer" @click="init_music_browser">Browse my music now <font-awesome :icon="['fas', 'play']" /></span>
        <a href="/contact">
          <span class="primary-font text-slate-800 dark:text-slate-200 text-xl mx-6">Get in touch <font-awesome :icon="['fas', 'caret-right']" /></span>
        </a>
      </div>
    </div>
    <div v-show="!state.fresh" id="music_library" class="fade-in w-[98%] h-[92%] flex flex-col justify-start items-start align-start fade-in mx-auto mt-20 rounded-lg shadow-xl overflow-hidden bg-white dark:bg-slate-600">
      <div id="search-filter" class="w-full min-h-[20%] bg-slate-300 dark:bg-slate-700 flex flex-col items-center">

        <div id="search" class="mx-auto w-[90%] md:w-1/3 flex flex-row p-2 mt-10 mb-4">
          <input 
            type="text" 
            class="w-full p-2 rounded-md primary-font" placeholder="Search for music..."
            v-model="musicStore.search.query"
            @keydown="musicStore.doSearch"
            @keydown.backspace="musicStore.doSearch"
          />
          <button
            v-if="!musicStore.search.query.length"
            class="py-2 rounded-sm  text-slate-800 dark:text-slate-200 mx-4"
            @click="musicStore.doSearch"
          >
            <font-awesome class="text-slate-800 dark:text-slate-200 hover:text-purple-500" :icon="['fas', 'magnifying-glass']" />
          </button>
          <button
            v-else
            class="py-2 rounded-sm text-slate-800 dark:text-slate-200 mx-4"
            @click="musicStore.clearSearch"
          >
            <font-awesome class="text-slate-800 dark:text-slate-200 hover:text-purple-500" :icon="['fas', 'times']" />
          </button>
        </div>

        <div id="filters" class="mx-auto w-[90%] flex flex-row p-4">
          
          <div id="filter-tab-headers" class="py-2 px-4 flex flex-row align-center justify-center mx-auto w-full md:w-1/2">

            <div 
              class="filter_tab shadow-sm rounded-full my-2 py-2 px-4 cursor-pointer bg-white hover:bg-fuchsia-200 hover:text-white"
              :class="{ 'bg-fuchsia-500 text-white': state.filtering.active === 'genres' }" 
              @click="state.filtering.active = 'genres'"
            >
              <span class="primary-font text-xl font-thin">Genres</span>
            </div>



          </div>




        </div>

      </div>
      <div id="body" class="flex flex-1 m-4"></div>
    </div>
  </div> 
</template>
<script setup>

  // SEO
 useSeoMeta({
    title: 'Oli.Vyae',
    ogTitle: 'Oli.Vyae',
    description: 'Oli.Vyae is a music producer, composer, and multi-instrumentalist based in Tampa, FL United States. He is known for his work in the genres of electronic, pop, and rock music.',
    ogDescription: 'Oli.Vyae is a music producer, composer, and multi-instrumentalist based in Tampa, FL United States. He is known for his work in the genres of electronic, pop, and rock music.',
    image: 'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635260/guitars-small_nubeqe.jpg',
    url: 'https://olivyae.music',
  })

  // Importing components

  // Stores
import { useMusicStore } from '~/stores/music.js'
const musicStore = useMusicStore()

const audio_data = await useFetch('/api/audio/get_data', { method: 'GET' })


// State
const state = reactive({
  fresh: true,
  images: [
    'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635260/guitars-small_nubeqe.jpg',
    'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635370/DJing-small_zbhbfd.jpg',
    'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635468/Piano_Instrument_Music_v0ehoo.jpg'
  ],
  filtering: {
    active: 'all',
  }
})

// Lifecycle
onMounted(() => {
  musicStore.init_music(audio_data)
})

  // Methods
const randomBackgroundImage = () => {
  const randomIndex = Math.floor(Math.random() * state.images.length)
  return state.images[randomIndex]
}

const init_music_browser = () => {
  state.fresh = false
  // create a cookie to remember the user has visited the site
  document.cookie = 'fresh=false; max-age=31536000; path=/'
}

</script>
<style lang="scss">
  #fresh {
    h1 {
      color: rgba(225,225,225, .01);
      -webkit-background-clip:text;
      animation: animate 15s ease-in-out infinite;
    }
  }
</style>