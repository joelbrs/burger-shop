<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import InputPassword from '@/components/InputPassword.vue'
import type { UserSignInDTO } from '@/@types'

const $emits = defineEmits<{
  (e: 'update:modelValue', value: UserSignInDTO): void
  (e: 'sign-in'): void
}>()

const login = reactive<UserSignInDTO>({
  email: '',
  password: ''
})

watch(login, (newValue) => {
  if (newValue) {
    $emits('update:modelValue', newValue)
  }
})
</script>

<template>
  <form class="flex flex-col gap-2">
    <div>
      <Label>E-mail</Label>
      <Input v-model:model-value="login.email" placeholder="E-mail" />
    </div>
    <div>
      <InputPassword v-model:model-value="login.password" />
    </div>
    <Button @click="$emit('sign-in')" class="mt-2">Sign In</Button>
  </form>
</template>
