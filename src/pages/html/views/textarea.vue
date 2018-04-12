<template>
    <div class="textarea-list">
        <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" left-arrow
                     right-text="发送"  @click-right="onClickRight" title="文字互动"  >
        </van-nav-bar>
        <div class="content">
            <van-field
                    v-model="message"
                    type="textarea"
                    placeholder="这一刻的想法..."
                    rows="20"
            />

            <div class="files" v-if="media_url" >
               <ul>
                   <li>
                       <!--<img src="http://39.106.219.227/static/upload/1eac67d2048787aebfefc7a7e988c9c3.png" alt="">-->
                       <img :src="src + media_url" alt="">
                       <a href="javascript:;" @click="media_url = ''">
                          <i class="iconfont icon-jianqu2"></i>
                       </a>
                   </li>
               </ul>

            </div>
            <div class="upload-block">
                <van-uploader :after-read="onRead" v-if="!media_url">
                    <van-icon name="photograph" />
                </van-uploader>
            </div>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss">
    @import "../../../public/px2rem.scss";
    .textarea-list{
        height: 100%;
        overflow-y: hidden;
        background-color: #efefef;
        overflow: hidden;

        .van-field--has-textarea .van-field__control{
            min-height: px2rem(300);
        }

        .van-hairline--bottom::after{
            border: none;
        }
        .van-cell:not(:last-child)::after{
            border-bottom-width: 0;
        }
        .van-nav-bar{
            background-color: #fce76c !important;
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
            background-color: #fff;
            box-shadow: 0 px2rem(1) px2rem(2) rgba(0,0,0,.1);
            textarea{
                width: 100%;
                padding: px2rem(10) px2rem(20);
                border:none;
                font-size: px2rem(36);
            }

            .files{
                padding: px2rem(10) px2rem(20);
                ul{
                    display: flex;
                    li{
                        width: px2rem(150);
                        height: px2rem(150);
                        position: relative;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        a{
                            color: #00c000;
                            position: absolute;
                            right: - px2rem(20);
                            top:0;
                            width: px2rem(40);
                            height: px2rem(40);
                            .iconfont{
                                font-size: px2rem(40);
                            }

                            &:active{
                                color: #00aa00;
                            }
                        }
                    }
                }
            }

            .upload-block{
                padding: px2rem(10) px2rem(20);
                text-align: right;
                .van-icon-photograph{
                    color: #666;
                }
            }
        }
    }

</style>
<script>
    import {getVideo,src,postVoice,uploadFile} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop','token'],
        data(){
            return {
                isLoading:false,
                src:src,
                message:'',
                media_url:''
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
            postText() {
                Toast.loading();
                postVoice({
                    token:this.$ls.get('token'),
                    type:1,
                    voice_url:this.media_url,
                    text:this.message
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
//                var UIInput = api.require('UIInput');
//
//                UIInput.value((ret)=> {
//                    if (ret) {
//                        this.postText(ret.msg);
//                    }
//                });

                this.postText();
            },
            onRead(file){
                Toast.loading();
                let formData = new FormData();
                formData.append('token', this.token);
                formData.append('file', file.file);
                uploadFile(formData).then(rep=>{
                    Toast.clear();
                    this.media_url = rep.src;
//                    alert(JSON.stringify(rep));
                }).catch(e=>{
                    alert(e);
                })
//                var FNPhotograph = api.require('FNPhotograph');
//                FNPhotograph.open({
//                    path: 'fs://savePath',
//                    album: true ,
//                    quality: 'medium'
//                }, function(ret){
//                    alert(JSON.stringify(ret));
//                });
            }
        },
        mounted(){
//            var UIInput = api.require('UIInput');
//            UIInput.open({
//                rect: {
//                    x: 10,
//                    y: 65,
//                    w: api.winWidth-20,
//                    h: 160
//                },
//                alignment:"center",
//                maxStringLength:200,
//                styles: {
//                    bgColor: '#fff',
//                    size: 15,
//                    color: '#000',
//                    placeholder: {
//                        color: '#777'
//                    }
//                },
//                autoFocus: true,
//                maxRows: 10,
//                placeholder: '输入您想分享的内容',
//                fixedOn: api.frameName
//            }, function(ret) {
//                if (ret.eventType == 'change') {
//                }
//            });
        }
    }
</script>