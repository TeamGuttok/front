export interface userInfo {
  id?: number
  email: string
  nickName: string
  alarm: boolean
  password?: string
  policyConsent?: boolean
}

export interface ApiResponse {
  message: string
  data: unknown
  status: string
}

export interface LoginInput {
  email: string
  password: string
}
