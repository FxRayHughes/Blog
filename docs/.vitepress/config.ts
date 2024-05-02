import {defineConfig} from 'vitepress';

export default defineConfig({
    lang: 'zh-Hans',
    title: '枫溪博客',
    description: '枫溪个人博客',
    // base: '/Blog/',
    sitemap: {
        hostname: 'https://example.com'
    },
    themeConfig: {
        logo: '/spring-bukkit-logo.png',
        search: {
            provider: 'local'
        },
        nav: [
            {text: '开发成员', link: '/team'},
            // {
            //   text: 'Dropdown Menu',
            //   items: [
            //     { text: 'Item A', link: '/item-1' },
            //     { text: 'Item B', link: '/item-2' },
            //     { text: 'Item C', link: '/item-3' },
            //   ],
            // },
        ],

        sidebar: [
            {
                text: '简介',
                collapsed: false,
                items: [
                    {text: '什么是 BukkitSpring?', link: '/doc/info/what_is_bukkit_spring'},
                    {text: '快速开始', link: '/doc/info/quick_start'},
                ],
            },
            {
                text: '开发',
                collapsed: false,
                items: [
                    {text: 'IOC 容器', link: '/doc/development/ioc'},
                    {text: '设置 MybatisPlus', link: '/doc/development/mybatis_plus_first'},
                ],
            }, {
                text: '拓展',
                collapsed: false,
                items: [
                    {text: '多数据源切换', link: '/doc/expand/database_select'},
                    {text: '获取 Bean 实例', link: '/doc/expand/get_bean'},
                    {text: '全局锁', link: '/doc/expand/global_lock'},
                    {text: 'MybatisPlus DSL', link: '/doc/expand/mybatis_plus_dsl'},
                    {text: 'RabbitMQ 消息处理', link: '/doc/expand/rabbitmq'},
                ]
            }
        ],
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        outline: {
            label: '页面导航'
        },
        lastUpdated: {
            text: '最后更新于',
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    },
});
