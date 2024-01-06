import { api } from 'boot/axios'
import { useMainStore } from 'stores/main'
import { ethers } from 'ethers'
import { useSwapStore } from 'stores/swap'
import { AxiosError, AxiosResponse } from 'axios'
import { Notify } from 'quasar'
import { useTransactionsStore } from 'stores/transactions'
import coinAbi from 'src/abi/coin-abi'

export const getAllowanceToSwap = async (token: string, decimals: number) => {
  const mainStore = useMainStore()
  return api
    .get('get_allowance', {
      params: {
        chain: mainStore.chain?.id,
        token
      }
    })
    .then(res => res.data.allowance / 10 ** decimals)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getSwapData = async () => {
  const mainStore = useMainStore()
  const swapStore = useSwapStore()
  const baseTokenAmount = ethers.parseUnits(swapStore.token1.quantity.toString(), swapStore.token1.decimals)

  const params: { receiver?: string } = {}
  if (swapStore.recipientAddress && swapStore.sendToRecipientInSwap) {
    params.receiver = swapStore.recipientAddress
  }

  if (mainStore.chain) {
    return api.get('/get_swap_data', {
      params: {
        chain: mainStore.chain.id,
        tokenTo: swapStore.token2.address,
        tokenFrom: swapStore.token1.address,
        amount: baseTokenAmount.toString(),
        slippage: swapStore.slippage,
        ...params
      }
    })
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => { console.log(err) })
  }
}

export const swapTokens = async (): Promise<boolean> => {
  const mainStore = useMainStore()
  const swapStore = useSwapStore()
  const transactionsStore = useTransactionsStore()

  const swapData = await getSwapData()

  if (swapData.error) {
    Notify.create({ message: swapData.description, color: 'negative', position: 'top' })
    return false
  }

  if (!swapData.tx) {
    return swapTokens()
  }

  if (mainStore.chain) {
    const provider = mainStore.chain.getProvider()
    const wallet = mainStore.chain.getWallet()

    const feeData = await provider.getFeeData()
    let gasPrice = ethers.formatUnits(feeData.gasPrice || '1', 'gwei')
    gasPrice = Math.round((parseFloat(gasPrice) + parseFloat(gasPrice) * mainStore.chain.gasFactor)).toString()

    const tx = {
      data: swapData.tx.data,
      from: swapData.tx.from,
      to: swapData.tx.to,
      gasPrice: ethers.parseUnits(gasPrice, 'gwei').toString(),
      gasLimit: mainStore.chain.gasLimit
    }

    return wallet.sendTransaction(tx)
      .then(async (receipt) => {
        await transactionsStore.addTransaction({
          hash: receipt.hash,
          token_from: swapStore.token1.symbol,
          token_from_quantity: swapStore.token1.quantity,
          token_to: swapStore.token2.symbol,
          token_to_quantity: swapStore.token2.quantity,
          chain: mainStore.chain?.id || 0
        })
        await transactionsStore.init()
        await new Promise(resolve => {
          setTimeout(async () => {
            swapStore.token1 = await swapStore.getTokenInfo(swapStore.token1.address)
            swapStore.token2 = await swapStore.getTokenInfo(swapStore.token2.address)
            swapStore.token1.quantity = 0
            swapStore.token2.quantity = 0
            resolve('')
          }, 2000)
        })
        Notify.create({ message: 'Транзакция прошла успешно.', color: 'positive', position: 'top' })
        return true
      })
      .catch((error) => {
        console.error('Произошла ошибка при отправке транзакции:', error)
        Notify.create({ message: 'Транзакция завершилась ошибкой.', color: 'negative', position: 'top' })
        return false
      })
  }

  return false
}

export const sendTokens = async (amount: number): Promise<boolean> => {
  const mainStore = useMainStore()
  const swapStore = useSwapStore()

  if (mainStore.chain) {
    const provider = mainStore.chain.getProvider()
    const wallet = mainStore.chain.getWallet()
    const feeData = await provider.getFeeData()
    let gasPrice = ethers.formatUnits(feeData.gasPrice || '1', 'gwei')
    gasPrice = Math.round((parseFloat(gasPrice) + parseFloat(gasPrice) * mainStore.chain.gasFactor)).toString()
    const coinContract = new ethers.Contract(swapStore.token2.address, coinAbi, wallet)
    const decimals = await coinContract.decimals()
    const balance = await coinContract.balanceOf(wallet.address)

    let amountToSend = ethers.parseUnits(amount.toString(), parseInt(decimals.toString()))

    if (balance.toString() / 10 ** parseInt(decimals.toString()) <= amount) amountToSend = balance.toString()

    const tx = await coinContract.transfer(
      swapStore.recipientAddress,
      amountToSend,
      {
        gasLimit: mainStore.chain.gasLimit,
        gasPrice: ethers.parseUnits(gasPrice, 'gwei').toString()
      })

    return tx.wait()
      .then(() => {
        Notify.create({ message: 'Транзакция завершена.', color: 'positive', position: 'top' })
        return true
      })
      .catch((err: any) => {
        console.log('-> Send error: ', err)
        Notify.create({ message: 'Транзакция завершилась ошибкой.', color: 'negative', position: 'top' })
        return false
      })
  }

  return false
}
