<template>
	<div class="box">
		<img :src="backgroundImageURL" alt="">
		<div class="register">
			<div class="register_box">
        <div class="register-title">注册路飞学城</div>
				<div class="inp">
					<input v-model = "mobile" type="text" placeholder="输入手机号" class="user">
					<input v-model = "password" type="password" placeholder="密码" class="user">
					<input v-model = "password2" type="password" placeholder="确认密码" class="pwd">
					<div id="geetest"></div>
					<div class="sms">
            <input v-model = "sms_code" type="text" placeholder="输入验证码" class="user">
            <span class="get_sms" @click="send_sms">{{get_sms_text}}</span>
					</div>
          <button class="register_btn" @click="registerHandler">注册</button>
					<p class="go_login" >已有账号 <router-link to="/login">直接登录</router-link></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import initGeetest from '../../static/js/gt';
export default {
  name: 'Register',
  data(){
    return {
        password: '',
        password2: '',
        sms_code:"",
        mobile:"",
        validateResult:false,
        get_sms_text: '获取验证码',
        verify_code: -1,
        backgroundImageURL: `${this.$remote_server}/static/login/Loginbg.3377d0c.jpg`,
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
    },
  methods:{
    handlerPopup(captchaObj) {
        let that = this;
        captchaObj.onSuccess(function () {
          let validate = captchaObj.getValidate();
          that.validateResult = true;
          that.verify_code = response.data.code;
        });
          captchaObj.appendTo('#geetest');
      },
    send_sms() {
        let reg = /0?(13|14|15|17|18|19)[0-9]{9}/;
        if (!reg.test(this.mobile)) {
          alert('请输入正确的手机号');
          return false
        }
        if (this.get_sms_text !== '获取验证码') {
          return false
        }

      let that = this;
      this.$axios.get(`${this.$remote_server}/user/sms_code/?mobile=${that.mobile}`).then((response) => {
        console.log(response.data);
        let time = 60;
        let timer = setInterval(() => {
          --time;
          if (time <= 1) {
            // 如果倒计时为0,则关闭当前定时器
            that.get_sms_text = "获取验证码";
            clearInterval(timer);
          }else {
            that.get_sms_text = time;
          }
        }, 1000)
      }).catch((error) => {
        console.log(error);
      })
    },
    registerHandler() {
      if (!this.validateResult) {
        alert('验证码错误');
        return false
      }
      this.$axios.post(`${this.$remote_server}/user/user`, {
        'mobile': this.mobile,
        'password': this.password,
        'password2': this.password2,
        'sms_code': this.sms_code,
        'verify_code': this.verify_code,
      }, {responseType: 'json', withCredentials: true}).then((response) => {
        //如果注册成功，则默认让用户登陆
        localStorage.removeItem('token');
        let data = response.data;
        sessionStorage.token = data.token;
        sessionStorage.mobile = data.mobile;
        sessionStorage.id = data.id;

        alert('注册成功');
        this.$router.push('/');
      }).catch((error) => {
        console.log(error);
        alert('注册失败')
      })
    },
  },

};
</script>

<style scoped>
.box{
	width: 100%;
  height: 100%;
	position: relative;
  overflow: hidden;
}
.box img{
	width: 100%;
  min-height: 100%;
}
.box .register {
	position: absolute;
	width: 500px;
	height: 400px;
	top: 0;
	left: 0;
  margin: auto;
  right: 0;
  bottom: 0;
  top: -338px;
}
.register .register-title{
    width: 100%;
    font-size: 24px;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    color: #4a4a4a;
    letter-spacing: .39px;
}
.register-title img{
    width: 190px;
    height: auto;
}
.register-title p{
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #fff;
    letter-spacing: .29px;
    padding-top: 10px;
    padding-bottom: 50px;
}

.sms{
  margin-top: 15px;
  position: relative;
}
.sms .get_sms{
  position: absolute;
  right: 15px;
  top: 14px;
  font-size: 14px;
  color: #ffc210;
  cursor: pointer;
  border-left: 1px solid #979797;
  padding-left: 20px;
}

.register_box{
    width: 400px;
    height: auto;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
    border-radius: 4px;
    margin: 0 auto;
    padding-bottom: 40px;
}
.register_box .title{
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
.register_box .title span:nth-of-type(1){
	color: #4a4a4a;
  border-bottom: 2px solid #84cc39;
}

.inp{
	width: 350px;
	margin: 0 auto;
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
.inp input.user{
    margin-bottom: 16px;
}
.inp .rember{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 10px;
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
    width: 30px;
    height: 45px;
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
  margin-bottom: 20px;
}
.register_btn{
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
