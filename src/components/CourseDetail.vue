<template>
	<div class="detail">
    <Header></Header>
    <div class="warp">
        <div class="course-info">
          <div class="warp-left" style="width: 690px;height: 388px;background-color: #000;">
          <video-player class="video-player vjs-custom-skin"
               ref="videoPlayer"
               :playsinline="true"
               :options="playerOptions"
               @play="onPlayerPlay($event)"
               @pause="onPlayerPause($event)"
          >
          </video-player>
          </div>
          <div class="warp-right">
              <h3 class="course-title">{{course.name}}</h3>
              <p class="course-data">{{course.studys}}人在学&nbsp;&nbsp;&nbsp;&nbsp;课程总时长：{{course.lessons}}课时/{{course.pub_lessons}}小时&nbsp;&nbsp;&nbsp;&nbsp;难度：{{course.level}}</p>
              <div class="preferential">
                <p class="price-service" v-html="course.price_service_type.name"></p>
                <!--<p class="timer">距离结束：仅剩 {{Math.floor(sale_time/86400)}}天 {{Math.floor(sale_time%86400/3600)}}小时 {{Math.floor(sale_time%3600/60)}}分 <span>{{Math.floor(sale_time%60)}}</span> 秒</p>-->
              </div>
              <p class="course-price">
                <span>活动价</span>
                <span class="real-price">¥{{course.real_price}}</span>
                <span class="old-price">¥{{course.price}}</span>
              </p>
              <div class="buy-course">
                <p class="buy-btn">
                  <span class="btn1">立即购买</span>
                  <span class="btn2">免费试学</span>
                </p>
                <p class="add-cart">
                  <img src="../../static/images/cart.svg" alt="">加入购物车
                </p>
              </div>
          </div>
        </div>
        <div class="course-tab">
            <ul>
                <li  class="active">详情介绍</li>
                <li>课程章节 <span>(试学)</span></li>
                <li>用户评论 (83)</li>
                <li>常见问题</li>
            </ul>
        </div>
        <div class="course-section">
          <section class="course-section-left" v-html="course.brief">

          </section>

        </div>
    </div>
    <Footer></Footer>
	</div>
</template>

<script>
import Header from "./common/Header"
import Footer from "./common/Footer"

import {videoPlayer} from 'vue-video-player';

export default {
  name: 'CourseDetail',
  data(){
  	return {
  	    video_id:5,
        course:{},
        sale_time: 0,
        // vue-video的配置选项
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
          autoplay: false, //如果true,则打开页面以后自动播放
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 循环播放
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{ // 播放资源类型和地址
            type: "video/mp4",
            src: "http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4" //你的视频地址（必填）
          }],
          poster: "../static/courses/675076.jpeg", //视频封面图
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        }
  	}
  },
  components:{
    Header,
    Footer,
    videoPlayer, // 引入vue-viedeo播放器组件
  },
  methods:{
      intervaltimer(){
          // 课程优惠倒计时
          if(this.sale_time > 0 ){
            let timer = setInterval(()=>{
              if( this.sale_time < 0 ){
                clearInterval(timer)
              }else{
                --this.sale_time;
              }
            },1000);
          }
      }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  created(){
    // 获取当前课程详情页信息
    this.$axios.get(`${this.$remote_server}/course/${this.video_id}/`).then(response=>{
      this.course = response.data;
      this.playerOptions.poster = response.data.course_img;
      // this.playerOptions.sources[0].src = response.data.course_img;
      this.sale_time = response.data.price_service_type.priceservices[0].endtime;
      this.intervaltimer()
    }).catch(error=>{
      console.log(error.response);
    })
  }
};
</script>

<style scoped>
.detail{
  margin-top: 80px;
}
.course-info{
  padding-top: 30px;
  width:1200px;
  height: 388px;
  margin: auto;
}
.warp-left,.warp-right{
  float: left;
}
.warp-right{
  height: 388px;
  position: relative;
}
.course-title{
    font-size: 20px;
    color: #333;
    padding: 10px 23px;
    letter-spacing: .45px;
    font-weight: normal;
}
.course-data{
    padding-left: 23px;
    padding-right: 23px;
    padding-bottom: 16px;
    font-size: 14px;
    color: #9b9b9b;
}
.preferential{
    width: 100%;
    height: auto;
    background: #fa6240;
    font-size: 14px;
    color: #4a4a4a;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 10px 23px;
}
.price-service{
    font-size: 16px;
    color: #fff;
    letter-spacing: .36px;
}
.timer{
    font-size: 14px;
    color: #fff;
}
.course-price{
    width: 100%;
    background: #fff;
    height: auto;
    font-size: 14px;
    color: #4a4a4a;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: end;
    align-items: flex-end;
    padding: 5px 23px;
}
.real-price{
    font-size: 26px;
    color: #fa6240;
    margin-left: 10px;
    display: inline-block;
    margin-bottom: -5px;
}
.old-price{
    font-size: 14px;
    color: #9b9b9b;
    margin-left: 10px;
    text-decoration: line-through;
}
.buy-course{
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 100%;
    height: auto;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding-left: 23px;
    padding-right: 23px;
}
.buy-btn{
  float: left;
}
.buy-btn .btn1{
    display: inline-block;
    width: 125px;
    height: 40px;
    background: #ffc210;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    margin-right: 15px;
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
}
.buy-btn .btn2{
    width: 125px;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 15px;
    display: inline-block;
    background: #fff;
    color: #ffc210;
    border: 1px solid #ffc210;
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
}
.add-cart{
    font-size: 14px;
    color: #ffc210;
    text-align: center;
    cursor: pointer;
    float: right;
    margin-top: 10px;
}
.add-cart img{
    width: 20px;
    height: auto;
    margin-right: 7px;
}
.course-tab{
    width: 1200px;
    margin: auto;
    height: auto;
    background: #fff;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px 0 #f0f0f0;
}
.course-tab>ul{
    padding: 0;
    margin: 0;
    list-style: none;
    width: 1200px;
    height: auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    color: #4a4a4a;
}
.course-tab>ul>li{
    margin-right: 15px;
    padding: 26px 20px 16px;
    font-size: 17px;
    cursor: pointer;
}
.course-tab>ul>.active{
    color: #ffc210;
    border-bottom: 2px solid #ffc210;
}
.course-section{
    background: #FAFAFA;
    overflow: hidden;
    padding-bottom: 40px;
    width: 1200px;
    height: auto;
    margin: 0 auto;
}
.course-section-left{
    width: 880px;
    height: auto;
    padding: 20px;
    background: #fff;
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 4px 0 #f0f0f0;
}
</style>
