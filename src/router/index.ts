import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/todo-list',
      component: () => import('@/view/todolist/ToDoList.vue')
    },
    {
      path: '/',
      redirect: '/home',
      children: [
        {
          path: 'people',
          component: () => import('@/view/people/People.vue')
        },
        {
          path: 'home',
          component: () => import('@/view/index.vue')
        },
        {
          path: 'bill/index',
          component: () => import('@/view/bill/index.vue')
        }
      ]
    },
    {
      path: '/expenditure',
      component: () => import('@/view/expenditure/index.vue')
    },
    {
      path: '/wy',
      component: () => import('@/view/people/Wy.vue')
    }
  ]
});
export default router;
