<template>
<PopupLayout
  text-button="Add address"
  title="Addresses"
  @button-click="addAddress"
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
      <AddressItem
        v-for="address in addresses"
        :key="address.id"
        :name="address.name"
        :id="address.id"
        :address="address.wallet_address"
      />
      <p v-if="!addresses.length" :class="$style.empty">No addresses added</p>
    </div>
  </div>
  <div :class="$style.divider"/>
  <div :class="$style.control">
    <TextField
      v-model="name"
      type="md"
      placeholder="Name"
      :error="errors.name"
    />
    <TextField
      v-model="address"
      type="md"
      placeholder="Address"
      :error="errors.address"
    />
  </div>
</PopupLayout>
</template>

<script lang="ts" setup>
import PopupLayout from "../../layouts/PopupLayout.vue";
import SearchInput from "../ui/SearchInput.vue";
import AddressItem from "../ui/addresses/AddressItem.vue";
import TextField from "components/ui/TextField.vue";
import { ref, onMounted, computed } from 'vue';
import { useAddressesStore } from "stores/addresses";

const store = useAddressesStore();

const scroll = ref(null)
const isScroll = ref(true)
const search = ref("")
const name = ref("")
const address = ref("")
const errors = ref({
  name: '',
  address: '',
})

const addresses = computed(() => {
  if (search.value) return store.addresses.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))

  return store.addresses
})


onMounted(() => {
  const h = scroll.value.clientHeight
  const sh = scroll.value.scrollHeight

  if (sh <= h) {
    isScroll.value = false
  }
})

const validate = () => {
  errors.value.name = ''
  errors.value.address = ''

  if (!name.value) errors.value.name = "Please, enter name"
  if (!address.value) errors.value.address = "Please, enter address"

  return !(errors.value.name || errors.value.address)
}

const addAddress = async () => {
  if (validate()) {
    await store.addAddress({ name: name.value, address: address.value })
    name.value = ""
    address.value = ""
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
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: -14px;
}
</style>
