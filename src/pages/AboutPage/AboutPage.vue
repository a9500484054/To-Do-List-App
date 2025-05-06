<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <!-- <h1 class="mb-4">О приложении</h1> -->
        
        <Card 
          title="GameSport To-Do List App"
          :scrollable="true"
          max-height="600px"
        >
          <p class="card-text">
            Приложение для управления задачами, разработанное с использованием Vue.js 3 и архитектуры FSD (Feature-Sliced Design) для обеспечения масштабируемости и удобства поддержки кода.
          </p>
          
          <h6 class="mt-4">Ядро:</h6>
          <ul class="custom-list">
            <li>Vue.js 3 (Composition API + script setup)</li>
            <li>Pinia (глобальное состояние)</li>
            <li>Vue Router (навигация)</li>
          </ul>
          
          <h6 class="mt-4">Стилизация:</h6>
          <ul class="custom-list">
            <li>Bootstrap 5 + SCSS (кастомизация тем)</li>
            <li>Адаптивная вёрстка (мобильные устройства, планшеты, десктопы)</li>
          </ul>

          <h6 class="mt-4">Инструменты:</h6>
          <ul class="custom-list">
            <li>Vite (сборка)</li>
          </ul>

          <h6 class="mt-4">Оптимизация:</h6>
          <ul class="custom-list">
            <li>Lazy-loading компонентов и маршрутов</li>
            <li>Мемоизация вычислений (computed-свойства)</li>
          </ul>

          <h6 class="mt-4">Базовые возможности:</h6>
          <ul class="custom-list">
            <li>CRUD операции для задач (добавление, редактирование, удаление)</li>
            <li>Фильтрация по статусу (все/активные/завершённые)</li>
            <li>Сохранение данных в localStorage</li>
          </ul>

          <h6 class="mt-4">Дополнительные возможности:</h6>
          <ul class="custom-list">
            <li>Поиск задач по названию</li>
            <li>Приоритеты задач (низкий/средний/высокий)</li>
            <li>Импорт/экспорт в JSON</li>
            <li>Переключение темы (светлая/тёмная) и языка (i18n)</li>
            <li>Toast-уведомления (vue-toastification)</li>
            <li>Пагинация и lazy-rendering длинных списков</li>
          </ul>
          
          <div class="mt-4">
            <p class="text-muted">
              Версия: 1.0.0
            </p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Card } from '@/shared/components';
</script>

<style scoped>
  .container {
    padding-top: 80px;
  }

  h1 {
    color: var(--text-color);
  }

  .card-text, h6, li, .text-muted {
    color: var(--text-color);
  }

  .custom-list {
    padding-left: 1.5rem;
    list-style: none;
  }

  .custom-list li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .custom-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: var(--primary-color);
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .custom-list li:hover::before {
    background-color: var(--primary-hover);
    transform: translateY(-50%) scale(1.2);
  }

  h6 {
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .card-text {
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
</style> 