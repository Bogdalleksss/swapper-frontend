<template>
  <button :class="[
    $style.button,
    {
      [$style.disabled]: disabled
    }
  ]">
    <img src="~/assets/img/reverse.svg" alt="reverse"/>
    <img src="~/assets/img/reverse-gradient.svg" alt="reverse-gradient"/>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  disabled: Boolean
})
</script>

<style lang="scss" module>
.button {
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    img {
      &:last-child {
        opacity: 1;
        filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0.2));
      }
    }
  }

  img {
    position: absolute;
    transition: .5s;

    &:last-child {
      opacity: 0;
    }
  }

  &.disabled {
    filter: grayscale(.6);
    pointer-events: none;

    img {
      &:last-child {
        display: none;
      }
    }
  }
}
</style>
