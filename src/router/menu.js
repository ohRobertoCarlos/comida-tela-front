const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../pages/Index.vue'),
        meta: {
            title: 'Buscar Estabelecimento',
            description: 'Buscar Estabelecimento - Cardápio Online'
        }
    },
    {
        path: '/:menuCode',
        name: 'menu',
        component: () => import('../pages/Menu.vue'),
        meta: {
            title: 'Home - Cardápio Online',
            description: 'Home - Cardápio Online'
        }
    },
    {
        path: '/:establishmentId/items/:id',
        name: 'item',
        component: () => import('../pages/Item.vue'),
        props: (route) => ({ id: route.params.id, establishmentId: route.params.establishmentId }),
    },
    {
        path: '/:pathMatch(.*)*',
        name : 'NotFound',
        component: () => import('../pages/PageNotFound.vue'),
        meta: {
            title: '404 - página não encontrada',
            description: 'Página não encontrada'
        }
    }
];

export default routes;  