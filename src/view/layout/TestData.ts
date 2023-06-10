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
                id: 'summary',
                title: '账单合计',
                icon: 'fund-outlined',
                link: '/summary'
            }
        ]
    },
    {
        id: 'admin',
        title: '系统管理',
        icon: 'manage',
        link: '/bill',
        children: []
    }
]