<script setup lang="ts">
import { useMainStore } from 'stores/main'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { getMainBalance, MainBalanceType } from 'components/main-balance/index'

const store = useMainStore()
const balance: Ref<MainBalanceType | null> = ref(null)
const chainId: Ref<number | undefined> = computed(() => store.chain?.id)

watch(chainId, async (val) => {
  if (val && store.chain) {
    balance.value = await getMainBalance(store.chain)
  }
})

onMounted(async () => {
  if (store.chain) balance.value = await getMainBalance(store.chain)
})
</script>

<template>
<div v-if="balance && store.chain" class="main-balance text-bold">
  {{ balance.formattedBalance }} {{ store.chain?.nativeTokenSymbol }}
</div>
</template>

<style scoped>

</style>
