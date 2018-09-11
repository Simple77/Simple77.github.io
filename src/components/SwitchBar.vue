<template>
  <div class="switch-bar">
    <input type="text" v-model.trim="comment" :placeholder="placeholder"><button @click="goto">{{value}}</button>
    
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
    height: 46px;
    // line-height: 46px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
  }  
  input {
    flex: 1;
    padding-left: 10px;
    border: 1px solid #eee;
    box-sizing: border-box;
    height: 46px;
  }
  button {
    width: 100px;
    border: none;
    background: #38f;
    color: #fff;
    height: 46px;
  }
</style>


