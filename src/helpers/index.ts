import { useMainStore } from "stores/main";

export const getChainName = (chainId: number): string => {
  const mainStore = useMainStore()

  const chain = mainStore.chains.find((item: any) => {
    return item.id === chainId
  })

  return chain?.name || chainId.toString()
}

export const roundNum = (val: number, digits = 10) => {
  return Math.floor(val * Math.pow(10, digits)) / Math.pow(10, digits);
}
