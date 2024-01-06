<template>
  <div
    :class="$style.chip"
    :style="{
      borderColor: color,
      backgroundColor: isActive ? color : 'transparent',
      color: isActive ? '#fff' : color
    }"
  >
    <h4>{{ title }}</h4>
  </div>
</template>

<script>
export default {
  name: "ChipTab",
  props: {
    title: String,
    color: String,
    isActive: Boolean
  }
}
</script>

<style lang="scss" module>
.chip {
  border-radius: 20px;
  border: 2px solid;
  height: 28px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;
  transition: .4s;

  &:hover {
    opacity: .8;
  }

  h4 {
    font-size: 12px;
    font-weight: 700;
    line-height: 10px;
  }
}
</style>
