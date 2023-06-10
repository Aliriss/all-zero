<template>
  <template v-for="item in menu" :key="item.id">
    <!--有子菜单-->
    <template v-if="item.children && item.children.length > 0">
      <!--展示父级菜单-->
      <a-sub-menu :key="item.id">
        <template #title>
          <!--icon-->
          <span>{{ item.title }}</span>
        </template>
        <!--展示子级菜单-->
        <MenuItem :menu="item.children"/>
      </a-sub-menu>
    </template>
    <!--无子菜单-->
    <a-menu-item v-else :key="item.id" @select="selectMenu">
      <router-link :to="item.link">{{ item.title }}</router-link>
      <!--<template #icon>-->
      <!--  <Icon :type="item.icon"/>-->
      <!--</template>-->
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator';
// const Icon = {
//   name: 'icon',
//   props: {
//     type: {
//       type: String,
//       default: 'desktop-outlined'
//     }
//   },
//   template: `<desktop-outlined />`
// }
@Options({
  name: 'MenuItem',
  components: {
    MenuItem
  }
})
export default class MenuItem extends Vue {
  /**
   * [{
   *    id: '',
   *    title: '',
   *    icon: '',
   *    link: '',
   *    children: []
   * }]
   */
  @Prop({ required: true, type: Array })
  menu!: any;

  selectMenu(val: any) {
  }
}
</script>

<style scoped lang="less">
</style>