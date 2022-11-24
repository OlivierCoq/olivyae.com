<template>
    <div id="admin" class="bg-light"></div>
</template>
<script>
    export default {
        name: 'Admin',
        middleware: 'auth',
        layout: 'inner_page',
        data() {
            return {}
        },
        computed: {
            currentUser() {
                return this.$store.state.user
            }
        },
        created() {},
        methods: {}
    }
</script>
<style lang="scss">
    #admin {
        min-height: 100vh;
    }
</style>