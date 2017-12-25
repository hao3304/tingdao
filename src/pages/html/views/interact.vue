<template>
    <div class="view-interact">
        <van-nav-bar id="header" title="珞珈之声" leftArrow>
      <span slot="right" class="live-button">
          Live
      </span>
            <span slot="left">
          列表
      </span>
        </van-nav-bar>

        <div class="main">
            <section class="base-block">
                <p>
                    <i></i>
                    <span>正在播放</span>
                </p>

                <div class="news">
                    <div class="icon"></div>
                    <div class="content">
                        <h5>Meet-Drama晚会排队</h5>
                        <p>正在进行中</p>
                    </div>
                    <div class="arrow"></div>
                </div>

            </section>

            <section class="player-block">
                <span class="player-button"></span>
                <h5>背包去旅行</h5>
                <p>17:30 /周二</p>
            </section>

            <section class="voice-block">
                <div class="voice-circle" @click="onSpeech"></div>
                <span class="voice-tag">
                    字
                </span>
            </section>
        </div>

    </div>

</template>

<script>
    export default {

        methods:{
            onSpeech(){
                alert("开始说话");
                var speechRecognizer = api.require('speechRecognizer');
                speechRecognizer.addRecordHUD({
                    centerX: 160,
                    centerY: 120,
                    radius: 80,
                    transparentR: 40,
                    bg: '#AAAAAA',
                    fixedOn: api.frameName,
                    fixed: false
                }, function(ret, err) {
                    var volume = ret.volume;
                });
            }
        }
    }
</script>

<style lang="sass"  type="text/scss">
    @import "../../../public/px2rem.scss";
    .view-interact{
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
                }
                .arrow{
                    width: px2rem(80);
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
            background:url(../../../assets/images/player_bg.png) no-repeat;
            background-size:100% 100%;
            padding-top: px2rem(160);
            padding-left: px2rem(40);

            .player-button{
                width: px2rem(100);
                height: px2rem(100);
                background-color: rgba(38, 38, 40, 0.5);
                opacity: 0.5;
                display: inline-block;
                border-radius: 50%;
            }

            h5{
                font-family: "PingFang-SC-Bold";
                font-size: px2rem(40);
                font-weight: normal;
                font-stretch: normal;
                line-height: px2rem(20);
                letter-spacing: 0px;
                margin-top: px2rem(71);
                margin-bottom: 0;
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
                background-color: #ffffff;
                box-shadow: 0px 0px px2rem(40) 0px
                rgba(0, 0, 0, 0.05);
                border: solid 2px #fce76c;
                margin: 0 auto;
                border-radius: 50%;
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
