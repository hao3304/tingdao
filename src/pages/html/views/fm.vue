<template>

    <div class="view-fm">
        <van-nav-bar title="我的私人FM" >
        </van-nav-bar>
        <div class="container">
            <swiper  :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="n in 7">
                    <div class="content">
                        <div class="toolbar">
                            <a href="#">
                                <van-icon name="like-o" />
                            </a>
                            <a href="#">
                                <van-icon name="delete"></van-icon>
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
                        <a href="#" @click="onPlayer">播放</a>
                    </li>
                    <li>
                        <a href="#" >
                            <img src="../../../assets/images/player_btn.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="#" @click="onPause">暂停</a>
                    </li>
                </ul>

            </div>

        </div>
    </div>
</template>
<script>
    export default {
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
                }
            }
        },
        methods:{
          onPlayer(){
              var audio = api.require('audio');
              var self = this;
              audio.play({
                  path: 'http://6007.live-vod.cdn.aodianyun.com/m3u8/0x0/Vting.stream.1446540844/Vting.stream.1446540844.m3u8'
              }, function(ret, err) {
                    self.info.duration = new Date(ret.duration*1000).Format('mm:ss');
                    self.info.current = new Date(ret.current*1000).Format('mm:ss');

              });
          },
            onPause(){
              let audio = api.require('audio');
                audio.stop();
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
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

<style lang="sass" type="text/scss">
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
                    color: #fff;
                    font-size: px2rem(39);
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
                    justify-content: space-between;
                    align-items: center;
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
