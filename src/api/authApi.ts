import { ApiResponseType, instance } from './todoApi'

export type LoginTypeApi = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

export type authMeAPI = {
  id: number
  email: string
  login: string
}
export const authApi = {
  login (login: LoginTypeApi) {
    return instance.post<ApiResponseType<{ UserId: number }>>('auth/login', login)
  },
  logout () {
    return instance.delete<ApiResponseType>('auth/login')
  },
  authMe () {
    return instance.get<ApiResponseType<authMeAPI>>('auth/me')
  }
}
