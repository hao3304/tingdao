import interact from '../views/interact.vue';
import fm from '../views/appfm.vue'
import my from '../views/my.vue'
import live from '../views/live.vue'
import login from '../views/login.vue'
import vlist from '../views/vlist.vue';
import textarea from '../views/textarea.vue';
import app from '../index/app.vue';
import my_activity from '../views/my-activity.vue';
import my_fm from '../views/my-fm.vue';
import my_time from '../views/my-time.vue';
import activity from '../views/activity.vue';
import config from '../views/config.vue';
import radio_live from '../views/radio_live.vue';
import edit from '../views/edit.vue';
import fm_list from '../views/fm_list.vue';
import openfm from '../views/openfm.vue';
import wallet from '../views/wallet.vue';
import hongbao from '../views/hongbao.vue';


export default  [
    {
      path:'/app',component:app,
        children:[
            {
                path:'',component:interact,
            },{
                path:'fm',component:fm,
            },{
                path:'my',component:my,
            },{
                path:'live',component:live,
            }
        ]
    },
    {
        path:'/list',component:vlist
    },
    {
        path:'/login',component:login
    },
    {
        path:'/textarea',component:textarea
    },
    {
        path:'/my-activity',component:my_activity
    },
    {
        path:'/activity',component:activity
    },
    {
        path:'/config',component:config
    },
    {
        path:'/my-fm',component:my_fm
    },
    {
        path:'/my-time',component:my_time
    },
    {
        path:'/radio-live',component:radio_live
    },
    {
        path:'/edit',component:edit
    },
    {
        path:'/fm-list',component:fm_list
    },
    {
        path:'/openfm',component:openfm
    },
    {
        path:'/wallet',component:wallet
    },
    {
        path:'/hongbao',component:hongbao
    }
]
