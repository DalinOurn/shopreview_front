import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import Post from '../views/dashboard/pages/post.vue'
import Store from '../views/dashboard/pages/store.vue'
import Category from '../views/dashboard/pages/user.vue'
import Feedback from '../views/dashboard/pages/feedback.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/review',
            name: 'review',
            component: () =>
                import ('../views/ReviewPage.vue')
        },
        {
            path: '/newsfeed',
            name: 'newsfeed',
            component: () =>
                import ('../views/NewsfeedPage.vue')
        },
        {
            path: '/location',
            name: 'location',
            component: () =>
                import ('../views/LocationPage.vue')
        },
        {
            path: '/editprofile',
            name: 'editprofile',
            component: () =>
                import ('../views/EditProfilePage.vue')
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: () =>
                import ('../views/FeedBackPage.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../views/LoginPage.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('../views/RegisterPage.vue')
        },
        {
            path: '/forget',
            name: 'forget',
            component: () =>
                import ('../views/Forget.vue')
        },
        {
            path: '/reset',
            name: 'reset',
            component: () =>
                import ('../views/Reset.vue')
        },
        {
            path: '/store/:id',
            name: 'store',
            component: () =>
                import ('../views/store/_id.vue')
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () =>
                import ('../components/Privacy.vue')
        },
        {
            path: '/termofuse',
            name: 'Term_of_use',
            component: () =>
                import ('../components/TermofUse.vue')
        },
        {
            path: '/cookie',
            name: 'Cookie',
            component: () =>
                import ('../components/Cookie.vue')
        },
        {
            path: '/browse',
            name: 'Browse',
            component: () =>
                import ('../views/BrowseStore.vue')
        },
        {
            path: "/terms",
            name: "Term",
            component: () =>
                import ("../components/Term.vue"),
        },
        {
            path: "/adminLogin",
            name: "adminLogin",
            component: () =>
                import ("../views/dashboard/AdminLogin.vue"),

        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            children: [{
                    path: 'store',
                    name: 'dashboard/store',
                    component: Store
                },
                {
                    path: 'user',
                    name: 'dashboard/user',
                    component: Category
                },
                {
                    path: 'post',
                    name: 'dashboard/post',
                    component: Post
                },
                {
                    path: 'feedback',
                    name: 'dashboard/feedback',
                    component: Feedback
                },
            ],
        }
    ]
})

export default router