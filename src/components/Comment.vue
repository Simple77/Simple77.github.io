<template>
  <van-cell class="comment">
    <div class="head">
      <img class="avatar" :src="comment.author.avatar_url" alt="">
      <span class="loginname">{{comment.author.loginname}}</span>
      <div class="like-area" @click="like" :style="{'color': (comment.is_uped ? 'rgb(240, 183, 28)' : '')}">
        <i class="iconfont icon-like"></i>
        {{comment.ups.length}}
      </div>
    </div>
    <div class="markdown-body" v-html="comment.content"></div>
  </van-cell>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    comment: Object,
  },
  methods: {
    like() {
      if(sessionStorage.token) {
        this.$store.dispatch('topic/setLike', {uped: !this.comment.is_uped, id: this.comment.id})
      } else {
        this.goLogin()
      }
    },
    goLogin() {
      this.$router.push({
        path: '/login', 
        query: {
          redirect: this.$route.fullPath
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .van-cell {
    margin-bottom: 20px;
    box-shadow: 4px 4px 32px inset #e6d8d8;
  }
  .markdown-body {
    padding: 20px 20px 0;  
  }
  .avatar {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 6px;
  }
  .head {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-right: 12px;
    }
    .loginname {
      flex: auto;
    }
  }
</style>


