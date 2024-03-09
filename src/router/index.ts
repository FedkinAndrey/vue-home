import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';
import { ROUTE_NAMES } from '../constants/route-names.ts';
import AppLogin from '../pages/auth/AppLogin.vue';
import AppRegistration from '../pages/auth/AppRegistration.vue';
import { useAuth } from '../store/auth.ts';
import UserPosts from '../pages/user/UserPosts.vue';
import CreatePost from '../pages/user/CreatePost.vue';

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
    component: UserPosts,
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
    path: '/:catchAll(.*)',
    name: 'notDefined',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const auth = useAuth();
//
//
//   if (from === START_LOCATION) {
//     if (auth.token) {
//       auth.isAuthenticated = true;
//       router.addRoute({ path: '/', name: 'Home', redirect: '/posts' });
//       // next('/posts');
//     }
//   }
//
//   if (to.meta.requiresAuth) {
//     if (!auth.isAuthenticated) {
//       next('/login');
//       return;
//     }
//   }
//
//   if (to.meta.notAuthenticatedOnly) {
//     if (auth.isAuthenticated) {
//       next('/');
//       return;
//     }
//   }
//
//   next();
// });

router.beforeEach((to, from, next) => {
  const auth = useAuth();

  if (to.meta.requiresAuth) {
    // const token = localStorage.getItem('token');
    if (auth.token) {
      auth.isAuthenticated = true;
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router;
