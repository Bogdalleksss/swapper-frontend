<template>
  <div :class="$style.layout">
    <div :class="$style.head">
      <h3>{{ title }} <q-spinner v-if="loading" size="14px"/></h3>
      <div>
        <slot name="head"></slot>
      </div>
    </div>
    <div :class="$style.content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: "Untitled"
  },
  loading: Boolean
})
</script>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 501px;

  .head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;

    h3 {
      color: #FFF;
      font-size: 24px;
      font-weight: 700;
      line-height: normal;
    }
  }

  .content {
    width: 100%;
    flex: 1;
  }
}
</style>
