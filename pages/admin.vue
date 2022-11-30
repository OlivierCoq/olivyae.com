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

                                    <div v-if="current_tab.data.select_option.name = 'Album' ">
                                        <h3 class="fw-bold my-3">album</h3><hr/>
                                        <div class="row">
                                            <div class="col-sm-12 col-md-4">
                                                <div class="py-3">
                                                    <h4>album cover</h4>
                                                    <dropzone id="album_cover" ref="album_cover" :options="current_tab.data.select_option.new_album_cover.options" :destroyDropzone="true" />
                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-8">
                                                <div class="py-3 w-100 mt-5">
                                                    <div class="mb-3">
                                                        <input type="text" class="form-control" v-model="current_tab.data.select_option.metadata.name" placeholder="album name">
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
                                                    <div class="mb-3">
                                                        <vue-tags-input class="w-100"
                                                            v-model="current_tab.data.select_option.metadata.filters[0].tag" 
                                                            :tags="current_tab.data.select_option.metadata.filters[0].tags"
                                                            @tags-changed="newTags => tags = newTags" />
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
    import VueTagsInput from '@johmun/vue-tags-input';


    export default {
        name: 'Admin',
        middleware: 'auth',
        layout: 'inner_page',
        components: {
            Dropzone,
            VueEditor,
            VueTagsInput
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
                                new_album_cover: {
                                    zone: false,
                                    file: null,
                                    options: {
                                        url: '/upload'
                                    }
                                },
                                metadata: {
                                    name: ``,
                                    description: ``,
                                    credits: ``,
                                    filters: [
                                        {
                                            name: 'Instrument',
                                            tag: '',
                                            tags: []
                                        }
                                    ]
                                }
                            },
                            {
                                name: `Track`,
                                icon: `<i class="far fa-file-audio fa-3x hoverable"></i>`
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
                    data: {}
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
                        return true
                }
            },
                // Album
            init_album_upload(option) {
                option.new_album_cover.zone = this.$refs.album_cover
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
            .vue-tags-input {

            }
        }
    }
</style>