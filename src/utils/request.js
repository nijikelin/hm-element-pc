/* 封装axios用于发送请求 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '../router'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { token } = store.state.user
  config.headers.Authorization = `bearer ${token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    Message.error('登录状态失效')
    store.commit('user/clearUserToken')
    router.push('/')
  } else {
    Message.error(error.response.data.message)
  }

  return Promise.reject(error)
})

export default request
