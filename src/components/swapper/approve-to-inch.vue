<template>
  <Button
    type="swap"
    :disabled="!swapStore.token2.address"
    :loading="loading"
    @click="approve"
  >
    <span v-if="loading" :class="$style.buttonSwap">
      APPROVING...
    </span>
    <span v-else :class="$style.buttonSwap">
      APPROVE
    </span>
  </Button>
<!--  <ChipButton title="approve" @click="approve" />-->
</template>
<script setup lang="ts">
import { useMainStore } from 'stores/main'
import { api } from 'boot/axios'
import { AxiosError } from 'axios'
import coinAbi from 'src/abi/coin-abi'
import { useSwapStore } from 'stores/swap'
import { ethers } from 'ethers'
import { Notify } from 'quasar'
import { getAllowanceToSwap } from 'components/swapper/swapper'
import { ref } from 'vue'
import Button from "components/ui/Button.vue";

const loading = ref(false)
const mainStore = useMainStore()
const swapStore = useSwapStore()

const approve = async () => {

  if (mainStore.chain) {
    loading.value = true
    const addressToApprove = await getInchAddressToApprove()
    if (!addressToApprove) return null

    const provider = mainStore.chain.getProvider()
    const wallet = mainStore.chain.getWallet()
    const baseCoinContract = new ethers.Contract(swapStore.token1.address, coinAbi, wallet)
    const approvalAmount = ethers.parseUnits('1000000000000000', swapStore.token1.decimals)

    const feeData = await provider.getFeeData()

    let gasPrice = ethers.formatUnits(feeData.gasPrice || '1', 'gwei')
    console.log(gasPrice, mainStore.chain.gasFactor);
    gasPrice = Math.round((parseFloat(gasPrice) + parseFloat(gasPrice) * mainStore.chain.gasFactor)).toString()

    const tx = await baseCoinContract.approve(
      addressToApprove,
      approvalAmount,
      {
        gasLimit: mainStore.chain.gasLimit,
        gasPrice: ethers.parseUnits(gasPrice, 'gwei').toString()
      }
    ).catch(err => {
      Notify.create({ message: 'Транзакция завершилась ошибкой.', color: 'negative', position: 'top' })
      console.log('-> Approve error')
      console.log(err)
      loading.value = false
      return null
    })

    return tx.wait()
      .then(async () => {
        Notify.create({ message: 'Транзакция прошла успешно.', color: 'positive', position: 'top' })
        swapStore.allowanceToSwap = await getAllowanceToSwap(swapStore.token1.address, swapStore.token1.decimals)
        return null
      })
      .catch(err => {
        Notify.create({ message: 'Транзакция завершилась ошибкой.', color: 'negative', position: 'top' })
        console.log('-> Approve error')
        console.log(err)
        return null
      })
      .finally(() => {
        loading.value = false
      })
  }
}

const getInchAddressToApprove = async (): Promise<string> => {
  const mainStore = useMainStore()
  return api
    .get('get_approve_spender', {
      params: {
        chain: mainStore.chain?.id
      }
    })
    .then(res => res.data.address || '')
    .catch((err: AxiosError) => {
      console.log('-> getInchAddressToApprove', err.message)
      return ''
    })
}
</script>

<style lang="scss" module>
.buttonSwap {
  background: linear-gradient(102deg, #DC84F2 -2.09%, #44C8DE 108.93%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
}
</style>
