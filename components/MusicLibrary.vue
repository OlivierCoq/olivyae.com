<template>
  <div class="container-fluid music-library mt-3">
      <div class="row">
          <div class="col-sm-12 col-md-3">
              <div class="ctr-filters">
                  <h3 class="text-uppercase lato">Search By</h3>
                  <h5 class="mb-3 lato" @click="clearFilters">Clear Filters</h5>
                  <ul class="filter">
                      <!-- <li v-for="(filter, i) in filters" :key="i" class="p-3 my-1" :class="filter.active ? 'active' : '' " @click="selectFilterMenu(filter)">
                          <span class="lato">{{filter.name}}</span>
                          <ul class="filter-options mt-3" v-if="filter.active">
                              <li v-for="(option, a) in filter.options" :key="a" @click="selectFilter(filter, option)" class="my-3">
                                 <span v-html="option.Name ? option.Name : option.name" class="p-2 lato" :class="option.active ? 'active' : '' "></span>
                              </li>
                          </ul>
                      </li> -->
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
              <div class="row">
                  <div class="ctr-results"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'MusicLibrary',   
    async asyncData({ }) {
        const filters = this.$fire.firestore.collection('filters').doc('name')
        return { filters }
    },
    data() {
        return {
            // filters: [
            //     {   name: 'Instruments', 
            //         key: 'instruments', 
            //         active: false,
            //         options: false
            //     },
            //     {   name: 'Albums', 
            //         key: 'albums', 
            //         active: false,
            //         options: false
            //     }, 
            //     {   name: 'Genres', 
            //         key: 'genres', 
            //         active: false,
            //         options: false
            //     },
            //     {   name: 'Mood', 
            //         key: 'moods', 
            //         active: false,
            //         options: false 
            //     },
            // ],
            filterObj: {
                instruments: false,
                albums: false, 
                moods: false,
                genres: false
            },
            tracks: [],
            search: {
                query: ''
            }
        }
    },
    computed: {

    },
    async fetch() {
        // this.tracks = await this.$axios.$get('http://localhost:1337/tracks') // Will be replaced by actual URL
    },
    created() {
        // DOES NOT WORK FOR SOME REASON:
        // const thisObj = this
        // thisObj.filters.forEach((filter) => {
        //     thisObj.$axios.$get(`http://localhost:1337/${filter.key}`)
        //         .then((data) => {
        //             console.log('wtffff', data)
        //             filter.options = data
        //         })
        // })

        this.setupFilters()
    },
    computed: {
        ...mapGetters(['filters']),
    },
    methods: {
            // stupid
        setupFilters() {
            const thisObj = this
            // Object.keys(this.filterObj).forEach((key) => {
            //     this.$axios.$get(`http://localhost:1337/${key}`)
            //     .then((data) => {
            //         thisObj.filters.forEach((filter) => {
            //             if(filter.key === key) { filter.options = data }
            //         })
            //     })
            // })
        },
        selectFilterMenu(filter) {
            filter.active = !filter.active
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
        doSearch() {
            console.log('Searching for: ', this.search.query)
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

            .filter { list-style-type: none; padding: 0; height: 400px;
                li {
                    width: 100%;
                    background-color: #61cdf775;
                    color: white;
                    font-size: 1.5em;
                    border-radius: 10px;

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
    }
</style>