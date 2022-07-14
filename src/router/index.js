import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress';
import routes from "./modules/pages";
import useUserStoreInstance from "../store/user";
import {cloneDeep} from "lodash";
import {useTagViewStore} from "../store/tagView";
import {importPages} from "../core/utils/file";


NProgress.configure({showSpinner: false});

export const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (!NProgress.isStarted()) {
        NProgress.start()
    }

    const userStore = useUserStoreInstance()
    const tagViewStore = useTagViewStore()
    // 是否登录
    if (userStore.isLogin) {
        // 登录后无法进去登录页面
        if (to.path.indexOf('/login') === 0) {
            return next('/')
        } else {
            tagViewStore.add({
                keepAlive: to.meta.keepAlive,
                label: to.meta.title,
                value: to.path,
                name: to.name
            })
        }
    } else {
        if (to.name !== 'login') {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
    next()
})

router.afterEach((to, from) => {
    document.title = to.meta.title
    NProgress.done()
})

export function addRoutes(list) {
    const pages = importPages()
    list.forEach((e) => {
        const route = cloneDeep(e)
        if (!route.component) {
            const url = route.viewPath
            if (url) {
                route.component = () => Promise.resolve(pages[url]);
            } else {
                route.redirect = "/404";
            }
        }
        router.addRoute('index', route)
    })
}

export default router