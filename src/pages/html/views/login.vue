<template>
    <div class="view-login">
        <van-nav-bar title="账号登录" :style="{paddingTop:paddingTop}" >
        </van-nav-bar>
        <div class="bg-block"></div>
        <div class="login-form">
            <van-field
                    v-model="form.mobile"
                    icon="clear"
                    placeholder="输入手机号"
                    @click-icon="form.mobile = ''"
            />

            <van-field
                    v-model="form.code"
                    icon="clear"
                    type="text"
                    placeholder="输入验证码"
                    @click-icon="form.code = ''"
            />
        </div>
        <van-button class="login-btn" @click="onLogin" bottom-action>登录</van-button>
    </div>
</template>
<script>
    import { login } from '../index/services';
    import { Toast } from 'vant';
    export default {
        name:'login',
        store:['view','token','paddingTop'],
        data(){
            return {
                form:{
                    mobile:"18667351129",
                    code:"1234"
                }
            }
        },
        methods:{
            onLogin(){
                 Toast.loading({
                    forbidClick: true
                });
                var push = api.require('push');
                login(this.form).then(rep=>{
                    if(rep) {
                        this.$ls.set("token",rep.token);
                        this.$ls.set("userName",rep.userName);
                        this.$ls.set("userId",rep.userId);
                        this.token = rep.token;
                        push.bind({
                            userName: rep.userName,
                            userId: rep.userId
                        },(ret)=>{
                            Toast.clear();
                            this.$router.push('/app');
                        });
                    }
                })

//                login(this.form).then(rep=>{
//                    if(rep) {
//                        this.$ls.set("token",rep.token);
//                        this.$ls.set("userName",rep.userName);
//                        this.$ls.set("userId",rep.userId);
//                        this.token = rep.token;
//                        Toast.clear();
//                        this.$router.push('/app');
//                    }
//                })

            }
        }
    }
</script>
<style lang="sass" type="text/scss" scoped>
    @import "../../../public/px2rem.scss";
    .view-login{
        .van-nav-bar{
            background-color: #fce76c;
        }
        .van-hairline--top-bottom::after{
            border: none;
        }
        .bg-block{
            height: px2rem(480-88-40);
            background-color: #fce76c;
            background-image: url("../../../assets/images/logo.png");
            background-size: px2rem(625) px2rem(140);
            background-repeat: no-repeat;
            background-position: center px2rem(186-88-40);
        }

        .login-form{
            width: px2rem(670);
            height: px2rem(240);
            background-color: #ffffff;
            box-shadow: 0px px2rem(20) px2rem(50) 0px
            rgba(0, 0, 0, 0.1);
            border: solid px2rem(2) #fce76c;
            position: absolute;
            left: px2rem(40);
            top:px2rem(360);
            padding: 0 px2rem(40);
            box-sizing: border-box;
            .van-cell{
                height: px2rem(118);
                input{
                    font-size: px2rem(34);
                }

                input::-webkit-input-placeholder{
                    color: #ddd;
                }
            }
        }
        .login-btn{
            position: absolute;
            bottom:0;
            left: 0;
            right: 0;
            background-color: #262628;
        }
    }
</style>