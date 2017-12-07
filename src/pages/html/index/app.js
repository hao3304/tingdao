import App from './app.vue';
import Vue from 'vue';
import vTap from 'v-tap';
Vue.use(vTap); //添加vue tap事件

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

window.apiready = function() {
    new Vue({
        el: '#app',
        render: h => h(App)
    })
}

if(window.location.search.indexOf('debug')>-1) {
    new Vue({
        el: '#app',
        render: h => h(App)
    })
}
