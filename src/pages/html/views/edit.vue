<template>
    <div class="view-edit">
        <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft" @click-right="onSave"  title="设置昵称"  >
            <van-icon name="close" slot="left" />
            <a href="javascript:;" slot="right">完成</a>
        </van-nav-bar>
        <div class="content">
            <van-cell-group>
                <van-field icon="clear"  @click-icon="value = ''" v-model="info.nick_name" placeholder="请输入昵称" />
            </van-cell-group>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .view-edit{
        height: 100%;
        background-color: #f0f0f0;
        overflow-y: hidden;
        .van-hairline--bottom::after, .van-hairline--left::after, .van-hairline--right::after, .van-hairline--surround::after, .van-hairline--bottom::after, .van-hairline--top::after, .van-hairline::after{
            border-width: 0;
        }

        .content{
            padding-top: px2rem(33);
            padding-left: px2rem(40);
            padding-right: px2rem(40);
            .van-cell-group{
                border: solid 1px #ebebeb;
                height: px2rem(120);
                background-color: #fff;
                .van-cell{
                    height: 100%;
                    padding: 0 px2rem(40);
                    input{
                        height: 100%;
                        font-size: px2rem(32);
                    }
                }
            }
        }
    }

</style>
<script>
    import {getUserInfo,putMy} from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop','token'],
        data(){
            return {
                info:{
                    nick_name:'',
                    head:""
                }
            }
        },
        methods:{
            onClickLeft(){
                window.history.back();
            },
            render(){
                getUserInfo(this.token).then(rep=>{
                    this.info = rep;
                })
            },
            onSave() {
                if(this.info.nick_name == '') {
                    return api.toast({msg:"请输入昵称"});
                }
                Toast.loading();
                putMy(this.token,this.info).then(rep=>{
                    Toast.clear();
                    this.onClickLeft();
                })

            }
        },
        mounted(){
            this.render();
        }
    }
</script>