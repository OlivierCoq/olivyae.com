import axios from 'axios'

export const state = () => ({
    user: false,
    filters: {
        instruments: false,
        albums: false, 
        moods: false,
        genres: false
    }
})


export const mutations = {
    set(state, filters) {
        state.filters = filters
    },
    ON_AUTH_STATE_CHANGED_MUTATION(state, {authUser, claims}){
        if(authUser) {
            const { uid, email, displayName } = authUser
            state.user = { uid, email, displayName }
        } else { state.user = false }
    }
}

export const actions = {
    nuxtServerInit() {},

    async loadFilters({ commit }) { 
        try {
            const filterObj = this.state?.filters

            Object.keys(filterObj).forEach((key) => {
                axios.get(`http://localhost:1337/${key}`)
                .then((data) => {
                    // console.log('this sum bull', data)
                    filterObj[key] = data.data
                })
            })
            commit('set', filterObj)
            return filterObj
        } catch (error) {
            console.log('error in store', error)
        }
    }
}