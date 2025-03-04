import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import admin from './admin.js';
import menu from './menu.js';

const routes = [
  ...admin,
  ...menu
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});


router.beforeEach(async (to) => {
  document.title = to.meta.title || 'Cardápio Online';
  const description = to.meta.description || 'Cardápio Online';
  let meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', description);
  } else {
    meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = description;
    document.head.appendChild(meta);
  }
  
  const authStore = useAuthStore();
  await authStore.fetchUser();

  if (to.meta.requiresAuth !== undefined && to.meta.requiresAuth === true && !authStore.user) {
    return { path: '/admin/login' };
  }

  if (to.meta.requiresGuest !== undefined && to.meta.requiresGuest === true && authStore.user) {
    return { path: '/admin/dashboard' };
  }

  if (to.meta.requiresAdmin !== undefined && to.meta.requiresAdmin === true && authStore.user.is_admin !== true) {
    return { path: `/admin/establishments/${authStore.user.establishment_id}/dashboard` };
  }

  if (to.params.establishmentId && to.meta.onlyUsersEstablishment !== undefined && to.meta.onlyUsersEstablishment === true && authStore.user.establishment_id && authStore.user.establishment_id !== to.params.establishmentId) {
    return { path: `/admin/establishments/${authStore.user.establishment_id}/dashboard` };
  }

});

export default router;
