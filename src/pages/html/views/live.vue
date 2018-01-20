<template>
    <div class="view-live" :style="{paddingTop:paddingTop}" >
        <ul class="tab" id="live-tab">
            <li class="active">
                <a href="javascript:;">热门直播</a>
            </li>
            <li>
                <a href="javascript:;">我的关注</a>
            </li>
        </ul>
        <div class="content" id="live-content">
            <van-pull-refresh v-model="isLoading">
            <ul class="list">
                <li class="item" v-for="n in data" @click="onOpenLive(n)" v-ripple>
                    <div class="img">
                        <progressive-img :src="src + n.img" />
                        <span v-show="n.stat == 1">正在直播</span>
                    </div>
                    <p>{{n.roomName}}</p>
                </li>
            </ul>
            </van-pull-refresh>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss" scoped>
    @import "../../../public/px2rem.scss";
    .view-live{
        height: 100%;
        overflow-y: hidden;
        .tab{
            height: px2rem(88);
            line-height: px2rem(88);
            display: flex;
            justify-content: center;
            li{
                text-align: center;
                a{
                    display: block;
                    font-size: px2rem(30);
                    font-weight: bold;
                    color: #777;
                    padding: 0 px2rem(32);
                }

                &.active{
                    a{
                        color: #262628;
                    }
                }
            }
        }
        .content{
            overflow-y:auto;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top:0;
            padding-bottom: px2rem(88);
            ul.list{
                padding-top: px2rem(48);
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                li.item{


                    position: relative;
                    margin-bottom: px2rem(37);
                    padding: 0 px2rem(10);
                    .img{
                        width: px2rem(200);
                        height: px2rem(200);
                        background-color: #262628;
                        box-shadow: 0px px2rem(20) px2rem(20) 0px
                        rgba(0, 0, 0, 0.1);

                        >span{
                            position: absolute;
                            top:px2rem(10);
                            right: px2rem(20);
                            font-size: px2rem(20);
                            color: #fff;
                            z-index: 100;
                            background-color: #00aa00;
                        }
                    }
                    p{
                        margin: 0;
                        padding-top:px2rem(23);
                        padding-bottom: 0;
                        text-align: center;
                        font-size: px2rem(26);
                        color: #777;
                    }
                }
            }
        }
    }

</style>
<script>
    import PullTo from 'vue-pull-to';
    import { getLive,src } from '../index/services';
    export default {
        store:['paddingTop'],
        data(){
            return {
                isLoading:false,
                src:src,
                data:[],
                query:{
                    page:1,
                    size:20,
                    id:1
                }
            }
        },
        watch: {
            isLoading() {
                if (this.isLoading) {
                    this.render();
                }
            }
        },
        methods:{
            render(){
                getLive(this.query).then(rep=>{
                    this.data = rep.data;
                    this.isLoading = false;

                })
            },
            onOpenLive(room){
                api.openWin({
                    name: 'test',
                    url:getPath() + '/html/index.html?path=radio-live',
                    pageParam:{
                        room:room
                    }
                });
            }
        },
        components:{
            PullTo
        },
        mounted(){
            let tab = document.getElementById("live-tab");
            let pd =  this.paddingTop?this.paddingTop.replace("px",''):0;
            document.getElementById("live-content").style.top = parseInt(pd) + tab.clientHeight + 'px';

            this.render();
        }
    }
</script>