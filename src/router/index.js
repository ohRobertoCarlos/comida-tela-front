import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../pages/Index.vue'),
    meta: {
      title: 'Home - Cardápio Online',
      description: 'Home - Cardápio Online'
    }
  },
  {
    path: '/items',
    name: 'item',
    component: () => import('../pages/Item.vue'),
  },
  {
    path: '/:pathMatch(.*)*', 
    component: import('../pages/PageNotFound.vue'),
    meta: {
      title: '404 - página não encontrada',
      description: 'Página não encontrada'
    }
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

router.beforeEach((to, from, next) => {
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

  next();
});

export default router;
