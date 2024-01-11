<template>
  <div>
    <h1>{{ data }}</h1>
  </div>
</template>
<script lang="ts">
import { common } from '@/api/common';
import { Options, Vue } from 'vue-property-decorator';
@Options({
  name: 'Test'
})
export default class Test extends Vue {
  data: any = 'data'

  async getData() {
    console.log('get user: ', await common.getUser());
  }

  created() {
    this.getData()
  }
}
</script>
