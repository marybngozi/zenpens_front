import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: {
      auth: false
    },
    // route level code-splitting
    // this generates a separate chunk (contact.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    meta: {
      auth: false
    },
    component: () => import('../views/FAQ.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    meta: {
      auth: false
    },
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    meta: {
      auth: false
    },
    component: () => import('../views/ResetPassword.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    meta: {
      auth: false
    },
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/email-verify/:token',
    name: 'EmailVerify',
    meta: {
      auth: true
    },
    component: () => import('../views/EmailVerify.vue')
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    meta: {
      auth: true
    },
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    meta: {
      auth: true
    },
    component: () => import('../views/ChangePassword.vue')
  },

  // 404 page
  {
    path: '*',
    name: 'NotFound',
    meta: {
      auth: true
    },
    component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth) {
    if (localStorage.getItem('phoneixx') === null || !localStorage.getItem('tangloo') === null) {
      // store the next route in localstorage
      localStorage.setItem('einex', to.fullPath);

      next({
        path: '/login',
      });
      return;
    }else {
      next();
      return ;
    }
  } else {
    next();
    return ;
  }
});

export default router
