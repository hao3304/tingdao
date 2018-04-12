<template>
    <div class="activity-list">
        <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft"  left-arrow title="最新活动"  >

        </van-nav-bar>
        <div class="content">
            <van-pull-refresh style="height: 100%" v-model="isLoading">
            <ul class="list">
                <li class="item" v-for="l in list" @click="onSelect(l)">
                    <a href="javascript:;" v-ripple>

                        <div class="left">
                            <h5>{{l.title}}</h5>
                            <p>{{l.type == 0?'已结束':'正在进行中'}}</p>
                        </div>
                        <div class="right">
                            <van-icon name="arrow"></van-icon>
                        </div>
                    </a>
                </li>
            </ul>
            </van-pull-refresh>
        </div>

        <vDialog v-model="dialog"
                 :type="pushInfo.type"
                 :time="pushInfo.show_time"
                 :url="pushInfo.url"
                 :id="pushInfo.id"
        >
            <div slot="title">
                {{pushInfo.title}}
            </div>
            <span slot="body">
                <img class="pull-info-img" style="width: 100%" :src="src+ pushInfo.img" alt="">
                <p>
                    {{pushInfo.brief}}
                </p>
            </span>
        </vDialog>
    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .activity-list{
        height: 100%;
        overflow-y: hidden;
        .van-hairline--bottom::after{
            border: none;
        }

        >.content{
            overflow: hidden;
            padding-bottom: px2rem(188);
            padding-left: px2rem(40);
            padding-right: px2rem(40);
            height: 100%;
            .van-pull-refresh__track{
                height: 100%;
            }
            ul.list{
                padding-top: px2rem(48);
                li{
                    display: block;
                    height: px2rem(120);
                    background-color: #ffffff;
                    box-shadow: 0 px2rem(20) px2rem(50) 0
                    rgba(0, 0, 0, 0.1);
                    border-right:px2rem(1) solid rgba(0,0,0,.1);
                    margin-bottom: px2rem(20);
                    padding: 0 px2rem(40);
                    border-left: px2rem(8) solid #ffd164;

                    a{
                        display: flex;
                        .left{
                            flex: 1;
                            height: 100%;
                            h5{
                                margin-top:px2rem(25);
                                margin-bottom: 0;
                                padding: 0;
                                font-size: px2rem(34);
                                font-weight: normal;
                                color: #262628;
                            }
                            p{
                                font-size: px2rem(26);
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: px2rem(32);
                                letter-spacing: 0px;
                                color: #777777;
                            }
                        }
                        .right{
                            width: px2rem(60);
                            text-align: right;
                            padding-top: px2rem(24);
                            .van-icon{
                                color: #dddddd;
                                font-size: px2rem(20);
                            }
                        }
                    }
                }
            }
        }
    }

</style>
<script>
    import PullTo from 'vue-pull-to';
    import {getActivity,src} from '../index/services';
    import { Toast } from 'vant';
    import vDialog from '../components/vDialog.vue';
    export default {
        store:['paddingTop'],
        data(){
            return {
                list:[],
                src:src,
                isLoading:false,
                pushInfo:{},
                dialog:false
            }
        },
        methods:{
            refresh(loaded){
                setTimeout(()=>{
                    loaded('done');
                },2000)
            },
            onClickLeft(){
                api.closeWin();
            },
            onSelect(node){
                this.pushInfo = node;
                this.dialog = true;
            }
        },
        watch: {
            isLoading() {
                if (this.isLoading) {
                    setTimeout(() => {
                        this.isLoading = false;
                        this.count++;
                    }, 500);
                }
            }
        },
        components:{
            PullTo,
            vDialog
        },
        mounted(){
            getActivity({id:1||api.pageParam.id}).then( (rep) =>{
                this.list = rep.data;
            })
        }
    }
</script>