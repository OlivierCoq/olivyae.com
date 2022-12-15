<template>
  <div id="music_player" class="position-fixed bg-light">
    <div class="container-fluid">
        <div class="row">
            <div class="col-4">
                <div class="ctr-album_cover d-flex flex-row align-items-end w-75">
                    <div class="w-50">
                        <img :src="track.album.art" :alt="track.album.name" class="shadow-1 rounded w-100 mb-3 me-3">
                    </div>
                    <div class="w-50 px-3 metadata overflow-hidden">
                        <h6 class="text-dark fw-bold mb-0 text-nowrap" :class="track.name.length > 24 ? 'flow_over' : '' ">{{ track.name }}</h6>
                        <span class="text-dark " :class="track.album.name.length > 24 ? 'flow_over' : '' ">{{track.album.name}}</span>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <!-- https://codepen.io/EmNudge/pen/rRbLJQ -->
                <div v-if="!selecting" class="d-none">
                    <audio ref="audio_player" controls autoplay>
                        <source :src="track.audio_file" type="audio/mpeg" />
                    </audio>
                </div>
                <div v-if="!selecting" class="ctr-player">
                     <div class="ctr-controls mt-3 w-100 d-flex flex-row align-items-center justify-content-center">
                        <button class="btn btn-outline-secondary mx-2" @click="prev">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button v-if="playing" class="btn btn-outline-secondary center-btn mx-2" @click="pause">
                            <i class="fas fa-pause"></i>
                        </button>
                        <button v-if="!playing" class="btn btn-outline-secondary center-btn mx-2" @click="play">
                            <i class="fas fa-play ms-1"></i>
                        </button>
                       
                        <button class="btn btn-outline-secondary mx-2" @click="next">
                            <i class="fas fa-step-forward me-2"></i>
                        </button>
                     </div>
                     <div class="ctr-scrubber w-100 pt-2">
                        <div v-if="player" class="progress hoverable" ref="ctr_progress" @click="scrub">
                            <div class="progress-bar hoverable" role="progressbar" :style="`width: ${track_time}%`" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" @click="scrub"></div>
                        </div>
                     </div>
                </div>
            </div>
            <div class="col-4">
                <div class="ctr-volume">
                    
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MusicPlayer',
    props: ['track','pause_track', 'play_track', 'selecting'],
    data(){
        return {
            player: false,
            playing: true,
            track_time: false
        }
    },
    mounted(){
        this.player = this.$refs.audio_player
        this.$nextTick(()=> {
            this.show_tracktime()
        })
    },
    methods: {
        show_tracktime(){
            setInterval(() => {
                this.track_time = this.player.currentTime / this.player.duration * 100
            }, 1000);
        },
        play(){
            this.playing = true
            this.$refs.audio_player.play()
            this.$emit('playing', this.track)
        },
        pause(){
            this.playing = false
            this.$refs.audio_player.pause()
            this.$emit('paused', true)
        },
        prev() {
            this.$emit('prev') 
        },
        next() {
            this.$emit('next') 
        },
        scrub(e){
            const timeline = this.$refs.ctr_progress,
                  end_width = window.getComputedStyle(timeline).width, 
                  target_time = e.offsetX / parseInt(end_width) * this.player.duration
            this.player.currentTime = target_time
        }
    },
    watch: {
    }
}
</script>

<style lang="scss">
    #music_player {
        bottom: 0;
        left: 0;
        right: 0;
        height: 90px;

        .ctr-album_cover {
            height: 70px;
            

            .metadata {
                scroll-behavior: smooth;

                .flow_over {
                    -moz-transform: translateX(100%);
                    -webkit-transform: translateX(100%);
                    transform: translateX(100%);
                    
                    -moz-animation: my-animation 15s linear infinite;
                    -webkit-animation: my-animation 15s linear infinite;
                    animation: my-animation 15s linear infinite;

                    /* for Firefox */
                    @-moz-keyframes my-animation {
                        from { -moz-transform: translateX(100%); }
                        to { -moz-transform: translateX(-100%); }
                    }

                    /* for Chrome */
                    @-webkit-keyframes my-animation {
                        from { -webkit-transform: translateX(100%); }
                        to { -webkit-transform: translateX(-100%); }
                    }

                    @keyframes my-animation {
                        from {
                            -moz-transform: translateX(100%);
                            -webkit-transform: translateX(100%);
                            transform: translateX(100%);
                        }
                        to {
                            -moz-transform: translateX(-100%);
                            -webkit-transform: translateX(-100%);
                            transform: translateX(-100%);
                        }
                    }
                }

            }
        }
        .ctr-player {
            height: 60px;

            button {
                border-radius: 60px;
                height: 40px;
                width: 40px;
            }
            .center-btn {
                height: 45px;
                width: 45px;

                i {
                    transform: scale(1.3);
                }
            }
            .ctr-scrubber {
                .progress {
                    height: 8px;
                }
            }
        }
    }
</style>