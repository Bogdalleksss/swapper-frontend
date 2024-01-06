<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { useMainStore } from 'stores/main'
import { useSwapStore } from 'stores/swap'
import { useAddressesStore } from 'stores/addresses'
import { useTransactionsStore } from 'stores/transactions'
import { onMounted, computed, watch } from 'vue'
import { useAuthStore } from "stores/auth";

const $q = useQuasar()
$q.dark.set(true)

const mainStore = useMainStore()
const swapStore = useSwapStore()
const addressesStore = useAddressesStore()
const transactionsStore = useTransactionsStore()
const authStore = useAuthStore()

const me = computed(() => authStore.me)

watch(me, async () => {

  if (me.value) {
    const {
      inch_api_key,
      inch_api_swap_key,
      wallet_address
    } = me.value;

    if (!localStorage.private_key || !inch_api_key || !inch_api_swap_key || !wallet_address) {
      mainStore.setPopup('set-user-info')
      return;
    }

    mainStore.init()

    if (!mainStore.chain) {
      mainStore.setPopup('select-chain');
    }

    await swapStore.init()
    await addressesStore.init()
    await transactionsStore.init()
  }
})

onMounted(async () => {
  if (!authStore.isAuth) {
    mainStore.setPopup('auth')
    return
  }
  await authStore.fetchMe()
})
</script>
