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
        title: ',描述',
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
