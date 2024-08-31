<template>
    <div class="menu-item">
        <img src="" alt="Item 1">
        <div class="menu-item-details">
            <h3>Nome do Item 1</h3>
            <div class="price">R$ 25,00</div>
            <p>Descrição do item 1, incluindo detalhes dos ingredientes e modo de preparo.</p>
            <RouterLink to="/items" class="back-button">
                Ver mais detalhes
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style>

</style>