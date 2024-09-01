<template>
    <div class="category" :id="'category_' + category.id">
        <h2>{{ category.name }}</h2>
        <MenuItem v-for="item in category.items" :item="item" :establishment-id="category.establishment_id"  :key="item.id"/>
    </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue';

defineProps({
    category: Object
});
</script>

<style>

</style>