<template>
    <p>Dashboard: {{ establishmentId }}</p>
    <p>
        <RouterLink :to="`/admin/establishments/${establishmentId}/qrcode`">QR Code</RouterLink>
    </p>
</template>

<script setup>

const props = defineProps({
  establishmentId: String
});
</script>

<style>

</style>
