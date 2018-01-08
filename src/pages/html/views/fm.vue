<template>

    <div class="view-fm">
        <van-nav-bar title="我的私人FM" :style="{'paddingTop':paddingTop}" >
        </van-nav-bar>
        <div class="container">
            <swiper  :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="n in 7">
                    <div class="content">
                        <div class="toolbar">
                            <a href="#">
                                <img src="../../../assets/images/ico_like@3x.png" alt="">
                            </a>
                            <a href="#">
                                <img src="../../../assets/images/ico_del_W@3x.png" alt="">
                            </a>
                        </div>
                        <div class="time">
                            <span class="now">{{info.current}}</span>
                            <span class="total">{{info.duration}}</span>
                        </div>
                    </div>

                </swiper-slide>
            </swiper>

            <div class="player-block">
                <h5>
                    背包去旅行
                </h5>
                <p>
                    17:15 /周二
                </p>
                <ul>
                    <li>
                        <a href="#"  v-ripple  class="tools-back">
                            <img src="../../../assets/images/tools_back@3x.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a v-ripple href="#" class="player-btn"  @click="onPlayer" >
                            <img :src="play_src" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="#"  v-ripple  class="tools-next">
                        <img src="../../../assets/images/tools_next@3x.png" alt="">
                        </a>
                    </li>
                </ul>

            </div>

        </div>
    </div>
</template>
<script>
    export default {
        store:['paddingTop'],
        data(){
            return {
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
                    }
                },
                info:{
                    duration:'00:11',
                    current:'22:22',
                    complete:true
                },
                playing:false
            }
        },

        methods:{
          onPlayer(){
              var audio = api.require('audio');
              if(this.playing) {
                  audio.stop();
              }else{
                  var self = this;
                  audio.play({
                      path: 'http://living.muzhifm.com/muzhifm/hangzhou_xihuzs_1054.m3u8?auth_key=1604286295-0-0-d3614ac1992b1af4adbf9afab35be2c9'
                  }, function(ret, err) {
                      self.info.duration = new Date(ret.duration*1000).Format('mm:ss');
                      self.info.current = new Date(ret.current*1000).Format('mm:ss');
                  });


              }
              this.playing = !this.playing;

          }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            play_src:function(){
                return this.playing?require("../../../assets/images/tools_btn_pause.png"):require("../../../assets/images/tools_btn_play.png");
            }
        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            console.log('this is current swiper instance object', this.swiper)
            // this.swiper.slideTo(3, 1000, false)
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
                background:url("../../../assets/images/fm_bg.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }

</style>
