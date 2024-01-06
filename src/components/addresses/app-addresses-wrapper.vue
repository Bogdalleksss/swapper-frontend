<script setup lang="ts">
import { useAddressesStore } from 'stores/addresses'
import { ref } from 'vue'
import { Notify, ValidationRule } from 'quasar'
import SectionTitle from 'components/section-title.vue'
import AppAddresses from 'components/addresses/app-addresses.vue'

const store = useAddressesStore()

const dialog = ref(false)
const addLoading = ref(false)
const newAddressForm = ref({
  address: '',
  name: ''
})
const search = ref('')

const onFormSubmit = async () => {
  addLoading.value = true
  await store.addAddress(newAddressForm.value)
  addLoading.value = false
  await store.init()
  dialog.value = false
  Notify.create({ message: 'Новый адрес создан.', color: 'positive', position: 'top' })
  newAddressForm.value.address = ''
  newAddressForm.value.name = ''
}

const rulesNoEmpty = ():ValidationRule[] => {
  return [
    val => !!val || 'Это обязательное поле'
  ]
}
</script>

<template>
  <section class="app-addresses-wrapper">
    <div class="flex items-center justify-between">
      <section-title title="Адреса"/>
      <q-input label="Поиск" dense v-model="search"/>
      <div>
        <q-btn
          label="Добавить адрес"
          icon="add"
          color="info"
          unelevated
          no-caps
          @click="dialog = !dialog"
        />
      </div>
    </div>

    <div class="q-mt-md">
      <q-scroll-area style="height: calc(43vh - 60px)">
        <app-addresses :search="search" />
      </q-scroll-area>

    </div>

    <q-dialog v-model="dialog">
      <q-card style="width: 1200px" flat>
        <q-toolbar>
          <q-toolbar-title>Добавление адреса</q-toolbar-title>
          <q-btn flat dense icon="close" v-close-popup/>
        </q-toolbar>

        <q-card-section>
          <q-form @submit="onFormSubmit">
            <q-input
              label="Адрес"
              v-model="newAddressForm.address"
              :rules="rulesNoEmpty()"
            />

            <q-input
              label="Название"
              v-model="newAddressForm.name"
              :rules="rulesNoEmpty()"
            />

            <q-btn
              label="Создать"
              color="primary"
              unelevated
              class="text-bold q-mt-md full-width q-py-md"
              type="submit"
              :loading="addLoading"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<style lang="sass">
.app-addresses-wrapper
  height: 43vh
  border-radius: 4px
  background: $dark
  padding: 8px
</style>
