<template>
  <div class="cart">
    <Header/>
    <div class="cart-info">
        <h3 class="cart-top">购物车结算 <span>共{{course_count}}门课程</span></h3>
        <div class="cart-title">
           <el-row>
             <el-col :span="2">&nbsp;</el-col>
             <el-col :span="10">课程</el-col>
             <el-col :span="8">有效期</el-col>
             <el-col :span="4">价格</el-col>
           </el-row>
        </div>
          <div class="cart-item" v-for="course in course_list">
          <el-row>
             <el-col :span="2" class="checkbox">&nbsp;&nbsp;</el-col>
             <el-col :span="10" class="course-info">
               <img :src="course.course_img" alt="">
                <span>{{course.name}}</span>
             </el-col>
             <el-col :span="4">&nbsp;永久有效&nbsp;</el-col>
             <el-col :span="4" class="course-price">¥{{course.price}}</el-col>
             <el-col :span="4" class="course-delete">&nbsp;&nbsp;</el-col>
           </el-row>
        </div>
        <div class="calc">
            <el-row>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="3">  </el-col>
              <el-col :span="12" class="count">总计：¥{{total}}</el-col>
              <el-col :span="3" class="cart-calc"><span @click="payHandler">支付宝支付</span></el-col>
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
    name:"Buy",
    data(){
      return {
        token: localStorage.token || sessionStorage.token,
        id: localStorage.id || sessionStorage.id,
        course_list:[],
        course_count: 0,
        total:0,
        orderID: sessionStorage.order_id || null,
      }
    },
    components:{
      Header,
      Footer,
    },
    created(){
      // 判断用户是否已经登陆了。
      if( !this.token || !this.id ){
        this.$router.push("/login");
      }

      let _this = this;
      // 发起请求获取购物车中的商品信息
      _this.$axios.get(`${this.$remote_server}/orders/detail/${_this.orderID}/`, {
          // params: {order_id: _this.orderID},
          headers: {'Authorization': 'JWT ' + _this.token},
          responseType: 'json',
          withCredentials: true
        }).then(response=>{
          _this.course_list = response.data.data;
          _this.course_count = _this.course_list.length;
          this.total_price()
        });
    },
    methods: {
      total_price(msg){
        // 计算总价格
        // let cl = this.course_list;
        let total = 0;
        for(let course of this.course_list){
            total+=parseFloat(course.price);
        }
        this.total = total.toFixed(2);
      },

      payHandler() {
        // 发起支付之前获取支付链接地址
        this.$axios.get(`${this.$remote_server}/pay/${this.orderID}/`,{
          headers: {
              'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
          withCredentials: true
        })
          .then(response=>{
            console.log(response.data.pay_url);
            window.location.href=response.data.pay_url;
          }).catch(error=>{
            console.log(error.response);
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
.cart-item{
  height: 250px;
}
.cart-item .el-row{
  height: 100%;
}
.course-delete{
    font-size: 14px;
    color: #ffc210;
    cursor: pointer;
}
.el-checkbox,.el-select,.course-price,.course-delete{
}
.el-checkbox{
    padding-top: 55px;
}
.el-select{
    padding-top: 45px;
    width: 118px;
    height: 28px;
    font-size: 12px;
    color: #666;
    line-height: 18px;
}
.course-info img{
    width: 175px;
    height: 115px;
    margin-right: 35px;
    vertical-align: middle;
}
.cart-item .el-col{
    vertical-align: middle!important;
}
</style>
