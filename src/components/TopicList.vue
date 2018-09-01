<template>

  <van-list 
    v-model="loading"
    :finished="finished"
    @load="onLoad">
      <transition-group name="fade">
        <TopicItem v-for="item of list" :key="item.id" :topic="item"></TopicItem>
      </transition-group>
    </van-list>  
</template>

<script>
import TopicItem from './TopicItem.vue'
export default {
  components: {
    TopicItem
  },
  props: {
    listType: String,
  },
  data() {
    return {
      loading: true,
      finished: false,
      list: [],
      page: 1,
    }
  },
  methods: {
    onLoad() {
      this.axiosData(this.page, 20, this.listType)
    },
    axiosData(page, limit, tab) {
      this.$axios.get('/topics', {
        params: {
          page,
          limit,
          tab
        }
      })
      .then(res => {
        let json = res.data
        if(json.success && json.data.length >= 1) {
          this.list.push(...json.data)
          this.loading = false
          this.page++
        }   
        if(json.data.length < 1) {
          this.finished = true
        }
      })
    }
  },
  created() {
    this.onLoad()
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
</style>




