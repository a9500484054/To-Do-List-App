<template>
    <div class="radio">
      <input
        type="radio"
        :id="id"
        :name="name"
        :value="value"
        :checked="isChecked"
        class="radio-input"
        @change="onChange"
      />
      <label :for="id" class="radio-label">
        <slot>{{ label }}</slot>
      </label>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed } from 'vue';
  
  // Определяем пропсы, которые компонент принимает
  const props = defineProps({
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'radio-group'
    },
    id: {
      type: String,
      default: () => `radio-${Math.random().toString(36).substr(2, 9)}`
    }
  });
  
  // Определяем события, которые компонент может испускать
  const emits = defineEmits(['update:modelValue']);
  
  // Вычисляемое свойство для проверки, выбрана ли радиокнопка
  const isChecked = computed(() => {
    return props.modelValue === props.value;
  });
  
  // Обработчик события изменения
  const onChange = (event) => {
    if (event.target.checked) {
      emits('update:modelValue', props.value);
    }
  };
  </script>
  
  <style scoped>
  .radio {
    display: flex;
    align-items: center;
  }
  
  .radio-input {
    margin-right: 0.5em;
  }
  
  .radio-label {
    font-size: 1em;
    color: #333;
    cursor: pointer;
  }
  </style>
  