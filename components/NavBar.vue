<template>
    <div class="container-fluid bg-light">
        <div class="row">
            <div class="col-6"></div>
            <div class="col-6">
                <div class="w-100 d-flex flex-row justify-content-end align-items-center p-2">
                    <p class="fw-bold lato m-0">Logged in: <span>{{currentUser.displayName}}</span></p>
                    <button class="btn btn-sm btn-info mx-2 px-3 text-light" @click="logOut">logout <i class="fa fa-arrow-right text-light"></i></button>
                </div>
            </div>
        </div><hr class="m-0"/>
    </div>
</template> 
<script>
    export default {
        name: 'NavBar',
        data() {
            return {}
        },
        computed: {
            currentUser() {
                return this.$store.state.user
            }
        },
        created(){},
        methods: {
            logOut() {
                this.$fire.auth.signOut()
                window.location = '/login'
            }
        }
    }
</script>
<style lang="scss">
</style>