/**
 * 不带布局的页面路由
 *
 */
export const simpleRoutes: any = [
  // 登录注册主页面
  {
    path: '/signIn',
    component: () => import('@/view/login/signIn.vue'),
  },
  // 注册页面
  {
    path: '/signUp',
    component: () => import('@/view/login/signUp.vue'),
  },
  // 登录
  {
    path: '/todo-list',
    component: () => import('@/view/todolist/ToDoList.vue')
  },
  // 地图页面
  {
    path: '/map',
    component: () => import('@/view/test/testMap.vue')
  },
  // 文件页面
  {
    path: '/file',
    component: () => import('@/view/test/file.vue')
  },
  // md文档页面（onJava8）
  {
    path: '/md',
    component: () => import('@/view/study/onJava8.vue')
  },
  {
    path: '/testDate',
    component: () => import('@/view/test/testDate.vue')
  }
];
