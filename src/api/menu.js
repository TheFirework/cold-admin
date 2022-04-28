import request from "../core/http";

export default class MenuService{
    // 菜单列表
    static async getMenuList() {
        return request({
            method: 'GET',
            url: '/menu/list',
        });
    }
}