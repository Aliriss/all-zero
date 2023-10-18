/**
 * 不带布局的页面路由
 * @type {({path: string, component: () => Promise<{readonly default?: {data(): {todoList: []}, watch: {data: {handler(): void, deep: boolean, immediate: boolean}}, name: string, props: {data: {default: [{task: string, id: number, done: boolean},{task: string, id: number, done: boolean},{task: string, id: number, done: boolean}], type: [Array | ArrayConstructor], required: boolean}}}}>} | {path: string, component: () => Promise<{readonly default: any}>} | {path: string, component: () => Promise<{readonly default: any}>})[]}
 */
export const simpleRoutes: any = [
    {
        path: '/todo-list',
        component: () => import('@/view/todolist/ToDoList.vue')
    },
    {
        path: '/map',
        component: () => import('@/view/test/testMap.vue')
    },
    {
        path: '/file',
        component: () => import('@/view/test/file.vue')
    },
    {
        path: '/md',
        component: () => import('@/view/study/onJava8.vue')
    }
];