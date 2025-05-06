<template>
  <div class="modal" tabindex="-1" :class="{ 'd-block': show }" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Удаление задачи</h5>
          <button type="button" class="btn-close" @click="handleClose" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="fs-16">Вы уверены, что хотите удалить эту задачу?</p>
        </div>
        <div class="modal-footer">
          <Button outlined label="Отмена" @click="handleClose"/>
          <Button primary label="Удалить" @click="handleConfirm"/>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
  </div>
</template>

<script setup>
import { Button } from '../../../shared/components';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  taskTitle: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'confirm']);

const handleClose = () => {
  emit('close');
};

const handleConfirm = () => {
  emit('confirm');
  toast.error(`Задача успешно удалена`, {
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
    transition: 'Vue-Toastification__bounce',
    maxToasts: 5,
    newestOnTop: true
  });
};
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