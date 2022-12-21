<template>
  <div class="container-fluid music-library mt-3">
      <div class="row">
          <div class="col-sm-12 col-md-3">
              <div class="ctr-filters">
                  <h3 class="text-uppercase lato text-light">Search By</h3>

                  <h5 v-show="active_filters.length" class="mb-3 lato text-light hoverable" @click="clearFilters">Clear Filters <i class="fa fa-times text-light mx-2"></i></h5>

                  <ul v-if="filters.length" class="list-unstyled w-100 my-5">
                      <li v-for="filter, a in filters" :key="a" class="w-100 my-1">
                        <div class="filter-head hoverable p-2" @click="selectFilterMenu(filter)" :key="filter_key">
                            <h4 class="text-light lato">{{ filter.name }}</h4>
                        </div>
                        <ul v-show="filter.active" class="list-unstyled" :key="filter_option_key">
                            <li v-for="option, b in filter.options" :key="b" class="filter-option hoverable p-2 w-100 d-flex flex-row justify-content-between" :class="option.active ? 'active' : '' ">
                                <span class="text-light text-uppercase lato" @click="applyFilterOption(option)">{{ option.name }}</span>
                                <i v-if="option.active" class="fa fa-times text-light mx-2" @click="removeFilter(option)"></i> 
                            </li>
                        </ul>
                      </li>
                  </ul>

              </div>
          </div>
          <div class="col-sm-12 col-md-9">
              <div class="row">
                  <div class="ctr-search d-flex flex-row">
                      <div class="ctr-input d-flex flex-column justify-content-center">
                          <input type="text" v-model="search.query" @keydown="doSearch">
                      </div>
                      <div class="ctr-button">
                          <button class="mx-3" @click="doSearch">
                              <i class="fa fa-search fa-2x"></i>
                          </button>
                      </div>
                  </div>
              </div>
              <div class="row p-4">
                <div class="col-1"><span class="text-light">#</span></div>
                <div class="col-4"><span class="text-light text-uppercase">name</span></div>
                <div class="col-3"><span class="text-light text-uppercase">album</span></div>
                <div class="col-2"><span class="text-light text-uppercase">mood</span></div>
                <div class="col-2"><span class="text-light text-uppercase">genre</span></div>
              </div><hr class="text-light m-0"/>
                <!-- Results -->
              <div class="ctr-results w-100 hoverable">
                <div v-for="track, c in results" :key="c" class="row p-2 track" :class="playing_track == track ? 'playing' : ''">
                    <div class="col-1">
                        <h5 class="text-light hoverable num_play mt-2 mb-1 mx-3">{{c + 1}}</h5>
                        <i v-if="playing_track == track" class="fa fa-pause play-btn text-light mt-2 mb-1 mx-3" @click="pause(track)"></i>
                        <i v-else class="fa fa-play play-btn text-light mt-2 mb-1 mx-3" @click="play(track)"></i>
                    </div>
                    <div class="col-4">
                        <h5 class="text-light fw-light mt-1 lato">{{ track.name }}</h5>
                    </div>
                    <div class="col-3">
                        <h5 v-if="track.album" class="text-light mt-1">{{track.album.name}}</h5>
                    </div>
                    <div class="col-2 overflow-hidden">
                        <span v-for="item, d in track.filters[1].tags" :key="d" class="text-dark tag rounded px-2 py-1 m-1 hoverable" @click="applyFilterOption(item)">{{item.name}} </span>
                    </div>
                    <div class="col-2">
                        <span v-for="item, e in track.filters[2].tags" :key="e" class="text-dark tag rounded px-2 py-1 m-1 hoverable" @click="applyFilterOption(item)">{{item.name}} </span>
                    </div>
                </div>
              </div>

          </div>
      </div>
      <div class="row">
        <music-player v-if="select_track" ref="music_player" :track="select_track" 
            :pause_track="pause_track" 
            :play_track="play_track" 
            :selecting="selecting" 
            @prev="select_previous"
            @next="select_next"
            @playing="r_playing" 
            @paused="r_paused" 
            :key="comp_key" />
      </div>
  </div>
</template>

<script>
import MusicPlayer from './MusicPlayer.vue'

export default {
    components: { MusicPlayer },
    name: 'MusicLibrary',   
    data() {
        return {
            filters: [],
            tracks: [],
            albums: [],
            results: [],
            active_filters: [],
            search: {
                query: ''
            },
            queryObj: '',
            playing_track: false,
            play_track: false,
            pause_track: false,
            select_track: false,
            selecting: false,
            comp_key: 0,
            filter_key: 0,
            filter_option_key: 0
        }
    },
    created() {
        this.setupFilters()
        this.fetchAlbums()
    },
    methods: {
            // Filter Functions:
        setupFilters() {
            const thisObj = this
            this.$fire.firestore.collection('filters').get()
            .then((snapshot) => { snapshot.docs.forEach((f) => { thisObj.filters.push(f.data()) }) })   
            .then(() => { thisObj.$nextTick(()=> {
                thisObj.filters.forEach((filt) => { filt['active'] = false })
            }) })     
        },
        selectFilterMenu(filter) {
            filter.active = !filter.active
            this.filter_key += 1
        },
        selectFilter(filter, option) {
            filter.active = !filter.active
            option.active = !option.active
        },
        clearFilters(){
            const thisObj = this
            this.filters.forEach((filter) => {
                this.$nextTick(()=> {
                    thisObj.removeFilter(filter)
                    // filter.active = false
                    // filter.options.forEach((option) => {
                    //     option.active = false
                    // })
                })
            })
            this.filter_option_key += 2
        },
        confirm() {
            console.log('.')
        },
            // Albums
        fetchAlbums(){
            const thisObj = this
            this.$fire.firestore.collection('albums').get()
              .then((snapshot) => { snapshot.forEach((albm) => { thisObj.albums.push(albm.data()) }) })
              .then(()=> { thisObj.fetchTracks() })
        },
            //Track functions:
        fetchTracks(){
            const thisObj = this
            this.$fire.firestore.collection('tracks').get()
              .then((snapshot) => { snapshot.forEach((trk) => { thisObj.tracks.push(trk.data()) }) })
              .then(() => {
                    // I will refactor this. Just shipping out the door for now:
                thisObj.tracks.forEach((track) => { 
                    thisObj.albums.forEach((album) => {
                        if(track.album_id == album.id) { track['album'] = album }
                    })
                })
              })
              .then(() => { thisObj.setupResults() })
        },
        setupResults(){
            const thisObj = this
            if(thisObj.tracks.length){ 
                thisObj.results = thisObj.tracks
                for(let i = 0; i < thisObj.results.length; i++){
                    thisObj.results[i]['index'] = i
                }
            }
        },
        clean_track(track){
            // check top level to see if they are on olivyae.com || localhost (for testing)
            //if not, track.audio_file = stripped version of url ()
            //"https://firebasestorage.googleapis.com/v0/b/olivyae-58b01.appspot.com/o/Oli.Vyae%20-%20The%20Art%20of%20Procrastination%20-%2006%20Celestial%20Cycles.mp3?alt=media&token=48cbe462-48d5-44c0-8ad1-e738a1d536f1"
        },
            // Search Functions:
        doSearch() {
            // console.log('Searching for: ', this.search.query)
            // this.setupResults()
            const thisObj = this, 
                  empty_check = (str) => { return str === null || str.match(/^ *$/) !== null; }

            if(thisObj.search.query !== '') {
                
                thisObj.results = thisObj.results.filter((track) => {
                    let q = thisObj.search.query.toLowerCase()
                    return  track.name.toLowerCase().includes(q) || 
                            track.album.name.toLowerCase().includes(q)
                })
            } else if (empty_check(thisObj.search.query)){
                thisObj.setupResults()
            }
        },
        applyFilterOption(select_option){
            select_option['active'] = true 
            this.filter_option_key += 1
            const thisObj = this
                // Add to list of used filters. Ensure no duplicates:
            if(!thisObj.active_filters.includes(select_option)) { 
                thisObj.active_filters.push(select_option) 

                // loops throught a filter set and returns if matches OPTION
                const check_filter_set = (filter_set, opt) => {
                    let match
                    filter_set.tags.forEach((tag) => {
                        if(tag.name.toLowerCase().includes(opt.name.toLowerCase())) {
                            if(!match) { match = 'match' }
                        }
                    })
                    return match
                }
                // run ^ function on each filter set of track and return if ANY are positive
                const check_match = (track, opt) => {
                    return check_filter_set(track.filters[0], opt) || check_filter_set(track.filters[1], opt) || check_filter_set(track.filters[2], opt)          
                }
                // run filter function with ^ as criteria
                thisObj.results = thisObj.results.filter((track) => {
                return check_match(track, select_option)
                })           
            }
        },
        removeFilter(option){
            option.active = false
            console.log('removing filter', option)
            if(this.active_filters.length !== 1) {
                this.active_filters = this.active_filters.filter((flr) => { return flr.name !== option.name })
                this.active_filters.forEach((opt) => { this.applyFilterOption(opt) })
                this.filter_key += 1
            } else {this.clearFilters()}
        },
        clearFilters(){
            this.active_filters = []
            this.filters.forEach((set)=>{
                set.options.active = false
            })
            this.filter_option_key += 1
            this.setupResults()
        },
            // User actiions
        play(track, index){
            const thisObj = this
                // play new track
            thisObj.selecting = track == thisObj.select_track ? false : true
            this.play_track = false
            if(thisObj.selecting) {               
                thisObj.select_track = track
                thisObj.playing_track = track
                thisObj.play_track = true
                thisObj.pause_track = false
                thisObj.selecting = false
                thisObj.comp_key += 1
            } else {
                thisObj.play_track = true
                thisObj.$refs.music_player.play()
            }
        },
        pause(track) {
            const thisObj = this
            // console.log('pausing', track)
            thisObj.playing_track = false
            thisObj.pause_track = true
            thisObj.play_track = false
            thisObj.$refs.music_player.pause()
        },
        r_paused(val) {
            this.playing_track = val
        },
        r_playing(val) {
            this.playing_track = val
        },
        select_previous(){
            this.select_track = this.results[this.select_track.index - 1] ? this.results[this.select_track.index - 1] : this.select_track
            this.comp_key += 1
            this.playing_track = this.select_track
        },
        select_next(){
            this.select_track = this.results[this.select_track.index + 1] ? this.results[this.select_track.index + 1] : this.select_track
            this.comp_key += 1
            this.playing_track = this.select_track
        }
    }
}
</script>

<style lang="scss" scoped>
    .music-library {
        min-height: 900px;
        
        .ctr-filters {
            width: 18rem;
            height: 50rem;
            overflow: hidden;

            .filter-head {
                background-color: #61cdf775;
                &:hover {background-color: #61cdf7;}
            }
            .filter-option {
                &:hover { background-color: black; }
            }
            .filter-option.active {
                background-color: black; 
            }
        }
        .ctr-search {
            .ctr-input {
                width: 80%;
                
                input {
                    background-color: transparent;
                    border: none;
                    border-bottom: 2px solid white;
                    height: 2rem;
                    color: white;
                    font-size: 2em;
                    padding: .5rem;

                    &:active,
                    &:focus {
                        border: none;
                        outline: none;
                        border-bottom: 2px solid white;
                    }
                }
            }
            .ctr-button {
                button {
                    border: none;
                    color: white;
                    background-color: transparent;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
        .ctr-results {
            height: 700px;
            overflow-y: scroll;
            overflow-x: hidden;




            .track {
                &:hover {
                    background-color: #000000a1;
                    .play-btn { display: block;}
                    .num_play { display: none; }
                }
                .play-btn { display: none; }
                .tag { background-color: #ffffffd4; }
            }
            .playing {
                background-color: #000000a1;
            }
        }

            // Scrollbar
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey; 
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: rgb(71, 71, 71);
            border-radius: 10px;

            &:hover {
                background-color: gray;
            }
        }
    }
</style>