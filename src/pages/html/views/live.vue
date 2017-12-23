<template>
    <div class="view-live">
        <ul class="tab">
            <li class="active">
                <a href="javascript:;">热门直播</a>
            </li>
            <li>
                <a href="javascript:;">我的关注</a>
            </li>
        </ul>
        <div class="content">
            <pull-to >
            <ul class="list">
                <li class="item" v-for="n in 100">
                    <img src="../../../assets/images/player_bg.png" alt="">
                    <p>直播名称</p>
                </li>
            </ul>
            </pull-to>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss">
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

</style>
<script>
    import PullTo from 'vue-pull-to'
    export default {
        data(){
            return {
                isLoading:false
            }
        },
        methods:{
            refresh(loaded){
                setTimeout(()=>{
                    loaded('done');
                },2000)
            }
        },
        components:{
            PullTo
        }
    }
</script>