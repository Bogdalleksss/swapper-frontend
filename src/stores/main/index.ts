import { defineStore } from 'pinia'
import { Chain, ChainDtoInterface, Inch } from 'stores/main/models'
import { Ref, ref } from 'vue'
import { api } from 'boot/axios'
import { AxiosResponse } from 'axios'

export const useMainStore = defineStore('mainStore', () => {
  const chain: Ref<Chain | null> = ref(null)
  const chains: Ref<ChainDtoInterface[]> = ref([
    {
      id: 1,
      name: 'Ethereum',
      native_token_symbol: 'ETH',
      transaction_url: 'https://etherscan.io/tx'
    },
    {
      id: 56,
      name: 'BSC',
      native_token_symbol: 'BNB',
      transaction_url: 'https://bscscan.com/tx'
    },
    {
      id: 42161,
      name: 'Arbitrum',
      native_token_symbol: 'ARB',
      transaction_url: 'https://arbiscan.io/tx'
    },
    {
      id: 10,
      name: 'Optimism',
      native_token_symbol: 'OP',
      transaction_url: 'https://optimistic.etherscan.io/tx'
    },
    {
      id: 137,
      name: 'Polygon',
      native_token_symbol: 'MATIC',
      transaction_url: 'https://polygonscan.com/tx'
    },
    {
      id: 8453,
      name: 'Base',
      native_token_symbol: 'ETCH',
      transaction_url: 'https://basescan.org/tx'
    },
  ])
  const inch: Ref<Inch | null> = ref(null)
  const rpc: Ref<string> = ref("")
  const address: Ref<string> = ref("")
  const decimals: Ref<number | string> = ref("")
  const gas_factor: Ref<number | string> = ref("")
  const gas_limit: Ref<number | string> = ref("")
  const popup: Ref<String | null> = ref("")

  const setPopup = (name: string) => {
    popup.value = name
  }

  const selectChain = (id: number) => {
    const findChain: any = chains.value.find(item => item.id === id)

    localStorage.selectedChain = id

    chain.value = new Chain({
      ...findChain,
      RPC: rpc.value,
      gas_limit: gas_limit.value,
      gas_factor: gas_factor.value,
    }, address.value || "")
  }

  const getMainData = async () => {
    const chainId = localStorage.selectedChain;
    const chainsCatch = localStorage.chains ? JSON.parse(localStorage.chains) : []
    const selectedChain = chainsCatch.find((i: any) => i.id === +chainId) || chainsCatch[0]

    if (chainsCatch.length) {
      rpc.value = selectedChain.rpc
      address.value = selectedChain.address
      gas_factor.value = selectedChain.gas_factor
      gas_limit.value = selectedChain.gas_limit
      decimals.value = selectedChain.decimals
      selectChain(selectedChain.id);
    }
  }

  const init = async () => {
    await getMainData()
  }

  return {
    chain,
    chains,
    inch,
    popup,
    rpc,
    address,
    gas_limit,
    decimals,
    gas_factor,

    setPopup,
    init,
    selectChain
  }
})
