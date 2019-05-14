<template>
  <div class="login box">
		<img :src="logoURL" alt="">
		<div class="login">
			<div class="login-title">
				<img :src="backgroundImageURL" alt="">
				<p>帮助有志向的年轻人通过努力学习获得体面的工作和生活!</p>
			</div>
			<div class="login_box">
				<div class="title">
					<span @click="login_type=1" :class="login_type==1?'current':''">密码登录</span>
					<span @click="login_type=2" :class="login_type==2?'current':''">短信登录</span>
				</div>
				<div class="inp" :class="login_type==1?'show':''">
					<input v-model = 'username' type="text"  placeholder="用户名 / 手机号码" class="user">
					<input v-model = 'password' type="password" name="" class="pwd" placeholder="密码">
					<div id="geetest"></div>
					<div class="rember" v-model="remember">
						<p>
							<input type="checkbox" class="no" name="a"></input>
							<span>记住密码</span>
						</p>
						<p>忘记密码</p>
					</div>
					<button class="login_btn" @click="this.handlerLogin">登录</button>
					<p class="go_login" >没有账号 <span><router-link to="/register">立即注册</router-link></span></p>
				</div>
        <div class="inp" :class="login_type==2?'show':''">
					<input v-model = 'username' type="text"  placeholder="手机号码" class="user">
					<input v-model = 'password' type="password" name="" class="pwd" placeholder="短信验证码">
          <div class="rember">
						<p>
							<input type="checkbox" class="no" name="a"></input>
							<span>记住密码</span>
						</p>
						<p>忘记密码</p>
					</div>
					<button class="login_btn">登录</button>
					<p class="go_login" >没有账号 <span>立即注册</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import initGeetest from '../../static/js/gt';

  export default{
    name:"Login",
    data(){
      return {
          login_type:1,           // 登陆方式，默认为用户名/邮箱密码登陆，2为短信登陆
          username:"",            // 用户名
          password:"",            // 密码
          remember: false,        // 是否记住密码
          mobile: '',             //手机号码
          sms: '',                // 手机验证码
          validateResult: false,   // 验证码校验状态
          verify_code: '',
          backgroundImageURL: `${this.$remote_server}/static/login/Logotitle.1ba5466.png`,
          logoURL: `${this.$remote_server}/static/login/Loginbg.3377d0c.jpg`
      }
    },
    components:{

    },
    methods: {
      handlerLogin() {
        if(!this.validateResult){
          alert('请输入正确的验证码');
          return false
        }
        this.$axios.post(`${this.$remote_server}/user/login/`,
          {'username': this.username, 'password': this.password},
          {responseType: 'json'},
        ).then((response) => {
          console.log(response.data);
          if(this.remember){
            // 记住密码
            sessionStorage.removeItem('token');
            localStorage.token = response.data.token;
            localStorage.id = response.data.id;
            localStorage.username = response.data.username;
          }else {
            // 不记住密码
            localStorage.removeItem('token');
            sessionStorage.token = response.data.token;
            sessionStorage.id = response.data.id;
            sessionStorage.username = response.data.username;
          }
          this.$router.go(-1);
          // this.$router.push('/');
        }).catch((error) => {
          console.log(error);
        })
      },

      handlerPopup(captchaObj) {
        let that = this;
        captchaObj.onSuccess(function () {
          let validate = captchaObj.getValidate();
          // that.$axios.post('http://api.luffycity.cn:8000/user/verify/', {
          //   geetest_challenge: validate.geetest_challenge,
          //   geetest_validate: validate.geetest_validate,
          //   geetest_seccode: validate.geetest_seccode
          // }, {responseType: 'json'}).then((response) => {
          //   console.log(response.data);
          //   if(response.data.status === "success") {
          //     that.validateResult = true;  // 获取验证结果
          //     that.verify_code = date.code;
          //   }
          // }).catch((error) => {
          //   console.log(error);
          // })
          that.validateResult = true;
        });
          captchaObj.appendTo('#geetest');
      }
    },

    created() {
      this.$axios.get(`${this.$remote_server}/user/verify/`, {responseType: 'json'}).then((response) => {
        // let data = JSON.parse(response.data);
        let data = response.data;
        initGeetest({
          gt: data.gt,
          challenge:data.challenge,
          product: 'embed',
          offline: !data.success,
          width: '100%',
        }, this.handlerPopup);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
</script>

<style scoped>
  .box{
    width: 100%;
    position: relative;

  }
  .box img{
    width: 100%;
  }
  .box .login {
    position: absolute;
    width: 500px;
    height: 400px;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -300px;
  }
  .login .login-title{
       width: 100%;
      text-align: center;
  }
  .login-title img{
      width: 190px;
      height: auto;
  }
  .login-title p{
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #fff;
      letter-spacing: .29px;
      padding-top: 10px;
      padding-bottom: 50px;
  }
  .login_box{
      width: 400px;
      height: auto;
      background: #fff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
      border-radius: 4px;
      margin: 0 auto;
      padding-bottom: 40px;
  }
  .login_box .title{
    font-size: 20px;
    color: #9b9b9b;
    letter-spacing: .32px;
    border-bottom: 1px solid #e6e6e6;
     display: flex;
        justify-content: space-around;
        padding: 50px 60px 0 60px;
        margin-bottom: 20px;
        cursor: pointer;
  }
  .login_box .title .current{
        color: #4a4a4a;
        border-bottom: 2px solid #84cc39;
  }

  .inp{
    width: 350px;
    margin: 0 auto;
    display: none;
  }
  .show{
    display: block;
  }
  .inp input{
      border: 0;
      outline: 0;
      width: 100%;
      height: 45px;
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      text-indent: 20px;
      font-size: 14px;
      background: #fff !important;
  }
  .inp input.user {
      margin-bottom: 16px;
  }
  #geetest {
    margin-bottom: 16px;
  }

  .inp .rember{
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      /*margin-top: 10px;*/
  }
  .inp .rember p:first-of-type{
      font-size: 12px;
      color: #4a4a4a;
      letter-spacing: .19px;
      margin-left: 22px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      /*position: relative;*/
  }
  .inp .rember p:nth-of-type(2){
      font-size: 14px;
      color: #9b9b9b;
      letter-spacing: .19px;
      cursor: pointer;
  }

  .inp .rember input{
      outline: 0;
      width: 15px;
      height: 15px;
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      text-indent: 20px;
      font-size: 14px;
      background: #fff !important;
  }

  .inp .rember p span{
      display: inline-block;
    font-size: 12px;
    width: 100px;
    /*position: absolute;*/
  /*left: 20px;*/

  }
  #geetest{
    margin-top: 20px;
  }
  .login_btn{
      width: 100%;
      height: 45px;
      background: #ffc210;
      border-radius: 5px;
      font-size: 16px;
      color: #fff;
      letter-spacing: .26px;
      margin-top: 30px;
  }
  .inp .go_login{
      text-align: center;
      font-size: 14px;
      color: #9b9b9b;
      letter-spacing: .26px;
      padding-top: 20px;
  }
  .inp .go_login span{
      color: #84cc39;
      cursor: pointer;
  }
</style>
