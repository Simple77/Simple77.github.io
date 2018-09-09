//initial state
const state = {
  isLogin: (sessionStorage.token ? true : false),
  user: {
    avatar_url: (sessionStorage.user ? JSON.parse(sessionStorage.user).avatar_url : ''),
    loginname: (sessionStorage.user ? JSON.parse(sessionStorage.user).loginname : ''),
    id: (sessionStorage.user ? JSON.parse(sessionStorage.user).id : ''),
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
    state.user = payload.user
  }  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}