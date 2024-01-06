<template>
  <div :class="[
    $style.item,
    {
      [$style.selected]: selected
    }
  ]">
    <div :class="$style.itemWrapper">
      <div :class="$style.meta">
        <h3>{{ name }}</h3>
        <p>{{ monet }}</p>
      </div>

      <div :class="$style.ratio">
        <img src="~/assets/img/select-border.svg" alt=""/>
        <img src="~/assets/img/select-circle.svg" alt=""/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  selected: Boolean,
  name: String,
  monet: String,
})
</script>

<style lang="scss" module>
.item {
  width: 100%;
  cursor: pointer;
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
  }

  &:hover {
    &::before {
      opacity: 100%;
    }

    .itemWrapper {
      border-color: transparent;
      background: #313f4d;
    }
  }

  &Wrapper {
    display: flex;
    align-items: center;
    position: relative;
    gap: 24px;
    padding: 14px 20px 14px 14px;
    border-radius: 8px;
    border: 1px solid #4C5D6D;
    background: #293540;
    z-index: 3;
    width: 100%;
    transition: .5s;
    cursor: pointer;
  }

  .meta {
    width: 100%;
    flex: 1;

    h3 {
      color: #D7D7D7;
      font-size: 14px;
      font-weight: 700;
      line-height: 12px;
      margin-bottom: 4px;
    }

    p {
      color: rgba(215, 215, 215, 0.37);
      font-size: 10px;
      font-weight: 700;
      line-height: 10px;
      margin: 0;
    }
  }

  .ratio {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;

    img {
      position: absolute;

      &:last-child {
        opacity: 0;
      }
    }
  }

  &.selected {
    .itemWrapper {
      border: 1px solid #686868;
      background: #1D252E;
    }

    .ratio {
      img {
        &:last-child {
          opacity: 1;
        }
      }
    }
  }
}
</style>
