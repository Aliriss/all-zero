export const menuTest = [
    {
        id: 'home',
        title: 'home',
        icon: 'desktop-outlined',
        link: '/home',
        children: []
    },
    {
        id: 'analysis',
        title: '分析',
        icon: 'pie-chart-outlined',
        children: [
            {
                id: 'bill',
                title: '消费账单',
                icon: 'fund-outlined',
                link: '/bill',
                children: []
            },
            {
                id: 'test2',
                title: 'test2',
                icon: 'test2',
                link: '/bill',
                children: []
            }
        ]
    },
    {
        id: 'test1',
        title: 'test1',
        icon: 'test1',
        link: '/bill',
        children: []
    }
]