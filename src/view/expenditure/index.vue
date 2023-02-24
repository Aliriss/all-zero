<template>
  <div>bill page</div>
  <a-table
    :columns="columns"
    :data-source="datasource"
    row-key="id"
  ></a-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { billApi } from "@/api/bill";
import { expenditureApi } from "@/api/expenditure";

@Component({
  name: 'Expenditure'
})
export default class Expenditure extends Vue {
  name = '';
  columns: any = [];
  datasource: any = [];
  mounted() {
    this.initColumns();
    expenditureApi.getExpenditureList({ id: 1 }).then((res: any) => {
      this.datasource = res.data;
      console.log('res: ', res)
    })
  }

  initColumns() {
    this.columns = [
      {
        title: '用户名称',
        dataIndex: 'accountName'
      },
      {
        title: '消费',
        dataIndex: 'charge'
      },
      {
        title: '时间',
        dataIndex: 'time'
      }
    ]
  }
}
</script>

<style scoped lang="less">

</style>
