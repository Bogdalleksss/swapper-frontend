<template>
  <div
    ref="scroll"
    :class="[
      $style.transactions,
      {
        [$style.ended]: opacity === 1,
        [$style.scroll]: isScroll
      }
    ]"
    @scroll="scrollHandler"
  >
    <div
      :class="$style.transactionsWrapper"
    >
      <Transaction
        v-for="transaction in transactions"
        :key="transaction.id"
        :token-from="transaction.token_from"
        :token-to="transaction.token_to"
        :quantity-token-from="transaction.token_from_quantity"
        :quantity-token-to="transaction.token_to_quantity"
        :chain="getChainName(transaction.chain)"
        :hash="transaction.hash"
        :date="moment(transaction.date).utcOffset(-360).format('MM.DD.YYYY HH:mm')"
      />
    </div>
    <span v-if="!transactions.length" :class="$style.empty">There were no transactions</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from 'vue'
import Transaction from "components/ui/transactions/Transaction.vue";
import { useMainStore } from "stores/main";
import moment from 'moment'
import { getChainName } from "src/helpers";

defineProps({
  transactions: Array
})

const search = ref('')
const opacity = ref(0)
const scroll = ref(null)
const isScroll = ref(true)

const scrollHandler = (e) => {
  const y = e.target.scrollTop + e.target.clientHeight
  const endpoint = e.target.scrollHeight - 20

  if (y > endpoint) opacity.value = 1
  else opacity.value = 0
}

onMounted(() => {
  const h = scroll.value.clientHeight
  const sh = scroll.value.scrollHeight

  if (sh <= h) {
    opacity.value = 1
    isScroll.value = false
  }
})
</script>

<style lang="scss" module>
.transactions {
  margin-top: 24px;
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: .5s;
  mask-image: linear-gradient(#000, rgba(0, 0, 0, 0));

  &.scroll {
    padding-right: 18px;

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

  &.ended {
    mask-image: linear-gradient(#000, rgba(0, 0, 0, 1));
  }

  .empty {
    width: 100%;
    text-align: center;
    display: inline-block;
    padding-top: 20px;
    opacity: .5;
  }

  &Wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 1024px) {
    overflow: visible;
    height: auto;
    mask-image: linear-gradient(#000, rgba(0, 0, 0, 1)) !important;
  }
}
</style>
