<template>
  <header :class="$style.header">
    <div :class="$style.logo">
      <img src="~/assets/img/logo.svg" alt="logo"/>
    </div>

    <div :class="$style.control">
      <ChainSelect @click="store.setPopup('select-chain')" />
      <Button @click="store.setPopup('edit-user-info')">
        <img src="~/assets/img/setting-icon.svg" alt="chain-icon"/>
      </Button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import ChainSelect from "components/chains/ChainSelect.vue";
import Button from "components/ui/Button.vue";
import Popup from "components/popups/Popup.vue";
import { useMainStore } from 'stores/main'

const store = useMainStore();
</script>

<style lang="scss" module>
.header {
  width: 100%;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .control {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
