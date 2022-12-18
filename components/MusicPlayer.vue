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
                     <div v-if="player" class="ctr-scrubber w-100 p-0 d-flex flex-row justify-content-center align-items-center">
                        <span v-if="elapsed.length" class="text-dark elapsed">{{elapsed}}</span>
                        <div v-if="elapsed.length" class="progress hoverable mx-4" ref="ctr_progress" @click="scrub">
                            <div class="progress-bar hoverable" role="progressbar" :style="`width: ${track_time}%`" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" @click="scrub"></div>
                        </div>
                        <span v-if="duration.length" class="text-dark duration">{{duration}}</span>
                     </div> 
                </div>
            </div>
            <div class="col-4">
                <div class="ctr-volume d-flex flex-row align-items-center justify-content-end">
                    <i class="fas text-dark mx-3 hoverable" :class="mute ? 'fa-volume-mute': 'fa-volume-up' " @click="mute_track"></i>
                    <div class="progress" ref="volume_adjuster" @click="adjust_volume">
                        <div class="progress-bar" role="progressbar" :style=" `width: ${volume * 100}%` " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
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
            track_time: false, 
            elapsed: '',
            duration:'',
            volume: 0.75,
            mute: false
        }
    },
    mounted(){
        this.player = this.$refs.audio_player
        this.$nextTick(()=> {
            this.show_tracktime()
            this.keyboard_actions()
        })
    },
    methods: {
        show_tracktime(){
            setInterval(() => {
                this.track_time = this.player.currentTime / this.player.duration * 100
                this.duration = this.format_time(this.player.duration)
                this.elapsed = this.format_time(this.player.currentTime)
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
        keyboard_actions(){
            const thisObj = this
            document.body.onkeyup = (e) => {
                switch(e.keyCode){
                    case 32:
                        if(thisObj.playing) { thisObj.pause() }
                        else ( thisObj.play() )
                     break;
                    case 39:
                        thisObj.next()
                     break;
                    case 37:
                        thisObj.prev()
                     break;
                    default:
                        return true
                }
            }
        },
        prev() {
            this.$emit('prev') 
        },
        next() {
            this.$emit('next') 
        },
        format_time(num){
            let seconds = parseInt(num), minutes = parseInt(seconds / 60)

            seconds -= minutes * 60;
            const hours = parseInt(minutes / 60)
            minutes -= hours * 60;

            if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
            else return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`
        },
        scrub(e){
            const timeline = this.$refs.ctr_progress,
                  end_width = window.getComputedStyle(timeline).width, 
                  target_time = e.offsetX / parseInt(end_width) * this.player.duration
            this.player.currentTime = target_time
        },
        adjust_volume(e){
            this.mute = false
            const slider = this.$refs.volume_adjuster,
                  full_width = window.getComputedStyle(slider).width,
                  target_volume = e.offsetX / parseInt(full_width)

            this.player.volume = target_volume
            this.volume = target_volume
        },
        mute_track() {
            this.mute = !this.mute
            this.player.muted = !this.player.muted
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
            height: 75px;
            

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
                    width: 80%;
                }
            }
        }
        .ctr-volume {
            height: 100px;
            .progress {
                width: 50%;
                height: 8px;
            }
        }
    }
</style>