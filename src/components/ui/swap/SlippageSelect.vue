<template>
  <div :class="[
    $style.item,
    $style[type],
    {
      [$style.selected]: selected
    }
  ]">
    <div :class="$style.itemWrapper">
      <h3>{{ label }}</h3>
      <input
        :value="modelValue"
        type="number"
        placeholder="0.00%"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'

defineProps({
  type: String,
  label: String,
  selected: Boolean,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss" module>
.item {
  position: relative;
  width: 100%;
  cursor: pointer;

  &Wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #4C5D6D;
    background: #293540;
    transition: .4s;
    z-index: 3;
  }

  &:hover {
    .itemWrapper {
      background: #344350;
    }
  }

  h3 {
    color: #D7D7D7;
    font-size: 14px;
    font-weight: 400;
    line-height: 12px;
  }

  input {
    display: none;
    width: 60px;
    margin-left: 12px;
    border: none;
    background: transparent;
    color: #D7D7D7;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 12px;
    outline: none !important;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }

  &.selected {
    &::before {
      content: "";
      position: absolute;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      background: linear-gradient(102deg, #DC84F2 -2.09%, #44C8DE 108.93%);
      z-index: 1;
      top: -1px;
      left: -1px;
      border-radius: 8px;
      opacity: 1;
      transition: .5s;
    }

    .itemWrapper {
      background: #25303A;
    }
  }

  &.input {
    .itemWrapper {
      padding: 0 20px;
    }

    input {
      display: block;
    }
  }
}
</style>
