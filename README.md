# @zb81/req

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

## Quick Start

```typescript
import Request from '@zb81/req'
// or
import { Request } from '@zb81/req'

// biz error message
const ERROR_MSG = 'That\'s bad...'

// Instantiate with config and interceptors
const request = new Request({
  baseURL: 'https://httpbin.org',
  timeout: 10000,
  responseInterceptor(response) {
    if (Math.random() > 0.1) // biz error code
      throw new Error(ERROR_MSG) // you can throw the error, or show messages
    return response.data
  },
})

// declare types
interface Root<P> {
  args: P
  headers: Headers
  origin: string
  url: string
}

interface Headers {
  Accept: string
  'Accept-Encoding': string
  Host: string
  'User-Agent': string
  'X-Amzn-Trace-Id': string
}

// define a request function with error handler
function getRes(params: IParams) {
  return request.get<Root<IParams>>('/get', {
    params,
    responseCatchInterceptor(error) {
      // handle your biz error throwed
      console.error(error.message) // 'That\'s bad...'
    },
  })
}

// invode a request with type
const [res, err] = await getRes({ foo: 'bar' })
if (err == null)
  expect(res.args.foo).toBe('bar') // 🚀
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Zhu Bei](https://github.com/zb81)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@zb81/req?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@zb81/req
[npm-downloads-src]: https://img.shields.io/npm/dm/@zb81/req?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@zb81/req
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@zb81/req?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@zb81/req
[license-src]: https://img.shields.io/github/license/zb81/req.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/zb81/req/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@zb81/req
