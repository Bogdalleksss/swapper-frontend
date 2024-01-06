<template>
  <div :class="[
    $style.input,
    $style[type],
    {
       [$style.focused]: isFocus
    }
  ]">
    <input
      placeholder="Search..."
      :value="modelValue"
      @input="updateValue"
      @blur="isFocus = false"
      @focus="isFocus = true"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'

defineProps({
  type: String,
  modelValue: String
})

const isFocus = ref(false)

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss" module>
.input {
  position: relative;

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
    opacity: 0;
    transition: .5s;
    filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0.2));
  }

  &:hover, &.focused {
    &::before {
      opacity: 100%;
    }
  }

  input {
    position: relative;
    width: 212px;
    height: 30px;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    color: #FFFFFF;
    border-radius: 8px;
    background: rgba(39, 49, 59, 1);
    border: none;
    padding: 0 14px;
    outline: none;
    z-index: 3;
  }

  &.popup {
    width: 100%;

    input {
      width: 100%;
      height: 38px;
      background: #444C57;
      font-size: 14px;
      font-weight: 600;
      line-height: 16px;
    }
  }
}
</style>
