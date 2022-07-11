import {defineStore} from "pinia";
import cache from "../core/utils/cache";
import store from "./index";
import router from "../router";
import UserService from "../api/user";

export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            token: cache.get('token') || '',
            userInfo: cache.get('userInfo') || {},
        }
    },
    getters:{
        isLogin:state => {
            return !!state.token
        }
    },
    actions: {
        async login(form) {
            return UserService.login(form).then((res) => {
                this.token = res.data.access_token
                cache.set('token', res.data.access_token)
                return res.data
            })
        },
        logout() {
            UserService.logout()
            this.token = ''
            this.userInfo = {}
            cache.clear()
            router.push('/login')
        },
        async queryUserInfo() {
            return UserService.getUserInfo().then((res) => {
                if (res.code === 200) {
                    this.userInfo = res.data
                    cache.set('userInfo', res.data)
                }
                return res.data
            })
        },
    },
})

export default function useUserStoreInstance(){
    return useUserStore(store)
}