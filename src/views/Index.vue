<template>
  <div class="index">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/">
        <span>首页</span>
        <i class="iconfont icon-shouye" slot="icon"></i>
      </van-tabbar-item>  
      <van-tabbar-item to="/category">
        <span>分类</span>
        <i class="iconfont icon-danpin" slot="icon"></i>
      </van-tabbar-item> 
      <van-tabbar-item to="/message">
        <span>消息</span>
        <i class="iconfont icon-message" slot="icon"></i>
      </van-tabbar-item> 
      <van-tabbar-item to="/user">
        <span>我的</span>
        <i class="iconfont icon-user" slot="icon"></i>
      </van-tabbar-item> 
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },
  methods: {  
    
  },
  mounted() {
    let currentPath = this.$router.history.current.fullPath
    switch(currentPath) {
      case '/':
        this.active = 0
        break
      case '/category':
        this.active = 1
        break
      case '/message':
        this.active = 2
        break
      case '/user':
        this.active = 3
        break
      default:
        this.active = 4
        break
    }
  }
}
</script>





