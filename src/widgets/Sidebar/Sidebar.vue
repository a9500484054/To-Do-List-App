<template>
  <aside class="sidebar" :class="{ 'sidebar-mobile': isMobile }">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <FilterTasks
        :current-filter="currentFilter"
        :current-priority="currentPriority"
        @filter-change="$emit('filter-change', $event)"
        @priority-change="$emit('priority-change', $event)"
        @search="$emit('search', $event)"
      />
    </div>
  </aside>
</template>

<script setup>
import FilterTasks from '@/features/filter-tasks/components/FilterTasks.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps({
  currentFilter: {
    type: String,
    required: true
  },
  currentPriority: {
    type: String,
    required: true
  }
});

defineEmits(['filter-change', 'priority-change', 'search']);

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.sidebar {
  position: fixed;
  max-width: 18vw;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  height: 100vh;
  top: 0;
  left: 0;
  overflow-y: auto;
  padding-top: 120px;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.sidebar-mobile {
  max-width: 100%;
  height: auto;
  padding-top: 80px;
  padding-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar-mobile {
    transform: translateX(0);
    position: fixed;
    width: 100%;
    height: auto;
    bottom: 0;
    top: auto;
    padding: 15px;
    border-top: 1px solid #eee;
  }
}
</style>