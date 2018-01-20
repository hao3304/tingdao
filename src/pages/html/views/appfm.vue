<template>
    <div :is="mode" :list="list" @change="onChange">
    </div>
</template>
<script>
    import fm from './fm.vue';
    import openfm from './openfm.vue';
    import { getVideo } from '../index/services';
    import { Toast } from 'vant';

    export default {
        store:['token'],
        data(){
            return {
                mode:'',
                list:[]
            }
        },
        components:{
            fm,
            openfm
        },
        methods:{
            render(){
                Toast.loading();
                getVideo({token:this.token}).then( (rep)=>{
                    this.list = rep;
                    if(this.list.length == 0) {
                        this.mode = 'fm';
                    }else{
                        this.mode = 'openfm';
                    }
//                    this.info = this.list[this.active];
//                    this.swiper.slideTo(this.active);
                    Toast.clear();
                })
            },
            onChange(m) {
                this.mode = m;
            }
        },
        mounted() {
            this.render();
        }
    }
</script>
<style>

</style>