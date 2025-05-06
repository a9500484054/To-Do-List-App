<template>
  <div class="not-found">
    <Card center class="w-50 mx-auto">
      <div class="not-found__content">
        <h1 class="not-found__title">404</h1>
        <p class="not-found__text">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <router-link to="/" class="not-found__link">
          Вернуться на главную
        </router-link>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { Card } from '@/shared/components';
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: var(--bg-color);


  &__content {
    text-align: center;
    padding: 2rem;
    max-width: 50%;
    margin: 0 auto;
  }

  &__title {
    font-size: 6rem;
    font-weight: 700;
    color: var(--primary-color);
    margin: 0 0 1rem;
    line-height: 1;
  }

  &__text {
    font-size: 1.25rem;
    color: var(--text-color);
    margin-bottom: 2rem;
  }

  &__link {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--primary-hover);
    }
  }

  @media (max-width: 768px) {
    &__title {
      font-size: 4rem;
    }

    &__text {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    &__title {
      font-size: 3rem;
    }

    &__text {
      font-size: 1rem;
    }
  }
}
</style> 