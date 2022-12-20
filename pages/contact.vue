<template>
  <div id="contact_me">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="w-100 mt-5 pt-5 d-flex flex-column align-items-start justify-content-start">
                    <a href="/">
                        <img src="~/assets/img/logo-white-1024x308.png" alt="Logo" class="w-50" />
                    </a>
                    <p class="text-light lato ms-5 fs-4 text-uppercase">Talk to me!</p>
                </div>
            </div>
        </div>
        <div class="w-100">
            <hr class="text-light"/>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="my-4 ">
                    <form>
                        <div class="container">
                            <div class="row">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label text-light lato text-uppercase">Name</label>
                                        <input class="form-control" type="text" v-model="name" placeholder="Joanna Smith" required @keydown="error = false">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label text-light lato text-uppercase">Email</label>
                                        <input class="form-control" type="email" v-model="postObj.from" placeholder="joanna@example.com" required @keydown="error = false">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label class="form-label text-light lato text-uppercase">Subject</label>
                                        <input class="form-control" type="text" v-model="postObj.subject" placeholder="Your music possesed my cat!" required @keydown="error = false">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label class="form-label text-light lato text-uppercase">Message:</label>
                                        <textarea name="" id="" cols="30" rows="10" class="form-control ta" v-model="postObj.text" required @keydown="error = false"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="mb-3">
                                        <button class="btn btn-md btn-primary my-3 w-100" @click.prevent="submit">
                                            reach out!
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div v-if="error" class="alert alert-danger my-3">
                                        {{ error }}
                                    </div>
                                    <div v-if="success" class="alert alert-success my-3">
                                        {{ success }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'ContactPage',
        data(){
            return {
                postObj: {
                    from: '',
                    subject: '',
                    text: ''
                },
                name: '',
                error: false,
                success: false
            }
        },
        methods: {
            submit(){
                let all_good, vals = Object.values(this.postObj)
                vals.forEach((val) => {
                    if(!val.length) { all_good = false; this.error = `Oops! Plese check all fields; there might be something missing here.` }
                    else {
                        all_good = true
                        this.error = false 
                        this.success = `Sent. Thanks for reaching out. I will get back to you as soon as possible.`
                    }
                })
                if((all_good !== undefined) && (!this.error)) {
                    this.$mail.send(this.postObj)
                }
            }
        }

    }
</script>

<style lang="scss">
    #contact_me {
        min-height: 100vh;
        background-color: #00000082;

        form {
            .form-control {
                background-color: #0000008a !important;
                color: white !important;
                border: none;  
                border-bottom: 2px solid white;
            }
            .ta {
                border: 2px solid white !important;
            }

            ::-webkit-input-placeholder { /* Edge */
                color: lightgrey;
                text-transform: uppercase;
            }

            :-ms-input-placeholder { /* Internet Explorer */
                color: lightgrey;
                text-transform: uppercase;
            }

            ::placeholder {
                color: lightgrey;
                text-transform: uppercase;
            }
        }
    }
</style>