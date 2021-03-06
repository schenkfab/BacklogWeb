import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Boards from '../views/Boards.vue'
import Feeds from '../views/Feeds.vue'
import AddRSSFeed from '../views/AddRSSFeed.vue'
import AddYouTubeFeed from '../views/AddYouTubeFeed.vue'
import ImportOPML from '../views/ImportOPML.vue'
import Login from '../views/Login.vue'
import Collections from '../views/Collections.vue'
import AddCollection from '../views/AddCollection.vue'
import TopCollections from '../views/TopCollections.vue'
import Collection from '../views/Collection.vue'
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
    path: '/feeds/addrss',
    name: 'AddRSSFeed',
    component: AddRSSFeed,
    beforeEnter: authGuard
  },
  {
    path: '/feeds/addyt',
    name: 'AddYouTubeFeed',
    component: AddYouTubeFeed,
    beforeEnter: authGuard
  },
  {
    path: '/feeds/importopml',
    name: 'ImportOPML',
    component: ImportOPML,
    beforeEnter: authGuard
  },
  {
    path: '/collections',
    name: 'Collections',
    component: Collections,
    beforeEnter: authGuard
  },
  {
    path: '/collections/add',
    name: 'Add Collection',
    component: AddCollection,
    beforeEnter: authGuard
  },
  {
    path: '/collections/top',
    name: 'Top Collection',
    component: TopCollections,
    beforeEnter: authGuard
  },
  {
    path: '/collection/:id',
    name: 'Collection',
    props: true,
    component: Collection,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
