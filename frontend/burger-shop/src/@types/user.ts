export interface UserSignInDTO {
  email: string
  password: string
}

export interface UserSignUpDTO {
  email: string
  password: string
  name: string
}

export interface UserSignUpModel extends UserSignUpDTO {
  confirmPassword: string
}
