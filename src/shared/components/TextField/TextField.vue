<template>
  <div class="text-field" :class="[sizeClass, { 'full-width': fullWidth }]">
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
import { defineProps, defineEmits, computed } from 'vue';

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
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:modelValue']);

const onInput = (event) => {
  emits('update:modelValue', event.target.value);
};

const sizeClass = computed(() => `size-${props.size}`);
</script>

<style scoped>
.text-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.text-field.full-width {
  width: 100%;
}

.text-field-label {
  margin-bottom: 0.5em;
  color: #333;
}

.text-field-input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;
}

.size-small .text-field-input {
  font-size: 0.875em;
  padding: 0.375em 0.5em;
}

.size-medium .text-field-input {
  font-size: 1em;
  padding: 0.5em;
}

.size-large .text-field-input {
  font-size: 1.25em;
  padding: 0.75em;
}

.size-small .text-field-label {
  font-size: 0.875em;
}

.size-medium .text-field-label {
  font-size: 1em;
}

.size-large .text-field-label {
  font-size: 1.125em;
}

/* Измененные стили с новым цветом */
.text-field-input:focus {
  border-color: #ff365f;
  box-shadow: 0 0 0 2px rgba(255, 54, 95, 0.2);
}

.text-field-input:disabled {
  background-color: #f9f9f9;
  opacity: 0.7;
}

.text-field-error {
  margin-top: 0.5em;
  font-size: 0.875em;
  color: #ff365f;
}

.text-field-input:hover:not(:disabled) {
  border-color: #b3b3b3;
}

.text-field-input:active:not(:disabled) {
  border-color: #ff365f;
}
</style>