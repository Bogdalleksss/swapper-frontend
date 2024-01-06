<template>
<PopupLayout
  :text-button="tokenName && token ? `Select ${tokenName}` : `Select token`"
  :disabled-button="!tokenName || !token || !!errors.token"
  title="Tokens"
  @button-click="selectToken"
>
  <SearchInput
    v-model="search"
    type="popup"
  />
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
      <TokenItem
        v-for="token in tokens"
        :key="token.id"
        :id="token.id"
        :token="token.token"
        :address="token.address"
        :chain="token.chain"
        :balance="token.balance"
        @click="clickByToken(token.address)"
      />
      <p v-if="!tokens.length" :class="$style.empty">No tokens list</p>
    </div>
  </div>
  <div :class="$style.divider"/>
  <div :class="$style.control">
    <TextField
      v-model="token"
      type="md"
      placeholder="Token"
      label="Token address:"
      :error="errors.token"
    />
  </div>
</PopupLayout>
</template>

<script lang="ts" setup>
import PopupLayout from "../../layouts/PopupLayout.vue";
import SearchInput from "../ui/SearchInput.vue";
import AddressItem from "../ui/addresses/AddressItem.vue";
import TextField from "components/ui/TextField.vue";
import TokenItem from "components/ui/tokens/TokenItem.vue";
import { ref, Ref, onMounted, computed, defineProps, defineEmits, watch } from 'vue';
import { useTokensStore } from "stores/tokens";
import { useMainStore } from "stores/main";

const store = useTokensStore();
const mainStore = useMainStore();

const props = defineProps({
  address: String,
  tokenName: String,
})

const scroll: Ref<any> = ref({})
const isScroll: Ref<any> = ref({})
const search = ref("")
const token = ref(props.address)
const errors = ref({
  token: '',
})


const emit = defineEmits(['select-token'])

watch(token, () => {
  if (validate()) {
    emit('select-token', token)
  }
}, { deep: true })

const tokens = computed(() => {
  const tokensList = store.tokens.filter(item => item.chain === mainStore.chain?.id).map((item: any) => ({
    ...item,
    date: new Date(item.date)
  }))

  tokensList.sort((objA, objB) => objB.balance - objA.balance)

  return search.value
    ? tokensList.filter(item => item.token.toLowerCase().includes(search.value.toLowerCase()))
    : tokensList
})

onMounted(() => {
  const h = scroll.value.clientHeight
  const sh = scroll.value.scrollHeight

  if (sh <= h) {
    isScroll.value = false
  }
})

const validate = () => {
  errors.value.token = ''

  if (!token.value) errors.value.token = "Please, enter token"

  return !(errors.value.token)
}

const clickByToken = (address: string) => {
  token.value = address
  emit('select-token', address)

  mainStore.setPopup('')
}

const selectToken = async () => {
  if (validate()) {
    emit('select-token', token)
    mainStore.setPopup('')
  }
}
</script>

<style lang="scss" module>
.body {
  width: 100%;
  height: 230px;
  overflow-y: scroll;
  overflow-x: hidden;

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
    gap: 4px;

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
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: -14px;
}
</style>
