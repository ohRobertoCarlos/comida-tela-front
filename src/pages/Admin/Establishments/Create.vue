<template>
    <div class="container">
      <form @submit.prevent="create">
          <label for="title">Name:</label>
          <input type="text" name="title" v-model="data.name" class="form-control">

          <label for="title">Description:</label>
          <textarea name="description" v-model="data.description" class="form-control">
          </textarea>

          <button type="submit" class="button-submit-form-default">Create</button>
      </form>
    </div>
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { useEstablishmentsStore } from '@/stores/Admin/Establishments/establishmentStore.js';

  const establishmentStore = useEstablishmentsStore();

  const data = reactive({
      name : '',
      description : ''
  });

  async function create() {
      let establishment = await establishmentStore.create(data);

      if (establishment) {
          alert('Establishment created successfully!');
          resetForm();
      }
  }

  function resetForm() {
      data.name = '';
      data.description = '';
  }
  </script>

  <style scoped>
  .form-control {
      width: 100%;
      padding: 8px;
  }

  input, textarea {
      width: 100%;
      padding: 15px;
      font-size: 1.1em;
      border-radius: 8px;
      border: 1px solid #ced4da;
      margin-bottom: 20px;
      box-sizing: border-box;
  }
  </style>
