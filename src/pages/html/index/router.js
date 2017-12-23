import interact from '../views/interact.vue';
import fm from '../views/fm.vue'
import my from '../views/my.vue'
import live from '../views/live.vue'

export default  [
  {
    path:'/',component:interact,
  },{
    path:'/fm',component:fm,
  },{
    path:'/my',component:my,
  },{
    path:'/live',component:live,
  }
]
