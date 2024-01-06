import { ethers } from 'ethers'
import { api } from 'boot/axios'

export class Token {
  symbol: string
  name: string
  decimals: number
  address: string
  balance: number
  chain?: number | undefined
  quantity: number

  constructor (data: Token) {
    this.address = data.address
    this.symbol = data.symbol
    this.name = data.name
    this.decimals = data.decimals
    this.chain = data.chain
    this.balance = data.balance
    this.quantity = data.quantity || 0
  }

  getFormattedBalance () {
    return new Intl.NumberFormat('ru', {
      maximumFractionDigits: 10
    }).format(this.balance / 10 ** this.decimals)
  }
}

export interface ChainDtoInterface {
  name: string,
  id: number,
  native_token_symbol: string,
  RPC?: string,
  gas_limit?: number,
  gas_factor?: number,
  transaction_url?: string,
}

export class Chain {
  name: string
  id: number
  nativeTokenSymbol: string
  nativeTokenBalance?: number
  nativeTokenFormattedBalance?: string
  rpc: string
  gasLimit?: number
  gasFactor?: number
  defaultTokenAddress?: string
  transactionUrl?: string

  constructor (data: ChainDtoInterface, address: string) {
    this.name = data.name
    this.id = data.id
    this.defaultTokenAddress = address
    this.nativeTokenSymbol = data.native_token_symbol
    this.rpc = data.RPC || ""
    this.gasLimit = data.gas_limit
    this.gasFactor = data.gas_factor
    this.transactionUrl = data.transaction_url
  }

  getProvider (): ethers.JsonRpcProvider {
    return new ethers.JsonRpcProvider(this.rpc)
  }

  getWallet (): ethers.Wallet {
    const provider: ethers.JsonRpcProvider = this.getProvider()
    return new ethers.Wallet(localStorage.private_key, provider)
  }

  getFormattedBalance () {
    if (this.nativeTokenFormattedBalance) return this.nativeTokenFormattedBalance
    setTimeout(() => {
      return this.getFormattedBalance()
    }, 1000)
  }
}

export interface InchConfigDtoInterface {
  INCH_API_KEY: string,
  INCH_SWAP_API_KEY: string,
}

export class Inch {
  apiKey: string
  swapApiKey: string

  constructor (data: InchConfigDtoInterface) {
    this.apiKey = data.INCH_API_KEY
    this.swapApiKey = data.INCH_SWAP_API_KEY
  }
}
