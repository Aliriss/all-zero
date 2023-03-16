<template>
  <div class="content">
    <div class="search-container">
      <a-form
          class="form-content"
          :model="params"
          name="表单"
          layout="inline"
          @finishFailed="onFinishFailed"
      >
        <a-form-item label="" name="time" class="form-item">
          <a-space direction="horizontal">
            <a-radio-group v-model:value="params.dimDate" option-type="button" :options="dimDateOptions" />
            <a-date-picker v-if="params.dimDate === '1'" placeholder="请选择日期" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="params.opDate" :locale="locale" />
            <a-date-picker v-if="params.dimDate === '3'" placeholder="请选择日期" format="YYYY-MM" valueFormat="YYYY-MM" v-model:value="params.opDate" picker="month" :locale="locale" />
          </a-space>
        </a-form-item>
        <a-form-item label="用户" name="userName" class="form-item">
          <a-select
              v-model:value="params.userId"
              style="width: 100%"
              placeholder="请选择用户"
              :show-search="true"
              optionFilterProp="label"
              @change="changeType"
          >
            <a-select-option v-for="item in user" :key="item.id" :label="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="消费类型" name="type" class="form-item">
          <a-select
              v-model:value="params.type"
              style="width: 100%"
              placeholder="请选择消费类型"
              :show-search="true"
              optionFilterProp="label"
              @change="changeType"
          >
            <a-select-option v-for="item in type" :key="item.id" :label="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="form-item">
          <a-button type="primary" @click="query">查询</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="table-container">
      <a-table
          :columns="columns"
          :data-source="dataSource"
      >
        <template #action="record">
          {{ record }}
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { billApi, userApi } from '@/api';
import { dateDimSimpleOpt } from '@/util/constant';
import { billColumns, type } from '@/view/analysis/bill/data/Data';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Bill'
})
export default class Bill extends Vue {
  text = 'haha';
  columns: any = billColumns;
  dataSource: any = [];
  params: any = {
    dimDate: '3',
    opDate: moment().format('YYYY-MM'),
    type: undefined,
    userId: undefined
  }

  dimDateOptions: any = dateDimSimpleOpt;

  // 消费类型
  type: any = type;
  user: any = [];
  locale = locale;

  mounted() {
    // this.testData();
    this.query()
    this.getUser();
    console.log('mounted')
    console.log('moment: ', moment().format('YYYY-MM-DD'));
  }

  async query() {
    console.log('query')
    const { data } = await billApi.getBillList(this.params);
    this.dataSource = data;
  }

  async getUser() {
    const { data } = await userApi.getUserList({});
    this.user = data;
  }

  onFinishFailed() {
    console.log('form on finish failed')
  }

  changeType(type: any) {
    console.log('change type: ', type)
  }
}
</script>

<style scoped lang="less">
.content{
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 14px;
  .search-container {
    .form-content{
      margin-bottom: 15px;
      .form-item{
        width: 20%;
      }
    }
  }
}
</style>