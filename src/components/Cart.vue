<template>
  <div class="cart">
    <Header/>
    <div class="cart-info">
        <h3 class="cart-top">我的购物车 <span>共1门课程</span></h3>
        <div class="cart-title">
           <el-row>
             <el-col :span="2">&nbsp;</el-col>
             <el-col :span="10">课程</el-col>
             <el-col :span="4">有效期</el-col>
             <el-col :span="4">单价</el-col>
             <el-col :span="4">操作</el-col>
           </el-row>
        </div>
        <CartItem v-for="(item,course_key) in course_list"
                  @change_select="total_price"
                  @delete_course="del_course"
                  :course_key="course_key"
                  :course="item"
                  :key="course_key"
        />
        <div class="calc">
            <el-row>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="3">
                  <el-checkbox label="全选" name="type"></el-checkbox></el-col>
              <el-col :span="2" class="del"><i class="el-icon-delete"></i>删除</el-col>
              <el-col :span="12" class="count">总计：¥{{total}}</el-col>
              <el-col :span="3" class="cart-calc"><span @click="create_order">去结算</span></el-col>
            </el-row>
        </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from "./common/Header"
  import Footer from "./common/Footer"
  import CartItem from "./common/CartItem"
  export default {
    name:"Cart",
    data(){
      return {
        token: localStorage.token || sessionStorage.token,
        id: localStorage.id || sessionStorage.id,
        course_list:[],
        total:0,
      }
    },
    components:{
      Header,
      Footer,
      CartItem,
    },
    created(){
      // 判断用户是否已经登陆了。
      if( !this.token || !this.id ){
        this.$router.push("/login");
        return false
      }
      let _this = this;
      // 发起请求获取购物车中的商品信息
      _this.$axios.get(`${this.$remote_server}/cart/`,{
          headers: {
              'Authorization': 'JWT ' + _this.token
          },
          responseType: 'json',
          withCredentials: true
        }).then(response=>{
          _this.course_list = response.data;
          this.total_price()
        })
    },
    methods: {
      del_course(course_key) {
        this.course_list.splice(course_key, 1);
        // 重新计算总价格
        this.total_price();
      },
      total_price(msg){
        // 计算总价格
        let cl = this.course_list;
        let total = 0;
        for(let item of cl){
          if(item.selected){
            total+=parseFloat(item.price);
          }
        }
        this.total = total.toFixed(2);
      },
      create_order(){
        // 生成订单
        this.$axios.post("http://127.0.0.1:8000/orders/",{},{
          headers: {
            // 附带已经登录用户的jwt token 提供给后端,一定不能疏忽这个空格
            'Authorization': 'JWT ' + this.token
          },
          responseType: "json",
        }).then(response=>{
          // 跳转到结算页面
          sessionStorage.order_id = response.data.order_id;
          this.$router.push("/buy")

        }).catch(error=>{
          // 生成订单失败
          console.log(error.response)
        })

      }
    }
  }
</script>

<style scoped>
  .cart{
    margin-top: 80px;
  }
  .cart-info{
    overflow: hidden;
    width: 1200px;
    margin: auto;
  }
  .cart-top{
    font-size: 18px;
    color: #666;
    margin: 25px 0;
    font-weight: normal;
  }
  .cart-top span{
      font-size: 12px;
      color: #d0d0d0;
      display: inline-block;
  }
  .cart-title{
      background: #F7F7F7;
  }
  .cart-title .el-row,.cart-title .el-col{
      height: 80px;
      font-size: 14px;
      color: #333;
      line-height: 80px;
  }
  .calc .el-col{
    height: 80px;
    line-height: 80px;
  }
  .calc .el-row span{
    font-size: 18px!important;
  }
  .calc .el-row{
      font-size: 18px;
      color: #666;
      margin-bottom: 300px;
      margin-top: 50px;
      background: #F7F7F7;
  }
  .calc .del{

  }
  .calc .el-icon-delete{
    margin-right: 15px;
    font-size: 20px;
  }
  .calc .count{
    text-align: right;
    margin-right:62px;
  }
  .calc .cart-calc{
      width: 159px;
      height: 80px;
      border: none;
      background: #ffc210;
      font-size: 18px;
      color: #fff;
      text-align: center;
      cursor: pointer;
  }
</style>
