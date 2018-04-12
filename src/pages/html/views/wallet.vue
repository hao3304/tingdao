<template>
    <div class="view-wallet">
        <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft"  :left-arrow="type != 'default'" title="我的钱包"  >

        </van-nav-bar>
        <div class="content">
            <div class="wallet-img">
                <img src="../../../assets/images/wallet.png" alt="">
            </div>
            <h5>我的零钱</h5>
            <h3>¥ {{money}}</h3>
            <p>可提取余额：¥ {{money}}</p>
            <div class="btn-block" @click="onTiXian">
                <van-button size="large" type="primary">马上提现</van-button>
            </div>

            <div class="mark" style="margin-top: 30px">可提现到微信钱包，单日提现总限额2000元</div>
            <div class="mark">每天可申请提现3次</div>
            <div class="mark">提现金额将在1-3工作日内到账</div>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .view-wallet{
        height: 100%;
        overflow-y: hidden;
        .van-hairline--bottom::after{
            border: none;
        }
        .content{
            overflow: hidden;
            padding-bottom: px2rem(188);
            height: 100%;

            .wallet-img{
                text-align: center;
                margin-top: px2rem(80);
                margin-bottom: px2rem(10);
                img{
                    width: px2rem(250);
                }
            }

            h5 {
                text-align: center;
                font-weight: 400;
                margin: 0;
                font-size: px2rem(36);

            }

            h3 {
                text-align: center;
                margin: 0;
                padding-top: px2rem(25);
                font-weight: 600;
                font-size: px2rem(88);
                color: #333;
            }

            p {
                text-align: center;
                font-size: px2rem(28);
                color: #999;
                margin-top: px2rem(20);
            }

            .btn-block{
                margin-top: px2rem(100);
                text-align: center;
                padding: 0 px2rem(100);
            }

            .mark{
                text-align: center;
                font-size: px2rem(24);
                color: #999;
                line-height: px2rem(34);
            }
        }
    }

</style>
<script>
    import PullTo from 'vue-pull-to';
    import { src,getUserInfo } from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['paddingTop','token'],
        data(){
            return {
                src:src,
                money:"0.00"
            }
        },
        methods:{
            refresh(loaded) {
                setTimeout(()=>{
                    loaded('done');
                },2000)
            },
            onClickLeft() {
                api.closeWin();
            },
            onTiXian() {
                alert('还未支持该功能，敬请期待。');
            }
        },
        watch: {

        },
        components:{
            PullTo
        },
        mounted(){
            getUserInfo(this.token).then(rep=>{
                this.money = rep.money.toFixed(2);
                Toast.clear();
            })
        }
    }
</script>