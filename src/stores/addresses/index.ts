import { defineStore } from 'pinia'

import { ref, Ref } from 'vue'
import { AxiosResponse, AxiosError } from 'axios'
import { api } from 'boot/axios'

interface Address {
  id: number
  address: string
  name: string
}

export const useAddressesStore = defineStore('addressesStore', () => {
  const addresses: Ref<Address[]> = ref([])

  const addAddress = async (address: { name: string, address: string }) => {
    const { data } = await api.post('add_address', {
      name: address.name,
      wallet_address: address.address
    })

    addresses.value.push(data.data)
  }

  const deleteAddress = async (id: number) => {
    const { data } = await api.delete(`/addresses/${id}`)

    addresses.value = data.data
  }

  const loadAddresses = async () => {
    const addressesRes = await api
      .get('get_addresses')
      .then((res: AxiosResponse) => {
        const { data } = res.data
        // const result = []
        // for (const key in data) {
        //   result.push({ name: key, address: data[key] })
        // }
        return data
      })
      .catch((e: AxiosError) => {
        console.log('-> Addresses load error: ', e)
        return loadAddresses()
      })

    if (addressesRes && addressesRes.length) addresses.value = addressesRes
  }

  const init = async () => {
    await loadAddresses()
  }

  return {
    addAddress,
    deleteAddress,
    init,

    addresses
  }
})
