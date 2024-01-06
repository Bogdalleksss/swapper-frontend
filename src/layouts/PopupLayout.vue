<template>
<div :class="[
  $style.layout,
  {
    [$style.blocked]: !isAuth
  }
]">
  <div :class="$style.popup">
    <div
      v-if="title"
      :class="$style.popupHead"
    >
      <h3>{{ title }}</h3>

      <button
        v-if="!disabledClose"
        :class="$style.close"
        @click="store.setPopup('')"
      >
        <img src="~/assets/img/close.svg"/>
      </button>
    </div>
    <img
      v-else-if="isLogo"
      :class="$style.logo"
      src="~/assets/img/logo.svg"
    />
    <slot />
    <Button
      :class="$style.button"
      :disabled="disabledButton"
      type="black"
      @click="emit('button-click')"
    >
      <span>{{ textButton }}</span>
    </Button>
  </div>
</div>
</template>

<script lang="ts" setup>
import Button from "components/ui/Button.vue";
import { useMainStore } from "stores/main";
import { defineProps, computed } from 'vue'
import { useAuthStore } from "stores/auth";

const store = useMainStore()
const authStore = useAuthStore()

const isAuth = computed(() => authStore.isAuth)

defineProps({
  title: String,
  textButton: String,
  showed: Boolean,
  isLogo: Boolean,
  disabledClose: Boolean,
  disabledButton: Boolean,
})

const emit = defineEmits(['button-click'])
</script>

<style lang="scss" module>
.layout {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .5);

  &.blocked {
    backdrop-filter: blur(22px);
  }

  .popup {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    width: 440px;
    background: #293643;
    filter: drop-shadow(0px 4px 32px rgba(120, 120, 120, 0.08));
    border-radius: 16px;
    margin-bottom: 20px;

    .logo {
      width: 305px;
      margin: 0 auto 24px;
    }

    &Head {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 12px;

      h3 {
        display: inline-block;
        flex: 1;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
      }



      .close {
        cursor: pointer;
        background: transparent;
        border: none;
      }
    }

    .button {
      margin-top: 30px;
      width: 100%;
    }
  }
}
</style>
