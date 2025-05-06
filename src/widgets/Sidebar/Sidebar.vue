<template>
  <div>
     <div class="sidebar-toggle-button">
       <Button
         v-if="isMobile"
         icon="mdi:filter"
         @click="toggleSidebar"
         aria-label="Открыть сайдбар"
         primary
         size="s"
       />
     </div>

    <aside class="sidebar" :class="{ 'sidebar-mobile': isMobile, 'sidebar-open': isSidebarOpen }">
      <div class="d-flex justify-content-end py-2" v-if="isMobile">
        <Button
          icon="mdi:close"
          :size="inputSize"
          iconOnly
          @click="toggleSidebar"/>
      </div>
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
  </div>
</template>

<script setup>
import FilterTasks from '@/features/filter-tasks/components/FilterTasks.vue';
import { Button } from '@/shared/components';
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
const isSidebarOpen = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) {
    isSidebarOpen.value = true; 
  }
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
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
  max-width: 300px;
  width: 100%;
  background-color: var(--sidbar-bg-color);
  padding: 20px;
  height: 100vh;
  top: 0;
  left: 0;
  overflow-y: auto;
  padding-top: 120px;
  transition: transform 0.3s ease;
  transform: translateX(-100%); 
  z-index: 60;  
}

.sidebar-mobile {
  max-width: 100%;
  height: auto;
  padding-top: 80px;
  padding-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sidebar-open {
  transform: translateY(0) !important; 
  bottom: 0px !important;
  z-index: 60;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateY(100%); 
  }

  .sidebar-mobile {
    position: fixed;
    width: 100%;
    height: auto;
    bottom: 0;
    top: auto;
    padding: 15px;
    border-top: 1px solid #eee;
  }

  .sidebar-toggle-button svg {
    fill: #ff365f;

  }
  .sidebar-toggle-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 1001;
  }
}
</style>
