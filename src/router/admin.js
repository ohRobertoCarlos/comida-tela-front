import Login from '../pages/Admin/Login.vue';
import Dashboard from '../pages/Admin/Dashboard.vue';

const routes = [
    {
        path : '/admin/login',
        name : 'admin.login',
        component : Login,
        meta: { requiresGuest: true, title : 'Login'}
    },
    {
        path : '/admin/dashboard',
        name : 'admin.dashboard',
        component : Dashboard,
        meta: { requiresAuth: true , title : 'Dashboard'}
    }
];

export default routes;
