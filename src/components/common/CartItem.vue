<template>
  <div class="cart-item">
          <el-row>
             <el-col :span="2" class="checkbox"><el-checkbox label="" v-model="course.selected" name="type"></el-checkbox></el-col>
             <el-col :span="10" class="course-info">
               <img :src="course.course_img" alt="">
                <span>{{course.name}}</span>
             </el-col>
             <el-col :span="4">
                 <el-select v-model="course_info.duration">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
             </el-col>
             <el-col :span="4" class="course-price">¥{{course.price}}</el-col>
             <el-col :span="4" class="course-delete"><span @click="delete_course(course.id)">删除</span></el-col>
           </el-row>
  </div>
</template>

<script>
  export default {
    name:"CartItem",
    props:["course","course_key"],
    data(){
      return {
        token: localStorage.token || sessionStorage.token,
        options:[
          {value:30,label:"一个月有效"},
          {value:60,label:"二个月有效"},
          {value:90,label:"三个月有效"},
          {value:-1,label:"永久有效"},
        ],
        course_info:{
          id:1,
          title:"Python开发21天入门",
          duration: 60,
          src:"../../assets/course_1.jpeg",
        }
      }
    },
    methods:{
      delete_course(course_id){
        let _this = this;
        this.$axios.delete('http://127.0.0.1:8000/cart/', {
          data: {'course_id': _this.course.id,},

          headers: {
            // 附带已经登录用户的jwt token 提供给后端,一定不能疏忽这个空格
            'Authorization': 'JWT ' + _this.token
          },
          responseType: "json",
        }).then(response => {
          // console.log( response.data );
          // 发送信息给父组件,通过父组件删除当前子组件
          _this.$emit("delete_course",_this.course_key);
        }).catch(error => {
          console.log(error.response);
        });
      }
    },
    watch:{
      "course.selected":function(){
        let _this = this;
        _this.$axios.patch('http://127.0.0.1:8000/cart/',{
          course_id: _this.course.id,
          is_selected: _this.course.selected
        },{
          headers:{
            // 附带已经登录用户的jwt token 提供给后端,一定不能疏忽这个空格
            'Authorization':'JWT '+_this.token
          },
          responseType:"json",
        }).then(response=>{
          _this.$emit("change_select");
        }).catch(error=>{
          console.log( error.response );
        })
      }
    }
  }
</script>

<style scoped>
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
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
    padding: 67px 10px;
    vertical-align: middle!important;
}
.course-info{

}
</style>
