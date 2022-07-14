export default [
    {
        url: '/login',
        method: 'post',
        response:()=>{
            return {
                code:200,
                data:{
                    token:'@string',
                }
            }
        }
    },
    {
        url: '/logout',
        method: 'post',
        response:()=>{
            return {
                code:200,
                msg:'已退出'
            }
        }
    },
    {
        url: '/user/getUserInfo',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: {
                    nickname: '@cname',
                    age: '@integer(10-100)',
                    uid: '@id',
                    avatar: '@image',
                    city: '@city',
                    country: '@county(true)',
                    province: '@province',
                    phone: '@phone',
                    email: '@email',
                    region: '@region',
                },
            }
        },
    },
    {
        url: '/user/dataList/:current/:size',
        method: 'POST',
        response: () => {
            return {
                code: 200,
                data:{
                    records:[
                        {
                            id: '@id',
                            phone: '@phone',
                            email: '@email',
                            region: '@region',
                            nickname: '@cname',
                            roleIds:'1,2'
                        },
                        {
                            id: '@id',
                            phone: '@phone',
                            email: '@email',
                            region: '@region',
                            nickname: '@cname',
                            roleIds:'1,2'
                        },
                        {
                            id: '@id',
                            phone: '@phone',
                            email: '@email',
                            region: '@region',
                            nickname: '@cname',
                            roleIds:'1,2'
                        },
                    ],
                    total:300,
                    size:10,
                    current:1
                }
            }
        },
    }
]