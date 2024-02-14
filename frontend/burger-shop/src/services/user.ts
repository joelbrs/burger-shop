import type { UserDTOOut, UserSignInDTO, UserSignUpDTO } from '@/@types'
import { HttpFactory } from '@/factories/HttpFactory'

const base = '/users'
const httpClient = HttpFactory(base)

export function postSignUp(body: UserSignUpDTO) {
  return httpClient.post<UserDTOOut>('', body)
}

export function postSignIn(body: UserSignInDTO) {
  return httpClient.post<UserDTOOut>('auth', body)
}
