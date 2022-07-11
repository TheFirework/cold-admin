import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress';
import routes from "./modules/pages";
import useUserStoreInstance, {useUserStore} from "../store/user";
import {cloneDeep} from "lodash";
import useTagViewStoreInstance, {useTagViewStore} from "../store/tagView";
import {importPages} from "../core/utils/file";
import useMenuStoreInstance from "../store/menu";


NProgress.configure({showSpinner: false});

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

router.beforeEach(async (to, from, next) => {
    if (!NProgress.isStarted()) {
        NProgress.start()
    }

    const userStore = useUserStoreInstance()
    const menuStore = useMenuStoreInstance()
    const tagViewStore = useTagViewStoreInstance()
    if(to.path.indexOf('/404') === 0){
        return next();
    }
    // 是否登录
    if (userStore.isLogin) {
        // 登录后无法进去登录页面
        if (to.path.indexOf('/login') === 0) {
            return next('/')
        } else {
            if(!userStore.user){
                await userStore.queryUserInfo().catch(()=>{
                    router.push({
                        path:'/error'
                    })
                })
            }
            if(!menuStore.menuList.length){
                await menuStore.queryMenuList().catch(()=>{
                    router.push({
                        path:'/error'
                    })
                })
            }
            tagViewStore.addTag({
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