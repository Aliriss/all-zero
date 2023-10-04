import { Layout } from '@/router/utils/layout';

/**
 * 默认布局的页面路由
 */
export const defaultRoutes: any = [{
    path: '',
    redirect: '/home',
    component: Layout,
    children: [
        {
            path: 'home',
            component: () => import('@/view/home/Home.vue')
        },
        {
            path: 'bill',
            component: () => import('@/view/analysis/bill/index.vue')
        },
        {
            path: 'summary',
            component: () => import('@/view/analysis/bill/summary.vue')
        },
        {
            path: 'trend',
            component: () => import('@/view/analysis/bill/trend.vue')
        }
    ]
}]