<template>
    <div class="menu-item">
        <img :src="item.cover_image_location_url" :alt="item.title">
        <div class="menu-item-details">
            <h3>{{ item.title }}</h3>
            <div v-if="item.max_price === null" class="price">R$ {{ item.min_price }}</div>
            <div v-else class="price">R$ {{ item.min_price }} - R$ {{ item.max_price }}</div>
            <p>{{ item.description }}</p>
            <RouterLink :to="'/' + establishmentId + '/items/' + item.id" class="back-button">
                Ver mais detalhes
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    item: Object,
    establishmentId: String
});
</script>

<style>

</style>