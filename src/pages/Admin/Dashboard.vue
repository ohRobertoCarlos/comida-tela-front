<template>
  <div>
    <button @click="logout">logout</button>
    <p>dashboard</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
  const result = await authStore.logout();

  if (result) {
    router.push({ name : 'admin.login' });
  }
}
</script>

<style>

</style>