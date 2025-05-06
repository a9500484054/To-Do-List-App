<template>
  <div class="offcanvas offcanvas-end show pt-3" tabindex="-1" style="visibility: visible;">
    <div class="offcanvas-header d-flex justify-content-between align-items-center p-5">
      <h2 class="offcanvas-title" :style="{ fontSize: titleFontSize }">Добавить новую задачу</h2>
      <Button
        icon="mdi:close"
        :size="inputSize"
        iconOnly
        @click="$emit('close')"/>
    </div>

    <div class="offcanvas-body p-5">
      <div class="mb-3">
        <TextField
          :size="inputSize"
          v-model="title"
          label="Название задачи"
          placeholder="Введите наименование задачи"
          @keyup.enter="handleSubmit"
        />
      </div>

      <div class="mb-3">
        <RadioGroup
          v-model="priority"
          label="Приоритет"
          name="priority"
          :size="inputSize"
          :options="[
            { value: 'Низкий', label: 'Низкий', defaultChecked: true },
            { value: 'Средний', label: 'Средний', defaultChecked: false },
            { value: 'Высокий', label: 'Высокий', defaultChecked: false }
          ]"
        />
      </div>
    </div>

    <div class="offcanvas-footer d-flex justify-content-around align-items-center p-5">
      <Button label="Отмена" outlined :size="inputSize" @click="$emit('close')" />
      <Button label="Сохранить" primary :size="inputSize" @click="handleSubmit" />
    </div>
  </div>

  <div class="offcanvas-backdrop show"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  TextField,
  RadioGroup,
  Button
} from '../../../shared/components';

const emit = defineEmits(['close', 'save']);

const title = ref('');
const priority = ref('Низкий');
const titleFontSize = ref('1.5rem');

// Реактивная переменная для управления размером
const inputSize = ref('large');

const handleSubmit = () => {
  if (title.value.trim()) {
    emit('save', {
      title: title.value.trim(),
      priority: priority.value,
    });
    title.value = '';
    priority.value = 'Низкий';
  }
};

// Функция для обновления размера в зависимости от ширины экрана
const updateInputSize = () => {
  if (window.innerWidth < 768) {
    inputSize.value = 'medium';
  } else {
    inputSize.value = 'large';
  }
};

// Обновление размера при монтировании компонента и изменении размера окна
onMounted(() => {
  updateInputSize();
  window.addEventListener('resize', updateInputSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateInputSize);
});
</script>


<style scoped>
.offcanvas {
  width: 90vw; /* Default width for mobile devices */
  width: 100% !important; /* Maximum width for larger screens */
}

.offcanvas-header {
  border-bottom: 1px solid #b6b6b6 !important;
}

@media (min-width: 768px) {
  .offcanvas {
    width: 35vw !important; /* Adjust width for larger screens */
  }
}

@media (min-width: 1024px) {
  .offcanvas {
    width: 35vw !important; /* Further adjust width for even larger screens */
  }
}
</style>
