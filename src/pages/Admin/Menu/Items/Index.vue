<template>
  <div class="container">
    <RouterLink :to="'/admin/establishments/' + establishmentId + '/items/create'">Criar Item</RouterLink>
    <DataTable
        @click="resolveRouteFromClick($event)"
        :columns="columns"
        :data="items"
    />
  </div>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useItemsStore } from '@/stores/Admin/Establishments/itemsStore.js';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
 
DataTable.use(DataTablesCore);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const props = defineProps({
  establishmentId: String
});

const router = useRouter();

onMounted(async () => {
    await itemsStore.all(props.establishmentId);
    items.value = itemsStore.items.map(item => {
        return {
            id: item.id,
            title: item.title
        };
    });
});
 
const columns = [
    { data: 'id', title: 'Actions', render: (id) => `<a href="#" data-item-id="${id}">Edit</a>` },
    { data: 'id', title: 'ID' },
    { data: 'title', title: 'Title' }
];


const itemsStore = useItemsStore();
let items = ref([]);

function resolveRouteFromClick(e) {
  const itemId = e.target.dataset.itemId;
  if (!itemId) {
    return
  }
  e.preventDefault();
  router.push('/admin/establishments/' + props.establishmentId + '/items/' + itemId + '/edit');
}
</script>

<style>
@import 'datatables.net-dt';
</style>