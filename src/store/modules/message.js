//initial state
const state = {
  'has_read_messages': [],
  'hasnot_read_messages': [],
}

//getters
const getters = {
  
}

//actions
const actions = {
  
}

//mutations
const mutations = {
  setMessage(state, payload) {
    state['has_read_messages'] = payload['has_read_messages']
    state['hasnot_read_messages'] = payload['hasnot_read_messages']
  } 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}