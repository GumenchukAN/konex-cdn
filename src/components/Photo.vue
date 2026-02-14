<template>
  <div class="photo_block">
    <button @click="goBack" class="remove-btn photo_block_button">✖</button>
    <div class="photo_block_img">
      <img class="photo_block_img" :src="photoUrl" alt="photo">
    </div>
    <button v-if="isLoggedIn" @click="RemovePhoto" class="remove-btn photo_block_cart">
      <img class="photo_block_cart_img" src="../../public//cart.png" alt="">
    </button>
    <button @click="downloadPhoto(`file/test_87/project/${photoName}`)" class="remove-btn photo_block_cart">
      <img class="photo_block_cart_img" src="../../public//download.png" alt="">
    </button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { API_URL, CDN_URL } from '../config/api';

const route = useRoute();
const router = useRouter();
const isLoggedIn = ref(false)

async function RemovePhoto() {
  try {
    await axios.post(`${API_URL}api/delete`, {
      filename: photoName
    });

    router.push('/all')
  } catch (error) {
    console.error('Error: ', error);
  }
}

const checkAuth = async () => {
  try {
    const res = await fetch(`${API_URL}api/me`, {
      credentials: 'include'
    })
    isLoggedIn.value = res.status === 200
  } catch {
    isLoggedIn.value = false
  }
}

onMounted(checkAuth)

function goBack() {
  router.push('/all')
}

const downloadPhoto = (filePath) => {
  window.open(
    `${API_URL}api/download?path=${filePath}`,
    '_blank'
  )
}
const photoName = route.params.name;
const photoUrl = computed(() => `${CDN_URL}file/test_87/project/${photoName}`);
</script>