<template>
  <div class="checkbox" :class="size">
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
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

const emits = defineEmits(['update:modelValue']);

const isChecked = computed(() => {
  return props.modelValue;
});

const onChange = (event) => {
  emits('update:modelValue', event.target.checked);
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.checkbox-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  width: 1em;
  height: 1em;
  border: 2px solid #ccc;
  border-radius: 0.15em;
  display: grid;
  place-content: center;
  cursor: pointer;
  transition: all 0.1s ease;
}

.checkbox-input::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: transform 0.1s ease;
  box-shadow: inset 1em 1em var(--primary-color, #ff365f);
  border-radius: 0.05em;
}

.checkbox-input:checked {
  background-color: white;
  border-color: var(--primary-color, #ff365f);
}

.checkbox-input:checked::before {
  transform: scale(1);
}

.checkbox-input:focus {
  outline: 2px solid var(--primary-color, #ff365f);
  outline-offset: 2px;
}

.checkbox-label {
  font-size: 1em;
  color: #333;
  cursor: pointer;
  user-select: none;
}

.checkbox.small .checkbox-input {
  width: 0.8em;
  height: 0.8em;
}

.checkbox.small .checkbox-input::before {
  width: 0.5em;
  height: 0.5em;
}

.checkbox.small .checkbox-label {
  font-size: 0.8em;
}

.checkbox.medium .checkbox-input {
  width: 1em;
  height: 1em;
}

.checkbox.medium .checkbox-input::before {
  width: 0.65em;
  height: 0.65em;
}

.checkbox.large .checkbox-input {
  width: 1.2em;
  height: 1.2em;
}

.checkbox.large .checkbox-input::before {
  width: 0.8em;
  height: 0.8em;
}

.checkbox.large .checkbox-label {
  font-size: 1.2em;
}
</style>