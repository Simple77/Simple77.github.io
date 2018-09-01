<template>
  <img :src="url" alt="">
</template>

<script>
export default {
  props: {
    url: String,
  }
}
</script>

<style lang="scss" scoped>
  img {
    border-radius: 50%;
  }
</style>


