<template>
  <div class="container">
    <form @submit.prevent="create">
        <label for="title">Title:</label>
        <input type="text" name="title" v-model="data.title" class="form-control">

        <template v-if="hasRangePrice">
            <label for="title">Min Price:</label>
            <input type="text" name="min_price" v-model="data.min_price" class="form-control">

            <label for="title">Max Price:</label>
            <input type="text" name="max_price" v-model="data.max_price" class="form-control">
        </template>

        <template v-else>
            <label for="title">Price:</label>
            <input type="text" name="min_price" v-model="data.min_price" class="form-control">
        </template>

        <div>
            <label for="">
            <input type="checkbox" name="has_range_price" v-model="hasRangePrice">Has Range Price
        </label>
        </div>

        <label for="title">Portions:</label>
        <input type="number" min="1" name="portions" v-model="data.portions" class="form-control">

        <label for="title">Cover image:</label>
        <input type="file" accept="image/*" @change="handleFile" ref="coverImage" name="cover_image" class="form-control">

        <label for="title">Description:</label>
        <textarea name="description" v-model="data.description" class="form-control">
        </textarea>

        <button type="submit" class="button-submit-form-default">Create</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, useTemplateRef } from 'vue';
import { useItemsStore } from '@/stores/Admin/Establishments/itemsStore';

const props = defineProps({
    establishmentId: String
});

const coverImage = useTemplateRef('coverImage');

const itemsStore = useItemsStore();

const hasRangePrice = ref(false);

const data = reactive({
    title : '',
    description : '',
    min_price : 0,
    max_price : 0,
    portions : 1,
    cover_image : null,
    establishment_id : props.establishmentId,
    currency : 'BRL',
    categories : []
});

async function create() {
    let item = await itemsStore.create(data);

    if (item) {
        alert('Item created successfully!');
        resetForm();
    }
}

function handleFile(event) {
    data.cover_image = event.target.files[0] ?? null;
}

function resetForm() {
    data.title = '';
    data.description = '';
    data.min_price = 0;
    data.max_price = 0;
    data.portions = 1;
    data.cover_image = null;
    data.establishment_id = props.establishmentId;
    data.currency = 'BRL';
    data.categories = [];

    coverImage.value.value = '';
}
</script>

<style scoped>
.form-control {
    width: 100%;
    padding: 8px;
}

input[type="text"], input[type="number"], input[type="file"], textarea {
    width: 100%;
    padding: 15px;
    font-size: 1.1em;
    border-radius: 8px;
    border: 1px solid #ced4da;
    margin-bottom: 20px;
    box-sizing: border-box;
}
</style>
