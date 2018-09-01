<template>
  <div class="message">
    <Tab :tabs="messageList" @tab="getCurrent">
      <div v-if="isLogin" class="login-display">
        <keep-alive>
          <van-cell-group :class="{'no-bgborder': item.length < 1}" v-for="(item, index) of infoCollection" :key="index" v-if="currentTab === index">
            <template v-if="item.length >= 1">
              <van-cell v-for="info of item" :key="info.id">
                <InfoItem :author="info.author" :reply="info.reply"></InfoItem>
              </van-cell>
            </template>
            <template v-else>
              <van-cell class="no-bg">
                <p class="no-info">no info</p>
              </van-cell>
            </template>
          </van-cell-group>
        </keep-alive>
      </div>
      <div v-else class="login-tip">
        <h2>登录后可查看</h2>
        <van-button type="primary" text="登录" @click="goLogin"></van-button>
      </div>
    </Tab>
  </div>
</template>

<script>
import { message } from '../constants/index.js'
import Tab from '../components/Tab.vue'
import InfoItem from '../components/InfoItem.vue'
import { mapState } from 'vuex'
export default {
  name: 'message',
  components: {
    Tab,
    InfoItem,
  },
  data() {
    return {
      messageList: message,
      currentTab: 0,
      infoCollection: []
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin
    },
  },
  methods: {
    getCurrent(e) {
      this.currentTab = e
    },
    goLogin() {
      this.$router.push({
        path: '/login', 
        query: {
          redirect: this.$router.history.current.fullPath
        }
      })
    }
  },
  mounted() {
    if(this.isLogin) {
      this.$axios.get('/messages', {
        params: {
          accesstoken: sessionStorage.token,
        }
      }) 
      .then(res => {
        let info = res.data.data
        this.infoCollection = [info['has_read_messages'], info['hasnot_read_messages']]
      }) 
      .catch(err => {
        this.$toast.fail(err)
      }) 
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-tip {
    text-align: center;
    margin-top: 200px;
  }
  .van-cell.no-bg {
    background: none;
  }
  .no-info {
    font-size: 20px;
    text-align: center;
  }
  .van-cell-group.no-bgborder {
    margin-top: 100px;
    background: none;
    &::after {
      border-width: 0;
    }
  }
</style>



