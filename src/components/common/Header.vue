<template>
  <div class="header">
    <el-container>
      <el-header height="80px">
         <el-row>
           <el-col class="logo" :span="3">
             <router-link to="/"><img src="../../assets/head-logo.svg" alt=""></router-link>
           </el-col>
           <el-col :span="16">
             <!-- gutter每一列之间的间隔空隙 -->
             <el-row class="nav" :gutter="20">
                <el-col :span="3"><router-link :class="current_page===1?'active':''" to="/courses">免费课</router-link></el-col>
                <el-col :span="3"><router-link :class="current_page===2?'active':''" to="/courses">轻课</router-link></el-col>
                <el-col :span="3"><router-link :class="current_page===3?'active':''" to="/courses">学位课</router-link></el-col>
                <el-col :span="3"><router-link :class="current_page===4?'active':''" to="/courses">题库</router-link></el-col>
                <el-col :span="3"><router-link :class="current_page===5?'active':''" to="/courses">教育</router-link></el-col>
              </el-row>
           </el-col>
           <el-col v-if="is_login" class="login-bar" :span="5">
             <div class="cart-ico">
                 <b></b>
                 <img src="../../assets/cart.svg" alt="">
               <span><router-link :to="{name: 'Cart'}">购物车</router-link></span>
             </div>
             <div class="study">学习中心</div>
             <div class="member">
               <el-dropdown>
                  <span class="el-dropdown-link">
                    <img src="../../assets/user_logo.png" alt="">
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的账户 <i class="el-icon-arrow-right"></i></el-dropdown-item>
                    <router-link :to="{'name': 'Buy'}"><el-dropdown-item>我的订单 <i class="el-icon-arrow-right"></i></el-dropdown-item></router-link>
                    <el-dropdown-item>我的账户 <i class="el-icon-arrow-right"></i></el-dropdown-item>
                    <el-dropdown-item><span @click="logout">退出登陆</span> <i class="el-icon-arrow-right"></i></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
             </div>
           </el-col>
           <el-col v-else class="login-bar" :span="5">
             <div class="cart-ico">
                 <img src="../../assets/cart.svg" alt="">
               <span><router-link :to="{name: 'Login'}">购物车</router-link></span>
             </div>
             <span class="header-login"><router-link to="/login">登录</router-link></span>
             &nbsp;&nbsp;|&nbsp;&nbsp;
             <span class="header-register"><router-link to="/register">注册</router-link></span>
           </el-col>
         </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  export default {
    name:"Header",
    props:["current_page"],
    data(){
      return {
        is_login: false, /* 是否登录 */
        token: sessionStorage.token || localStorage.token,
      }
    },
    created() {
      if (this.token) {
        this.is_login = true
      }else {
        this.is_login = false
      }
    },
    methods: {
      logout() {
        sessionStorage.clear();
        // localStorage.clear();
        this.is_login = false;
      }
    }
  }
</script>

<style scoped>
.header{
    width: 100%;
    height: 80px;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    margin: 0 auto;
    z-index: 7;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-shadow: 0 0.5px 0.5px 0 #c9c9c9;
}
.el-container{
  width: 1200px;
  margin: 0 auto;
}
.el-header{
  padding: 0;
}
.el-row,.el-col{
  height: 80px;
}
.logo{
  width: 118px;
}
.logo,.nav{
    line-height: 80px;
}
.logo img{
   vertical-align: middle; /* 设置图片垂直居中 */
}
.nav{
  margin-left: 30px!important;
  margin-right: 0!important;
}
.nav .el-col .active{
  padding-bottom: 16px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: 4px solid #ffc210;
}
.nav,.study{
  text-align: center;
  color: #4a4a4a;
}
.nav .el-col:hover,.nav .el-col a:hover,.study:hover,.study a:hover{
  color: #000000;
}
.login-bar{
  display: flex;
  align-items: center;
}
.cart-ico{
    width: 88px;
    height: 28px;
    margin-right: 20px;
    background: #f7f7f7;
    border-radius: 17px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    position: relative;
    font-size: 14px;
}
.cart-ico b{
    width: 16px;
    height: 16px;
    line-height: 17px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    background: #fa6240;
    border-radius: 50%;
    transform: scale(.8);
    position: absolute;
    left: 16px;
    top: -1px;
}
.cart-ico img{
    width: 15px;
    height: auto;
    margin-left: 6px;
}
.cart-ico span{
    margin-right: 6px;
}
.study{
    padding-left: 0;
    font-family: PingFangSC-Regular;
    letter-spacing: 0;
    margin-right: 20px;
    font-size: 15px;
    cursor: pointer;
}
.member img{
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
}
.member img:hover{
    border: 1px solid rgb(255, 194, 16);
}
.el-dropdown-menu{
  left: 1380px!important;
  width: 180px;
  top: 64px!important;
}
.el-dropdown-menu i{
  float:right;
  line-height: 36px;
}
.header-login,.header-register{
  cursor: pointer;
  font-size: 15px;
  color: #4a4a4a;
}
.header-login:hover,.header-register:hover{
  color: #000000;
}
</style>
