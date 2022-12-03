<template>
    <div id="admin" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-1">
                    <div class="card w-100 my-4 p-3">
                        <div class="d-flex flex-column w-100">
                            <div v-for="tab, a in tabs" :key="a" class="w-100 p-3 d-flex flex-row justify-content-center align-items-center">
                                <span v-html="tab.icon" @click="toggle(tab)" :class="tab == current_tab ? 'text-info' : '' "></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-11">
                    <div class="card w-100 my-4">
                        <div class="card-body">

                                <!-- Add/Remove -->
                            <div v-if="current_tab.name == 'Add' " class="p-4 ctr-add w-100">
                                <h2 class="fw-bold">add new</h2>
                                <span v-if="current_tab.data.adding_new" class="my-2 fw-bold hoverable" @click="current_tab.data.adding_new = false">
                                    <i class="fas fa-caret-left"></i> Back
                                </span>
                                <div v-if="!current_tab.data.adding_new" class="w-100 d-flex flex-row flex-wrap py-3">
                                    <div v-for="option, b in current_tab.data.options" :key="b" class="option p-5 mx-2 rounded shadow-1 d-flex flex-column justify-content-center align-items-center hoverable">
                                        <span v-html="option.icon" @click="addnew_select_option(option)"></span>
                                    </div>
                                </div>
                                <div v-else>

                                        <!-- Add a new Album -->
                                    <div v-if="current_tab.data.select_option.name == 'Album' ">
                                        <h3 class="fw-bold my-3">album</h3><hr/>
                                        <div class="row">
                                            <div class="col-sm-12 col-md-4">
                                                <div class="py-3">
                                                    <h4>album cover</h4>
                                                    <dropzone id="album_cover" ref="album_cover" :options="current_tab.data.select_option.metadata.album_cover.options" :destroyDropzone="true" />

                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-8">
                                                <div class="py-3 w-100 mt-5">
                                                    <div class="mb-3">
                                                        <input type="text" class="form-control" v-model="current_tab.data.select_option.metadata.name" placeholder="album name" required>
                                                    </div>
                                                    <div class="mb-3">
                                                        <client-only>
                                                            <label class="form-label">description</label>
                                                            <vue-editor v-model="current_tab.data.select_option.metadata.description"></vue-editor>
                                                        </client-only>
                                                    </div>
                                                    <div class="mb-3">
                                                        <input type="text" class="form-control" v-model="current_tab.data.select_option.metadata.credits" placeholder="credits (optional)">
                                                    </div>
                                                    <div v-for="filter_input, c in current_tab.data.select_option.metadata.filters" :key="c" class="mb-3 w-100 ctr-tags">
                                                        <div class="form-control p-2" style="height: 4rem;">
                                                            <div v-for="(tag, d) in filter_input.tags" :key="( 'tag' + d)" class="tag mx-1 py-1 px-2 rounded"> 
                                                                {{ tag.name }} <i class="fa fa-times text-light hoverable" @click="removeTag(filter_input, d)"></i>
                                                            </div>
                                                            <input 
                                                                v-model="filter_input.tag" 
                                                                class="m-0 p-0 tag-input" 
                                                                :placeholder="filter_input.name"
                                                                @keyup.enter="addTag(filter_input)"  /> 
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 w-100">
                                                        <h4 class="mb-3">Tracks</h4>

                                                        <!-- List tracks here -->


                                                        <button class="btn btn-info btn-md w-100 text-center text-light" @click="add_track(current_tab.data.select_option.metadata)">
                                                             <i class="fa fa-plus"></i> new track
                                                        </button>
                                                            <!-- Add Track -->
                                                        <div v-if="current_tab.data.select_option.metadata.adding_track" class="w-100 my-3">
                                                            <div class="w-100 d-flex bg-light shadow-1 p-3">
                                                                <div class="w-75"> 
                                                                    <input type="text" class="form-control" v-model="current_tab.data.select_option.metadata.new_track.name" placeholder="Track title" required>
                                                                </div>
                                                                <div class="w-25 d-flex flex-direction-row align-items-center justify-content-end">
                                                                    <i class="fa fa-file-audio fa-2x text-info me-2 hoverable"></i>
                                                                    <i class="fa fa-plus fa-2x text-success hoverable mx-4"></i>
                                                                    <i class="fas fa-ban text-danger hoverable" @click="cancel_add_track(current_tab.data.select_option.metadata)"></i>
                                                                </div>
                                                            </div>
                                                        </div> 

                                                             <!-- Submit Album -->
                                                        <button class="btn btn-success text-center text-light w-100 btn-md my-3" @click.prevent="submit_album(current_tab.data.select_option.metadata)">
                                                            submit new album
                                                        </button>

                                                        <div v-if="(current_tab.data.select_option.errors.length > 0)" class="alert alert-danger">
                                                            <ul class="list-unstyled">
                                                                <li v-for="error, e in current_tab.data.select_option.errors" :key="e">
                                                                    {{ error }}
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Dropzone from 'nuxt-dropzone'
    import 'nuxt-dropzone/dropzone.css'
    import { VueEditor } from 'vue2-editor'


    export default {
        name: 'Admin',
        middleware: 'auth',
        layout: 'inner_page',
        components: {
            Dropzone,
            VueEditor
        },
        data() {
            return {
                tabs: [
                   {
                    name: `Add`,
                    icon: `<i class="fa fa-plus fa-2x hoverable"></i>`,
                    data: {
                        adding_new: false,
                        select_option: false,
                        posting: false,
                        options: [
                            {
                                name: `Album`,
                                icon: `<i class="fas fa-record-vinyl fa-3x hoverable"></i>`,
                                errors: [],
                                metadata: {
                                    name: ``,
                                    description: ``,
                                    art: false,
                                    album_cover: {
                                        zone: false,
                                        options: {
                                            url: '/upload',
                                            addRemoveLinks: true,
                                            acceptedFiles: 'image/*s'
                                        }
                                    },
                                    credits: ``,
                                    filters: [
                                        {
                                            name: 'Instruments',
                                            tag: '',
                                            tags: []
                                        },
                                        {
                                            name: 'Mood',
                                            tag: '',
                                            tags: []
                                        },
                                        {
                                            name: 'Genre',
                                            tag: '',
                                            tags: []
                                        }
                                    ],
                                    adding_track: false,
                                    clear: false,
                                    new_track: {
                                        name: '',
                                        album: '',
                                        audio_file: ''
                                    },
                                    tracks: [

                                    ]
                                }
                            },
                            {
                                name: `Track`,
                                icon: `<i class="far fa-file-audio fa-3x hoverable"></i>`,
                                options: []
                            }
                        ]
                    }
                   },
                   {
                    name: `Albums`,
                    icon: `<i class="fas fa-record-vinyl fa-2x hoverable"></i>`,
                    data: {
                        adding_new: false,
                        editing: false,
                        options: []
                    }
                   },
                   {
                    name: `Tracks`,
                    icon: `<i class="far fa-file-audio fa-2x hoverable"></i>`,
                    data: {
                        adding_new: false,
                        editing: false,
                        options: []
                    }
                   }
                ],
                current_tab: false
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.user
            }
        },
        created() {
            this.current_tab = this.tabs[0]
        },
        methods: {
            toggle(tab) {
                this.current_tab = tab
            },
            // Adding New (Album, Track)
            addnew_select_option(option) {
                this.current_tab.data.select_option = option
                this.current_tab.data.adding_new = true

                switch (option.name) {
                    case 'Album':
                        this.init_album_upload(option)
                      break;
                    default:
                        console.log('default.')
                }
            },
                // Album
            init_album_upload(option) {
                this.$nextTick(()=> {
                    option.metadata.album_cover.zone = this.$refs.album_cover 
                })
            },
            addTag(filter){
                if(!filter.tags == '') 
                    filter.tags.push({name: filter.tag})
                filter.tag = ''
            },
            removeTag(filter, index) {
                filter.tags.splice(index, 1)
            },
            add_track(album) {
                album.adding_track = true
                console.log('Adding tracks to -> ', album)
                album.tracks.push(album.new_track)
            },
            cancel_add_track(album) {
                album.adding_track = false
            },
            submit_album(album) {
                console.log('Submitting album: ', album)
                this.current_tab.data.select_option.errors = []
                
                // Go down list for validation
                this.submit_album_cover(album)

            },
            submit_album_cover(album){
                // Album Cover
                console.log('zone file', album.album_cover.zone.dropzone.files[0])
                let album_cover = album.album_cover.zone.dropzone.files[0]
                if(!album_cover) {
                    album.clear = false
                    this.current_tab.data.select_option.errors.push('Please upload an album cover. We need to give the people something to look at!')
                } else {
                    let storageRef = this.$fireModule.storage().ref(),
                        uploadTask = storageRef.child(album_cover.name).put(album_cover)

                    uploadTask.snapshot.ref.getDownloadURL()
                        .then((url)=> { album.art = url})
                }
            }
        }
    }
</script>
<style lang="scss">
    #admin {
        min-height: 100vh;

        .ctr-add {
            .option {
                height: 150px;
                width: 150px;

                &:hover {
                    color: #3ECAEF !important;
                }                
            }
            .dropzone {
                box-shadow: 0px 2px 18px #22222836;
                border-radius: 0.25rem;
                border: 5px solid #8080803b;
                background: #80808014;
            }
            .ctr-tags {
                .tag-input {
                    border: none;
                    &:focus,
                    &:focus-visible {
                        border: none;
                        outline: none;
                    }
                }
                .tag {
                    float: left;
                    background-color: black;
                    color: white;
                }
            }
        }
    }
</style>