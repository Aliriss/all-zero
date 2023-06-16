import { Layout } from '@/router/utils/layout';

/**
 * 默认布局的页面路由
 */
export const configRoutes: any = [{
    path: '/system',
    redirect: '/system/type',
    component: Layout,
    children: [
        {
            path: 'type',
            component: () => import('@/view/system/type/index.vue')
        },
        {
            path: 'user',
            component: () => import('@/view/system/user/index.vue')
        }
    ]
}]