<template>
  <div class="filters-container">
    <div class="search-container mb-3">
      <div class="input-group">
        <TextField
          :size="inputSize"
          v-model="searchQuery"
          placeholder="Поиск задач..."
          @input="handleSearch"
          style="width: 100%;"
        />
      </div>
    </div>

    <div class="filters-row">
      <div class="filter-group">
        <h6 class="filter-title">Статус:</h6>
        <div class="checkbox-group">
          <Checkbox
            :size="inputSize"
            v-model="statusAll"
            label="Все"
            @update:modelValue="handleStatusAll"
          />
          <Checkbox
            :size="inputSize"
            v-model="statusActive"
            label="Активные"
            @update:modelValue="handleStatusChange('active', $event)"
          />
          <Checkbox
            :size="inputSize"
            v-model="statusCompleted"
            label="Завершенные"
            @update:modelValue="handleStatusChange('completed', $event)"
          />
        </div>
      </div>

      <div class="filter-group">
        <h6 class="filter-title">Приоритет:</h6>
        <div class="checkbox-group">
          <Checkbox
            :size="inputSize"
            v-model="priorityAll"
            label="Все"
            @update:modelValue="handlePriorityAll"
          />
          <Checkbox
            :size="inputSize"
            v-model="priorityHigh"
            label="Высокий"
            @update:modelValue="handlePriorityChange('Высокий', $event)"
          />
          <Checkbox
            :size="inputSize"
            v-model="priorityMedium"
            label="Средний"
            @update:modelValue="handlePriorityChange('Средний', $event)"
          />
          <Checkbox
            :size="inputSize"
            v-model="priorityLow"
            label="Низкий"
            @update:modelValue="handlePriorityChange('Низкий', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  import { TextField, Checkbox } from '@/shared/components';

  const props = defineProps({
    currentFilter: {
      type: String,
      required: true,
    },
    currentPriority: {
      type: String,
      required:true,
    },
  });

  const emit = defineEmits(['filter-change', 'priority-change', 'search']);

  const searchQuery = ref('');

  const statusAll = ref(props.currentFilter === 'all');
  const statusActive = ref(props.currentFilter === 'active');
  const statusCompleted = ref(props.currentFilter === 'completed');

  const priorityAll = ref(props.currentPriority === 'all');
  const priorityHigh = ref(props.currentPriority === 'Высокий');
  const priorityMedium = ref(props.currentPriority === 'Средний');
  const priorityLow = ref(props.currentPriority === 'Низкий');

  const inputSize = ref('large');

  const handleSearch = () => {
    emit('search', searchQuery.value);
  };

  const handleStatusAll = (checked) => {
    if (checked) {
      statusActive.value = false;
      statusCompleted.value = false;
      emit('filter-change', 'all');
    } else if (!statusActive.value && !statusCompleted.value) {
      statusActive.value = true;
      emit('filter-change', 'active');
    }
  };

  const handleStatusChange = (type, checked) => {
    if (!checked) {
      if (!statusActive.value && !statusCompleted.value) {
        statusAll.value = true;
        emit('filter-change', 'all');
      }
    } else {
      statusAll.value = false;
      if (type === 'active') {
        statusCompleted.value = false;
      } else {
        statusActive.value = false;
      }
      emit('filter-change', type);
    }
  };

  const handlePriorityAll = (checked) => {
    if (checked) {
      priorityHigh.value = false;
      priorityMedium.value = false;
      priorityLow.value = false;
      emit('priority-change', 'all');
    } else if (!priorityHigh.value && !priorityMedium.value && !priorityLow.value) {
      priorityHigh.value = true;
      emit('priority-change', 'Высокий');
    }
  };

  const handlePriorityChange = (type, checked) => {
    if (!checked) {
      if (!priorityHigh.value && !priorityMedium.value && !priorityLow.value) {
        priorityAll.value = true;
        emit('priority-change', 'all');
      }
    } else {
      priorityAll.value = false;
      emit('priority-change', type);
    }
  };

  const checkScreenSize = () => {
    if (window.innerWidth < 768) {
      inputSize.value = 'medium';
    } else {
      inputSize.value = 'large';
    }
  };

  watch(() => props.currentFilter, (newVal) => {
    statusAll.value = newVal === 'all';
    statusActive.value = newVal === 'active';
    statusCompleted.value = newVal === 'completed';
  });

  watch(() => props.currentPriority, (newVal) => {
    priorityAll.value = newVal === 'all';
    priorityHigh.value = newVal === 'Высокий';
    priorityMedium.value = newVal === 'Средний';
    priorityLow.value = newVal === 'Низкий';
  });

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
  });
</script>

<style scoped>
  .filters-container {
    width: 100%;
  }

  .filters-row {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-title {
    margin: 0;
    font-weight: 500;
    font-size: 1rem;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    .filters-row {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .filter-group {
      min-width: 45%;
    }

    .filter-title {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .filters-row {
      flex-direction: column;
      gap: 1rem;
    }

    .filter-group {
      width: 100%;
    }

    .checkbox-group {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .checkbox-group :deep(.checkbox-wrapper) {
      margin-right: 10px;
      margin-bottom: 5px;
    }
  }
</style>
