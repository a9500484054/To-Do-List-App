<template>
    <button
      class="burger"
      @click="toggle"
      aria-label="Открыть меню"
      aria-expanded="isOpen"
    >
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </button>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isOpen = ref(false);
  const emit = defineEmits(['toggle']);
  
  const toggle = () => {
    isOpen.value = !isOpen.value;
    emit('toggle', isOpen.value);
  };
  </script>
  
  <style scoped lang="scss">
  .burger {
    display: none; // По умолчанию скрыт
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 10000;
    
    &__line {
      display: block;
      width: 25px;
      height: 3px;
      background-color: currentColor;
      margin: 4px 0;
      transition: all 0.3s ease;
      background-color: #ff365f;
    }
    
    &[aria-expanded="true"] {
      .burger__line:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      .burger__line:nth-child(2) {
        opacity: 0;
      }
      .burger__line:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  
    @media (max-width: 768px) {
      display: block;
    }
  }
  </style>