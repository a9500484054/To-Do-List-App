<template>
    <div class="logo" :style="{ width: width, height: height }">
      <img
        v-if="!hideImage"
        :src="src"
        :alt="alt"
        class="logo-image"
        :style="{ width: '100%', height: '100%' }"
      />
      <span v-if="text" class="logo-text">{{ text }}</span>
    </div>
  </template>
  
<script setup>
  import { defineProps } from 'vue';
  
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
    },
    text: {
      type: String,
      default: '',
      description: 'Текст рядом с логотипом'
    },
    hideImage: {
      type: Boolean,
      default: false,
      description: 'Скрыть изображение логотипа'
    }
  });
</script>
  
<style scoped lang="scss">
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  .logo-image {
    object-fit: contain;
  }

  .logo-text {
    font-size: 1.2em;
    font-weight: 500;
    color: var(--primary-color);
  }
</style>
  