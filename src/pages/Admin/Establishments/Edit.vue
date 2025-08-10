<template>
    <div class="container">
        <RouterLink :to="`/admin/establishments/${establishmentId}/users`">Users</RouterLink>
        <form v-if="establishment" @submit.prevent="update">
            <label for="title">Name:</label>
            <input type="text" name="title" v-model="establishment.name" class="form-control">

            <label for="title">Description:</label>
            <textarea name="description" v-model="establishment.description" class="form-control">
            </textarea>

            <button type="submit" class="button-submit-form-default">Update</button>
        </form>
    </div>
  </template>

<script setup>
import { onMounted, ref } from 'vue';
import { useEstablishmentsStore } from '@/stores/Admin/Establishments/establishmentStore.js';

const props = defineProps({
    establishmentId : String
});

const establishmentStore = useEstablishmentsStore();

const establishment = ref(null);

onMounted(async () => {
    establishment.value = await establishmentStore.find(props.establishmentId);
})

async function update() {
    if (!confirm('Are you sure?')) {
        return;
    }

    let establishmentUpdated = await establishmentStore.update(props.establishmentId, establishment.value);

    if (!establishmentUpdated) {
        alert('Unable to update Establishment!');
        return;
    }

    alert('Establishment updated successfully!');
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
