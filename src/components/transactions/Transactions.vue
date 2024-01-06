<template>
 <BlockLayout title="Transactions">
   <template v-slot:head>
     <SearchInput v-model="search" />
   </template>

   <template v-slot:default>
      <Tabs
        v-model="tabs"
      />
      <TransactionsList
        :transactions="transactions"
      />
   </template>
 </BlockLayout>
</template>

<script lang="ts" setup>
import BlockLayout from "layouts/BlockLayout.vue";
import SearchInput from "components/ui/SearchInput.vue";
import Tabs from "components/ui/tabs/Tabs.vue";
import TransactionsList from "components/transactions/TransactionsList.vue";
import { ref, computed, Ref } from 'vue'
import { useTransactionsStore } from "stores/transactions";
import { useMainStore } from "stores/main";

const store = useTransactionsStore();
const mainStore = useMainStore()

const search = ref("")
const tabs: Ref<number[]> = ref([])

const transactions = computed(() => {
  let filtered = store.transactions.map(item => ({
    ...item,
    date: new Date(item.date)
  }))

  filtered.sort((objA, objB) => Number(objB.date) - Number(objA.date))

  if (tabs.value.length) filtered = filtered.filter((item: any) => {
    return tabs.value.includes(item.chain);
  })

  if (search.value) filtered = filtered.filter((item: any) => {
    return item.token_to.toLowerCase().includes(search.value)
  })

  return filtered
})
</script>

<style scoped>

</style>
