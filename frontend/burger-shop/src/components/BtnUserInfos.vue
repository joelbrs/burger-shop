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

const $router = useRouter()
const $userStore = useUserStore()

const active = ref(false)

const user = ref<UserDTOOut>({
  email: '',
  id: '',
  name: '',
  type: ''
})

const logOut = async () => {
  $userStore.DELETE_USER()
  await $router.push({ name: 'login' })
}

onMounted(() => {
  if ($userStore.user) {
    user.value = { ...$userStore.user, name: $userStore.user.name?.split(' ')[0] }
  }
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <CircleUser
        :class="`hover:text-primary hover:cursor-pointer ${active ? 'text-primary' : ''}`"
        @focus="active = !active"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="relative left-14 w-25">
      <DropdownMenuGroup>
        <DropdownMenuItem class="hover:cursor-pointer">
          <div class="flex items-center w-full hover:text-primary">
            <User class="mr-2 h-4 w-4" />
            <span>{{ user.name || 'Name' }}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem class="hover:cursor-pointer">
          <div class="flex items-center w-full hover:text-primary">
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
    <div class="text-sm font-sans">Hi, {{ user.name }}</div>
  </div>
</template>
