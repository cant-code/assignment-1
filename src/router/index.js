import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Login = () => import('@/components/forms/login')
const Signup = () => import('@/components/forms/signup')
const Eval = () => import('@/components/evaluation')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/evaluation',
    name: 'Evaluation',
    component: Eval
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function(to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters["user/getEmail"]) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
