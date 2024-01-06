<template>
  <button :class="[$style.button, $style[type]]">
    <slot name="append"/>
    <span>
      {{ title }}
    </span>
  </button>
</template>

<script>
export default {
  name: "ChipButton",
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "rounded"
    },
  },
}
</script>

<style lang="scss" module>
.button {
  background: rgba(136, 163, 198, 0.16);
  height: 22px;
  padding:  8px;
  display: flex;
  align-items: center;
  gap: 7px;
  border-radius: 4px;
  cursor: pointer;
  transition: .5s;
  border: 1px solid transparent;

  &:hover {
    background: rgba(136, 163, 198, 0.36);
    border: 1px solid #969696;
    filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25));
  }

  &.rounded {
    border-radius: 10px;
    height: 26px;

    span {
      font-size: 11px;
    }
  }

  &.gradient-text {
    &:hover {
      background: rgba(136, 163, 198, 0.26);
      border: 1px solid #DC84F2;
      filter: drop-shadow(0px 0px 12.7px rgba(220, 132, 242, 0.26));
    }

    span {
      background: linear-gradient(102deg, #DC84F2 -2.09%, #44C8DE 108.93%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  span {
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 10px;
    color: #FFF;
  }
}
</style>
