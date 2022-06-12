import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
      path: '/',
      component: () => import('@/views/home/')
    },
    {
      path: '/about',
      component: () => import('@/views/about')
    },
    {
      path: "/:country",
			component: () => import('@/views/country/')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router