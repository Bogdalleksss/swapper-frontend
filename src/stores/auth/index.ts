import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { api } from "boot/axios";

interface MeInterface {
  id: string
  inch_api_key: string | null
  inch_api_swap_key: string | null
  wallet_address: string | null
}

export const useAuthStore = defineStore('authStore', () => {
  // const addresses: Ref<{ address: string, name: string }[]> = ref([])
  const jwt_token: Ref<String> = ref(localStorage.jwt_token || '')
  const isAuth: Ref<Boolean> = ref(!!localStorage.jwt_token)
  const error: Ref<String> = ref('')
  const me: Ref<MeInterface | null> = ref(null)

  const auth = async (access_key: string) => {
    try {
      error.value = ''

      const { data } = await api.post('/auth', {
        access_key
      })

      const { access_token } = data;
      localStorage.jwt_token = access_token;
      jwt_token.value = access_token;
      isAuth.value = true;

      api.defaults.headers.common = {
        'Authorization': `Bearer ${access_token}`
      };

      await fetchMe()
    } catch (e) {
      error.value = 'Access is denied'
    }
  }

  const fetchMe = async () => {
    try {
      error.value = ''

      const { data } = await api.get('/users/me')

      me.value = data.data
    } catch (e) {
      console.log(e)
    }
  }

  const saveMeData = async ({ private_key, wallet_address, inch_api_key, inch_api_swap_key }: any) => {
    try {
      localStorage.private_key = private_key

      const { data } = await api.post('/users/edit/me', {
        wallet_address,
        inch_api_key,
        inch_api_swap_key
      })

      me.value = data.data

      api.defaults.headers.common.private_key = localStorage.private_key;
    } catch (e) {
      console.log(e)
    }
  }

  return {
    isAuth,
    error,
    me,

    auth,
    fetchMe,
    saveMeData
  }
})
