<template>
    <div class="container">
        <div class="card-login">
            <div class="section-title-card-login">
                <h3 class="title-card-login">Login</h3>
            </div>
            <div class="section-form-login">
                <form @submit.prevent="login">
                    <input type="email" name="email" v-model="email" placeholder="Email">
                    <input type="password" v-model="password" name="password" placeholder="Senha">
                    <button type="submit" :disabled="loading || !filledCredentials">Entrar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
let loading = ref(false);
const email = ref('');
const password = ref('');

const filledCredentials = computed(() => {
    return email.value && password.value;
});

async function login() {
    loading.value = true;
    try {
        const result = await authStore.login({ email: email.value, password: password.value });
        if (result) {
            router.push({ name : 'admin.dashboard' });
        } else {
            throw new Error('Não foi possível fazer login');
        }
    } catch (error) {
        loading.value = false;
    }
}
</script>

<style scoped>
.card-login {
    width: 100%;
    max-width: 600px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    justify-self: center;
}

.section-form-login {
    width: 100%;
}

.section-title-card-login {
    width: 100%;
}

.title-card-login {
    text-align: center;
    color: #212529;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #495057;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 15px;
    margin-bottom: 15px;
    outline: none;
}

button[type="submit"] {
    width: 100%;
    background-color: #e63946;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
    background-color: #f05865;
}

button[type="submit"]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

input::placeholder {
    color: #212529;
}
</style>
