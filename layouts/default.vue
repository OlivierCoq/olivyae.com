<template>
  <div class="min-h-[100vh] w-full relative">
    <Nav />
    <slot />
    <Footer />
  </div>
</template>
<script setup>

// Importing components
import Nav from '~/components/template/Nav.vue'
import Footer from '~/components/template/Footer.vue'

</script>