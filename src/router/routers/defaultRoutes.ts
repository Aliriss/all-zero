import { Layout } from '@/router/utils/layout';

/**
 * 默认布局的页面路由
 */
export const defaultRoutes: any = [
  {
    path: '',
    redirect: '/signIn',
    component: Layout,
    children: [
      // home页面
      {
        path: 'home',
        component: () => import('@/view/home/Home.vue')
      },
      // 账单（消费记录）页面
      {
        path: 'bill',
        component: () => import('@/view/analysis/bill/index.vue')
      },
      // 消费记录合计页面
      {
        path: 'summary',
        component: () => import('@/view/analysis/bill/summary.vue')
      },
      // 消费记录趋势图页面
      {
        path: 'trend',
        component: () => import('@/view/analysis/bill/trend.vue')
      },
      // 定期存款记录页面
      {
        path: 'deposit',
        component: () => import('@/view/deposit/deposit.vue')
      }
    ]
  },
];