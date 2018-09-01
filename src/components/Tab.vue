<template>
  <div class="tabs-wrap">
    <div class="ul-wrap">
      <ul>
        <li 
          :class="active === index ? 'active' : ''" 
          v-for="(item, index) of tabs" :key="index" 
          :style="{width}"
          @click="tabClick(index)">
          {{item.value}}  
        </li>
      </ul>
    </div>
    <div class="tab-content-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      pos: []
    }
  },
  props: {
    tabs: Array,
  },
  computed: {
    width() {
      return 100 / (this.tabs.length) + '%'
    }
  },
  created() {
    this.tabs.forEach((item, index) => {
      this.pos.push({id: index, scrollTop: 0})
    })
  },
  methods: {
    tabClick(val) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.pos[this.active].scrollTop = scrollTop
      this.active = val
      this.$emit('tab', val)
      this.$nextTick(() => {
        window.scrollTo(0, this.pos[val].scrollTop)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ul-wrap {
    height: 46px;
  }
  ul {
    width: 100%;
    display: flex;
    position: fixed;
    background: #fff;
  }
  li {
    text-align: center;
    line-height: 46px;
    &.active {
      border-bottom: 2px solid #38f;
      color: #38f;
    }
  }
  
</style>




