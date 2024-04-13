<template>
  <div ref="map" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { StaticUtils } from '@/utils/StaticUtils';
import { Vue, Options } from 'vue-property-decorator';
import * as echarts from 'echarts';
import mapData from '@/view/mapData/济南市.json';

@Options({})
export default class Map extends Vue {
    option: any = {
      title: {
        left: 'center',
        text: 'map',
      },
      backgroundColor: '#ffffff',
      tooltip: {
        trigger: 'item',
        formatter: function(value: any, row: any, index: any) {
          if (isNaN(value.value)) {
            return value.name + '<br/>' + '0 (人)';
          } else {
            return value.name + '<br/>' + value.value + ' (人)';
          }
        },
      },
      geo: {
        type: 'map',
        map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致
        roam: false, // 设置允许缩放以及拖动的效果
        label: {
          show: true, // 展示标签
        },
        zoom: 1, // 设置初始化的缩放比例
      },
      series: [
        {
          data: [{
            name: '讷河市',
            value: 0
          }],
          geoIndex: 0,
          type: 'map',
        },
      ],
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'top',
        feature: {
          saveAsImage: { show: true }
        },
      },
      // visualMap: {
      //   show: true,
      //   min: this.minValue,
      //   max: this.maxValue,
      //   text: ['High', 'Low'],
      //   realtime: false,
      //   calculable: true,
      //   inRange: {
      //     color: ['#7CA6DA', '#1AAB59', '#4BA72A', '#E9F405', '#F05504', '#DF0029']
      //     // color: ['lightskyblue', 'yellow', 'orangered'],
      //   },
      // },
    }

    myEcharts: any = undefined;

    mounted() {
      this.setOption();
    }

    initEcharts() {
      this.myEcharts = echarts.init((this.$refs.map as any));
    }

    setOption() {
      if(StaticUtils.isEmpty(this.myEcharts)) {
        this.initEcharts();
      }
      echarts.registerMap('chinaMap', mapData);
      this.myEcharts.setOption(this.option);
    }
}
</script>

<style scoped lang="less">

</style>