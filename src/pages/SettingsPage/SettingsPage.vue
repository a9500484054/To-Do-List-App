<script setup>
import { ref } from 'vue';
import { useTasksStore } from '@/app/store/tasks';

const tasksStore = useTasksStore();
const theme = ref(localStorage.getItem('theme') || 'light');
const language = ref(localStorage.getItem('language') || 'ru');

const handleThemeChange = (newTheme) => {
  theme.value = newTheme;
  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
};

const handleLanguageChange = (newLanguage) => {
  language.value = newLanguage;
  localStorage.setItem('language', newLanguage);
};

const handleExport = () => {
  const data = tasksStore.exportTasks();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tasks.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const handleImport = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const success = tasksStore.importTasks(e.target.result);
      if (success) {
        alert('Задачи успешно импортированы');
      } else {
        alert('Ошибка при импорте задач');
      }
    };
    reader.readAsText(file);
  }
};
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-4">Настройки</h1>
        
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Внешний вид</h5>
            <div class="mb-3">
              <label class="form-label">Тема</label>
              <select class="form-select" v-model="theme" @change="handleThemeChange">
                <option value="light">Светлая</option>
                <option value="dark">Темная</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Язык</h5>
            <div class="mb-3">
              <select class="form-select" v-model="language" @change="handleLanguageChange">
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Импорт/Экспорт</h5>
            <div class="d-flex gap-2">
              <button class="btn btn-primary" @click="handleExport">
                Экспорт задач
              </button>
              <input
                type="file"
                class="form-control"
                accept=".json"
                @change="handleImport"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 