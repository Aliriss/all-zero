<template>
  <div class="content">
    <div class="search-container">
      search container
    </div>
    <div class="table-container">
      <a-table
          :columns="columns"
          :data-source="dataSource"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { billApi } from '@/api/bill';
import { billColumns } from '@/view/bill/data/Data';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Bill'
})
export default class Bill extends Vue {
  text = 'haha';
  columns: any = billColumns;
  dataSource: any = [];

  mounted() {
    // this.testData();
    this.query()
  }

  async query() {
    const { data } = await billApi.getBillList({});
    this.dataSource = data;
    console.log('data source: ', this.dataSource)
  }

  testData() {
    this.dataSource = [
      {
        userName: 'haha',
        charge: 100,
        type: '交通',
        time: '2023-03-31'
      }
    ]
  }
}
</script>

<style scoped lang="less">
.content{
}
</style>