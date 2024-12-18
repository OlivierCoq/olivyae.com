<template>
  <div
    v-if="musicStore.player.track"
    id="music_player"
    class="music-player h-[5em] bottom-0 w-full bg-slate-300 dark:bg-slate-800 z-20 left-0 fixed"
  >
    <div class="w-full h-full flex flex-row justifty-start items-start">
      <div class="w-[20%] h-full flex flex-col px-5">
        <img
          :src="musicStore.player.track.album.cover .url"
          :alt="musicStore.player.track.title"
          class="w-[100px] mt-[-3rem] lg:mt-[-5rem] shadow-2xl"
        />
        <p class="text-slate-800 dark:text-slate-200 font-thin font-bold text-xs lg:text-sm primary-font mt-2">
          {{ musicStore.player.track.title }}
        </p>
        <small class="text-slate-800 dark:text-slate-200 font-thin text-xs">{{ musicStore.player.track.album.title }}</small>
      </div>
      <div class="w-[60%]">
        <audio
          id="audio_player"
          controls
          controlsList="nodownload"
          autoplay
          oncontextmenu="return false;"
          style="display: none"
        >
          <source :src="musicStore.player.track.audio_file" type="audio/mpeg" />
        </audio>
        <div class="flex flex-col w-full mt-2">
          <div
            class="h-[3rem] flex flex-row text-slate-800 dark:text-slate-200 justify-center items-center"
          >
            <font-awesome
              :icon="['fas', 'backward-step']"
              class="mx-3 cursor-pointer text-lg"
              @click="musicStore.select_previous"
            />
            <font-awesome
              v-if="!musicStore.player.playing"
              :icon="['fas', 'play']"
              class="mx-3 cursor-pointer text-3xl"
              @click="musicStore.play(musicStore.player.track)"
            />
            <font-awesome
              v-else
              :icon="['fas', 'pause']"
              class="mx-3 cursor-pointer text-3xl"
              @click="musicStore.pause(musicStore.player.track)"
            />
            <font-awesome
              :icon="['fas', 'forward-step']"
              class="mx-3 cursor-pointer text-lg"
              @click="musicStore.select_next"
            />
          </div>
          <div
            class="h-[2rem] w-full flex flex-row items-center justify-center"
          >
            <div
              class="w-[10%] h-[15px] mb-[1rem] flex flex-col justify-center align-center items-end px-3"
            >
              <p v-if="musicStore.player.track" class="text-slate-800 dark:text-slate-200">
                {{ musicStore.player.elapsed }}
              </p>
            </div>
            <div
              id="timeline"
              class="w-[80%] h-[5px] mb-[1rem] bg-slate-100 mx-auto cursor-pointer"
              @click="musicStore.scrub($event)"
            >
              <div
                v-if="musicStore.player.track"
                class="scrubber h-[5px] bg-slate-500 hover:cursor-pointer"
                :style="{ width: `${musicStore.player.track_time}%` }"
              ></div>
            </div>
            <div
              class="w-[10%] h-[15px] mb-[1rem] flex flex-col justify-center align-center items-start px-3"
            >
              <p v-if="musicStore.player.track" class="text-slate-800 dark:text-slate-200">
                {{ musicStore.player.duration }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[20%] h-full">
        <div class="h-full w-full flex flex-row items-center justify-start">
          <font-awesome
            :icon="[
              'fas',
              `${musicStore.player.mute ? 'volume-mute' : 'volume-up'}`,
            ]"
            class="text-slate-800 dark:text-slate-200 mx-3 cursor-pointer"
            @click="musicStore.mute_track"
          />

          <div
            id="volume_adjuster"
            class="w-[60%] h-[5px] bg-slate-100 cursor-pointer"
            @click="musicStore.adjust_volume"
          >
            <div
              class="scrubber h-[5px] bg-slate-500 hover:cursor-pointer"
              :style="{ width: `${musicStore.player.volume * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// Stores:
const musicStore = useMusicStore();
</script>
<style lang="scss"></style>
