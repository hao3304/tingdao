import interact from '../views/interact.vue';
import fm from '../views/fm.vue'
import my from '../views/my.vue'
import live from '../views/live.vue'
import login from '../views/login.vue'
import vlist from '../views/vlist.vue';
import textarea from '../views/textarea.vue';
import app from '../index/app.vue';
import my_activity from '../views/my-activity.vue';
import activity from '../views/activity.vue';

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
    }
]
