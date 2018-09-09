import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'
import store from './store/index.js'
import axios from 'axios'
import * as filters from './filters/index.js'

import '@/assets/css/global.css'

// import LoadOverlay from './plugins/Loading/index.js'
// Vue.use(LoadOverlay)

import { 
  NavBar,
  Icon,
  Tabbar,
  TabbarItem,
  Loading,
  List,
  Tab,
  Tabs,
  Row,
  Col,
  Button,
  CellGroup,
  Cell,
  Toast,
  Dialog,
 } from 'vant'

Vue.use(NavBar)
 .use(Icon)
 .use(Tabbar)
 .use(TabbarItem)
 .use(Loading)
 .use(List)
 .use(Tab)
 .use(Tabs)
 .use(Row)
 .use(Col)
 .use(Button)
 .use(CellGroup)
 .use(Cell)
 .use(Toast)
 .use(Dialog)



axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
Vue.prototype.$axios = axios
window.axios = axios


Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
