<template>
  <div class="card">
    <div class="card-body" :class="{ 'card-body--scrollable': scrollable }">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
    description: 'Заголовок карточки'
  },
  scrollable: {
    type: Boolean,
    default: false,
    description: 'Включить скролл для содержимого'
  },
  maxHeight: {
    type: String,
    default: '300px',
    description: 'Максимальная высота для скролла'
  }
});
</script> 

<style scoped lang="scss">
  .card {
    width: 100%;
    background-color: #fff;
    border-radius: 18px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    overflow: hidden;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &-body {
      padding: 1.5rem;

      &--scrollable {
        max-height: v-bind(maxHeight);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color) rgba(0, 0, 0, 0.1);

        &::-webkit-scrollbar {
          width: 6px;
        }

        &::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: var(--primary-color);
          border-radius: 3px;
        }
      }
    }

    &-title {
      margin: 0 0 1rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color);
    }
  }
</style>