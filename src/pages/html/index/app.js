import App from './app.vue';
import Vue from 'vue';
import vTap from 'v-tap';
import VueRouter from 'vue-router';
import routes from './router';
import 'swiper/dist/css/swiper.css'
import Login from '../views/login.vue';
import VueLocalStorage from 'vue-ls';
import './tools';
import Ripple from 'vue-ripple-directive';
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

Vue.use(vTap); //添加vue tap事件

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

window.apiready = function() {
    new Vue({
        router,
        el: '#app',
        data:{
            store: {
                token:'',
                view:'Login'
            }
        },
        template:`
            <div :is="store.view">
            </div>
        `,
        components:{
            Login,
            App
        },
        created(){
            if(this.$ls.get("token")) {
                this.store.token = this.$ls.get("token");
                this.store.view = 'App';
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
                token:'',
                view:'Login'
            }
        },
        template:`
            <div :is="store.view">
            </div>
        `,
        components:{
            Login,
            App
        },
        created(){
            if(this.$ls.get("token")) {
                this.store.token = this.$ls.get("token");
                this.store.view = 'App';
            }
        }
    })
}
