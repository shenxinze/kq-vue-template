import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()

declare module 'axios' {
  interface AxiosResponse<T = any> {
    errorNo: number
    errorMsg: string
    response: any
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}
// 创建 axios 实例
const service = axios.create({
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = '' // todo
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status } = response
    // 登录成功
    if (status === 200) {
      return response.data
    }
    ElMessage.error('系统出错')
    return Promise.reject(new Error('Error'))
  },
  (error: any) => {
    if (error.response.data) {
      const { status, statusText } = error.response
      // token 过期，跳转登录页
      if (status === 401) {
        router.push({ path: '/login' })
        ElMessage({ type: 'warning', message: '登录已超时，请您重新登陆！' })
      } else {
        ElMessage.error(statusText || '系统出错')
      }
    }
    return Promise.reject(error.message)
  }
)

// 导出 axios 实例
export default service
