<template>
    <div class="logo" :style="{ width: width, height: height }">
      <img
        :src="src"
        :alt="alt"
        class="logo-image"
        :style="{ width: '100%', height: '100%' }"
      />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Определяем пропсы, которые компонент принимает
  const props = defineProps({
    src: {
      type: String,
      required: true,
      description: 'URL изображения логотипа'
    },
    alt: {
      type: String,
      default: 'Logo',
      description: 'Альтернативный текст для изображения'
    },
    width: {
      type: String,
      default: '50px',
      description: 'Размер логотипа (например, "100px")'
    },
    height: {
      type: String,
      default: '50px',
      description: 'Размер логотипа (например, "50px")'
    }
  });
  </script>
  
  <style scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo-image {
    object-fit: contain;
  }
  </style>
  