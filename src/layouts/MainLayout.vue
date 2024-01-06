<template>
  <div :class="$style.layout">
    <Header />

    <main :class="$style.main">
      <router-view />
    </main>

    <footer></footer>

    <AuthPopup v-if="popup === 'auth'" />
    <UserInfoPopup v-else-if="popup === 'set-user-info'" />
    <UserInfoPopup v-else-if="popup === 'edit-user-info'" :is-editing="true" />
    <AddressesPopup v-else-if="popup === 'addresses'" />
    <SelectChainPopup v-else-if="popup === 'select-chain'" />
    <SlippagePopup v-else-if="popup === 'slippage'" />
  </div>
</template>

<script lang="ts" setup>
import Header from "components/layout/Header.vue";
import AuthPopup from "components/popups/AuthPopup.vue";
import UserInfoPopup from "components/popups/UserInfoPopup.vue";
import AddressesPopup from "components/popups/AddressesPopup.vue";
import SelectChainPopup from "components/popups/SelectChainPopup.vue";
import SlippagePopup from "components/popups/SlippagePopup.vue";
import { useMainStore } from 'stores/main'
import { computed } from 'vue'

const store = useMainStore();

const popup = computed(() => store.popup)
</script>

<style lang="scss" module>
.layout {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
  }
}
</style>
