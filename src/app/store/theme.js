import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light');
  
  const isDark = computed(() => theme.value === 'dark');
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  };
  
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    theme.value = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
  };
  
  return {
    theme,
    isDark,
    toggleTheme,
    initTheme
  };
}); 