
<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-4">Список задач</h1>
        
        
        <Sidebar>
          
          <div class="d-flex justify-content-between align-items-center mb-4">
            <FilterTasks
              :current-filter="tasksStore.filter"
              :current-priority="tasksStore.priorityFilter"
              @filter-change="handleFilterChange"
              @priority-change="handlePriorityChange"
              @search="handleSearch"
            />
          </div>

        </Sidebar>
        
        <button 
          class="btn btn-primary"
          @click="showAddModal = true"
        >
          Добавить задачу
        </button>
        <TaskList
          :tasks="tasksStore.filteredTasks"
          @toggle="tasksStore.toggleTask"
          @edit="handleEditClick"
          @delete="handleDeleteTask"
        />

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
import FilterTasks from '@/features/filter-tasks/components/FilterTasks.vue';
import Sidebar from '@/widgets/Sidebar/Sidebar.vue';

const tasksStore = useTasksStore();
const showAddModal = ref(false);
const showEditModal = ref(false);
const editingTask = ref(null);

const handleAddTask = (task) => {
  tasksStore.addTask(task);
  showAddModal.value = false;
};

const handleEditTask = (task) => {
  tasksStore.editTask(task.id, task.title);
  showEditModal.value = false;
};

const handleDeleteTask = (id) => {
  if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
    tasksStore.deleteTask(id);
  }
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
</script>


<style scoped>
.container {
  max-width: 800px;
}
</style> 