<script setup lang="ts">
import { useSwapStore } from 'stores/swap'
import { ref } from 'vue'
import AppAddresses from 'components/addresses/app-addresses.vue'
import { sendTokens } from 'components/swapper/swapper'

const store = useSwapStore()
const amountToSend = ref(0)
const search = ref('')
const sendLoading = ref(false)

const setMaxToSwap = () => {
  amountToSend.value = store.token2.balance / 10 ** store.token2.decimals
}

const getClipboard = (): Promise<string> | string => {
  if (navigator.clipboard) {
    return navigator.clipboard.readText()
      .then((text: string) => text)
      .catch(() => {
        console.error('Не удалось прочитать данные из буфера обмена: ')
        return ''
      })
  } else {
    console.error('API буфера обмена не поддерживается в данном браузере.')
    return ''
  }
}

const setAddressFromClipboard = async () => {
  store.recipientAddress = await getClipboard()
}

const sendCoins = async () => {
  sendLoading.value = true
  const success = await sendTokens(amountToSend.value)
  if (success) {
    store.sendTokenAfterSwapDialog = false
    store.recipientAddress = ''
    store.slippage = 1
  }
  sendLoading.value = false
}
</script>

<template>
  <q-dialog v-model="store.sendTokenAfterSwapDialog" persistent>
    <q-card style="width: 1300px" flat>
      <q-toolbar>
        <q-toolbar-title>Отправка монет {{ store.token2.symbol }}</q-toolbar-title>
        <q-btn flat dense icon="close" v-close-popup/>
      </q-toolbar>

      <q-card-section>
        <small class="block">Баланс: {{ store.token2.getFormattedBalance() }}</small>
        <q-input label="Адрес отправки" v-model="store.recipientAddress">
          <template v-slot:append>
            <q-btn
              label="Вставить"
              no-caps
              unelevated
              color="info"
              @click="setAddressFromClipboard"
            />
          </template>
        </q-input>
        <q-input label="Кол-во" v-model="amountToSend">
          <template v-slot:append><q-btn label="Max" dense flat text no-caps @click="setMaxToSwap"/></template>
        </q-input>
        <q-input class="q-mt-lg" label="Поиск" dense v-model="search"/>

        <q-scroll-area style="height: 310px" class="q-mt-sm">
          <app-addresses :search="search" />
        </q-scroll-area>

        <q-btn :disable="!store.recipientAddress" label="Отправить" color="primary" class="q-mt-sm q-py-md text-bold full-width" unelevated @click="sendCoins" :loading="sendLoading"/>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
