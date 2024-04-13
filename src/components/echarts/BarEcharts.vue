<template>
  <div id="barEcharts">
  </div>
</template>

<script lang="ts">
import { barOption } from '@/components/echarts/data';
import * as echarts from 'echarts';
import { StaticUtils } from '@/utils/StaticUtils';
import { Vue, Options, Prop, Watch } from 'vue-property-decorator';

@Options({})
export default class BarEcharts extends Vue {
  myEcharts: any = undefined;
  option: any = barOption;

  @Prop({
    type: Object,
    default: {
      xAxis: [],
      data: []
    }})
  barData!: any;

  mounted() {
    this.initEcharts();
    this.setOption();
  }

  initEcharts() {
    if (StaticUtils.isEmpty(this.myEcharts)) {
      this.myEcharts = echarts.init((document.getElementById('barEcharts') as any));
    }
  }

  @Watch('barData', { deep: true })
  setOption() {
    this.option.title[0].text = this.barData.title;
    this.option.xAxis[0].data = this.barData.xAxis;
    this.option.series = [];
    for (let i = 0; i < this.barData.dataList.length; i++) {
      this.option.series.push({
        type: 'bar',
        showSymbol: false,
        data: this.barData.dataList[i]
      })
    }
    this.initEcharts();
    this.myEcharts.setOption(this.option);
  }
}
</script>

<style scoped lang="less">
#barEcharts {
  height: 100%;
  width: 100%;
}
</style>