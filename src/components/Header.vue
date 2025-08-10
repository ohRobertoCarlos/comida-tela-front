<template>
  <div style="position: relative;">
    <header>
        <img :src="establishment.profile.image_cover_profile_location_url" alt="Establishment Logo" class="restaurant-logo">
        <h1>{{ establishment.name }}</h1>
    </header>

    <div v-if="establishment.profile" class="social-icons">
        <RouterLink v-if="router.currentRoute.value.path !== `/${establishment.menu_code}/profile`" :to="`/${establishment.menu_code}/profile`" title="Profile"><i class="fa-solid fa-house"></i></RouterLink>
        <a v-if="establishment.profile.facebook_link" :href="establishment.profile.facebook_link" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>
        <a v-if="establishment.profile.instagram_link" :href="establishment.profile.instagram_link" title="Instagram"><i class="fab fa-instagram"></i></a>
        <a v-if="establishment.profile.whatsapp" href="https://whatsapp.com" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  establishment: Object
});
</script>

<style>

</style>
