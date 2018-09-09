import Vue from 'vue'
import VueRouter from 'vue-router';

import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Message from '../views/Message.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import TopicDetail from '../views/TopicDetail.vue'
import Comments from '../views/Comments.vue'
import PersonCenter from '../views/PersonCenter.vue'
import MyCollection from '../views/MyCollection.vue'
import CreateTopic from '../views/CreateTopic.vue'
import MyTopics from '../views/MyTopics.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    component: Index,
    children: [
      {
        path: '/', 
        component: Home, 
      },
      {
        path: 'category', 
        component: Category,
      },
      {
        path: 'message', 
        component: Message,
      },
      {
        path: 'user', 
        component: User,
      }
    ]
  },
  {
    path: '/user/:username',
    component: PersonCenter,
    props: true,
    name: 'username',
    children: [
      {
        path: 'myTopics',
        component: MyTopics,
        props: true,
      },
      {
        path: 'collection',
        component: MyCollection,
        props: true,
      },
      {
        path: 'createTopic',
        component: CreateTopic,
      }
    ]
  },
  {
    path: '/login', 
    component: Login,
  },
  {
    path: '/topic/:id',
    component: TopicDetail,
    props: true, 
    children: [
      {
        path: 'reply',
        component: Comments,
      }
    ]
  }
]


const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {

// })

export default router

