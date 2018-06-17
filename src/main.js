import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'


import AppGalleries from './pages/AppGalleries.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import MyGalleries from './pages/MyGalleries.vue'
import CreateNewGallery from './pages/CreateNewGallery.vue'
import GalleryView from './pages/GalleryView.vue'
import AuthorsView from './pages/AuthorsView.vue'

import { store } from './store'
import {
    requiresAuth,
    guestOnly
  } from './router/guards'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)

const routes = [
  { path: '/', component: AppGalleries, name: 'galleries' },
  { path: '/login', component: Login, meta: { guestOnly: true } },
  { path: '/register', component: Register, meta: { guestOnly: true } },
  { path: '/my-galleries', component: MyGalleries, name:'my-galleries', meta: { requiresAuth: true } },
  { path: '/create', component: CreateNewGallery, meta: { requiresAuth: true } },
  { path: '/galleries/:id', component: GalleryView, name: 'gallery-view', meta: { requiresAuth: true }},
  { path: '/authors/:id', component: AuthorsView, name: 'authors-galleries', meta: { requiresAuth: true }},
]

const router = new VueRouter({
  mode: 'history',
  routes,
})
router.beforeEach((to, from, next) => {
      Promise.resolve(to)
        .then(requiresAuth)
        .then(guestOnly)
        .then(() => {
          next()
        })
        .catch(redirect => {
          next(redirect)
        })
    })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
