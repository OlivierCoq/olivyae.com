<template>
    <div id="login" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-4 offset-md-4">
                    <div class="ctr-main w-100 h-100 d-flex flex-column justify-content-center align-items-center p-3 p-md-4">
                        <h1 class="lato mb-3">login</h1>

                        <div v-if="manual">
                            <div class="mb-3 w-100">
                            <input type="email" class="form-control" v-model="email">
                            </div>
                            <div class="mb-3 w-100">
                                <input type="passworrd" class="form-control" v-model="password">
                            </div>
                            <div class="mb-3 w-100">
                                <button class="btn btn-primary w-100" @click.prevent="login">login</button>
                            </div>
                        </div>
                        <div v-else class="w-100">
                            <div id="firebase_auth" class="w-100"></div>
                        </div>
                        
                        <div class="my-3">
                            <p class="lato">let's make music today.</p>
                        </div>
                        <div v-if="error" class="alert alert-danger w-100">
                            <p class="lato">Error:</p>
                            <p>{{error}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
                error: false,
                manual: false
            }
        },
        created() {},
        mounted() {
            const firebaseui = require('firebaseui')
            require('firebaseui/dist/firebaseui.css')

            const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.$fire.auth)
            const config = {
                signInOptions: [ 
                    // this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
                    this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID
                ],
                signInSuccessUrl: '/admin',
                callbacks: {
                    ssignInSuccesssWithAuthResult() {
                        console.log('you are in!')
                        window.location = '/admin'
                    }
                }
            }
            ui.start('#firebase_auth', config)
        },
        methods: {
            login() {}
        }
    }
</script>
<style lang="scss">
    #login {
        min-height: 100vh;

        .ctr-main {
            min-height: 100vh;
        }
    }
</style>