<template>
    <div class="td-app">
        <van-nav-bar title="xx电台" leftText="返回" leftArrow>
            <span slot="right" class="live-button">
                Live
            </span>
        </van-nav-bar>


        <van-tabbar v-model="active">
            <van-tabbar-item v-for="n in tabs" icon="shop">
                 <span>{{n.name}}</span>
                    <template slot="icon" slot-scope="props">
                        <img  :src="props.active ? n.active:n.un_active" />
                    </template>
                </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<style lang="sass"  >

@import "../../../public/px2rem.scss";

.td-app {
    font-family: "PingFang SC";
    .van-nav-bar{
        height: px2rem(88);
        .van-nav-bar__title,.van-nav-bar__right,.van-nav-bar__left{
            height: px2rem(88);
            line-height: px2rem(88);
            font-size: px2rem(30);
            font-weight: bold;
        }

        .van-nav-bar__right,.van-nav-bar__left{
            font-weight: 200;
        }

        .live-button{
            height: px2rem(56);
            line-height: px2rem(56);
            border-radius: px2rem(28);
            width: px2rem(112);
            display: inline-block;
            border: px2rem(2) solid rgb(221,221,221);
        }
    }

    .van-tabbar {
        height: px2rem(98);
        .van-tabbar-item__icon{
            margin-bottom: 0;
                img{
                    width:px2rem(48);
                    height:px2rem(48);
                }
    }

        .van-tabbar-item__text{
            font-size: px2rem(23);
    }

        .van-tabbar-item{
            color: #777;
                &.van-tabbar-item--active{
                color: #000;
            }
        }
    }
}

</style>

<script>
    export default {
        data() {
            return {
                tabs: [
                    {
                        name:'互动',
                        active:require('../../../assets/images/ico_toolbar_target_sel.png'),
                        un_active:require('../../../assets/images/ico_toolbar_target.png'),
                    },
                    {
                        name:'私人FM',
                        active:require('../../../assets/images/ico_toolbar_FM_sel.png'),
                        un_active:require('../../../assets/images/ico_toolbar_FM.png'),
                    },
                    {
                        name:'直播',
                         active:require('../../../assets/images/ico_toolbar_live_sel.png'),
                        un_active:require('../../../assets/images/ico_toolbar_live.png'),
                    },
                    {
                        name:'我的',
                         active:require('../../../assets/images/ico_toolbar_my_sel.png'),
                        un_active:require('../../../assets/images/ico_toolbar_my.png'),
                    }
                ],
                active:0
            }
        },
        created() {
            // this.ver = api.version;
            // this.sType = api.systemType;
            // this.sVer = api.systemVersion;
            // this.id = api.deviceId;
            // this.model = api.deviceModel;
            // this.name = api.deviceName;
            // this.cType = api.connectionType;
            // this.winName = api.winName;
            // this.winWidth = api.winWidth;
            // this.winHeight = api.winHeight;
            // this.frameName = api.frameName || '';
            // this.frameWidth = api.frameWidth || '';
            // this.frameHeight = api.frameHeight || '';
            // this.dataHasLoaded = true;
        }
    }
</script>