import { describe, expect, it } from 'vitest'
import Request from '../src'

const request = new Request({
  baseURL: 'http://localhost:2881',
  timeout: 10000,
  responseInterceptor(response) {
    return response.data
  },
})

interface ILoginDTO {
  username: string
  password: string
}
interface ILoginVO {
  access_token: string
}
function login(data: ILoginDTO) {
  return request.post<ILoginVO>('/auth/login', {
    data,
  })
}

describe('should', () => {
  it('success', async () => {
    const res = await login({ username: 'zb81', password: '123456' })
    expect(typeof res.access_token).toBe('string')
  })
})
