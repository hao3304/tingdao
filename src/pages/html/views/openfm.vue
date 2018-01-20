<template>
    <div class="open-view">
        <transition name="zoomUp">
            <div v-show="type == 'open'">
                <div class="rectangle-1564 "></div>
                <div class="logo-block">
                    <img src="../../../assets/images/logo.png" alt="">
                </div>
                <div class="ellipse-1556"></div>
                <h5>私人FM</h5>

                <div class="btn-block">
                    <button @click="changeType('select')"  v-ripple  class="rectangle-1247 ">
                        立即开启
                    </button>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-show="type == 'select'">

                <div class="rectangle-1565">
                    <p>
                        挑选感兴趣的标签
                    </p>
                    <h4>
                        开启我的私人电台
                    </h4>
                    <div>
                        <img src="../../../assets/images/logo.png" alt="">
                    </div>
                </div>

                <div class="tags-block">
                    <ul>
                        <li :class="{active:hasSelect(t.id)}" v-for="t in tags">
                            <a href="#" @click="onSelect(t.id)">
                                <div>
                                    <img :src="src + t.pic" alt="">
                                    <i class="van-icon van-icon-success"></i>
                                </div>
                                <p>
                                    {{t.key_word}}
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="btn-block">
                    <button @click="onPost"  v-ripple class="rectangle-1247 ">
                        完成选择
                    </button>
                </div>
            </div>
        </transition>

    </div>
</template>
<script>
    import { getTags,src,postTags } from '../index/services';
    import { Toast } from 'vant';
    export default {
        store:['token'],
        data(){
            return {
                type:'open',
                tags:[],
                src:src,
                selectTags:[]
            }
        },
        methods:{
            changeType(t){
                this.type = t;
            },
            onSelect(id) {
              if(this.selectTags.indexOf(id) > -1) {
                  this.selectTags = this.selectTags.filter(s=>s!=id);
              }else{
                  this.selectTags.push(id);
              }
            },
            hasSelect(id){
              return this.selectTags.indexOf(id) > -1;
            },
            render(){
                getTags({token:this.token}).then(rep=>{
                    this.tags = rep.data;
                })
            },
            onPost() {
                if(this.selectTags.length == 0) {
                    return Toast.fail("请至少选择一个标签");
                }
                Toast.loading();
                postTags({
                    tags:this.selectTags,
                    token: this.token
                }).then(rep=>{
                    Toast.clear();

                    if(this.$route.query.type) {
                        this.$router.replace("/fm-list");
                    }else{
                        this.$emit('change','fm');
                    }

                })

            }
        },
        created(){
          if(this.$route.query.type) {
              this.type = this.$route.query.type;
          }
        },
        mounted(){
            this.render();
        }
    }
</script>
<style  lang="sass"  type="text/scss" >
    @import "../../../public/px2rem.scss";
    .open-view{
        .rectangle-1564 {
            width: px2rem(600);
            height: px2rem(480);
            position: absolute;
            top:0;
            left: 0;
            background-color: #fce76c;
        }

        .rectangle-1565{
            width: px2rem(750);
            height: px2rem(479);
            background-color: #fce76c;
            p{
                font-size: px2rem(30);
                color: rgba(0,0,0,.5);
                padding-top: px2rem(214);
                padding-left: px2rem(55);
            }

            h4{
                padding-left: px2rem(55);
                font-size: px2rem(40);
                color: #262628;
                margin: 0;
                font-weight: normal;
                padding-top: px2rem(24);
            }
            img{
                width: px2rem(521);
                height: px2rem(117);
                margin-left: px2rem(55);
                margin-top: px2rem(15);
            }
        }

        .tags-block{
            width: 100%;
            overflow-x: auto;
            position: absolute;
            top: px2rem(391);
            left: 0;
            ul{
                width: px2rem(920);
                display: block;
                font-size: 0;
                li{
                    display: inline-block;
                    width: px2rem(200);
                    margin-left: px2rem(24);
                    box-sizing: border-box;
                    a{
                        display: block;
                        div{
                            width: 100%;
                            height: px2rem(200);
                            box-shadow: 0px px2rem(20) px2rem(20) 0px
                            rgba(0, 0, 0, 0.1);
                            position: relative;

                            .van-icon-success{
                                display: none;
                            }

                            img{
                                height: 100%;
                                width: 100%;
                            }
                        }

                        p{
                            font-size: px2rem(26);
                            text-align: center;
                            color: #777777;
                            margin-top: px2rem(24);
                            margin-bottom: px2rem(40);
                        }
                    }
                }

                li.active {
                    a {
                        div {
                            border: solid px2rem(4) #7ade81;
                            .van-icon-success{
                                position: absolute;
                                font-size: px2rem(26);
                                text-align: center;
                                padding-top: px2rem(10);
                                bottom: 0;
                                right: 0;
                                background-color: #7ade81;
                                color: #fff;
                                display: inline-block;
                                width: px2rem(40);
                                height: px2rem(40);
                            }

                        }
                    }


                }
            }
        }

        .logo-block{
            margin-top: px2rem(186);
            text-align: center;
            position: absolute;
            width: 100%;
            img{
                height: px2rem(140);
                width: px2rem(625);
            }
        }

        .ellipse-1556 {
            width: px2rem(320);
            height: px2rem(320);
            background-image: url("../../../assets/images/fm_bg.png");
            background-size: cover;
            border-radius: 50%;
            top:px2rem(391);
            left: 50%;
            margin-left: - px2rem(160);
            position: absolute;
        }

        h5{
            text-align: center;
            position: absolute;
            top:px2rem(777);
            width: 100%;
            font-size: px2rem(40);
            font-weight: normal;
            font-stretch: normal;
            color: #262628;
        }

        .btn-block{
            text-align: center;
            position: absolute;
            top:px2rem(1057);
            width: 100%;
            left: 0;

            .rectangle-1247 {
                width: px2rem(248);
                height: px2rem(88);
                border-radius: px2rem(43);
                border: solid px2rem(1) rgba(0, 0, 0, 0.2);
                background-color: #fff;
                color: #262628;
                font-size: px2rem(26);

                &:active{
                    background-color: #efefef;
                }
            }
        }
    }
</style>