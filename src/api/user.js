import request from "../core/http";


export default class UserService {
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
            url: '/user/getUserInfo',
        });
    }

    // 用户列表
    static async getUserList({size, current, ...data}) {
        return request({
            method: "POST",
            url: `/user/dataList/${current}/${size}`,
            data
        })
    }
}