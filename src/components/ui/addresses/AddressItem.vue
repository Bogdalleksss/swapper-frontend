<template>
  <div :class="$style.item">
    <h3>{{ name }}</h3>
    <div :class="$style.address">
      <span>{{ address }}</span>
      <Button type="mini" @click="copy(address)">
        <img src="~/assets/img/copy.svg" alt="copy" />
      </Button>
      <Button type="mini" @click="remove()">
        <img src="~/assets/img/remove.svg" alt="delete" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "components/ui/Button.vue";
import { copyToClipboard, Notify } from 'quasar'
import { defineProps } from 'vue'
import { useAddressesStore } from 'stores/addresses';

const store = useAddressesStore()

const { id, name, address } = defineProps({
  name: String,
  address: String,
  id: Number
})

const copy = (val: string) => {
  copyToClipboard(val)
}

const remove = async () => {
  await store.deleteAddress(id)
}
</script>

<style lang="scss" module>
.item {
  display: flex;
  width: 100%;
  gap: 8px;

  h3 {
    display: flex;
    align-items: center;
    width: 105px;
    height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.56);
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    border-radius: 8px;
    background: #242F3A;
    padding: 0 12px;

  }

  .address {
    height: 36px;
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 12px;
    padding-right: 7px;
    gap: 12px;
    border-radius: 8px;
    background: #242F3A;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgba(255, 255, 255, 0.56);
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      flex: 1;
      width: 0px;
    }
  }
}
</style>
