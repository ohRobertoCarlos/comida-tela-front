<template>
    <p>Edit</p>
    <RouterLink :to="`/admin/establishments/${establishmentId}/users`">Users</RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    establishmentId: String
});

</script>

<style>

</style>
