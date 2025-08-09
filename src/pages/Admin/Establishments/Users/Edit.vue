<template>
    <div class="container">
      <form v-if="user" @submit.prevent="update">
          <label for="title">Name:</label>
          <input type="text" name="name" v-model="user.name" class="form-control">

          <label for="title">E-mail:</label>
          <input type="text" name="email" v-model="user.email" class="form-control">

          <button type="submit" class="button-submit-form-default">Update</button>
      </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsersStore } from "@/stores/Admin/Establishments/Users/usersStore.js"

const props = defineProps({
    establishmentId : String,
    userId : String
});

const user = ref(null);
const usersStore = useUsersStore();

onMounted(async () => {
    user.value = await usersStore.find(props.establishmentId, props.userId);
});

async function update() {
    if (!confirm('Are you sure?')) {
        return;
    }

    let data = { name : user.value.name, email : user.value.email };

    const userUpdated = await usersStore.update(props.establishmentId, props.userId, data);
    if (!userUpdated) {
        alert('Unable to update a user');
        return;
    }

    alert('User updated Successfully!');
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
