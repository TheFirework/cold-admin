export default  [
    {
        url: '/role/dataList',
        method: 'POST',
        response: () => {
            return {
                code: 200,
                data: [
                    {
                        id:1,
                        name:'admin',
                        roleNo:'admin',
                        orderNo:0,
                        remark:'管理员',
                    },
                    {
                        id:2,
                        name:'dev',
                        roleNo:'dev',
                        orderNo:0,
                        remark:'开发',
                    }
                ],
            }
        },
    },
    {
        url:'/role/getRoleInfo/:id',
        method: 'get',
        response: () => {
            return {
                code:200,
                data:{
                    id:2,
                    name:'dev',
                    roleNo:'dev',
                    orderNo:0,
                    remark:'开发',
                    roleMenuIds:'1000,1001,1002,1003,1004,2000,6000,6001'
                }
            }
        }
    }
]