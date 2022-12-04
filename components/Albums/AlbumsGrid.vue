<template>
    <div id="albums_grid">
        <div v-if="!editing_album" class="row">
            <div v-for="album, a in items" :key="a" class="col-sm-12 col-md-3">
                <div class="album hoverable position-relative shadow-1 rounded" :style="{'background-image':`url(${album.art})`}">
                    <div class="ctr-actions position-absolute rounded d-flex flex-row justify-content-center align-items-center">
                        <div class="rounded-circle">
                            <i class="far fa-edit fa-2x text-info" @click="launch_editor(album)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <span class="hoverable" @click="(editing_album = false)"> <i class="fas fa-caret-left"></i> Cancel </span>
            <EditAlbumInterface :album="target_album" />
        </div>
    </div>
</template>
<script>
    import EditAlbumInterface from './EditAlbumInterface.vue'
    export default {
        name: 'AlbumsGrid',
        props: ['items'],
        components: {
            EditAlbumInterface
        },
        data() {
            return {
                editing_album: false,
                target_album: false
            }
        },
        methods: {
            launch_editor(album){
                this.editing_album = true
                this.target_album = album
            }
        }
    }
</script>
<style lang="scss">
    #albums_grid {
        .album {
            height: 220px;
            width: 220px;
            background-size: cover;
            background-repeat: no-repeat;

            .ctr-actions {
                height: 200px;
                width: 200px;
                background: white;
                left: 10px;
                right: auto;
                top: 10px;
                opacity: 0;

                &:hover {opacity: 0.8;  }
            }
        }
    }
</style>