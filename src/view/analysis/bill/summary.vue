<template>
  <div class="container">
    <div class="search">
      <Search
          :params="params"
          :dimDateList="['1', '3']"
          :query="query"
          :reset="reset" />
    </div>
    <div class="content">
      <div class="line">TODO line content</div>
      <div class="summary">
        <span class="summary-info">总收入：<span class="value">{{ summary.income || 0 }}</span>元</span>
        <span class="summary-info">总支出：<span class="value-danger">{{ summary.outcome || 0 }}</span>元</span>
      </div>
      <a-table
          :columns="columns"
          :data-source="dataSource"
          row-key="id"
      >
        <template #bodyCell="{column, record}">
          <template v-if="column.key === 'operation'">
            <a style="margin-left: 20px;user-select: none" @click="toDetail(record)">详情</a>
          </template>
        </template>
      </a-table>
    </div>
    <!--弹框-->
    <a-modal
        :title="detailModal.title"
        :visible="detailModal.visible"
        :footer="null"
        :destroy-on-close="true"
        :centered="true"
        width="80%"
        :dialog-style="{'margin-left': '15%'}"
        :body-style="{'width': '100%'}"
        @cancel="closeDetailModal"
    >
      <detail-page :default-params="detailModal.params" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { billApi } from '@/api';
import Date from '@/components/date/Date.vue';
import Search from '@/components/search/Search.vue';
import DetailPage from '@/view/analysis/bill/component/DetailPage.vue';
import moment from 'moment/moment';
import { Options, Vue, Watch } from 'vue-property-decorator';

@Options({
  name: 'Summary',
  components: {Search, Date, DetailPage}
})
export default class Summary extends Vue {
  columns: any = [
    {
      title: '消费类型',
      dataIndex: 'typeName',
      key: 'typeName'
    },
    {
      title: '消费金额',
      dataIndex: 'charge',
      key: 'charge',
      sorter: (a: any, b: any) => a.charge - b.charge
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      scopedSlots: {customRender: 'operation'}
    }
  ];
  dataSource: any = [];
  params: any = {
    dimDate: '3',
    opDate: moment().format('YYYY-MM'),
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    type: undefined,
    userId: undefined,
    invalidFlag: 1 // 0：作废，1：启用
  }
  summary: any = {
    income: 0,
    outcome: 0
  };

  detailModal: any = {
    visible: false,
    title: undefined,
    params: this.params
  }

  mounted() {
    this.query();
    this.querySum();
  }

  reset() {
    this.params = {
      dimDate: '3',
      opDate: moment().format('YYYY-MM'),
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      type: undefined,
      userId: undefined,
      invalidFlag: undefined // 0：作废，1：启用
    }
  }

  async query() {
    const { data } = await billApi.getSummaryList(this.params);
    this.dataSource = data;
  }

  async querySum() {
    const { data } = await billApi.getSum(this.params);
    this.summary = data[0];
  }

  /**
   * 打开详情弹框
   * @param record
   */
  toDetail(record: any) {
    console.log('toDetail: ', record)
    this.detailModal.params.typeId = record.typeId;
    // typeId, typeName
    this.detailModal.title = record.typeName + '类型账单详情'
    this.detailModal.visible = true;
  }

  /**
   * 关闭弹框
   */
  closeDetailModal() {
    this.detailModal.visible = false;
  }
}
</script>

<style scoped lang="less">
.container{
  position: relative;
  width: 100%;
  height: 100%;
  .search{
    width: 100%;
    // padding: 5px 0;
    // background-color: white;
    text-align: center;
    margin: 10px 0;
  }
  .content{
    .line{
      width: 100%;
      height: 100px;
      background-color: white;
      text-align: center;
    }
    .summary {
      margin-bottom: 10px;
      display: flex;
      .summary-info {
        // width: 10%;
        font-size: 14px;
        font-weight: bold;
        white-space: nowrap;
        .value {
          font-size: 16px;
          color: green;
        }
        .value-danger {
          font-size: 16px;
          color: red;
        }
      }
      .summary-info:nth-child(2) {
        margin-left: 5px;
      }
    }
  }
}

.body-style{}
</style>