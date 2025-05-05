<template>
    <aside class="sidebar">
        <slot></slot>
    </aside>
</template>
  
<script setup>

</script>

<style scoped>  
  .sidebar {
    max-width: 30%;
    background-color: #f8f9fa;
    padding: 20px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
    margin-top: 102px;
  }
  
  

</style>
  