<template>
  <div class="radio-group" :class="[sizeClass, { 'full-width': fullWidth }]">
    <label v-if="label" class="radio-group-label">{{ label }}</label>
    <div class="radio-options" :class="directionClass">
      <RadioButton
        v-for="option in options"
        :key="option.value"
        :id="`${name}-${option.value}`"
        :value="option.value"
        :name="name"
        :label="option.label"
        :checked="modelValue === option.value || option.defaultChecked"
        :size="size"
        @change="$emit('update:modelValue', option.value)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RadioButton } from '@/shared/components';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true,
    validator: (options) => options.every(opt => 
      opt.value && opt.label && typeof opt.defaultChecked === 'boolean'
    )
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue']);

const sizeClass = computed(() => `size-${props.size}`);
const directionClass = computed(() => `direction-${props.direction}`);
</script>

<style scoped>
.radio-group {
  margin-bottom: 1rem;
}

.radio-group.full-width {
  width: 100%;
}

.radio-group-label {
  display: block;
  margin-bottom: 0.5rem;
}

.radio-options {
  display: flex;
  gap: 1rem;
}

.radio-options.direction-horizontal {
  flex-direction: row;
}

.radio-options.direction-vertical {
  flex-direction: column;
  gap: 0.5rem;
}

/* Размеры для label группы */
.size-small .radio-group-label {
  font-size: 0.875rem;
}

.size-medium .radio-group-label {
  font-size: 1rem;
}

.size-large .radio-group-label {
  font-size: 1.125rem;
}
</style>