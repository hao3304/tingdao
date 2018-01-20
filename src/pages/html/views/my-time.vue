<template>
    <div class="view-time">
        <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-right="onClickRight" @click-left="onClickLeft"  left-arrow title="定时关闭"  >
           <a href="#" slot="right">确定</a>
        </van-nav-bar>
        <div class="content">
            <p>计时结束后，将停止播放</p>
            <div class="row">
                <van-radio-group class="demo-radio" v-model="value">
                    <van-cell-group>
                        <van-cell><van-radio name="0">不开启</van-radio></van-cell>
                        <van-cell v-for="l in list"><van-radio :name="l">{{l}}分钟后</van-radio></van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .view-time{
        height: 100%;
        overflow-y: hidden;
        .van-nav-bar::after{
            border-width: 0;
        }


        .content{
            padding-left: px2rem(40);
            padding-right: px2rem(40);

            p{
                text-align: center;
                padding: 0;
                margin-top: px2rem(47);
                margin-bottom: px2rem(48);
                font-size: px2rem(24);
                color: #777777;
            }

            .van-hairline--top-bottom::after{
                border-width: 0;
            }
            .row{
                box-shadow: 0px px2rem(20) px2rem(50) 0px
                rgba(0, 0, 0, 0.1);

                .van-cell{
                    height: px2rem(96);
                    line-height: px2rem(96);
                    padding: 0 px2rem(40);
                    font-size: px2rem(34);
                    .van-radio {
                        .van-icon-check,.van-icon-checked{
                            position: absolute;
                            top:px2rem(32);
                            right: px2rem(40);
                        }
                    }
                }
            }

        }
        .demo-radio{background:#fff}.demo-radio .van-radios{padding:0 20px}.demo-radio .van-radios .van-radio{margin:10px 0}.demo-radio .van-cell .van-radio__input{float:right;position:static}.demo-radio .van-cell .van-radio__label{margin:0}
    }

</style>
<script>
    import PullTo from 'vue-pull-to';
    import {getVideo,src} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop'],
        data(){
            return {
                src:src,
                value:"0",
                list:[10,20,30,60,90]

            }
        },
        methods:{
            onClickLeft(){
                api.closeWin();
            },
            onClickRight(){
                this.$ls.set("close-time",this.value);
                api.closeWin();
            }
        },
        components:{
            PullTo
        },
        mounted(){

        }
    }
</script>