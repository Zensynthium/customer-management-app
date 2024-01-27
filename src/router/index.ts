import { createRouter, createWebHistory } from 'vue-router'
import AllCustomersView from '@/views/AllCustomersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'View Customers',
      component: AllCustomersView
    },
    {
      path: '/create',
      name: 'Create Customer',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
      component: () => import('@/views/CreateCustomerView.vue')
    }
  ]
})

export default router
