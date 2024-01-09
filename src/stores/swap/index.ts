import { defineStore } from 'pinia'
import { computed, ref, Ref, watch } from 'vue'
import { Token } from 'stores/main/models'
import { useMainStore } from 'stores/main'
import { api } from 'boot/axios'
import { ethers } from 'ethers'
import { AxiosResponse } from 'axios'
import { getAllowanceToSwap } from 'components/swapper/swapper'
import { useTokensStore } from "stores/tokens";
import { roundNum } from "../../helpers";

export const useSwapStore = defineStore('swapStore', () => {
  const mainStore = useMainStore()
  const chainId = computed(() => mainStore.chain?.id)
  const rpc = computed(() => mainStore.chain?.rpc)

  const token1: Ref<Token> = ref(new Token({ name: '', symbol: '', address: '', decimals: 0, balance: 0, quantity: 0, getFormattedBalance (): string { return '' } }))
  const token2: Ref<Token> = ref(new Token({ name: '', symbol: '', address: '', decimals: 0, balance: 0, quantity: 0, getFormattedBalance (): string { return '' } }))
  const token1Address = computed(() => token1.value.address)
  const token2Address = computed(() => token2.value.address)
  const token1Quantity = computed(() => token1.value.quantity)
  const token1Loaded = ref(true)
  const token2Loaded = ref(false)
  const token2Price = ref(0)
  const isReversingTokens = ref(false)
  const isReversedTokens = ref(false)
  const slippage = ref(0.1)
  const priceInUpdate = ref(false)

  const recipientAddress = ref('')
  const sendToRecipientInSwap = ref(false)
  const sendTokenAfterSwapDialog = ref(false)

  const allowanceToSwap = ref(0)

  const tokenStore = useTokensStore()

  const getTokenInfo = async (address: string) => {
    return api
      .get('get_token_info', {
        params: {
          rpc: mainStore.rpc,
          address: address || mainStore.address
        }
      })
      .then(res => {
        const newToken = new Token({
          ...res.data,
          chain: mainStore.chain?.id
        });

        const { symbol, address, chain } = newToken

        tokenStore.addToken({
          token: symbol,
          address,
          chain,
          balance: roundNum(newToken.balance / 10 ** newToken.decimals)
        })

        return newToken
      })
  }

  const getAmountToken2Quantity = () => {
    setInterval(fetchAmountToken2Quantity, 4000)
  }

  const fetchAmountToken2Quantity = async () => {
    if (token2.value.address && token1.value.quantity && !isReversingTokens.value) {
      priceInUpdate.value = true
      token2.value.quantity = await api
        .get('get_qoute', {
          params: {
            chain: mainStore.chain?.id,
            tokenTo: token2.value.address,
            tokenFrom: token1.value.address,
            amount: +token1.value.quantity * 10 ** token1.value.decimals
          }
        })
        .then((res: AxiosResponse) => {
          const amountOut = res.data.toAmount / 10 ** token2.value.decimals || token2.value.quantity
          token2Price.value = isReversedTokens.value
            ? amountOut / token1.value.quantity
            : token1.value.quantity / amountOut
          return amountOut
        })
        .finally(() => {
          priceInUpdate.value = false
        })
    }
  }

  const init = async () => {
    const catchToken1 = localStorage.token1Address
    const catchToken2 = localStorage.token2Address

    if (catchToken1) token1.value.address = catchToken1
    if (catchToken2) token2.value.address = catchToken2
    getAmountToken2Quantity()
    if (mainStore.chain) {
      token1.value.chain = mainStore.chain.id
      token2.value.chain = mainStore.chain.id
    } else {
      setTimeout(() => {
        init()
      }, 4000)
    }
  }

  watch(token1Address, async (val) => {
    const isValidValue = ethers.isAddress(val)
    localStorage.token1Address = val
    if (!isReversingTokens.value) {
      token1.value.quantity = localStorage.tokenQuantity || 0
      token2.value.quantity = 0
      token2Price.value = 0

      if (isValidValue) {
        token1Loaded.value = false
        token1.value = await getTokenInfo(val)
        token1.value.quantity = localStorage.tokenQuantity || 0
        allowanceToSwap.value = 0
        allowanceToSwap.value = await getAllowanceToSwap(token1.value.address, token1.value.decimals)
        token1Loaded.value = true
      }
    }
  })

  watch(token2Address, async (val) => {
    const isValidValue = ethers.isAddress(val)
    localStorage.token2Address = val

    if (isValidValue && !isReversingTokens.value) {
      token2Loaded.value = false
      token2.value = await getTokenInfo(val)
      token2Loaded.value = true
    }

    isReversingTokens.value = false
  })

  watch(token1Quantity, (val: string | number) => {
    // val = parseFloat(val.toString())
    // const tokenBalance = token1.value.balance / 10 ** token1.value.decimals

    // if (val > tokenBalance) {
    //   token1.value.quantity = token1.value.balance / 10 ** token1.value.decimals
    // }
  })

  const onChangeChain = async (val: number) => {
    if (val !== token1.value.chain) {
      token1.value.quantity = 0
      token2.value.quantity = 0
      token2.value.address = ''
      token2.value.decimals = 0
      token2.value.name = ''
      token2.value.symbol = ''
      token1.value = await getTokenInfo(mainStore.chain?.defaultTokenAddress || '')
    }
  }

  watch(chainId, onChangeChain)
  // watch(rpc, onChangeChain)

  return {
    token1,
    token2,
    token1Loaded,
    token2Loaded,
    slippage,
    priceInUpdate,
    allowanceToSwap,

    recipientAddress,
    sendToRecipientInSwap,
    token2Price,

    sendTokenAfterSwapDialog,

    isReversingTokens,
    isReversedTokens,

    init,
    getTokenInfo,
    fetchAmountToken2Quantity
  }
})
