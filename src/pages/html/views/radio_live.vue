<template>
    <div>
    </div>
</template>
<script>
    import { getPath } from '../index/services';
    export default {
        data(){
            return {
                show:false,
                url:'',
                session:{
                    roomId:'',
                    password:'',
                    nickname:''
                }
            }
        },
        methods:{
            render(){
                var player = api.require('gotyeLivePlayer');

                player.init({
                    session:this.session
                });
                player.play({playView: "frm_mine"});

                player.addEventListener({name: 'connected'}, function(ret, err) {
                    api.toast({msg:"connected"});
                });

                player.addEventListener({name: 'error'}, function(ret, err) {
                    api.toast({msg:JSON.stringify(ret)});
                });
            }
        },
        created(){
           this.session = api.pageParam.session;
        },
        mounted(){
            api.openFrame({
                name: 'frm_mine',
                url: getPath() + '/public/win.html',
                rect: {
                    x: 0,
                    y: 0,
                    h:'auto',
                    w:api.winWidth
                },
                bounces : false
            });

            var core = api.require('gotyeLiveCore');

            core.setDebugLogEnabled({
                enabled: true
            });

            core.authRoomSession(this.session, ( ret, err )=>{
                if( ret ){
                    this.render();
                }else{
                    alert( JSON.stringify( err ) );
                }
            });

//            player.init({
//                session:session
//            });
//            player.play({playView: "frm_mine"});
//            player.addEventListener({name: 'error'}, function(ret, err) {
//                api.toast({msg:JSON.stringify(ret)});
//            });

////            setTimeout(()=>{
//
//                api.openFrame({
//                    name: 'page2',
//                    url: '/src/pages/public/win/app.html',
//                    rect: {
//                        x: 0,
//                        y: 0,
//                        w: 200,
//                        h: 200
//                    },
//                    bgColor:null,
//                    pageParam: {
//                        name: 'test'
//                    }
//                });
//                this.show = true;
//
//            },600)

//
//            pushRtmpOrVideoPlay.showTuiLiu({
//                x : 0,
//                y : 400,
//                url : "rtmp://20228.livepush.myqcloud.com/live/20228_12?bizid=20228&txSecret=34ae864478f9420065cf71deef19727d&txTime=5A60C47F"
//            });

        }
    }
</script>
<style></style>