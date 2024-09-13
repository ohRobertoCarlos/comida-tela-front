<template>
    <div v-if="establishment">
        <Header :establishment="establishment" />
        <Categories :categories="establishment.categories" />

        <div v-if="itemsWithoutCategory.length > 0" class="container">
            <MenuItem v-for="item in itemsWithoutCategory" :item="item" :establishment-id="establishment.id" :key="item.id"/>
        </div>

        <div v-if="establishment.categories && establishment.categories.length > 0" class="container">
            <Category v-for="category in establishment.categories" :category="category" :key="category.id"/>
        </div>

        <div v-if="noItemsMenu" class="no-items">
            <p>Não há itens no menu deste estabelecimento</p>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

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

const noItemsMenu = computed(() => {
    return establishment.value?.categories.length === 0 && itemsWithoutCategory.value.length === 0;
});

async function getEstablishment() {
    try {
        let data = await fetch(`${API_BASE_URL}/establishments/menuCode/${route.params.menuCode}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
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

<style scoped>
.no-items {
    text-align: center;
    padding: 20px;
    color: #6c757d;
}
</style>