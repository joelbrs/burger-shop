<script setup lang="ts">
import { ref } from 'vue'
import { UserApi } from '@/services'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import SignInForm from '@/views/auth/forms/SignInForm.vue'
import SignUpForm from '@/views/auth/forms/SignUpForm.vue'
import TabsField, { type Tab } from '@/components/TabsField.vue'
import type { UserDTOOut, UserSignInDTO, UserSignUpModel } from '@/@types'
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'vue3-cookies'

const $router = useRouter()
const { cookies } = useCookies()
const $userStore = useUserStore()

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

const tab = ref<string>('login')

const loading = ref({
  signIn: false,
  signUp: false
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

const ToSignIn = async () => {
  loading.value.signIn = true
  const { data, error } = await UserApi.postSignIn(login.value)
  loading.value.signIn = false

  if (error) return

  const user: { login: UserDTOOut } = jwtDecode(data)
  $userStore.SET_USER(user.login)

  cookies.set('access_token', data)
  await $router.push({ name: 'home' })
}

const ToSignUp = async () => {
  loading.value.signUp = true
  const { data, error } = await UserApi.postSignUp(register.value)
  loading.value.signUp = false

  if (error) return

  $userStore.SET_USER(data)
  tab.value = 'login'
}
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
              <SignInForm
                @sign-in="ToSignIn"
                :loading="loading.signIn"
                v-model:model-value="login"
              />
            </template>

            <template #content-register>
              <SignUpForm
                @sign-up="ToSignUp"
                :loading="loading.signUp"
                v-model:model-value="register"
              />
            </template>
          </TabsField>
        </div>
      </div>
    </div>
  </div>
</template>
