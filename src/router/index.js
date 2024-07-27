import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/Pages/SearchPage.vue';
import WishlistPage from '@/Pages/WishtlePage.vue';
import BookDetailsPage from '@/Pages/BookDetailsPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/wishlist',
        name: 'Wishlist',
        component: WishlistPage
    },
    {
        path: '/details/:id',
        name: 'BookDetails',
        component: BookDetailsPage,
        props: true
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
