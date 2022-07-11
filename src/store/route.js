import {defineStore} from "pinia";
import store from "./index";
import cache from "../core/utils/cache";
import {addRoutes} from "../router";

export const useRouteStore = defineStore({
    id: 'route',
    state: () => ({
        routes: cache.get('routes') || [],
    }),
    actions:{
        addDynamicRoute(list){
            addRoutes(list)
            cache.set('routes',list)
            this.routes = list
        }
    },
})

export default function useRouteStoreInstance() {
    return useRouteStore(store)
}
