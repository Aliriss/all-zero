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

    </div>
    <div class="table-content">
      <a-table
          row-key="id"
          :columns="columns"
          :data-source="dataSource"
      >
        <template #bodyCell="{column, record}">
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
    invalid: 0
  }
  dataSource = [
  ]

  mounted() {
    this.getList();
  }

  async getList() {
    await depositApi.getList(this.params).then((res) => {
      this.dataSource = res.data.data;
      this.dataSource.forEach((v: any) => v.enable = (v.invalid == 1))
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