import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时 滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  return next()
})

export default router
