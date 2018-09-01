<template>
  <div class="switch-bar">
    <input type="text" v-model.trim="comment" :placeholder="placeholder">
    <button @click="goto">{{value}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: '',
    }
  },
  props: {
    text: String,
  },
  computed: {
    value() {
      if(this.comment) {
        return '评论'
      } else {
        return this.text
      }
    },
    placeholder() {
      return this.$store.state.login.isLogin ? '快来评论' : '登录后才可评论'
    }
  },
  methods: {
    goto() {
      this.$emit('goto', this.comment)
    }
  }
}
</script>

<style lang="scss" scoped>
  .switch-bar {
    position: fixed;
    bottom: 0;
    height: 46px;
    line-height: 46px;
    display: flex;
    width: 100%;
    border-top: 1px solid #eee;
  }  
  input {
    flex: auto;
    padding-left: 10px;
  }
  button {
    min-width: 100px;
    border: none;
    background: #38f;
    color: #fff;
  }
</style>


