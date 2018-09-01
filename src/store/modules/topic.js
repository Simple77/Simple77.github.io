import Vue from 'vue'
//initial state
const state = {
  isLoading: false,
  detail: {
    author: {}
  },
}

//getters
const getters = {
  
}

//actions
const actions = {
  getDetail({commit, rootState}, payload) {
    let params = {}
    if(rootState.login.isLogin) {
      params = {
        mdrender: true,
        accesstoken: sessionStorage.token 
      }
    } else {
      params = {
        mdrender: true,
      }  
    }
    axios.get('/topic/' + payload.id, {
      params
    })
    .then(res => {
      commit('setLoading', false)
      let detail = res.data.data
      commit('setDetail', detail)
    })  
    .catch(err => {
      Vue.prototype.$toast.fail(err)
      throw new Error(err)
    }) 
  },  
  setCollect({commit}, payload) {
    axios.post('/topic_collect/collect', {
      accesstoken: sessionStorage.token,
      topic_id: payload.id
    })
    .then(res => {
      commit('setCollect', payload.collect)
      Vue.prototype.$toast('收藏成功')
    })
    .catch(err => {
      Vue.prototype.$toast.fail(err)
      throw new Error(err)
    })
  },
  delCollect({commit}, payload) {
    axios.post('/topic_collect/de_collect ', {
      accesstoken: sessionStorage.token,
      topic_id: payload.id
    })
    .then(res => {
      commit('delCollect', payload.collect)
      Vue.prototype.$toast('取消收藏')
    })
    .catch(err => {
      Vue.prototype.$toast.fail(err)
      throw new Error(err)
    })
  },
  setLike({commit, state}, payload) {
    axios.post('/reply/'+payload.id+'/ups', {
      accesstoken: sessionStorage.token,  
    })
    .then(res => {
      commit('setLike', payload)
    })
    .catch(err => {
      console.log(err)
      Vue.prototype.$toast.fail('不能帮自己点赞')
      throw new Error(err)
    })
  },
  reply({commit, state}, payload) {
    axios.post('/topic/'+state.detail.id+'/replies', {
      accesstoken: sessionStorage.token, 
      content: payload.comment  
    })  
    .then(res => {
      commit('reply', payload)
      location.reload()
    })
    .catch(err => {
      Vue.prototype.$toast.fail(err)
      throw new Error(err)
    })
  }
}

//mutations
const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setDetail(state, detail) {
    state.detail = detail
  },
  setCollect(state, collect) {
    state.detail.is_collect = collect
  },
  delCollect(state, collect) {
    state.detail.is_collect = collect
  },
  setLike(state, payload) {
    state.detail.replies.forEach(item => {
      if(item.id === payload.id) {
        item.is_uped = payload.uped
        if(payload.uped) {
          item.ups.push(payload.id)
        } else {
          item.ups.pop()
        }
      }
    })
  },
  reply(state, payload) {
    state.detail.replies.push({
      author: {
        avatar_url: payload.user.avatar_url,
        loginname: payload.user.loginname,
      },
      content: payload.comment,
      create_at: new Date(),
      id: state.detail.id,
      is_uped: false,
      reply_id: null
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}