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
              :dim-date="['1', '3']"
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
              <a-tooltip :title="item.description">{{ item.name }}</a-tooltip>
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
      <!--<span style="margin-left: 20px">收入：<span :style="{'font-size': '16px', 'color': 'green'}">{{ sumData.income || 0 }}</span>元</span>-->
      <span style="margin-left: 20px">
        <a-tooltip title="总支出">
          支出：<span :style="{'font-size': '16px', 'color': 'green'}">{{ sumData.outcome || 0 }}</span>元
        </a-tooltip>
      </span>
      <span style="margin-left: 20px">
        <a-tooltip>
          <template #title>
            <p>共计{{ dayNum }}天，消费限额：{{ limit }}元</p>
            <p>超额: <span :style="{'color': sumData.eatOutcome > limit ? 'red' : 'green'}">{{ sumData.eatOutcome > limit ? Number(sumData.eatOutcome - limit).toFixed(2) : 0 }}</span>元</p>
            <p>余额: <span style="color: green">{{ sumData.eatOutcome < limit ? Number(limit - sumData.eatOutcome).toFixed(2) : 0 }}</span>元</p>
            <span style="font-size: 12px">注：每天消费限额：<span style="color: dodgerblue">30</span>元</span>
          </template>
          饮食支出：<span :style="{'font-size': '16px', 'color': sumData.eatOutcome > limit ? 'red' : 'green'}">{{ sumData.eatOutcome || 0 }}</span>元
        </a-tooltip>
      </span>
      <span style="margin-left: 20px">
        <a-tooltip>
          <!--<template #title>-->
          <!--  <p>共消费{{ dayNum }}天，消费限额：{{ limit }}元</p>-->
          <!--  <p>超额: <span :style="{'color': sumData.outcome > limit ? 'red' : 'green'}">{{ sumData.outcome > limit ? Number(sumData.outcome - limit).toFixed(2) : 0 }}</span>元</p>-->
          <!--  <p>余额: <span style="color: green">{{ sumData.outcome < limit ? Number(limit - sumData.outcome).toFixed(2) : 0 }}</span>元</p>-->
          <!--  <span style="font-size: 12px">注：每天消费限额：<span style="color: dodgerblue">30</span>元</span>-->
          <!--</template>-->
          生活支出：<span :style="{'font-size': '16px', 'color': 'green'}">{{ sumData.liveOutcome || 0 }}</span>元
        </a-tooltip>
      </span>
      <span style="margin-left: 20px">
        <a-tooltip>
          <!--<template #title>-->
          <!--  <p>共消费{{ dayNum }}天，消费限额：{{ limit }}元</p>-->
          <!--  <p>超额: <span :style="{'color': sumData.outcome > limit ? 'red' : 'green'}">{{ sumData.outcome > limit ? Number(sumData.outcome - limit).toFixed(2) : 0 }}</span>元</p>-->
          <!--  <p>余额: <span style="color: green">{{ sumData.outcome < limit ? Number(limit - sumData.outcome).toFixed(2) : 0 }}</span>元</p>-->
          <!--  <span style="font-size: 12px">注：每天消费限额：<span style="color: dodgerblue">30</span>元</span>-->
          <!--</template>-->
          旅游支出：<span :style="{'font-size': '16px', 'color': 'green'}">{{ sumData.travelOutcome || 0 }}</span>元
        </a-tooltip>
      </span>
      <span style="margin-left: 20px">
        <a-tooltip>
          <!--<template #title>-->
          <!--  <p>共消费{{ dayNum }}天，消费限额：{{ limit }}元</p>-->
          <!--  <p>超额: <span :style="{'color': sumData.outcome > limit ? 'red' : 'green'}">{{ sumData.outcome > limit ? Number(sumData.outcome - limit).toFixed(2) : 0 }}</span>元</p>-->
          <!--  <p>余额: <span style="color: green">{{ sumData.outcome < limit ? Number(limit - sumData.outcome).toFixed(2) : 0 }}</span>元</p>-->
          <!--  <span style="font-size: 12px">注：每天消费限额：<span style="color: dodgerblue">30</span>元</span>-->
          <!--</template>-->
          交通支出：<span :style="{'font-size': '16px', 'color': 'green'}">{{ sumData.walkOutcome || 0 }}</span>元
        </a-tooltip>
      </span>
      <span style="margin-left: 20px">
        <a-tooltip>
          <!--<template #title>-->
          <!--  <p>共消费{{ dayNum }}天，消费限额：{{ limit }}元</p>-->
          <!--  <p>超额: <span :style="{'color': sumData.outcome > limit ? 'red' : 'green'}">{{ sumData.outcome > limit ? Number(sumData.outcome - limit).toFixed(2) : 0 }}</span>元</p>-->
          <!--  <p>余额: <span style="color: green">{{ sumData.outcome < limit ? Number(limit - sumData.outcome).toFixed(2) : 0 }}</span>元</p>-->
          <!--  <span style="font-size: 12px">注：每天消费限额：<span style="color: dodgerblue">30</span>元</span>-->
          <!--</template>-->
          社交支出：<span :style="{'font-size': '16px', 'color': 'green'}">{{ sumData.socialSpending || 0 }}</span>元
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
              <a style="user-select: none" @click="enable(record)">启用</a>
              <a style="margin-left: 20px;user-select: none" @click="edit(record)">编辑</a>
              <br />
              <a-popconfirm
                  title="确认要删除?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="deleteBill(record)"
              >
                <a style="user-select: none">删除</a>
              </a-popconfirm>
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
    <a-modal
        title="编辑"
        :visible="editModal.visible"
        width="60%"
        style="top: 30px"
        :confirm-loading="addModalData.confirmLoading"
        destroyOnClose
        @ok="editOk"
        @cancel="closeEditModal"
    >
      <EditPage ref="editPage" :user="user" :type-list="type" :form-data="editModal.data" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { billApi, userApi } from '@/api';
import { StaticUtils } from '@/util/StaticUtils';
import AddPage from '@/view/analysis/bill/component/AddPage.vue';
import Date from '@/components/date/Date.vue';
import EditPage from '@/view/analysis/bill/component/EditPage.vue';
import { billColumns } from '@/view/analysis/bill/data/Data';
import { message } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';
import { Options, Vue } from 'vue-property-decorator';
@Options({
  name: 'Bill',
  components: {EditPage, Date, AddPage},
  computed: {
  }
})
export default class Bill extends Vue {
  columns: any = billColumns; // 展示账单的表头
  dataSource: any = []; // 账单列表数据
  type: any = []; // 消费类型
  user: any = []; // 用户
  locale = locale;
  sumData: any = {}; // 合计数据
  dayNum = 0; // 所选天数
  limit = 20; // 限额
  // 参数
  params: any = {
    dimDate: '3',
    opDate: moment().format('YYYY-MM'),
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    type: undefined,
    userId: undefined,
    invalidFlag: 1 // 0：作废，1：启用
  }

  // 添加账单对话框所用到的数据
  addModalData: any = {
    visible: false,
    confirmLoading: false
  }

  editModal: any = {
    visible: false,
    confirmLoading: false
  }

  mounted() {
    this.query();
    this.getUser();
    this.getType();
  }

  /**
   * 查询数据，包括账单列表，合计，计算合计
   */
  query() {
    this.getBillList();
    this.getSum();
    // this.getDayNum();
    this.calLimit();
  }

  /**
   * 参数重置
   */
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
  enable(record: any) {
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

  /**
   * 查询用户
   * @returns {Promise<void>}
   */
  async getUser(): Promise<void> {
    const { data } = await userApi.getUserList({enable: 1});
    this.user = data;
  }

  /**
   * 查询消费类型
   * @returns {Promise<void>}
   */
  async getType(): Promise<void> {
    const { data } = await billApi.getTypeList({});
    this.type = data;
  }

  /**
   * 查询账单列表
   * @returns {Promise<void>}
   */
  async getBillList(): Promise<void> {
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

  /**
   * 消费类型改变
   * @param id 类型id
   * @param option 选项
   */
  changeType(id: any, option: any) {
    if (StaticUtils.isNotEmpty(option)) {
      this.params.typeName = option.label
    } else {
      this.params.typeName = undefined;
    }
  }

  /**
   * 用户发生改变
   * @param id 用户id
   * @param option 选项
   */
  changeUser(id: any, option: any) {
    if (StaticUtils.isNotEmpty(option)) {
      this.params.userName = option.label
    }else {
      this.params.userName = undefined;
    }
  }

  /**
   * 日期发生变化
   * @param date 日期：[]或''
   */
  dateChange(date: any) {
    if (this.params.dimDate === '1' || this.params.dimDate === 1 || this.params.dimDate === 'date') {
      this.params.startDate = date[0];
      this.params.endDate = date[1];
    } else {
      this.params.opDate = date;
    }
  }

  /**
   * 时间粒度改变
   * @param dim 时间粒度
   */
  dimChange(dim: any) {
    if(dim === '1') {
      // date
      this.params.startDate = moment().format('YYYY-MM-DD');
      this.params.endDate = moment().format('YYYY-MM-DD');
    } else if (dim === '3') {
      // month
      this.params.opDate = moment().format('YYYY-MM');
    }
    this.params.dimDate = dim;
  }

  /**
   * 计算所选天数，用以计算总限额
   */
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

  getLimit(day: number) {
    return day * 30;
  }

  calLimit() {
    this.dayNum = this.getDayNum();
    this.limit = this.getLimit(this.dayNum);
  }

  /**
   * 编辑某一条数据
   * @param record record
   */
  edit(record: any) {
    this.editModal.data = record;
    this.editModal.visible = true;
  }

  /**
   * 编辑弹框确认
   */
  editOk() {
    (this.$refs.editPage as any).save();
    this.closeEditModal();
  }

  /**
   * 关闭编辑弹窗
   */
  closeEditModal() {
    this.editModal.visible = false;
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