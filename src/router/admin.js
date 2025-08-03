import Login from '../pages/Admin/Login.vue';
import Dashboard from '../pages/Admin/Dashboard.vue';
import PasswordReset from '@/pages/Admin/PasswordReset.vue';
import PasswordUpdate from '@/pages/Admin/PasswordUpdate.vue';

const routes = [
    {
        path : '/admin',
        name : 'admin',
        redirect : '/admin/login'
    },
    {
        path : '/admin/login',
        name : 'admin.login',
        component : Login,
        meta: { requiresGuest: true, title : 'Login'}
    },
    {
        path : '/admin/password/reset/email',
        name : 'admin.password.reset.email',
        component : PasswordReset,
        meta: { requiresGuest: true, title : 'Password Reset'}
    },
    {
        path : '/reset-password',
        name : 'admin.password.reset.update',
        component : PasswordUpdate,
        meta: { requiresGuest: true, title : 'Password Update'}
    },
    {
        path : '/admin/dashboard',
        name : 'admin.dashboard',
        component : Dashboard,
        meta: { requiresAuth: true , requiresAdmin: true, title : 'Dashboard'}
    },
    {
        path: '/admin/establishments',
        name: 'admin.establishments.index',
        component: () => import('../pages/Admin/Establishments/Index.vue'),
        meta: { requiresAuth: true , requiresAdmin : true, title : 'Establishments'},
    },
    {
        path: '/admin/establishments',
        meta: { requiresAuth: true , requiresAdmin: true},
        children : [
            {
                path: 'create',
                name: 'admin.establishments.create',
                component: () => import('../pages/Admin/Establishments/Create.vue'),
                meta: { title : 'Create'}
            },
            {
                path: ':establishmentId/edit',
                name: 'admin.establishments.edit',
                component: () => import('../pages/Admin/Establishments/Edit.vue'),
                props: (route) => ({ establishmentId: route.params.establishmentId }),
                meta: { title : 'Edit'}
            }
        ]
    },
    {
        path: '/admin/establishments',
        meta: { requiresAuth: true , onlyUsersEstablishment: true},
        children : [
            {
                path: ':establishmentId/categories',
                name: 'admin.establishments.categories',
                component: () => import('../pages/Admin/Establishments/Categories/Index.vue'),
                props: (route) => ({ establishmentId: route.params.establishmentId }),
                meta: { title : 'Categories'}
            },
            {
                path: ':establishmentId/categories/create',
                name: 'admin.establishments.categories.create',
                component: () => import('../pages/Admin/Establishments/Categories/Create.vue'),
                props: (route) => ({ establishmentId: route.params.establishmentId }),
                meta: { title : 'Create Category'}
            },
            {
                path: ':establishmentId/categories/:categoryId/edit',
                name: 'admin.establishments.categories.edit',
                component: () => import('../pages/Admin/Establishments/Categories/Edit.vue'),
                props: (route) => ({ establishmentId: route.params.establishmentId, categoryId: route.params.categoryId }),
                meta: { title : 'Edit Category'}
            }
        ]
    },
    {
        path: '/admin/establishments/:establishmentId/dashboard',
        name: 'admin.establishments.dashboard',
        component: () => import('../pages/Admin/Establishments/Dashboard.vue'),
        props: (route) => ({ establishmentId: route.params.establishmentId }),
        meta: { requiresAuth: true , onlyUsersEstablishment: true, title : 'Dashboard'},
    },
    {
        path: '/admin/establishments/:establishmentId/profile',
        name: 'admin.establishments.profile',
        component: () => import('../pages/Admin/Establishments/Profile/Edit.vue'),
        props: (route) => ({ establishmentId: route.params.establishmentId }),
        meta: { requiresAuth: true , onlyUsersEstablishment: true, title : 'Profile'},
    },
    {
        path: '/admin/establishments/:establishmentId/items',
        name: 'admin.establishments.items.index',
        component: () => import('../pages/Admin/Menu/Items/Index.vue'),
        props: (route) => ({ establishmentId: route.params.establishmentId }),
        meta: { requiresAuth: true , onlyUsersEstablishment: true, title : 'Items'}
    },
    {
        path: '/admin/establishments/:establishmentId/items/create',
        name: 'admin.establishments.items.create',
        component: () => import('../pages/Admin/Menu/Items/Create.vue'),
        props: (route) => ({ establishmentId: route.params.establishmentId }),
        meta: { requiresAuth: true , onlyUsersEstablishment: true, title : 'Create'}
    },
    {
        path: '/admin/establishments/:establishmentId/items/:itemId/edit',
        name: 'admin.establishments.items.edit',
        component: () => import('../pages/Admin/Menu/Items/Edit.vue'),
        props: (route) => ({ establishmentId: route.params.establishmentId, itemId: route.params.itemId }),
        meta: { requiresAuth: true , onlyUsersEstablishment: true, title : 'Edit'}
    }
];

export default routes;
