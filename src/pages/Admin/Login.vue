<template>
    <div>
        <div>
            <form @submit.prevent="login">
                <input type="email" name="email" v-model="email" placeholder="Email">
                <input type="password" v-model="password" name="password" placeholder="Senha">
                <button type="submit" :disabled="loading">Entrar</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
let loading = ref(false);
const email = ref('');
const password = ref('');

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

<style>

</style>