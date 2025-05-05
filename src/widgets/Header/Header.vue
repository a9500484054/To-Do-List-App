<template>
  <header class="header">
      <div class="header-logo">
          <router-link to="/" class="nav-link">
              <Logo src="./src/app/assets/ToDoList.svg" alt="Сервис ToDo" size="100px" />
          </router-link>  
      </div>

      <nav class="header-nav">
          <ul class="nav-list">
              <li v-for="link in links" :key="link.text" class="nav-item">
                  <router-link :to="link.url" class="nav-link">{{ link.text }}</router-link>
              </li>
          </ul>
      </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { Logo } from '@/shared/components'; // Убедитесь, что путь к компоненту Logo правильный

const router = useRouter();
  const links = [
    { text: 'Главная', url: '/' },
    { text: 'О проекте', url: '/about' },
    { text: 'Настройка', url: '/settings' }
  ];
</script>

<style scoped>
.header {
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  position: relative;
}

.header-logo {
  display: flex;
  align-items: center;
}

.header-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

.nav-item {
  margin: 0;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 1em;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #007bff;
}
</style>
