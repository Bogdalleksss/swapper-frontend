<template>
  <div :class="$style.page">
      <Swapper />
      <Transactions />
  </div>
</template>

<script lang="ts">
import { useMainStore } from 'stores/main'
import Swapper from "components/swapper/Swapper.vue";
import Transactions from "components/transactions/Transactions.vue";

export default {
  components: { Transactions, Swapper },
  setup() {
    const mainStore = useMainStore()
  },
}
</script>

<style lang="scss" module>
.page {
  display: grid;
  grid-template-columns: 1fr .75fr;
  gap: 80px;
  padding: 0 90px 8vh;
  align-items: center;
  min-height: calc(100vh - 92px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
    padding-top: 80px;
    padding-right: 30px;
    padding-left: 30px;
  }

  @media (max-width: 1024px) {

  }
}
</style>
