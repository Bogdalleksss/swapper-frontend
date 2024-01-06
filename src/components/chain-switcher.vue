<template>
  <q-slide-transition>
    <div v-if="store.chain" class="chain-switcher">
      <q-btn
        v-for="chain in store.chains"
        :key="chain.ID"
        :label="chain.NAME"
        unelevated
        no-caps
        text-color="white"
        class="q-pa-sm q-ml-md text-bold"
        :color="chain.ID === store.chain.id ? 'primary' : 'info'"
        style="width: 180px"
        @click="setChain(chain)"
      />
    </div>
  </q-slide-transition>

</template>

<script setup lang="ts">
import { useMainStore } from 'stores/main'
import { ChainDtoInterface, Chain } from 'stores/main/models'

const store = useMainStore()

const setChain = (chain: ChainDtoInterface) => {
  store.chain = new Chain(chain)
}
</script>

<style scoped>

</style>
