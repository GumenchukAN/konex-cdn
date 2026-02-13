<template>
  <div>
    <h1>All photos</h1>
    <div class="catalog">
      <button 
        v-for="(url, index) in paginatedUrls" 
        :key="index" 
        @click="goToPhoto(url)"
      >
        <img class="photo" :src="url" alt="photo">
      </button>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <span>Сторінка {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const allUrls = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => Math.ceil(allUrls.value.length / itemsPerPage));

const paginatedUrls = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return allUrls.value.slice(start, start + itemsPerPage);
});

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/photos');
    allUrls.value = res.data;
  } catch (err) {
    console.error('Помилка отримання фото:', err);
  }
});

function goToPhoto(url) {
  const fileName = url.split('/').pop();
  router.push({ path: `/photo/${encodeURIComponent(fileName)}` });
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
</script>

