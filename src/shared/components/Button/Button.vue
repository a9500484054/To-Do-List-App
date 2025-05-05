<template>
    <button :class="buttonClass">
      <Icon v-if="icon" :icon="icon" class="button-icon" />
      <span v-if="label">{{ label }}</span>
    </button>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  import { Icon } from '@iconify/vue';
  
  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator(value) {
        return ['s', 'm', 'l'].includes(value);
      },
      default: 'm'
    }
  });
  
  // Вычисляемое свойство для динамического класса кнопки
  const buttonClass = computed(() => {
    return {
      'button': true,
      'button-primary': props.primary,
      [`button-${props.size}`]: true
    };
  });
  
  </script>
  
  <style scoped>
  .button {
    display: inline-flex;
    align-items: center;
    padding: 0.5em 1em;
    font-size: 1em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button-primary {
    background-color: #007bff;
    color: white;
  }
  
  .button-s {
    font-size: 0.75em;
    padding: 0.25em 0.5em;
  }
  
  .button-m {
    font-size: 1em;
    padding: 0.5em 1em;
  }
  
  .button-l {
    font-size: 1.25em;
    padding: 0.75em 1.5em;
  }
  
  .button-icon {
    margin-right: 0.5em;
  }
  </style>
  