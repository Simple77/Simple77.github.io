<template>
  <!-- <transition name="slide"> -->
    <div class="login">
      <div class="fixed-navbar">
        <van-nav-bar 
          fixed 
          title="登录" 
          left-arrow 
          @click-left="onClickLeft">
          </van-nav-bar>
      </div>
      <div class="form">
        <van-cell :border="false">
          <input type="text" v-model.trim="accesstoken" placeholder="请输入Access Token">
        </van-cell>
        <van-button type="primary" text="登录" @click="submit"></van-button>
        <p class="tip">提示：可通过我的Access Token登录，c0e67253-b88e-442b-b278-49fe40a9871f</p>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  data() {
    return {
      accesstoken: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    submit() {
      if(!this.accesstoken) {
        this.$toast.fail('请输入Access Token')
        return
      }
      this.$axios.post('/accesstoken', {
        accesstoken: this.accesstoken 
      })
      .then(res => {
        console.log(res)
        sessionStorage.token = this.accesstoken
        let user = {
          loginname: res.data.loginname,
          id: res.data.id,
          avatar_url: res.data.avatar_url 
        }
        sessionStorage.user = JSON.stringify(user)
        this.$store.commit('login/setLogin', {
          user: user
        })
        this.$router.replace(this.$route.query.redirect || '/')
      })
      .catch(err => {
        this.$toast.fail(err)  
      })
      
    },
    
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
  .form {
    margin-top: 260px;
    padding: 0 28px;
  }
  .van-cell {
    padding-left: 0;
    padding-right: 0;
  }
  input {
    display: block;
    line-height: 36px;
    font-size: 16px;
    width: 100%;
    border: none;
    position: relative;
    &:after {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      background: #ddd;
      position: absolute;
      bottom: 0;
      transform: scaleY(0.5);
    }
  }
  button {
    width: 100%;
  }

  .tip {
    padding: 20px;
    font-size: 20px;
  }

  // .slide-enter-active, .slide-leave-active {
  //   transition: all .5s;
  // }
  // .slide-enter, .slide-leave-to {
  //   opacity: 0;
  //   transform: translateX(100%)
  // }
</style>


