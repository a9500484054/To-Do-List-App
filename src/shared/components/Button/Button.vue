<template>
    <button :class="buttonClass">
      <Icon v-if="icon" :icon="icon" class="button-icon" />
      <span v-if="label">{{ label }}</span>
    </button>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  import { Icon } from '@iconify/vue';
  
  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    primary: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    iconOnly: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator(value) {
        return ['small', 'medium', 'large', 'xlarge'].includes(value);
      },
      default: 'm'
    }
  });
  
  const buttonClass = computed(() => {
    return {
      'button': true,
      'button--primary': props.primary,
      'button--outlined': props.outlined,
      'button--icon-only': props.iconOnly,
      [`button-${props.size}`]: true
    };
  });


  
  </script>
  
<style scoped lang='scss'>
  .button {
    display: inline-flex;
    align-items: center;
    padding: 0.5em 1em;
    font-size: 1em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .button--primary {
    background-color: #ff365f;
    color: #fff;
    border: 1px solid #ff365f;
    border-radius: 50px;
    padding: 8px 20px;
    font-weight: 500;
    transition: all 0.3s ease;
    transform: translateY(0);
    box-shadow: none;
    &:hover {    
      background-color: #fff;
      border: 1px solid #ff365f;
      color: #ff365f;
      border-radius: 50px;
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(255, 54, 95, 0.3);
    }
    &:active {
      transform: translateY(1px);
      box-shadow: 0 2px 6px rgba(255, 54, 95, 0.3);
    }
  }

  .button--outlined {
    background-color: #fff;
    border: 1px solid #ff365f;
    color: #ff365f;
    border-radius: 50px;
    padding: 8px 20px; 
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    transform: translateY(0); 
    box-shadow: none; 
    
    &:hover {
      background-color: #ff365f;
      border-color: #ff365f;
      color: #fff;
      transform: translateY(-3px); 
      box-shadow: 0 4px 12px rgba(255, 54, 95, 0.3); 
    }
    
    &:active {
      transform: translateY(1px); 
      box-shadow: 0 2px 6px rgba(255, 54, 95, 0.3); 
    }
  }
  
  .button--icon-only {
    color: #b1b1b9;
    transition: all 0.3s ease; 
    padding: 0 !important;
    &:hover {
      color: #ff365f;
    }
  }
  
  .button-small {
    font-size: 0.75em;
    padding: 0.25em 0.5em;
  }
  
  .button-medium {
    font-size: 1em;
    padding: 0.5em 1em;
  }
  
  .button-large {
    font-size: 1.25em;
    padding: 0.75em 1.5em;
  }
  .button-xlarge {
    font-size: 1.50em;
    padding: 1em 1.75em;
  }
  
  .button-icon {
    margin-right: 4px;
    font-size: 2rem;
  }
  </style>
  