<template>
  <div class="user">

    <van-nav-bar 
      :title="title">
      </van-nav-bar>

    <div class="content-wrap">

    
      <div class="avatar-area">
        <template v-if="isLogin">
          <img :src="getAvatar" alt="avatar" class="avatar">
        </template>
        <template v-else>
          <div class="avatar"></div>
        </template>
      </div>

      <van-cell-group>
        <template v-if="isLogin">
          <van-cell title="个人信息" is-link @click="goPersonCenter"></van-cell>
          <van-cell title="我的收藏" is-link @click="goMyCollection"></van-cell>
          <van-cell title="新建话题" is-link @click="goCreateTopic"></van-cell>
          <van-cell title="我的话题" is-link @click="goMyTopics"></van-cell>
        </template>
        <template v-else>
          <van-cell title="个人信息" is-link @click="toast"></van-cell>
          <van-cell title="我的收藏" is-link @click="toast"></van-cell>
          <van-cell title="新建话题" is-link @click="toast"></van-cell>
          <van-cell title="我的话题" is-link @click="toast"></van-cell>  
        </template>
      </van-cell-group>

      <template v-if="!isLogin">
        <van-button type="primary" @click="goLogin">登录</van-button>
      </template>
      <template v-else>
        <van-button type="danger" @click="goOut">退出</van-button>  
      </template>

    </div>
    
  </div>
</template>

<script>
export default {
  name: 'user',  
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  computed: {
    getAvatar() {
      return this.$store.state.login.user.avatar_url
    },
    isLogin() {
      return this.$store.state.login.isLogin
    },
    title() {
      if(this.isLogin) {
        return this.$store.state.login.user.loginname
      } else {
        return '用户中心'
      }
    }
  },
  methods: {
    goLogin() {
      this.$router.replace({
        path: '/login',
        query: {
          redirect: this.$router.history.current.fullPath
        }
      })
    },
    goOut() {
      sessionStorage.setItem('token', '')
      location.reload()
    },
    goPersonCenter() {
      this.$router.push({path: `/user/${this.title}`})
    },
    goMyCollection() {
      this.$router.push({path: `/user/${this.title}/collection`})
    },
    goCreateTopic() {
      this.$router.push({path: `/user/${this.title}/createTopic`})
    },
    goMyTopics() {
      this.$router.push({path: `/user/${this.title}/myTopics`})  
    },
    toast() {
      this.$toast.fail('请先登录')
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
    display: flex;
    height: calc(100% - 50px);
    overflow: hidden;
    flex-direction: column;
  }
  .content-wrap {
    flex: 1;
    overflow-y: auto;
  }
  .avatar-area {
    height: 240px;
    background: thistle;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 80px;
      height: 80px;
      background: white;
      border-radius: 50%;
    }
  }
  button {
    width: 90%;
    margin: 0 auto;
    display: block;
    margin-top: 100px;
    color: white;
    border-radius: 6px;
  }
</style>
