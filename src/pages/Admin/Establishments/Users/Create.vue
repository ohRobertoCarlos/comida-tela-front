<template>
    <div class="container">
      <form @submit.prevent="create">
          <label for="title">Name:</label>
          <input type="text" name="name" v-model="data.name" class="form-control">

          <label for="title">E-mail:</label>
          <input type="text" name="email" v-model="data.email" class="form-control">

          <button type="submit" class="button-submit-form-default">Create</button>
      </form>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUsersStore } from "@/stores/Admin/Establishments/Users/usersStore.js"

const props = defineProps({
    establishmentId : String
});

const data = reactive({
    name: '',
    email : ''
});

const usersStore = useUsersStore();

async function create() {
    if (!confirm('Are you sure?')) {
        return;
    }

    const userCreated = await usersStore.create(props.establishmentId, data);
    if (!userCreated) {
        alert('Unable to create a user');
        return;
    }

    alert('User created Successfully!');
}
</script>

<style scoped>
.form-control {
    width: 100%;
    padding: 8px;
}

input[type="text"], textarea {
    width: 100%;
    padding: 15px;
    font-size: 1.1em;
    border-radius: 8px;
    border: 1px solid #ced4da;
    margin-bottom: 20px;
    box-sizing: border-box;
}
</style>
