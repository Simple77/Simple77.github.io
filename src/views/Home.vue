<template>
  <div class="home">
    
    <div class="fixed-navbar">
      <!-- <van-nav-bar 
        fixed
        title="CNode.js中文社区"
        @click-right="toGithub">
          <van-icon name="wap-home" slot="right" />
        </van-nav-bar> -->
        <van-nav-bar 
          fixed
          title="CNode.js中文社区">
          </van-nav-bar>
    </div>
      

      <TopicList listType="all"></TopicList>

    
     
  </div>
</template>

<script>
import TopicItem from '../components/TopicItem'
import TopicList from '../components/TopicList'
export default {
  name: 'home',
  components: {
    TopicItem,
    TopicList,
  },
  data() {
    return {
      isLoading: false,
      pos: 0
    }
  },
  activated() {
    
  },
  methods: {
    // toGithub() {
    //   location = 'https://github.com/simple77/'  
    // }
  },
  created() {
    
  },
  mounted() {
    
  },
  beforeRouteLeave(to, from, next) {
    this.pos = document.body.scrollTop + document.documentElement.scrollTop  
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      window.scrollTo(0, vm.pos)
    })
  },  
}
</script>



