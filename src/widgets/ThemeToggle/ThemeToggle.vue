<template>
  <Button
    @click="themeStore.toggleTheme"
    :icon="themeStore.isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'"
    iconOnly
    class="theme-toggle"
    :class="{ 'theme-toggle--dark': themeStore.isDark }"
  />
</template>

<script setup>
  import { Button } from '@/shared/components';
  import { useThemeStore } from '@/app/store/theme';

  const themeStore = useThemeStore();
</script>

<style>
  .theme-toggle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  .theme-toggle:hover {
    transform: scale(1.1);
    background-color: var(--hover-color);
  }

  .theme-toggle--dark {
    background-color: var(--card-bg);
    color: var(--text-color);
  }
</style> 