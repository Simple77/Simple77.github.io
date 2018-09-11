<template>
  <div id="app">
    <keep-alive exclude="TopicDetail">
      <router-view></router-view>
    </keep-alive>
    <div class="bg" v-if="hasBg"></div>
  </div>
</template>

<script>
import TopicDetail from './views/TopicDetail.vue'
export default {
  name: 'app',
  mounted() {
    console.log(this.$router)
    console.log(this.$store)
  },
  computed: {
    hasBg() {
      return this.$route.fullPath.indexOf('login') === -1 ? true : false
    }
  }
}
</script>

<style>
  .bg {
    position: fixed;
    height: 100%;
    background: #ddd;
    width: 100%;
    top: 0;
    z-index: -1;
  }
  input, textarea {
    background: transparent;
    border-style: none;
  }
</style>


