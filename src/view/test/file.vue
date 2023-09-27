<template>
  <div style="height:800px;width:100%;">
    <a-button @click="download">点我下载测试文件</a-button>
  </div>
</template>

<script lang="ts">
import XLSX from 'xlsx';
import { x } from '@/util/file/a';
import { FileUtils } from '@/util/file/fileUtils';
import { Vue, Options } from 'vue-property-decorator';

@Options({})
export default class testMap extends Vue {

  download() {
    FileUtils.base64ToFile(x, 'haha.pdf');
  }
}
</script>

<style scoped lang="less">

</style>