// user模块相关
import { login } from '@/api/user'
import { setToken, getToken, delToken } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    setUserToken (state, newToken) {
      state.token = newToken
      setToken(newToken)
    },
    clearUserToken (state) {
      delToken()
      state.token = ''
    }

  },
  actions: {
    async loginAction (context, obj) {
      const res = await login(obj)
      context.commit('setUserToken', res.data.token)
    }
  },
  getters: {

  }
}
