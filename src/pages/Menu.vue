<template>
    <div v-if="establishment">
        <Header :establishment="establishment" />
        <Categories :categories="establishment.categories" />

        <div v-if="itemsWithoutCategory.length > 0" class="container">
            <MenuItem v-for="item in itemsWithoutCategory" :item="item" :establishment-id="establishment.id" :key="item.id"/>
        </div>

        <div class="container">
            <Category v-for="category in establishment.categories" :category="category" :key="category.id"/>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

import Header from '../components/Header.vue';
import Categories from '../components/Categories.vue';
import Category from '../components/Category.vue';
import MenuItem from '@/components/MenuItem.vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';
const route = useRoute();
const router = useRouter();
const establishment = ref(null);
const itemsWithoutCategory = ref([]);

if (!route.params.menuCode) {
    router.push({
        name: 'NotFound',
        params: { pathMatch: route.path.substring(1).split('/') },
        query: route.query,
        hash: route.hash,
    });
}

async function getEstablishment() {
    try {
        let data = await fetch(`${API_BASE_URL}/establishments/menuCode/${route.params.menuCode}`)
            .then(response => response.json())
            .then(json => json.data)
            .catch(error => null);

        return data;
    } catch (error) {
        return null;
    }
}

onMounted(async () => {
    const establishmentData = await getEstablishment();

    if (!establishmentData) {
        router.push({
            name: 'NotFound',
            params: { pathMatch: route.path.substring(1).split('/') },
            query: route.query,
            hash: route.hash,
        });
        return;
    }

    establishment.value = establishmentData;

    itemsWithoutCategory.value = establishmentData?.menu?.items_without_category;
});

</script>

<style>

</style>