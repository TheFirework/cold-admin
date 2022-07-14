import request from "../core/http";

export default class RoleService{
    // 角色列表
    static async getRoleList(data) {
        return request({
            method: "POST",
            url: '/role/dataList',
            data
        })
    }

    // 保存角色
    static async saveRole(data){
        return request({
            method: "POST",
            url: '/role/save',
            data
        })
    }

    // 获取角色详情信息
    static async getRoleInfo(id){
        return request({
            method: "GET",
            url: `/role/getRoleInfo/${id}`,
        })
    }

    // 删除角色
    static async deleteRole(data){
        return request({
            method: "POST",
            url: '/role/delete',
            data
        })
    }
}