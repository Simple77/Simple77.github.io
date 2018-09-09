import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import login from './modules/login.js'
import topic from './modules/topic.js'
import message from './modules/message.js'
import personInfo from './modules/personInfo.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    topic,
    message,
    personInfo,
  }  
})