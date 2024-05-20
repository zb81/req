import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import axios from 'axios'

export type { Method, AxiosRequestConfig }

export interface RequestConfig extends AxiosRequestConfig {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  responseCatchInterceptor?: (error: any) => any
}

export class Request {
  private readonly instance: AxiosInstance

  constructor(config?: RequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(config?.requestInterceptor as any)
    this.instance.interceptors.response.use(config?.responseInterceptor, config?.responseCatchInterceptor)
  }

  request<R = AxiosResponse>(method: Method, url: string, config?: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      this.instance.request({ ...config, method, url })
        .then(res => resolve(res as R))
        .catch(reject)
    })
  }

  get<R>(url: string, config?: AxiosRequestConfig) {
    return this.request<R>('GET', url, config)
  }

  post<R>(url: string, config?: AxiosRequestConfig) {
    return this.request<R>('POST', url, config)
  }

  put<R>(url: string, config?: AxiosRequestConfig) {
    return this.request<R>('PUT', url, config)
  }

  patch<R>(url: string, config?: AxiosRequestConfig) {
    return this.request<R>('PATCH', url, config)
  }

  delete<R>(url: string, config?: AxiosRequestConfig) {
    return this.request<R>('DELETE', url, config)
  }
}
