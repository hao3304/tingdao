<template>
    <div id="view-my">
        <van-nav-bar  :style="{paddingTop:paddingTop}" title="我的" >
        </van-nav-bar>
        <van-pull-refresh class="container" v-model="isLoading">

        <header>
            <div class="logo"></div>
            <div class="avatar"></div>
            <div class="username">Avery</div>
        </header>
        <section class="my-info">
            <van-cell-group>
                <van-cell  icon="clock" isLink>
                    <template>
                        <span style="color: #7ade81">09:38</span>
                    </template>
                    <template slot="title">
                        <span class="van-cell-text">
                            定时关闭
                        </span>
                    </template>
                </van-cell>
                <van-cell value="内容" icon="like-o" isLink>
                    <template>
                        <span style="color: #ddd">珞珈之声</span>
                    </template>
                    <template slot="title">
                        <span class="van-cell-text">
                            我的默认电台
                        </span>
                    </template>
                </van-cell>
                <van-cell icon="success" isLink>
                    <template>
                        <span class="active-badge">20</span>
                    </template>
                    <template slot="title">
                        <span class="van-cell-text">
                            我的参与
                        </span>
                    </template>
                </van-cell>

            </van-cell-group>
        </section>
       <section class="other-block">
               <van-cell-group>
                   <van-cell value=""  isLink>
                       <template slot="title">
                        <span class="van-cell-text">
                            意见反馈
                        </span>
                       </template>
                   </van-cell>
                   <van-cell value=""  isLink>
                       <template slot="title">
                        <span class="van-cell-text">
                            关于我们
                        </span>
                       </template>
                   </van-cell>
                   <van-cell value="" isLink>
                       <template slot="title">
                        <span class="van-cell-text">
                            支持我们
                        </span>
                       </template>
                   </van-cell>

               </van-cell-group>
       </section>
        <section class="btn-block">
            <button v-ripple @click="onLogout">退出登录</button>
        </section>
        </van-pull-refresh>
    </div>
</template>
<style lang="sass"  type="text/scss" >
    @import "../../../public/px2rem.scss";
    #view-my{
        height: 100%;
        .van-hairline--top-bottom::after{
            border-width: 0;
        }
        .container{
            left: 0;
            right: 0;
            bottom:px2rem(98);

        }

        .van-nav-bar{
            height: px2rem(88) !important;;
            background-color: #fce76c !important;
        }
        header{
            height: px2rem(480-40-88);
            background-color: #fce76c;
            position: relative;
            .avatar{
                top:px2rem(32);
                left: px2rem(80);
                position: absolute;
                width: px2rem(160);
                height: px2rem(160);
                background-color: #ddd;
                border-radius: 50%;
                z-index: 2000;
            }
            .username{
                position: absolute;
                z-index: 2000;
                left: px2rem(260);
                top:px2rem(141);
                font-size: px2rem(28);
                color: #777;
            }
        }

        .my-info{
            position: absolute;
            top:px2rem(220 - 40-88);
            background-color: #fff;
            left:px2rem(40);
            right:px2rem(40);
            height: px2rem(463);
            box-shadow: 0px px2rem(20) px2rem(50) 0px
            rgba(0, 0, 0, 0.1);
            padding-top: px2rem(100);
            z-index: 1000;

        }

        .van-cell{
            height: px2rem(120);
            padding: 0;
            line-height: px2rem(120);
            color: #262628;
            font-size: px2rem(34);
            .van-cell-text{
                padding-left: px2rem(16);
            }
        }
        .van-cell__title .van-icon{
            font-size: px2rem(36);
            color: #ddd;
            margin-left: px2rem(2);
        }
        .van-cell__right-icon{
            font-size: px2rem(20);
            color: #ddd;
        }
        .van-cell__value--link{
            padding-right: px2rem(60);
        }
        .van-cell__value{
            font-size: px2rem(28);
            .active-badge{
                color: #fff;
                background-color: #ff6a71;
                border-radius: 20px;
                padding: 0 px2rem(10);
            }
        }
        .van-cell-group{
            padding-left: px2rem(34);
            padding-right: px2rem(30);
        }

        .other-block{
            padding-top: px2rem(223);
            padding-left: px2rem(18);
            padding-right: px2rem(40);

        }
        .btn-block{
            padding-top: px2rem(35);
            text-align: center;
            button{
                width: px2rem(248);
                height: px2rem(88);
                background-color: #fce76c;
                border-radius: px2rem(43);
                border:none;
                font-size: px2rem(26);
                color: #262628;
            }
        }
    }
</style>
<script>
    import { Dialog } from 'vant';
    import { getUserInfo } from '../index/services';
    export default {
        store:['view','token','paddingTop'],
        data(){
            return {
                isLoading:false,
            }
        },
        methods:{
            onLogout(){
                Dialog.confirm({
                    title: '提示',
                    message: '确定要退出当前登录用户吗？'
                }).then(() => {
                    this.$ls.set("token",null);
                    this.$router.push('/login');
                }).catch(() => {
                    // on cancel
                });
            },
            render(){
                getUserInfo(this.token).then(rep=>{
                })
            }
        },
        mounted(){
            this.render();
        },
        watch:{
            isLoading(b){
                if (this.isLoading) {
                    setTimeout(() => {
                        this.isLoading = false;
                        this.count++;
                    }, 500);
                }
            }
        }
    }
</script>
