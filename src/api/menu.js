import request from "../core/http";

export default class MenuService{

    // 菜单列表
    static async getMenuList() {
        return request({
            method: 'GET',
            url: '/menu/dataList',
        });
    }

    // 删除菜单
    static async deleteMenu(data){
        return request({
            method: "POST",
            url: '/menu/delete',
            data
        })
    }

    // 保存菜单
    static async saveMenu(data) {
        return request({
            method: "POST",
            url: '/menu/save',
            data
        })
    }
}