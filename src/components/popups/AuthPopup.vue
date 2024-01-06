<template>
  <PopupLayout
    :is-logo="true"
    text-button="Unlock"
    @button-click="auth"
  >
    <TextField
      v-model="access_key"
      label="Enter access key"
      placeholder="Access key"
      :error="error"
    />
  </PopupLayout>
</template>

<script lang="ts" setup>
import PopupLayout from "layouts/PopupLayout.vue";
import TextField from "components/ui/TextField.vue";
import { useAuthStore } from "stores/auth";
import { ref, computed } from 'vue'

const authStore = useAuthStore()
const access_key: string = ref('');
const error = computed(() => authStore.error);

const auth = async () => {
  await authStore.auth(access_key.value)
}
</script>

<style scoped>

</style>
