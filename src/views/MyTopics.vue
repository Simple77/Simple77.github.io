<template>
  <div class="my-topics">
    <template v-if="isLoading">
      <div class="mask"></div>
      <van-loading class="loading-style" size="60px" color="black" type="spinner"></van-loading>
    </template>
    <template v-else>
      <div class="flex-box">
        <van-nav-bar 
          left-arrow
          @click-left="back"
          title="我的话题">
          </van-nav-bar>

        <div class="list-wrap">
          <div class="topic-item" v-for="topic of recent_topics" :key="topic.id">
            <div class="header">
              <div class="author-info-box">
                <a class="avatar-link">
                  <img :src="topic.author.avatar_url" alt="" class="avatar">
                </a>
                <div class="name-and-time">
                  <h3 class="author-name">{{topic.author.loginname}}</h3>
                  <!-- <p class="create-time">{{topic.create_at | timeDistanceNow}}</p> -->
                </div>
              </div>
            </div>
            <router-link :to="`/topic/${topic.id}`" class="body">{{topic.title}}</router-link>
          </div>
        </div>
      </div>
    </template>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'my-topics',
  data() {
    return {
      isLoading: true,
    }
  },
  props: {
    username: String,  
  },
  computed: {
    ...mapGetters('personInfo', ['recent_topics'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(from.path === `/user/${vm.username}/createTopic`) {
        vm.$store.dispatch('personInfo/getPersonInfo', {
          username: vm.username,
        })
        .then(res => {
          vm.isLoading = false
        })
        .catch(err => {

        })
      } else {
        vm.isLoading = false
      }
    })
  },
  methods: {
    back() {
      this.$router.push({path: '/user'})
    },
  }
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
  .topic-item {
    overflow: hidden;
    padding: 20px;
    background: white;
    margin-bottom: 20px;
    box-shadow: 0 0 4px inset #bec5be;
    .header {
      display: flex;
      .author-info-box {
        flex: 1 1 auto;
        display: flex;
        .avatar-link {
          width: 60px;
          height: 60px;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .name-and-time {
          flex: 1 1 auto;
          margin-left: 10px;
          .author-name {
            font-weight: bolder;
            margin: 8px 0 4px;
            color: #502e2e;
          }
          .create-time {
            color: #ad9d9d;
          }
        }
      }
    }
    .body {
      display: block;
      font-size: 20px;
      padding: 16px 10px;
      line-height: 1.2;
      color: #797373;
    }
  }
</style>

