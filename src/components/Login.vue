<template>
  <h1>Login</h1>
  <div class="items">
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="exampleInputName" class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" id="exampleInputName" aria-describedby="emailHelp"
          required>
        <div id="emailHelp" class="form-text">We'll never share your data with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input v-model="password" required type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { API_URL } from '../config/api';

export default {
  name: 'Login',
  data() {
    return {
      name: '',
      password: '',
      isLoggedIn: false,
      error: '',
    }
  },
  mounted() {
    this.isLoggedIn = false;
  },

  methods: {
    async login() {
      try {
        const res = await fetch(`${API_URL}api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', 
          body: JSON.stringify({
            name: this.name,
            password: this.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          this.error = data.message;
          return;
        }

        this.$router.push('/'); 
      } catch (e) {
        console.error('Login error', e);
        this.error = 'Login failed. Try again.';
      }
    }
  }
}
</script>
