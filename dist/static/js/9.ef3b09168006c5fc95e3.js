webpackJsonp([9],{"7uP+":function(t,e){},tFKX:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"Banner",data:function(){return{banner_list:[]}},created:function(){var t=this;this.$axios.get("http://api.luffycity.cn:8000/home/banner/").then(function(e){t.banner_list=e.data}).catch(function(t){console.log(t)})}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("el-carousel",{attrs:{trigger:"click",height:"720px"}},this._l(this.banner_list,function(t,n){return e("el-carousel-item",{key:n},[e("a",{attrs:{href:t.link}},[e("img",{attrs:{src:t.image}})])])}),1)],1)},staticRenderFns:[]};var i=n("VU/8")(a,r,!1,function(t){n("7uP+")},"data-v-271ca24a",null);e.default=i.exports}});
//# sourceMappingURL=9.ef3b09168006c5fc95e3.js.map