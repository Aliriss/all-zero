<template>
  <div id="chart"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { StaticUtils } from '@/utils/StaticUtils';
import { Vue, Options, Prop, Watch } from 'vue-property-decorator';

@Options({})
export default class PieEcharts extends Vue {
  /**
   * echarts
   * @type {any}
   */
  myEcharts: any = undefined;

  /**
   * 图表option
   * @type {any}
   */
  @Prop({
    type: Object,
    default: {}})
  option!: any;


  mounted() {
    this.setOption();
  }

  initEcharts() {
    this.myEcharts = echarts.init((document.getElementById('chart') as any));
  }

  @Watch('option', { deep: true })
  setOption() {
    if (StaticUtils.isEmpty(this.myEcharts)) {
      this.initEcharts();
    }
    this.myEcharts.setOption(this.option);
  }
}
</script>

<style scoped lang="less">
#chart {
  height: 100%;
  width: 100%;
}
</style>