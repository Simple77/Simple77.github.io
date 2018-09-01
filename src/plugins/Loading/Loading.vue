<template>
  <transition name="loading" @after-leave="handleAfterLeave">
    <div class="loading-mask" v-show="visible" :class={fullscreen}>
      <div class="loading">
        ...
      </div>
      <div class="loading-text" v-if="text">
        {{text}}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      visible: true,
      fullscreen: true,
      text: null
    }
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave')
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading-mask {
    position: absolute;
    z-index: 10000;
    background: rgba(255, 235, 215, .8);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s; 
  }
  .loading-mask.fullscreen {
    position: fixed;
  }
</style>


