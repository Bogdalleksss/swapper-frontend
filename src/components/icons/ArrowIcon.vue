<template>
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.86878 6.68752L0.81053 1.64964C0.566575 1.40667 0.566575 1.01275 0.81053 0.769807L1.40049 0.182223C1.64403 -0.0603341 2.03874 -0.0608009 2.28285 0.181186L6.31049 4.17379L10.3381 0.181186C10.5822 -0.0608009 10.9769 -0.0603341 11.2205 0.182223L11.8104 0.769807C12.0544 1.01278 12.0544 1.4067 11.8104 1.64964L6.7522 6.68752C6.50825 6.93047 6.11274 6.93047 5.86878 6.68752Z"
      :fill="color"
    />
  </svg>
</template>

<script lang="ts">
export default {
  name: "ArrowIcon",
  props: {
    color: {
      type: String,
      default: "#fff"
    },
  },
}
</script>

<style scoped>

</style>
