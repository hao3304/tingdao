<template>
    <div class="view-interact">
        <van-nav-bar :style="{paddingTop:paddingTop}" id="header" :title="video.name"  @click-left="onShowList" >
      <span slot="right" class="header-button" >
          <img src="../../../assets/images/btn_live_OFF@3x.png" alt="">
      </span>
            <span slot="left" class="header-button"  >
                <img src="../../../assets/images/ico_navbar_menu@3x.png" alt="">
            </span>
        </van-nav-bar>

        <div class="main">
            <section class="base-block" >
                <p>
                    <img src="../../../assets/images/ico_playing_S@3x.png" alt="">
                    <span>{{video.video_play==1?'正在播放':'暂无节目'}}</span>
                </p>
                <div class="news" @click="openActivityList">
                    <div class="icon">
                        <img src="../../../assets/images/ico_remind@3x.png" alt="">
                    </div>
                    <div class="content">
                        <h5>{{video.activity.title}}</h5>
                        <p>{{video.activity.stat == 0?'已结束':'正在进行中'}}</p>
                    </div>
                    <div class="arrow">
                        <img src="../../../assets/images/ico_more@3x.png" alt="">
                    </div>
                </div>

            </section>

            <section class="player-block" :style="playBg">
                <span class="play-button" :class="interact_status" v-ripple @click="onPlay">

                </span>
                <h5>{{video.video_title}}</h5>
                <p>{{video.video_time}}</p>
            </section>

            <section class="voice-block">
                <div class="voice-circle" :class="{'speech':speech}" @click="onSpeech" >
                    <p>&nbsp;</p>
                    <h5>开启语音互动</h5>
                </div>
                <span class="voice-tag" @click.stop="onText">
                    字
                </span>
            </section>
        </div>


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
                <span @click="onCloseSpeech" class="voice-circle">
                    <p>&nbsp;</p>
                    <h5>发送</h5>
                </span>
                <span class="voice-tag" @click.stop="onCancelSpeech">
                    <i class="iconfont  icon-guanbi"></i>
                </span>
            </div>
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

<script>
    //    var speech = api.require('speechRecognizer');
    import {getVideo,getVideoDetail,src, base ,postVoice,getPath,getPush} from '../index/services';
    import { Toast } from 'vant';
    import vDialog from '../components/vDialog.vue';
    export default {
        store:['paddingTop','interact_status','fm_playing'],
        data(){
            return {
                video:{
                    live:0,
                    name:'',
                    video_title:'',
                    video_time:'',
                    video_url:'',
                    pic:'',
                    video_play:0, //0无节目 1正在播放
                    id:'',
                    activity:{
                        title:'',
                        stat:'',
                        id:''
                    }
                },
                wordStr:'',
                speech:false,
                volume:1,
                dialog:false,
                pushInfo:{
                    "id":"",
                    "type": 0,
                    "img": "",
                    "title": "",
                    "url": "",
                    "brief": "",
                    "show_time": 0
                },
                src:src
            }
        },
        components:{
            vDialog
        },
        computed:{
            playBg(){
                return this.video.pic == ''?null:{
                    backgroundImage:`url(${src}${this.video.pic})`
                };
            },
            volumeNum(){
                var n =  this.volume/4;
                return parseInt(n)||1;
            }
        },
        methods:{
            onSpeech(){
                this.speech = true;
                var speech = api.require('speechRecognizer');
//                api.startPlay({
//                    path:'widget://voice/di.mp3'
//                });

//                Toast.fail({
//                    duration:0,
//                    message:"开始说话",
//                });

                speech.record({
                    audioPath: 'fs://speechTest/speech.wav'
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
            onCancelSpeech(){
              this.speech = false;
                var speech = api.require('speechRecognizer');
                speech.stopRecord();
            },
            onCloseSpeech(){
                Toast.clear();
                this.speech = false;
                var speech = api.require('speechRecognizer');
                speech.stopRecord();
                Toast.loading();
                setTimeout(()=>{
                    api.ajax({
                        url:base +'/radio/voice/upload',
                        method: 'post',
                        dataType: 'json',
                        returnAll:false,
                        data:{
                            files:{file:'fs://speechTest/speech.wav'},
                            values:{token:this.$ls.get('token')}
                        }
                    }, (ret,err)=> {
                        if(ret.code ==0) {
                            let url = ret.response.src;
                            postVoice({
                                token:this.$ls.get('token'),
                                type:0,
                                voice_url:url,
                                text:this.wordStr
                            }).then(rep=>{
                                Toast.clear();
                                Toast.success({message:"留言成功",duration:1000})
                            })
                        }
                    })
                },200)

            },
            onShowList() {
                api.openWin({
                    name: 'test',
                    url: getPath() + '/html/index.html?path=list',
                    pageParam:{
                        name:'test'
                    }
                });
            },
            playVideo(path){
                var audio = api.require('audio');
                this.fm_playing = false;
                Toast.loading({ mask: false });
                audio.play({
                    path:path
                }, function(ret, err) {
                    Toast.clear();
                });
            },
            pauseVideo(){
                var audio = api.require('audio');
                audio.stop();
            },
            onPlay(){
                this.interact_status = this.interact_status == 'pause'?'play':'pause';
            },
            render(id){
                getVideoDetail(id).then(rep=>{
                    Toast.clear();
                    this.video = rep;
                    this.onPlay();
                })
            },
            onText(){

                api.openWin({
                    name: 'test',
                    url:getPath() + '/html/index.html?path=textarea',
                    pageParam:{
                        name:'test'
                    },
                    animation:{
                        type:'movein',
                        subType:'from_bottom'
                    }
                });
            },
            openActivityList(){
                api.openWin({
                    name: 'test',
                    url:getPath() + '/html/index.html?path=activity',
                    pageParam:{
                        id:this.video.id
                    },
                });
            }
        },
        watch:{
            speech(b){
                var audio = api.require('audio');
                if(b) {
                    if(this.interact_status == 'pause') {
                        audio.pause();
                    }
                }else{
                    if(this.interact_status == 'pause') {
                        audio.play();
                    }
                }
            },
            interact_status(s){
                if(s == 'pause') {
                    this.playVideo(this.video.video_url);
                }else {
                    this.pauseVideo();
                }
            }
        },
        mounted(){
            var audio = api.require('audio');
            var push = api.require('push');
            push.setListener(( ret, err )=>{
                if( ret ){
                    let id = ret.data[0];
                    getPush(id).then(rep=>{
                        this.pushInfo = rep;
                        this.dialog = true;
                    })
                }
            });
            Toast.loading({ mask: false });
            getVideo().then(rep=>{
                if(rep.total>0) {
                    let current = this.$ls.get('currentId');
                    this.render(current||rep.data[0].id);
                }
            });
            this.$ls.on("currentId", (rep) =>{
                audio.stop();
                this.interact_status = 'play';
                this.render(rep);
            });

        }
    }
</script>

<style lang="sass"  type="text/scss" >
    @import "../../../public/px2rem.scss";
    .view-interact{
        .pull-info-img{
            max-height: px2rem(320);
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
                top:50%;
                left: 50%;
                background-color: rgba(0,0,0,.7);
                height: px2rem(400);
                width: px2rem(440);
                margin-left: - px2rem(220);
                margin-top: - px2rem(300);
                border-radius: px2rem(20);

                .content{
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
                top:px2rem(860);
                width: 100%;

                .voice-tag{
                    display: inline-block;
                    width: px2rem(112);
                    text-align: center;
                    line-height: px2rem(112);
                    height: px2rem(112);
                    background-color: #fce76c;
                    border-radius: 50%;
                    position: absolute;
                    top:px2rem(0);
                    font-size: px2rem(46);
                    color: #262628;
                    left: px2rem(461);

                }

                .voice-circle{
                    width: px2rem(320);
                    height: px2rem(320);
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
                    background-size: px2rem(140) px2rem(140);
                    background-color: #fff;
                    &.speech{
                        background-color: #f1f1f1;
                    }
                    >p{
                        text-align: center;
                        font-size: px2rem(24);
                        margin: 0;
                        padding-top: px2rem(54);
                        color: rgba(38,38,40,0.4);
                    }
                    >h5{
                        margin-top: px2rem(145);
                        text-align: center;
                        color: #262628;
                        font-size: px2rem(24);
                    }

                }
            }

        }

        .van-nav-bar__right,.van-nav-bar__left{
            width: px2rem(160) !important;
        }
        .van-nav-bar__left{
            text-align: left;
            padding-left: px2rem(34);
        }

        .header-button{
            display: inline-block;
            padding-top:px2rem(16);
            img{
                height:px2rem(56);
            }
        }

        .van-hairline--top-bottom::after{
            border-width: 0;
        }
        .main{
            position:relative;
            padding-top: px2rem(24);
        }
        .base-block{

            position: relative;
            margin-left:px2rem(72);
            margin-right:px2rem(72);
            height:px2rem(616);
            background-color:#fff;
            box-shadow: 0px px2rem(20) px2rem(50) 0px rgba(0, 0, 0, 0.1);
            >p{
                padding: 0;
                margin:0;

                img{
                    height:px2rem(25);
                    position: absolute;
                    left:px2rem(17);
                    top:px2rem(16);
                }

                span{
                    font-size: px2rem(25);
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: px2rem(28);
                    position: absolute;
                    left:px2rem(56);
                    top:px2rem(16);
                    letter-spacing: 0;
                    color: #777;
                }
            }

            .news{
                &:active{
                    background-color: #efefef;
                }
                position: absolute;
                display: flex;
                bottom: 0;
                height: px2rem(112);
                width: 100%;
                left:0;
                padding: 0 px2rem(16);
                align-items: center;

                .icon{
                    width: px2rem(80);
                    padding-top:px2rem(12);
                    img {
                        width:px2rem(64);
                    }
                }
                .arrow{
                    width: px2rem(80);
                    padding-top:px2rem(12);
                    text-align:center;
                    img{
                        height:px2rem(64);
                    }
                }
                .content{
                    flex: 1;
                    p,h5{
                        margin: 0;
                        padding: 0;
                    }
                    h5{
                        font-size: px2rem(26);
                        font-weight: bold;
                        font-stretch: normal;
                        line-height: px2rem(44);
                        letter-spacing: 0px;
                        color: #262628;
                    }
                    p{
                        font-size: px2rem(24);
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: px2rem(32);
                        letter-spacing: 0px;
                        color: #777777;
                    }
                }
            }
        }
        .player-block{
            position:absolute;
            top:px2rem(80);
            left:px2rem(40);
            right:px2rem(40);
            height:px2rem(448);
            background-repeat:no-repeat;
            background-size:100% 100%;
            padding-top: px2rem(160);
            padding-left: px2rem(40);

            .play-button{
                width: px2rem(100);
                height: px2rem(100);
                display: inline-block;
                border-radius: 50%;

                &.play{
                    background:url(../../../assets/images/tools_play_light@3x.png) no-repeat;
                    background-size:100% 100%;
                }

                &.pause{
                    background:url(../../../assets/images/tools_suspended_light@3x.png) no-repeat;
                    background-size:100% 100%;
                }
            }


            h5{
                font-family: "PingFang-SC-Bold";
                font-size: px2rem(40);
                font-weight: 400;
                font-stretch: normal;
                line-height: px2rem(20);
                margin-top: px2rem(70);
                margin-bottom: px2rem(18);
                color: #262628;
            }
            p{
                font-size: px2rem(26);
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                margin: px2rem(14) 0 0 0;
                color: rgba(0,0,0,.3);
            }
        }
        .voice-block{
            position: relative;
            padding-top: px2rem(80);
            .voice-circle{
                width: px2rem(320);
                height: px2rem(320);
                background:url(../../../assets/images/Wechat.png) no-repeat;
                background-position: center center;
                background-size: px2rem(140) px2rem(140);
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
                    padding-top: px2rem(54);
                    color: rgba(38,38,40,0.4);
                }
                h5{
                    margin-top: px2rem(145);
                    text-align: center;
                    color: #262628;
                    font-size: px2rem(24);
                }
            }
            .voice-tag{
                display: inline-block;
                width: px2rem(112);
                text-align: center;
                line-height: px2rem(112);
                height: px2rem(112);
                background-color: #fce76c;
                border-radius: 50%;
                position: absolute;
                top:px2rem(81);
                font-size: px2rem(46);
                color: #262628;
                left: px2rem(461);

            }
        }
    }

</style>
