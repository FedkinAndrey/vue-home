import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_NAMES } from '../constants/route-names.ts';
import AppLogin from '../pages/auth/AppLogin.vue';
import AppRegistration from '../pages/auth/AppRegistration.vue';
import { useAuth } from '../store/auth.ts';
import PostsList from '../pages/posts/list/UserPosts.vue';
import UserProfile from '../pages/user/UserProfile.vue';
import AllPostsList from '../pages/posts/list/AllPostsPage.vue';
import CreatePost from '../pages/posts/create/CreatePost.vue';
import AddCategory from '../pages/category/AddCategory.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: ROUTE_NAMES.LOGIN },
  },
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: AppLogin,
    meta: {
      notAuthenticatedOnly: true,
    },
  },
  {
    path: '/signup',
    name: ROUTE_NAMES.REGISTRATION,
    component: AppRegistration,
    meta: {
      notAuthenticatedOnly: true,
    },
  },
  {
    path: '/posts',
    name: ROUTE_NAMES.POSTS,
    component: PostsList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/all-posts',
    name: ROUTE_NAMES.ALL_POSTS,
    component: AllPostsList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/create',
    name: ROUTE_NAMES.CREATE_POST,
    component: CreatePost,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: ROUTE_NAMES.PROFILE,
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/category',
    name: ROUTE_NAMES.CATEGORY,
    component: AddCategory,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'notDefined',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const auth = useAuth();

  const isUserAuthenticated = auth.isAuthenticated || auth.token;

  if (to.meta.requiresAuth && !isUserAuthenticated) {
    next('/login');
    return;
  }

  if (to.meta.notAuthenticatedOnly && isUserAuthenticated) {
    next('/posts');
    return;
  }

  next();
});

export default router;
