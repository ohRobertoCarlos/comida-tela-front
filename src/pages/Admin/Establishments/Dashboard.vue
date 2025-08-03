<template>
  <p>Dashboard: {{ establishmentId }}</p>
</template>

<script setup>

const props = defineProps({
  establishmentId: String
});
</script>

<style>

</style>
