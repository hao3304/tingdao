
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import 'swiper/dist/css/swiper.css'
import VueLocalStorage from 'vue-ls';
import './tools';
import Ripple from 'vue-ripple-directive';

import vueTouch from 'vue-plugin-touch';
Vue.use(vueTouch);

import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage)

import FastClick from 'fastclick';

FastClick.attach(document.body);
const options = {
    namespace: 'tingdao__'
};

import VueStash from 'vue-stash';

Vue.use(VueStash);

Vue.use(VueLocalStorage, options);
Ripple.color = 'rgba(255, 255, 255, 0.35)';
Vue.directive('ripple', Ripple);
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.use(VueRouter);
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

router.beforeEach((to, from, next) => {
    if(to.path == '/login') {
        return next();
    }
    if(Vue.ls.get('token')) {
        return next();
    }else{
        return next('/login');
    }
});


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

window.apiready = function() {
    new Vue({
        router,
        el: '#app',
        data:{
            store: {
                token:'',
                paddingTop:api.systemType=='ios'?'20px':'25px'
            }
        },
        template:`
         <router-view></router-view>
        `,
        created(){
            if(this.$ls.get("token")) {
                this.store.token = this.$ls.get("token");
                var path = GetQueryString('path');
                if(path){
                    this.$router.replace('/'+path);
                }else if(this.$route.path == ''|| this.$route.path =='/'){
                    this.$router.push('/app');
                }
            }
        }
    })
}

if(window.location.search.indexOf('debug')>-1) {
    new Vue({
        router,
        el: '#app',
        data:{
            store: {
                token:''
            }
        },
        template:`
         <router-view></router-view>
        `,
        created(){
            if(this.$ls.get("token")) {
                this.store.token = this.$ls.get("token");
                var path = GetQueryString('path');
                if(path){
                    this.$router.replace('/'+path);
                }else if(this.$route.path == ''|| this.$route.path =='/'){
                    this.$router.push('/app');
                }
            }
        }
    })
}
