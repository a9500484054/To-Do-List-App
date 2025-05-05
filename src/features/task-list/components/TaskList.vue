<script setup>
defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

defineEmits(['toggle', 'edit', 'delete']);
</script>

<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="alert alert-info">
      Задачи не найдены
    </div>
    
    <div v-else class="list-group">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="d-flex align-items-center">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              :checked="task.completed"
              @change="$emit('toggle', task.id)"
              :id="'task-' + task.id"
            />
            <label
              class="form-check-label"
              :for="'task-' + task.id"
              :class="{ 'text-decoration-line-through': task.completed }"
            >
              {{ task.title }}
            </label>
          </div>
          <span
            class="badge ms-2"
            :class="{
              'bg-danger': task.priority === 'high',
              'bg-warning': task.priority === 'medium',
              'bg-success': task.priority === 'low'
            }"
          >
            {{ task.priority }}
          </span>
        </div>
        
        <div class="btn-group">
          <button
            class="btn btn-sm btn-outline-primary"
            @click="$emit('edit', task)"
          >
            Редактировать
          </button>
          <button
            class="btn btn-sm btn-outline-danger"
            @click="$emit('delete', task.id)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  max-height: 500px;
  overflow-y: auto;
}

.list-group-item {
  transition: background-color 0.2s;
  padding: 1rem;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.form-check {
  margin-right: 1rem;
}

.form-check-input {
  width: 1.2em;
  height: 1.2em;
  margin-top: 0.2em;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.form-check-label {
  cursor: pointer;
  user-select: none;
}

.badge {
  font-size: 0.8em;
  padding: 0.5em 0.8em;
}

.btn-group {
  gap: 0.5rem;
}
</style> 