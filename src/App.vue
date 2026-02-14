<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Home </router-link>
      <router-link to="/all">All photos</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { API_URL } from './config/api'

const isLoggedIn = ref(false)
const loading = ref(true)

const checkAuth = async () => {
  try {
    const res = await fetch(`${API_URL}api/me`, {
      credentials: 'include'
    })
    isLoggedIn.value = res.status === 200
  } catch {
    isLoggedIn.value = false
  } finally {
    loading.value = false
  }
}

onMounted(checkAuth)
</script>
