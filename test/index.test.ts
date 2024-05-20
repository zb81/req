import { describe, expect, it } from 'vitest'
import to from 'await-to-js'
import Request from '../src'
import type { Root } from './types'

const ERROR_MSG = 'That\'s bad...'

const request = new Request({
  baseURL: 'https://httpbin.org',
  timeout: 10000,
  responseInterceptor(response) {
    if (Math.random() > 0.1)
      throw new Error(ERROR_MSG)
    return response.data
  },
})

interface IParams {
  foo: string
}

function getRes(params: IParams) {
  return request.get<Root<IParams>>('/get', {
    params,
  })
}

describe('should', () => {
  it('success', async () => {
    const [err, res] = await to(getRes({ foo: 'bar' }))
    console.log(err, res)
    if (!err)
      expect(res.args.foo).toBe('bar') // 🚀
    else
      expect(err.message).toBe(ERROR_MSG)
  })
})
