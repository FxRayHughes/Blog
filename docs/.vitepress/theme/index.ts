import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import {createPinia} from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const pinia = createPinia();

import './style.css'

export default {
    extends: DefaultTheme,
    enhanceApp({app}) {
        // 注册自定义全局组件
        app.use(Antd);
        app.use(pinia);
        app.component('MyGlobalComponent');
    }
} satisfies Theme
