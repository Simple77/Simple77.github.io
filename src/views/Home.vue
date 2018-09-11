<template>
  <div class="home">
    
    <van-nav-bar 
      title="CNode.js中文社区"
      @click-right="toGithub">
        <van-icon name="wap-home" slot="right" />
      </van-nav-bar>

      <div class="list-wrap" @scroll="onScroll">
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
          <TopicList :pullList="pullList" listType="all"></TopicList>
        </van-pull-refresh>
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
      target: '',
      pullLoading: false,
      pullList: [],
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
    },
    onRefresh() {
      this.$axios.get('/topics', {
        params: {
          page: 1,
          limit: 20,
          tab: 'all',
        }
      })
      .then(res => {
        this.pullList =  res.data.data
        this.$toast('下拉刷新成功')
        this.pullLoading = false 
      })
      .catch(err => {
        this.$toast.fail(err)
      })
    },
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




