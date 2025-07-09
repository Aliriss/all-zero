// export function buildOption(context, eChartData, chartOption, echarts) {
function buildOption(context, eChartData, chartOption, echarts) {
  // 图的数据
  let chartData = {
    // x轴数据
    xAxisData: [], // 高程信息（用地势命名了）
    terrain: {
      data: []
    }, // 水位
    waterLevelData: [], // 水位 + 高程
    waterLevelData2: [],
  }
  // 里程
  chartData.xAxisData = [...chartOption.xAxis.data]
  chartData.xAxisData.unshift('')
  chartData.xAxisData.push('距梧州市(km)')
  // chartData.xAxisData.push('')

  // 高程
  chartOption.series[0].data.forEach(v => {
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
  // x轴的配置
  chartOption.xAxis.axisLabel = {
    fontSize: 12, interval: 'auto', formatter: function (value) {
      return value.split(' ').join('\n'); // 按空格换行
    },
  }
  chartOption.xAxis.boundaryGap = false;
  chartOption.xAxis.type = 'category'
  chartOption.xAxis.data = chartData.xAxisData
  chartOption.yAxis.name = '高程(m)'
  chartOption.yAxis.type = 'value'
  chartOption.yAxis.axisLabel = {}
  chartOption.yAxis.axisLabel.fontSize = 14

  // 图形配置
  chartOption.series = [// 1. 高程折线
    {
      name: '地势', type: 'line', data: chartData.terrain.data, lineStyle: {
        color: '#222', width: 2
      }, areaStyle: {
        color: 'rgb(6, 27, 44)', opacity: 1
      }, symbol: 'none', z: 15
    }, // 2. 台阶状水位（蓝色填充）
    {
      name: '水位', type: 'line', step: 'end', data: chartData.waterLevelData2, lineStyle: {
        color: 'rgb(8, 176, 201)', width: 2
      }, areaStyle: {
        color: 'rgb(8, 176, 201)'
      }, symbol: 'none', z: 5
    }, // 3. 红色大坝竖线
    {
      type: 'custom', renderItem: function (params, api) {
        const waterLevels = chartData.waterLevelData2;
        const terrainData = chartData.terrain.data;
        const lines = [];
        for (let i = 1; i < waterLevels.length; i++) {
          lines.push({
            type: 'line', shape: {
              x1: api.coord([i, waterLevels[i - 1]])[0],
              y1: api.coord([i, waterLevels[i - 1]])[1] - 10,
              x2: api.coord([i, waterLevels[i]])[0],
              y2: api.coord([i, terrainData[i]])[1]
            }, style: {
              stroke: 'red', lineWidth: 2
            }
          });
        }
        return {
          type: 'group', children: lines
        };
      }, z: 10, data: [0]
    }, // 4. 水位▽数字标注
    {
      type: 'scatter', data: chartData.waterLevelData2, symbolSize: 1, label: {
        show: true, position: 'right', formatter: function (params) {
          return '▽' + chartData.waterLevelData[params.dataIndex];
        }, color: 'white', fontSize: 14, fontWeight: 'bold', padding: [0, 0, 10, 5]
      }, itemStyle: {
        color: 'transparent'
      }, z: 20
    },

  ]
  // 提示框配置
  chartOption.tooltip.formatter = (params) => {
    let a = params[0]?.axisValue.split(' ')
    if (params[0] && a[1] && params[0].dataIndex && params[0].dataIndex - 1 >= 0) {
      return a[1] + '<br>' + '距梧州市里程：' + a[0] + 'km<br>' + '高程：' + params[0]?.data + 'm<br>' + '水位：' + chartData.waterLevelData[params[0].dataIndex - 1] + 'm';
    } else {
      return ''
    }
  }

  chartOption.grid = {
    left: '10%', right: '10%', top: '10%', bottom: '20%'
  }

  return chartOption
}
