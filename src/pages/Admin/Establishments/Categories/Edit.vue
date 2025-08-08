<template>
    <div class="container">
        <form v-if="category" @submit.prevent="update">
            <label for="title">Name:</label>
            <input v-model="category.name" name="name" type="text" class="form-control"/>

            <button type="submit" class="button-submit-form-default">
                Update
            </button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoriesStore } from "@/stores/Admin/Establishments/Categories/categoriesStore";

const props = defineProps({
  establishmentId: String,
  categoryId : String
});

const categoryStore = useCategoriesStore();

const category = ref(null);

onMounted(async () => {
    category.value = await categoryStore.find(props.establishmentId, props.categoryId);
});

async function update() {
    if (!confirm('Do you really want to update the category?')) {
        return;
    }

    const categoryUpdated = await categoryStore.update(props.establishmentId, props.categoryId, category.value);

    if (!categoryUpdated) {
        alert('Unable to update category');
        return;
    }

    alert('Category updated successfully!');
}
</script>

<style scoped>
.form-control {
    width: 100%;
    padding: 8px;
}

input[type="text"] {
    width: 100%;
    padding: 15px;
    font-size: 1.1em;
    border-radius: 8px;
    border: 1px solid #ced4da;
    margin-bottom: 20px;
    box-sizing: border-box;
}
</style>
