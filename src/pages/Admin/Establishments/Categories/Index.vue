<template>
  <div class="container">
    <RouterLink :to="'/admin/establishments/' + establishmentId + '/categories/create'">Create Category</RouterLink>
    <DataTable
        @click="resolveRouteFromClick($event)"
        :columns="columns"
        :data="categories"
    />
  </div>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import { useCategoriesStore } from '@/stores/Admin/Establishments/Categories/categoriesStore';

DataTable.use(DataTablesCore);

const props = defineProps({
  establishmentId: String
});

const router = useRouter();

onMounted(async () => {
    await getCategories();
});

const columns = [
    { data: 'id', title: 'Actions', render: (id) => `<a href="#" class="link-table-categories" data-category-action="edit" data-category-id="${id}">Edit</a><a class="link-table-categories"  href="#" data-category-action="delete" data-category-id="${id}">Delete</a>` },
    { data: 'id', title: 'ID' },
    { data: 'name', title: 'Name' }
];

const categoriesStore = useCategoriesStore();
let categories = ref([]);

async function getCategories() {
    await categoriesStore.all(props.establishmentId);
    categories.value = categoriesStore.categories.map(category => {
        return {
            id: category.id,
            name: category.name
        };
    });
}

async function resolveRouteFromClick(e) {
    const categoryId = e.target.dataset.categoryId;
    const categoryAction = e.target.dataset.categoryAction;

    if (!categoryId && !categoryAction) {
        return
    }

    e.preventDefault();

    if (categoryAction === 'delete') {
        if (!confirm('Are you sure?')) {
            return;
        }

        const categoryDeleted = await categoriesStore.delete(props.establishmentId, categoryId);
        if (categoryDeleted) {
            await getCategories();
        } else {
            alert("Unable to delete a category");
        }

        return;
    } else if (categoryAction === 'edit') {
        router.push('/admin/establishments/' + props.establishmentId + '/categories/' + categoryId + '/edit');
    }
}
</script>

<style>
@import 'datatables.net-dt';
</style>
