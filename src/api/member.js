import request from "../core/http";

export default class MemberService {
    // 用户列表
    static async getUserList({size, current, ...data}) {
        return request({
            method: "POST",
            url: `/user/dataList/${current}/${size}`,
            data
        })
    }

    // 删除用户
    static async deleteUser(data) {
        return request({
            method: "POST",
            url: '/user/delete',
            data
        })
    }


    // 保存用户
    static async saveUser(data) {
        return request({
            method: "POST",
            url: '/user/save',
            data
        })
    }

    // 获取角色信息
    static async getRoleByUserId(userId){
        return request({
            method: "GET",
            url: `/user/roleByUserId/${userId}`,
        });
    }
}