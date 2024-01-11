// 费用表头
import { Generator } from '@/util/Generator';
import moment from 'moment/moment';

export const billColumns: any = [
    {
        title: '用户',
        dataIndex: 'userName',
        key: 'userName',
        width: 100
    },
    {
        title: '消费金额（元）',
        dataIndex: 'charge',
        key: 'charge',
        width: 150,
        sorter: (a: any, b: any) => Number(a.charge) - Number(b.charge)
    },
    {
        title: '消费类型',
        dataIndex: 'typeName',
        key: 'typeName',
        width: 100
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc'
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 300,
        sorter: (a: any, b: any) => a.time.localeCompare(b.time)
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 130,
        // align: 'center',
        scopedSlots: { customRender: 'action' }
    }
];

// 消费类型
export const type: any = [
    {
        id: 1,
        name: '生活'
    },
    {
        id: 2,
        name: '饮食'
    },
    {
        id: 3,
        name: '交通'
    }
];

// 图表类型
export const chartList: any = [
    {
        id: 'line',
        name: '折线图'
    },
    {
        id: 'bar',
        name: '柱状图'
    },
    {
        id: 'pie',
        name: '饼图'
    },
]
