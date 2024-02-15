import type { UserDTOOut } from '@/@types'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as UserDTOOut
  }),
  actions: {
    SET_USER(user: UserDTOOut) {
      this.user = user
    },
    SET_USER_BY_TOKEN_JWT(token: string | null) {
      if (token) {
        const { login }: { login: UserDTOOut } = jwtDecode(token)
        this.user = login
      }
    },
    DELETE_USER() {
      this.user = {} as UserDTOOut
    }
  }
})
