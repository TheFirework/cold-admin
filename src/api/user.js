import request from "../core/http";


export default class UserService {

    // 图片验证码
    static async getCaptcha(){
        return request({
            method: "GET",
            url: '/vercode',
        });
    }

    // 登录
    static async login(data) {
        return request({
            method: "POST",
            url: '/login',
            data
        });
    }

    // 登出
    static async logout() {
        return request({
            method: "POST",
            url: '/logout',
        });
    }

    // 获取用户信息
    static async getUserInfo() {
        return request({
            method: "GET",
            url: '/user/info',
        });
    }

    // 用户权限菜单
    static async getPermMenu(){
        return request({
            method: "GET",
            url: '/menu/list',
        });
    }
}