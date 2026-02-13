<template>
  <form @submit.prevent="uploadFiles" class="items">
    <input
      type="file"
      class="form-control"
      id="inputGroupFile02"
      multiple
      ref="fileInput"
      @change="handleFiles"
    >

    <div class="file-list" v-if="files.length">
      <div v-for="(file, index) in files" :key="file.name + file.size" class="file-item">
        {{ file.name }}
        <button type="button" class="remove-btn" @click="removeFile(index)">✖</button>
      </div>
    </div>

    <button type="submit" class="button">Submit</button>
  </form>

  <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  <div v-if="uploadResult && !successMessage" class="error-message">
    <h3>Upload Error:</h3>
    <pre>{{ uploadResult }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const files = ref([]);
const uploadResult = ref(null);
const successMessage = ref('');
const fileInput = ref(null);

function handleFiles(event) {
  const newFiles = Array.from(event.target.files);

  files.value.push(...newFiles);

  const dataTransfer = new DataTransfer();
  files.value.forEach(f => dataTransfer.items.add(f));
  fileInput.value.files = dataTransfer.files;
}

function removeFile(index) {
  files.value.splice(index, 1);

  const dataTransfer = new DataTransfer();
  files.value.forEach(f => dataTransfer.items.add(f));
  fileInput.value.files = dataTransfer.files;
}

async function uploadFiles() {
  if (files.value.length === 0) {
    alert('Please select at least one file');
    return;
  }

  const formData = new FormData();
  files.value.forEach(file => formData.append('files', file));

  try {
    const res = await axios.post(
      'http://localhost:3000/api/add-photo',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
    );

    if (res.status === 200) {
      successMessage.value = 'Files uploaded';
      uploadResult.value = null;
      files.value = [];
      fileInput.value.value = null;

      setTimeout(() => successMessage.value = '', 3000);
    } else {
      uploadResult.value = res.data || 'Something went wrong.. ';
    }

  } catch (err) {
    console.error(err);
    uploadResult.value = err.response?.data || err.message;
  }
}
</script>

<style scoped>
.file-list {
  margin: 10px 0;
}
.file-item {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}
.remove-btn {
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0 5px;
  border-radius: 3px;
}

.success-message {
  margin-top: 10px;
  color: green;
  font-weight: bold;
}

.error-message {
  margin-top: 10px;
  color: red;
}
</style>
