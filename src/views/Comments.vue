<template>
  <div class="comments">
    <div class="comments-inner">
      <van-nav-bar 
        left-arrow
        title="评论"
        @click-left="back">
        </van-nav-bar>

      <van-cell-group class="main">
        <template v-if="replies.length >= 1">
          <Comment v-for="(item, index) of replies" :key="index" :comment="item"></Comment>  
        </template>
        <template v-else>
          <p class="no-comments">暂时没有评论</p>
        </template>
      </van-cell-group>
      
      <SwitchBar :text="text" @goto="gotoPath" class="comment-switch-bar"></SwitchBar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SwitchBar from '../components/SwitchBar.vue'
import Comment from '../components/Comment.vue'
export default {
  components: {
    Comment,
    SwitchBar,
  },
  data() {
    return {
      text: '回到话题'
    }
  },
  computed: {
    replies() {
      return this.$store.state.topic.detail.replies
    }
  },
  methods: {
    back() {
      this.$router.go(-1)  
    },
    gotoPath(comment) {
      if(comment) {
        if(sessionStorage.token) {
          this.$store.dispatch('topic/reply', {comment, user: this.$store.state.login.user})
        } else {
          this.$toast.fail('登录后才可评论')
        }
      } else {
        this.back()
      }
    },
  }  
}
</script>

<style lang="scss" scoped>
  .comments {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 5;
  }
  .comments-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .main {
    width: 100%;
    flex: 1;
    overflow-y: scroll; 
  }
  .no-comments {
    padding: 20px;
    text-align: center;
  }
</style>


