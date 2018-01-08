<template>

    <div class="view-fm">
        <van-nav-bar title="我的私人FM" :style="{'paddingTop':paddingTop}" >
        </van-nav-bar>
        <div class="container">
            <swiper  :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(n,index) in list">
                    <div class="content" :style="{backgroundImage:'url('+ src + n.img +')'}">
                        <div class="toolbar">
                            <a href="#">
                                <img src="../../../assets/images/ico_like@3x.png" alt="">
                            </a>
                            <a href="#">
                                <img src="../../../assets/images/ico_del_W@3x.png" alt="">
                            </a>
                        </div>
                        <div class="time" v-show="index == active">
                            <span class="now">{{current}}</span>
                            <span class="total">{{duration}}</span>
                        </div>
                    </div>

                </swiper-slide>
            </swiper>

            <div class="player-block">
                <h5>
                    {{info.name}}
                </h5>
                <!--<p>-->
                    <!--17:15 /周二-->
                <!--</p>-->
                <ul>
                    <li>
                        <a href="#"  v-ripple  class="tools-back" @click="onPrev">
                            <img src="../../../assets/images/tools_back@3x.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a v-ripple href="#" class="player-btn"  @click="onPlayer" >
                            <img :src="play_src" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="#"  v-ripple  class="tools-next" @click="onNext">
                            <img src="../../../assets/images/tools_next@3x.png" alt="">
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>
<script>
    import {getVideo,src,fmSrc} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop','token','interact_status','fm_playing'],
        data(){
            let active = this.$ls.get('fm_active',0);
            return {
                src:src,
                swiperOption:{
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows : false
                    },
                    on:{
                        slideChange:(x)=>{
                            this.onChange();
                        }
                    }
                },
                info:{
                    "id": "",
                    "name": "",
                    "img": "",
                    "count": "1",
                    "brief": "",
                    "audio_link": "",
                    "play_time": 0,
                    "play_count": 0,
                    "position": 1
                },
                current:'00:00',
                duration:'00:00',
                list:[],
                active:active
            }
        },
        watch:{
            active(a){
                this.$ls.set('fm_active',a);
            }
        },
        methods:{
            onPlayer(){
                var audio = api.require('audio');
                if(this.fm_playing) {
                    audio.pause();
                }else{
                    this.interact_status = 'play';
                   setTimeout(()=>{
                       audio.play({
                           path: fmSrc + this.info.audio_link
                       }, (ret, err) =>{
                           if(!err){
                               this.duration = new Date(ret.duration*1000).Format('mm:ss');
                               this.current = new Date(ret.current*1000).Format('mm:ss');
                           }else{
                               this.stopPlay();
                               this.onPlayer();
                           }
                       });
                   },1)
                }
                this.fm_playing = !this.fm_playing;
            },
            stopPlay(){
                var audio = api.require('audio');
                this.current = '00:00';
                this.duration = '00:00';
                audio.stop();
                this.fm_playing = false;
            },
            render(){
                Toast.loading();
                getVideo({token:this.token}).then( (rep)=>{
                    this.list = rep;
                    this.info = this.list[this.active];
                    this.swiper.slideTo(this.active);
                    Toast.clear();
                })
            },
            onNext(){
                this.swiper.slideNext();
                this.onChange();
            },
            onPrev() {
                this.swiper.slidePrev();
                this.onChange();
            },
            onChange(){
                setTimeout(()=>{
                    this.info = this.list[this.swiper.activeIndex];
                    this.active = this.swiper.activeIndex;
                    this.stopPlay();
                    this.onPlayer();
                },400)
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            play_src:function(){
                return this.fm_playing?require("../../../assets/images/tools_btn_pause.png"):require("../../../assets/images/tools_btn_play.png");
            }
        },
        mounted() {

            this.render();

        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    @import "../../../public/px2rem.scss";
    .view-fm{
        .van-hairline--top-bottom::after{
            border-width: 0;
        }
        .container{
            padding-top: px2rem(48);
            position: relative;

            .toolbar{
                padding: px2rem(42) px2rem(42) 0 px2rem(42);
                display: flex;
                justify-content: space-between;
                a{
                    img{
                        width: px2rem(60);
                    }
                }
            }

            .time{
                position: absolute;
                left: px2rem(450);
                color: #fff;
                top:px2rem(511);
                width: px2rem(166);
                display: flex;
                justify-content: space-between;
                span{
                    font-size: px2rem(26);
                }
                span.total{
                    opacity: .5;
                }
            }

            .player-block{
                padding-top: px2rem(29);
                h5{
                    margin: 0;
                    text-align: center;
                    font-size: px2rem(40);
                    letter-spacing: 0px;
                    color: #262628;
                }
                p{
                    text-align: center;
                    font-size: px2rem(26);
                    font-weight: normal;
                    letter-spacing: 0px;
                    color: #777777;
                    margin-top: px2rem(15);
                }
                ul{
                    height: px2rem(120);
                    width: px2rem(372);
                    margin: px2rem(69) auto 0 auto;
                    display: flex;
                    font-size: 0;
                    justify-content: space-between;
                    align-items: center;
                    li {
                        a{
                            display: block;
                        }
                        .player-btn{
                            display: block;
                            border-radius: 50%;
                            img{
                                width: px2rem(120);
                                height: px2rem(120);
                            }
                        }
                        .tools-next,.tools-back{
                            img{
                                width: px2rem(50);
                            }
                        }

                    }
                }
            }
        }

        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 88%;
            height: px2rem(676);

            padding:0 3%;
            .content{
                height: px2rem(590);
                box-shadow: 0px px2rem(20) px2rem(50) 0px
                rgba(0, 0, 0, 0.1);
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
    }

</style>
