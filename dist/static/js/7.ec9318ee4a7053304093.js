webpackJsonp([7],{jckb:function(M,N){},l6ty:function(M,N,z){"use strict";Object.defineProperty(N,"__esModule",{value:!0});var D=z("GgDs"),j=z("9iUS"),T=z("iqGf"),s={name:"CourseDetail",data:function(){return{video_id:5,course:{},sale_time:0,playerOptions:{playbackRates:[.7,1,1.5,2],autoplay:!1,muted:!1,loop:!1,preload:"auto",language:"zh-CN",aspectRatio:"16:9",fluid:!0,sources:[{type:"video/mp4",src:"http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4"}],poster:"../static/courses/675076.jpeg",width:document.documentElement.clientWidth,notSupportedMessage:"此视频暂无法播放，请稍后再试"}}},components:{Header:D.default,Footer:j.default,videoPlayer:T.videoPlayer},methods:{intervaltimer:function(){var M=this;if(this.sale_time>0)var N=setInterval(function(){M.sale_time<0?clearInterval(N):--M.sale_time},1e3)}},computed:{player:function(){return this.$refs.videoPlayer.player}},created:function(){var M=this;this.$axios.get(this.$remote_server+"/course/"+this.video_id+"/").then(function(N){M.course=N.data,M.playerOptions.poster=N.data.course_img,M.sale_time=N.data.price_service_type.priceservices[0].endtime,M.intervaltimer()}).catch(function(M){console.log(M.response)})}},I={render:function(){var M=this,N=M.$createElement,z=M._self._c||N;return z("div",{staticClass:"detail"},[z("Header"),M._v(" "),z("div",{staticClass:"warp"},[z("div",{staticClass:"course-info"},[z("div",{staticClass:"warp-left",staticStyle:{width:"690px",height:"388px","background-color":"#000"}},[z("video-player",{ref:"videoPlayer",staticClass:"video-player vjs-custom-skin",attrs:{playsinline:!0,options:M.playerOptions},on:{play:function(N){return M.onPlayerPlay(N)},pause:function(N){return M.onPlayerPause(N)}}})],1),M._v(" "),z("div",{staticClass:"warp-right"},[z("h3",{staticClass:"course-title"},[M._v(M._s(M.course.name))]),M._v(" "),z("p",{staticClass:"course-data"},[M._v(M._s(M.course.studys)+"人在学    课程总时长："+M._s(M.course.lessons)+"课时/"+M._s(M.course.pub_lessons)+"小时    难度："+M._s(M.course.level))]),M._v(" "),z("div",{staticClass:"preferential"},[z("p",{staticClass:"price-service",domProps:{innerHTML:M._s(M.course.price_service_type.name)}})]),M._v(" "),z("p",{staticClass:"course-price"},[z("span",[M._v("活动价")]),M._v(" "),z("span",{staticClass:"real-price"},[M._v("¥"+M._s(M.course.real_price))]),M._v(" "),z("span",{staticClass:"old-price"},[M._v("¥"+M._s(M.course.price))])]),M._v(" "),M._m(0)])]),M._v(" "),M._m(1),M._v(" "),z("div",{staticClass:"course-section"},[z("section",{staticClass:"course-section-left",domProps:{innerHTML:M._s(M.course.brief)}})])]),M._v(" "),z("Footer")],1)},staticRenderFns:[function(){var M=this.$createElement,N=this._self._c||M;return N("div",{staticClass:"buy-course"},[N("p",{staticClass:"buy-btn"},[N("span",{staticClass:"btn1"},[this._v("立即购买")]),this._v(" "),N("span",{staticClass:"btn2"},[this._v("免费试学")])]),this._v(" "),N("p",{staticClass:"add-cart"},[N("img",{attrs:{src:z("stH6"),alt:""}}),this._v("加入购物车\n                ")])])},function(){var M=this,N=M.$createElement,z=M._self._c||N;return z("div",{staticClass:"course-tab"},[z("ul",[z("li",{staticClass:"active"},[M._v("详情介绍")]),M._v(" "),z("li",[M._v("课程章节 "),z("span",[M._v("(试学)")])]),M._v(" "),z("li",[M._v("用户评论 (83)")]),M._v(" "),z("li",[M._v("常见问题")])])])}]};var y=z("VU/8")(s,I,!1,function(M){z("jckb")},"data-v-399441d2",null);N.default=y.exports},stH6:function(M,N){M.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMjAgMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjMgKDUxMTY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT7otK3nianovaY8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0i56ys5LqM54mIIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i6K++56iL6K+m5oOFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUxOS4wMDAwMDAsIC00MjIuMDAwMDAwKSIgZmlsbD0iI0Y1QTYyMyIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE1MjUuNzEwMzUsNDM2LjI2IEMxNTI1Ljk2NzE0LDQzNi4yNiAxNTI2LjIxMDQyLDQzNi4zMDY2NjcgMTUyNi40NDAxOCw0MzYuNCBDMTUyNi42Njk5NCw0MzYuNDkzMzMzIDE1MjYuODcyNjcsNDM2LjYyMzMzMyAxNTI3LjA0ODM3LDQzNi43OSBDMTUyNy4yMjQwNiw0MzYuOTU2NjY3IDE1MjcuMzU5MjIsNDM3LjE1MzMzMyAxNTI3LjQ1MzgyLDQzNy4zOCBDMTUyNy41NDg0Myw0MzcuNjA2NjY3IDE1MjcuNTk1NzQsNDM3Ljg0NjY2NyAxNTI3LjU5NTc0LDQzOC4xIEMxNTI3LjU5NTc0LDQzOC4zNTMzMzMgMTUyNy41NDg0Myw0MzguNTkzMzMzIDE1MjcuNDUzODIsNDM4LjgyIEMxNTI3LjM1OTIyLDQzOS4wNDY2NjcgMTUyNy4yMjQwNiw0MzkuMjQzMzMzIDE1MjcuMDQ4MzcsNDM5LjQxIEMxNTI2Ljg3MjY3LDQzOS41NzY2NjcgMTUyNi42Njk5NCw0MzkuNzEgMTUyNi40NDAxOCw0MzkuODEgQzE1MjYuMjEwNDIsNDM5LjkxIDE1MjUuOTY3MTQsNDM5Ljk2IDE1MjUuNzEwMzUsNDM5Ljk2IEMxNTI1LjQ0MDA0LDQzOS45NiAxNTI1LjE5MzM5LDQzOS45MSAxNTI0Ljk3MDM5LDQzOS44MSBDMTUyNC43NDczOCw0MzkuNzEgMTUyNC41NDgwMyw0MzkuNTc2NjY3IDE1MjQuMzcyMzMsNDM5LjQxIEMxNTI0LjE5NjY0LDQzOS4yNDMzMzMgMTUyNC4wNjE0OCw0MzkuMDQ2NjY3IDE1MjMuOTY2ODgsNDM4LjgyIEMxNTIzLjg3MjI3LDQzOC41OTMzMzMgMTUyMy44MjQ5Niw0MzguMzUzMzMzIDE1MjMuODI0OTYsNDM4LjEgQzE1MjMuODI0OTYsNDM3Ljg0NjY2NyAxNTIzLjg3MjI3LDQzNy42MDY2NjcgMTUyMy45NjY4OCw0MzcuMzggQzE1MjQuMDYxNDgsNDM3LjE1MzMzMyAxNTI0LjE5NjY0LDQzNi45NTY2NjcgMTUyNC4zNzIzMyw0MzYuNzkgQzE1MjQuNTQ4MDMsNDM2LjYyMzMzMyAxNTI0Ljc0NzM4LDQzNi40OTMzMzMgMTUyNC45NzAzOSw0MzYuNCBDMTUyNS4xOTMzOSw0MzYuMzA2NjY3IDE1MjUuNDQwMDQsNDM2LjI2IDE1MjUuNzEwMzUsNDM2LjI2IFogTTE1MzQuMTQzOSw0MzYuMyBDMTUzNC40MDA2OSw0MzYuMyAxNTM0LjY0NzM1LDQzNi4zNDY2NjcgMTUzNC44ODM4Niw0MzYuNDQgQzE1MzUuMTIwMzgsNDM2LjUzMzMzMyAxNTM1LjMyMzExLDQzNi42NjMzMzMgMTUzNS40OTIwNSw0MzYuODMgQzE1MzUuNjYxLDQzNi45OTY2NjcgMTUzNS43OTYxNSw0MzcuMTkzMzMzIDE1MzUuODk3NTEsNDM3LjQyIEMxNTM1Ljk5ODg4LDQzNy42NDY2NjcgMTUzNi4wNDk1Niw0MzcuODg2NjY3IDE1MzYuMDQ5NTYsNDM4LjE0IEMxNTM2LjA0OTU2LDQzOC4zOTMzMzMgMTUzNS45OTg4OCw0MzguNjMzMzMzIDE1MzUuODk3NTEsNDM4Ljg2IEMxNTM1Ljc5NjE1LDQzOS4wODY2NjcgMTUzNS42NjEsNDM5LjI4MzMzMyAxNTM1LjQ5MjA1LDQzOS40NSBDMTUzNS4zMjMxMSw0MzkuNjE2NjY3IDE1MzUuMTIwMzgsNDM5Ljc1IDE1MzQuODgzODYsNDM5Ljg1IEMxNTM0LjY0NzM1LDQzOS45NSAxNTM0LjQwMDY5LDQ0MCAxNTM0LjE0MzksNDQwIEMxNTMzLjg4NzExLDQ0MCAxNTMzLjY0Mzg0LDQzOS45NSAxNTMzLjQxNDA4LDQzOS44NSBDMTUzMy4xODQzMiw0MzkuNzUgMTUzMi45ODQ5Niw0MzkuNjE2NjY3IDE1MzIuODE2MDIsNDM5LjQ1IEMxNTMyLjY0NzA4LDQzOS4yODMzMzMgMTUzMi41MTE5Myw0MzkuMDg2NjY3IDE1MzIuNDEwNTYsNDM4Ljg2IEMxNTMyLjMwOTIsNDM4LjYzMzMzMyAxNTMyLjI1ODUyLDQzOC4zOTMzMzMgMTUzMi4yNTg1Miw0MzguMTQgQzE1MzIuMjU4NTIsNDM3Ljg4NjY2NyAxNTMyLjMwOTIsNDM3LjY0NjY2NyAxNTMyLjQxMDU2LDQzNy40MiBDMTUzMi41MTE5Myw0MzcuMTkzMzMzIDE1MzIuNjQ3MDgsNDM2Ljk5NjY2NyAxNTMyLjgxNjAyLDQzNi44MyBDMTUzMi45ODQ5Niw0MzYuNjYzMzMzIDE1MzMuMTg0MzIsNDM2LjUzMzMzMyAxNTMzLjQxNDA4LDQzNi40NCBDMTUzMy42NDM4NCw0MzYuMzQ2NjY3IDE1MzMuODg3MTEsNDM2LjMgMTUzNC4xNDM5LDQzNi4zIFogTTE1MzcuNTQ5NzYsNDI0Ljk0IEMxNTM3LjkyODE5LDQyNC45NCAxNTM4LjIyMjE1LDQyNC45OSAxNTM4LjQzMTYzLDQyNS4wOSBDMTUzOC42NDExMiw0MjUuMTkgMTUzOC43ODk3OSw0MjUuMzEzMzMzIDE1MzguODc3NjQsNDI1LjQ2IEMxNTM4Ljk2NTQ5LDQyNS42MDY2NjcgMTUzOS4wMDYwMyw0MjUuNzYzMzMzIDE1MzguOTk5MjgsNDI1LjkzIEMxNTM4Ljk5MjUyLDQyNi4wOTY2NjcgMTUzOC45Njg4Nyw0MjYuMjQgMTUzOC45MjgzMiw0MjYuMzYgQzE1MzguODg3NzcsNDI2LjQ4IDE1MzguODAzMyw0MjYuNzI2NjY3IDE1MzguNjc0OTEsNDI3LjEgQzE1MzguNTQ2NTEsNDI3LjQ3MzMzMyAxNTM4LjQwMTIyLDQyNy44ODMzMzMgMTUzOC4yMzkwNCw0MjguMzMgQzE1MzguMDc2ODYsNDI4Ljc3NjY2NyAxNTM3LjkxODA1LDQyOS4yMiAxNTM3Ljc2MjYzLDQyOS42NiBDMTUzNy42MDcyLDQzMC4xIDE1MzcuNDg4OTQsNDMwLjQ0NjY2NyAxNTM3LjQwNzg1LDQzMC43IEMxNTM3LjIzMjE1LDQzMS4yMzMzMzMgMTUzNy4wMDkxNSw0MzEuNjAzMzMzIDE1MzYuNzM4ODQsNDMxLjgxIEMxNTM2LjQ2ODUzLDQzMi4wMTY2NjcgMTUzNi4xMzc0MSw0MzIuMTIgMTUzNS43NDU0Nyw0MzIuMTIgTDE1MzUuMDU2MTksNDMyLjEyIEwxNTMzLjczODQ0LDQzMi4xMiBMMTUzMi4wMTUyNCw0MzIuMTIgTDE1MzAuMTI5ODYsNDMyLjEyIEwxNTI1LjEwMjE2LDQzMi4xMiBMMTUyNS40MDYyNiw0MzMuOTIgTDE1MzUuNjIzODMsNDMzLjkyIEMxNTM2LjI3MjU2LDQzMy45MiAxNTM2LjU5NjkzLDQzNC4xOTMzMzMgMTUzNi41OTY5Myw0MzQuNzQgQzE1MzYuNTk2OTMsNDM1LjAwNjY2NyAxNTM2LjUzMjczLDQzNS4yMzY2NjcgMTUzNi40MDQzNCw0MzUuNDMgQzE1MzYuMjc1OTQsNDM1LjYyMzMzMyAxNTM2LjAyMjUzLDQzNS43MiAxNTM1LjY0NDEsNDM1LjcyIEwxNTM0LjY3MSw0MzUuNzIgTDE1MzIuNzg1NjEsNDM1LjcyIEwxNTMwLjQ1NDIyLDQzNS43MiBMMTUyOC4wODIyOSw0MzUuNzIgTDE1MjYuMTM2MDgsNDM1LjcyIEwxNTI1LjAyMTA3LDQzNS43MiBDMTUyNC43NTA3Niw0MzUuNzIgMTUyNC41MjQzOCw0MzUuNjYgMTUyNC4zNDE5Myw0MzUuNTQgQzE1MjQuMTU5NDcsNDM1LjQyIDE1MjQuMDA3NDIsNDM1LjI2MzMzMyAxNTIzLjg4NTc4LDQzNS4wNyBDMTUyMy43NjQxNSw0MzQuODc2NjY3IDE1MjMuNjY2MTYsNDM0LjY2NjY2NyAxNTIzLjU5MTgzLDQzNC40NCBDMTUyMy41MTc0OSw0MzQuMjEzMzMzIDE1MjMuNDYwMDUsNDM0IDE1MjMuNDE5NTEsNDMzLjggQzE1MjMuNDA1OTksNDMzLjcyIDE1MjMuMzY4ODIsNDMzLjUyNjY2NyAxNTIzLjMwOCw0MzMuMjIgQzE1MjMuMjQ3MTksNDMyLjkxMzMzMyAxNTIzLjE3Mjg1LDQzMi41MyAxNTIzLjA4NSw0MzIuMDcgQzE1MjIuOTk3MTUsNDMxLjYxIDE1MjIuODk5MTcsNDMxLjA5NjY2NyAxNTIyLjc5MTA0LDQzMC41MyBDMTUyMi42ODI5Miw0MjkuOTYzMzMzIDE1MjIuNTc0OCw0MjkuMzkzMzMzIDE1MjIuNDY2NjgsNDI4LjgyIEMxNTIyLjIwOTg5LDQyNy40NzMzMzMgMTUyMS45MTkzMSw0MjUuOTczMzMzIDE1MjEuNTk0OTQsNDI0LjMyIEwxNTIwLjA3NDQ3LDQyNC4zMiBDMTUxOS44NzE3NCw0MjQuMzIgMTUxOS43MDI4LDQyNC4yNyAxNTE5LjU2NzY0LDQyNC4xNyBDMTUxOS40MzI0OSw0MjQuMDcgMTUxOS4zMjA5OSw0MjMuOTUgMTUxOS4yMzMxNCw0MjMuODEgQzE1MTkuMTQ1MjksNDIzLjY3IDE1MTkuMDg0NDcsNDIzLjUyIDE1MTkuMDUwNjgsNDIzLjM2IEMxNTE5LjAxNjg5LDQyMy4yIDE1MTksNDIzLjA1MzMzMyAxNTE5LDQyMi45MiBDMTUxOSw0MjIuNjUzMzMzIDE1MTkuMDkxMjMsNDIyLjQzMzMzMyAxNTE5LjI3MzY4LDQyMi4yNiBDMTUxOS40NTYxNCw0MjIuMDg2NjY3IDE1MTkuNzAyOCw0MjIgMTUyMC4wMTM2NSw0MjIgTDE1MjAuNDU5NjUsNDIyIEwxNTIwLjg2NTExLDQyMiBMMTUyMS4zNzE5NCw0MjIgTDE1MjIuMDYxMjIsNDIyIEMxNTIyLjMzMTUyLDQyMiAxNTIyLjU0Nzc3LDQyMi4wNCAxNTIyLjcwOTk1LDQyMi4xMiBDMTUyMi44NzIxNCw0MjIuMiAxNTIzLjAwMDUzLDQyMi4zIDE1MjMuMDk1MTQsNDIyLjQyIEMxNTIzLjE4OTc1LDQyMi41NCAxNTIzLjI1NzMyLDQyMi42NjY2NjcgMTUyMy4yOTc4Nyw0MjIuOCBDMTUyMy4zMzg0MSw0MjIuOTMzMzMzIDE1MjMuMzcyMiw0MjMuMDQ2NjY3IDE1MjMuMzk5MjMsNDIzLjE0IEMxNTIzLjQyNjI2LDQyMy4yNDY2NjcgMTUyMy40NTMyOSw0MjMuMzk2NjY3IDE1MjMuNDgwMzIsNDIzLjU5IEMxNTIzLjUwNzM1LDQyMy43ODMzMzMgMTUyMy41MzQzOSw0MjMuOTggMTUyMy41NjE0Miw0MjQuMTggQzE1MjMuNjAxOTYsNDI0LjQyIDE1MjMuNjQyNTEsNDI0LjY3MzMzMyAxNTIzLjY4MzA1LDQyNC45NCBMMTUzNy41NDk3Niw0MjQuOTQgWiIgaWQ9Iui0reeJqei9piI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"}});
//# sourceMappingURL=7.ec9318ee4a7053304093.js.map