<template>
  <div id="lineEcharts">
  </div>
</template>

<script lang="ts">
import { lineOption } from '@/components/echarts/data';
import * as echarts from 'echarts';
import { StaticUtils } from '@/util/StaticUtils';
import { Vue, Options, Prop, Watch } from 'vue-property-decorator';

@Options({})
export default class LineEcharts extends Vue {
  myEcharts: any = undefined;
  option: any = lineOption;

  @Prop({
    type: Object,
    default: {
      xAxis: [],
      data: []
    }})
  lineData!: any;

  mounted() {
    this.initEcharts();
    this.setOption();
  }

  initEcharts() {
    if (StaticUtils.isEmpty(this.myEcharts)) {
      this.myEcharts = echarts.init((document.getElementById('lineEcharts') as any));
    }
  }

  @Watch('lineData', { deep: true })
  setOption() {
    this.option.title[0].text = this.lineData.title;
    this.option.xAxis[0].data = this.lineData.xAxis;
    this.option.series = [];
    for (let i = 0; i < this.lineData.dataList.length; i++) {
      this.option.series.push({
        type: 'line',
        showSymbol: false,
        data: this.lineData.dataList[i]
      })
    }
    this.initEcharts();
    this.myEcharts.setOption(this.option);
  }
}
</script>

<style scoped lang="less">
#lineEcharts {
  height: 100%;
  width: 100%;
}
</style>