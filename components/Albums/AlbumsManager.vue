<template>
    <div id="albums_manager">
        <!-- New Album -->
        <div v-if="mode == 'new album' ">
            <h3 class="fw-bold my-3">album</h3><hr/>
            <div class="row">
                <div class="col-sm-12 col-md-4">
                    <div class="py-3">
                        <h4>album cover</h4>
                        <dropzone id="album_cover" ref="album_cover" :options="select_option.metadata.album_cover.options" :destroyDropzone="true" />
                    </div>
                </div>
                <div class="col-sm-12 col-md-8">
                    <div class="pb-3 w-100 mt-5">
                        <div class="mb-3">
                            <input type="text" class="form-control" v-model="select_option.metadata.name" placeholder="album name" required>
                        </div>
                        <div class="mb-3">
                            <client-only>
                                <label class="form-label">description</label>
                                <vue-editor v-model="select_option.metadata.description"></vue-editor>
                            </client-only>
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" v-model="select_option.metadata.credits" placeholder="credits (optional)">
                        </div>
                        <div v-for="filter_input, c in select_option.metadata.filters" :key="c" class="mb-3 w-100 ctr-tags">
                            <div class="form-control p-2" style="height: 4rem;">
                                <div v-for="(tag, d) in filter_input.tags" :key="( 'tag' + d)" class="tag mx-1 py-1 px-2 rounded"> 
                                    {{ tag.name }} <i class="fa fa-times text-light hoverable" @click="remove_tag(filter_input, d)"></i>
                                </div>
                                <input 
                                    v-model="filter_input.tag" 
                                    class="m-0 p-0 tag-input" 
                                    :placeholder="filter_input.name"
                                    @keyup.enter="add_tag(filter_input)"  /> 
                            </div>
                        </div>
                        <div class="mb-3 w-100">
                            <h4 class="mb-3">Tracks</h4>

                            <!-- List tracks here -->
                            <draggable v-model="select_option.metadata.tracks" @start="drag=true" @end="drag=false" class="w-100 my-3 d-flex flex-column position relative">
                                <div v-for="(track, e) in select_option.metadata.tracks" :key="e" class="w-100 bg-white p-3 shadow-1 my-2 rounded d-flex flex-row align-items-center justify-content-between grabbable">
                                    <i class="fas fa-grip-vertical text-secondary m-1" @click="(track.order = e)"></i>
                                    <p class="fw-bold m-0 d-inline-block text-truncate w-25">{{ track.name }} |</p>
                                    <p class="m-0 d-inline-block text-truncate w-50"><strong>File: </strong>{{ track.file_name }}</p>
                                    <i class="fa fas fa-trash text-danger hoverable" @click="remove_track(select_option.metadata, track, e)"></i>
                                </div>
                            </draggable>

                                <!-- Adding a new track -->
                            <button class="btn btn-info btn-md w-100 text-center text-light" @click="add_new_track(select_option.metadata, select_option.metadata.new_track)">
                                    <i class="fa fa-plus"></i> new track
                            </button>
                                <!-- Track upload progress -->
                            <div v-if="select_option.metadata.uploading_track" class="w-100 p-3">
                                <h6>uploading track...</h6>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" :style="`width: ${select_option.metadata.upload_progress}%`" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                                <!-- Submit new Track -->
                            <div v-show="select_option.metadata.adding_new_track" class="w-100 my-3" :key="comp_key">
                                <div class="w-100 bg-light shadow-1 p-3">
                                    <div class="w-100 d-flex flex-row">
                                        <div class="w-75"> 
                                            <input type="text" class="form-control" v-model="select_option.metadata.new_track.name" placeholder="Track title" @keydown="select_option.metadata.new_track.errors = []" required>
                                        </div>
                                        <div class="w-25 d-flex flex-direction-row align-items-center justify-content-end">
                                            <i class="fa fa-plus fa-2x text-success hoverable mx-4" @click="add_track(select_option.metadata, select_option.metadata.new_track)"></i>
                                            <i class="fas fa-ban text-danger hoverable" @click="cancel_add_track(select_option.metadata)"></i>
                                        </div>
                                    </div>
                                    <div v-show="select_option.metadata.new_track.zone" class="w-100 d-flex flex-row">
                                        <div class="w-100 my-3">
                                            <dropzone id="new_track_zone" ref="new_track_zone" :options="select_option.metadata.new_track.options" :destroyDropzone="true" />
                                        </div>
                                    </div>
                                    <div v-for="filter_input, f in select_option.metadata.new_track.filters" :key="f" class="mb-3 w-100 ctr-tags">
                                        <div class="form-control p-2" style="height: 4rem;">
                                            <div v-for="tag, g in filter_input.tags" :key="( 'tag' + g)" class="tag mx-1 py-1 px-2 rounded"> 
                                                {{ tag.name }} <i class="fa fa-times text-light hoverable" @click="remove_tag(filter_input, d)"></i>
                                            </div>
                                            <input 
                                                v-model="filter_input.tag" 
                                                class="m-0 p-0 tag-input" 
                                                :placeholder="filter_input.name"
                                                @keyup.enter="add_tag(filter_input)"  /> 
                                        </div>
                                    </div>
                                    <div v-if="select_option.metadata.new_track.errors.length" class="w-100 alert alert-danger">
                                        <ul class="list-unstyled">
                                            <li v-for="error, h in select_option.metadata.new_track.errors" :key="h">{{ error }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> 

                                    <!-- Submit Album -->
                            <button 
                                class="btn btn-success text-center text-light w-100 btn-md my-3" 
                                @click.prevent="submit_album(select_option.metadata)"
                                :disabled="(select_option.metadata.adding_track || select_option.upload_complete)">
                                submit new album
                            </button>

                            <div v-if="(select_option.errors.length > 0)" class="alert alert-danger">
                                <ul class="list-unstyled">
                                    <li v-for="(error, i) in select_option.errors" :key="i">
                                        {{ error }}
                                    </li>
                                </ul>
                            </div>

                            <div v-if="select_option.upload_complete" class="alert alert-success">
                                Album successfully added!
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
    name: 'AlbumsManager',
    props: ['mode'],
    components: {
        Dropzone,
        VueEditor,
        draggable
    },
    data(){
        return {
            comp_key: 0,
            adding_new: false,
            select_option: false,
            posting: false,
            options: [
                {
                    name: `New Album`,
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
                                acceptedFiles: 'image/*'
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
                        upload_progress:0,
                        clear: false,
                        new_track: {
                            order: 0,
                            name: '',
                            album: '',
                            audio_file: '',
                            file_name: '',
                            zone: false,
                            upload_progress: 0,
                            options: {
                                url: '/upload',
                                addRemoveLinks: true,
                                acceptedFiles: 'audio/*'
                            },
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
                            errors: []
                        },
                        tracks: [

                        ]
                    },
                    upload_complete: false
                }
            ]
        }
    },
    created(){
        if(this.mode == 'new album') {
            this.select_option = this.options[0]
            this.init_album_upload(this.select_option)
        }
    },
    methods: {
            // Album
        init_album_upload(option) {
            this.$nextTick(()=> {f
                option.metadata.album_cover.zone = this.$refs.album_cover 
            })
        },
        add_tag(filter){
            if(!filter.tags == '') 
                filter.tags.push({name: filter.tag})
            filter.tag = ''
        },
        remove_tag(filter, index) {
            filter.tags.splice(index, 1)
        },
        submit_album_cover(album){
            // Album Cover
            // console.log('zone file', album.album_cover.zone.dropzone.files[0])
            let album_cover = album.album_cover.zone.dropzone.files[0]
            if(!album_cover) {
                album.clear = false
                this.select_option.errors.push('Please upload an album cover. We need to give the people something to look at!')
            } else {
                let storageRef = this.$fireModule.storage().ref(),
                    uploadTask = storageRef.child(album_cover.name).put(album_cover)

                uploadTask.on('state_changed', 
                    (snapshot) => {
                        album.upload_progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Uploading: ${album.upload_progress}%`);
                    },
                    (error) => { console.log(`Upload Error: ${error}`)},
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then((url)=> { 
                                album.art = url
                            })
                    }
                )
                
            }
        },
        async submit_album(album) {
            console.log('Submitting album: ', album)
            this.select_option.errors = []
            
            // Go down list for validation
            await this.submit_album_cover(album)
                // Name (Description and Credits are optional)
            if(!album.name.length) { this.select_option.errors.push('Album needs a name, man!') }
                // Filters
            album.filters.forEach((filter_obj) => {
                if(!filter_obj.tags.length) { this.select_option.errors.push(`Gotta have ${filter_obj.name}, or the listeners'll be lost!`) }
            })
                // Tracks
            if(!album.tracks.length) {
                this.select_option.errors.push(`No tracks? What are they even listening to, dude?`)
            }
            if(!this.select_option.errors.length) {
                try {
                    let random_id = Math.random().toString(36).slice(2),
                        target_tracks = []

                        album.tracks.forEach((track) => {
                            target_tracks.push({
                                name: track.name,
                                audio_file: track.audio_file,
                                file_name: track.file_name,
                                order: track.order,
                                filters: track.filters,
                                album_id: random_id
                            })
                        })
                        
                    if((target_tracks.length > 0) && (album.art)) {
                        this.$fireModule.firestore().collection('albums').doc(random_id).set({
                            id: random_id,
                            name: album.name,
                            art: album.art,
                            credits: album.credits,
                            description: album.description,
                            filters: album.filters,
                            tracks: target_tracks
                        })
                        this.select_option.upload_complete = true
                    }
                }
                catch(err) { console.log('post error', err)}
            }
        },
            // Tracks
        add_new_track(album, new_track) {
            this.init_new_track_zone(new_track)
            album.adding_new_track = true
            console.log('Adding tracks to -> ', album)         
        },
        cancel_add_track(album) {
            this.select_option.metadata.adding_new_track = false
            album.adding_new_track = false
            this.comp_key += 1
        },
        init_new_track_zone(new_track){
            this.$nextTick(()=> {
                new_track.zone = this.$refs.new_track_zone 
            })
        },
        add_track(album, track){
            console.log('adding track to ->', album)
            if(!track.name.length) { track.errors.push(`Track needs a name, or it'll never be heard!`) }
            if(!track.zone.dropzone.files.length) { track.errors.push(`Track needs...an actual track, fam!`) }
            track.filters.forEach((filter_obj) => {
                if(!filter_obj.tags.length) { track.errors.push(`Gotta have ${filter_obj.name}, or the listeners'll be lost!`) }
            })
            if(!track.errors.length) { 
                this.upload_track(track)
                album.tracks.push(track) 
                album.new_track = {
                name: '',
                album: '',
                audio_file: '',
                zone: false,
                upload_progress: 0,
                options: {
                    url: '/upload',
                    addRemoveLinks: true, 
                    acceptedFiles: 'audio/*'
                },
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
                order: null,
                errors: []
            }
            }
            
            album.adding_track = false
        },
        upload_track(track){
            let file = track.zone.dropzone.files[0],
                storageRef = this.$fireModule.storage().ref(),
                uploadTask = storageRef.child(file.name).put(file)

            track.file_name = file.name
            
            uploadTask.on('state_changed', 
                (snapshot) => {
                    track.upload_progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.select_option.metadata.upload_progress = track.upload_progress
                    this.select_option.metadata.uploading_track = true
                    console.log(`Uploading: ${track.upload_progress}%`);
                    if(track.upload_progress == 100) { this.select_option.metadata.uploading_track = false  }
                },
                (error) => { console.log(`Upload Error: ${error}`)},
                () => {
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then((url)=> { 
                            
                            track.audio_file = url
                        
                            // Add Track to Database:
                            let random_id = Math.random().toString(36).slice(2)
                            this.$fireModule.firestore().collection('tracks').doc(random_id).set({
                                id: random_id,
                                name: track.name,
                                file_name: track.file_name,
                                audio_file: track.audio_file,
                                description: '',
                                filters: track.filters
                            })
                        })
                }
            )
        },
        remove_track(album, track, index) {
            album.tracks.splice(index, 1)
        }        
    }
}
</script>
<style lang="scss">
    #albums_manager {
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
</style>