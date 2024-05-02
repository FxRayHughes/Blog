import {defineConfig} from 'vitepress';

export default defineConfig({
    lang: 'zh-Hans',
    title: '枫溪',
    description: '枫溪个人博客',
    // base: '/Blog/',
    sitemap: {
        hostname: 'https://www.maplex.top'
    },
    themeConfig: {
        logo: '/my_avatar.png',
        search: {
            provider: 'local'
        },
        nav: [
            // {text: '开发成员', link: '/team'},
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
                    {text: '什么是 BukkitSpring?', link: '/article/info/what_is_bukkit_spring'},
                    {text: '快速开始', link: '/article/info/quick_start'},
                ],
            },
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
    head: [
        [
            'link',
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ],
    ],
    transformHead({assets}) {
        // @ts-ignore
        const fontAsset = assets.find(() => /font-name\.\w+\.woff2/)
        if (fontAsset) {
            return [
                [
                    'link',
                    {
                        rel: 'preload',
                        href: fontAsset,
                        as: 'font',
                        type: 'font/woff2',
                        crossorigin: 'anonymous'
                    }
                ]
            ]
        }
    }
});
