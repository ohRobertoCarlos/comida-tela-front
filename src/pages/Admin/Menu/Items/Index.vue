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
    await getItems();
});

const columns = [
    { data: 'id', title: 'Actions', render: (id) => `<a href="#" class="link-table-items" data-item-action="edit" data-item-id="${id}">Edit</a><a class="link-table-items"  href="#" data-item-action="delete" data-item-id="${id}">Delete</a>` },
    { data: 'id', title: 'ID' },
    { data: 'title', title: 'Title' }
];


const itemsStore = useItemsStore();
let items = ref([]);

async function getItems() {
    await itemsStore.all(props.establishmentId);
    items.value = itemsStore.items.map(item => {
        return {
            id: item.id,
            title: item.title
        };
    });
}

async function resolveRouteFromClick(e) {
    const itemId = e.target.dataset.itemId;
    const itemAction = e.target.dataset.itemAction;

    if (!itemId && !itemAction) {
        return
    }

    e.preventDefault();

    if (itemAction === 'delete') {
        if (!confirm('Tem certeza?')) {
            return;
        }

        const itemDeleted = await itemsStore.delete(props.establishmentId, itemId);
        if (itemDeleted) {
            await getItems();
        }

        return;
    } else if (itemAction === 'edit') {
        router.push('/admin/establishments/' + props.establishmentId + '/items/' + itemId + '/edit');
    }
}
</script>

<style>
@import 'datatables.net-dt';
</style>