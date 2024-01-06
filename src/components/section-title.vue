<template>
  <div class="text-h6 text-bold text-uppercase text-shadow" style="letter-spacing: 1px">
    {{ props.title }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
})
</script>

