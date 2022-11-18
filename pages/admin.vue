<template>
    <div id="admin"></div>
</template>
<script>
    export default {
        name: 'Admin',
        middleware: 'auth',
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
        
    }
</style>