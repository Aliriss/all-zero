<template>
  <div class="content">
    <div class="search-content">
      <a-form
          class="form-content"
          :model="params"
          name="表单"
          layout="inline"
          @finishFailed="onFinishFailed"
      >
        <a-form-item label="" name="time" class="form-item">
          <Date
              :dim-date="[1, 3]"
              :default-dim-date="params.dimDate"
              :op-date="params.opDate"
              :start-date="params.startDate"
              :end-date="params.endDate"
              @dimChange="dimChange"
              @change="dateChange"
          />
        </a-form-item>
        <a-form-item label="用户" name="userName" class="form-item">
          <a-select
              v-model:value="params.userId"
              style="width: 100%"
              placeholder="请选择用户"
              :show-search="true"
              :allow-clear="true"
              optionFilterProp="label"
              @change="changeUser"
          >
            <a-select-option v-for="item in user" :key="item.id" :label="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="消费类型" name="type" class="form-item">
          <a-select
              v-model:value="params.typeId"
              style="width: 100%"
              placeholder="请选择消费类型"
              :show-search="true"
              :allow-clear="true"
              optionFilterProp="label"
              @change="changeType"
          >
            <a-select-option v-for="item in type" :key="item.id" :label="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="作废" name="invalidFlag" class="form-item">
          <a-select
              v-model:value="params.invalidFlag"
              style="width: 100%"
              placeholder="请选择消费类型"
              :allow-clear="true"
          >
            <a-select-option :key="0" label="未作废">作废</a-select-option>
            <a-select-option :key="1" label="作废">未作废</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="form-item">
          <a-button type="primary" @click="query">查询</a-button>
          <a-button type="default" style="margin-left: 10px" @click="reset">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!--add content: add bill list. contain a button used to show add modal -->
    <div class="operation-content">
      <a-button type="primary" @click="showAddModal">添加</a-button>
      <span style="margin-left: 20px">收入：<span :style="{'font-size': '16px', 'color': 'green'}">{{ sumData.income }}</span>元</span>
      <span style="margin-left: 20px">
        <a-tooltip>
          <template #title>
            <p>共消费{{ dayNum }}天，消费限额：{{ balance }}元</p>
            <p v-if="sumData.outcome > this.balance">超额: <span style="color: red">{{ sumData.outcome - balance }}</span>元</p>
            <span style="font-size: 12px">注：每天消费限额：<span style="color: dodgerblue">30</span>元</span>
          </template>
          支出：<span :style="{'font-size': '16px', 'color': sumData.outcome < this.balance ? 'green' : 'red'}">{{ sumData.outcome }}</span>元
        </a-tooltip>
      </span>
    </div>
    <!--table content: show bill data-->
    <div class="table-content">
      <a-table
          :columns="columns"
          :data-source="dataSource"
      >
        <template #bodyCell="{column, record}">
          <template v-if="column.key === 'action'">
            <template v-if="record.invalidFlag === 0">
              <a @click="validate(record)">启用</a>
              <a style="margin-left: 20px" @click="deleteBill(record)">删除</a>
            </template>
            <a v-if="record.invalidFlag === 1" @click="invalidate(record)">作废</a>
          </template>
        </template>
      </a-table>
    </div>
    <!-- add modal used to add bill list -->
    <a-modal
        title="添加账单"
        :visible="addModalData.visible"
        width="90%"
        style="top: 30px"
        :confirm-loading="addModalData.confirmLoading"
        destroyOnClose
        @ok="addBillList"
        @cancel="closeAddModal"
    >
      <AddPage ref="addPage" :user="user" :type-list="type"/>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { billApi, userApi } from '@/api';
import { dateDimSimpleOpt } from '@/util/constant';
import { StaticUtils } from '@/util/StaticUtils';
import AddPage from '@/view/analysis/bill/component/AddPage.vue';
import Date from '@/components/date/Date.vue';
import { billColumns, type } from '@/view/analysis/bill/data/Data';
import { message } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Bill',
  components: {Date, AddPage},
  computed: {
  }
})
export default class Bill extends Vue {
  text = 'haha';
  columns: any = billColumns;
  dataSource: any = [];
  params: any = {
    dimDate: '3',
    opDate: moment().format('YYYY-MM'),
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    type: undefined,
    userId: undefined,
    invalidFlag: 0 // 作废
  }

  dimDateOptions: any = dateDimSimpleOpt;

  // 消费类型
  type: any = type;
  user: any = [];
  locale = locale;
  addModalData: any = {
    visible: false,
    confirmLoading: false
  }

  sumData: any = {};
  dayNum = 10;
  balance = 20;

  mounted() {
    this.query()
    this.getUser();
    this.getType();
  }

  async query() {
    this.getBillList();
    this.getSum();
    this.calcBalance();
  }

  reset() {
    this.params = {
      dimDate: '3',
      opDate: moment().format('YYYY-MM'),
      type: undefined,
      userId: undefined
    }
  }

  /**
   * 作废
   * @param record
   */
  invalidate(record: any) {
    billApi.invalidateBill({ id: record.id }).then((res: any) => {
      if (res.data.code === 200) {
        message.success(res.data.msg);
      } else {
        message.error(res.data.msg);
      }
    }).finally(() => {
      this.query();
    });
  }

  /**
   * 启用
   * @param record
   */
  validate(record: any) {
    billApi.validateBill({ id: record.id }).then((res: any) => {
      if (res.data.code === 200) {
        message.success(res.data.msg);
      } else {
        message.error(res.data.msg);
      }
    }).finally(() => {
      this.query();
    });
  }

  /**
   * 删除
   * @param record record
   */
  deleteBill(record: any) {
    billApi.deleteBill({id: record.id}).then((res: any) => {
      if (res.data.code === 200) {
        message.success(res.data.msg)
      } else {
        message.error(res.data.msg)
      }
    }).finally(() => {
      this.query()
    })
  }

  async getUser() {
    const { data } = await userApi.getUserList({});
    this.user = data;
  }

  async getType() {
    const { data } = await billApi.getTypeList({});
    this.type = data;
  }

  /**
   * 查询账单列表
   * @returns {Promise<void>}
   */
  async getBillList() {
    const { data } = await billApi.getBillList(this.params);
    this.dataSource = data;
  }

  /**
   * 查询合计数据
   * @returns {Promise<void>}
   */
  async getSum() {
    const { data } = await billApi.getBillSum(this.params);
    this.sumData = data;
  }

  onFinishFailed() {
    console.log('on finished failed')
  }

  /**
   * 添加账单到数据库中
   */
  async addBillList() {
    // const saved = (this.$refs.addPage as any).$emit('addBillList');
    const saved = await (this.$refs.addPage as any).saveBillList();
    if (saved) {
      this.closeAddModal();
    }
    await this.query();
  }

  /**
   * show add modal
   */
  showAddModal() {
    this.addModalData.visible = true;
  }

  /**
   * close add modal
   */
  closeAddModal() {
    this.addModalData.visible = false;
  }

  changeType(id: any, option: any) {
    if (StaticUtils.isNotEmpty(option)) {
      this.params.typeName = option.label
    } else {
      this.params.typeName = undefined;
    }

  }

  changeUser(id: any, option: any) {
    if (StaticUtils.isNotEmpty(option)) {
      this.params.userName = option.label
    }else {
      this.params.userName = undefined;
    }
  }

  dateChange(date: any) {
    if (this.params.dimDate === '1' || this.params.dimDate === 1 || this.params.dimDate === 'date') {
      this.params.startDate = date[0];
      this.params.endDate = date[1];
    } else {
      this.params.opDate = date;
    }
  }

  dimChange(dim: any) {
    this.params.dimDate = dim;
  }

  getDayNum() {
    let startDate = moment();
    let endDate = moment();
    if (this.params.dimDate === '1' || this.params.dimDate === 1) {
      if (this.params.startDate && this.params.endDate) {
        startDate = moment(this.params.startDate, 'YYYY-MM-DD');
        endDate = moment(this.params.endDate, 'YYYY-MM-DD');
      } else {
        startDate = moment(moment().format('YYYY-MM') + '-01', 'YYYY-MM-DD');
      }
    } else {
      if (this.params.opDate) {
        startDate = moment(this.params.opDate + '01', 'YYYY-MM-DD');
      } else {
        startDate = moment(moment().format('YYYY-MM') + '-01', 'YYYY-MM-DD');
      }
    }
    return endDate.diff(startDate, 'days') + 1;
  }

  getBalance(day: number) {
    return day * 30;
  }

  calcBalance() {
    this.dayNum = this.getDayNum();
    this.balance = this.getBalance(this.dayNum);
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