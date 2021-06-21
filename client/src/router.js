
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Tournaments from './views/Tournaments';
import Host from './views/Host';
import Settings from './views/Settings';

const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/tournaments',
            component: Tournaments,
        },
        {
            path: '/host',
            component: Host,
        },
        {
            path: '/settings',
            component: Settings,
        },
        {
            path: '/:catchAll(.*)',
            component: Home,
        },
    ]
});

export default router;
