<template>
    <nav class="categories-nav">
        <template v-for="category in categories" :key="category.id">
            <a v-if="category.items && category.items.length > 0" :href="'#category_' + category.id">{{ category.name }}</a>
        </template>
    </nav>
</template>

<script setup>
const props = defineProps({
    categories: Array
});
</script>

<style scoped>

</style>
