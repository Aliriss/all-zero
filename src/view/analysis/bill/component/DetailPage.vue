<template>
  <div>
    <a-table
        :columns="columns"
        :data-source="dataSource"
        :scroll="{y: 'calc(77vh - 100px)'}"
    ></a-table>
  </div>
</template>
<script lang="ts">

import { billApi } from '@/api';
import { billColumns } from '@/view/analysis/bill/data/Data';
import { Vue, Options, Prop } from 'vue-property-decorator';
@Options({
})
export default class DetailPage extends Vue {
  @Prop({type: Object,required: false,default: {}})
  defaultParams!: object;
  columns: any = billColumns;
  dataSource: any = []
  params: any = {
    dimDate: undefined,
    opDate: undefined,
    startDate: undefined,
    endDate: undefined,
    invalidFlag: undefined,
    typeId: undefined
  }

  mounted() {
    this.params = {...this.defaultParams};
    this.query();
  }

  async query() {
    const { data } = await billApi.getBillList(this.params);
    this.dataSource = data;
  }
}
</script>


<style scoped lang="less">

</style>