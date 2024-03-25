// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthServices } from '../composables/useAuthServices'

const routes = [
  {
    path: '/ai-test',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/ai-test',
        name: 'AiTest',
        component: () => import('@/views/AiTest.vue'),
      },
    ],
  },
  {
    path: '/lokaquiz',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/lokaquiz',
        name: 'LokaQuiz',
        component: () => import('@/views/LokaQuiz.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/default/Blank.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/signup',
    component: () => import('@/layouts/default/Blank.vue'),
    children: [
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/Signup.vue'),
      },
    ],
  },
  {
    path: '/confirmation',
    component: () => import('@/layouts/default/Blank.vue'),
    children: [
      {
        path: '/confirmation',
        name: 'Confirmation',
        component: () => import('@/views/Confirmation.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true } ,
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
        name: 'Course Schedule',
        component: () => import('@/views/CourseSchedule.vue'),
      },
    ],
  },
  {
    path: '/kelas/:id/select-student',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/kelas/:id/select-student',
        meta: { requiresAuth: true },
        name: 'Select Student',
        component: () => import('../components/pages/SelectStudent.vue'),
      },
    ],
  },
  {
    path: '/kelas/:id/students',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/kelas/:id/students',
        meta: { requiresAuth: true },
        name: 'Student Class',
        component: () => import('../components/pages/ClassStudent.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authServices = useAuthServices();
  const isAuthenticated = authServices.checkAuth()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Redirect to login page if unauthenticated
      next('/login')
    } else {
      next(); // Continue navigation
    }
  } else {
    next(); // Continue navigation for routes that don't require authentication
  }
});

export default router
