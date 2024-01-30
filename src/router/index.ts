import { createRouter, createWebHistory } from 'vue-router'

// Views
import AllCustomersView from '@/views/AllCustomersView.vue'
import CreateCustomerView from '@/views/CreateCustomerView.vue'

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
      component: CreateCustomerView
    },
    {
      path: '/:pathMatch(.*)*', // This is the catch-all route
      name: 'View Customers',
      component: AllCustomersView,
    },
  ]
})

export default router
