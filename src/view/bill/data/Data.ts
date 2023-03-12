// 费用表头
export const billColumns: any = [
    {
        title: '用户',
        dataIndex: 'userName',
        key: 'userName'
    },
    {
        title: '消费金额',
        dataIndex: 'charge',
        key: 'charge'
    },
    {
        title: '消费类型',
        dataIndex: 'type',
        key: 'type'
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
        sorter: (a: any, b: any) => a.time.localeCompare(b.time)
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

export const user: any = [
    {
        id: 1,
        name: 'haha'
    },
    {
        id: 2,
        name: 'all'
    },
    {
        id: 3,
        name: 'heihei'
    }
];

export const dimDateOptions: any = [
    {
        label: '日',
        value: '1'
    },
    {
        label: '月',
        value: '3'
    }
];
