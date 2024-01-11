export const lineOption: any = {
    // animationDuration: 10000,
    // 视觉映射组件: 将数据映射到视觉元素
    visualMap: [
        {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            // min: 0,
            // max: 400
        }
    ],
    title: [
        {
            left: 'center',
            text: ''
        }
    ],
    // 提示框组件
    tooltip: {
        trigger: 'axis',
        // axisPointer: {
        //     show: 'true',
        //     type: 'cross',
        //     snap: 'true',
        //     axis: 'x'
        // }
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
            // bottom: '60%'
        }
    ],
    series: []
};

export const barOption: any = {
    visualMap: [
        {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            // min: 0,
            // max: 400
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
            // bottom: '60%'
        }
    ],
    series: []
};

export const pieOption: any = {
    visualMap: [
        {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            // min: 0,
            // max: 400
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
            // bottom: '60%'
        }
    ],
    series: []
};