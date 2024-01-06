<script setup lang="ts">
import { computed } from 'vue'
import { useAddressesStore } from 'stores/addresses'
import { copyToClipboard, Notify } from 'quasar'
import { useSwapStore } from 'stores/swap'

const props = defineProps({
  search: {
    type: String,
    required: true
  }
})

const store = useAddressesStore()
const swapStore = useSwapStore()

const addresses = computed(() => store.addresses.filter(i => i.name.toLowerCase().includes(props.search.toLowerCase()) || i.address.toLowerCase().includes(props.search.toLowerCase())))

const copy = (val: string) => {
  copyToClipboard(val)
    .then(() => {
      Notify.create({ message: 'Адрес скопирован.', position: 'top', color: 'positive' })
    })
    .catch(() => {
      Notify.create({ message: 'Ошибка копирования.', position: 'top', color: 'negative' })
    })
}
</script>

<template>
<div class="app-addresses">
  <section v-if="addresses && addresses.length">
    <div
      v-for="address in addresses"
      :key="address.address"
    >
      <q-card
        bordered
        flat
        style="transition: .5s all"
        class="q-pa-xs q-mt-xs cursor-pointer"
        :class="{ 'bg-primary': swapStore.recipientAddress === address.address }"
        @click="swapStore.recipientAddress === address.address ? swapStore.recipientAddress = '' : swapStore.recipientAddress = address.address"
      >
        <div class="flex items-center justify-between">
          <div class="q-ml-sm">
            {{ address.name }}
          </div>
          <div class="flex items-center">
            <div class="q-pr-sm">
              {{ address.address }}
            </div>
            <q-btn
              icon="content_copy"
              dense
              flat
              @click.stop="copy(address.address)"
            />
          </div>
        </div>

      </q-card>
    </div>
  </section>
</div>
</template>

<style scoped>

</style>
