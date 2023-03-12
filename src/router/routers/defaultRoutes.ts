import { Layout } from '@/router/utils/layout';


export const defaultRoutes: any = [{
    path: '',
    redirect: '/home',
    component: Layout,
    children: [
        {
            path: 'people',
            component: () => import('@/view/people/People.vue')
        },
        {
            path: 'home',
            component: {}
        },
        {
            path: 'bill',
            component: () => import('@/view/bill/index.vue')
        }
    ]
}]