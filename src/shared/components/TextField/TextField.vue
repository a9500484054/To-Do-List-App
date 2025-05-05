<template>
    <div class="text-field">
      <label v-if="label" :for="id" class="text-field-label">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="text-field-input"
        @input="onInput"
      />
      <span v-if="error" class="text-field-error">{{ error }}</span>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  // Определяем пропсы, которые компонент принимает
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: () => `text-field-${Math.random().toString(36).substr(2, 9)}`
    }
  });
  
  // Определяем события, которые компонент может испускать
  const emits = defineEmits(['update:modelValue']);
  
  // Обработчик события ввода
  const onInput = (event) => {
    emits('update:modelValue', event.target.value);
  };
  </script>
  
  <style scoped>
  .text-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }
  
  .text-field-label {
    margin-bottom: 0.5em;
    font-size: 1em;
    color: #333;
  }
  
  .text-field-input {
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .text-field-input:focus {
    border-color: #007bff;
  }
  
  .text-field-input:disabled {
    background-color: #f9f9f9;
  }
  
  .text-field-error {
    margin-top: 0.5em;
    font-size: 0.875em;
    color: #e74c3c;
  }
  </style>