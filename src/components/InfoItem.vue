<template>
  <div class="info-item">
    <div class="avatar-area">
      <img src="author.avatar_url" alt="">
    </div>
    <div class="main-area">
      <h3>{{author.loginname}}</h3>
      <p>{{reply.content}}</p>
    </div>
    <div class="date-area">
      {{reply.create_at | timeDistanceNow}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: Object,
    reply: Object,
  }
}
</script>

<style lang="scss" scoped>
  .info-item {
    display: flex;
  }
</style>


