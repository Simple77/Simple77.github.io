<template>
  <div class="topic-item">
    <div class="header">
      <div class="author-info-box">
        <a class="avatar-link">
          <img :src="topic.author.avatar_url" alt="" class="avatar">
        </a>
        <div class="name-and-time">
          <h3 class="author-name">{{topic.author.loginname}}</h3>
          <p class="create-time">{{topic.create_at | timeDistanceNow}}</p>
        </div>
      </div>
      <div class="topic-type-box">
        <div class="topic-type" :style="{background: getColor(topic.tab)}">{{topic.tab | strToChinese}}</div>
      </div>
    </div>
    <router-link :to="`/topic/${topic.id}`" class="body">{{topic.title}}</router-link>
    <div class="footer">
      <div class="visit-count">
        <i class="iconfont icon-yuedu"></i>
        {{topic.visit_count}}
      </div>
      <div class="reply-count">
        <i class="iconfont icon-liuyan"></i>
        {{topic.reply_count}}
      </div>
      <div class="last-reply-time">
        {{topic.last_reply_at | timeDistanceNow}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicItem',
  props: {
    topic: Object
  },
  methods: {
    getColor(str) {
      switch(str) {
        case 'share':
          return '#f44336'
        case 'ask':
          return '#9c27b0'
        case 'job':
          return '#03a9f4'
        case 'dev':
          return '#4caf50'
        case 'good':
          return '#ffc107'
        case 'top':
          return '#795548'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .topic-item {
    overflow: hidden;
    padding: 10px 20px;
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
      .topic-type-box {
        min-width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        .topic-type {
          padding: 8px 10px;
          border-radius: 4px;
          color: white;
          background: red;
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
    .footer {
      display: flex;
      padding-left: 10px;
      color: #797373;
      div {
        flex: 1 1 auto;
        &.last-reply-time {
          flex: 3 1 auto;
          text-align: right;
        }
      }
    }
  }
</style>



