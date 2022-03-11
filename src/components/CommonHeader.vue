<template>
<div class="common_header">
     <div class="tabbar">
        <div style="flex:1;">
            <router-link to="/index"> <img style="width:100%;height:70px" src="../assets/logo.jpg" alt="" srcset=""></router-link>
           </div>
        <div style="flex:3">
            <a-input-search
                size="large"
                v-model:value="inputVal"
                placeholder="input search text"
                style="width: 300px;border-radius:20px"
                @search="onSearch"/>
        </div>
        <div class="tabbarRight"> 
            <div >
                <calendar-outlined style="fontSize:25px" />
                <span>签到</span>
            </div>
              <a-badge dot><mail-outlined style="fontSize:25px" title="消息中心"/></a-badge>
            <div>
                <a-popover placement="topLeft">
                    <template #content v-if="isLogin">
                       <p @click="loginOut">退出账号</p> 
                    </template>
                    <router-link to="/personalCenter">
                        <a-avatar size="large">
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                    </router-link>
                    <span v-if="isLogin">{{userName}}</span>
                </a-popover>
             
            </div>
            <!-- <router-link to="/login" v-else>
                <a-avatar size="large">
                    <template #icon><UserOutlined /></template>
                </a-avatar>
            </router-link> -->
            <!-- <div v-if="$route.query.user">
              
                <a-popover placement="topLeft">
                    <template #content>
                        <router-link to="/index">退出账号</router-link>
                    </template>
                    <router-link to="/personalCenter">
                        <a-avatar size="large">
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                    </router-link>
                    <span>{{$route.query.user}}</span>
                </a-popover>
             
            </div>
            
            <router-link to="/login" v-else>
                <a-avatar size="large">
                    <template #icon><UserOutlined /></template>
                </a-avatar>
            </router-link> -->
            
        </div>
</div>
     <div class="pick">
        <a-menu style="background-color:#0B614B;color:#fff" v-model:selectedKeys="current" mode="horizontal">
            <a-sub-menu key="sub1">
            <template #icon>
                <unordered-list-outlined />
            </template>
            <template #title>全部分类</template>
            <a-menu-item-group >
                <a-menu-item v-for="(item,index) in categoryList" :key="index">{{item.category_title}}</a-menu-item>
            </a-menu-item-group>
            </a-sub-menu>
            <a-menu-item key="mail">
            推荐
            </a-menu-item>
            <a-menu-item key="essence">
            精华
            </a-menu-item>
            <a-menu-item key="attentioned">
            已关注
            </a-menu-item>
            <a-menu-item key="publish">
                <router-link to="/publish">
                    <a-button >发布</a-button> 
                </router-link>
            </a-menu-item>
        </a-menu>
    </div>
</div>

</template>

<script>
import { mapState } from 'vuex'
import httpServe from '../api/request'
import { MailOutlined , CalendarOutlined , UserOutlined , UnorderedListOutlined } from '@ant-design/icons-vue';
export default {
components: {
    MailOutlined,
    CalendarOutlined,
    UserOutlined,
    UnorderedListOutlined,
    },
      computed: {
    ...mapState({isLogin:'isLogin',userName:'userName'}),
  },
    data() {
        return {
            categoryList:[]
        }
    },
    created() {
        this.getAllGategory()
        console.log('11111111111111111111111111',this.$store.state.isLogin);
    },
    methods: {
        loginOut(){
            this.$store.commit('CHANGE_STATUS',false)
            localStorage.removeItem('Flag')
            this.$router.push('/index')
        },
        getAllGategory(){
            httpServe.get('http://localhost:8080/article_catrgory/getAllCategory')
            .then((res)=>{
            this.categoryList=res.data.results
            console.log( this.categoryList);
        })}
    }
}
</script>

<style lang="less" scoped>
    .tabbar{
        margin: 0 250px;
        background-color: #fff;
        height: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .tabbarRight{
            flex: 1.5;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }
    .pick{
        padding: 0 250px;
        background-color: #0B614B;
        height: 50px;
    }
</style>