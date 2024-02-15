<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import InputPassword from '@/components/InputPassword.vue'
import type { UserSignUpModel } from '@/@types'

defineProps<{
  loading: boolean
}>()

const $emits = defineEmits<{
  (e: 'update:modelValue', value: UserSignUpModel): void
  (e: 'sign-up'): void
}>()

const register = reactive<UserSignUpModel>({
  email: '',
  name: '',
  password: '',
  confirmPassword: ''
})

watch(register, (newValue) => {
  if (newValue) {
    $emits('update:modelValue', newValue)
  }
})
</script>

<template>
  <form class="flex flex-col gap-2">
    <div>
      <Label>Name</Label>
      <Input v-model:model-value="register.name" placeholder="Name" />
    </div>
    <div>
      <Label>E-mail</Label>
      <Input v-model:model-value="register.email" placeholder="E-mail" />
    </div>
    <div>
      <InputPassword v-model:model-value="register.password" />
    </div>
    <div>
      <InputPassword label="Confirm Password" v-model:model-value="register.confirmPassword" />
    </div>
    <Button
      @click.prevent.stop="$emit('sign-up')"
      class="mt-2"
      :loading="loading"
      :disabled="loading"
      >Sign Up</Button
    >
  </form>
</template>
