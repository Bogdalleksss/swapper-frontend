<template>
<div :class="$style.checkbox">
  <input
    :id="id"
    :class="$style.customCheckbox"
    :value="modelValue"
    @change="updateValue"
    type="checkbox"
  >
  <label :for="id">
    <span />
    {{ label }}
  </label>
</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  id: String,
  label: String,
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.checked)
}
</script>

<style lang="scss" module>
.checkbox {
  label, input {
    cursor: pointer;
  }
  label {
    display: flex;
    align-items: center;
    color: #dedede;
  }

  .customCheckbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
    outline: none !important;

    &+label span {
      display: inline-flex;
      align-items: center;
      user-select: none;
    }

    &+label span {
      content: '';
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid #dedede;
      border-radius: 0.25em;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }

    &+label span::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      flex-shrink: 0;
      flex-grow: 0;
      //border: 1px solid #adb5bd;
      border-radius: 1px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }

    &:checked+label span::before {
      background: #dedede;
    }

    &:not(:disabled):not(:checked)+label span:hover {
      border-color: #dedede;
    }


    /* стили для чекбокса, находящегося в состоянии disabled */
    &:disabled+label span {
      opacity: .5;
    }
  }
}
</style>
