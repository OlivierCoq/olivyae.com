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
                <div v-if="!selecting" class="ctr-player">
                    <audio controls autoplay>
                        <source :src="track.audio_file" type="audio/mpeg" />
                    </audio>
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
    props: ['track','pause_track', 'selecting'],
    data(){
        return {
            playing: false
        }
    }
}
</script>

<style lang="scss">
    #music_player {
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;

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
            height: 80px;
        }
    }
</style>