const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../pages/Index.vue'),
        meta: {
            title: 'Search Establishment',
            description: 'Search Establishment - Online Menu'
        }
    },
    {
        path: '/:menuCode',
        name: 'menu',
        component: () => import('../pages/Menu.vue'),
        meta: {
            title: 'Home - Online Menu',
            description: 'Home - Online Menu'
        }
    },
    {
        path: '/:menuCode/profile',
        name: 'profile',
        component: () => import('../pages/Profile/Index.vue'),
        meta: {
            title: 'Profile - Online Menu',
            description: 'Profile - Online Menu'
        }
    },
    {
        path: '/:establishmentId/items/:id',
        name: 'item',
        component: () => import('../pages/Item.vue'),
        props: (route) => ({ id: route.params.id, establishmentId: route.params.establishmentId }),
    },
    {
        path: '/:establishmentId/rating',
        name: 'ratings',
        component: () => import('../pages/Ratings/Index.vue'),
        props: (route) => ({ establishmentId: route.params.establishmentId }),
        meta: {
            title: 'Rating',
            description: 'Rating - Online Menu'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name : 'NotFound',
        component: () => import('../pages/PageNotFound.vue'),
        meta: {
            title: '404 - page not found',
            description: 'Page not found'
        }
    }
];

export default routes;
