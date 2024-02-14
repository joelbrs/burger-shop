<script setup lang="ts">
import { computed, ref } from 'vue'
import SignInForm from '@/views/auth/forms/SignInForm.vue'
import SignUpForm from '@/views/auth/forms/SignUpForm.vue'
import TabsField, { type Tab } from '@/components/TabsField.vue'
import type { UserSignInDTO, UserSignUpModel } from '@/@types'

const tab = ref<string>('login')

const login = ref<UserSignInDTO>({
  email: '',
  password: ''
})

const register = ref<UserSignUpModel>({
  email: '',
  name: '',
  password: '',
  confirmPassword: ''
})

const tabs: Tab[] = [
  {
    id: 'login',
    label: 'Sign In',
    title: 'Login',
    description: 'Enter your credentials to access the system.'
  },
  {
    id: 'register',
    label: 'Sign Up',
    title: 'Register',
    description: 'Enter your credentials to register with the system'
  }
]

const ToSignIn = async () => {}

const ToSignUp = async () => {}
</script>

<template>
  <div class="flex">
    <div>
      <img
        v-if="tab === 'login'"
        class="h-lvh w-auto"
        src="../../assets/bg-burger-login.svg"
        alt="Burger Background"
      />
      <img
        v-else
        class="h-lvh w-auto"
        src="../../assets/bg-burger-login-2.svg"
        alt="Burger Background"
      />
    </div>
    <div class="flex-1">
      <div class="flex h-full justify-center items-center flex-col gap-4">
        <div>
          <img class="w-[17vw] h-[17vh]" src="../../assets/logo-code-burger.svg" />
        </div>
        <div>
          <TabsField v-model:model-value="tab" :tabs="tabs">
            <template #content-login>
              <SignInForm @sign-in="ToSignIn" v-model:model-value="login" />
            </template>

            <template #content-register>
              <SignUpForm @sign-up="ToSignUp" v-model:model-value="register" />
            </template>
          </TabsField>
        </div>
      </div>
    </div>
  </div>
</template>
