<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'save']);

const title = ref(props.task.title);
const priority = ref(props.task.priority);

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
  }
};
</script>

<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Редактировать задачу</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        
        <div class="modal-body">
          <div class="mb-3">
            <label for="editTaskTitle" class="form-label">Название задачи</label>
            <input
              type="text"
              class="form-control"
              id="editTaskTitle"
              v-model="title"
              @keyup.enter="handleSubmit"
            />
          </div>
          
          <div class="mb-3">
            <label for="editTaskPriority" class="form-label">Приоритет</label>
            <select class="form-select" id="editTaskPriority" v-model="priority">
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            Отмена
          </button>
          <button type="button" class="btn btn-primary" @click="handleSubmit">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal-backdrop show"></div>
</template> 