<template>
    <div>
      <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
        <button class="close-btn" @click="toggleSidebar">
          &#10005;
        </button>
        <div class="botoes-sidebar-menu">
            <div>
                <ul class="menu" v-if="authStore.user !== null && authStore.user.is_admin === true">
                    <li>
                        <RouterLink @click="toggleSidebar" to="/admin/dashboard">Dashboard</RouterLink>
                    </li>

                    <li>
                        <RouterLink @click="toggleSidebar" to="/admin/establishments">Establishments</RouterLink>
                    </li>

                    <li>
                        <RouterLink @click="toggleSidebar" to="">Users</RouterLink>
                    </li>
                </ul>

                <ul class="menu" v-else-if="authStore.user !== null && authStore.user.is_admin !== true">
                    <li>
                        <RouterLink @click="toggleSidebar" :to="`/admin/establishments/${authStore.user.establishment_id}/dashboard`">Dashboard</RouterLink>
                    </li>

                    <li>
                        <RouterLink @click="toggleSidebar" :to="`/admin/establishments/${authStore.user.establishment_id}/items`">Items</RouterLink>
                    </li>

                    <li>
                        <RouterLink @click="toggleSidebar" :to="`/admin/establishments/${authStore.user.establishment_id}/profile`">Establishment Profile</RouterLink>
                    </li>

                    <li>
                        <RouterLink @click="toggleSidebar" to="">Users</RouterLink>
                    </li>
                </ul>
            </div>

            <button class="app-logout-btn" @click="logout">Logout</button>
        </div>
      </div>

      <div class="content-sidebar">
        <button class="hamburger" @click="toggleSidebar">&#9776;</button>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { RouterLink, useRouter } from 'vue-router';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
    const result = await authStore.logout();

    if (result) {
        router.push({ name : 'admin.login' });
    }

    toggleSidebar();
}
</script>

<style scoped>
    .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background-color: #333;
    color: white;
    padding-top: 50px;
    transition: transform 0.3s ease;
    transform: translateX(-100%);
    z-index: 9999;
    }

    .sidebar-open {
    transform: translateX(0);
    }

    .sidebar .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    color: white;
    font-size: 30px;
    border: none;
    cursor: pointer;
    }

    .sidebar .menu {
    list-style-type: none;
    padding: 0;
    }

    .sidebar .menu li {
    padding: 15px;
    border-bottom: 1px solid #444;
    }

    .sidebar .menu li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    }

    .content-sidebar {
    margin-left: 0;
    transition: margin-left 0.3s ease;
    }

    .hamburger {
    font-size: 30px;
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    display: block;
    }

    .main-content {
    margin: 20px;
    }

    @media screen and (max-width: 768px) {
    .sidebar {
        width: 100%;
        height: 100%;
        position: fixed;
    }
    .content-sidebar {
        margin-left: 0;
    }
    .hamburger {
        display: block;
    }
    }

    .app-logout-btn {
        background-color: #f44336; /* Cor vermelha para o botão de logout */
        color: white;
        border: none;
        padding: 15px;
        width: 100%;
        cursor: pointer;
        font-size: 18px;
        text-align: center;
    }

    .app-logout-btn:hover {
        background-color: #d32f2f; /* Cor mais escura no hover */
    }
</style>
