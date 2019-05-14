<template>
  <div class="courses">
      <Header :current_page="current_page"/>
      <div class="main">
          <div class="filter">
            <el-row class="filter-el-row1">
              <el-col :span="2" class="filter-text">课程分类:</el-col>
              <el-col :span="2" :class="currentCate === -1 ? 'current' : '' ">
                <div @click="changeCategory(-1)">全部</div>
              </el-col>
              <el-col :span="2" v-for="(item, keys) in courseCategroy"
                      :key="keys"
                      :class="currentCate === keys ? 'current' : '' "
              >
                <div @click="changeCategory(keys)">{{item.name}}</div>
              </el-col>
            </el-row>
            <el-row class="filter-el-row2">
              <el-col :span="2" class="filter-text filter-text2">筛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选:</el-col>
              <el-col :span="2" :class="currentOrder === 1 ? 'current' : '' ">
                <div @click="changeOrder('id', 1)">默认</div></el-col>
              <el-col :span="2" :class="currentOrder === 2 ? 'current' : '' ">
                <div @click="changeOrder('-studys', 2)">人气</div></el-col>
              <el-col :span="2" class="">
                <span @click.stop="filter_price=!filter_price" :class="currentOrder === 3 ? 'current' : '' "
                      @click="changeOrder(orderParam, 3)"
                >价格
                </span>
                <div class="filter-price">
                  <span class="up" @click.stop="filter_price=true" :class="filter_price===true?'active':''"><i class="el-icon-caret-top"></i></span>
                  <span class="down" @click.stop="filter_price=false"  :class="filter_price===false?'active':''"><i class="el-icon-caret-bottom"></i></span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="courses_list">
              <el-row class="course-item" v-for="(course, keys) in courseList" :key="keys">
                <el-col :span="24" class="course-item-box">
                  <el-row>
                    <el-col :span="12" class="course-item-left"><img :src="course.course_img" alt=""></el-col>
                    <el-col :span="12" class="course-item-right">
                        <div class="course-title">
                          <p class="box-title">{{course.name}}</p>
                          <p class="box-number">{{course.studys}}人已加入学习</p>
                        </div>
                        <div class="author">
                          <p class="box-author">{{course.teacher.name}} {{course.teacher.title}}</p>
                          <p class="lession">共{{course.lessons}}课时<span>/{{course.lessons !== course.pub_lessons ? course.pub_lessons+'课时' : '更新完成' }}</span></p>
                        </div>
                        <el-row class="course-content">
                            <el-col :span="12" v-for="(item, keys) in course.starts_lesson" :key="keys">
                              <i class="el-icon-caret-right"></i>
                              {{'0' + item.order}} | {{item.name}}
                              <span class="free" v-show="item.free_trial">免费</span> </el-col>
                        </el-row>
                        <div class="course-price">
                            <p class="course-price-left">
                              <span class="discount">{{course.preferentials.policy_type}}</span>
                              <span class="count">¥{{course.preferentials.preferential_price}}</span>
                              <span class="old_count">原价: ¥{{course.price}}元</span>
                            </p>
                            <button class="buy " @click="handlerAddCart(course.id)">加入购物车</button>
                            <button class="buy buy2">立即购买</button>
                        </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
          </div>
      </div>
    <el-row>
      <el-col :span="16" :offset="8">
        <el-pagination
          @current-change="handlerChangePage"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="pageCount">
        </el-pagination>
      </el-col>
    </el-row>
      <Footer />
  </div>
</template>

<script>
  import Header from "./common/Header"
  import Footer from "./common/Footer"
  export default {
    name:"Courses",
    data(){
      return {
        token: sessionStorage.token || localStorage.token,
        id: sessionStorage.id || localStorage.id,
        current_page:1,
        filter_price:false,
        courseCategroy: [],
        courseList: [],
        filterParam: 0,
        orderParam: '',
        pageSize: 3,
        currentCate: -1,
        currentOrder: 1,
        pageCount: 5
      }
    },
    components:{
      Header,
      Footer,
    },
    created() {
      let that = this;

      // 获取分类
      this.$axios.get(`${this.$remote_server}/course/course_categroy/`).then(response => {
        that.courseCategroy = response.data;
      }).catch(error => {
        console.log(error);
      });

      // 获取课程列表
      // this.$axios.get('http://api.luffycity.cn:8000/course/', {
      //   params: this.getParams(),
      // }).then(response => {
      //   this.courseList = response.data.results;
      //   this.pageCount = response.data.count;
      //   console.log(response.data);
      // }).catch(error => {
      //   console.log(error);
      // })
      this.handlerChangePage(this.current_page);
    },

    methods:{
      getParams() {
        let params = {};
        if (this.filterParam){
          params.course_category = this.filterParam
        }
        if (this.orderParam) {
          params.ordering = this.orderParam
        }
        params.page= this.current_page;
        params.page_size = this.pageSize;

        return params
      },

      changeCategory(idx) {
        this.currentCate = idx;
        this.filterParam = idx === -1 ? '' : this.courseCategroy[idx].id;
        this.handlerChangePage(1)
      },

      changeOrder(param, idx) {
        this.currentOrder = idx;
        if (idx === 3){
          this.orderParam = (param === "-price" ? "price" : "-price")
        } else {
          this.orderParam = param;
        }
        this.handlerChangePage(1)
      },

      handlerChangePage(page) {
        this.current_page = page;
        let that = this;
        this.$axios.get(`${this.$remote_server}/course/`, {
          params: that.getParams(),
        }).then(response => {
          that.courseList = response.data.results;
          that.pageCount = response.data.count;
        }).catch(error => {
          console.log(error);
        })
      },
      handlerAddCart(course_id) {
        if (!this.token || !this.id) {
          this.$router.push({name: 'Login'});
          return false;
        }
        let that = this;
        that.$axios.post(`${this.$remote_server}/cart/`, {
          'course_id': course_id,
          }, {
            headers: {'Authorization': 'JWT ' + that.token},
            responseType: 'json',
          },
        ).then(reponse => {
          console.log(response.data);
        }).catch(error => {
          console.log(error.response);
        })
      },
    }
  }
</script>


<style scoped>
  .courses{
    padding-top: 80px;
  }
  .main{
      width: 1100px;
      height: auto;
      margin: 0 auto;
      padding-top: 35px;
  }
  .main .filter{
      width: 100%;
      height: auto;
      margin-bottom: 35px;
      padding: 25px 0px 25px 0px;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 #f0f0f0;
  }
  .filter .el-col{
    text-align: center;
    padding: 6px 0px;
    line-height: 16px;
    margin-left: 14px;
    position: relative;
    transition: all .3s ease;
    cursor: pointer;
    color: #4a4a4a;
  }
  .filter-el-row1{
    padding-bottom: 18px;
    margin-bottom: 17px;
  }
  .filter .filter-text{
    text-align: right;
    font-size: 16px;
    color: #888;
  }
  .filter .filter-text2{
  }
  .filter .filter-el-row1 .current{
      color: #ffc210;
      border: 1px solid #ffc210!important;
      border-radius: 30px;
  }
  .filter .filter-el-row2 .current{
      color: #ffc210;
  }
  .filter-price{
    display:inline-block;
    vertical-align: middle;
  }
  .filter-price .up, .filter-price .down{
    display: block;
    line-height: 8px;
    font-size: 13px;
    margin: -4px;
    color: #d8d8d8;
  }
  .current .filter-price .active{
    color: #ffc210;
  }
  .course-item{
    margin-bottom: 35px;
  }
  .course-item .course-item-box{
     padding: 20px 30px 20px 20px;
  }
  .course-item{
       box-shadow: 2px 3px 16px rgba(0,0,0,.1);
      transition: all .2s ease;
  }
  .course-item .course-item-left{
      width: 423px;
      height: 210px;
      margin-right: 30px;
  }
  .course-title{
    overflow: hidden;/* 在父元素中使用可以清除子元素的浮动影响 */
  }
  .course-title .box-title{
    font-size: 26px;
    color: #333333;
    float: left;
    margin-bottom: 8px;
  }
  .course-title .box-number{
      font-size: 14px;
      color: #9b9b9b;
      font-family: PingFangSC-Light;
      float: right;
      padding-top: 12px;
  }
  .course-item-right{
    width: 56.6%;
  }
  .author{
      font-size: 14px;
      color: #9b9b9b;
      margin-bottom: 14px;
      padding-bottom: 14px;
      overflow: hidden;
  }
  .author .box-author{
    float:left;
  }
  .author .lession{
    float: right;
  }
  .course-content .el-icon-caret-right{
    border: 1px solid #000;
    border-radius: 50%;
    margin-right: 6px;
  }
  .course-content .el-col{
    font-size: 14px;
    color: #666;
    width: 50%;
    margin-bottom: 15px;
    cursor: pointer;
  }
  .course-content .el-col:hover{
    color: #ffc210;
  }
  .course-content .el-col:hover .el-icon-caret-right,.course-content .el-col:hover .free{
    border-color: #ffc210;
    color: #ffc210;
  }
  .course-content .el-col .free{
      width: 34px;
      height: 20px;
      color: #fd7b4d;
      margin-left: 10px;
      border: 1px solid #fd7b4d;
      border-radius: 2px;
      text-align: center;
      font-size: 13px;
      white-space: nowrap;
  }
  .course-price{
    overflow: hidden;
  }
  .course-price .course-price-left{
    float: left;
  }
  .course-price .discount{
      padding: 6px 10px;
      display: inline-block;
      font-size: 16px;
      color: #fff;
      text-align: center;
      margin-right: 8px;
      background: #fa6240;
      border: 1px solid #fa6240;
      border-radius: 10px 0 10px 0;
  }
  .course-price .course-price-left{
    line-height: 22px;
  }
  .course-price .count{
      font-size: 24px;
      color: #fa6240;
  }
  .course-price .old_count{
      font-size: 14px;
      color: #9b9b9b;
      text-decoration: line-through;
      margin-left: 10px;
  }
  .course-price .buy{
    float: right;
    width: 120px;
    height: 38px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid #fd7b4d;
    background: transparent;/* 透明 */
    color: #fa6240;
    cursor: pointer;
    transition: all .2s ease-in-out;/* css3新版本的样式中支持支持 jQuery里面的动画预设效果 */
    /* all表示当前元素的所有样式  .2s表示改变样式完成的时间  ease-in-out */
  }
  .course-price .buy:hover{
      color: #fff;
      background: #ffc210;
      border: 1px solid #ffc210;
  }
  .course-price .buy2{
    margin-right: 20px;
  }
</style>
