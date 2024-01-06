<template>
<PopupLayout
  :text-button="isEdit ? 'Save chain' : 'Select chain'"
  title="Chains"
  @button-click="selectChain"
>
  <SearchInput type="popup" />
  <div :class="$style.divider"/>
  <div
    ref="scroll"
    :class="[
      $style.body,
      {
        [$style.scroll]: isScroll
      }
    ]"
  >
    <div :class="$style.bodyWrapper">
      <SelectChainItem
        v-for="item in chains"
        :key="item.id"
        :name="item.name"
        :monet="item.native_token_symbol"
        :selected="item.id === chain.id"
        @click="chain = item"
      />

      <p v-if="false" :class="$style.empty">Chains not found</p>
    </div>
  </div>
  <div :class="$style.divider"/>
  <div :class="$style.control">
    <TextField
      v-model="rpc"
      :error="errors.rpc"
      type="md"
      placeholder="RPC"
    />
    <TextField
      v-model="address"
      :error="errors.address"
      type="md"
      placeholder="Base token address"
    />
    <div :class="$style.controlRow">
      <TextField
        v-model="decimals"
        :error="errors.decimals"
        type="md"
        placeholder="Decimals"
      />
      <TextField
        v-model="gas_limit"
        :error="errors.gas_limit"
        type="md"
        placeholder="Gas limit"
      />
      <TextField
        v-model="gas_factor"
        :error="errors.gas_factor"
        type="md"
        placeholder="Gas factor"
      />
    </div>
  </div>
</PopupLayout>
</template>

<script lang="ts" setup>
import PopupLayout from "../../layouts/PopupLayout.vue";
import SearchInput from "../ui/SearchInput.vue";
import TextField from "components/ui/TextField.vue";
import SelectChainItem from "components/ui/chains/SelectChainItem.vue";
import { ref, onMounted, computed, watch, Ref } from 'vue';
import { useMainStore } from "stores/main";

const store = useMainStore()
const defaultError = {
  private_key: '',
  wallet_address: '',
  inch_api_swap_key: '',
  inch_api_key: '',
}

const chains = computed(() => store.chains)
const chain: Ref<any> = ref(store.chain || {})
const rpc = ref(store.rpc)
const address = ref(store.address)
const gas_limit: Ref<number | string> = ref(store.gas_limit)
const decimals: Ref<number | string> = ref(store.decimals)
const gas_factor: Ref<number | string> = ref(store.gas_factor)
const scroll: Ref<any> = ref({})
const isScroll = ref(true)
const isEdit = ref(false)
const errors = ref({
  rpc: '',
  address: '',
  decimals: '',
  gas_limit: '',
  gas_factor: '',
})

watch(chain, () => {
  const localChains = localStorage.chains ? JSON.parse(localStorage.chains) : []
  const currentItem = localChains.find((i:any) => i.id === chain.value.id);

  rpc.value = currentItem ? currentItem.rpc : ''
  address.value = currentItem ? currentItem.address : ''
  decimals.value = currentItem ? +currentItem.decimals : ''
  gas_limit.value = currentItem ? +currentItem.gas_limit : ''
  gas_factor.value = currentItem ? +currentItem.gas_factor : ''
}, { deep: true })

watch(rpc, () => isEdit.value = true, { deep: true })
watch(address, () => isEdit.value = true, { deep: true })
watch(decimals, () => isEdit.value = true, { deep: true })
watch(gas_limit, () => isEdit.value = true, { deep: true })
watch(gas_factor, () => isEdit.value = true, { deep: true })

const selectChain = () => {
  if (validate()) {
    if (isEdit) {
      store.rpc = rpc.value
      store.address = address.value
      store.decimals = +decimals.value
      store.gas_limit = +gas_limit.value
      store.gas_factor = +gas_factor.value

      store.selectChain(chain.value.id)

      const localChains = localStorage.chains ? JSON.parse(localStorage.chains) : []
      const currentIndex = localChains.findIndex((i: any) => i.id === chain.value.id);
      const chainEl = {
        id: chain.value.id,
        rpc: rpc.value,
        address: address.value,
        decimals: decimals.value,
        gas_limit: gas_limit.value,
        gas_factor: gas_factor.value,
      }

      if (currentIndex > -1) localChains[currentIndex] = chainEl
      else localChains.push(chainEl)

      localStorage.chains = JSON.stringify(localChains)
      isEdit.value = false;
    } else {
      store.setPopup('')
    }
  }
}

const validate = () => {
  errors.value.rpc = ''
  errors.value.address = ''
  errors.value.gas_limit = ''
  errors.value.decimals = ''
  errors.value.gas_factor = ''

  if (!rpc.value) errors.value.rpc = "Please, enter RPC"
  if (!address.value) errors.value.address = "Please, enter address"
  if (!gas_limit.value) errors.value.gas_limit = "Please, enter gas limit"
  if (!decimals.value) errors.value.decimals = "Please, enter decimals"
  if (!gas_factor.value) errors.value.gas_factor = "Please, enter gas factor"

  return !(
    errors.value.rpc
    || errors.value.address
    || errors.value.gas_limit
    || errors.value.decimals
    || errors.value.gas_factor
  )
}

onMounted(() => {
  if (scroll.value) {
    const h = scroll.value.clientHeight
    const sh = scroll.value.scrollHeight

    if (sh <= h) {
      isScroll.value = false
    }
  }
})
</script>

<style lang="scss" module>
.body {
  width: 100%;
  height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 2px;

  &.scroll {
    padding-right: 12px;

    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: rgba(217, 217, 217, 0.30);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #D9D9D9;
      height: 100px;
    }
  }


  &Wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    .empty {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-top: 20px;
      opacity: .5;
    }
  }
}
.divider {
  width: 100%;
  height: 1px;
  background: #3A4755;
  margin-top: 14px;
  margin-bottom: 14px;
}
.control {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  width: 100%;
  margin-bottom: -14px;

  &Row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
}
</style>
