<template>
    <footer>
        <p>&copy; {{ year }} Comida na Tela. All rights reserved.</p>
    </footer>
</template>

<script setup>
import { ref } from 'vue';

const year = ref((new Date()).getFullYear());
</script>

<style>

</style>
