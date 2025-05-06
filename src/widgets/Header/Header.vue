<template>
  <header class="header" role="banner">
    <div class="header__wrapper">
      <div class="header__logo">
        <router-link to="/" aria-label="Перейти на главную страницу">
          <Logo 
            :src="logoPath" 
            :alt="logoAlt" 
            :width="logoWidth" 
            :height="logoHeight" 
          />
        </router-link>  
      </div>

      <Burger @toggle="handleMenuToggle" />

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

const logoPath = ref('./src/app/assets/logo.jpg');
const logoAlt = ref('Сервис ToDo');
const logoWidth = ref('200px');
const logoHeight = ref('50px');

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

<style scoped lang="scss">
.header {
  padding: 1rem 2rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  background-color: #fff;
  
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    position: relative;
  }
  
  &__logo {
    z-index: 10000;
  }
  
  &__nav {
    &-list {
      display: flex;
      align-items: center;
      gap: 20px;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: #fff;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1;
      
      &--active {
        transform: translateX(0);
      }
      
      &-list {
        flex-direction: column;
        gap: 30px;
      }
    }
  }
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    color: #ff365f;
  }
  
  &[aria-current="page"] {
    color: #ff365f;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
    
    &__logo {
      img {
        width: 150px;
        height: auto;
      }
    }
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