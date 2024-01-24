<template>
  <div :class="$style.tabs">
    <ChipTab
      v-for="tab in tabs"
      :key="tab.id"
      :title="tab.name"
      :color="tab.color"
      :is-active="selectedTabs.includes(tab.chainId)"
      @click="toggle(tab.chainId)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps, Ref } from 'vue';
import ChipTab from "components/ui/tabs/ChipTab.vue";

const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: Array
})

const tabs = ref([
  {
    id: 1,
    name: "Ethereum",
    chainId: 1,
    color: "#4966B2"
  },
  {
    id: 2,
    name: "BSC",
    chainId: 56,
    color: "#C4854B"
  },
  {
    id: 3,
    name: "Polygon",
    chainId: 137,
    color: "#854bc4"
  },
  {
    id: 4,
    name: "Optimism",
    chainId: 10,
    color: "#c44b4b"
  },
  {
    id: 5,
    name: "Arbitrum",
    chainId: 42161,
    color: "#009ff5"
  },
  {
    id: 6,
    name: "Base",
    chainId: 8453,
    color: "#0060dc"
  },
])
const selectedTabs: Ref<number[]> = ref([])

watch(selectedTabs, () => {
  emit('update:modelValue', [...selectedTabs.value])
}, { deep: true })

const toggle = (chainId: number) => {
  const tabIndex = selectedTabs.value.findIndex(item => item === chainId);

  if (tabIndex > -1) selectedTabs.value.splice(tabIndex, 1)
  else selectedTabs.value = [chainId]
}
</script>

<style lang="scss" module>
.tabs {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
