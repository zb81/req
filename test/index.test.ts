import { describe, expect, it } from 'vitest'
import Request from '../src'
import type { Root } from './types'

const request = new Request({
  baseURL: 'https://httpbin.org',
  timeout: 10000,
  responseInterceptor(response) {
    return response.data
  },
})

interface IParams {
  foo: string
}

function getRes(params: IParams) {
  return request.get<Root<IParams>>('/get', { params })
}

describe('should', () => {
  it('success', async () => {
    const res = await getRes({ foo: 'bar' })
    expect(res.args.foo).toBe('bar')
  })
})
