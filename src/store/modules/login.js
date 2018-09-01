//initial state
const state = {
  isLogin: sessionStorage.token ? true : false,
  user: {
    avatar_url: '',
    loginname: '',
    id: '',
  },
}

//getters
const getters = {
  
}

//actions
const actions = {
  
}

//mutations
const mutations = {
  setLogin(state, payload) {
    state.isLogin = true
    state.user = payload
  }  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}