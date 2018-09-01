<template>
  <div class="category">
    <Tab :tabs="categoryList" @tab="getCurrent">
      <keep-alive>
        <TopicList 
          v-for="(item, index) of categoryList" :key="index" 
          v-if="index === currentTab" 
          :listType="item.name">
          </TopicList>
      </keep-alive>
    </Tab>
  </div>
</template>

<script>
import { category } from '../constants/index.js'
import TopicList from '../components/TopicList.vue'
import Tab from '../components/Tab.vue'
export default {
  name: 'category', 
  data() {
    return {
      categoryList: category,
      currentTab: 0,
    }
  },
  components: {
    TopicList,
    Tab,
  }, 
  created() {
     
  },
  methods: {
    getCurrent(num) {
      this.currentTab = num
    }
  },
  
}
</script>

