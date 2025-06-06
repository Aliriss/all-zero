<template>
  <div class="content">
    <div class="search-content">
      <a-form :model="params"
              name="表单"
              layout="inline">
        <a-form-item label="作废" name="invalidFlag" class="form-item">
          <a-select
              v-model:value="params.invalid"
              style="width: 100%"
              placeholder="请选择"
              :allow-clear="true"
          >
            <a-select-option :key="1" label="未作废">作废</a-select-option>
            <a-select-option :key="0" label="作废">未作废</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="getList">查询</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="operation-content">
      合计：{{ sum }}
    </div>
    <div class="table-content">
      <a-table
          row-key="id"
          :columns="columns"
          :data-source="dataSource"
      >
        <template #bodyCell="{column, record}">
          <template v-if="column.key === 'endDate'">
            <div style="font-weight: bold">
              <div style="color: green;display: inline">{{ record.endDate }}</div>
              <div v-if="record.endDate !== '-'">
                （剩
                <div style="color: green;display: inline">{{ getDay(record.endDate) }}</div>
                天）
              </div>

            </div>
          </template>
          <template v-if="column.key === 'invalid'">
            <a-switch v-model:checked="record.enable" @change="changeState(record)" />
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">

import { message } from 'ant-design-vue';
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
      title: '到期日',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a: any, b: any) => a.endDate.localeCompare(b.endDate)
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a: any, b: any) => Number(a.amount) - Number(b.amount)
    },
    {
      title: '银行',
      dataIndex: 'bankName',
      key: 'bankName',
      sorter: (a: any, b: any) => a.bankName.localeCompare(b.bankName),
    },
    {
      title: '利率',
      dataIndex: 'interestRate',
      key: 'interestRate',
      sorter: (a: any, b: any) => a.interestRate.localeCompare(b.interestRate),
    },
    {
      title: '利息',
      dataIndex: 'interest',
      key: 'interest',
      sorter: (a: any, b: any) => Number(a.interest) - Number(b.interest)
    },
    {
      title: '存款日',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: any, b: any) => a.startDate.localeCompare(b.startDate),
    },
    {
      title: '存期',
      dataIndex: 'period',
      key: 'period',
      sorter: (a: any, b: any) => a.period.localeCompare(b.period),
    },
    {
      title: '作废',
      dataIndex: 'invalid',
      key: 'invalid',
    }
  ]
  params = {
    invalid: 0
  }
  dataSource = [
  ];
  sum = 0;

  mounted() {
    this.getList();
  }

  async getList() {
    await depositApi.getList(this.params).then((res) => {
      this.dataSource = res.data.data;
      this.dataSource.forEach((v: any) => v.enable = (v.invalid == 1))
      this.sum = 0;
      this.dataSource.forEach((v: any) => this.sum += v.amount)
    })
  }

  async changeState(record: any) {
    await depositApi.update({
      id: record.id,
      invalid: record.enable ? 1 : 0
    }).then((res: any) => {
      if (res && res.data.code === 200) {
        message.success('成功')
      } else {
        message.error('失败')
      }
    })
    this.getList();
  }

  getDay(endDate: string) {
    const start = Date.now();
    const end = Date.parse(endDate);
    if (start > end) {
      return 0;
    }
    if (start == end) {
      return 1;
    }
    return Math.round((end - start) / (24 * 60 * 60 * 1000));
  }
}
</script>

<style scoped lang="less">
.content{
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 14px;
  padding: 10px;
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