// export function buildOption(context, eChartData, chartOption, echarts) {
function buildOption(context, eChartData, chartOption, echarts) {
  // 输出测试
  console.log('context: ', context)
  console.log('echartData: ', eChartData, eChartData.option)
  console.log('chartOption: ', chartOption)
  console.log('echarts: ', echarts)
  console.log('x: ', chartOption.xAxis)
  console.log('y: ', chartOption.yAxis)

  // 图的数据
  let chartData = {
    // x轴数据
    xAxisData: [],
    // x轴名称，废弃
    xAxisNameData: [],
    // 高程信息（用地势命名了）
    terrain: {
      // 废弃
      xAxis: [],
      data: []
    },
    // 水位
    waterLevelData: [],
    // 水位 + 高程
    waterLevelData2: [],
    // 梯级数据，也就是水位 + 高程数据，但在开头加了空数据，保证标注在水位右侧
    stepData: [],
    // 梯级标签，显示地名，暂时不知道怎么获取，写死了
    stepLabels: []
  }
  // 里程
  chartData.xAxisData = [...chartOption.xAxis.data]
  // const constD = ['南宁市', '青秀区', '横县', '贵港市', '桂平市', '长洲区']
  // let idx = 0;
  // chartData.xAxisData = chartData.xAxisData.map(v => v + ' ' + constD[idx++ % constD.length])
  chartData.xAxisData.unshift('')
  chartData.xAxisData.push('')
  // 高程
  let i = 0
  chartOption.series[0].data.forEach(v => {
    chartData.terrain.xAxis.push(i++)
    chartData.terrain.data.push(v.value)
  })

  // 水位
  chartOption.series[2].data.forEach(v => {
    chartData.waterLevelData.push(Number(v.value).toFixed(2))
    chartData.waterLevelData2.push(v.value)
  })

  // 水位 + 地势
  for (let j = 0; j < chartData.waterLevelData2.length; j++) {
    chartData.waterLevelData2[j] = Number(Number(chartData.waterLevelData2[j]) + Number(chartData.terrain.data[j])).toFixed(2);
  }
  // 高程数据最后添加一位0作结束
  chartData.terrain.data.push(0)
  chartData.terrain.data.unshift(chartData.terrain.data[0])
  // 水位加空数据，用于结束
  chartData.waterLevelData.push('')
  chartData.waterLevelData2.push('')
  // 梯级数据来源于水位，用于标注，添加一个空数据保证标注正常
  chartData.stepData = [...chartData.waterLevelData]
  // chartData.stepData.unshift(null)
  // 以下是写死的数据，因为不知道怎么获取
  // chartData.xAxisNameData = ['', '南宁市', '青秀区', '横县', '贵港市', '桂平市', '长洲区', '']
  chartData.stepLabels = [ '', '老口', '邕宁', '西津', '贵港', '桂平', '长洲']

  // x轴前后加空数据
  // waterLevel 加一个空数据
  // 梯级名称前加null数据
  // 梯级名称前加空数据
  // 数据示例
  // let chartData = {
  //   title: '西江干线梯级枢纽规划图',
  //   // x轴
  //   xAxisData: ['', 600, 500, 400, 300, 200, 100,  ''],
  //   xAxisNameData: ['', '南宁市', '青秀区', '横县', '贵港市', '桂平市', '长洲区', ''],
  //   // 高程
  //   terrain: {
  //     xAxis: [1,2,3,4,5,6, 0, 0],
  //     data: [90, 60, 55, 50, 40, 20, 5, 0]
  //   },
  //   // 水位、红色大坝线、水位数字标注
  //   waterLevelData: [75.5, 67, 63, 43.1, 29.6, 20.6, ''],
  //   // 梯级名称标注数据
  //   stepData: [null, 75.5, 67, 63, 43.1, 29.6, 20.6],
  //   // 梯级名称标注文字
  //   stepLabels: [ '', '老口', '邕宁', '西津', '贵港', '桂平', '长洲'],
  // };
  // chartOption = {
  //   grid: {
  //     left: '10%',
  //     right: '10%',
  //     top: '10%',
  //     bottom: '20%',
  //   },
  //   // 待修改
  //   // graphic: [
  //   //   {
  //   //     type: 'text',
  //   //     left: 'right',
  //   //     bottom: '16%',
  //   //     style: {
  //   //       text: '距离梧州市里程(km)',
  //   //       fill: 'rgb(100, 104, 113)', // 字体颜色
  //   //       font: '10px sans-serif'
  //   //     }
  //   //   }
  //   // ],
  //   // xAxis: [
  //     // {
  //     //   type: 'category',
  //     //   boundaryGap: false,
  //     //   data: chartData.xAxisData,
  //     //   // name: '距离梧州市里程(km)',
  //     //   // nameLocation: 'end',
  //     //   axisLabel: {
  //     //     fontSize: 14,
  //     //     interval: 'auto',
  //     //     formatter: function (value) {
  //     //       return value.split(' ').join('\n'); // 按空格换行
  //     //     },
  //     //   },
  //     //   axisLine: {
  //     //     // symbol: ['none', 'arrow'],
  //     //     // symbolOffset: [0, 40]
  //     //   },
  //     // },
  //     // 地势x轴, 没用到
  //     // {
  //     //   type: 'category',
  //     //   boundaryGap: false,
  //     //   data: chartData.terrain.xAxis,
  //     //   show: false,
  //     // },
  //     // {
  //     //   type: 'category',
  //     //   boundaryGap: false,
  //     //   data: chartData.xAxisNameData,
  //     //   axisLabel: {
  //     //     fontSize: 14,
  //     //     margin: 26,
  //     //     interval: 'auto',
  //     //     formatter: function (value) {
  //     //       return value.split(' ').join('\n'); // 按空格换行
  //     //     },
  //     //   },
  //     //   axisLine: {
  //     //     onZero: true,
  //     //   },
  //     //   position: 'bottom',
  //     //   alignTicks: true,
  //     //   axisTick: {
  //     //     show: false,
  //     //
  //     //   },
  //     //   xAxisIndex: 0,
  //     //   nameRotate: 90
  //     // },
  //
  //   // ],
  //   yAxis: {
  //     type: 'value',
  //     name: '高程(m)',
  //     // min: 0,
  //     // max: 90,
  //     // interval: 10,
  //     axisLabel: {fontSize: 14}
  //   },
  //   // series: [
  //   //   // 1. 地势折线
  //   //   {
  //   //     name: '地势',
  //   //     type: 'line',
  //   //     // xAxisIndex: 2,
  //   //     // data: chartData.terrainData,
  //   //     data: chartData.terrain.data,
  //   //     lineStyle: {
  //   //       color: '#222',
  //   //       width: 2
  //   //     },
  //   //     areaStyle: {
  //   //       // color: 'gray',
  //   //       color: 'rgb(6, 27, 44)',
  //   //       // color: 'black',
  //   //       opacity: 1
  //   //     },
  //   //     symbol: 'none',
  //   //     z: 15
  //   //   },
  //   //   // 2. 台阶状水位（蓝色填充）
  //   //   {
  //   //     name: '水位',
  //   //     type: 'line',
  //   //     step: 'end',
  //   //     data: chartData.waterLevelData2,
  //   //     lineStyle: {
  //   //       color: '#2a99c9',
  //   //       width: 2
  //   //     },
  //   //     areaStyle: {
  //   //       color: 'rgba(7, 184, 207,0.7)'
  //   //     },
  //   //     symbol: 'none',
  //   //     z: 5
  //   //   },
  //   //   // 3. 红色大坝竖线
  //   //   {
  //   //     type: 'custom',
  //   //     renderItem: function (params, api) {
  //   //       const waterLevels = chartData.waterLevelData2;
  //   //       const terrainData = chartData.terrain.data;
  //   //       const lines = [];
  //   //       for (let i = 1; i < waterLevels.length; i++) {
  //   //         lines.push({
  //   //           type: 'line',
  //   //           shape: {
  //   //             x1: api.coord([i, waterLevels[i - 1]])[0],
  //   //             y1: api.coord([i, waterLevels[i - 1]])[1] - 10,
  //   //             x2: api.coord([i, waterLevels[i]])[0],
  //   //             y2: api.coord([i, terrainData[i]])[1]
  //   //           },
  //   //           style: {
  //   //             stroke: 'red',
  //   //             lineWidth: 2
  //   //           }
  //   //         });
  //   //       }
  //   //       return {
  //   //         type: 'group',
  //   //         children: lines
  //   //       };
  //   //     },
  //   //     z: 10,
  //   //     data: [0]
  //   //   },
  //   //   // 4. 水位▽数字标注
  //   //   {
  //   //     type: 'scatter',
  //   //     data: chartData.waterLevelData2,
  //   //     symbolSize: 1,
  //   //     label: {
  //   //       show: true,
  //   //       position: 'right',
  //   //       formatter: function (params) {
  //   //         // if (params.dataIndex === 0 || params.dataIndex === chartData.waterLevelData.length - 1) return '';
  //   //         return '▽' + chartData.waterLevelData[params.dataIndex];
  //   //       },
  //   //       color: 'white',
  //   //       fontSize: 14,
  //   //       fontWeight: 'bold',
  //   //       padding: [0, 0, 10, 5]
  //   //     },
  //   //     itemStyle: {
  //   //       color: 'transparent'
  //   //     },
  //   //     z: 20
  //   //   },
  //   //   // 5. 梯级名称标注，横坐标已经显示了，这里不需要标注
  //   //   {
  //   //     // type: 'scatter',
  //   //     // data: chartData.stepData,
  //   //     // symbolSize: 1,
  //   //     // label: {
  //   //     //   show: true,
  //   //     //   position: 'top',
  //   //     //   offset: [-20, -20],
  //   //     //   formatter: function (params) {
  //   //     //     const labels = chartData.stepLabels;
  //   //     //     console.log('labels: ', labels[params.dataIndex])
  //   //     //     return labels[params.dataIndex];
  //   //     //   },
  //   //     //   color: 'white',
  //   //     //   fontSize: 12,
  //   //     //   // fontWeight: 'bold'
  //   //     // },
  //   //     // itemStyle: {
  //   //     //   color: 'transparent'
  //   //     // },
  //   //     // z: 20
  //   //
  //   //     // type: 'scatter',
  //   //     // data: chartData.waterLevelData.map((v, i) => i === 0 || i === 7 ? null : v + 12), // 2为上移高度
  //   //     // symbolSize: 1,
  //   //     // label: {
  //   //     //   show: true,
  //   //     //   position: 'top',
  //   //     //   formatter: function (params) {
  //   //     //     const labels = chartData.stepLabels;
  //   //     //     return labels[params.dataIndex];
  //   //     //   },
  //   //     //   color: 'white',
  //   //     //   fontSize: 14,
  //   //     //   fontWeight: 'bold'
  //   //     // },
  //   //     // itemStyle: {
  //   //     //   color: 'transparent'
  //   //     // },
  //   //     // z: 20
  //   //   }
  //   // ],
  //   // dataZoom: [
  //   //   {
  //   //     type: 'slider',
  //   //     xAxisIndex: 0,
  //   //     start: 0,
  //   //     end: 24,
  //   //     height: 14,
  //   //     borderColor: 'transparent',
  //   //     backgroundColor: 'transparent',
  //   //     fillerColor: 'rgba(156, 206, 255, 0.5)',
  //   //   },
  //   // ],
  // };
  chartOption.xAxis.axisLabel = {
    fontSize: 14,
    interval: 'auto',
    formatter: function (value) {
      return value.split(' ').join('\n'); // 按空格换行
    },
  }
  chartOption.xAxis.boundaryGap = false;
  chartOption.xAxis.type = 'category'
  chartOption.xAxis.data = chartData.xAxisData
  chartOption.series = [
    // 1. 地势折线
    {
      name: '地势',
      type: 'line',
      // xAxisIndex: 2,
      // data: chartData.terrainData,
      data: chartData.terrain.data,
      lineStyle: {
        color: '#222',
        width: 2
      },
      areaStyle: {
        // color: 'gray',
        color: 'rgb(6, 27, 44)',
        // color: 'black',
        opacity: 1
      },
      symbol: 'none',
      z: 15
    },
    // 2. 台阶状水位（蓝色填充）
    {
      name: '水位',
      type: 'line',
      step: 'end',
      data: chartData.waterLevelData2,
      lineStyle: {
        color: '#2a99c9',
        width: 2
      },
      areaStyle: {
        color: 'rgba(7, 184, 207,0.7)'
      },
      symbol: 'none',
      z: 5
    },
    // 3. 红色大坝竖线
    {
      type: 'custom',
      renderItem: function (params, api) {
        const waterLevels = chartData.waterLevelData2;
        const terrainData = chartData.terrain.data;
        const lines = [];
        for (let i = 1; i < waterLevels.length; i++) {
          lines.push({
            type: 'line',
            shape: {
              x1: api.coord([i, waterLevels[i - 1]])[0],
              y1: api.coord([i, waterLevels[i - 1]])[1] - 10,
              x2: api.coord([i, waterLevels[i]])[0],
              y2: api.coord([i, terrainData[i]])[1]
            },
            style: {
              stroke: 'red',
              lineWidth: 2
            }
          });
        }
        return {
          type: 'group',
          children: lines
        };
      },
      z: 10,
      data: [0]
    },
    // 4. 水位▽数字标注
    {
      type: 'scatter',
      data: chartData.waterLevelData2,
      symbolSize: 1,
      label: {
        show: true,
        position: 'right',
        formatter: function (params) {
          // if (params.dataIndex === 0 || params.dataIndex === chartData.waterLevelData.length - 1) return '';
          return '▽' + chartData.waterLevelData[params.dataIndex];
        },
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        padding: [0, 0, 10, 5]
      },
      itemStyle: {
        color: 'transparent'
      },
      z: 20
    },
    // 5. 梯级名称标注，横坐标已经显示了，这里不需要标注
    {
      // type: 'scatter',
      // data: chartData.stepData,
      // symbolSize: 1,
      // label: {
      //   show: true,
      //   position: 'top',
      //   offset: [-20, -20],
      //   formatter: function (params) {
      //     const labels = chartData.stepLabels;
      //     console.log('labels: ', labels[params.dataIndex])
      //     return labels[params.dataIndex];
      //   },
      //   color: 'white',
      //   fontSize: 12,
      //   // fontWeight: 'bold'
      // },
      // itemStyle: {
      //   color: 'transparent'
      // },
      // z: 20

      // type: 'scatter',
      // data: chartData.waterLevelData.map((v, i) => i === 0 || i === 7 ? null : v + 12), // 2为上移高度
      // symbolSize: 1,
      // label: {
      //   show: true,
      //   position: 'top',
      //   formatter: function (params) {
      //     const labels = chartData.stepLabels;
      //     return labels[params.dataIndex];
      //   },
      //   color: 'white',
      //   fontSize: 14,
      //   fontWeight: 'bold'
      // },
      // itemStyle: {
      //   color: 'transparent'
      // },
      // z: 20
    }
  ]
  return chartOption
}
