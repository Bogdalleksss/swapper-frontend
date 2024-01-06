<template>
  <PopupLayout
    title="Slippage settings"
    text-button="Save settings"
    @button-click="save"
  >
    <div :class="$style.body">
      <SlippageSelect
        v-for="item in slippageItems"
        v-model="slippageInput"
        :selected="slippage === item.value"
        :label="item.value === 'Custom' ? item.value : `${item.value}%`"
        :type="item.value === 'Custom' && 'input'"
        @click="slippage = item.value"
      />
    </div>
  </PopupLayout>
</template>

<script lang="ts" setup>
import PopupLayout from "layouts/PopupLayout.vue";
import SlippageSelect from "components/ui/swap/SlippageSelect.vue";
import { ref } from "vue";
import { useSwapStore } from "stores/swap";
import { useMainStore } from "stores/main";

const store = useSwapStore();
const mainStore = useMainStore();

const slippageItems = ref([
  {
    id: 0,
    value: 0.1
  },
  {
    id: 1,
    value: 0.3
  },
  {
    id: 2,
    value: 0.5
  },
  {
    id: 3,
    value: 'Custom'
  },
])
const slippage = ref(slippageItems.value.find(i => i.value === store.slippage) ? store.slippage : 'Custom')
const slippageInput = ref(store.slippage)

const save = () => {
  store.slippage = slippage.value === 'Custom' ? slippageInput : slippage
  mainStore.setPopup('')
}

</script>

<style lang="scss" module>
.body {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 165px;
  width: 100%;
  gap: 8px;
  margin-top: 12px;
}
</style>
