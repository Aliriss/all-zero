<template>
  <div id="lineEcharts">
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { StaticUtils } from '@/util/StaticUtils';
import { Vue, Options, Prop } from 'vue-property-decorator';

@Options({})
export default class LineEcharts extends Vue {
  myEcharts: any = undefined;
  option: any = {
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }
    ],
    title: [
      {
        left: 'center',
        text: 'Gradient along the y axis'
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: []
      }
    ],
    yAxis: [
      {}
    ],
    grid: [
      {
        bottom: '60%'
      }
    ],
    series: [
      {

      }
    ]
  };

  @Prop({
    type: Object,
    default: {
      xAxis: [],
      dataList: []
    }})
  lineData!: object;

  mounted() {
    this.initEcharts();
    this.setOption();
  }


  initEcharts() {
    if (StaticUtils.isEmpty(this.myEcharts)) {
      this.myEcharts = echarts.init((document.getElementById('lineEcharts') as any));
    }
  }

  setOption() {
    this.option.xAxis[0].data = this.lineData.xAxis;
    for (let i = 0; i < this.lineData.dataList.length; i++) {
      this.option.series.push({
        type: 'line',
        showSymbol: false,
        data: this.lineData.dataList[i]
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>