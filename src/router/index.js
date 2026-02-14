import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import Login from '../components/Login.vue'
import Collector from '../components/Collector.vue'
import Home from '../components/Home.vue'
import AllPhoto from '../components/AllPhoto.vue'
import Photo from '../components/Photo.vue'
import { API_URL } from '../config/api'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/photo/:name', component: Photo },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/all',
    name: 'AllPhoto',
    component: AllPhoto,
  },
  {
    path: '/collector',
    name: 'Collector',
    component: Collector,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next()
  }

  try {
    await axios.get(`${API_URL}api/me`, {
      withCredentials: true
    })

    next()
  } catch (error) {
    next('/login')
  }
})

export default router
