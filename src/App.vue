<template>
<div id="app">
  <common-header></common-header>
  <router-view></router-view>
  <!-- <common-footer></common-footer> -->
</div>
</template>

<script>
import Login from './views/Login'
import CommonHeader from './components/CommonHeader'
import CommonFooter from './components/CommonFooter.vue'
export default {
  name: 'App',
  components: {
    Login,
    CommonHeader,
    CommonFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
 
}
li{
  list-style: none;
}
</style>
