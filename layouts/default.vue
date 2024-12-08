<template>
  <div class="min-h-[100vh] w-full relative z-0" :class="settings.dark ? 'dark' : ''">
    <Nav />
    <slot />
    <Footer />
  </div>
</template>
<script setup>

// Importing components
import Nav from '~/components/template/Nav.vue'
import Footer from '~/components/template/Footer.vue'

  // Stores
import { settingsStore } from '~/stores/settings.js'
const settings = settingsStore()

</script>