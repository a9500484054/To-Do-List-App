<template>
  <label
    :for="id"
    :class="{ 'text-decoration-line-through': checked }"
    class="custom-checkbox"
  >
    <input
      :checked="checked"
      @change="$emit('change', $event)"
      :id="id"
      type="checkbox"
    >
    <span class="checkmark"></span>
    <span class="task-title">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
});

defineEmits(['change']);
</script>

<style scoped lang="scss">
.custom-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  min-width: 0;
}

.custom-checkbox input {
  display: none;
}

.checkmark {
  display: inline-block;
  width: 2em;
  height: 2em;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s;
  flex-shrink: 0;
}

.custom-checkbox:hover .checkmark {
  border-color: #888;
}

.custom-checkbox input:checked + .checkmark {
  background-color: #7dedba;
  border-color: #7dedba;
}

.custom-checkbox input:checked + .checkmark::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1em;
  font-weight: bold;
}

.checkmark::after {
  opacity: 0;
  transition: opacity 0.2s;
}

.custom-checkbox input:checked + .checkmark::after {
  opacity: 1;
}

.task-title {
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  font-size: 1.2em;
}

@media (max-width: 600px) {
  .checkmark {
    width: 1.5em;
    height: 1.5em;
  }

  .task-title {
    font-size: 1em;
  }
}
</style>
