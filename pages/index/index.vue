<template>
  <div class="w-[100vw] h-full bg-slate-200 dark:bg-slate-900 absolute px-2">
    <div v-show="state.fresh" id="fresh" class="fade-in mt-[3.5rem] p-4 h-full w-full flex flex-col justify-center align-center items-cener fade-in">
      <h1 
        class="uppercase text-9xl font-bold primary-font text-center" 
        :style="{ backgroundImage: `url(${randomBackgroundImage()})` }"
      >
        Oli.Vyae
      </h1>
      <div class="mx-auto w-full md:w-1/2 lg:w-1/3 flex flex-row justify-center items-center align-center">
        <span class="primary-font text-slate-800 dark:text-slate-200 text-xl mx-6 cursor-pointer" @click="init_music_browser">Browse my music now <font-awesome :icon="['fas', 'play']" /></span>
        <a href="/contact">
          <span class="primary-font text-slate-800 dark:text-slate-200 text-xl mx-6">Get in touch <font-awesome :icon="['fas', 'caret-right']" /></span>
        </a>
      </div>
    </div>
    <div v-show="!state.fresh" id="music_library" class="fade-in w-[98%] h-[90%] flex flex-col justify-start items-start align-start fade-in mx-auto mt-20 rounded-lg shadow-xl overflow-hidden bg-white dark:bg-slate-600">
      <div id="search-filter" class="w-full  bg-slate-300 dark:bg-slate-700 flex flex-col items-center">

        <div id="search" class="mx-auto w-[90%] md:w-1/3 flex flex-row p-2 mt-10">
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

        <div id="filters" class="mx-auto w-[90%] flex flex-col p-4">
          
          <div id="filter-tab-headers" class="py-2 px-4 flex flex-row align-center justify-center mx-auto w-full md:w-1/2">

            <div 
              id="filter-tab-genres"
              class="filter_tab shadow-sm rounded-full my-2 mx-2 py-2 px-4 cursor-pointer hover:bg-fuchsia-200 hover:text-white"
              :class=" state.filtering.target.label === 'genres' ? 'bg-fuchsia-500 text-white' : 'bg-white' " 
              @click="filter_tab_toggle('genres')"
            >
              <span class="primary-font text-xl font-thin">Genres</span>
            </div>

            <div 
              id="filter-tab-moods"
              class="filter_tab shadow-sm rounded-full my-2 mx-2 py-2 px-4 cursor-pointer hover:bg-fuchsia-200 hover:text-white"
              :class=" state.filtering.target.label === 'moods' ? 'bg-fuchsia-500 text-white' : 'bg-white' " 
              @click="filter_tab_toggle('moods')"
            >
              <span class="primary-font text-xl font-thin">Moods</span>
            </div>

            <div 
              id="filter-tab-instruments"
              class="filter_tab shadow-sm rounded-full my-2 mx-2 py-2 px-4 cursor-pointer hover:bg-fuchsia-200 hover:text-white"
              :class=" state.filtering.target.label === 'instruments' ? 'bg-fuchsia-500 text-white' : 'bg-white' " 
              @click="filter_tab_toggle('instruments')"
            >
              <span class="primary-font text-xl font-thin">Instruments</span>
            </div>

            <div 
              id="filter-tab-vocals"
              class="filter_tab shadow-sm rounded-full my-2 mx-2 py-2 px-4 cursor-pointer hover:bg-fuchsia-200 hover:text-white"
              :class=" state.filtering.target.label === 'vocals' ? 'bg-fuchsia-500 text-white' : 'bg-white' "
              @click="filter_tab_toggle('vocals')"
            >
              <span class="primary-font text-xl font-thin">Vocals</span>
            </div>



          </div>

          <div id="filter-tabs" class="mx-auto w-full flex flex-col md:flex-row">

            <div v-if="state.filtering.target.active && state.filtering.target.label === 'genres'" id="genres-tab" class="w-full flex flex-col lg:flex-row fade-in">
              <div class="grid grid-cols-2 md:grid-cols-5 my-4 gap-2 rounded-md overflow-hidden fade-in w-full lg:w-2/3">
                <div 
                  v-for="(genre, a) in musicStore.genres" :key="a" 
                  class="w-full h-auto p-10 bg-cover bg-center bg-no-repeat rounded-md shadow-md cursor-pointer opacity-90 hover:opacity-100"
                  :style="{ backgroundImage: `url(${genre.imagery.url})` }"
                  @click="select_genre(genre)"
                >
                  <span class="primary-font text-white text-xl font-bold">{{ genre.label }}</span>
                </div>
              </div>
              <div v-if="state.filtering.target.focus" class="w-full lg:w-1/3 flex flex-col items-start justify-start px-4 fade-in">
                <h3 class="primary-font text-2xl font-bold mt-4 text-slate-900 dark:text-slate-200">{{ state.filtering.target.focus.label }}</h3>
                <div class="my-4 w-full grid grid-cols-3 gap-2">
                  <div 
                    v-for="(subgenre, b) in state.filtering.target.focus.subgenres" :key="b" 
                    class="py-2 px-4 rounded-md shadow-sm bg-slate-100 hover:bg-slate-200 cursor-pointer text-sm"
                    @click="musicStore.doFilter('genre', subgenre)"
                  >
                    <span class="primary-font font-thin text-xm">{{ subgenre.label }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="state.filtering.target.active && state.filtering.target.label === 'moods'" id="moods-tab" class="w-full lg:w-1/2 mx-auto fade-in">
              <div class="w-full grid grid-cols-6 gap-2">
                <div v-for="(mood, c) in musicStore.moods" :key="c" 
                  class="bg-slate-100 hover:bg-slate-200 cursor-pointer p-3 text-center rounded-md shadow-sm primary-font font-thin"
                  @click="musicStore.doFilter('mood', mood)"
                >
                  {{ mood.label }}
                </div>
              </div>
            </div>

            <div v-if="state.filtering.target.active && state.filtering.target.label === 'instruments'" id="instruments-tab" class="w-full lg:w-1/2 mx-auto fade-in">
              <div class="w-full grid grid-cols-6 gap-2">
                <div v-for="(instrument, d) in musicStore.instruments" :key="d" 
                  class="bg-slate-100 hover:bg-slate-200 cursor-pointer p-3 text-center rounded-md shadow-sm primary-font font-thin flex flex-col justify-center"
                  @click="musicStore.doFilter('instrument', instrument)"
                >
                  {{ instrument.label }}
                </div>
              </div>
            </div>

            <div v-if="state.filtering.target.active && state.filtering.target.label === 'vocals'" id="vocals-tab" class="w-full lg:w-1/2 flex flex-row justify-center mx-auto fade-in">
              <div class="w-full grid grid-cols-3 gap-2">
                <div v-for="(vocal, e) in musicStore.vocals" :key="e" 
                  class="bg-slate-100 hover:bg-slate-200 cursor-pointer p-3 text-center rounded-md shadow-sm primary-font font-thin"
                  @click="musicStore.doFilter('vocal', vocal)"
                >
                  {{ vocal.label }}
                </div>
              </div>
            </div>

          </div>


        </div>

      </div>
      <div id="body" class="w-full flex flex-1 flex-col justify-start align-center items-center">
        <div class="ctr-filter_interface w-full h-[40px] py-2 px-4 flex flex-row justify-between bg-slate-100 mb-4">
          <p v-if="musicStore.search.filters.active_filters" class="text-slate-800 dark:text-slate-200 font-thin text-md me-10 fade-in">Results: {{ musicStore.search.results.length }}</p>
          <p v-if="musicStore.search.filters.active_filters" class="text-slate-800 dark:text-slate-200 font-thin text-md me-10 fade-in">Filtered by: 

            <span v-if="musicStore.search.filters.albums.length">
              <span class="primary-font">Albums: </span>
              <span v-for="(album, c) in musicStore.search.filters.albums" :key="c">
                {{ album.title }}
                <span v-if="c < musicStore.search.filters.albums.length - 1">, </span>
              </span>
            </span>

            <span v-if="musicStore.search.filters.genres.length">
              <span class="primary-font">Genres: </span>
              <span v-for="(genre, d) in musicStore.search.filters.genres" :key="d">
                {{ genre.label }}
                <span v-if="d < musicStore.search.filters.genres.length - 1">, </span>
              </span>
            </span>

            <span v-if="musicStore.search.filters.moods.length">
              <span class="primary-font">Moods: </span>
              <span v-for="(mood, e) in musicStore.search.filters.moods" :key="e">
                {{ mood.label }}
                <span v-if="e < musicStore.search.filters.moods.length - 1">, </span>
              </span>
            </span>

            <span v-if="musicStore.search.filters.instruments.length">
              <span class="primary-font">Instruments: </span>
              <span v-for="(instrument, f) in musicStore.search.filters.instruments" :key="f">
                {{ instrument.label }}
                <span v-if="f < musicStore.search.filters.instruments.length - 1">, </span>
              </span>
            </span>

            <span v-if="musicStore.search.filters.vocals.length">
              <span class="primary-font">Vocals: </span>
              <span v-for="(vocal, g) in musicStore.search.filters.vocals" :key="g">
                {{ vocal.label }}
                <span v-if="g < musicStore.search.filters.vocals.length - 1">, </span>
              </span>
            </span>

          </p>
          <div class="flex-1"></div>
          <button
            v-if="musicStore.search.filters.active_filters"
            class="px-4 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer"
            @click="musicStore.clearFilters"
          >
            <span class="primary-font text-slate-800 dark:text-slate-200 font-thin">Clear Filters </span>
            <font-awesome :icon="['fas', 'times']" />
          </button>
        </div>
        <div class="ctr-table_headers w-[96%] mx-auto px-2 py-4 flex flex-row">

          <div class="w-[10%]"></div>

          <div class="w-[20%]">
            <span class="text-slate-900 dark:text-slate-200 font-thin text-2xl">
            Title
            </span>
          </div>

          <div class="w-[20%]">
            <span class="text-slate-900 dark:text-slate-200 font-thin text-2xl">
            Album
            </span>
          </div>

          <div class="w-[20%]">
            <span class="text-slate-900 dark:text-slate-200 font-thin text-2xl">
            Genres
            </span>
          </div>

          <div class="w-[20%]">
            <span class="text-slate-900 dark:text-slate-200 font-thin text-2xl">
            Mood
            </span>
          </div>

          <div>
            <span class="text-slate-900 dark:text-slate-200 font-thin text-2xl">
            Length
            </span>
          </div>

        </div>
        <div class="w-[96%] h-[75%] mx-auto overflow-scroll relative flex flex-col">
          <TrackBox
            v-for="(track, index) in musicStore.search.results"
            :key="index"
            :track="track"
            :index="index"
          />
          <!-- Pagination -->
        </div>
          <!-- Music player: -->
        <MusicPlayer v-if="musicStore.player.track" />
      </div>
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
import TrackBox from './components/TrackBox.vue'
import MusicPlayer from './components/MusicPlayer.vue'

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
    target: {
      active: false,
      label: null,
      focus: null
    },
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

const filter_tab_toggle = (target) => {
  if (state.filtering.target.active && state.filtering.target.label === target) {
    state.filtering.target.active = false
    state.filtering.target.label = null
  } else {
    state.filtering.target.active = true
    state.filtering.target.label = target
  }
}

const select_genre = (genre) => {
  state.filtering.target.focus = genre
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