const  routes=[
    {
        path:"/",
        redirect:'/index'
    },
    //登录
    {
        path:"/login",
        component:()=> import('@/views/Login'),
        meta: {
            isLogin: false
        }
    },
    //注册
    {
        path:"/register",
        component:()=> import('@/views/Register'),
        meta: {
            isLogin: false
        }
    },
    //首页
    {
        path:"/index/:user?",
        component:()=> import('@/views/Index'),
        name:'index',
        meta: {
            isLogin: false
        }
    },
    {
        path:"/search",
        component:()=> import('@/views/Search'),
        name:'search'
    },
    //个人中心
    {
        path:"/personalCenter",
        component:()=> import('@/views/PersonalCenter'),
        name:'personalcenter',
        meta: {
            isLogin: true
        }
    },
    //发布文章
    {
        path:"/publish",
        component:()=> import('@/views/PublishArticle'),
        name:'publish',
        meta: {
            isLogin: true
        }
    },
    //文章分类
    {
        path:"/category",
        component:()=> import('@/views/ArticleCategory'),
        name:'category'
    },
]
export default routes
