<script setup>
import { ref } from 'vue';

const props = defineProps({
  currentFilter: {
    type: String,
    required: true,
  },
  currentPriority: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['filter-change', 'priority-change', 'search']);

const searchQuery = ref('');

const handleSearch = () => {
  emit('search', searchQuery.value);
};

const handleFilterChange = (filter) => {
  emit('filter-change', filter);
};

const handlePriorityChange = (priority) => {
  emit('priority-change', priority);
};
</script>

<template>
  <div class="filters-container">
    <div class="search-container mb-3">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Поиск задач..."
          v-model="searchQuery"
          @input="handleSearch"
        />
      </div>
    </div>
    
    <div class="filters-row">
      <div class="filter-group">
        <h6 class="filter-title">Статус:</h6>
        <div class="btn-group">
          <button
            class="btn"
            :class="currentFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'"
            @click="handleFilterChange('all')"
          >
            Все
          </button>
          <button
            class="btn"
            :class="currentFilter === 'active' ? 'btn-primary' : 'btn-outline-primary'"
            @click="handleFilterChange('active')"
          >
            Активные
          </button>
          <button
            class="btn"
            :class="currentFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'"
            @click="handleFilterChange('completed')"
          >
            Завершенные
          </button>
        </div>
      </div>
      
      <div class="filter-group">
        <h6 class="filter-title">Приоритет:</h6>
        <div class="btn-group">
          <button
            class="btn"
            :class="currentPriority === 'all' ? 'btn-primary' : 'btn-outline-primary'"
            @click="handlePriorityChange('all')"
          >
            Все
          </button>
          <button
            class="btn"
            :class="currentPriority === 'high' ? 'btn-danger' : 'btn-outline-danger'"
            @click="handlePriorityChange('high')"
          >
            Высокий
          </button>
          <button
            class="btn"
            :class="currentPriority === 'medium' ? 'btn-warning' : 'btn-outline-warning'"
            @click="handlePriorityChange('medium')"
          >
            Средний
          </button>
          <button
            class="btn"
            :class="currentPriority === 'low' ? 'btn-success' : 'btn-outline-success'"
            @click="handlePriorityChange('low')"
          >
            Низкий
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters-container {
  width: 100%;
}

.filters-row {
  /* display: flex;
  flex-direction: column;
  gap: 1rem; */
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-title {
  margin: 0;
  font-weight: 500;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .filters-row {
    flex-direction: row;
    align-items: center;
  }
  
  .filter-group {
    flex: 1;
  }
}
</style> 