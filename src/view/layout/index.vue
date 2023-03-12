<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">{{ logo.name }}</div>
      <!--菜单列表-->
      <a-menu v-model:selectedKeys="selectedKey" theme="dark" mode="inline" @click="handleClick">
        <MenuItem :menu="menu" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!--<a-layout-header style="background: #fff; padding: 0">header</a-layout-header>-->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <!--路径展示-->
          <a-breadcrumb-item v-for="(item, index) in selectedTitle" :key="selectedKeys[index]">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <!--内容-->
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Project ©2023 Created by ALL
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import MenuItem from '@/view/layout/MenuItem.vue';
import { menuTest } from '@/view/layout/TestData';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Index',
  components: {
    MenuItem,
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
  }
})
export default class Index extends Vue {
  collapsed = false;
  // 已选菜单id，只有一个选择的id
  selectedKey = ["home"];
  // 已选菜单id，有父子id
  selectedKeys = ["home"];
  // 已选菜单标题
  selectedTitle = [];
  logo: any = {
    name: 'logo'
  }

  menu: any = menuTest;

  mounted() {
    this.handleClick({
      keyPath: this.selectedKeys
    })
  }

  handleClick(val: any) {
    this.selectedKeys = val.keyPath;
    let i = 0;
    let menu = this.menu;
    this.selectedTitle = [];
    while(i < this.selectedKeys.length) {
      for (const m of menu) {
        if (m.id === this.selectedKeys[i]) {
          this.selectedTitle.push((m.title as never));
          menu = m.children;
          i++;
          break;
        }
      }
    }
  }

  // todo search menu

  // todo jump to page
}
</script>
<style scoped lang="less">
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
