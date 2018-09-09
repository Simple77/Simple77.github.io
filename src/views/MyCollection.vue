<template>
  <div class="my-collection">
    <template v-if="isLoading">
      <div class="mask"></div>
      <van-loading class="loading-style" size="60px" color="black" type="spinner"></van-loading>
    </template>
    <template v-else>
    <div class="flex-box">
      <van-nav-bar 
        left-arrow
        @click-left="back"
        title="我的收藏">
        </van-nav-bar>
      <div class="list-wrap">
        <TopicItem v-for="item of myCollection" :key="item.id" :topic="item"></TopicItem>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TopicItem from '../components/TopicItem.vue'
export default {
  name: 'MyCollection',  
  components: {
    TopicItem,
  },
  data() {
    return {
      isLoading: true,  
    }
  },
  props:{
    username: String,
  },
  computed: {
    ...mapState('personInfo', ['myCollection']),
    ...mapGetters('personInfo', ['loginname']),

  },
  beforeRouteEnter(to, from ,next) {
    next(vm => {
      vm.isLoading = true
      vm.$store.dispatch('personInfo/getMyCollection', {
        username: vm.username
      })
      .then(res => {
        vm.isLoading = false
      })  
      .catch(err => {
        vm.$toast.fail(err)
      })
    })
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss" scoped>
  .flex-box {
      display: flex;
      height: 100%;
      flex-direction: column;
      overflow: hidden;
    }
    .list-wrap {
      flex: 1;
      overflow-y: scroll
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
