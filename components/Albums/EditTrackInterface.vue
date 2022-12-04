<template>
    <div v-show="!canceled" class="w-100 my-3">
        <div class="w-100 bg-light shadow-1 p-3">
            <div class="w-100 d-flex flex-row">
                <div class="w-75"> 
                    <input type="text" class="form-control" v-model="track.name" placeholder="Track title" @keydown="track.errors = []" required>
                </div>
                <div class="w-25 d-flex flex-direction-row align-items-center justify-content-end">
                    <i class="fa fa-plus fa-2x text-success hoverable mx-4" @click="add_track(album, track)"></i>
                    <i class="fas fa-ban text-danger hoverable" @click="cancel_add_track"></i>
                </div>
            </div>
            <div v-show="track.zone" class="w-100 d-flex flex-row">
                <div class="w-100 my-3">
                    <dropzone id="new_track_zone" ref="new_track_zone" :options="track.options" :destroyDropzone="true" />
                </div>
            </div>
            <div v-for="filter_input, f in track.filters" :key="f" class="mb-3 w-100 ctr-tags">
                <div class="form-control p-2" style="height: 4rem;" :key="comp_key">
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
            <div v-if="track.errors.length" class="w-100 alert alert-danger">
                <ul class="list-unstyled">
                    <li v-for="error, h in track.errors" :key="h">{{ error }}</li>
                </ul>
            </div>
        </div>
    </div> 
</template>
<script>
     import Dropzone from 'nuxt-dropzone' 

    export default {
        name: 'EditTrackInterface',
        props: ['album','track', 'mode'],
        components: {
            Dropzone
        },
        data(){
            return {
                comp_key: 0,
                canceled: null
            }
        },
        created(){
            this.canceled = false
        },
        methods: {
            add_tag(filter){
                if(!filter.tags == '') 
                    filter.tags.push({name: filter.tag})
                filter.tag = ''
                this.comp_key += 1
            },
            remove_tag(filter, index) {
                filter.tags.splice(index, 1)
                this.comp_key += 1
            },
            cancel_add_track(){
                this.canceled = true
                this.comp_key += 1
            },
            add_track(){
                this.canceled = true
                this.comp_key += 1
            }
        }
    }
</script>
<style lang="scss">
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
</style>