<template>
  <PopupLayout
    :title="isEditing && 'Edit user info'"
    :is-logo="!isEditing"
    :text-button="isEditing ? 'save settings' : 'add user info'"
    @button-click="save"
  >
    <div :class="[
      $style.body,
      {
        [$style.editing]: isEditing
      }
    ]">
      <TextField
        v-model="private_key"
        label="Enter private key"
        placeholder="Private key"
        :secret="true"
        :error="errors.private_key"
      />
      <TextField
        v-model="wallet_address"
        label="Enter wallet address"
        placeholder="Wallet address"
        :error="errors.wallet_address"
      />
      <TextField
        v-model="inch_api_key"
        label="Enter 1Inch api key"
        placeholder="1Inch api key"
        :error="errors.inch_api_key"
      />
      <TextField
        v-model="inch_api_swap_key"
        label="Enter 1Inch swap api key"
        placeholder="1Inch swap api key"
        :error="errors.inch_api_swap_key"
      />
    </div>
  </PopupLayout>
</template>

<script lang="ts" setup>
import PopupLayout from "layouts/PopupLayout.vue";
import TextField from "components/ui/TextField.vue";
import { defineProps, ref, computed } from 'vue'
import { useAuthStore } from "stores/auth";
import { useMainStore } from "stores/main";

const authStore = useAuthStore()
const store = useMainStore()

const defaultError = {
  private_key: '',
  wallet_address: '',
  inch_api_swap_key: '',
  inch_api_key: '',
}

const private_key = ref(localStorage.private_key || '')
const wallet_address = ref(authStore.me?.wallet_address || '')
const inch_api_swap_key = ref(authStore.me?.inch_api_swap_key || '')
const inch_api_key = ref(authStore.me?.inch_api_key || '')

const errors = ref(defaultError)

const validate = () => {
  errors.value.private_key = ''
  errors.value.wallet_address = ''
  errors.value.inch_api_swap_key = ''
  errors.value.inch_api_key = ''

  if (!private_key.value) errors.value.private_key = "Please, enter Private key"
  if (!wallet_address.value) errors.value.wallet_address = "Please, enter Wallet address"
  if (!inch_api_swap_key.value) errors.value.inch_api_swap_key = "Please, enter 1Inch api swap key"
  if (!inch_api_key.value) errors.value.inch_api_key = "Please, enter 1Inch api key"

  return !(errors.value.private_key
    || errors.value.wallet_address
    || errors.value.inch_api_swap_key
    || errors.value.inch_api_key);
}

const save = async () => {
  const isValid = validate();

  if (isValid) {
    await authStore.saveMeData({
      private_key: private_key.value,
      wallet_address: wallet_address.value,
      inch_api_swap_key: inch_api_swap_key.value,
      inch_api_key: inch_api_key.value,
    })

    store.setPopup('')
  }
}

defineProps({
  isEditing: Boolean
})
</script>

<style lang="scss" module>
.body {
  display: grid;
  width: 100%;
  gap: 16px;

  &.editing {
    margin-top: 18px;
  }
}
</style>
