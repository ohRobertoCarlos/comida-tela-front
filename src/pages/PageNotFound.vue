<template>
    <div class="container-page-not-found">
        <img src="" alt="Imagem 404">
        <h2>Página Não Encontrada</h2>
        <p>
            Desculpe, mas a página que você está procurando não existe. Por favor, verifique o URL ou volte para a <RouterLink to="/">página inicial</RouterLink>.
        </p>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            color: #343a40;
            text-align: center;
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

        .container-page-not-found {
            width: 90%;
            max-width: 800px;
            margin: 40px auto;
            padding: 30px;
            border-radius: 12px;
        }

        .container-page-not-found h2 {
            font-size: 3em;
            color: #e63946;
            margin-bottom: 20px;
        }

        .container-page-not-found p {
            font-size: 1.2em;
            color: #495057;
            margin-bottom: 30px;
        }

        .container-page-not-found  img {
            width: 250px;
            height: 250px;
            border-radius: 12px;
            object-fit: cover;
            margin-bottom: 20px;
        }

        a {
            color: #e63946;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2em;
            transition: color 0.3s ease;
        }

        a:hover {
            color: #d62828;
        }

        footer {
            background-color: #212529;
            color: white;
            text-align: center;
            padding: 20px;
            margin-top: 50px;
            border-top: 5px solid #e63946;
        }

        footer p {
            margin: 0;
            font-size: 1em;
        }

        @media (max-width: 768px) {
            .container-page-not-found  h2 {
                font-size: 2.5em;
            }

            .container-page-not-found  p {
                font-size: 1em;
            }

            .container-page-not-found  img {
                width: 200px;
                height: 200px;
            }

            a {
                font-size: 1em;
            }
        }

        @media (max-width: 576px) {
            header h1 {
                font-size: 2em;
            }

            .container-page-not-found  h2 {
                font-size: 2em;
            }

            .container-page-not-found  p {
                font-size: 0.9em;
            }

            .container-page-not-found  img {
                width: 150px;
                height: 150px;
            }

            a {
                font-size: 0.95em;
            }
        }
</style>