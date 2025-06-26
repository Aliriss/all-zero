import { createApp } from 'vue';
import App from './App.vue';
// import './assets/bootstrap/css/bootstrap.css';
import './index.css';
import Antd from 'ant-design-vue';
// antd的样式文件居然是reset.css，以后少用这个组件吧，很不规范，经几番调整。
import 'ant-design-vue/dist/reset.css';
import router from './router/index';


// Vue.prototype.$message = message;

// --------------- markdown editor ---------------
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';

import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
// Prism
import Prism from 'prismjs';
// highlightjs
import hljs from 'highlight.js';
// highlight code
import 'prismjs/components/prism-json';
// codemirror 编辑器的相关资源
// import Codemirror from 'codemirror';
// mode
// import 'codemirror/mode/markdown/markdown';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/css/css';
// import 'codemirror/mode/htmlmixed/htmlmixed';
// import 'codemirror/mode/vue/vue';
// edit
// import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/edit/matchbrackets';
// // placeholder
// import 'codemirror/addon/display/placeholder';
// // active-line
// import 'codemirror/addon/selection/active-line';
// // scrollbar
// import 'codemirror/addon/scroll/simplescrollbars';
// import 'codemirror/addon/scroll/simplescrollbars.css';
// // style
// import 'codemirror/lib/codemirror.css';

// VMdEditor.Codemirror = Codemirror;
VMdEditor.use(vuepressTheme, {
  // hljs,
  Prism
});
// VMdEditor.use(githubTheme, {
//   // hljs,
//   Prism
// });
// ---------------------------------------------
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';


const app = createApp(App);
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});


app.use(Antd)
  .use(router)
  .use(VMdEditor)
  .use(VMdPreviewHtml)
  .use(ElementPlus)

  // .use(message)

;
app.mount('#app');
