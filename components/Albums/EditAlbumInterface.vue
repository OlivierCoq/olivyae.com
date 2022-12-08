<template>
    <div id="edit_album_interface">
        <div class="py-3 w-100">
            <h3>Edit <span class="fw-bold">"{{ album.name }}"</span></h3>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-4">
                <div class="py-3" :key="comp_key">
                    <h4>album cover</h4>
                    <div v-if="!album_cover.updating_art" class="album_cover hoverable position-relative shadow-1 rounded" :style="{'background-image':`url(${album.art})`}">
                        <div class="ctr-actions position-absolute rounded d-flex flex-row justify-content-center align-items-center">
                            <div class="rounded-circle">
                                <i class="far fa-edit fa-2x text-info" @click="update_cover_art"></i>
                            </div>
                        </div>
                    </div>
                    <dropzone v-show="album_cover.updating_art" id="album_cover" ref="album_cover" :options="album_cover.options" :destroyDropzone="true" />
                    <div class="w-100 d-flex flex-row justify-content-between align-items-center">
                        <p v-if="album_cover.updating_art" 
                            class="hoverable" 
                            @click="cancel_art_update"> 
                                <i class="fas fa-caret-left"></i> Cancel 
                        </p>
                        <p v-if="album_cover.updating_art" class="text-success hoverable" @click="upload_album_cover">
                            Save<span v-if="album_cover.upload_complete">d <i class="fas fa-check"></i> </span>
                        </p>
                    </div>
                </div>
            </div> 
            <div class="col-sm-12 col-md-8">
                <div class="pb-3 w-100 mt-5">
                    <div class="mb-3">
                        <input type="text" class="form-control" v-model="album.name" placeholder="album name" required>
                    </div>
                    <div class="mb-3">
                        <client-only>
                            <label class="form-label">description</label>
                            <vue-editor v-model="album.description"></vue-editor>
                        </client-only>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" v-model="album.credits" placeholder="credits (optional)">
                    </div>
                    <div v-for="filter_input, c in album.filters" :key="c" class="mb-3 w-100 ctr-tags">
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
                        <draggable v-model="album.tracks" @start="drag=true" @end="drag=false" class="w-100 my-3 d-flex flex-column position relative">
                            <div v-for="(track, e) in album.tracks" :key="e" class="bg-white w-100 p-3 shadow-1 my-2 rounded d-flex flex-row align-items-center justify-content-between">
                                <i class="fas fa-grip-vertical text-secondary m-1 grabbable" @click="(track.order = e)"></i>
                                <p class="fw-bold m-0 d-inline-block text-truncate w-25">{{ track.name }} |</p>
                                <p class="m-0 d-inline-block text-truncate w-50"><strong>File: </strong>{{ track.file_name }}</p>
                                <div>
                                    <i class="far fa-edit text-info me-2 hoverable" @click="edit_track(track)"></i>
                                    <i class="fa fas fa-trash text-danger hoverable" @click="remove_track(album, track, e)"></i>
                                </div>
                            </div>
                        </draggable> 

                            <!-- Adding a new track -->
                        <button class="btn btn-info btn-md w-100 text-center text-light" @click="add_new_track">
                                <i class="fa fa-plus"></i> new track
                        </button>
                            <!-- Track upload progress -->
                        <div v-if="uploading_track" class="w-100 p-3">
                            <h6>uploading track...</h6>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" :style="`width: ${upload_progress}%`" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                            <!-- Submit new Track -->
                        <div v-show="adding_new_track" class="w-100 my-3" :key="comp_key">
                            <div class="w-100 bg-light shadow-1 p-3">
                                <div class="w-100 d-flex flex-row">
                                    <div class="w-75"> 
                                        <input type="text" class="form-control" v-model="new_track.name" placeholder="Track title" @keydown="new_track.errors = []" required>
                                    </div>
                                    <div class="w-25 d-flex flex-direction-row align-items-center justify-content-end">
                                        <i class="fa fa-plus fa-2x text-success hoverable mx-4" @click="add_track(album, new_track)"></i>
                                        <i class="fas fa-ban text-danger hoverable" @click="cancel_add_track(album)"></i>
                                    </div>
                                </div>
                                <div v-show="new_track.zone" class="w-100 d-flex flex-row">
                                    <div class="w-100 my-3">
                                        <dropzone id="new_track_zone" ref="new_track_zone" :options="new_track.options" :destroyDropzone="true" />
                                    </div>
                                </div>
                                <div v-for="filter_input, f in new_track.filters" :key="f" class="mb-3 w-100 ctr-tags">
                                    <div class="form-control p-2" style="height: 4rem;" :key="comp_key">
                                        <div v-for="tag, g in filter_input.tags" :key="( 'tag' + g)" class="tag mx-1 py-1 px-2 rounded"> 
                                            {{ tag.name }} <i class="fa fa-times text-light hoverable" @click="remove_tag(filter_input, g)"></i>
                                        </div>
                                        <input 
                                            v-model="filter_input.tag" 
                                            class="m-0 p-0 tag-input" 
                                            :placeholder="filter_input.name"
                                            @keyup.enter="add_tag(filter_input)"  /> 
                                    </div>
                                </div>
                                <div v-if="new_track.errors.length" class="w-100 alert alert-danger">
                                    <ul class="list-unstyled">
                                        <li v-for="error, h in new_track.errors" :key="h">{{ error }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                            <!-- Editing existing track (WET code. Will refactor soon.) -->
                        <div v-if="target_edit_track" class="w-100 my-3" :key="(comp_key + 1)">
                            <div class="w-100 bg-light shadow-1 p-3">
                                <div class="w-100 d-flex flex-row">
                                    <div class="w-75"> 
                                        <input type="text" class="form-control" v-model="target_edit_track.name" placeholder="Track title" @keydown="target_edit_track.errors = []" required>
                                    </div>
                                    <div class="w-25 d-flex flex-direction-row align-items-center justify-content-end">
                                        <i class="fas fa-check fa-2x text-success hoverable mx-4" @click="update_track(target_edit_track)"></i>
                                        <i class="fas fa-ban text-danger hoverable" @click="cancel_update_track(target_edit_track)"></i>
                                    </div>
                                </div>
                                <div v-show="target_edit_track.zone" class="w-100 d-flex flex-row">
                                    <div class="w-100 my-3">
                                        <dropzone id="existing_track_zone" ref="existing_track_zone" :options="new_track.options" :destroyDropzone="true" />
                                    </div>
                                </div>
                                <div v-for="filter_input, f in target_edit_track.filters" :key="f" class="mb-3 w-100 ctr-tags">
                                    <div class="form-control p-2" style="height: 4rem;" :key="comp_key">
                                        <div v-for="tag, g in filter_input.tags" :key="( 'tag' + g)" class="tag mx-1 py-1 px-2 rounded"> 
                                            {{ tag.name }} <i class="fa fa-times text-light hoverable" @click="remove_tag(filter_input, g)"></i>
                                        </div>
                                        <input 
                                            v-model="filter_input.tag" 
                                            class="m-0 p-0 tag-input" 
                                            :placeholder="filter_input.name"
                                            @keyup.enter="add_tag(filter_input)"  /> 
                                    </div>
                                </div>
                                <div v-if="target_edit_track.errors.length" class="w-100 alert alert-danger">
                                    <ul class="list-unstyled">
                                        <li v-for="error, h in new_track.errors" :key="h">{{ error }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                                <!-- Submit Album -->
                        <button 
                            class="btn btn-success text-center text-light w-100 btn-md my-3" 
                            @click.prevent="update_album(album)"
                            :disabled="(uploading_track || album.upload_complete)">
                            update album
                        </button>

                        <div v-if="(album.errors.length > 0)" class="alert alert-danger">
                            <ul class="list-unstyled">
                                <li v-for="(error, i) in album.errors" :key="i">
                                    {{ error }}
                                </li>
                            </ul>
                        </div>

                        <div v-if="update.album_update_complete" class="alert alert-success alert-dismissible" :key="comp_key">
                            Album successfully Updated!
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
    import EditTrackInterface from './EditTrackInterface.vue'

    export default {
        name: 'EditAlbumInterface',
        props: ['album'],
        components: {
            Dropzone,
            VueEditor,
            draggable,
            EditTrackInterface
        },
        data(){
            return {
                comp_key: 0,
                target_edit_track: false,
                adding_new_track: false,
                upload_complete: false,
                uploading_track: false,
                upload_progress: 0,
                album_cover: { 
                    file: false,
                    updating_art: false,
                    zone: false,
                    options: {
                        url: '/upload',
                        addRemoveLinks: true,
                        acceptedFiles: 'image/*'
                    },
                    upload_complete: false
                },
                new_track: {
                    order: 0,
                    name: '',
                    album_id: '',
                    audio_file: '',
                    file_name: '',
                    zone: false,
                    upload_progress: 0,
                    uploading_track: false,
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
                errors: [],
                update: {
                    errors: [],
                    updating: false,
                    update_progress: 0,
                    album_update_complete: false,
                }
            }
        },
        created(){
            // this.album['new_track'] = 
            // this.album['adding_new_track'] = false
            // this.album['album_cover'] = { 
            //     updating_art: false,
            //     zone: false,
            //     options: {
            //         url: '/upload',
            //         addRemoveLinks: true,
            //         acceptedFiles: 'image/*'
            //     }
            // }
            this.album['upload_complete'] = false
            this.album['errors'] = false
            
        },
        methods: {
            init_cover_art_zone() {
                this.$nextTick(()=>{
                    this.album_cover.zone = this.$refs.album_cover 
                })
            },
            update_cover_art(){
                this.album_cover.updating_art = true
                this.init_cover_art_zone()
                this.$nextTick(()=> {
                    this.album_cover.updating_art = true
                })
                // this.comp_key += 1
            },
            upload_album_cover(){
                let file = this.album_cover.zone.dropzone.files[0],
                    storageRef = this.$fireModule.storage().ref(),
                    uploadTask = storageRef.child(file.name).put(file)

                
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        console.log('uploading image', snapshot)
                    },
                    (error) => { console.log(`Upload Error: ${error}`)},
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then((url)=> { 
                                this.album.art = url
                                this.album_cover.upload_complete = true
                            })
                    }
                )    
            },
            cancel_art_update(){
                this.album_cover.updating_art = false
                // this.comp_key += 1
            },
            add_tag(filter){
                if(!filter.tags == '') 
                    filter.tags.push({name: filter.tag})
                filter.tag = ''
                // this.comp_key += 1
            },
            remove_tag(filter, index) {
                filter.tags.splice(index, 1)
                // this.comp_key += 1
            },
            // Tracks
                // Edit Existing Tracks
            edit_track(track){
                this.adding_new_track = false
                this.target_edit_track = track
                this.target_edit_track['errors'] = []
                
                this.comp_key += 1
            },
            update_track(existing_track){
                existing_track.zone = this.$refs.existing_track_zone
                let tracks = []

                // this.$fireModule.firestore().collection('tracks').get().where('name', '==', existing_track.name)
                this.$fireModule.firestore().collection('tracks').get()
                    .then((snapshot) => { snapshot.docs.forEach((trk) => { tracks.push(trk.data()) }) })   
                
            },
            cancel_update_track(track) {
                this.target_edit_track = false
            },
                // New Track
            add_new_track() {
                this.init_new_track_zone(this.new_track)
                this.adding_new_track = true
                // this.comp_key += 1
                // console.log('Adding tracks to -> ', album)         
            },
            cancel_add_track() {
                this.adding_new_track = false
            },
            init_new_track_zone(track){
                this.$nextTick(() => {
                    track.zone = this.$refs.new_track_zone 
                })
            },
            add_track(album, track){
                console.log('adding track to ->', track)
                if(!track.name.length) { track.errors.push(`Track needs a name, or it'll never be heard!`) }
                if(!track.zone.dropzone.files.length) { track.errors.push(`Track needs...an actual track, fam!`) }
                track.filters.forEach((filter_obj) => {
                    if(!filter_obj.tags.length) { track.errors.push(`Gotta have ${filter_obj.name}, or the listeners'll be lost!`) }
                })
                if(!track.errors.length) { 
                    this.upload_track(track)
                    this.album.tracks.push(track) 
                    this.new_track = {
                        name: '',
                        album_id: '',
                        audio_file: '',
                        zone: false,
                        uploading_track: false,
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
                const thisObj = this
                let file = track.zone.dropzone.files[0],
                    storageRef = this.$fireModule.storage().ref(),
                    uploadTask = storageRef.child(file.name).put(file)

                track.file_name = file.name
                
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        thisObj.uploading_track = true
                        thisObj.upload_progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log(`Uploading: ${thisObj.upload_progress}%`);
                        if(thisObj.upload_progress == 100) { 
                            thisObj.uploading_track = false  
                        
                            console.log('uploaded track -> ', track)
                        }
                    },
                    (error) => { console.log(`Upload Error: ${error}`)},
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then((url)=> { 
                                track.audio_file = url
                                
                                // Add Track to Database:
                                let random_id = Math.random().toString(36).slice(2), match

                                    // Check if in DB first
                                this.$fire.firestore.collection('tracks').get()
                                    .then((snapshot) => { 
                                        snapshot.docs.forEach((trk) => { 
                                             if(trk.data().name == track.name) { match = true }
                                        }) 
                                    })
                                    .then(()=>{
                                        if(!match) {
                                             // Then add to DB
                                            this.$fireModule.firestore().collection('tracks').doc(random_id).set({
                                                id: random_id,
                                                name: track.name,
                                                file_name: track.file_name,
                                                audio_file: track.audio_file,
                                                description: '',
                                                filters: track.filters,
                                                album_id: thisObj.album.id
                                            })
                                            thisObj.uploading_track = false
                                        }
                                    })
                            })
                    }
                )
            },
            remove_track(album, track, index) {
                album.tracks.splice(index, 1)
            },
                // Updating album
            update_album(album){
                console.log('updating album ->', album)
                const thisObj = this
                // let storageRef = this.$fireModule.storage().ref(),
                //     uploadTask = storageRef.child(album.name).put(album)

                thisObj.update.updating = true

                // update: {
                //     errors: [],
                //     updating: false,
                //     update_progress: 0,
                //     album_update_complete: false,
                // }
                // return false
                album.tracks.forEach((tr) => { tr.zone = false })
                this.$fireModule.firestore().collection('albums').doc(album.id).set({
                    name: album.name,
                    art: album.art,
                    credits: album.credits,
                    id: album.id,
                    description: album.description,
                    filters: album.filters,
                    tracks: album.tracks
                })
                    .then(()=> {
                        thisObj.update.updating = false
                        thisObj.update.album_update_complete = true

                        setTimeout(() => {
                            thisObj.update.album_update_complete = false
                        }, 2000)
                    })

                

            }
        }
    }
</script>
<style lang="scss">
    #edit_album_interface {
        .album_cover {
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