!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="../",t(t.s=140)}({120:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(126),a=(n.n(r),n(121));window.apiready=function(){var e=document.getElementById("header");document.getElementById("content");n.i(a.a)(e);var t=api.pageParam,r=t.url,i=t.title;document.getElementById("title").innerHTML=i;var o=0;"ios"==api.systemType?api.openFrame({name:"frame",url:r,rect:{x:0,y:n.i(a.b)("header"),w:"auto",h:"auto"},pageParam:t,bounces:!1,vScrollBarEnabled:!0,hScrollBarEnabled:!0}):api.addEventListener({name:"viewappear"},function(e,i){o<1&&api.openFrame({name:"frame",url:r,rect:{x:0,y:n.i(a.b)("header"),w:"auto",h:"auto"},pageParam:t,bounces:!1,vScrollBarEnabled:!0,hScrollBarEnabled:!0}),o++}),document.getElementById("back").addEventListener("tap",function(){api.closeWin()})}},121:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i});var r=function(e){if("ios"==api.systemType){var t=api.systemVersion,n=parseInt(t,10),r=api.fullScreen,a=api.iOS7StatusBarAppearance;n>=7&&!r&&a&&(e.style.paddingTop="1rem",e.style.height="3.2rem")}},a=function(e){var t=api.systemType;if("ios"==t)r(e);else if("android"==t){var n=api.systemVersion;(n=parseFloat(n))>=4.4&&(e.style.paddingTop="1.36rem",e.style.height="3.56rem",e.style.lineHeight="2.2rem")}},i=function(e){return document.getElementById(e).offsetHeight}},126:function(e,t){},140:function(e,t,n){e.exports=n(120)}});