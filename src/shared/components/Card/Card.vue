<template>
  <div class="card">
    <div class="card-body">
        <slot></slot>
    </div>
  </div>
</template>

<script setup>

</script> 

<style scoped lang="scss">
  .card {
    width: 100%;
    background-color: #fff;
    border-radius: 18px;
    border: none;
  }
</style>