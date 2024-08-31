<template>
  <div>
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue';
</script>

<style>
  @import '@/assets/main.css';
</style>
