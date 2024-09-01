<template>
    <nav>
        <a v-for="category in categories" :href="'#category_' + category.id" :key="category.id">{{ category.name }}</a>
    </nav>
</template>

<script setup>
const props = defineProps({
    categories: Array
});
</script>

<style>

</style>