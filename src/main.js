import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'

import store from "./store";
import router from "./router";

import './styles/index.scss'
import 'nprogress/nprogress.css';
import 'normalize.css';
import 'element-plus/dist/index.css'

import "element-plus/theme-chalk/src/message.scss"
import "element-plus/theme-chalk/src/notification.scss"
import "element-plus/theme-chalk/src/message-box.scss"

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementIcons from '@element-plus/icons-vue'
import bootstrap from "./core";

const app = createApp(App)
// 注册 Icons 全局组件
Object.keys(ElementIcons).forEach(key => app.component(key, ElementIcons[key]))

bootstrap().then(() => {
    app.use(store).use(router).use(ElementPlus, {
        locale: zhCn,
    }).mount('#app')
})


