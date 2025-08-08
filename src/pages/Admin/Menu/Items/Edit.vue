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
        <input type="file" accept="image/*" @change="handleFile" name="cover_image" class="form-control">

        <div v-if="categories.length > 0" class="section-categories-options">
            <label :for="'category_' + category.id" v-for="category in categories" :key="category.id">
                <input :value="category.id" :id="'category_' + category.id" v-model="categoriesSelected" type="checkbox" name="categories[]">{{ category.name }}
            </label>
        </div>

        <label for="title">Description:</label>
        <textarea name="description" v-model="item.description" class="form-control">
        </textarea>

        <button type="submit" class="button-submit-form-default">Update</button>
    </form>
</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useItemsStore } from '@/stores/Admin/Establishments/itemsStore';
import { useCategoriesStore } from '@/stores/Admin/Establishments/Categories/categoriesStore';
import { uploadPublic } from '@/Utils/UploadFile.js';

const props = defineProps({
    establishmentId: String,
    itemId : String
});

const itemsStore = useItemsStore();
const categoriesStore = useCategoriesStore();

const hasRangePrice = ref(false);
const item = ref(null);
const file = ref(null);
const categories = ref([]);
const categoriesSelected = ref([]);

onMounted(async () => {
    item.value = await itemsStore.find(props.establishmentId, props.itemId);
    await categoriesStore.all(props.establishmentId);
    categories.value = categoriesStore.categories;

    categoriesSelected.value = item.value.categories.map(category => category.id);

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
    if (!confirm('Are you sure you want to update the item?')) {
        return;
    }

    let publicFileUrl = '';
    if (file.value !== null) {
        publicFileUrl = await uploadPublic(file.value);
    }

    if (publicFileUrl) {
        item.value.cover_image_url = publicFileUrl;
    }

    item.value.categories = categoriesSelected.value;

    let itemUpdated = await itemsStore.update(props.establishmentId, item.value);

    if (itemUpdated) {
        alert('Item updated successfully!');
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

.section-categories-options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: flex-start;
    margin: 20px 0;
}
</style>
