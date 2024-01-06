<template>
<div
  :class="[
    $style.button, $style[type],
    {
      [$style.disabled]: disabled || loading
    }
  ]"
>
  <div :class="$style.buttonWrap">
    <q-circular-progress
      v-if="loading"
      indeterminate
      rounded
      size="18px"
      color="deep-purple-3"
      class="q-ma-md"
    />
    <slot />
  </div>
</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  type: String,
  disabled: Boolean,
  loading: Boolean,
})
</script>

<style lang="scss" module>
.button {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;

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

  &:hover {
    &::before {
      opacity: 100%;
    }

    .buttonWrap {
      background: #353e46;
    }
  }

  &Wrap {
    position: relative;
    display: flex;
    align-items: center;
    height: 52px;
    padding-left: 14px;
    padding-right: 16px;
    border-radius: 8px;
    border: none;
    background: #293036;
    z-index: 2;
  }

  &.swap {
    .buttonWrap {
      background: #283440;
      text-align: center;
      justify-content: center;
      transition: .3s;
    }

    &::before {
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      top: -2px;
      left: -2px;
      opacity: 1;
      filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0));
    }

    &:hover {
      &::before {
        filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0.26));
      }

      .buttonWrap {
        background: #32404f;
      }
    }
  }

  &.mini {
    width: 22px;
    height: 22px;

    &::before {
      border-radius: 4px;
    }

    .buttonWrap {
      height: 100%;
      padding: 0;
      background: #3A4045;
      justify-content: center;
      border-radius: 4px;
    }
  }

  &.black {

    &:hover {
      &:before {
        filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0.2));
      }

      .buttonWrap {
        background: #1f2b36;
      }
    }

    &:before {
      opacity: 1;
      filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0));
    }

    .buttonWrap {
      height: 42px;
      transition: .5s;
      background: #161E26;

      span {
        background: linear-gradient(96deg, #DC84F2 -4.15%, #44C8DE 119.94%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        width: 100%;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        text-transform: uppercase;
      }
    }
  }

  &.disabled {
    pointer-events: none;
    filter: grayscale(.4);
    opacity: .6;
  }
}
</style>
