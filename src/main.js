import { createApp } from 'vue';
// import { Vue } from 'vue-property-decorator';
import App from './App.vue';
// import './assets/bootstrap/css/bootstrap.css';
import './index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router/index';
// import { message } from 'ant-design-vue';

// Vue.prototype.$message = message;


const app = createApp(App);
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});
app.use(Antd)
  .use(router);
app.mount('#app');
