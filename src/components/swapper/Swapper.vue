<template>
  <BlockLayout
    title="Swap"
    :loading="!swapStore.token1Loaded || swapStore.priceInUpdate || loading"
  >
        <template v-slot:head>
          <div :class="$style.control">
            <ChipButton
              :title="`${swapStore.slippage}%`"
              @click="store.setPopup('slippage')"
            >
              <template v-slot:append>
                <img
                  src="~/assets/img/icons/settings.svg"
                />
              </template>
            </ChipButton>
            <ChipButton
              title="addresses"
              @click="store.setPopup('addresses')"
            >
              <template v-slot:append>
                <img
                  src="~/assets/img/icons/btc.svg"
                />
              </template>
            </ChipButton>
          </div>
        </template>

        <template v-slot:default>
          <div :class="$style.content">
            <div :class="$style.swapWrapper">
              <SwapperField
                :token="swapStore.token1.symbol"
                :address="swapStore.token1.address"
                :balance="swapStore.token1.getFormattedBalance()"
                :quantity="+roundNum(swapStore.token1.quantity)"
                :disabled="!swapStore.token1Loaded || loading"
                name="token1"
                title="You're paying"
                @input="val => swapStore.token1.address = val"
                @input-quantity="inputQuantity"
                @max="setMaxToSwap"
                @clear="clear"
              />
              <SwapperReverse
                :class="$style.reverse"
                :disabled="!reversButtonActive"
                @click="reverseTokens"
              />
              <SwapperField
                :token="swapStore.token2.symbol || '-'"
                :quantity="+roundNum(swapStore.token2.quantity)"
                :balance="swapStore.token2.getFormattedBalance()"
                :sub-quantity="swapStore.token2Price"
                :address="swapStore.token2.address"
                :disabled="!swapStore.token1Loaded || loading"
                name="token2"
                title="You receive"
                type="onlyRead"
                @input="(val) => swapStore.token2.address = val"
              />
            </div>

            <span :class="$style.divider" />

            <TextField
              v-model="swapStore.recipientAddress"
              placeholder="Recipient's address"
              :class="$style.input"
            />
            <Checkbox
              v-show="swapStore.recipientAddress"
              v-model="swapStore.sendToRecipientInSwap"
              id="send-check"
              label="Send immediately"
              :class="$style.checkbox"
            />

            <div :class="$style.button">
              <Button
                v-if="swapStore.allowanceToSwap > 0"
                type="swap"
                :disabled="!reversButtonActive || !swapStore.token1.quantity || loading"
                :loading="swapLoading"
                @click="swap"
              >
              <span v-if="swapLoading" :class="$style.buttonSwap">
                SWAPPING...
              </span>
                <span v-else :class="$style.buttonSwap">
                SWAP
              </span>
              </Button>
              <approve-to-inch v-else />
            </div>
          </div>
        </template>
  </BlockLayout>
</template>

<script lang="ts" setup>
import BlockLayout from "layouts/BlockLayout.vue";
import ChipButton from "components/ui/ChipButton.vue";
import SwapperField from "components/swapper/swapper-field/SwapperField.vue";
import TextField from "components/ui/TextField.vue";
import Button from "components/ui/Button.vue";
import SwapperReverse from "components/swapper/swapper-field/SwapperReverse.vue";
import ApproveToInch from "components/swapper/approve-to-inch.vue";
import { useMainStore } from "stores/main";
import { useSwapStore } from "stores/swap";
import { computed, ref, onMounted } from "vue";
import { getAllowanceToSwap, swapTokens } from "components/swapper/swapper";
import { roundNum } from "src/helpers";
import Checkbox from "components/ui/Checkbox.vue";

const store = useMainStore()
const swapStore = useSwapStore()
const swapLoading = ref(false)
const loading = ref(false)

const reversButtonActive = computed(() => swapStore.token1.address
  && swapStore.token2.address
  && swapStore.token1Loaded
  && swapStore.token2Loaded
  && !swapStore.priceInUpdate)

const getFormattedValue = (value: number, digits = 15) => {
  return new Intl.NumberFormat('ru', {
    maximumFractionDigits: digits
  }).format(value)
}

const setMaxToSwap = () => {
  const quantity = swapStore.token1.balance / 10 ** swapStore.token1.decimals
  swapStore.token1.quantity = roundNum(quantity)
  localStorage.tokenQuantity = roundNum(quantity)
}

const clear = () => {
  swapStore.token1.quantity = 0
  swapStore.token2.quantity = 0
  localStorage.tokenQuantity = 0
}

const reverseTokens = async () => {
  loading.value = true;

  swapStore.isReversingTokens = true
  swapStore.isReversedTokens = !swapStore.isReversedTokens

  const tokens = [swapStore.token1, swapStore.token2].slice(0, 2)

  swapStore.token1 = tokens[1]
  swapStore.token2 = tokens[0]

  swapStore.allowanceToSwap = await getAllowanceToSwap(swapStore.token1.address, swapStore.token1.decimals)

  loading.value = false;
}

const swap = async () => {
  swapLoading.value = true
  const result = await swapTokens()

  swapStore.recipientAddress = ""

  if (result) {
    if (swapStore.recipientAddress && !swapStore.sendToRecipientInSwap) {
      swapStore.sendTokenAfterSwapDialog = true
    }
  }

  swapLoading.value = false
}

const inputQuantity = (val: string) => {
  localStorage.tokenQuantity = val
  swapStore.token1.quantity = val
}
</script>

<style lang="scss" module>
.control {
  display: flex;
  gap: 8px;
}

.content {
  padding: 20px;
  background: #283440;
  border-radius: 16px;

  .swapWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .reverse {
      position: absolute;
    }
  }

  .divider {
    display: block;
    background: #3A4755;
    height: 1px;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .input {
    margin-bottom: 0px;
  }

  .checkbox {
    margin-top: 12px;
    margin-bottom: 25px;
  }

  .button {
    margin-top: 20px;
    &Swap {
      background: linear-gradient(102deg, #DC84F2 -2.09%, #44C8DE 108.93%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 18px;
      font-weight: 600;
      line-height: normal;
    }
  }
}
</style>
