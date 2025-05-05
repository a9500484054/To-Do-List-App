<template>
    <div class="search-field">
      <div class="search-icon">
        <Icon icon="mdi:magnify" />
      </div>
      <TextField
        v-model="searchQuery"
        :placeholder="placeholder"
        @keyup.enter="performSearch"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import { Icon } from '@iconify/vue';
  import { TextField } from '@/shared/components';
  
  // Определяем пропсы
  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Search...'
    }
  });
  
  // Определяем события
  const emits = defineEmits(['search']);
  
  // Локальное состояние для хранения запроса поиска
  const searchQuery = ref('');
  
  // Метод для выполнения поиска
  const performSearch = () => {
    emits('search', searchQuery.value);
  };
  </script>
  
  <style scoped>
  .search-field {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    background-color: #f0f0f0;
  }
  
  .search-icon .icon {
    width: 1.2em;
    height: 1.2em;
    color: #888;
  }
  
  .text-field-input {
    border: none;
  }
  </style>
  