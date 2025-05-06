<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="alert alert-info">
      Задачи не найдены
    </div>

    <div v-else class="task-list__list">
      <div
        v-for="task in paginatedTasks"
        :key="task.id"
        class="task-list__item"
      >
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <div>
            <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center flex-grow-1 me-md-3">
              <Task
                :id="'task-' + task.id"
                :checked="task.completed"
                :label="task.title"
                @change="handleTaskToggle(task)"
                class="mb-2 mb-md-0 me-md-2"
              />
            </div>

            <div class="pt-2">
              <span
                class="badge align-self-start align-self-md-center"
                :class="{
                  'bg-danger': task.priority === 'Высокий',
                  'bg-warning': task.priority === 'Средний',
                  'bg-success': task.priority === 'Низкий'
                }"
              >
                {{ task.priority }}
              </span>
            </div>
          </div>
          <div class="btn-group mt-2 mt-md-0">
            <Button
              @click="$emit('edit', task)"
              icon="mdi:pencil"
              iconOnly
              class="d-flex justify-content-center"
            />
            <Button
              @click="$emit('delete', task.id)"
              icon="mdi:delete"
              iconOnly
              class="d-flex justify-content-center"
            />
          </div>
        </div>
      </div>
      
      <div v-if="hasMoreTasks" class="text-center mt-3">
        <Button
          @click="loadMore"
          label="Загрузить еще"
          outlined
          size="m"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Task, Button } from '../../../shared/components';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['toggle', 'edit', 'delete']);

const itemsPerPage = 10;
const currentPage = ref(1);

const paginatedTasks = computed(() => {
  const start = 0;
  const end = currentPage.value * itemsPerPage;
  return [...props.tasks].reverse().slice(start, end);
});

const hasMoreTasks = computed(() => {
  return props.tasks.length > currentPage.value * itemsPerPage;
});

const loadMore = () => {
  if (hasMoreTasks.value) {
    currentPage.value += 1;
  }
};

const handleTaskToggle = (task) => {
  emit('toggle', task.id);
  if (!task.completed) {
    toast.info(`Задача "${task.title}" возвращена в работу`, {
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
      newestOnTop: true,
      toastId: `task-${task.id}-returned`
    });
  } else {
    toast.success(`Задача "${task.title}" выполнена!`, {
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
      newestOnTop: true,
      toastId: `task-${task.id}-completed`
    });
  }
};

const handleScroll = () => {
  const bottomOfWindow = 
    document.documentElement.scrollTop + window.innerHeight >= 
    document.documentElement.scrollHeight - 100;

  if (bottomOfWindow && hasMoreTasks.value) {
    loadMore();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.alert {
  &-info {
    --bs-alert-color: #ff365f;
    --bs-alert-bg: #ff365e2f;
    --bs-alert-border-color: #ff365f;
    --bs-alert-link-color: #ff365f;
  }
}

.task-list {
  padding: 0;

  &__item {
    background-color: #f7f7f7;
    min-height: 71px;
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }
  }
}

.badge {
  font-size: 0.8em;
  padding: 0.5em 0.8em;
  flex-shrink: 0;
}

.btn-group {
  gap: 0.5rem;
  flex-shrink: 0;
}

@media (max-width: 767.98px) {
  .task-list {
    padding: 0;
  }
  
  .task-list__item {
    padding: 0.75rem;
  }

  .btn-group {
    width: 100%;

    button {
      flex-grow: 1;
    }
  }
}

@media (max-width: 480px) {
  .task-list__item {
    padding: 0.5rem;
  }

  .badge {
    font-size: 0.7em;
    padding: 0.4em 0.7em;
  }

  .btn-group {
    gap: 0.3rem;
  }
}
</style>
