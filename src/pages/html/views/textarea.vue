<template>
    <div class="view-list">
        <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" left-arrow
                     right-text="发送"  @click-right="onClickRight" title="文字互动"  >

        </van-nav-bar>
        <div class="content">
            <!--<textarea name="" id="textarea" cols="30" rows="10" placeholder="输入您想分享的内容"></textarea>-->
        </div>
    </div>
</template>
<style lang="sass" type="text/scss" scoped>
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
                        img{
                            width: px2rem(200);
                            height: px2rem(200);
                            background-color: #262628;
                            box-shadow: 0px px2rem(20) px2rem(20) 0px
                            rgba(0, 0, 0, 0.1);
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
    import {getVideo,src,postVoice} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop'],
        data(){
            return {
                isLoading:false,
                src:src
            }
        },
        methods:{
            onClickLeft(){
                var UIInput = api.require('UIInput');
                UIInput.closeKeyboard({
                    id:0
                });
                setTimeout(()=>{
                    api.closeWin();
                },200)
            },
            onSelect(node){
                this.$ls.set("currentId",node.id);
                this.onClickLeft();
            },
            postText(text) {
                Toast.loading();
                postVoice({
                    token:this.$ls.get('token'),
                    type:1,
                    voice_url:"",
                    text:text
                }).then(rep=>{
                    Toast.clear();
                    Toast.success("提交成功");
                    setTimeout(()=>{
                        Toast.clear();
                       this.onClickLeft();
                    },500)
                })

            },
            onClickRight() {
                var UIInput = api.require('UIInput');

                UIInput.value((ret)=> {
                    if (ret) {
                        this.postText(ret.msg);
                    }
                });
            }
        },
        mounted(){
            var UIInput = api.require('UIInput');
            UIInput.open({
                rect: {
                    x: 10,
                    y: 65,
                    w: api.winWidth-20,
                    h: 200
                },
                alignment:"center",
                maxStringLength:200,
                styles: {
                    bgColor: '#fff',
                    size: 15,
                    color: '#000',
                    placeholder: {
                        color: '#777'
                    }
                },
                autoFocus: true,
                maxRows: 10,
                placeholder: '输入您想分享的内容',
                fixedOn: api.frameName
            }, function(ret) {
                if (ret.eventType == 'change') {
                }
            });
        }
    }
</script>