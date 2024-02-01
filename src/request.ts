import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import axios from 'axios'
import { isFunction } from './utils'

export interface RequestConfig extends Omit<AxiosRequestConfig, 'method' | 'url'> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestCatchInterceptor?: (error: any) => any

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseCatchInterceptor?: (error: any) => any
}

export class Request {
  private readonly instance: AxiosInstance

  constructor(config?: RequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(config?.requestInterceptor as any, config?.requestCatchInterceptor)
    this.instance.interceptors.response.use(config?.responseInterceptor, config?.responseCatchInterceptor)
  }

  async request<R = AxiosResponse>(method: Method, url: string, config?: RequestConfig) {
    if (isFunction(config?.requestInterceptor))
      config = config.requestInterceptor(config)

    try {
      let res = await this.instance.request({ ...config, method, url })
      if (isFunction(config?.responseInterceptor))
        res = config.responseInterceptor(res)
      return [res, null] as [R, null]
    }
    catch (err) {
      if (isFunction(config?.responseCatchInterceptor))
        config.responseCatchInterceptor(err)

      return [null, err] as [null, Error]
    }
  }

  get<R>(url: string, config?: RequestConfig) {
    return this.request<R>('GET', url, config)
  }

  post<R>(url: string, config?: RequestConfig) {
    return this.request<R>('POST', url, config)
  }

  put<R>(url: string, config?: RequestConfig) {
    return this.request<R>('PUT', url, config)
  }

  patch<R>(url: string, config?: RequestConfig) {
    return this.request<R>('PATCH', url, config)
  }

  delete<R>(url: string, config?: RequestConfig) {
    return this.request<R>('DELETE', url, config)
  }
}
