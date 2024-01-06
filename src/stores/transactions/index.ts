import { defineStore } from 'pinia'

import { ref, Ref } from 'vue'
import { AxiosResponse, AxiosError } from 'axios'
import { api } from 'boot/axios'

interface Transaction {
  hash: string,
  token_from: string,
  token_from_quantity: number,
  token_to: string,
  token_to_quantity: number,
  chain: number
}

export const useTransactionsStore = defineStore('transactionsStore', () => {
  const transactions: Ref<{ chain: number, date: Date, monet: string, hash: string }[]> = ref([])

  const addTransaction = async (transaction: Transaction) => {
    await api.post('add_transaction', transaction)

    await loadTransactions()
  }

  const loadTransactions = async (): Promise<void> => {
    const txres = await api.get('get_transactions').then((res: AxiosResponse) => {
      const { data } = res.data
      return data.sort((a: any, b: any) => b.date - a.date)
    })
      .catch((e: AxiosError) => {
        console.log('-> Load transactions error: ', e)
        return loadTransactions()
      })

    if (txres && txres.length) transactions.value = txres
  }

  const init = async () => {
    await loadTransactions()
  }

  return {
    addTransaction,
    init,

    transactions
  }
})
