const  routes=[
    {
        path:"/",
        redirect:'/index'
    },
    {
        path:"/login",
        component:()=> import('@/views/Login')
    },
    {
        path:"/register",
        component:()=> import('@/views/Register')
    },
    {
        path:"/index/:user?",
        component:()=> import('@/views/Index'),
        name:'index'
    },
    {
        path:"/search",
        component:()=> import('@/views/Search'),
        name:'search'
    },
    {
        path:"/personalCenter",
        component:()=> import('@/views/PersonalCenter'),
        name:'personalcenter'
    },
    {
        path:"/publish",
        component:()=> import('@/views/PublishArticle'),
        name:'publish'
    },
    {
        path:"/category",
        component:()=> import('@/views/ArticleCategory'),
        name:'category'
    },
]
export default routes
