<template>
  <div>
    <h1>Home page</h1>

    <button class="items button" v-if="isLoggedIn" @click="goToCollector" >Add photo</button>
    <div v-else class="items">
      <div>You are not logged in. If you want to load some files, you should LOGIN your admin account!</div>
      <button class="button" @click="goToLogin">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isLoggedIn = ref(false)
const router = useRouter();

function goToCollector() {
  router.push('/collector')
}

function goToLogin() {
  router.push('/login')
}

const checkAuth = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/me', {
      credentials: 'include'
    })
    isLoggedIn.value = res.status === 200
  } catch {
    isLoggedIn.value = false
  }
}

onMounted(checkAuth)
</script>
