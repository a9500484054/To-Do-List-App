// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './app/router';
import { createPinia } from 'pinia';
import './app/styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт стилей Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Импорт JavaScript Bootstrap (опционально)

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');


// ├── app/
// |   # Слой композиции приложения
// |   # Содержит только абстрактную логику инициализации и статические ресурсы

// ├── processes/
// |   # Срезы, реализующие потоки задач, не зависящие от страниц
// |   ├── task-management
// |   # Управление задачами, включая создание, редактирование, удаление задач

// ├── pages/
// |   # Срезы, реализующие полные представления для этого приложения
// |   ├── todo-list
// |   # Основная страница списка задач
// |   ├── task-details
// |   # Страница с деталями конкретной задачи

// ├── widgets/
// |   # Срезы, реализующие различные комбинации абстрактных и/или бизнес-блоков
// |   ├── header
// |   ├── sidebar
// |   ├── footer
// |   ├── modal-window
// |   # Виджеты для отображения модальных окон

// ├── features/
// |   # Срезы, реализующие пользовательские сценарии
// |   ├── add-task
// |   # Функциональность добавления новой задачи
// |   ├── edit-task
// |   # Функциональность редактирования задачи
// |   ├── delete-task
// |   # Функциональность удаления задачи

// ├── entities/
// |   # Срезы, реализующие бизнес-блоки
// |   ├── task
// |   # Сущность задачи, включая модель данных и бизнес-логику

// ├── shared/
// |   # Набор абстрактных сегментов
// |   # Здесь могут находиться утилиты, UI компоненты и другие общие элементы













// src/
// ├── main.js               # Точка входа приложения
// ├── App.vue               # Корневой компонент приложения
// ├── shared/
// │   ├── components/
// │   │   ├── BaseButton.vue
// │   │   ├── BaseModal.vue
// │   │   └── index.js      # Публичный API для UI компонентов
// │   └── utils/
// │       ├── dateHelpers.js
// │       └── index.js      # Публичный API для утилит
// ├── entities/
// │   ├── task/
// │   │   ├── TaskModel.js  # Модель задачи
// │   │   └── index.js      # Публичный API для задачи
// ├── features/
// │   ├── add-task/
// │   │   ├── components/
// │   │   │   └── AddTaskModal.vue
// │   │   ├── composables/
// │   │   │   └── useAddTask.js
// │   │   └── index.js      # Публичный API для добавления задачи
// │   ├── edit-task/
// │   │   ├── components/
// │   │   │   └── EditTaskModal.vue
// │   │   ├── composables/
// │   │   │   └── useEditTask.js
// │   │   └── index.js      # Публичный API для редактирования задачи
// │   ├── task-list/
// │   │   ├── components/
// │   │   │   └── TaskList.vue
// │   │   ├── composables/
// │   │   │   └── useTaskList.js
// │   │   └── index.js      # Публичный API для списка задач
// │   └── filter-tasks/
// │       ├── components/
// │       │   └── FilterTasks.vue
// │       ├── composables/
// │       │   └── useFilterTasks.js
// │       └── index.js      # Публичный API для фильтрации задач
// ├── widgets/
// │   ├── sidebar/
// │   │   ├── components/
// │   │   │   └── Sidebar.vue
// │   │   └── index.js      # Публичный API для боковой панели
// │   ├── header/
// │   │   ├── components/
// │   │   │   └── Header.vue
// │   │   └── index.js      # Публичный API для верхней панели
// │   └── main/
// │       ├── components/
// │       │   └── Main.vue
// │       └── index.js      # Публичный API для основной области
// └── pages/
//     ├── TodoPage/
//     │   ├── components/
//     │   │   └── TodoPage.vue
//     │   └── index.js      # Публичный API для страницы "Список дел" 