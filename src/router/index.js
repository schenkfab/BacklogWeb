import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Boards from '../views/Boards.vue'
import Feeds from '../views/Feeds.vue'
import Login from '../views/Login.vue'
import Collections from '../views/Collections.vue'
import { authGuard } from '../auth/authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board/:followId?',
    name: 'Kanban',
    props: true,
    component: Boards,
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: authGuard
  },
  {
    path: '/feeds',
    name: 'Feeds',
    component: Feeds,
    beforeEnter: authGuard
  },
  {
    path: '/collections',
    name: 'Collections',
    component: Collections,
    beforeEnter: authGuard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
