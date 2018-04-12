<template>
    <div :is="mode"  @reload="reload" @change="onChange">
    </div>
</template>
<script>
    import fm from './fm.vue';
    import openfm from './openfm.vue';
    import { getVideo } from '../index/services';
    import { Toast } from 'vant';

    export default {
        store:['token','fm_list'],
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
                    this.fm_list = rep;
                    if(this.fm_list.length == 0) {
                        this.mode = 'openfm';
                    }else{
                        this.mode = 'fm';
                    }
//                    this.info = this.list[this.active];
//                    this.swiper.slideTo(this.active);
                    Toast.clear();
                })
            },
            reload() {
                this.mode = 'openfm';
                this.render();
            },
            onChange(m) {
                this.mode = m;
                this.render();
            }
        },
        mounted() {
            this.render();
            this.$ls.on('refresh',()=>{
                this.render();
            })
        }
    }
</script>
<style>

</style>