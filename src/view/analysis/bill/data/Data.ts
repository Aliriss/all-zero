// 费用表头
import { Generator } from '@/util/Generator';
import moment from 'moment/moment';

export const billColumns: any = [
    {
        title: '用户',
        dataIndex: 'userName',
        key: 'userName'
    },
    {
        title: '消费金额（元）',
        dataIndex: 'charge',
        key: 'charge',
        sorter: (a: any, b: any) => Number(a.charge) - Number(b.charge)
    },
    {
        title: '消费类型',
        dataIndex: 'typeName',
        key: 'typeName'
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
