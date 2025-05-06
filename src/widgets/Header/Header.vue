<template>
  <header class="header" role="banner">
    <div class="header__wrapper">
      <div class="header__logo">
        <router-link to="/" aria-label="Перейти на главную страницу">
          <Logo 
            text="To-Do List App"
            :width="logoWidth" 
            :height="logoHeight" 
            hideImage
          />
        </router-link>  
      </div>

      <Burger @toggle="handleMenuToggle"/>

      <nav 
        class="header__nav" 
        :class="{ 'header__nav--active': isMenuOpen }"
        aria-label="Основная навигация"
      >
        <ul class="header__nav-list">
          <li 
            v-for="link in links" 
            :key="link.url" 
            class="header__nav-item"
          >
            <router-link 
              :to="link.url" 
              class="nav-link"
              :aria-current="link.url === $route.path ? 'page' : null"
              @click="closeMenu"
            >
              {{ link.text }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Logo, Burger } from '@/shared/components';

const route = useRoute();
const isMenuOpen = ref(false);

const logoWidth = ref('auto');
const logoHeight = ref('auto');

const links = [
  { text: 'Главная', url: '/' },
  { text: 'О проекте', url: '/about' },
  { text: 'Настройка', url: '/settings' }
];

const handleMenuToggle = (open) => {
  isMenuOpen.value = open;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const activeLink = computed(() => links.find(link => link.url === route.path));
</script>

<style scoped>
.header {
  padding: 2rem 1rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 61;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: var(--bg-color);
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  position: relative;
}

.header__logo {
  z-index: 10000;
}

.header__controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.header__nav-list {
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  font-size: 1rem;
}

.nav-link:hover {
  color: var(--primary-hover);
}

.nav-link:focus, .nav-link:hover {
  color: var(--primary-hover);
}

.nav-link[aria-current="page"] {
  font-weight: 600;
  color: var(--primary-hover);

}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .header__logo img {
    width: 150px;
    height: auto;
  }

  .header__nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--bg-color);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 61;
  }

  .header__nav--active {
    transform: translateX(0);
    color: var(--primary-color);
  }

  .header__nav-list {
    flex-direction: column;
    gap: 30px;
  }

  .nav-link {
    font-size: 1.5rem;
  }

  .header__nav:not(.header__nav--active) {
    display: none;
  }
}

@media (max-width: 480px) {
  .header__logo img {
    width: 120px;
  }
}
</style>