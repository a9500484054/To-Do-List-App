<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-4 settings-title">Настройки</h1>
        <Card title="Внешний вид" class="mb-4">
          <div class="settings-group">
            <div class="settings-item">
              <div class="settings-label">
                <span>Тема</span>
                <span class="settings-value">{{ theme === 'light' ? 'Светлая' : 'Темная' }}</span>
              </div>
              <div class="theme-switch" @click="toggleTheme">
                <div class="theme-switch__track" :class="{ 'theme-switch__track--active': theme === 'dark' }">
                  <div class="theme-switch__thumb" :class="{ 'theme-switch__thumb--active': theme === 'dark' }">
                    <i :class="theme === 'light' ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="theme-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Язык" class="mb-4">
          <div class="settings-group">
            <div class="settings-item">
              <div class="settings-label">
                <span>Язык интерфейса</span>
                <span class="settings-value">Русский</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Импорт/Экспорт">
          <div class="settings-group">
            <div class="settings-item">
              <div class="settings-label">
                <span>Экспорт задач</span>
                <span class="settings-description">Скачайте все задачи в JSON формате</span>
              </div>
              <button class="settings-button" @click="handleExport">
                <i class="mdi:download"></i>
                Экспорт
              </button>
            </div>
            
            <div class="settings-item">
              <div class="settings-label">
                <span>Импорт задач</span>
                <span class="settings-description">Загрузите задачи из JSON файла</span>
              </div>
              <div class="file-upload">
                <input
                  type="file"
                  class="file-input"
                  accept=".json"
                  @change="handleImport"
                  id="file-upload"
                />
                <label for="file-upload" class="settings-button">
                  <i class="mdi:upload"></i>
                  Импорт
                </label>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTasksStore } from '@/app/store/tasks';
import Card from '@/shared/components/Card/Card.vue';

const tasksStore = useTasksStore();
const theme = ref(localStorage.getItem('theme') || 'light');

const toggleTheme = () => {
  const newTheme = theme.value === 'light' ? 'dark' : 'light';
  theme.value = newTheme;
  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
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

<style scoped>
  .container {
    padding-top: 80px;
  }

  h1 {
    color: var(--text-color);
  }

  .settings-group {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }

  .settings-label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .settings-value {
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.7;
  }

  .settings-description {
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.7;
  }

  .theme-switch {
    cursor: pointer;
    padding: 0.25rem;
  }

  .theme-switch__track {
    width: 60px;
    height: 30px;
    background-color: var(--border-color);
    border-radius: 15px;
    position: relative;
    transition: all 0.3s ease;
  }

  .theme-switch__track--active {
    background-color: var(--primary-color);
  }

  .theme-switch__thumb {
    width: 26px;
    height: 26px;
    background-color: var(--bg-color);
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-switch__thumb--active {
    transform: translateX(30px);
  }

  .theme-icon {
    font-size: 1rem;
    color: var(--text-color);
  }

  .settings-select {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--card-bg);
    color: var(--text-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  .settings-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .settings-button:hover {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
  }

  .file-upload {
    position: relative;
  }

  .file-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  @media (max-width: 768px) {
    .settings-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .settings-button {
      width: 100%;
      justify-content: center;
    }
  }
</style> 