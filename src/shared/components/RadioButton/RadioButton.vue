<template>
  <div class="radio-button" :class="sizeClass">
    <input
      type="radio"
      :id="id"
      :value="value"
      :name="name"
      :checked="checked"
      @change="$emit('change', value)"
      class="radio-input"
    />
    <label :for="id" class="radio-label">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

const emit = defineEmits(['change']);

const sizeClass = computed(() => `size-${props.size}`);
</script>

<style scoped>
.radio-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.radio-input {
  margin: 0;
  cursor: pointer;
  /* Стилизация радио-кнопки */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 50%;
  outline: none;
  transition: all 0.2s ease;
}

.radio-input:checked {
  border-color: #ff365f;
  background: radial-gradient(#ff365f 0%, #ff365f 40%, transparent 50%, transparent);
}

.radio-input:focus {
  box-shadow: 0 0 0 2px rgba(255, 54, 95, 0.2);
}

.radio-label {
  cursor: pointer;
  color: inherit;
}

/* Размеры */
.size-small .radio-label {
  font-size: 0.875rem;
}

.size-medium .radio-label {
  font-size: 1rem;
}

.size-large .radio-label {
  font-size: 1.125rem;
}

.size-small .radio-input {
  width: 14px;
  height: 14px;
}

.size-medium .radio-input {
  width: 16px;
  height: 16px;
}

.size-large .radio-input {
  width: 18px;
  height: 18px;
}
</style>