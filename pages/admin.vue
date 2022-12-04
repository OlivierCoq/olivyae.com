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
                                        <span v-html="option.icon" @click="select_option(option)"></span>
                                    </div>
                                </div>
                                <div v-else>

                                        <!-- Add a new Album -->
                                    <div v-if="current_tab.data.select_option.name == 'Album' ">
                                        <AlbumsManager :mode="'new album'" />
                                    </div>

                                </div>
                            </div>

                            <div v-if="current_tab.name == 'Albums' " class="p-4 w-100">
                                <h2 class="fw-bold mb-4">your albums</h2>
                                
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
    import draggable from 'vuedraggable'

    export default {
        name: 'Admin',
        middleware: 'auth',
        layout: 'inner_page',
        components: {
            Dropzone,
            VueEditor,
            draggable
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
            select_option(option) {
                this.current_tab.data.select_option = option
                this.current_tab.data.adding_new = true

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