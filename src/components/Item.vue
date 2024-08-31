<template>
    <div>
        <img src="" alt="Nome do Item" class="item-image">
        <div class="item-info">
            <h2>Nome do Item</h2>
            <div class="price">R$ 65,00</div>
            <p class="description">Descrição detalhada do item do cardápio. Aqui você pode incluir informações sobre os ingredientes, o modo de preparo, sugestões de harmonização, ou qualquer outra informação relevante que valorize o prato.</p>

            <RouterLink to="/" class="back-button">
                Voltar ao Cardápio
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.item-image {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.3s ease;
}

.item-image:hover {
    transform: scale(1.05);
}

.item-info {
    margin-top: 20px;
}

.item-info h2 {
    font-size: 2.5em;
    margin-bottom: 15px;
    color: #212529;
    border-bottom: 2px solid #212529;
    padding-bottom: 10px;
    display: inline-block;
}

.item-info .price {
    font-size: 1.8em;
    color: #e63946;
    font-weight: bold;
    margin-bottom: 15px;
}

.item-info .description {
    font-size: 1.2em;
    color: #495057;
    margin-bottom: 25px;
    line-height: 1.8;
}

.back-button {
    display: inline-block;
    margin-top: 30px;
    padding: 12px 30px;
    background-color: #e63946;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 1.2em;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
    background-color: #d62828;
}


@media (max-width: 768px) {
    .item-info h2 {
        font-size: 2em;
    }

    .item-info .price {
        font-size: 1.5em;
    }

    .item-info .description {
        font-size: 1.1em;
    }

    .back-button {
        font-size: 1em;
        padding: 10px 20px;
    }
}

@media (max-width: 576px) {
    .item-info h2 {
        font-size: 1.8em;
    }

    .item-info .price {
        font-size: 1.3em;
    }

    .item-info .description {
        font-size: 1em;
    }

    .back-button {
        font-size: 0.9em;
        padding: 8px 18px;
    }
}
</style>