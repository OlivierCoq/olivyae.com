<template>
  <div class="w-[100vw] h-full bg-slate-200 dark:bg-slate-900 absolute px-2">
    <div v-show="state.fresh" id="fresh" class="fade-in mt-[3.5rem] p-4 h-full w-full flex flex-col justify-center align-center items-cener fade-in">
      <h1 
        class="uppercase text-9xl font-bold primary-font text-center" 
        :style="{ backgroundImage: `url(${randomBackgroundImage()});` }"
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
    <div v-show="!state.fresh" class="fade-in w-full h-full flex flex-col justify-center items-center align-center fade-in">

    </div>
  </div> 
</template>
<script setup>

 useSeoMeta({
    title: 'Oli.Vyae',
    ogTitle: 'Oli.Vyae',
    description: 'Oli.Vyae is a music producer, composer, and multi-instrumentalist based in Tampa, FL United States. He is known for his work in the genres of electronic, pop, and rock music.',
    ogDescription: 'Oli.Vyae is a music producer, composer, and multi-instrumentalist based in Tampa, FL United States. He is known for his work in the genres of electronic, pop, and rock music.',
    image: 'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635260/guitars-small_nubeqe.jpg',
    url: 'https://olivyae.music',
  })

  // Importing components


// State
const state = reactive({
  fresh: true,
  images: [
    'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635260/guitars-small_nubeqe.jpg',
    'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635370/DJing-small_zbhbfd.jpg',
    'https://res.cloudinary.com/dffwof1gx/image/upload/v1733635468/Piano_Instrument_Music_v0ehoo.jpg'
  ]
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