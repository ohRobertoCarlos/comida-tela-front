<template>
  <div>
    <header>
        <h1>Detalhes do Item</h1>
    </header>

    <div v-if="item" class="container">
        <Item :item="item" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Item from '../components/Item.vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';
const route = useRoute();
const router = useRouter();

const props = defineProps({
  id: Object,
  establishmentId: String
});
const item = ref(null);

async function getItem() {
    try {
        let data = await fetch(`${API_BASE_URL}/establishments/${props.establishmentId}/menus/items/${props.id}`, {
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
    const data = await getItem();
    if(!data) {
      router.push({
            name: 'NotFound',
            params: { pathMatch: route.path.substring(1).split('/') },
            query: route.query,
            hash: route.hash,
        });
        return;
    }

    item.value = data;
});
</script>

<style scoped>
.container {
    background-color: transparent;
    box-shadow: none;
}
</style>