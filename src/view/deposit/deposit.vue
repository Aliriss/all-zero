<template>
  <div class="content">
    <div class="search-content">
    </div>
    <div class="operation-content">

    </div>
    <div class="table-content">
      <a-table
          row-key="id"
          :columns="columns"
          :data-source="dataSource"

      >
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-property-decorator';
import { depositApi } from '@/api/deposit/deposit';

@Options({
  name: 'Deposit',
  computed: {
  }
})
export default class Bill extends Vue {
  columns = [
    {
      title: '用户',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '存款日',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '到期日',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '存期',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '作废',
      dataIndex: 'invalid',
      key: 'invalid',
    }
  ]
  params = {
  }
  dataSource = [
  ]

  mounted() {
    depositApi.getList({}).then((res) => {
      this.dataSource = res.data.data
    })
  }
}
</script>

<style scoped lang="less">
.content{
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 14px;
  .search-content {
    .form-content{
      margin-bottom: 15px;
      .form-item{
        width: 20%;
        margin-bottom: 10px;
      }
      .form-item:nth-child(1) {
        width: 24%;
        // margin-right: 66%;
      }
    }
  }
  .operation-content {
    margin-bottom: 10px;
  }
}
</style>