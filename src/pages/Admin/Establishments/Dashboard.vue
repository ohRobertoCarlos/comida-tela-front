<template>
  <p>Dashboard: {{ establishmentId }}</p>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  establishmentId: String
});
</script>

<style>

</style>