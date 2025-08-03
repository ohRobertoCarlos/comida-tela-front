<template>
    <div class="container">
        <form @submit.prevent="store">
            <label for="title">Name:</label>
            <input v-model="data.name" name="name" type="text" class="form-control"/>

            <button type="submit">
                Create
            </button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useCategoriesStore } from "@/stores/Admin/Establishments/Categories/categoriesStore";
import { useRouter } from "vue-router";

const props = defineProps({
  establishmentId: String
});

const router = useRouter();

const categoryStore = useCategoriesStore();

const data = reactive({
    name : ''
});

async function store() {
    if (!confirm('Do you really want to create the category?')) {
        return;
    }

    const categoryCreated = await categoryStore.store(props.establishmentId, data);

    if (!categoryCreated) {
        alert('Unable to create category');
        return;
    }

    alert('Category created successfully!');

    router.push('/admin/establishments/' + props.establishmentId + '/categories');
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
