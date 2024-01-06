<template>
<div class="app-transactions">
  <section>
    <div class="flex justify-between">
      <section-title title="Транзакции"/>
      <div class="q-mt-xs">
        <q-radio v-model="chain" :val="1" label="Ethereum" dense/>
        <q-radio v-model="chain" :val="56" label="BSC" dense class="q-ml-md"/>
      </div>
    </div>

    <div class="q-mt-sm">
      <q-scroll-area style="height: calc(43vh - 60px)">
        <div
          v-for="transaction in transactions"
          :key="transaction.hash"
        >
          <q-card bordered flat class="q-pa-xs flex items-center q-mt-xs justify-between">
            <div class="flex items-center">
              <div>
                <q-btn
                  icon="content_copy"
                  dense
                  flat
                  @click="copy(transaction.hash)"
                />
              </div>
              <div class="q-ml-sm">{{ transaction.hash.slice(0, 50) }}...</div>
            </div>
            <div v-if="transaction.time" class="q-pr-sm">
              {{ getTransactionDate(transaction.time) }}
            </div>
          </q-card>
        </div>
      </q-scroll-area>

    </div>

  </section>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { copyToClipboard, Notify } from 'quasar'
import { useTransactionsStore } from 'stores/transactions'
import SectionTitle from 'components/section-title.vue'

const transactionsStore = useTransactionsStore()
const chain = ref(1)

const transactions = computed(() => transactionsStore.transactions.filter((i) => i.chain === chain.value))

const copy = (val: string) => {
  copyToClipboard(val)
    .then(() => {
      Notify.create({ message: 'Скопировано.', position: 'top', color: 'positive' })
    })
    .catch(() => {
      Notify.create({ message: 'Ошибка копирования.', position: 'top', color: 'negative' })
    })
}

const getTransactionDate = (date: number) => {
  return new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}
</script>

<style lang="sass">
.app-transactions
  height: 43vh
  border-radius: 4px
  background: $dark
  padding: 8px
</style>
