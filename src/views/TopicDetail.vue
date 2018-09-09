<template>
  <div class="topic-detail">
    <template v-if="isLoading">
      <div class="mask"></div>
      <van-loading class="loading-style" size="60px" color="black" type="spinner"></van-loading>
    </template>
    <template v-else>
      <van-nav-bar 
        left-arrow
        @click-left="back"
        @click-right="collect">
          <div slot="title" class="bar-title">
            <img :src="detail.author.avatar_url" alt="" class="avatar">
            <span>{{detail.author.loginname}}</span>
          </div>
          <i class="iconfont" :class="isCollect ? 'icon-jushoucanggift' : 'icon-jushoucang'" slot="right"></i>
        </van-nav-bar>

      <div class="main">
        <h3 class="head">{{detail.title}}</h3>
        <div class="markdown-body" v-html="detail.content"></div>
        <div class="create-time">
          创建于:{{detail.create_at | timeDistanceNow}}
        </div>
      </div>

      <SwitchBar :text="text" @goto="gotoPath" class="detail-switch-bar"></SwitchBar>

      <transition name="slide">
        <router-view></router-view>
      </transition>
      
    </template>
    
  </div>  
</template>

<script>
import SwitchBar from '../components/SwitchBar.vue'
export default {
  name: 'TopicDetail',
  components: {
    SwitchBar,
  },
  data() {
    return {
      // detail: {
      //   //因为获取服务器是异步的，所以 vue 先绑定数据。
      // //绑定数据时，你的author赋值为空对象的话，那么author里面的 loginname 属性便为 undefined，
      // //所以报"cannot read property 'loginname' of undefined"。
      // //所以在初始化时，author 属性赋值为空对象就行了。 
      //   author: {}
      // },
      text: '查看评论'
    }
  },
  props: {
    id: String,
  },
  computed: {
    isLoading() {
      return this.$store.state.topic.isLoading
    },
    detail() {
      return this.$store.state.topic.detail
    },
    isCollect() {
      return this.$store.state.topic.detail.is_collect
    }
  },
  methods: {
    collect() {
      if(sessionStorage.token) {
        if(this.isCollect) {
          this.$store.dispatch('topic/delCollect', {
            collect: !this.isCollect, 
            id: this.id
          })
        } else {
          this.$store.dispatch('topic/setCollect', {
            collect: !this.isCollect, 
            id: this.id
          })
        }
      } else {
        this.goLogin()
      }
    },
    goLogin() {
      this.$router.replace({
        path: '/login', 
        query: {
          redirect: this.$route.fullPath
        }
      })
    },
    back() {
      this.$router.go(-1)
    },
    gotoPath(comment) {
      if(comment) {
        if(sessionStorage.token) {
          this.$store.dispatch('topic/reply', {comment, user: this.$store.state.login.user})
        } else {
          this.$toast.fail('登录后才可评论')
        }
      } else {
        this.$router.push(this.$route.fullPath + '/reply')
      }
    },
  },
  created() {
    this.$store.commit('topic/setLoading', true)
    this.$store.dispatch('topic/getDetail', {id: this.id})
  },
}
</script>

<style lang="scss" scoped>
  .topic-detail {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .main {
    flex: 1;
    width: 100%;
    overflow-y: scroll;
  }
  .switch-bar.detail-switch-bar {
    position: static;
    margin-top: 1px;
  }
  .head {
    background: #fff;
    padding: 10px 20px;
    line-height: 1.5;
    margin-bottom: -1px;
  }
  .bar-title {
    display: flex;
    justify-content: center;
    align-items: center;  
  }
  .avatar {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 6px;
  }
  .markdown-body {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    padding: 20px;
    font-size: 16px;
  }
  .create-time {
    text-align: center;
    line-height: 60px;
    height: 60px;
    background: #fff;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
  }
  .slide-enter, .slide-leave-to {
    transform: translateY(100%)
  }

  .icon-jushoucanggift {
    color: rgb(240, 183, 28);
  }
</style>





