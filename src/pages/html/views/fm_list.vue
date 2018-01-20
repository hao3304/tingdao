<template>
    <div class="my-fm-list">
        <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft"  @click-right="onClickRight" left-arrow title="播放列表"  >
            <a v-show="!editable" class="header-button" slot="right">编辑</a>

            <a href="javascript:;" class="header-button2" slot="right" v-show="editable">
                <img src="../../../assets/images/icon_add.png" alt="">
            </a>

        </van-nav-bar>
        <div class="edit-toolbar" v-show="editable">
            <div class="circle">
                <van-icon name="check"></van-icon>
            </div>
            <div class="btns">
                <a href="javascript:;" class="btn-remove">
                        <van-icon name="delete"></van-icon>
                    删除</a>
                <a href="javascript:;" @click="onSave" class="btn-ok">完成</a>
            </div>
        </div>
        <div class="content">
                <ul class="list">
                    <li class="item" v-for="(l,index) in list" @click="onSelect(l.id)" >
                        <div class="index">
                            <span v-show="!editable">{{index +1}}</span>
                            <van-icon v-show="editable" :name="hasSelect(l.id)?'checked':'check'"></van-icon>
                        </div>
                        <div class="info">
                            <h5>{{l.name}}</h5>
                            <p>{{l.radio_name}}</p>
                        </div>
                        <div class="time">

                            {{getTime(l.play_time)}}
                        </div>
                    </li>
                </ul>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .my-fm-list{
        height: 100%;
        overflow-y: hidden;
        .van-hairline--top-bottom::after{
            border: none;
        }

        .header-button2{
            display: inline-block;
            padding-top:px2rem(16);
            img{
                height:px2rem(56);
            }
        }

        .header-button{
            position: absolute;
            width: px2rem(112);
            height: px2rem(56);
            background-color: #000;
            color: #fff;
            border-radius: px2rem(28);
            line-height: px2rem(56);
            text-align: center;
            right: px2rem(20);
            margin-top:px2rem(15);
            font-size: px2rem(24);
            &:active{
                background-color: #333;
            }
        }

        .van-nav-bar{
            background-color: #fce76c !important;
        }

        .edit-toolbar{
            background-color: #fce76c;
            height: px2rem(120);
            display: flex;
            align-items: center;

            .circle{
                text-align: center;
                width: px2rem(100);
                font-size: px2rem(44);
                color: #262628;
            }

            .btns{
                flex: 1;
                text-align: right;
                padding-right: px2rem(20);
                .btn-remove{
                    width: px2rem(112);
                    height: px2rem(56);
                    display: inline-block;
                    color: #000;
                    border-radius: px2rem(28);
                    line-height: px2rem(56);
                    right: px2rem(20);
                    font-size: px2rem(24);
                    margin-right: px2rem(60);
                    position: relative;
                    text-align: right;
                    .van-icon{
                        font-size: px2rem(36);
                        color: #ff6a71;
                        position: absolute;
                        left: px2rem(10);
                        top: px2rem(8);
                    }
                    &:active{
                        color: #00aa00;
                    }
                }
                .btn-ok{
                    width: px2rem(112);
                    height: px2rem(56);
                    display: inline-block;
                    background-color: #000;
                    color: #fff;
                    border-radius: px2rem(28);
                    line-height: px2rem(56);
                    text-align: center;
                    right: px2rem(20);
                    font-size: px2rem(24);
                    &:active{
                        background-color: #333;
                    }
                }
            }

        }

        .content{
            overflow: hidden;
            padding-bottom: px2rem(188);
            height: 100%;
            .van-pull-refresh__track{
                height: 100%;
            }
            ul.list{
                li{
                    &:active{
                        background-color: #efefef;
                    }
                    position: relative;
                    &:after{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: px2rem(96);
                        width: 200%;
                        height: 200%;
                        -webkit-transform: scale(.5);
                        transform: scale(.5);
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        pointer-events: none;
                        box-sizing: border-box;
                        border-bottom: 1px solid #e5e5e5;
                    }

                    height: px2rem(120);
                    display: flex;
                    align-items: center;
                    .index{
                        width: px2rem(96);
                        color: #ddd;
                        font-size: px2rem(34);
                        text-align: center;
                        .van-icon{
                            font-size: px2rem(44);
                            &.van-icon-checked{
                                color: #7ade81;
                            }
                        }
                    }
                    .info{
                        flex: 1;
                        h5{
                            padding: 0;
                            margin: 0;
                            font-size: px2rem(34);
                            color:#262628;
                        }
                        p{
                            font-size: px2rem(26);
                            color: #777;
                            margin-top: px2rem(15);
                            padding: 0;
                        }
                    }
                    .time{
                        width: px2rem(100);
                        font-size: px2rem(26);
                        text-align: left;
                        color: #ddd;
                    }
                }
            }
        }
    }

</style>
<script>
    import {getVideo,src} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop','token'],
        data(){
            return {
                list:[],
                src:src,
                select:[],
                isLoading:false,
                editable:false
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
            hasSelect(id) {
                return this.select.findIndex(s=>s==id)>-1;
            },
            onSelect(id){
                if(this.editable) {
                    if(this.select.findIndex(s=>s==id)==-1) {
                        this.select.push(id);
                    }else{
                        this.select = this.select.filter(s=>s!=id);
                    }
                }
            },
            render(){
                Toast.loading();
                getVideo({token:this.token}).then( (rep)=>{
                    this.list = rep;
                    Toast.clear();
                })
            },
            getTime(time) {
                return new Date(time*1000).Format('mm:ss');
            },
            onSave() {
                this.editable = false;
            },
            onClickRight() {
                if(!this.editable) {
                    this.editable = true;
                }else{
                    this.$router.push('/openfm?type=select');
                }
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
        mounted(){
            this.render();
        }
    }
</script>