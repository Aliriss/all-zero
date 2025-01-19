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
      <div class="line">
        <chart :option="option"></chart>
        <!--折线图-->
        <!--<line-echarts v-if="params.chartType === 'line'" :line-data="lineData" />-->
        <!--&lt;!&ndash;柱状图&ndash;&gt;-->
        <!--<bar-echarts v-if="params.chartType === 'bar'" :bar-data="barData" />-->
        <!--&lt;!&ndash;饼图&ndash;&gt;-->
        <!--<bar-echarts v-if="params.chartType === 'pie'" :pie-data="pieData" />-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { billApi } from '@/api';
import Date from '@/components/date/Date.vue';
import Chart from '@/components/echarts/chart.vue';
import { barOption, lineOption } from '@/components/echarts/data';
import LineEcharts from '@/components/echarts/LineEcharts.vue';
import BarEcharts from '@/components/echarts/BarEcharts.vue';
import PieEcharts from '@/components/echarts/PieEcharts.vue';
import { chartList } from '@/view/analysis/bill/data/Data';
import Search from './component/TrendSearch.vue';
import DetailPage from '@/view/analysis/bill/component/DetailPage.vue';
import moment from 'moment/moment';
import { Options, Vue } from 'vue-property-decorator';

@Options({
  name: 'Summary',
  components: {Chart, LineEcharts, BarEcharts, PieEcharts, Search, Date, DetailPage}
})
export default class Summary extends Vue {
  params: any = {
    dimDate: '3',
    opDate: moment().format('YYYY-MM'),
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    type: undefined,
    userId: undefined,
    invalidFlag: 0, // 作废标识：1：作废，0：未作废
    chartType: 'line',
    typeId: '0'
  }

  option: any = {};


  mounted() {
    this.query();
  }

  reset() {
    this.params = {
      dimDate: '3',
      opDate: moment().format('YYYY-MM'),
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      type: undefined,
      userId: undefined,
      invalidFlag: undefined, // 0：作废，1：启用
      chartType: 'line'
    }
  }

  async query() {
    switch(this.params.chartType) {
      case 'line':
        await this.createLine();
        break;
      case 'bar':
        await this.createBar();
        break;
      case 'pie':
        await this.createLine();
        break;
      default:
    }
  }

  /**
   * 折线图
   *
   * @returns {Promise<void>}
   */
  async createLine(): Promise<void> {
    try {
      const { data } = await billApi.getBillLine(this.params);
      // 折线图
      this.option = lineOption;
      // this.option.title[0].text = data.title;
      this.option.title[0].text = await this.getTitle(this.params.typeId) + ' · ' + this.getChartType(this.params.chartType);
      this.option.xAxis[0].data = data.xAxis;
      this.option.series = [];
      for (let i = 0; i < data.dataList.length; i++) {
        this.option.series.push({
          type: 'line',
          showSymbol: false,
          data: data.dataList[i]
        })
      }
    } catch(e) {
      console.log(e)
    }
  }

  /**
   * 柱状图
   *
   * @returns {Promise<void>}
   */
  async createBar(): Promise<void> {
    try {
      const { data } = await billApi.getBillLine(this.params);
      // 折线图
      this.option = barOption;
      // this.option.title[0].text = data.title;
      this.option.title[0].text = await this.getTitle(this.params.typeId) + ' · ' + this.getChartType(this.params.chartType);
      this.option.xAxis[0].data = data.xAxis;
      this.option.series = [];
      for (let i = 0; i < data.dataList.length; i++) {
        this.option.series.push({
          type: 'bar',
          showSymbol: false,
          data: data.dataList[i]
        })
      }
    } catch(e) {
      console.log(e)
    }
  }

  /**
   * 获取类型名称，待优化
   * @param typeId
   * @returns {Promise<any>}
   */
  async getTitle(typeId: any): Promise<any> {
    try{
      const { data } = await billApi.getTypeList({});
      for (const i of data) {
        if (typeId.toString() === i.id.toString()) {
          return i.name;
        }
      }
      return typeId;
    } catch(e) {
      console.log(e);
      return '';
    }
  }

  getChartType(id: any) {
    for (const i of chartList) {
      if (i.id === id) {
        return i.name;
      }
    }
    return '';
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
      // width: 150px;
      height: 800px;
      background-color: white;
      text-align: center;
      padding-top: 20px;
    }
    .summary {
      margin-bottom: 10px;
      display: flex;
      .summary-info {
        width: 15%;
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