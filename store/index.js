import bootstrap from 'bootstrap'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
    user: false
})

export const mutations = {
    ...vuexfireMutations,
    ON_AUTH_STATE_CHANGED_MUTATION(state, {authUser, claims}){
        if(authUser) {
            const { uid, email, displayName } = authUser
            state.user = { uid, email, displayName }
        } else { state.user = false }
    }
}
