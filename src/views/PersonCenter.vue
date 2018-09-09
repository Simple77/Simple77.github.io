<template>
  <div class="person-center">

    <van-nav-bar 
      left-arrow
      @click-left="back"
      title="个人信息">
      </van-nav-bar>

    <van-cell-group>
      <van-cell title="用户名" :value="username"></van-cell>
      <van-cell title="用户头像">
        <template slot="right-icon">
          <img :src="avatar" alt="avatar" class="avatar">
        </template>
      </van-cell>
      <van-cell title="创建时间" :value="createTime"></van-cell>
      <van-cell title="积分" :value="score"></van-cell>
    </van-cell-group>

    <!-- <Tab :tabs="tabs" @tab="getCurrent">
      <div class="recent-wrap" v-for="(item, index) of recentCon" :key="index" v-if="currentTab === index">
        <template v-if="item.length >= 1">
          <transition-group name="fade">
            <TopicItem v-for="content of item" :key="content.id" :topic="content"></TopicItem>
          </transition-group>
        </template>
        <template v-else>
          <p>no info</p>
        </template>
      </div>
    </Tab> -->

    <router-view class="position-page"></router-view>
    
  </div>
</template>

<script>
import Tab from '../components/Tab.vue'
import TopicItem from '../components/TopicItem.vue'
import { recentTabs } from '../constants/index.js'
import { mapGetters } from 'vuex'
export default {
  name: 'PersonCenter',  
  components: {
    Tab,
    TopicItem,
  },
  data() {
    return {
      tabs: recentTabs, 
      currentTab: 0,
    }
  },
  props: {
    username: String
  },
  computed: {
    avatar() {
      return this.$store.state.personInfo.personInfo.avatar_url
    },
    createTime() {
      let createTime = this.$store.state.personInfo.personInfo.create_at
      if(createTime) {
        return createTime.slice(0, 10) 
      } else {
        return createTime
      }
    },
    score() {
      return this.$store.state.personInfo.personInfo.score
    },
    ...mapGetters('personInfo', ['recent_topics']),
    recentCon() {
      return [this.$store.state.personInfo.personInfo['recent_topics'], this.$store.state.personInfo.personInfo['recent_replies']]
    }
  },
  mounted() {
    this.$store.dispatch('personInfo/getPersonInfo', {
      username: this.username,
    })
    .then(res => {

    })
    .catch(err => {
      this.$toast.fail(err)  
    })  
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getCurrent(e) {
      this.currentTab = e
    },
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }  
  .position-page {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #ddd;
    z-index: 2;
  }
</style>
