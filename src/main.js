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

import { store } from './store'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)

const routes = [
  { path: '/', component: AppGalleries },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/my-galleries', component: MyGalleries, name:'my-galleries'},
  { path: '/create', component: CreateNewGallery },
  { path: '/galleries/:id', component: GalleryView, name: 'gallery-view' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
