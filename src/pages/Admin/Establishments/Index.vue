<template>
    <div class="container">
      <RouterLink :to="'/admin/establishments/create'">Criar</RouterLink>
      <DataTable
          @click="resolveRouteFromClick($event)"
          :columns="columns"
          :data="establishments"
      />
    </div>
  </template>
  
  <script setup>
  import { useRouter, RouterLink } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { useEstablishmentsStore } from '@/stores/Admin/Establishments/establishmentStore.js';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net-dt';
   
  DataTable.use(DataTablesCore);
  
  const router = useRouter();
  const establishmentsStore = useEstablishmentsStore();
  let establishments = ref([]);
   
  const columns = [
      { data: 'id', title: 'Actions', render: (id) => `<a href="#" data-establishment-id="${id}">Edit</a>` },
      { data: 'id', title: 'ID' },
      { data: 'name', title: 'Name' }
  ];

  onMounted(async () => {
      await establishmentsStore.all();
      establishments.value = establishmentsStore.establishments.map(establishment => {
          return {
              id: establishment.id,
              name: establishment.name
          };
      });
  });
  
  function resolveRouteFromClick(e) {
    let establishmentId = e.target.dataset.establishmentId;
    if (!establishmentId) {
        return;
    }
    e.preventDefault();
    router.push('/admin/establishments/' + establishmentId + '/edit');
  }
  </script>
  
  <style>
  @import 'datatables.net-dt';
  </style>