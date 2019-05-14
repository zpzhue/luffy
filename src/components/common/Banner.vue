<template>
  <div class="banner">
      <el-carousel trigger="click" height="720px">
      <el-carousel-item v-for="(item, index) in banner_list" :key="index">
        <a :href="item.link"><img :src="item.image"></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name:"Banner",
    data(){
      return {
        banner_list:[],
      };
    },
    created: function(){
      // 获取轮播图
      this.$axios.get(`${this.$remote_server}/home/banner/`).then(res => {
        this.banner_list = res.data
      }).catch(error => {
        console.log(error);
      });
    }
  }
</script>

<style scoped>
.banner img{
  width: 100%;
}
</style>
