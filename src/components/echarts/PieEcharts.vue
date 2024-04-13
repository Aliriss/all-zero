<template>
  <div id="pieEcharts">
  </div>
</template>

<script lang="ts">
import { pieOption } from '@/components/echarts/data';
import * as echarts from 'echarts';
import { StaticUtils } from '@/utils/StaticUtils';
import { Vue, Options, Prop, Watch } from 'vue-property-decorator';

@Options({})
export default class PieEcharts extends Vue {
  myEcharts: any = undefined;
  option: any = pieOption;

  @Prop({
    type: Object,
    default: {
      xAxis: [],
      data: []
    }})
  pieData!: any;

  mounted() {
    this.initEcharts();
    this.setOption();
  }

  initEcharts() {
    if (StaticUtils.isEmpty(this.myEcharts)) {
      this.myEcharts = echarts.init((document.getElementById('pieEcharts') as any));
    }
  }

  @Watch('pieData', { deep: true })
  setOption() {
    this.option.title[0].text = this.pieData.title;
    this.option.xAxis[0].data = this.pieData.xAxis;
    this.option.series = [];
    for (let i = 0; i < this.pieData.dataList.length; i++) {
      this.option.series.push({
        type: 'pie',
        showSymbol: false,
        data: this.pieData.dataList[i]
      })
    }
    this.initEcharts();
    console.log(this.pieData.dataList)
    this.myEcharts.setOption(this.option);
  }
}
</script>

<style scoped lang="less">
#pieEcharts {
  height: 100%;
  width: 100%;
}
</style>