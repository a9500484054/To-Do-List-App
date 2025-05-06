<template>
  <div class="offcanvas offcanvas-end show pt-3" tabindex="-1" style="visibility: visible;">
    <div class="offcanvas-header d-flex justify-content-between align-items-center p-5">
      <h2 class="offcanvas-title">Добавить новую задачу</h2>
      <Button 
        icon="mdi:close" 
        size='xl'
        iconOnly
        @click="$emit('close')"/>
    </div>
    
    <div class="offcanvas-body p-5">
      <div class="mb-3">
        <TextField 
          size="large"
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
          size="large"
          :options="[
            { value: 'Низкий', label: 'Низкий', defaultChecked: true },
            { value: 'Средний', label: 'Средний', defaultChecked: false },
            { value: 'Высокий', label: 'Высокий', defaultChecked: false }
          ]"
        />
      </div>
    </div>
    
    <div class="offcanvas-footer d-flex justify-content-around align-items-center p-5 ">
      <Button label="Отмена" outlined size="xl" @click="$emit('close')" />
      <Button label="Сохранить" primary size="xl" @click="handleSubmit" />
    </div>
  </div>
  
  <div class="offcanvas-backdrop show"></div>
</template>


<script setup>
import { ref } from 'vue';
import { 
  TextField,
  RadioGroup,
  Button
} from '../../../shared/components';

const emit = defineEmits(['close', 'save']);

const title = ref('');
const priority = ref('Низкий');

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
</script>

<style scoped>

.offcanvas {
  width: 35vw !important;
  /* color: #b6b6b6; */
}

.offcanvas-header {
  border-bottom: 1px solid #b6b6b6 !important;
}

</style>