<template>
  <div
    class="w-full h-[60px] mb-1 border-2 border-slate-200 rounded-md p-2 flex flex-row justify-start align-center items-center"
  >
    <div class="w-[10%] text-gray-100 font-thin flex flex-row justify-center pe-10">
      <font-awesome
        :icon="['fas', 'pause']"
        color="#8d8484"
        class="me-3 hover:cursor-pointer"
        v-if="
          musicStore.player.track == props.track && musicStore.player.playing
        "
        @click="musicStore.pause(props.track, props.index)"
      />
      <font-awesome
        v-else
        :icon="['fas', 'play']"
        class="me-3 hover:cursor-pointer"
        :class="
          musicStore.player.track == props.track
            ? 'text-slate-800 dark:text-slate-200'
            : 'text-slate-800 dark:text-slate-200'
        "
        @click="musicStore.play(props.track, props.index)"
      />
    </div>
    <div class="w-[20%] text-slate-800 dark:text-slate-200 font-thin hover:font-normal text-sm md:text-lg cursor-pointer">
      <p @click="musicStore.play(props.track, props.index)">{{ props.track.title }}</p>
    </div>

    <div class="w-[20%] ctr-album text-slate-800 dark:text-slate-200 font-thin text-sm md:text-lg">
      <p
        @click="musicStore.doFilter('album', props.track.album)"
        class="hover:font-normal cursor-pointer"
      >{{ props.track.album.title }}</p>
    </div>
    <div class="w-[20%] ctr-genres text-slate-800 dark:text-slate-200 font-thin text-sm md:text-lg">
      <p 
        v-for="(genre, a) in props.track.genres" :key="a"
        class="cursor-pointer hover:font-normal m-0"
        @click="musicStore.doFilter('genre',genre)"
      >
        {{ genre.label }}
        <span v-if="a < props.track.genres.length - 1">, </span>
      </p>
    </div>
    <div class="ctr-moods w-[20%] text-slate-800 dark:text-slate-200 font-thin text-sm md:text-lg flex flex-wrap cursor-pointer">
      <p 
        v-for="(mood, b) in props.track.moods" :key="b"
        @click="musicStore.doFilter('mood',mood)"
        class="hover:font-normal"
      >
        {{ mood.label }}<span v-if="b < props.track.moods.length - 1" class="ms-0 me-1">, </span>
      </p>
    </div>
    <div class="ctr-moods text-slate-800 dark:text-slate-200 font-thin text-sm md:text-lg">
      <p>{{ props.track.length }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

import { useMusicStore } from "@/stores/music";
const musicStore = useMusicStore();


const state = reactive({
  init: false,
  selected: false,
});
</script>
<style lang="scss">
.border-thin {
  border: 1px solid;
}
.border-light {
  border-color: #8d8484;
}
.player-gray {
  color: #8d8484;
}
</style>
