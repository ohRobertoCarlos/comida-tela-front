<template>
    <div class="container">
      <RouterLink :to="`/admin/establishments/${establishmentId}/users/create`">Create</RouterLink>
      <DataTable
          @click="resolveRouteFromClick($event)"
          :columns="columns"
          :data="users"
      />
    </div>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import { useUsersStore } from '@/stores/Admin/Establishments/Users/usersStore';

DataTable.use(DataTablesCore);

const props = defineProps({
    establishmentId : String
});

const router = useRouter();
const usersStore = useUsersStore();
let users = ref([]);

const columns = [
    { data: 'id', title: 'Actions', render: (id) => `<a href="#" data-user-id="${id}">Edit</a>` },
    { data: 'id', title: 'ID' },
    { data: 'name', title: 'Name' },
    { data: 'email', title: 'E-mail' }
];

onMounted(async () => {
    let allUsers = await usersStore.all(props.establishmentId);

    users.value = allUsers.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    });
});

function resolveRouteFromClick(e) {
    let userId = e.target.dataset.userId;
    if (!userId) {
        return;
    }

    e.preventDefault();

    router.push(`/admin/establishments/${props.establishmentId}/users/${userId}/edit`);
}
</script>

<style>
@import 'datatables.net-dt';
</style>
