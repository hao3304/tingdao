<template>
    <div >
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <van-tabbar v-model="active" @change="onChangeTab">
            <van-tabbar-item v-for="n in tabs" icon="shop">
                <span>{{n.name}}</span>
                <template slot="icon" slot-scope="props">
                    <img  :src="props.active ? n.active:n.un_active" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<style lang="sass" type="text/scss"  >
    @media screen and (min-width: 320px){html{font-size: 20px;}}
    @media screen and (min-width: 360px){html{font-size: 22.5px;}}
    @media screen and (min-width: 375px){html{font-size: 23.4375px;}}
    @media screen and (min-width: 412px){html{font-size: 25.75px;}}
    @media screen and (min-width: 414px){html{font-size: 25.75px;}}
    @media screen and (min-width: 480px){html{font-size: 30px;}}
    @media screen and (min-width: 540px){html{font-size: 33.75px;}}
    @media screen and (min-width: 640px){html{font-size: 40px;}}
    @media screen and (min-width: 720px){html{font-size: 45px;}}
    @media screen and (min-width: 768px){html{font-size: 48px;}}
    @media screen and (min-width: 1080px){html{font-size: 67.5px;}}
    @media screen and (min-width: 1440px){html{font-size: 90px;}}
    @media screen and (min-width: 2160px){html{font-size: 135px;}}
    @import "../../../public/px2rem.scss";
    html,body,.td-app{
        height:100%;
        width:100%;
        background-color:#fefefe;
        p{
            margin: 0;
            padding: 0;
        }
    }
    .td-app {
        *{
            box-sizing: border-box;
        }
        font-family: "PingFang SC";

        .van-tabbar--fixed.van-hairline--top-bottom::after{
            border-width: px2rem(2) 0;
        }

        .van-pull-refresh__head{
            font-size: px2rem(28);
        }

        .van-nav-bar{
            height: px2rem(88);
            background-color: transparent;
            display: flex;
            box-sizing: content-box;
            .van-nav-bar__title{
                flex: 1;
            }
            .van-nav-bar__title,.van-nav-bar__right,.van-nav-bar__left{
                height: px2rem(88);
                line-height: px2rem(88);
                font-size: px2rem(30);
                font-weight: bold;
            }

            .van-nav-bar__right,.van-nav-bar__left{
                font-weight: 200;
                position: static;
                width: px2rem(80);
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
            background-color: rgba(255, 255, 255, 0.95);
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
                        url:'/app',
                        active:require('../../../assets/images/ico_toolbar_target_sel.png'),
                        un_active:require('../../../assets/images/ico_toolbar_target.png'),
                    },
                    {
                        name:'私人FM',
                        url:'/app/fm',
                        active:require('../../../assets/images/ico_toolbar_FM_sel.png'),
                        un_active:require('../../../assets/images/ico_toolbar_FM.png'),
                    },
                    {
                        name:'直播',
                        url:'/app/live',
                        active:require('../../../assets/images/ico_toolbar_live_sel.png'),
                        un_active:require('../../../assets/images/ico_toolbar_live.png'),
                    },
                    {
                        name:'我的',
                        url:'/app/my',
                        active:require('../../../assets/images/ico_toolbar_my_sel.png'),
                        un_active:require('../../../assets/images/ico_toolbar_my.png'),
                    }
                ],
                active:0
            }
        },
        methods:{
            onChangeTab(active){
                this.$router.replace(this.tabs[active].url)
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

            this.active = this.tabs.findIndex(item=>{
                return item.url == this.$route.path;
            });
        }
    }
</script>
