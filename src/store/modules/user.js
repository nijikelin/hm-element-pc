// user模块相关
import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    username: '',
    password: '',
    token: ''
  },
  mutations: {

  },
  actions: {
    async login (context, obj) {
      await login(obj)
    }
  },
  getters: {

  }
}
