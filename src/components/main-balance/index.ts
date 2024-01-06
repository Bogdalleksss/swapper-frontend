import { Chain } from 'stores/main/models'
import { api } from 'boot/axios'

export type MainBalanceType = { balance: number, formattedBalance: string }

export const getMainBalance = async (chain: Chain): Promise<MainBalanceType> => {
  return api
    .get('get_eth_balance', {
      params: {
        chain: chain.id,
        address: chain.walletAddress
      }
    })
    .then(res => {
      return {
        balance: res.data.balance,
        formattedBalance: new Intl.NumberFormat('ru', {
          maximumFractionDigits: 5
        }).format(res.data.balance / 10 ** 18)
      }
    })
}
