<template>
    <div>
        <Header />
        <Categories />

        <div class="container">
            <Category />
        </div>
    </div>
</template>

<script setup>
 import Header from '../components/Header.vue';
 import Categories from '../components/Categories.vue';
 import Category from '../components/Category.vue';
</script>

<style>

</style>