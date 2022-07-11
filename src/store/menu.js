import {defineStore} from "pinia";
import store from "./index";
import useRouteStoreInstance from "./route";
import cache from "../core/utils/cache";
import {revisePath} from "../core/utils/path";
import {deepTree} from "../core/utils/array";
import UserService from "../api/user";

export const useMenuStore = defineStore({
    id: 'menu',
    state: () => ({
        menuList: cache.get('menu') || [],
        sidebarMenuCollapse: false,
    }),
    actions: {
        async queryMenuList() {
            return UserService.getPermMenu().then((res) => {
                if (res.code === 200) {
                    const list = res.data.filter((e) => e.type <= 2).map((e) => {
                        return {
                            id: e.id,
                            parentId: e.parentId,
                            path: revisePath(e.path),
                            viewPath: e.viewPath,
                            name: e.name,
                            meta: {
                                keepAlive: e.keepAlive === 1,
                                title: e.title,
                                type: e.type,
                                icon: e.icon,
                                isShow: e.isShow === 1,
                            },
                            children: [],
                        }
                    })

                    // 菜单栏
                    this.menuList = deepTree(list.filter((e) => e.meta.isShow))
                    cache.set('menu', this.menuList)
                    // 路由数据
                    const routeStore = useRouteStoreInstance()
                    routeStore.addDynamicRoute(list.filter((e) => e.meta.type === 2))
                }
            })
        },
        collapse(value) {
            this.sidebarMenuCollapse = value
        }
    },
})

export default function useMenuStoreInstance() {
    return useMenuStore(store)
}
