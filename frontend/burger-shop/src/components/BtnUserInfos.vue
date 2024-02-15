<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogOut, User, CircleUser, Mail } from 'lucide-vue-next'
import { useUserStore } from '@/store/user'
import { onMounted, ref } from 'vue'
import type { UserDTOOut } from '@/@types'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { useCartStore } from '@/store/cart'

const $router = useRouter()
const { cookies } = useCookies()
const $userStore = useUserStore()
const $cartStore = useCartStore()

const user = ref<UserDTOOut>({
  email: '',
  id: '',
  name: '',
  type: ''
})

const logOut = async () => {
  cookies.remove('access_token')
  $userStore.DELETE_USER()
  $cartStore.DESTROY_CART()
  await $router.push({ name: 'login' })
}

onMounted(() => {
  if ($userStore.user) {
    user.value = { ...$userStore.user, name: $userStore.user.name }
  }
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <CircleUser :class="`text-violet-700 hover:cursor-pointer `" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="relative left-14 w-25">
      <DropdownMenuGroup>
        <DropdownMenuItem class="hover:cursor-pointer">
          <div class="flex items-center w-full hover:text-violet-500">
            <User class="mr-2 h-4 w-4" />
            <span>{{ user.name || 'Name' }}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem class="hover:cursor-pointer">
          <div class="flex items-center w-full hover:text-violet-500">
            <Mail class="mr-2 h-4 w-4" />
            <span>{{ user.email || 'E-mail' }}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="hover:cursor-pointer">
          <div @click="logOut()" class="flex items-center">
            <LogOut class="mr-2 h-4 w-4 text-red-600" />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  <div>
    <div class="text-sm font-mono text-black">Hi, {{ user.name?.split(' ')[0] }}</div>
  </div>
</template>
