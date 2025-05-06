<template>
  <div class="modal" tabindex="-1" :class="{ 'd-block': show }" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Удаление задачи</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="fs-16">Вы уверены, что хотите удалить эту задачу?</p>
        </div>
        <div class="modal-footer">
          <Button  outlined label="Отмена" @click="$emit('close')"/>
          <Button  primary label="Удалить" @click="$emit('confirm')"/>
        </div>

      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
  </div>
</template>

<script setup>
import { 
  Button
} from '../../../shared/components';


defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close', 'confirm']);
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  z-index: 1050;
}
.modal-backdrop {
  z-index: 1040;
}

.modal-footer {
  border: none;
}
</style>