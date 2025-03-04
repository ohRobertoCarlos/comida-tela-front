<template>
    <footer>
        <p>&copy; {{ year }} Comida na Tela. Todos os direitos reservados.</p>
    </footer>
</template>

<script setup>
import { ref } from 'vue';

const year = ref((new Date()).getFullYear());
</script>

<style>

</style>