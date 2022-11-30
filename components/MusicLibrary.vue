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
              <div class="row">
                  <div class="ctr-results"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    name: 'MusicLibrary',   
    data() {
        return {
            filters: [],
            tracks: [],
            search: {
                query: ''
            },
            queryObj: ''
        }
    },
    created() {
        this.setupFilters()
    },
    methods: {
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
    }
</style>