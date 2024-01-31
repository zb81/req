import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import axios from 'axios'

export interface RequestConfig extends Omit<AxiosRequestConfig, 'method' | 'url'> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
}

export class Request {
  private readonly instance: AxiosInstance

  constructor(config?: RequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(config?.requestInterceptor as any)
    this.instance.interceptors.response.use(config?.responseInterceptor)
  }

  request<R = AxiosResponse>(method: Method, url: string, config?: RequestConfig) {
    return new Promise<R>((resolve, reject) => {
      if (config?.requestInterceptor)
        config = config.requestInterceptor(config)

      this.instance.request({ method, url, ...config })
        .then((res) => {
          if (config?.responseInterceptor)
            res = config.responseInterceptor(res)
          resolve(res as R)
        })
        .catch(reject)
    })
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
