<template>
<div v-if="item" class="container">
    <form @submit.prevent="update">
        <label for="title">Title:</label>
        <input type="text" name="title" v-model="item.title" class="form-control">

        <template v-if="hasRangePrice">
            <label for="title">Min Price:</label>
            <input type="number" name="min_price" v-model="item.min_price" class="form-control">

            <label for="title">Max Price:</label>
            <input type="number" name="max_price" v-model="item.max_price" class="form-control">
        </template>

        <template v-else>
            <label for="title">Price:</label>
            <input type="number" name="min_price" v-model="item.min_price" class="form-control">
        </template>

        <div>
            <label for="">
            <input type="checkbox" name="has_range_price" v-model="hasRangePrice">Has Range Price
        </label>
        </div>

        <label for="title">Portions:</label>
        <input type="number" min="1" name="portions" v-model="item.portions" class="form-control">

        <label for="title">Cover image:</label>
        <input type="file" accept="image/*" @change="handleFile" ref="coverImage" name="cover_image" class="form-control">

        <label for="title">Description:</label>
        <textarea name="description" v-model="item.description" class="form-control">
        </textarea>

        <button type="submit">Atualizar</button>
    </form>
</div>
</template>

<script setup>
import { onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { useItemsStore } from '@/stores/Admin/Establishments/itemsStore';
import { useAuthStore } from '@/stores/authStore';
import { uploadPublic } from '@/Utils/UploadFile.js';

const props = defineProps({
    establishmentId: String,
    itemId : String
});

const itemsStore = useItemsStore();
const authStore = useAuthStore();

const coverImage = useTemplateRef('coverImage');
const hasRangePrice = ref(false);
const item = ref(null);
const file = ref(null);

onMounted(async () => {
    item.value = await itemsStore.find(props.establishmentId, props.itemId);

    if (item.value.min_price && item.value.max_price && item.value.max_price !== '0') {
        hasRangePrice.value = true;
    }
});

watch(hasRangePrice, (newHasRangePrice, oldHasRangePrice) => {
    if (newHasRangePrice === false) {
        item.value.max_price = null;
    }
});

async function update() {
    if (!confirm('Deseja realmente atualizar o item?')) {
        return;
    }

    let publicFileUrl = '';
    if (file.value !== null) {
        publicFileUrl = await uploadPublic(file.value);
    }

    if (publicFileUrl) {
        item.value.cover_image_url = publicFileUrl;
    }

    let itemUpdated = await itemsStore.update(props.establishmentId, item.value);

    if (itemUpdated) {
        alert('Item atualizado com sucesso!');
        item.value = await itemsStore.find(props.establishmentId, props.itemId);
    }
}

function handleFile(event) {
    file.value = event.target.files[0] ?? null;
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
