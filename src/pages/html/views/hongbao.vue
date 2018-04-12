<template>
    <div class="view-hongbao">
        <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft"  title=""  >
        </van-nav-bar>
        <div  class="content" :style="{backgroundImage:'url('+src +'/' + lucky.img+')'}">

            <div class="speech-modal" v-show="speech">
                <div class="speech-body">
                    <div class="content">
                        <div class="left">
                            <i class="iconfont icon-maikefeng1"></i>
                        </div>
                        <div class="right">

                            <ul>
                                <li v-for="n in volumeNum"></li>
                            </ul>
                        </div>
                    </div>
                    <p>请开始说话</p>
                </div>
                <div class="speech-footer">
                <span class="voice-circle" @click="onCloseSpeech">
                    <p>&nbsp;</p>
                    <h5>发送</h5>
                </span>
                    <span class="voice-tag" @click.stop="onCancelSpeech">
                    <i class="iconfont  icon-guanbi"></i>
                </span>
                </div>
            </div>
            <section class="voice-block">
                <div class="voice-circle" @click="onHan" :class="{'speech':speech}"  >
                    <p>&nbsp;</p>
                    <h5>我来喊!</h5>
                </div>
            </section>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .view-hongbao{
        height: 100%;
        overflow-y: hidden;
        .van-hairline--bottom::after{
            border: none;
        }

        .van-nav-bar__left .van-icon{
            color: #fff;
        }
        .content{
            position: absolute;
            top:0;
            left: 0;
            height: 100%;
            right: 0;
            background-size: 100%;

            .button{
                position: absolute;
                bottom:px2rem(155);
                width: px2rem(350);
                left: 50%;
                margin-left: px2rem(-175);
                border-radius: px2rem(50);
            }

            .voice-block{
                position: absolute;
                bottom: px2rem(80);
                left: 50%;
                transform: translateX(-50%);
                .voice-circle{
                    width: px2rem(260);
                    height: px2rem(260);
                    background:url(../../../assets/images/Wechat.png) no-repeat;
                    background-position: center center;
                    background-size: px2rem(100) px2rem(100);
                    background-color: #fb5b3a;

                    box-shadow: 0px 0px px2rem(40) 0px
                    rgba(0, 0, 0, 0.05);
                    border: solid 2px #fce76c;
                    margin: 0 auto;
                    border-radius: 50%;
                    position: relative;
                    &.speech{
                        background-color: #f1f1f1;
                    }
                    p{
                        text-align: center;
                        font-size: px2rem(24);
                        margin: 0;
                        padding-top: px2rem(14);
                        color: rgba(38,38,40,0.4);
                    }
                    h5{
                        margin-top: px2rem(145);
                        text-align: center;
                        color: #fff;
                        font-size: px2rem(30);
                    }
                }

            }

            .speech-modal{
                position: fixed;
                top:0;
                bottom:0;
                z-index: 1000;
                left: 0;
                right:0;
                background-color: rgba(0,0,0,.4);
                .speech-body{
                    position: absolute;
                    top: px2rem(350);
                    left: 50%;
                    background-color: rgba(0,0,0,.7);
                    height: px2rem(400);
                    width: px2rem(400);
                    margin-left: - px2rem(200);
                    border-radius: px2rem(20);
                    padding-top: px2rem(25);
                    .content{
                        margin-top: px2rem(55);
                        padding: 0 px2rem(10);
                        display: flex;
                        height: px2rem(340);
                        .left{
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding-left: px2rem(20);
                            .iconfont{
                                color: #fff;
                                font-size: px2rem(200);
                            }
                        }
                        .right{
                            flex: 1;
                            display: flex;
                            align-items: flex-end;
                            padding-bottom: px2rem(55);
                            padding-right: px2rem(20);
                            padding-left: px2rem(20);
                            justify-content: center;
                            ul{
                                flex: 1;
                                display: flex;
                                flex-direction: column-reverse;
                                li{
                                    flex: 1;
                                    height: px2rem(28);
                                    border-radius: px2rem(4);
                                    background-color: #fff;
                                    margin-bottom: px2rem(15);
                                }
                                li:nth-child(1){
                                    width: 40%;
                                }
                                li:nth-child(2){
                                    width: 55%;
                                }
                                li:nth-child(3){
                                    width: 70%;
                                }
                                li:nth-child(4){
                                    width: 85%;
                                }
                                li:nth-child(5){
                                    width: 100%;
                                }
                            }
                        }

                    }

                    >p{
                        text-align: center;
                        font-size: px2rem(28);
                        color: #fff;
                    }
                }

                .speech-footer{
                    position: absolute;
                    top:px2rem(990);
                    width: 100%;

                    .voice-tag{
                        display: inline-block;
                        width: px2rem(80);
                        text-align: center;
                        line-height: px2rem(80);
                        height: px2rem(80);
                        background-color: #fce76c;
                        border-radius: 50%;
                        position: absolute;
                        top:px2rem(0);
                        font-size: px2rem(46);
                        color: #262628;
                        left: px2rem(441);

                    }

                    .voice-circle{
                        width: px2rem(260);
                        height: px2rem(260);
                        box-shadow: 0px 0px px2rem(40) 0px
                        rgba(0, 0, 0, 0.05);
                        border: solid 2px #fce76c;
                        margin: 0 auto;
                        border-radius: 50%;
                        position: relative;
                        display: block;
                        text-align: center;
                        background:url(../../../assets/images/Wechat.png) no-repeat;
                        background-position: center center;
                        background-size: px2rem(100) px2rem(100);
                        background-color: #fff;
                        &.speech{
                            background-color: #f1f1f1;
                        }
                        >p{
                            text-align: center;
                            font-size: px2rem(24);
                            margin: 0;
                            padding-top: px2rem(24);
                            color: rgba(38,38,40,0.4);
                        }
                        >h5{
                            margin-top: px2rem(135);
                            text-align: center;
                            color: #262628;
                            font-size: px2rem(32);
                        }

                    }
                }

            }
        }
    }

</style>
<script>
    import {postLucky,src, getLucky} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop','token'],
        data(){
            return {
                list:[],
                src:src,
                isLoading:false,
                lucky:{
                    id:'',
                    img:''
                },
                speech:false,
                volume: 1,
                wordStr:''
            }
        },
        computed:{
            volumeNum(){
                var n =  this.volume/4;
                return parseInt(n)||1;
            }
        },
        methods:{
            onClickLeft(){
                api.closeWin();
            },
            onCancelSpeech() {
                this.speech = false;
                var speech = api.require('speechRecognizer');
                speech.stopRecord();
            },
            onHan() {
                this.speech = true;
                var speech = api.require('speechRecognizer');
                speech.record({
                    audioPath: 'fs://speechTest/han.wav'
                },(ret,err)=>{
                    if(ret.status){
                        this.wordStr = ret.wordStr;
                    }
                });

                speech.addRecordHUD({
                }, (ret, err)=> {
                    this.volume  = ret.volume;
                });
            },
            onCloseSpeech(){
                Toast.clear();
                this.speech = false;
                var speech = api.require('speechRecognizer');
                speech.stopRecord();
                Toast.loading();
                setTimeout(()=>{
                    let p = {
                        token:this.token,
                        lucky_id: this.lucky.id,
                        key: this.wordStr
                    };
                    postLucky(p).then(rep=>{
                        alert(rep.msg);
                        api.closeWin();
                    })
                },200)
//                Toast.loading();

            }
        },
        mounted(){
            let luckid = api.pageParam.id;
            Toast.loading();
            getLucky(luckid).then(rep=>{
                this.lucky = rep;
                Toast.clear();
            })

//            Toast.loading();
//            this.type = this.$route.query.type;
//
//            getVideo().then(rep=>{
//                Toast.clear();
//                this.list = rep.data;
//            })
        }
    }
</script>