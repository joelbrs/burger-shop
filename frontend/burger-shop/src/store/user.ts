import type { UserDTOOut } from '@/@types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as UserDTOOut
  }),
  actions: {
    SET_USER(user: UserDTOOut) {
      this.user = user
    },
    DELETE_USER() {
      this.user = {} as UserDTOOut
    }
  }
})
