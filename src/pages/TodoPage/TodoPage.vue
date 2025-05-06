
<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">

        <Sidebar
          :current-filter="tasksStore.filter"
          :current-priority="tasksStore.priorityFilter"
          @filter-change="handleFilterChange"
          @priority-change="handlePriorityChange"
          @search="handleSearch"
        />
        
        <Card>
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center" style="padding: 20px;">
            <div class="h4 p-0">Сделано дел: {{ completedTasks }} из {{ totalTasks }}</div>
            <div class="mt-3 mt-md-0">
              <Button
                @click="showAddModal = true"
                label="Добавить задачу"
                icon="mdi:plus"
                outlined
                size="m"
                class="btn-responsive"
              />
            </div>
          </div>
  
          <TaskList
            :tasks="tasksStore.filteredTasks"
            @toggle="tasksStore.toggleTask"
            @edit="handleEditClick"
            @delete="handleDeleteTask"
          />
        </Card>

        <AddTaskModal
          v-if="showAddModal"
          @close="showAddModal = false"
          @save="handleAddTask"
        />

        <EditTaskModal
          v-if="showEditModal"
          :task="editingTask"
          @close="showEditModal = false"
          @save="handleEditTask"
        />

        <DeleteTaskModal
          v-if="showDeleteModal"
          :show="showDeleteModal"
          @close="showDeleteModal = false"
          @confirm="confirmDeleteTask"
        />

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTasksStore } from '@/app/store/tasks';
import AddTaskModal from '@/features/add-task/components/AddTaskModal.vue';
import EditTaskModal from '@/features/edit-task/components/EditTaskModal.vue';
import TaskList from '@/features/task-list/components/TaskList.vue';
import Sidebar from '@/widgets/Sidebar/Sidebar.vue';
import DeleteTaskModal from '@/features/delete-task/components/DeleteTaskModal.vue';
import { Card, Button} from '@/shared/components'

const tasksStore = useTasksStore();
const showAddModal = ref(false);
const showEditModal = ref(false);
const editingTask = ref(null);


// Вычисляемые свойства для счетчиков задач
const totalTasks = computed(() => tasksStore.tasks.length);
const completedTasks = computed(() => tasksStore.tasks.filter(task => task.completed).length);

const handleAddTask = (task) => {
  tasksStore.addTask(task);
  showAddModal.value = false;
};

const handleEditTask = (task) => {
  tasksStore.editTask(task.id, task.title, task.priority);
  showEditModal.value = false;
};


const handleEditClick = (task) => {
  editingTask.value = task;
  showEditModal.value = true;
};

const handleFilterChange = (filter) => {
  tasksStore.setFilter(filter);
};

const handlePriorityChange = (priority) => {
  tasksStore.setPriorityFilter(priority);
};

const handleSearch = (query) => {
  tasksStore.setSearchQuery(query);
};



const showDeleteModal = ref(false);
const deletingTaskId = ref(null);

const handleDeleteTask = (id) => {
  deletingTaskId.value = id;
  showDeleteModal.value = true;
};

const confirmDeleteTask = () => {
  console.log('Deleting task:', deletingTaskId.value);
  tasksStore.deleteTask(deletingTaskId.value);
  showDeleteModal.value = false;
  deletingTaskId.value = null;
};

</script>


<style scoped>
.container {
  max-width: 1140px;
}
</style> 


<style scoped>
/* Анимация для offcanvas (выезжает справа) */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}


  
</style>
<!-- 
<style scoped>
.container {
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.h4 {
  font-size: 1.5rem;
}

@media (max-width: 767.98px) {
  .h4 {
    font-size: 1.25rem;
  }

  .btn-responsive {
    width: 100%;
  }
}

/* Анимация для offcanvas (выезжает справа) */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style> -->
