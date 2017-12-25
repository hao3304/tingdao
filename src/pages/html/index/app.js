import App from './app.vue';
import Vue from 'vue';
import vTap from 'v-tap';
import VueRouter from 'vue-router';
import routes from './router';
import 'swiper/dist/css/swiper.css'

import './tools';

import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.use(VueRouter);
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

Vue.use(vTap); //添加vue tap事件

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

window.apiready = function() {
    new Vue({
        router,
        el: '#app',
        render: h => h(App)
    })
}

if(window.location.search.indexOf('debug')>-1) {
    new Vue({
        router,
        el: '#app',
        render: h => h(App)
    })
}
