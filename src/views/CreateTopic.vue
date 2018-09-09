<template>
  <div class="create-topic">

    <div class="fixed-navbar">
      <van-nav-bar 
        fixed
        left-arrow
        @click-left="back"
        title="新建话题">
        </van-nav-bar>
    </div>

    <form class="content-wrap">
      <div class="form-group">
        <label for="">标题：</label>
        <input class="form-input" type="text" required v-model.trim.lazy="title">
      </div>
      <div class="form-group">
        <label for="">类型：</label>
        <select class="form-input" v-model="tab">
          <option disabled value="">请选择类型</option>
          <option v-for="item of options" :key="item.id" :value="item.name">{{item.value}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="">内容：</label>
        <textarea class="form-input" name="" id="" required v-model.trim.lazy="content" placeholder="请输入内容"></textarea>
      </div>
      <van-button v-if="submitting" type="primary" disabled>提交中...</van-button>
      <van-button v-else type="primary" @click="submit">提交</van-button>
    </form>
  </div>
</template>

<script>
import { category } from '../constants/index.js'
export default {
  name: 'create-topic',
  data() {
    return {
      title: '',
      content: '',
      tab: '',
      submitting: false,
    }
  },
  computed: {
    options() {
      return category.slice(0, 4)
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    submit() {
      if(!this.title || this.tab === '' || !this.content) {
        return
      }
      this.submitting = true
      this.$store.dispatch('personInfo/createTopic', {
        accesstoken: sessionStorage.token,
        title: this.title,
        tab: this.tab,
        content: this.content,
      })
      .then(res => {
        this.submitting = false
        this.$router.push({path: this.$route.fullPath.slice(0, -12) + '/myTopics'})
      })
      .catch(err => {
        this.$toast.fail(err)
        this.submitting = false
      })
    }
  },
  beforeRouteLeave(to, from ,next) {
    if(to.path === '/user' && (this.title || this.tab !== '' || this.content)) {
      this.$dialog.confirm({
        title: '你有未保存的更改，你真的想离开吗？'
      })
      .then(() => {
        next()
      }) 
      .catch(() => {
        next(false)
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-topic {
    background: #fff;
  }
  .content-wrap {
    height: calc(100% - 100px);
    .form-group:nth-of-type(3) {
      height: calc(100% - 200px);
    }
  }
  .form-group {
    display: flex;
    margin: 10px;
    label {
      width: 50px;
    }
    .form-input {
      flex: 1;
    }
  } 
  button {
    margin-left: 60px;
  }
</style>


