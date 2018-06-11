import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'

import AppGalleries from './pages/AppGalleries.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import MyGalleries from './pages/MyGalleries.vue'
import CreateNewGallery from './pages/CreateNewGallery.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: AppGalleries },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/my-galleries', component: MyGalleries },
  { path: '/create', component: CreateNewGallery }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
