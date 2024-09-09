<template>
<div>
    <header>
        <h1>Buscar Estabelecimento</h1>
    </header>
    <div class="page-container">
        <div class="content">
            <div class="search-container">
                <div>
                    <input v-model="search" type="text" placeholder="Digite o nome do estabelecimento">
                    <button :disabled="search.length === 0" @click="searchEstablishment" type="button">Buscar</button>
                </div>

                <div v-show="establishments.length > 0" class="establishments-list">
                    <RouterLink v-for="establishment in establishments" style="text-decoration: none; color: inherit;" :to="'/' + establishment.menu_code" :key="establishment.id">
                        <div class="establishment-item">
                            <img :src="establishment?.profile.image_cover_profile_location_url" alt="Logo" class="establishment-logo">
                            <div class="establishment-info">
                                <div class="establishment-name">{{ establishment.name }}</div>
                                <div class="establishment-category">{{ establishment.description }}</div>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const search = ref('');
const establishments = ref([]);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

async function searchEstablishment() {
    if (search.value.length === 0) {
        return;
    }

    let result = [];
    try {
        result = await fetch(`${API_BASE_URL}/establishments?search=${search.value}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => json.data)
            .catch(error => null);
    } catch (error) {

    }

    establishments.value = result !== null ? result : [];
}
</script>

<style scoped>
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
    color: #343a40;
}

.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    background-color: #212529;
    color: white;
    padding: 30px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
    margin: 0;
    font-size: 2.5em;
}

.content {
    padding: 20px;
}

.search-container {
    width: 90%;
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 0 auto;
}

.search-container h2 {
    font-size: 2em;
    color: #e63946;
    margin-bottom: 20px;
}

.search-container input[type="text"] {
    width: 100%;
    padding: 15px;
    font-size: 1.1em;
    border-radius: 8px;
    border: 1px solid #ced4da;
    margin-bottom: 20px;
    box-sizing: border-box;
}

.search-container button {
    padding: 15px 30px;
    font-size: 1.1em;
    color: white;
    background-color: #e63946;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-container button:disabled {
    filter: brightness(0.8);
    cursor: not-allowed;
}

.search-container button:hover {
    background-color: #d62828;
}

@media (max-width: 768px) {
    .search-container h2 {
        font-size: 1.8em;
    }

    .search-container input[type="text"], 
    .search-container button {
        font-size: 1em;
    }
}

@media (max-width: 576px) {
    header h1 {
        font-size: 2em;
    }

    .search-container h2 {
        font-size: 1.5em;
    }

    .search-container input[type="text"], 
    .search-container button {
        font-size: 0.9em;
    }
}

.establishments-list {
    margin-top: 30px;
    border-radius: 10px;
}

.establishment-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin: 10px 0;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
    transition: background-color 0.3s;
}

.establishment-item:hover {
    background-color: #f1f1f1;
}

.establishment-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
}

.establishment-info {
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.establishment-name {
    font-size: 18px;
    font-weight: bold;
    align-self: flex-start;
    text-align: start;
}

.establishment-category {
    font-size: 14px;
    color: #6c757d;
    align-self: flex-start;
    text-align: start;
}

/* Estilização do campo de busca e lista de estabelecimentos */
.no-results {
    text-align: center;
    padding: 20px;
    color: #6c757d;
}
</style>