<template>
    <div class="v-dialog" v-show="show">
        <transition name="fade">
            <div class="content" v-show="show">
                <a href="#" class="close-btn"  @click="onClose">
                    <i class="iconfont icon-guanbi"></i>
                </a>
                <div class="title">
                    <slot name="title"></slot>
                </div>
                <div class="body">
                    <p>
                       <slot name='body'></slot>
                    </p>
                </div>
                <van-button @click="onClick" bottom-action>{{title}}</van-button>
            </div>
        </transition>
    </div>
</template>
<script>
    import {joinActivity} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['token'],
        props:['value','time','type','url','id'],
        data(){
            return {
                show:this.value,
                timer:null
            }
        },
        watch:{
            value(v){
                this.show = v;

                if(v) {
                    if(this.time) {
                        if(this.timer) {
                            clearInterval(this.timer);
                        }
                      this.timer = setTimeout(()=>{
                            this.onClose();
                        },this.time*1000);

                    }
                }

            }
        },
        computed:{
          title(){
              return this.type == '2'?'立即报名':'查看详情';
          }
        },
        methods:{
            onClose(){
                this.show = false;
                this.$emit("input",false);
            },
            onClick(){
                var browser = api.require('webBrowser');
                Toast.loading();
                joinActivity({token:this.token,id:this.id}).then(rep=>{
                    Toast.clear();
                    if(this.url) {
                        this.onClose();
                        browser.open({
                            url: this.url
                        });
                    }
                })
            }
        }
    }
</script>
<style lang="sass" type="text/scss" scoped>
    @import "../../../public/px2rem.scss";

    .v-dialog{
        position: fixed;
        top:0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 2000;
        background-color: rgba(38, 38, 40, 0.81);

        .content{
            position: absolute;
            background-color: #fff;
            width: px2rem(670);
            /*min-height: px2rem(720);*/
            box-shadow: 0px 20px 50px 0px
            rgba(0, 0, 0, 0.1);
            top:px2rem(256);
            left: 50%;
            margin-left: - px2rem(670/2);
            .title{
                height: px2rem(80);
                font-size: px2rem(34);
                line-height: px2rem(80);
                padding: 0 px2rem(32);
            }
            .close-btn{
                position: absolute;
                height: px2rem(80);
                width: px2rem(80);
                font-size: px2rem(27);
                background-color: #262628;
                color: #fff;
                right: 0;
                top:0;
                line-height: px2rem(80);
                text-align: center;
                &:active{
                    color: #ddd;
                    background-color: #333;
                }
            }

            .body{
                padding: px2rem(40) px2rem(32);
                min-height: px2rem(280);
                p{
                    font-size: px2rem(28);
                    color: #777;
                    line-height: 20px;
                }

            }
            .van-button--bottom-action{
                height: 55px;
                line-height: 55px;
                border: none;
                color: #000;
                background-color: #fce76c;
                font-size: px2rem(34);
            }
        }
    }
</style>