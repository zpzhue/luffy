// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// elementUI 导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axios
import axios from 'axios'; // 从node_modules目录中导入包
// 设置axios向服务器发送请求时携带本地数据发送过去（如cookies等）
axios.defaults.withCredentials=true;
// 设置vue的全局子对象
Vue.prototype.$axios = axios; // 把对象挂载vue中

var server = 'webserver';
var port = 8000;
Vue.prototype.$remote_server = `http://${server}:${port}`;


require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
