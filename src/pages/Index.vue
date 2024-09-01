<template>
    <div class="page-container">
        <div class="content">
            <div class="search-container">
                <h2>Buscar Estabelecimento</h2>
                <input type="text" placeholder="Digite o nome do estabelecimento">
                <button>Buscar</button>
            </div>
        </div>
    </div>
</template>

<script setup>

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
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.search-container {
    width: 90%;
    max-width: 600px;
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
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

.search-container button:hover {
    background-color: #d62828;
}

footer {
    background-color: #212529;
    color: white;
    text-align: center;
    padding: 20px;
    border-top: 5px solid #e63946;
}

footer p {
    margin: 0;
    font-size: 1em;
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
</style>