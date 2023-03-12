

export const simpleRoutes: any = [
    {
        path: '/todo-list',
        component: () => import('@/view/todolist/ToDoList.vue')
    },
    {
        path: '/expenditure',
        component: () => import('@/view/expenditure/index.vue')
    },
    {
        path: '/wy',
        component: () => import('@/view/people/Wy.vue')
    }
];