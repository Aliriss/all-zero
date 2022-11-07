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
      redirect: '/people',
      children: [
        {
          path: 'people',
          component: () => import('@/view/people/People.vue')
        }
      ]
    }
  ]
});
export default router;