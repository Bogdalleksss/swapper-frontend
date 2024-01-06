import { defineStore } from 'pinia'

import { ref, Ref } from 'vue'
import { AxiosResponse, AxiosError } from 'axios'
import { api } from 'boot/axios'


interface Token {
  token: string
  chain: number
  balance: number
  address: string
}

export const useTokensStore = defineStore('tokensStore', () => {
  const tokens: Ref<Token[]> = ref([])

  const addToken = async ({ token, chain, address, balance }: Token) => {
    try {
      const { data } = await api.post('/tokens', {
        token,
        chain,
        address,
        balance,
      })

      tokens.value = data.data
    } catch (e) {
      console.error('Ошибка в addToken:', e)
    }
  }

  const removeToken = async (id: number) => {
    try {
      const { data } = await api.delete(`/tokens/${id}`)

      tokens.value = data.data
    } catch (e) {
      console.error('Ошибка в addToken:', e)
    }
  }

  const loadTokens = async () => {
    const addressesRes = await api
      .get('tokens')
      .then((res: AxiosResponse) => {
        const { data } = res.data
        return data
      })
      .catch((e: AxiosError) => {
        console.log('-> Tokens load error: ', e)
        return loadTokens()
      })

    if (addressesRes && addressesRes.length) addresses.value = addressesRes
  }

  const init = async () => {
    await loadTokens()
  }

  return {
    addToken,
    removeToken,
    init,

    tokens
  }
})
