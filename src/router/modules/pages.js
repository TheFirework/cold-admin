const routes = [
    {
        path:'/refresh',
        component:() => import('@/pages/refresh/refresh.vue'),
        meta: {
            isShow: false,
        },
    },
    {
        path:'/',
        name:'index',
        component:() => import('@/layout/index.vue'),
        meta: {
            title: '首页',
            keepAlive:false,
        },
        children:[
            {
                path: '/',
                name: 'home',
                component: () => import('@/pages/home/home.vue'),
                meta: {
                    title: '数据统计',
                    keepAlive:false,
                }
            },
            {
                path: 'profile/setting',
                name: 'profileSetting',
                component: () => import('@/pages/profile/setting.vue'),
                meta: {
                    title: '个人设置',
                }
            },

        ],
    },
    {
        path: '/login',
        name: 'login',
        component:() => import('@/pages/login/login.vue'),
        meta: {
            title: "登录"
        }
    },
    {
        path: '/404',
        name: "404",
        component: () => import('@/pages/error/404.vue'),
        meta: {
            title: '找不到页面'
        }
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404"
    }
]

export default routes;