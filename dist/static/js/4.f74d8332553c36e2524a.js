webpackJsonp([4],{"8V2g":function(e,t){},dIqY:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o("wmSr"),n={name:"Register",data:function(){return{password:"",password2:"",sms_code:"",mobile:"",validateResult:!1,get_sms_text:"获取验证码",verify_code:-1,backgroundImageURL:this.$remote_server+"/static/login/Loginbg.3377d0c.jpg"}},created:function(){var e=this;this.$axios.get(this.$remote_server+"/user/verify/",{responseType:"json"}).then(function(t){var o=t.data;Object(s.a)({gt:o.gt,challenge:o.challenge,product:"embed",offline:!o.success,width:"100%"},e.handlerPopup)}).catch(function(e){console.log(e)})},methods:{handlerPopup:function(e){var t=this;e.onSuccess(function(){e.getValidate();t.validateResult=!0,t.verify_code=response.data.code}),e.appendTo("#geetest")},send_sms:function(){if(!/0?(13|14|15|17|18|19)[0-9]{9}/.test(this.mobile))return alert("请输入正确的手机号"),!1;if("获取验证码"!==this.get_sms_text)return!1;var e=this;this.$axios.get(this.$remote_server+"/user/sms_code/?mobile="+e.mobile).then(function(t){console.log(t.data);var o=60,s=setInterval(function(){--o<=1?(e.get_sms_text="获取验证码",clearInterval(s)):e.get_sms_text=o},1e3)}).catch(function(e){console.log(e)})},registerHandler:function(){var e=this;if(!this.validateResult)return alert("验证码错误"),!1;this.$axios.post(this.$remote_server+"/user/user",{mobile:this.mobile,password:this.password,password2:this.password2,sms_code:this.sms_code,verify_code:this.verify_code},{responseType:"json",withCredentials:!0}).then(function(t){localStorage.removeItem("token");var o=t.data;sessionStorage.token=o.token,sessionStorage.mobile=o.mobile,sessionStorage.id=o.id,alert("注册成功"),e.$router.push("/")}).catch(function(e){console.log(e),alert("注册失败")})}}},r={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"box"},[o("img",{attrs:{src:e.backgroundImageURL,alt:""}}),e._v(" "),o("div",{staticClass:"register"},[o("div",{staticClass:"register_box"},[o("div",{staticClass:"register-title"},[e._v("注册路飞学城")]),e._v(" "),o("div",{staticClass:"inp"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"user",attrs:{type:"text",placeholder:"输入手机号"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}}),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"user",attrs:{type:"password",placeholder:"密码"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.password2,expression:"password2"}],staticClass:"pwd",attrs:{type:"password",placeholder:"确认密码"},domProps:{value:e.password2},on:{input:function(t){t.target.composing||(e.password2=t.target.value)}}}),e._v(" "),o("div",{attrs:{id:"geetest"}}),e._v(" "),o("div",{staticClass:"sms"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.sms_code,expression:"sms_code"}],staticClass:"user",attrs:{type:"text",placeholder:"输入验证码"},domProps:{value:e.sms_code},on:{input:function(t){t.target.composing||(e.sms_code=t.target.value)}}}),e._v(" "),o("span",{staticClass:"get_sms",on:{click:e.send_sms}},[e._v(e._s(e.get_sms_text))])]),e._v(" "),o("button",{staticClass:"register_btn",on:{click:e.registerHandler}},[e._v("注册")]),e._v(" "),o("p",{staticClass:"go_login"},[e._v("已有账号 "),o("router-link",{attrs:{to:"/login"}},[e._v("直接登录")])],1)])])])])},staticRenderFns:[]};var a=o("VU/8")(n,r,!1,function(e){o("8V2g")},"data-v-a00bbb8a",null);t.default=a.exports},f1Eh:function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},wmSr:function(e,t,o){"use strict";(function(e){var o,s;o="undefined"!=typeof window?window:this,s=function(e,t){if(void 0===e)throw new Error("Geetest requires browser environment");var o=e.document,s=e.Math,n=o.getElementsByTagName("head")[0];function r(e){this._obj=e}function a(e){var t=this;new r(e)._each(function(e,o){t[e]=o})}r.prototype={_each:function(e){var t=this._obj;for(var o in t)t.hasOwnProperty(o)&&e(o,t[o]);return this}},a.prototype={api_server:"api.geetest.com",protocol:"http://",type_path:"/gettype.php",fallback_config:{slide:{static_servers:["static.geetest.com","dn-staticdown.qbox.me"],type:"slide",slide:"/static/js/geetest.0.0.0.js"},fullpage:{static_servers:["static.geetest.com","dn-staticdown.qbox.me"],type:"fullpage",fullpage:"/static/js/fullpage.0.0.0.js"}},_get_fallback_config:function(){return i(this.type)?this.fallback_config[this.type]:this.new_captcha?this.fallback_config.fullpage:this.fallback_config.slide},_extend:function(e){var t=this;new r(e)._each(function(e,o){t[e]=o})}};var i=function(e){return"string"==typeof e},c={},l={},u=function(e,t,o,s){t=function(e){return e.replace(/^https?:\/\/|\/$/g,"")}(t);var n=function(e){return 0!==(e=e.replace(/\/+/g,"/")).indexOf("/")&&(e="/"+e),e}(o)+function(e){if(!e)return"";var t="?";return new r(e)._each(function(e,o){(i(o)||function(e){return"number"==typeof e}(o)||function(e){return"boolean"==typeof e}(o))&&(t=t+encodeURIComponent(e)+"="+encodeURIComponent(o)+"&")}),"?"===t&&(t=""),t.replace(/&$/,"")}(s);return t&&(n=e+t+n),n},d=function(e,t,s,r,a){var i=function(c){!function(e,t){var s=o.createElement("script");s.charset="UTF-8",s.async=!0,s.onerror=function(){t(!0)};var r=!1;s.onload=s.onreadystatechange=function(){r||s.readyState&&"loaded"!==s.readyState&&"complete"!==s.readyState||(r=!0,setTimeout(function(){t(!1)},0))},s.src=e,n.appendChild(s)}(u(e,t[c],s,r),function(e){e?c>=t.length-1?a(!0):i(c+1):a(!1)})};i(0)},p=function(t,o,n,r){if("object"==typeof(a=n.getLib)&&null!==a)return n._extend(n.getLib),void r(n);var a;if(n.offline)r(n._get_fallback_config());else{var i="geetest_"+(parseInt(1e4*s.random())+(new Date).valueOf());e[i]=function(t){"success"===t.status?r(t.data):t.status?r(n._get_fallback_config()):r(t),e[i]=void 0;try{delete e[i]}catch(e){}},d(n.protocol,t,o,{gt:n.gt,callback:i},function(e){e&&r(n._get_fallback_config())})}},f=function(e,t){var o={networkError:"网络错误"};if("function"!=typeof t.onError)throw new Error(o[e]);t.onError(o[e])};e.Geetest&&(l.slide="loaded");var v=function(t,o){var s=new a(t);t.https?s.protocol="https://":t.protocol||(s.protocol=e.location.protocol+"//"),p([s.api_server||s.apiserver],s.type_path,s,function(t){var n=t.type,r=function(){s._extend(t),o(new e.Geetest(s))};c[n]=c[n]||[];var a=l[n]||"init";"init"===a?(l[n]="loading",c[n].push(r),d(s.protocol,t.static_servers||t.domains,t[n]||t.path,null,function(e){if(e)l[n]="fail",f("networkError",s);else{l[n]="loaded";for(var t=c[n],o=0,r=t.length;o<r;o+=1){var a=t[o];"function"==typeof a&&a()}c[n]=[]}})):"loaded"===a?r():"fail"===a?f("networkError",s):"loading"===a&&c[n].push(r)})};return e.initGeetest=v,v},"object"==typeof e&&"object"==typeof e.exports?e.exports=o.document?s(o):function(e){if(!e.document)throw new Error("Geetest requires a window with a document");return s(e)}:s(o),t.a=initGeetest}).call(t,o("f1Eh")(e))}});
//# sourceMappingURL=4.f74d8332553c36e2524a.js.map