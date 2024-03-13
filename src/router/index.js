// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/registration',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/registration',
        name: 'Registration',
        component: () => import('@/views/Registration.vue'),
      },
    ],
  },
  {
    path: '/student',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/student',
        name: 'Student',
        component: () => import('@/views/Student.vue'),
      },
    ],
  },
  {
    path: '/mentor',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/mentor',
        name: 'Mentor',
        component: () => import('@/views/Mentor.vue'),
      },
    ],
  },
  {
    path: '/transaction',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/transaction',
        name: 'Transaction',
        component: () => import('@/views/Transaction.vue'),
      },
    ],
  },
  {
    path: '/course',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/course',
        name: 'Course',
        component: () => import('../views/Course.vue'),
      },
    ],
  },
  {
    path: '/kelas',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/kelas',
        name: 'Course Schedule',
        component: () => import('@/views/CourseSchedule.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
