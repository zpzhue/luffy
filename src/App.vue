<template>
  <div id="app">
    <router-view/>
  </div>


</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body,p{
    margin:0;
    padding:0;
  }
  a{
    color: #4a4a4a;
    text-decoration: none;
  }
  img{
    width: 100%;
  }
  .el-checkbox__inner{
    border: 1px solid #9b9b9b;
    border-radius: 0;
    width: 16px;
    height: 16px;
  }
  .el-checkbox__inner::after{
    height: 8px;
    width: 6px;
  }
</style>
