<template>
  <div class="onJava8">
    <div class="sideBar">
      <v-md-editor v-model="sideBar" mode="preview" :default-show-toc="true"></v-md-editor>
    </div>
    <div class="content">
      <Content :path="fileName" file-name="p13"></Content>
    </div>
  </div>
</template>

<script lang="ts">
import Content from '@/view/study.onjava8/components/Content.vue';
import { Vue, Options } from 'vue-property-decorator';
import sideBar from '@/view/study.onjava8/sidebar.md?raw';


@Options({
  components: {Content}
})
export default class onJava8 extends Vue {
  sideBar: any = sideBar;

  fileName: any = 'a.txt';

  mounted() {
    this.getMdFile();
  }

  async getMdFile() {
    console.log('haha')
  }

}
</script>

<style scoped lang="less">
.onJava8 {
  width: 100%;
  position: relative;
  display: flex;
  height: 800px;
  overflow-y: scroll;
  .sideBar{
    width: 20%;
    height: 800px;
    overflow-y: scroll;
  }
  .content{
    width: 80%;
    height: 800px;
    overflow-y: scroll;
  }
}

:deep(::-webkit-scrollbar) {
  width: 0;
  height: 0;
  color: transparent;
}
:deep(::-webkit-scrollbar-thumb) {
  background-color: transparent;
  border-radius: 0;
  border: 0;
}
</style>