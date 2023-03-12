import * as index from '@/router/routers';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes: any = [];
console.log('index: ', index)
for (const i in index) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  routes.push(...index[i])
}
console.log('routes: ', routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});
export default router;