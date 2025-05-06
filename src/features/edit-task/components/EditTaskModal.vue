<template>
  <div class="offcanvas offcanvas-end show pt-3" tabindex="-1" style="visibility: visible;">
    <div class="offcanvas-header d-flex justify-content-between align-items-center p-5">
      <h2 class="offcanvas-title" :style="{ fontSize: titleFontSize }">Редактировать задачу</h2>
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
            { value: 'Низкий', label: 'Низкий', defaultChecked: priority === 'Низкий' },
            { value: 'Средний', label: 'Средний', defaultChecked: priority === 'Средний' },
            { value: 'Высокий', label: 'Высокий', defaultChecked: priority === 'Высокий' }
          ]"
        />
      </div>
    </div>
    

    <div class="offcanvas-footer d-flex justify-content-around align-items-center p-5 ">
      <Button label="Отмена" outlined :size="inputSize" @click="$emit('close')" />
      <Button label="Сохранить" primary :size="inputSize" @click="handleSubmit" />
    </div>
  </div>
  
  <div class="offcanvas-backdrop show"></div>
</template> 


<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import { 
  TextField,
  RadioGroup,
  Button
} from '../../../shared/components';

const toast = useToast();

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'save']);

const title = ref(props.task.title);
const priority = ref(props.task.priority);
const titleFontSize = ref('1.5rem');
const inputSize = ref('large');

watch(() => props.task, (newTask) => {
  title.value = newTask.title;
  priority.value = newTask.priority;
});

const handleSubmit = () => {
  if (title.value.trim()) {
    emit('save', {
      id: props.task.id,
      title: title.value.trim(),
      priority: priority.value,
    });
    toast.success('Задача успешно отредактирована!', {
      position: 'top-right',
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false,
      transition: 'Vue-Toastification__bounce',
      maxToasts: 5,
      newestOnTop: true
    });
  }
};

const updateInputSize = () => {
  if (window.innerWidth < 768) {
    inputSize.value = 'medium';
  } else {
    inputSize.value = 'large';
  }
};

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
  width: 100% !important; 
}

.offcanvas-header {
  border-bottom: 1px solid #b6b6b6 !important;
}

@media(min-width: 768px) {
  .offcanvas {
    width: 35vw !important; 
  }
}

@media(min-width: 1024px) {
  .offcanvas {
    width: 35vw !important; 
  }
}
</style>