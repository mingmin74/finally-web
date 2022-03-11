import { createStore } from 'vuex'
export default createStore({
    state: {
        isLogin: false,//登录状态
        userName:'',//用户名,
        token:''
    },
    mutations: {
    // 进行数据更新，改变数据状态
        CHANGE_STATUS(state, flag) {
            state.isLogin = flag;
        },
        CHANGE_UNAME(state,value){
            state.userName = value
        },
        TOKEN(state,value){
            state.token=value
        }
    },
    actions: {
       //执行动作，数据请求
    },
    getters: {
    // 获取到最终的数据结果
        isLogin: state => state.isLogin 
    }

   
})