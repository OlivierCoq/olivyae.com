<template>
  <div class="container-fluid music-library mt-3">
      <div class="row">
          <div class="col-sm-12 col-md-3">
              <div class="ctr-filters">
                  <h3 class="text-uppercase lato">Search By</h3>
                  <h5 class="mb-3 lato" @click="clearFilters">Clear Filters</h5>
                  <ul v-if="filters.length > 1" class="filter">
                      <li v-for="(filter, a) in filters" :key="a" class="p-3 my-1" :class="filter.active ? 'active' : '' " @click="selectFilterMenu(filter)">
                          <span class="lato">{{filter.name}}</span>
                          <ul v-show="filter.active == true" :ref="'filter_options-' + filter.name"  class="filter-options mt-3">
                              <li v-for="(option, b) in filter.options" :key="b" class="my-3" @click="selectFilter(filter, option)" >
                                 <span v-html="option.Name ? option.Name : option.name" class="p-2 lato" :class="option.active ? 'active' : '' "></span>
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
                <div v-for="track, c in results" :key="c" class="row p-2 track">
                    <div class="col-1">
                        <h5 class="text-light hoverable num_play mt-2 mb-1">{{c + 1}}</h5>
                        <i v-if="playing_track == track" class="fa fa-pause play-btn text-light mt-2 mb-1" @click="pause(track)"></i>
                        <i v-else class="fa fa-play play-btn text-light mt-2 mb-1" @click="select(track)"></i>
                    </div>
                    <div class="col-4">
                        <h5 class="text-light fw-light mt-1">{{ track.name }}</h5>
                    </div>
                    <div class="col-3">
                        <h5 v-if="track.album" class="text-light mt-1">{{track.album.name}}</h5>
                    </div>
                    <div class="col-2 overflow-hidden">
                        <span v-for="item, d in track.filters[1].tags" :key="d" class="text-dark tag rounded px-2 py-1 m-1">{{item.name}} </span>
                    </div>
                    <div class="col-2">
                        <span v-for="item, e in track.filters[2].tags" :key="e" class="text-dark tag rounded px-2 py-1 m-1">{{item.name}} </span>
                    </div>
                </div>
              </div>

          </div>
      </div>
      <div class="row">
        <music-player v-if="select_track" :track="select_track" :pause_track="pause_track" :selecting="selecting" />
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
            search: {
                query: ''
            },
            queryObj: '',
            playing_track: false,
            pause_track: false,
            select_track: false,
            selecting: false
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
            let main_menu = this.$refs[`filter_options-${filter.name}`][0]
            if(filter.active) {
                main_menu.style.display = 'block'
            } else {
                main_menu.style.display = 'none'
            }
        },
        selectFilter(filter, option) {
            filter.active = !filter.active
            option.active = !option.active
        },
        clearFilters(){
            this.filters.forEach((filter) => {
                filter.active = false
                filter.options.forEach((option) => {
                    option.active = false
                })
            })
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
            }
        },
            // Search Functions:
        doSearch() {
            // console.log('Searching for: ', this.search.query)
        },
            // User actiions
        select(track) {
            const thisObj = this
            thisObj.selecting = true
            thisObj.$nextTick(() => {
                thisObj.selecting = false
                thisObj.select_track = track
                thisObj.playing_track = track
                thisObj.pause_track = false
            })
        },
        pause(track) {
            const thisObj = this
            thisObj.playing_track = false
            thisObj.pause_track = true
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
           

            h3, h4, h5 {
                color: white;
            }

            h5 {
                &:hover {cursor: pointer;}
            }

            .filter { 
                list-style-type: none; 
                padding: 0; height: 400px;
                transition-delay: 0.8s;
                transition: 0.8s ease;
                transition-timing-function: ease;

                li {
                    width: 100%;
                    background-color: #61cdf775;
                    color: white;
                    font-size: 1.5em;
                    border-radius: 10px;

                    transition-delay: 0.8s;
                    transition: 0.8s ease;
                    transition-timing-function: ease;

                    &:hover {
                        cursor: pointer;
                        background-color: #61cdf7;
                    }
                }
                .active {
                    background-color: #61cdf7;
                }

                .filter-options {
                    list-style-type: none;
                    li {
                        font-size: .7em;
                        transition-delay: 0.5s;
                        transition: 0.8s ease;
                        transition-timing-function: ease;
                    }
                    .active {
                        background-color: #4187a2;
                        border-radius: 10px;
                    }
                }
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
            .track {
                &:hover {
                    background-color: #000000a1;
                    .play-btn { display: block;}
                    .num_play { display: none; }
                }
                .play-btn { display: none; }
                .tag { background-color: #ffffffd4; }
            }
        }
    }
</style>