<template>
  <div class="home">
    
    <van-nav-bar 
      title="CNode.js中文社区"
      @click-right="toGithub">
        <van-icon name="wap-home" slot="right" />
      </van-nav-bar>
      
      <div class="list-wrap" @scroll="onScroll">
        <TopicList listType="all"></TopicList>
      </div>

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
      pos: 0,
      target: ''
    }
  },
  activated() {
    
  },
  methods: {
    toGithub() {
      location = 'https://github.com/simple77/cnode'  
    },
    onScroll(e) {
      this.target = e.target
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  beforeRouteLeave(to, from, next) {
    if(this.target) {
      this.pos = this.target.scrollTop
    }
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(vm.target) {
        vm.target.scrollTo(0, vm.pos)
      }
    })
  },  
}
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: calc(100% - 50px)
  }
  .list-wrap {
    flex: 1;
    overflow-y: auto;
  }
</style>




