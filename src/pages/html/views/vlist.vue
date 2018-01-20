<template>
    <div class="view-list">
        <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft"  :left-arrow="type != 'default'" title="电台列表"  >

        </van-nav-bar>
        <div class="content">
            <van-pull-refresh v-model="isLoading">
            <ul class="list">
                <li class="item" v-for="l in list">
                    <a href="#" v-ripple @click="onSelect(l)">
                        <progressive-img :src="src+ l.pic" />
                        <p>{{l.video_title}}</p>
                    </a>
                </li>
            </ul>
            </van-pull-refresh>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .view-list{
        height: 100%;
        overflow-y: hidden;
        .van-hairline--top-bottom::after{
            border: none;
        }
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
            overflow: hidden;
            padding-bottom: px2rem(188);
            height: 100%;
            ul.list{
                padding-top: px2rem(48);
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                li.item{
                    margin-bottom: px2rem(37);
                    padding: 0 px2rem(10);
                    a{
                        display: block;
                        .progressive-image{
                            width: px2rem(200);
                            height: px2rem(200);
                            box-shadow: 0px px2rem(20) px2rem(20) 0px
                            rgba(0, 0, 0, 0.1);
                            .progressive-image-main{
                                width: 100%;
                                height: 100%;
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
    }

</style>
<script>
    import PullTo from 'vue-pull-to';
    import {getVideo,src,setDefalutFm} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop','token'],
        data(){
            return {
                list:[],
                src:src,
                isLoading:false,
                type:''
            }
        },
        methods:{
            refresh(loaded){
                setTimeout(()=>{
                    loaded('done');
                },2000)
            },
            onClickLeft(){
                api.closeWin();
            },
            onSelect(node){

                Toast.loading();

                setDefalutFm({
                    token:this.token,
                    id:node.id
                }).then(rep=>{
                    this.$ls.set("currentId",node.id);
                    Toast.clear();
                    if(this.type == 'default') {
                        this.$router.replace("/app");
                    }else{
                        this.onClickLeft();

                    }
                })
            }
        },
        watch: {
            isLoading() {
                if (this.isLoading) {
                    setTimeout(() => {
                        this.isLoading = false;
                        this.count++;
                    }, 500);
                }
            }
        },
        components:{
            PullTo
        },
        mounted(){
            Toast.loading();
            this.type = this.$route.query.type;

            getVideo().then(rep=>{
                Toast.clear();
                this.list = rep.data;
            })
        }
    }
</script>