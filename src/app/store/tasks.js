import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    filter: 'all', // 'all', 'active', 'completed'
    priorityFilter: 'all', // 'all', 'high', 'medium', 'low'
    searchQuery: '',
  }),
  
  getters: {
    filteredTasks: (state) => {
      let filtered = state.tasks;
      
      // Фильтрация по статусу
      if (state.filter === 'active') {
        filtered = filtered.filter(task => !task.completed);
      } else if (state.filter === 'completed') {
        filtered = filtered.filter(task => task.completed);
      }
      
      // Фильтрация по приоритету
      if (state.priorityFilter !== 'all') {
        filtered = filtered.filter(task => task.priority === state.priorityFilter);
      }
      
      // Поиск по названию
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(task => 
          task.title.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    },
  },
  
  actions: {
    addTask(task) {
      this.tasks.push({
        id: Date.now(),
        title: task.title,
        completed: false,
        priority: task.priority || 'medium',
        createdAt: new Date().toISOString(),
      });
      this.saveToLocalStorage();
    },
    
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        this.saveToLocalStorage();
      }
    },
    
    editTask(id, newTitle) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.title = newTitle;
        this.saveToLocalStorage();
      }
    },
    
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.saveToLocalStorage();
    },
    
    setFilter(filter) {
      this.filter = filter;
    },
    
    setPriorityFilter(priority) {
      this.priorityFilter = priority;
    },
    
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    
    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    
    exportTasks() {
      return JSON.stringify(this.tasks);
    },
    
    importTasks(jsonString) {
      try {
        const tasks = JSON.parse(jsonString);
        this.tasks = tasks;
        this.saveToLocalStorage();
        return true;
      } catch (error) {
        console.error('Ошибка импорта задач:', error);
        return false;
      }
    },
  },
}); 