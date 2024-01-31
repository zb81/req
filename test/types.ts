export interface Root<P> {
  args: P
  headers: Headers
  origin: string
  url: string
}

export interface Headers {
  Accept: string
  'Accept-Encoding': string
  Host: string
  'User-Agent': string
  'X-Amzn-Trace-Id': string
}
