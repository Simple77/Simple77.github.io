//initial state
const state = {
  personInfo: {},
  myCollection: [],
  myTopics: []
}

//getters
const getters = {
  recent_topics(state) {
    return state.personInfo.recent_topics
  },
  loginname(state) {
    return state.personInfo.loginname
  }
}

//actions
const actions = {
  getPersonInfo({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/user/' + payload.username)
      .then(res => {
        commit('setPersonInfo', res.data.data)
        resolve(res)
      }) 
      .catch(err => {
        reject(err)
      })
    })
  },
  getMyCollection({commit}, payload) {
    return axios.get('/topic_collect/' + payload.username)
      .then(res => {
        commit('setMyCollection', res.data.data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createTopic({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/topics', {
        accesstoken: payload.accesstoken,
        title: payload.title,
        tab: payload.tab,
        content: payload.content,
      })
      .then(res => {
        commit('createTopic', res.data.topic_id)
        resolve(res)
      }) 
      .catch(err => {
        reject(err)
      })
    })
  }
}

//mutations
const mutations = { 
  setPersonInfo(state, payload) {
    state.personInfo = payload 
  },
  setMyCollection(state, payload) {
    state.myCollection = payload
  },
  createTopic(state, payload) {
    state.myTopics.push(payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}