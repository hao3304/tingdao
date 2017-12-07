<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item v-for="n in tabs" icon="shop">
                 <span>{{n.name}}</span>
                    <template slot="icon" slot-scope="props">
                        <img style="width:21pt;height:21pt;" :src="props.active ? n.active:n.un_active" />
                    </template>
                </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<style lang="less"  >
    .van-tabbar {
        .van-tabbar-item__icon{
            margin-bottom: 0;
        }
        
        .van-tabbar-item{
            color: #777;
                &.van-tabbar-item--active{
                color: #000;
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