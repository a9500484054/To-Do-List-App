<template>
    <div class="checkbox">
      <input
        type="checkbox"
        :id="id"
        :checked="isChecked"
        class="checkbox-input"
        @change="onChange"
      />
      <label :for="id" class="checkbox-label">
        <slot>{{ label }}</slot>
      </label>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed } from 'vue';
  
  // Определяем пропсы, которые компонент принимает
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: () => `checkbox-${Math.random().toString(36).substr(2, 9)}`
    }
  });
  
  // Определяем события, которые компонент может испускать
  const emits = defineEmits(['update:modelValue']);
  
  // Вычисляемое свойство для проверки, установлен ли флажок
  const isChecked = computed(() => {
    return props.modelValue;
  });
  
  // Обработчик события изменения
  const onChange = (event) => {
    emits('update:modelValue', event.target.checked);
  };
  </script>
  
  <style scoped>
  .checkbox {
    display: flex;
    align-items: center;
  }
  
  .checkbox-input {
    margin-right: 0.5em;
  }
  
  .checkbox-label {
    font-size: 1em;
    color: #333;
    cursor: pointer;
  }
  </style>
  