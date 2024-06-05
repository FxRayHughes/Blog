import {defineConfig} from 'vitepress';

const bukkitPluginRouter = [
    {text: 'Aboleth', link: '/posts/public/bukkitplugin/Aboleth'},
    {text: 'AbolethPlus', link: '/posts/public/bukkitplugin/AbolethPlus'},
    {text: 'MythicItemStyrke', link: '/posts/public/bukkitplugin/MythicItemStyrke'},
    {text: 'ProSkillAPI', link: '/posts/public/bukkitplugin/ProSkillAPI'},
    {text: 'Shop', link: '/posts/public/bukkitplugin/Shop'},
    {text: 'SX-Item', link: '/posts/public/bukkitplugin/SX-Item'},
]

export default defineConfig({
    lang: 'zh-Hans',
    title: '枫溪',
    description: '枫溪个人博客',
    // base: '/Blog/',
    sitemap: {
        hostname: 'https://www.maplex.top'
    },
    lastUpdated: true,
    themeConfig: {
        logo: 'https://maplex.oss-cn-beijing.aliyuncs.com/my_avatar.png',
        search: {
            provider: 'local'
        },
        nav: [
            {text: '文章索引', link: '/posts/nav/tags'},
            {
                text: '插件列表',
                items: bukkitPluginRouter,
            },
            {text: '关于枫溪', link: '/posts/nav/self'},
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/FxRayHughes/Blog'},
        ],
        sidebar: {
            '/posts/public/bukkitplugin': [
                {
                    text: 'BukkitPlugin',
                    collapsed: false,
                    items: bukkitPluginRouter,
                },
            ],
        },
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

function hasTag(tags: string[], tag: string): boolean {
    for (let tag1 of tags) {
        if (tag1 == tag) {
            return true;
        }
    }
    return false;
}
