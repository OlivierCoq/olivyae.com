import { vuexfireMutations, firestoreAction } from 'vuexfire'

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
    ...vuexfireMutations,
    SET_FILTERS(state, filters) {
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


}
export const getters = {
    filters(state) {
      return state.filters
    },
  }